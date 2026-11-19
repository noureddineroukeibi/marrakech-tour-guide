document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settings-btn');
  const settingsMenu = document.getElementById('settings-menu');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const langSelect = document.getElementById('lang-select');

  // 1. Toggle Settings Dropdown
  if (settingsBtn && settingsMenu) {
    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsMenu.classList.toggle('hidden');
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  }

  // 2. Toggle Mobile Menu
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      if (settingsMenu) settingsMenu.classList.add('hidden');
    });
  }

  // Close menus on link click
  document.querySelectorAll('.mobile-link, .mobile-btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (
      settingsMenu &&
      !settingsMenu.classList.contains('hidden') &&
      !settingsMenu.contains(e.target) &&
      e.target !== settingsBtn
    ) {
      settingsMenu.classList.add('hidden');
    }
  });

  // 3. Theme Toggle (Dark default / Light mode)
  function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-mode', isLight);
    if (themeToggle) {
      themeToggle.textContent = isLight ? '🌙 Dark' : '☀️ Light';
    }
    localStorage.setItem('siteTheme', theme);
  }

  applyTheme(localStorage.getItem('siteTheme') || 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  // 4. Full Translations (EN / FR / AR)
  const translations = {
    en: {
      home: 'Home',
      activities: 'Activities',
      gallery: 'Gallery',
      about: 'About Us',
      contact: 'Contact',
      bookNow: 'Book Now',
      resources: 'Resources',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      language: 'Language',
      mode: 'Mode',
      eyebrow: 'Marrakech, Morocco',
      heroTitle: 'Discover the Agafay Desert',
      heroDesc: 'Escape the city for a sunset camel ride, sweeping desert views, and a memorable evening near Marrakech.',
      exploreTours: 'Explore our tours',
      bookWhatsapp: 'Book via WhatsApp',
      toursTitle: 'Choose your experience',
      toursSubtitle: "Explore Marrakech's historic streets or the open landscapes of Agafay.",
      tour1Title: 'Medina Cultural Tour',
      tour1Desc: 'Explore the historic souks, Jemaa el-Fnaa, ancient palaces, and colorful streets with a local professional guide.',
      tour2Title: 'Agafay Desert Experience',
      tour2Desc: 'Enjoy desert views, camel rides, and a relaxing evening under the stars just outside Marrakech.',
      bookTour: 'Book this tour',
      galleryTitle: 'Agafay in pictures',
      gallerySubtitle: 'Take a glimpse at the desert landscape and its camel rides.',
      cap1: 'Rocky desert plains and distant mountains',
      cap2: 'A camel ride through the desert',
      cap3: 'Dromedaries in the Agafay landscape',
      contactTitle: 'Ready to explore?',
      contactDesc: 'Contact us on WhatsApp to ask a question or arrange your tour.'
    },
    fr: {
      home: 'Accueil',
      activities: 'Activités',
      gallery: 'Galerie',
      about: 'À propos',
      contact: 'Contact',
      bookNow: 'Réserver',
      resources: 'Ressources',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      language: 'Langue',
      mode: 'Mode',
      eyebrow: 'Marrakech, Maroc',
      heroTitle: 'Découvrez le Désert d’Agafay',
      heroDesc: 'Évadez-vous de la ville pour une balade à dos de dromadaire au coucher du soleil et une soirée inoubliable près de Marrakech.',
      exploreTours: 'Découvrir nos circuits',
      bookWhatsapp: 'Réserver via WhatsApp',
      toursTitle: 'Choisissez votre expérience',
      toursSubtitle: 'Explorez les ruelles historiques de Marrakech ou les grands espaces d’Agafay.',
      tour1Title: 'Visite Culturelle de la Médina',
      tour1Desc: 'Explorez les souks historiques, Jemaa el-Fna, les anciens palais et les ruelles colorées avec un guide local.',
      tour2Title: 'Expérience Désert d’Agafay',
      tour2Desc: 'Profitez des paysages désertiques, des balades à dos de dromadaire et d’une soirée paisible sous les étoiles.',
      bookTour: 'Réserver ce circuit',
      galleryTitle: 'Agafay en images',
      gallerySubtitle: 'Découvrez les paysages du désert et les balades à dos de dromadaire.',
      cap1: 'Plaines désertiques rocheuses et montagnes au loin',
      cap2: 'Balade à dos de dromadaire dans le désert',
      cap3: 'Dromadaires dans les paysages d’Agafay',
      contactTitle: 'Prêt à explorer ?',
      contactDesc: 'Contactez-nous sur WhatsApp pour poser une question ou organiser votre circuit.'
    },
    ar: {
      home: 'الرئيسية',
      activities: 'الأنشطة',
      gallery: 'المعرض',
      about: 'من نحن',
      contact: 'اتصل بنا',
      bookNow: 'احجز الآن',
      resources: 'المصادر',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      language: 'اللغة',
      mode: 'الوضع',
      eyebrow: 'مراكش، المغرب',
      heroTitle: 'اكتشف صحراء أكافاي',
      heroDesc: 'اهرب من صخب المدينة نحو جولة على الجمال عند الغروب، وإطلالات صحراوية واسعة، وأمسية لا تُنسى قرب مراكش.',
      exploreTours: 'اكتشف الجولات',
      bookWhatsapp: 'احجز عبر واتساب',
      toursTitle: 'اختر تجربتك',
      toursSubtitle: 'استكشف أزقة مراكش التاريخية أو المساحات المفتوحة في أكافاي.',
      tour1Title: 'جولة ثقافية في المدينة العتيقة',
      tour1Desc: 'اكتشف الأسواق التاريخية، ساحة جامع الفنا، القصور العتيقة، والأزقة المليئة بالألوان مع مرشد محلي.',
      tour2Title: 'تجربة صحراء أكافاي',
      tour2Desc: 'استمتع بإطلالات الصحراء، وجولات الجمال، وأمسية هادئة تحت النجوم خارج مراكش مباشرة.',
      bookTour: 'احجز هذه الجولة',
      galleryTitle: 'أكافاي بالصور',
      gallerySubtitle: 'نظرة قريبة على مناظر الصحراء وجولات الجمال.',
      cap1: 'سهول صحراوية صخرية وجبال في الأفق',
      cap2: 'جولة على الجمال عبر الصحراء',
      cap3: 'جمال في طبيعة صحراء أكافاي',
      contactTitle: 'مستعد للاستكشاف؟',
      contactDesc: 'تواصل معنا عبر واتساب لطرح سؤال أو ترتيب جولتك.'
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Navbar links
    const navAnchors = document.querySelectorAll('.nav-links a, .mobile-menu ul li:not(:last-child) a');
    const keys = ['home', 'activities', 'gallery', 'about', 'contact'];
    navAnchors.forEach((a, idx) => {
      const key = keys[idx % keys.length];
      if (dict[key]) a.textContent = dict[key];
    });

    // Book Now buttons
    document.querySelectorAll('.btn-book').forEach((btn) => {
      btn.textContent = dict.bookNow;
    });

    // Settings menu
    const dropdownLinks = document.querySelectorAll('#settings-menu > a');
    if (dropdownLinks[0]) dropdownLinks[0].textContent = dict.resources;
    if (dropdownLinks[1]) dropdownLinks[1].textContent = dict.privacy;
    if (dropdownLinks[2]) dropdownLinks[2].textContent = dict.terms;

    const settingItems = document.querySelectorAll('#settings-menu .setting-item span');
    if (settingItems[0]) settingItems[0].textContent = dict.language;
    if (settingItems[1]) settingItems[1].textContent = dict.mode;

    // Hero
    const eyebrow = document.querySelector('.eyebrow');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.querySelector('.hero-content > p:not(.eyebrow)');
    const primaryBtn = document.querySelector('.hero-content .btn-primary');
    const secondaryBtn = document.querySelector('.hero-content .btn-secondary');

    if (eyebrow) eyebrow.textContent = dict.eyebrow;
    if (heroTitle) heroTitle.textContent = dict.heroTitle;
    if (heroDesc) heroDesc.textContent = dict.heroDesc;
    if (primaryBtn) primaryBtn.textContent = dict.exploreTours;
    if (secondaryBtn) secondaryBtn.textContent = dict.bookWhatsapp;

    // Tours
    const toursTitle = document.getElementById('tours-title');
    const toursSubtitle = document.querySelector('#tours .section-title p');
    if (toursTitle) toursTitle.textContent = dict.toursTitle;
    if (toursSubtitle) toursSubtitle.textContent = dict.toursSubtitle;

    const cards = document.querySelectorAll('#tours .card');
    if (cards[0]) {
      const h3 = cards[0].querySelector('h3');
      const p = cards[0].querySelector('p');
      const btn = cards[0].querySelector('.btn');
      if (h3) h3.textContent = dict.tour1Title;
      if (p) p.textContent = dict.tour1Desc;
      if (btn) btn.textContent = dict.bookTour;
    }
    if (cards[1]) {
      const h3 = cards[1].querySelector('h3');
      const p = cards[1].querySelector('p');
      const btn = cards[1].querySelector('.btn');
      if (h3) h3.textContent = dict.tour2Title;
      if (p) p.textContent = dict.tour2Desc;
      if (btn) btn.textContent = dict.bookTour;
    }

    // Gallery
    const galleryTitle = document.getElementById('gallery-title');
    const gallerySubtitle = document.querySelector('#gallery .section-title p');
    if (galleryTitle) galleryTitle.textContent = dict.galleryTitle;
    if (gallerySubtitle) gallerySubtitle.textContent = dict.gallerySubtitle;

    const captions = document.querySelectorAll('#gallery figcaption');
    if (captions[0]) captions[0].textContent = dict.cap1;
    if (captions[1]) captions[1].textContent = dict.cap2;
    if (captions[2]) captions[2].textContent = dict.cap3;

    // Contact
    const contactTitle = document.getElementById('contact-title');
    const contactDesc = document.querySelector('#contact .section-title p');
    if (contactTitle) contactTitle.textContent = dict.contactTitle;
    if (contactDesc) contactDesc.textContent = dict.contactDesc;

    if (langSelect) langSelect.value = lang;
    localStorage.setItem('siteLang', lang);
  }

  applyLanguage(localStorage.getItem('siteLang') || 'en');

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }
});