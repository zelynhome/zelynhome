(function () {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const yearTarget = document.querySelector('[data-year]');

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      const opened = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
  }

  const revealTargets = document.querySelectorAll('.reveal');

  if (revealTargets.length) {
    if (mediaQuery.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (element) {
        element.classList.add('is-visible');
      });
    } else {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -10% 0px'
        }
      );

      revealTargets.forEach(function (element) {
        revealObserver.observe(element);
      });
    }
  }

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item, index) {
    const trigger = item.querySelector('[data-faq-trigger]');
    const answer = item.querySelector('[data-faq-answer]');

    if (!trigger || !answer) {
      return;
    }

    const answerId = answer.id || 'faq-answer-' + (index + 1);
    answer.id = answerId;
    trigger.setAttribute('aria-controls', answerId);

    const setOpenState = function (open) {
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      item.classList.toggle('is-open', open);

      if (mediaQuery.matches) {
        answer.style.maxHeight = open ? 'none' : '0px';
        return;
      }

      if (open) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(function () {
          answer.style.maxHeight = '0px';
        });
      }
    };

    setOpenState(index === 0);

    trigger.addEventListener('click', function () {
      const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';
      setOpenState(shouldOpen);
    });
  });
})();
