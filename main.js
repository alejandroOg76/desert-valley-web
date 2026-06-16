/* ===================== MAIN.JS — Desert Valley ===================== */

// ---- NAV SCROLL ----
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const isHero = document.querySelector('.hero');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.remove('transparent', 'nav-transparent');
      nav.classList.add('solid');
    } else {
      if (isHero) {
        nav.classList.add('transparent', 'nav-transparent');
        nav.classList.remove('solid');
      }
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav);
})();

// ---- HAMBURGER MENU ----
(function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

// ---- ACTIVE NAV LINK ----
(function initActiveLink() {
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- HERO BG PARALLAX ----
(function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  bg.classList.add('loaded');
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.3;
    bg.style.transform = `scale(1) translateY(${y}px)`;
  });
})();

// ---- SCROLL REVEAL ----
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

// ---- COUNTER ANIMATION ----
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString() + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

// ---- PRODUCT FILTERS ----
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  if (!filterBtns.length) return;

  let activeCat = 'all';
  let activeCountry = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const value = btn.dataset.value;

      // Remove active from same group
      document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (group === 'category') activeCat = value;
      if (group === 'country') activeCountry = value;

      cards.forEach(card => {
        const cat = card.dataset.category;
        const countries = card.dataset.countries;
        const catMatch = activeCat === 'all' || cat === activeCat;
        const countryMatch = activeCountry === 'all' || countries.includes(activeCountry);
        if (catMatch && countryMatch) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ---- PRODUCT MODAL ----
(function initModal() {
  const overlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  if (!overlay) return;

  function openModal(data) {
    document.querySelector('.modal-title').textContent = data.name;
    document.querySelector('.modal-hero-img').src = data.img;
    document.querySelector('.modal-description').textContent = data.description;
    document.querySelector('.modal-composition').textContent = data.composition;
    document.querySelector('.modal-benefits').textContent = data.benefits;
    document.querySelector('.modal-crops-text').textContent = data.crops;
    document.querySelector('.modal-application').textContent = data.application;
    document.querySelector('.modal-category-val').textContent = data.category;
    document.querySelector('.modal-format-val').textContent = data.formats;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      openModal({
        name: card.dataset.name,
        img: card.dataset.img,
        description: card.dataset.description,
        composition: card.dataset.composition,
        benefits: card.dataset.benefits,
        crops: card.dataset.crops,
        application: card.dataset.application,
        category: card.dataset.category,
        formats: card.dataset.formats
      });
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

// ---- COUNTRY TABS ----
(function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.querySelector(`.tab-content[data-tab="${target}"]`);
      if (content) {
        content.classList.add('active');
        // re-trigger reveal for new content
        content.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });
  });
})();

// ---- SERVICE CARD EXPAND ----
(function initServiceExpand() {
  document.querySelectorAll('.service-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const extra = card.querySelector('.service-extra');
      if (!extra) return;
      const isOpen = extra.style.maxHeight;
      if (isOpen) {
        extra.style.maxHeight = '';
        btn.textContent = 'Ver más +';
      } else {
        extra.style.maxHeight = extra.scrollHeight + 'px';
        btn.textContent = 'Ver menos −';
      }
    });
  });
})();

// ---- CONTACT FORM ----
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Mensaje enviado';
    btn.style.background = '#388E3C';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

// ---- CATEGORY LINK (home → productos con filtro) ----
(function initCategoryLinks() {
  document.querySelectorAll('[data-goto-category]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const cat = el.dataset.gotoCategory;
      sessionStorage.setItem('filterCategory', cat);
      window.location.href = 'productos.html';
    });
  });
  // Restore filter on productos.html
  if (window.location.pathname.includes('productos')) {
    const cat = sessionStorage.getItem('filterCategory');
    if (cat) {
      sessionStorage.removeItem('filterCategory');
      setTimeout(() => {
        const btn = document.querySelector(`.filter-btn[data-group="category"][data-value="${cat}"]`);
        if (btn) btn.click();
      }, 100);
    }
  }
})();
