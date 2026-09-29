/* ==========================================================================
   Step Up Dance Academy - Gallery & Lightbox Module
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentItems = Array.from(galleryItems);
  let currentIndex = 0;

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update active items list for lightbox navigation
      currentItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  let lightboxTimer = null;

  function startLightboxAutoplay() {
    stopLightboxAutoplay();
    lightboxTimer = setInterval(() => {
      if (lightbox?.classList.contains('active')) {
        currentIndex = (currentIndex + 1) % currentItems.length;
        showLightboxImage();
      }
    }, 2000);
  }

  function stopLightboxAutoplay() {
    if (lightboxTimer) {
      clearInterval(lightboxTimer);
      lightboxTimer = null;
    }
  }

  // Lightbox Trigger
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || img.alt || 'Step Up Dance Gallery';

      currentIndex = currentItems.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;

      showLightboxImage();
      lightbox?.classList.add('active');
      document.body.style.overflow = 'hidden';
      startLightboxAutoplay();
    });
  });

  function showLightboxImage() {
    if (currentItems.length === 0) return;
    const targetItem = currentItems[currentIndex];
    const img = targetItem.querySelector('img');
    const title = targetItem.getAttribute('data-title') || img.alt;

    if (lightboxImg) lightboxImg.src = img.src;
    if (lightboxCaption) lightboxCaption.textContent = title;
  }

  // Navigation
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    showLightboxImage();
    startLightboxAutoplay();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentItems.length;
    showLightboxImage();
    startLightboxAutoplay();
  });

  closeBtn?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
    stopLightboxAutoplay();
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      stopLightboxAutoplay();
    }
  });
}
