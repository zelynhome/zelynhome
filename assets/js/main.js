(function () {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const yearTarget = document.querySelector('[data-year]');

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener('click', function () {
    const opened = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
})();
