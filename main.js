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
