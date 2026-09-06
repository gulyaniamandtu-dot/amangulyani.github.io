/**
 * Aman Gulyani — Digital Resume / Portfolio Interactive Logic
 * Vanilla JavaScript (No frameworks, no build tools)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initStickyHeader();
  initScrollSpy();
  initScrollReveal();
  initPhotoLightbox();
  initEmailCopy();
  initBackToTop();
  initGalleryAutoScroll();
});

/* ==========================================================================
   1. Theme Toggle (Light / Dark with localStorage persistence)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to saved theme or system preference
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

/* ==========================================================================
   2. Mobile Navigation Toggle & Outside Click
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggleBtn || !navLinks) return;

  function closeMenu() {
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }

  function toggleMenu() {
    const isOpen = toggleBtn.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    navLinks.classList.toggle('open', isOpen);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Sticky Header Shadow on Scroll
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   4. Scroll Spy (Highlight Active Nav Link)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   5. Scroll Reveal Animations (Subtle fade-up on viewport entry)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  // Check if browser supports IntersectionObserver and user hasn't reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Conferences Photo Lightbox / Gallery Viewer
   ========================================================================== */
function initPhotoLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('lightbox-modal');
  if (!galleryCards.length || !modal) return;

  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtitle = document.getElementById('lightbox-subtitle');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  // Collect gallery items metadata
  const galleryItems = Array.from(galleryCards).map(card => {
    const img = card.querySelector('.gallery-img');
    const title = card.querySelector('.gallery-event-title');
    const tag = card.querySelector('.gallery-tag');
    const year = card.querySelector('.gallery-year');
    const desc = card.querySelector('.gallery-desc');

    return {
      src: card.getAttribute('data-full-image') || (img ? img.src : ''),
      alt: img ? img.alt : 'Conference Photo',
      title: title ? title.textContent.trim() : 'Event',
      tag: tag ? tag.textContent.trim() : '',
      year: year ? year.textContent.trim() : '',
      desc: desc ? desc.textContent.trim() : ''
    };
  });

  let currentIndex = 0;

  function updateModal(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    
    let sub = item.tag;
    if (item.year) sub += (sub ? ' • ' : '') + item.year;
    if (item.desc) sub += (sub ? ' — ' : '') + item.desc;
    lightboxSubtitle.textContent = sub;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} of ${galleryItems.length}`;
    }
  }

  function openLightbox(index) {
    updateModal(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    closeBtn.focus();
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    updateModal(nextIndex);
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModal(prevIndex);
  }

  // Attach card click listeners
  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
    // Keyboard accessibility for card
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View full photo for ${card.querySelector('.gallery-event-title')?.textContent || 'event'}`);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  // Modal controls
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });

  // Click outside content to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-modal')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

/* ==========================================================================
   7. One-Click Copy Email to Clipboard
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notice');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email');
    if (!email) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-https local file execution
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(`Email copied: ${email}`);
    } catch (err) {
      // If copying fails, fallback to mailto
      window.location.href = `mailto:${email}`;
    }
  });

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. Conferences Gallery Auto-Scroll
   ========================================================================== */
function initGalleryAutoScroll() {
  const scrollWrapper = document.getElementById('gallery-scroll');
  const grid = document.getElementById('gallery-grid');
  if (!scrollWrapper || !grid) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let autoScrollTimer = null;
  let isUserInteracting = false;

  function getCardWidth() {
    const card = grid.querySelector('.gallery-card');
    if (!card) return 300;
    const style = getComputedStyle(card);
    const gap = parseFloat(style.marginRight) || 20;
    return card.offsetWidth + gap;
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setInterval(() => {
      if (isUserInteracting) return;
      
      const scrollAmount = getCardWidth();
      const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
      let nextScroll = scrollWrapper.scrollLeft + scrollAmount;
      
      if (nextScroll >= maxScroll - 10) {
        nextScroll = 0; // Loop back to start
      }
      
      scrollWrapper.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
      });
    }, 3000);
  }

  function stopAutoScroll() {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  // Pause on user interaction
  const pauseEvents = ['pointerdown', 'wheel', 'touchstart'];
  pauseEvents.forEach(evt => {
    scrollWrapper.addEventListener(evt, () => { 
      isUserInteracting = true; 
      stopAutoScroll(); 
    }, { passive: true });
  });
  
  // Resume after interaction ends
  const resumeEvents = ['pointerup', 'pointerleave', 'touchend', 'mouseleave'];
  resumeEvents.forEach(evt => {
    scrollWrapper.addEventListener(evt, () => {
      isUserInteracting = false;
      setTimeout(startAutoScroll, 2000); // Resume after 2s pause
    }, { passive: true });
  });

  // Also pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoScroll();
    else startAutoScroll();
  });

  // Pause when lightbox is open
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    const observer = new MutationObserver(() => {
      if (modal.classList.contains('active')) {
        stopAutoScroll();
      } else if (!isUserInteracting) {
        startAutoScroll();
      }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
  }

  startAutoScroll();
}
