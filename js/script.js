// ===== Preloader =====
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('done'), 350);
});

// ===== Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Header scroll state =====
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Stat counters =====
const stats = document.querySelectorAll('.stat-num[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
stats.forEach(el => statObserver.observe(el));

// ===== Detalle de flota (modal) =====
const fleetItems = document.querySelectorAll('.fleet-item');
const fleetOverlay = document.getElementById('fleetModalOverlay');
const fleetMedia = document.getElementById('fleetModalMedia');
const fleetTitle = document.getElementById('fleetModalTitle');
const fleetDesc = document.getElementById('fleetModalDesc');
const fleetClose = document.getElementById('fleetModalClose');
let fleetLastFocused = null;

const truckIconSvg = '<svg viewBox="0 0 24 24" fill="none"><path d="M2 16V7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9M2 16h11M13 16h6.4a1 1 0 0 0 .97-.76l.8-3.2a1 1 0 0 0-.34-1.02L18.6 8.5a1 1 0 0 0-.63-.22H13" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="6" cy="17.2" r="1.6" stroke="currentColor" stroke-width="1.4"/><circle cx="17.5" cy="17.2" r="1.6" stroke="currentColor" stroke-width="1.4"/></svg>';

const openFleetModal = (item) => {
  const img = item.getAttribute('data-img');
  const title = item.getAttribute('data-title') || '';
  const desc = item.getAttribute('data-desc') || '';

  if (img) {
    fleetMedia.className = 'fleet-modal-media';
    fleetMedia.innerHTML = `<img src="${img}" alt="${title}">`;
  } else {
    fleetMedia.className = 'fleet-modal-media no-image';
    fleetMedia.innerHTML = truckIconSvg;
  }
  fleetTitle.textContent = title;
  fleetDesc.textContent = desc;

  fleetLastFocused = document.activeElement;
  fleetOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  fleetClose.focus();
};

const closeFleetModal = () => {
  fleetOverlay.classList.remove('show');
  document.body.style.overflow = '';
  if (fleetLastFocused) fleetLastFocused.focus();
};

if (fleetOverlay && fleetClose) {
  fleetItems.forEach((item) => {
    item.addEventListener('click', () => openFleetModal(item));
  });
  fleetClose.addEventListener('click', closeFleetModal);
  fleetOverlay.addEventListener('click', (e) => {
    if (e.target === fleetOverlay) closeFleetModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fleetOverlay.classList.contains('show')) closeFleetModal();
  });
}

// ===== Contact form (client-side only) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form && formNote) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Gracias por tu mensaje. Te contactaremos pronto.';
    formNote.style.color = '#c8102e';
    form.reset();
  });
}
