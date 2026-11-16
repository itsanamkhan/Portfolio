# Personal Portfolio Website — Anam Amjad Khan

A modern, responsive, and student-focused personal portfolio website built exclusively with **semantic HTML5**, **modern CSS3**, and **vanilla JavaScript (ES6+)**.

---

## 👤 Profile & Academic Overview

- **Name:** Anam Amjad Khan
- **Role:** Software Development Student
- **Program:** Bachelor of Vocation (B.Voc) in Software Development (First Year • FY)
- **Institution:** Jai Hind College, Mumbai
- **Foundational Education:** Higher Secondary Certificate (HSC) — Science
- **Direct Email:** [khananamamjad2211@gmail.com](mailto:khananamamjad2211@gmail.com)
- **GitHub Profile:** [https://github.com/itsanamkhan](https://github.com/itsanamkhan)

---

## 📁 File Structure

```text
anam-portfolio/
│
├── index.html        # Main HTML5 document (Semantic layout, SVG icons, responsive structure)
├── style.css         # Modern CSS3 stylesheet (CSS variables, Light/Dark mode, Grid/Flexbox)
├── script.js         # Vanilla JavaScript (Theme persistence, Mobile drawer, Scroll spy, Form mailto)
└── README.md         # Project documentation and guide
```

---

## 🚀 How to Run the Website

You do **not** need any backend server, Node.js packages, or build tools.

1. **Direct Browser Launch:**
   - Double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

2. **VS Code Live Server (Recommended):**
   - Open the `anam-portfolio` folder in **VS Code**.
   - Right-click `index.html` and select **"Open with Live Server"**.

---

## 🎨 Architectural Overview

### 1. Semantic HTML5 (`index.html`)
- **Navigation Bar:** Accessible sticky header with logo, section links, theme toggle, and mobile menu button.
- **Hero Section:** Student title, introduction, call-to-action buttons, verified GitHub link, and an interactive code card representation.
- **About Me:** Honest academic background covering B.Voc studies at Jai Hind College, HSC Science foundations, and realistic core learning goals.
- **Technical Skills:** Transparent categorization distinguishing skills in active practice (HTML5, CSS3, JavaScript basics, Python, C++) from concepts currently being studied (Data Structures, Algorithms, Asynchronous JavaScript).
- **Featured Project:** Showcases the **Personal Developer Portfolio** with tech stack tags and verified links.
- **Contact Section:** Direct contact channels (Email, GitHub, College Location) and an accessible contact form with client-side validation that initiates message delivery via the visitor's default email client.
- **Footer:** Quick navigation links, social links, and auto-updating copyright year.

### 2. Modern CSS3 Architecture (`style.css`)
- **CSS Custom Properties (Variables):** Complete dual-theme palette (`data-theme="light"` and `data-theme="dark"`).
- **Responsive Layout:** CSS Grid and Flexbox for fluid reflowing across mobile (< 480px), tablet (< 768px), and desktop viewports.
- **Glassmorphism:** Sticky navigation bar utilizing `backdrop-filter: blur(12px)`.
- **Accessibility:** Visible `:focus-visible` outlines, readable color contrast ratios, and smooth transitions.

### 3. Vanilla JavaScript (`script.js`)
- **Theme Switcher:** Toggles between light and dark modes with `localStorage` memory and OS system preference fallback.
- **Mobile Navigation:** Accessible hamburger menu toggle with auto-close on link click, outside click, and Escape key.
- **Scroll Spy:** Native `IntersectionObserver` updates the active navigation link based on current section visibility.
- **Contact Form Validation & Mailto Action:** Validates input fields and triggers the visitor's default mail client with pre-filled subject and body addressed to `khananamamjad2211@gmail.com`.
- **Back-to-Top Button:** Floats into view past 350px scroll depth for smooth return to the top.
