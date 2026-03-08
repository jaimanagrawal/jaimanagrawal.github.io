// ===== Mark JS as loaded so animations apply =====
document.body.classList.add('js-loaded');

// ===== NAV: add .scrolled on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== INTERSECTION OBSERVER: animate elements on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-anim]').forEach((el, i) => {
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

// ===== SKILL TAGS: stagger on hover =====
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
