(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  const open = () => {
    nav.classList.add('nav--open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    toggle.classList.add('is-active');
  };

  const close = () => {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.classList.remove('is-active');
  };

  const toggleMenu = () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  };

  toggle.addEventListener('click', toggleMenu);

  // Закрытие по ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Закрытие по клику вне панели на мобильных
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') close();
  });
})();


