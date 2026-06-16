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

// ---- TELÉFONO INTERNACIONAL (selector de prefijo con buscador) ----
(function initPhoneIntl() {
  const inputs = document.querySelectorAll('input.tel-intl');
  if (!inputs.length) return;

  // Lista mundial: { n: nombre, i: ISO2, d: prefijo }
  const COUNTRIES = [
    {n:'Afganistán',i:'AF',d:'93'},{n:'Albania',i:'AL',d:'355'},{n:'Alemania',i:'DE',d:'49'},
    {n:'Andorra',i:'AD',d:'376'},{n:'Angola',i:'AO',d:'244'},{n:'Anguila',i:'AI',d:'1264'},
    {n:'Antigua y Barbuda',i:'AG',d:'1268'},{n:'Arabia Saudita',i:'SA',d:'966'},{n:'Argelia',i:'DZ',d:'213'},
    {n:'Argentina',i:'AR',d:'54'},{n:'Armenia',i:'AM',d:'374'},{n:'Aruba',i:'AW',d:'297'},
    {n:'Australia',i:'AU',d:'61'},{n:'Austria',i:'AT',d:'43'},{n:'Azerbaiyán',i:'AZ',d:'994'},
    {n:'Bahamas',i:'BS',d:'1242'},{n:'Bangladés',i:'BD',d:'880'},{n:'Barbados',i:'BB',d:'1246'},
    {n:'Baréin',i:'BH',d:'973'},{n:'Bélgica',i:'BE',d:'32'},{n:'Belice',i:'BZ',d:'501'},
    {n:'Benín',i:'BJ',d:'229'},{n:'Bermudas',i:'BM',d:'1441'},{n:'Bielorrusia',i:'BY',d:'375'},
    {n:'Bolivia',i:'BO',d:'591'},{n:'Bosnia y Herzegovina',i:'BA',d:'387'},{n:'Botsuana',i:'BW',d:'267'},
    {n:'Brasil',i:'BR',d:'55'},{n:'Brunéi',i:'BN',d:'673'},{n:'Bulgaria',i:'BG',d:'359'},
    {n:'Burkina Faso',i:'BF',d:'226'},{n:'Burundi',i:'BI',d:'257'},{n:'Bután',i:'BT',d:'975'},
    {n:'Cabo Verde',i:'CV',d:'238'},{n:'Camboya',i:'KH',d:'855'},{n:'Camerún',i:'CM',d:'237'},
    {n:'Canadá',i:'CA',d:'1'},{n:'Catar',i:'QA',d:'974'},{n:'Chad',i:'TD',d:'235'},
    {n:'Chile',i:'CL',d:'56'},{n:'China',i:'CN',d:'86'},{n:'Chipre',i:'CY',d:'357'},
    {n:'Colombia',i:'CO',d:'57'},{n:'Comoras',i:'KM',d:'269'},{n:'Corea del Norte',i:'KP',d:'850'},
    {n:'Corea del Sur',i:'KR',d:'82'},{n:'Costa de Marfil',i:'CI',d:'225'},{n:'Costa Rica',i:'CR',d:'506'},
    {n:'Croacia',i:'HR',d:'385'},{n:'Cuba',i:'CU',d:'53'},{n:'Curazao',i:'CW',d:'599'},
    {n:'Dinamarca',i:'DK',d:'45'},{n:'Dominica',i:'DM',d:'1767'},{n:'Ecuador',i:'EC',d:'593'},
    {n:'Egipto',i:'EG',d:'20'},{n:'El Salvador',i:'SV',d:'503'},{n:'Emiratos Árabes Unidos',i:'AE',d:'971'},
    {n:'Eritrea',i:'ER',d:'291'},{n:'Eslovaquia',i:'SK',d:'421'},{n:'Eslovenia',i:'SI',d:'386'},
    {n:'España',i:'ES',d:'34'},{n:'Estados Unidos',i:'US',d:'1'},{n:'Estonia',i:'EE',d:'372'},
    {n:'Esuatini',i:'SZ',d:'268'},{n:'Etiopía',i:'ET',d:'251'},{n:'Filipinas',i:'PH',d:'63'},
    {n:'Finlandia',i:'FI',d:'358'},{n:'Fiyi',i:'FJ',d:'679'},{n:'Francia',i:'FR',d:'33'},
    {n:'Gabón',i:'GA',d:'241'},{n:'Gambia',i:'GM',d:'220'},{n:'Georgia',i:'GE',d:'995'},
    {n:'Ghana',i:'GH',d:'233'},{n:'Gibraltar',i:'GI',d:'350'},{n:'Granada',i:'GD',d:'1473'},
    {n:'Grecia',i:'GR',d:'30'},{n:'Groenlandia',i:'GL',d:'299'},{n:'Guadalupe',i:'GP',d:'590'},
    {n:'Guam',i:'GU',d:'1671'},{n:'Guatemala',i:'GT',d:'502'},{n:'Guayana Francesa',i:'GF',d:'594'},
    {n:'Guinea',i:'GN',d:'224'},{n:'Guinea Ecuatorial',i:'GQ',d:'240'},{n:'Guinea-Bisáu',i:'GW',d:'245'},
    {n:'Guyana',i:'GY',d:'592'},{n:'Haití',i:'HT',d:'509'},{n:'Honduras',i:'HN',d:'504'},
    {n:'Hong Kong',i:'HK',d:'852'},{n:'Hungría',i:'HU',d:'36'},{n:'India',i:'IN',d:'91'},
    {n:'Indonesia',i:'ID',d:'62'},{n:'Irak',i:'IQ',d:'964'},{n:'Irán',i:'IR',d:'98'},
    {n:'Irlanda',i:'IE',d:'353'},{n:'Isla de Man',i:'IM',d:'44'},{n:'Islandia',i:'IS',d:'354'},
    {n:'Islas Caimán',i:'KY',d:'1345'},{n:'Islas Feroe',i:'FO',d:'298'},{n:'Islas Malvinas',i:'FK',d:'500'},
    {n:'Islas Marshall',i:'MH',d:'692'},{n:'Islas Salomón',i:'SB',d:'677'},{n:'Islas Vírgenes Británicas',i:'VG',d:'1284'},
    {n:'Islas Vírgenes de EE.UU.',i:'VI',d:'1340'},{n:'Israel',i:'IL',d:'972'},{n:'Italia',i:'IT',d:'39'},
    {n:'Jamaica',i:'JM',d:'1876'},{n:'Japón',i:'JP',d:'81'},{n:'Jordania',i:'JO',d:'962'},
    {n:'Kazajistán',i:'KZ',d:'7'},{n:'Kenia',i:'KE',d:'254'},{n:'Kirguistán',i:'KG',d:'996'},
    {n:'Kiribati',i:'KI',d:'686'},{n:'Kosovo',i:'XK',d:'383'},{n:'Kuwait',i:'KW',d:'965'},
    {n:'Laos',i:'LA',d:'856'},{n:'Lesoto',i:'LS',d:'266'},{n:'Letonia',i:'LV',d:'371'},
    {n:'Líbano',i:'LB',d:'961'},{n:'Liberia',i:'LR',d:'231'},{n:'Libia',i:'LY',d:'218'},
    {n:'Liechtenstein',i:'LI',d:'423'},{n:'Lituania',i:'LT',d:'370'},{n:'Luxemburgo',i:'LU',d:'352'},
    {n:'Macao',i:'MO',d:'853'},{n:'Macedonia del Norte',i:'MK',d:'389'},{n:'Madagascar',i:'MG',d:'261'},
    {n:'Malasia',i:'MY',d:'60'},{n:'Malaui',i:'MW',d:'265'},{n:'Maldivas',i:'MV',d:'960'},
    {n:'Malí',i:'ML',d:'223'},{n:'Malta',i:'MT',d:'356'},{n:'Marruecos',i:'MA',d:'212'},
    {n:'Martinica',i:'MQ',d:'596'},{n:'Mauricio',i:'MU',d:'230'},{n:'Mauritania',i:'MR',d:'222'},
    {n:'México',i:'MX',d:'52'},{n:'Micronesia',i:'FM',d:'691'},{n:'Moldavia',i:'MD',d:'373'},
    {n:'Mónaco',i:'MC',d:'377'},{n:'Mongolia',i:'MN',d:'976'},{n:'Montenegro',i:'ME',d:'382'},
    {n:'Montserrat',i:'MS',d:'1664'},{n:'Mozambique',i:'MZ',d:'258'},{n:'Myanmar',i:'MM',d:'95'},
    {n:'Namibia',i:'NA',d:'264'},{n:'Nauru',i:'NR',d:'674'},{n:'Nepal',i:'NP',d:'977'},
    {n:'Nicaragua',i:'NI',d:'505'},{n:'Níger',i:'NE',d:'227'},{n:'Nigeria',i:'NG',d:'234'},
    {n:'Noruega',i:'NO',d:'47'},{n:'Nueva Caledonia',i:'NC',d:'687'},{n:'Nueva Zelanda',i:'NZ',d:'64'},
    {n:'Omán',i:'OM',d:'968'},{n:'Países Bajos',i:'NL',d:'31'},{n:'Pakistán',i:'PK',d:'92'},
    {n:'Palaos',i:'PW',d:'680'},{n:'Palestina',i:'PS',d:'970'},{n:'Panamá',i:'PA',d:'507'},
    {n:'Papúa Nueva Guinea',i:'PG',d:'675'},{n:'Paraguay',i:'PY',d:'595'},{n:'Perú',i:'PE',d:'51'},
    {n:'Polinesia Francesa',i:'PF',d:'689'},{n:'Polonia',i:'PL',d:'48'},{n:'Portugal',i:'PT',d:'351'},
    {n:'Puerto Rico',i:'PR',d:'1787'},{n:'Reino Unido',i:'GB',d:'44'},{n:'República Centroafricana',i:'CF',d:'236'},
    {n:'República Checa',i:'CZ',d:'420'},{n:'República del Congo',i:'CG',d:'242'},{n:'República Democrática del Congo',i:'CD',d:'243'},
    {n:'República Dominicana',i:'DO',d:'1809'},{n:'Reunión',i:'RE',d:'262'},{n:'Ruanda',i:'RW',d:'250'},
    {n:'Rumanía',i:'RO',d:'40'},{n:'Rusia',i:'RU',d:'7'},{n:'Samoa',i:'WS',d:'685'},
    {n:'San Cristóbal y Nieves',i:'KN',d:'1869'},{n:'San Marino',i:'SM',d:'378'},{n:'San Vicente y las Granadinas',i:'VC',d:'1784'},
    {n:'Santa Lucía',i:'LC',d:'1758'},{n:'Santo Tomé y Príncipe',i:'ST',d:'239'},{n:'Senegal',i:'SN',d:'221'},
    {n:'Serbia',i:'RS',d:'381'},{n:'Seychelles',i:'SC',d:'248'},{n:'Sierra Leona',i:'SL',d:'232'},
    {n:'Singapur',i:'SG',d:'65'},{n:'Siria',i:'SY',d:'963'},{n:'Somalia',i:'SO',d:'252'},
    {n:'Sri Lanka',i:'LK',d:'94'},{n:'Sudáfrica',i:'ZA',d:'27'},{n:'Sudán',i:'SD',d:'249'},
    {n:'Sudán del Sur',i:'SS',d:'211'},{n:'Suecia',i:'SE',d:'46'},{n:'Suiza',i:'CH',d:'41'},
    {n:'Surinam',i:'SR',d:'597'},{n:'Tailandia',i:'TH',d:'66'},{n:'Taiwán',i:'TW',d:'886'},
    {n:'Tanzania',i:'TZ',d:'255'},{n:'Tayikistán',i:'TJ',d:'992'},{n:'Timor Oriental',i:'TL',d:'670'},
    {n:'Togo',i:'TG',d:'228'},{n:'Tonga',i:'TO',d:'676'},{n:'Trinidad y Tobago',i:'TT',d:'1868'},
    {n:'Túnez',i:'TN',d:'216'},{n:'Turkmenistán',i:'TM',d:'993'},{n:'Turquía',i:'TR',d:'90'},
    {n:'Tuvalu',i:'TV',d:'688'},{n:'Ucrania',i:'UA',d:'380'},{n:'Uganda',i:'UG',d:'256'},
    {n:'Uruguay',i:'UY',d:'598'},{n:'Uzbekistán',i:'UZ',d:'998'},{n:'Vanuatu',i:'VU',d:'678'},
    {n:'Vaticano',i:'VA',d:'379'},{n:'Venezuela',i:'VE',d:'58'},{n:'Vietnam',i:'VN',d:'84'},
    {n:'Yemen',i:'YE',d:'967'},{n:'Yibuti',i:'DJ',d:'253'},{n:'Zambia',i:'ZM',d:'260'},
    {n:'Zimbabue',i:'ZW',d:'263'}
  ];

  const flag = iso => iso.replace(/./g, c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65));
  const DEFAULT = 'HN';

  inputs.forEach(input => {
    const field = document.createElement('div');
    field.className = 'phone-field';
    input.parentNode.insertBefore(field, input);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'phone-code';
    field.appendChild(btn);
    field.appendChild(input);

    const dd = document.createElement('div');
    dd.className = 'phone-dropdown';
    dd.innerHTML = '<div class="phone-search-wrap"><input type="text" class="phone-search" placeholder="Buscar país o código..."></div><div class="phone-list"></div>';
    field.appendChild(dd);

    const search = dd.querySelector('.phone-search');
    const list = dd.querySelector('.phone-list');
    let current = COUNTRIES.find(c => c.i === DEFAULT) || COUNTRIES[0];

    function renderBtn() {
      btn.innerHTML = `<span class="phone-flag">${flag(current.i)}</span><span class="phone-dial">+${current.d}</span><span class="caret">▼</span>`;
      input.dataset.dial = '+' + current.d;
    }
    function renderList(filter) {
      const f = (filter || '').trim().toLowerCase().replace('+', '');
      const items = COUNTRIES.filter(c => !f || c.n.toLowerCase().includes(f) || c.d.includes(f));
      if (!items.length) { list.innerHTML = '<div class="phone-empty">Sin resultados</div>'; return; }
      list.innerHTML = items.map(c =>
        `<div class="phone-option" data-i="${c.i}"><span class="phone-flag">${flag(c.i)}</span><span class="nm">${c.n}</span><span class="dl">+${c.d}</span></div>`
      ).join('');
    }
    function open() { dd.classList.add('open'); search.value = ''; renderList(''); search.focus(); }
    function close() { dd.classList.remove('open'); }

    renderBtn();
    btn.addEventListener('click', e => { e.stopPropagation(); dd.classList.contains('open') ? close() : open(); });
    search.addEventListener('input', () => renderList(search.value));
    list.addEventListener('click', e => {
      const opt = e.target.closest('.phone-option');
      if (!opt) return;
      current = COUNTRIES.find(c => c.i === opt.dataset.i);
      renderBtn();
      close();
      input.focus();
    });
    document.addEventListener('click', e => { if (!field.contains(e.target)) close(); });
  });
})();
