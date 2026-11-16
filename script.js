/**
 * ==============================================================================
 * PERSONAL PORTFOLIO - ANAM AMJAD KHAN
 * script.js
 * Vanilla JavaScript (ES6+) for theme toggle, responsive navigation,
 * active scroll spy, form validation, and interactive UI behaviors.
 * ==============================================================================
 */

// Execute code only after the DOM is fully loaded and ready
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------------
   * 1. THEME SWITCHER (LIGHT / DARK MODE WITH LOCALSTORAGE PERSISTENCE)
   * ----------------------------------------------------------------------------
   * Allows the visitor to toggle between Light and Dark visual themes.
   * Remembers user choice across page visits via browser localStorage.
   * Defaults to system preference if no manual selection has been made.
   */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;
  const THEME_STORAGE_KEY = 'anam_portfolio_theme';

  /**
   * Determine the initial theme to apply:
   * 1. Check if user previously saved a theme in localStorage.
   * 2. Otherwise, check their operating system's color scheme preference.
   * 3. Default to 'light' if undetermined.
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  }

  /**
   * Apply theme to root <html> tag and update button metadata
   */
  function setTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      themeToggleBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      themeToggleBtn.setAttribute('title', `Switch to ${nextTheme} theme`);
    }
  }

  // Initialize theme on page load
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = rootElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // Listen for operating system theme changes if user hasn't set an explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });


  /* ----------------------------------------------------------------------------
   * 2. MOBILE NAVIGATION DRAWER
   * ----------------------------------------------------------------------------
   * Toggles mobile menu drawer on small screens with accessible ARIA attributes.
   * Automatically closes the menu when a link is clicked or clicking outside.
   */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    if (!navMenu || !mobileToggleBtn) return;
    navMenu.classList.add('active');
    mobileToggleBtn.classList.add('active');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    mobileToggleBtn.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMobileMenu() {
    if (!navMenu || !mobileToggleBtn) return;
    navMenu.classList.remove('active');
    mobileToggleBtn.classList.remove('active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    mobileToggleBtn.setAttribute('aria-label', 'Open navigation menu');
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile drawer when any navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile drawer if brand logo is clicked
  const brandLogo = document.querySelector('.logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close mobile drawer when clicking outside the navbar
  document.addEventListener('click', (event) => {
    if (navMenu && navMenu.classList.contains('active')) {
      const isClickInside = navMenu.contains(event.target) || mobileToggleBtn.contains(event.target);
      if (!isClickInside) {
        closeMobileMenu();
      }
    }
  });

  // Close mobile drawer when pressing the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });


  /* ----------------------------------------------------------------------------
   * 3. HEADER SCROLL SHADOW & ACTIVE NAVIGATION LINK SPY
   * ----------------------------------------------------------------------------
   * Detects the currently viewed section on screen and highlights the corresponding
   * navigation menu link using the modern IntersectionObserver API.
   */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  // Add subtle elevation shadow to header on scroll
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // IntersectionObserver to observe which section is currently centered in viewport
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      // Trigger when section occupies the upper-middle vertical threshold
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }


  /* ----------------------------------------------------------------------------
   * 4. CONTACT FORM VALIDATION & CLIENT-SIDE FEEDBACK
   * ----------------------------------------------------------------------------
   * Validates mandatory inputs (Name, Email format, Message length)
   * Displays inline error cues and a clean status message on submission.
   */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // Standard regex to validate standard email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearError(inputElement, errorElement) {
    if (inputElement) inputElement.classList.remove('input-error');
    if (errorElement) errorElement.textContent = '';
  }

  function showError(inputElement, errorElement, message) {
    if (inputElement) inputElement.classList.add('input-error');
    if (errorElement) errorElement.textContent = message;
  }

  // Clear errors dynamically as the user types or corrects their input
  if (nameInput) {
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      let isValid = true;

      // 1. Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        showError(nameInput, nameError, 'Please enter your name.');
        isValid = false;
      } else if (nameVal.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters.');
        isValid = false;
      } else {
        clearError(nameInput, nameError);
      }

      // 2. Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        showError(emailInput, emailError, 'Please enter your email address.');
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        showError(emailInput, emailError, 'Please enter a valid email (e.g. name@example.com).');
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // 3. Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        showError(messageInput, messageError, 'Please enter your message.');
        isValid = false;
      } else if (messageVal.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long.');
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }

      // If any validation failed, focus on the first invalid field
      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please correct the highlighted fields above.';
        }
        return;
      }

      // Subject value from form
      const subjectInput = document.getElementById('contact-subject');
      const subjectVal = subjectInput && subjectInput.value.trim() 
        ? subjectInput.value.trim() 
        : `Portfolio Message from ${nameVal}`;

      // Construct mailto link with encoded subject and body
      const mailtoBody = `Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`;
      const mailtoUrl = `mailto:khananamamjad2211@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(mailtoBody)}`;

      // Update submit button state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Opening Email App...</span>`;
      }

      // Display honest status banner and open email client
      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = `Form validated! Opening your email app to send your message to khananamamjad2211@gmail.com. Thank you, ${nameVal}!`;
        }

        // Trigger user's default email client
        window.location.href = mailtoUrl;

        // Reset submit button and form
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <span>Send via Email Client</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            `;
          }
          contactForm.reset();
        }, 1200);

        // Clear the status alert after 10 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
          }
        }, 10000);
      }, 400);
    });
  }


  /* ----------------------------------------------------------------------------
   * 5. BACK TO TOP BUTTON
   * ----------------------------------------------------------------------------
   * Shows a floating button when the user scrolls down more than 350px.
   * Clicking it scrolls back up smoothly.
   */
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ----------------------------------------------------------------------------
   * 6. DYNAMIC CURRENT YEAR IN FOOTER
   * ----------------------------------------------------------------------------
   * Ensures the copyright year always displays the accurate current year.
   */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
