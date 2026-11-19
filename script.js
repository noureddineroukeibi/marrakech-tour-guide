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
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // 2. Toggle Mobile Menu
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      if (settingsMenu && !settingsMenu.classList.contains('hidden')) {
        settingsMenu.classList.add('hidden');
      }
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.mobile-link, .mobile-btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // Close dropdowns when clicking outside
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

  // 3. Dark / Light Mode Toggle
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (themeToggle) themeToggle.textContent = '☀️ Light';
    } else {
      document.body.classList.remove('light-mode');
      if (themeToggle) themeToggle.textContent = '🌙 Dark';
    }
    localStorage.setItem('siteTheme', theme);
  }

  const savedTheme = localStorage.getItem('siteTheme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  // 4. Language Switcher (EN / FR / AR + RTL support)
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
      mode: 'Mode'
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
      mode: 'Mode'
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
      mode: 'الوضع'
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    // Direction RTL for Arabic, LTR for EN/FR
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update desktop & mobile nav links
    const navAnchors = document.querySelectorAll('.nav-links a, .mobile-menu ul li:not(:last-child) a');
    const keys = ['home', 'activities', 'gallery', 'about', 'contact'];
    navAnchors.forEach((a, idx) => {
      const key = keys[idx % keys.length];
      if (dict[key]) a.textContent = dict[key];
    });

    // Update Book Now buttons
    document.querySelectorAll('.btn-book').forEach((btn) => {
      btn.textContent = dict.bookNow;
    });

    // Update Settings links & labels
    const dropdownLinks = document.querySelectorAll('#settings-menu > a');
    if (dropdownLinks[0]) dropdownLinks[0].textContent = dict.resources;
    if (dropdownLinks[1]) dropdownLinks[1].textContent = dict.privacy;
    if (dropdownLinks[2]) dropdownLinks[2].textContent = dict.terms;

    const settingItems = document.querySelectorAll('#settings-menu .setting-item span');
    if (settingItems[0]) settingItems[0].textContent = dict.language;
    if (settingItems[1]) settingItems[1].textContent = dict.mode;

    if (langSelect) langSelect.value = lang;
    localStorage.setItem('siteLang', lang);
  }

  const savedLang = localStorage.getItem('siteLang') || 'en';
  applyLanguage(savedLang);

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }
});