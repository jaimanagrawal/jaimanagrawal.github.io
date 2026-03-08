// ===== NAV: add .scrolled on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== INTERSECTION OBSERVER: animate elements on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of groups
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Observe all animated elements and add stagger delays
document.querySelectorAll('[data-anim]').forEach((el, i) => {
  // Stagger siblings within same parent
  const siblings = el.parentElement.querySelectorAll('[data-anim]');
  const index = Array.from(siblings).indexOf(el);
  el.dataset.delay = index * 120;
  observer.observe(el);
});

// ===== SMOOTH ACTIVE LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` 
          ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ===== SKILL TAGS: subtle entrance on hover area =====
document.querySelectorAll('.skill-group').forEach(group => {
  group.addEventListener('mouseenter', () => {
    group.querySelectorAll('.tag').forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 30}ms`;
    });
  });
  group.addEventListener('mouseleave', () => {
    group.querySelectorAll('.tag').forEach(tag => {
      tag.style.transitionDelay = '0ms';
    });
  });
});
