onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);

    // Add click handlers to all flower centers (pass the clicked element for popover positioning)
    const flowerCenters = document.querySelectorAll('.flower__white-circle');
    flowerCenters.forEach((center, index) => {
      center.addEventListener('click', (e) => openFlowerModal(index + 1, e.currentTarget));
    });

    // Close modal when clicking outside the content
    const modals = document.querySelectorAll('.flower-modal');
    window.addEventListener('click', (event) => {
      modals.forEach(modal => {
        if (event.target === modal) {
          closeFlowerModal();
        }
      });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeFlowerModal();
      }
    });
  };

  function openFlowerModal(flowerNumber, clickedEl) {
    // Close all modals first and clear any popover state
    document.querySelectorAll('.flower-modal').forEach(modal => {
      modal.classList.remove('show', 'popover');
      modal.style.removeProperty('--modal-left');
      modal.style.removeProperty('--modal-top');
    });

    // Open the selected modal
    const modal = document.getElementById('flowerModal' + flowerNumber);
    if (modal) {
      // If we have the clicked element, position the modal near that flower (popover)
      if (clickedEl) {
        const flowerEl = clickedEl.closest('.flower') || clickedEl;
        const rect = flowerEl.getBoundingClientRect();
        let centerX = rect.left + rect.width / 2;
        let centerY = rect.top + rect.height / 2;

        // Simple viewport clamps so the popover doesn't go off-screen
        const minX = 90;
        const maxX = window.innerWidth - 90;
        centerX = Math.min(Math.max(centerX, minX), maxX);

        const preferredTop = centerY - rect.height * 0.35;
        const minTop = 70;
        const maxTop = window.innerHeight - 120;
        const topPos = Math.min(Math.max(preferredTop, minTop), maxTop);

        modal.style.setProperty('--modal-left', `${centerX}px`);
        modal.style.setProperty('--modal-top', `${topPos}px`);
        modal.classList.add('popover');
        // Trigger a quick bloom/opening animation on the clicked flower
        try {
          const leafs = flowerEl.querySelector('.flower__leafs');
          flowerEl.classList.add('blooming');
          if (leafs) {
            const onEnd = () => {
              flowerEl.classList.remove('blooming');
              leafs.removeEventListener('animationend', onEnd);
            };
            leafs.addEventListener('animationend', onEnd);
            // safety fallback to remove class
            setTimeout(() => {
              flowerEl.classList.remove('blooming');
              try { leafs.removeEventListener('animationend', onEnd); } catch (e) {}
            }, 800);
          } else {
            setTimeout(() => flowerEl.classList.remove('blooming'), 600);
          }
        } catch (e) {
          // ignore errors if structure differs
        }
      }

      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeFlowerModal() {
    document.querySelectorAll('.flower-modal').forEach(modal => {
      modal.classList.remove('show', 'popover');
      modal.style.removeProperty('--modal-left');
      modal.style.removeProperty('--modal-top');
    });
    // remove blooming state from any flower
    document.querySelectorAll('.flower.blooming').forEach(f => f.classList.remove('blooming'));
    document.body.style.overflow = 'auto';
  }

  // Mobile: make the love message full-screen and dismissible by tap
  (function mobileLoveMessage() {
    const loveMessage = document.querySelector('.love-message');
    if (!loveMessage) return;
    function enableMobileFull() {
      if (window.innerWidth <= 768) {
        loveMessage.classList.add('mobile-full');
        // allow dismiss by tap
        loveMessage.addEventListener('click', () => {
          loveMessage.style.display = 'none';
        }, { once: true });
        // auto-hide after 4 seconds
        setTimeout(() => { loveMessage.style.display = 'none'; }, 4000);
      } else {
        loveMessage.classList.remove('mobile-full');
        loveMessage.style.display = '';
      }
    }
    enableMobileFull();
    window.addEventListener('resize', enableMobileFull);
  })();

  // Mobile: trigger flower pop animation (center -> upward) to make flowers prominent
  (function mobileFlowersPop() {
    const flowers = document.querySelector('.flowers');
    if (!flowers) return;

    function triggerPop() {
      if (window.innerWidth <= 768) {
        // force repaint then add class to play animation
        flowers.classList.remove('mobile-pop');
        void flowers.offsetWidth;
        flowers.classList.add('mobile-pop');
        // remove class after animation to allow retrigger on resize
        const onEnd = () => {
          flowers.classList.remove('mobile-pop');
          flowers.removeEventListener('animationend', onEnd);
        };
        flowers.addEventListener('animationend', onEnd);
      } else {
        flowers.classList.remove('mobile-pop');
      }
    }

    // run on load and on resize
    triggerPop();
    window.addEventListener('resize', () => {
      // debounce a bit
      clearTimeout(window._flowerPopTimeout);
      window._flowerPopTimeout = setTimeout(triggerPop, 150);
    });
  })();
