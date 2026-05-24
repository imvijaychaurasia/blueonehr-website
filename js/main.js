// BlueOneHR Website — main.js

// ── Mobile menu toggle ────────────────────────────────────────────────────────
const menuBtn  = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// ── Sticky nav on scroll ──────────────────────────────────────────────────────
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('shadow-md');
    } else {
      nav.classList.remove('shadow-md');
    }
  }, { passive: true });
}

// ── Smooth scroll for anchor links ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      if (mobileMenu) mobileMenu.classList.remove('open');
    }
  });
});

// ── Intersection Observer — fade-in on scroll ─────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
    observer.observe(el);
  });
}

// ── Active nav link highlight based on scroll position ───────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-section-link');
if (sections.length && navLinks.length) {
  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'font-semibold');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('text-blue-600', 'font-semibold');
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
}
