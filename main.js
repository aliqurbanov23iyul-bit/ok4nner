onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // Popup logic: when user clicks/taps the flower center (white circle or yellow lights), show a card
  const overlay = document.getElementById('popup-overlay');
  const messageEl = document.getElementById('popup-message');
  const closeBtn = document.getElementById('popup-close');

  // Messages (one per flower). These are richer, longer messages suited for a heartfelt greeting.
  const texts = [
    {
      title: 'Röya, sən çox gözəlsən',
      body: `Röya, sən çox gözəlsən — ürəyim sənin sevginlə doludur. Yeni ilin mübarək olsun! Bu yeni ildə hər anın sevinc, uğur və gözəl xatirələrlə dolu olsun.`
    },
    {
      title: 'Xoşbəxt Yeni İl!',
      body: `Bu yeni il sənin üçün parlaq ümidlər gətirsin. Gülüşün həmişə bu qədər şirin qalsın. Sən mənim ən qiymətli düşüncəmsən.`
    },
    {
      title: 'Sən mənim ilhamımsan',
      body: `Hər gülüşün, hər baxışın mənə yeni güc verir. Yeni ilimiz sevgi, uğur və rəngarəng anlarla dolu olsun. Səni çox sevirəm.`
    }
  ];

  // Helper to find the flower index for a clicked element
  const getFlowerIndex = (el) => {
    if (!el) return 0;
    const flower = el.closest('.flower');
    if (!flower) return 0;
    const flowers = Array.from(document.querySelectorAll('.flower'));
    const idx = flowers.indexOf(flower);
    return idx >= 0 ? idx : 0;
  };

  // Select both the white center and the small yellow lights (visible center)
  const clickables = Array.from(document.querySelectorAll('.flower__white-circle, .flower__light'));

  const openPopupFor = (idx) => {
    const obj = texts[idx] || texts[0];
    if (messageEl) messageEl.innerHTML = (`<p>${obj.body}</p>`);
    const titleEl = document.getElementById('popup-title');
    if (titleEl) titleEl.textContent = obj.title || '';
    if (overlay) overlay.classList.add('visible');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
  };

  clickables.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = getFlowerIndex(e.currentTarget);
      openPopupFor(idx);
    });
    el.addEventListener('touchstart', (ev) => {
      ev.preventDefault();
      const idx = getFlowerIndex(ev.currentTarget);
      openPopupFor(idx);
    }, { passive: false });
  });

  const hide = () => {
    if (overlay) overlay.classList.remove('visible');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  };

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === closeBtn) hide();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', hide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
};