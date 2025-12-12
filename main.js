onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);

    // Add click handlers to all flower centers
    const flowerCenters = document.querySelectorAll('.flower__white-circle');
    flowerCenters.forEach((center, index) => {
      center.addEventListener('click', () => openFlowerModal(index + 1));
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

  function openFlowerModal(flowerNumber) {
    // Close all modals first
    document.querySelectorAll('.flower-modal').forEach(modal => {
      modal.classList.remove('show');
    });
    
    // Open the selected modal
    const modal = document.getElementById('flowerModal' + flowerNumber);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeFlowerModal() {
    document.querySelectorAll('.flower-modal').forEach(modal => {
      modal.classList.remove('show');
    });
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
