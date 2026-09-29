/* ==========================================================================
   Step Up Dance Academy - Main JavaScript (Navigation, Modals & Animations)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTrialModal();
  initFormValidation();
  initObsessionReviewsSlider();
  initScrollAnimations();
});

/* --- Header & Mobile Navigation --- */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --- OBSESSION DANCE STUDIO SYNCED REVIEWS SLIDER LOGIC --- */
function initObsessionReviewsSlider() {
  const reviewsContainer = document.querySelector('.obsession-reviews-container');
  if (!reviewsContainer) return;

  const avatarItems = document.querySelectorAll('.obsession-avatar-item');
  const reviewText = document.getElementById('obsessionReviewText');
  const reviewName = document.getElementById('obsessionReviewName');
  const reviewRole = document.getElementById('obsessionReviewRole');
  const prevBtn = document.querySelector('.obsession-nav-prev');
  const nextBtn = document.querySelector('.obsession-nav-next');

  const reviewsData = [
    {
      text: '"Step Up Dance Academy changed my life! Their classes and instructors are awesome... gave me the skills and confidence to become a great dancer. I’ve been at multiple dance studios, but this one has the nicest instructors and most vibrant environment."',
      name: 'Ashvini Kawade',
      role: 'Contemporary Student'
    },
    {
      text: '"Great place to learn dance! The dedication for dance teaching is phenomenal. I joined just a few months ago and already observe massive progress from day one to today. It is pure bliss to dance here!"',
      name: 'Sahil Malhotra',
      role: 'Hip-Hop & Urban Dancer'
    },
    {
      text: '"The vibe is so good which is the main component for any dance studio! It\'s been 3 months and I feel like part of the Step Up family. The flexible batch timings fit my working schedule perfectly."',
      name: 'Avishka Sharma',
      role: 'Bollywood Beats Batch'
    },
    {
      text: '"One of the best dance classes I\'ve ever seen. Best in every aspect! Perfect place for a seasoned dancer and an absolute beginner who is willing to step onto the dance floor."',
      name: 'Yash Patel',
      role: 'Salsa & Bachata Social'
    },
    {
      text: '"Step Up is not just a dance studio... when you enter, you become part of a family! The instructors inspire you to perform with passion and boost your confidence every single day."',
      name: 'Aman Vohra',
      role: 'Junior Troupe Parent'
    }
  ];

  let currentIndex = 0;
  let autoplayTimer = null;
  let isHovered = false;

  function setReview(index) {
    currentIndex = index;

    // Update active ring on avatar
    avatarItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Smooth transition content
    if (reviewText && reviewName && reviewRole) {
      reviewText.style.opacity = '0';
      reviewText.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        reviewText.textContent = reviewsData[index].text;
        reviewName.textContent = reviewsData[index].name;
        reviewRole.textContent = reviewsData[index].role;

        reviewText.style.opacity = '1';
        reviewText.style.transform = 'translateY(0)';
      }, 200);
    }
  }

  // Click on avatar
  avatarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      setReview(index);
      resetAutoplay();
    });
  });

  // Prev / Next Controls
  prevBtn?.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + reviewsData.length) % reviewsData.length;
    setReview(prevIndex);
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % reviewsData.length;
    setReview(nextIndex);
    resetAutoplay();
  });

  // Auto-play loop (Every 2 seconds)
  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      if (!isHovered) {
        const nextIndex = (currentIndex + 1) % reviewsData.length;
        setReview(nextIndex);
      }
    }, 2000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  reviewsContainer.addEventListener('mouseenter', () => { isHovered = true; });
  reviewsContainer.addEventListener('mouseleave', () => { isHovered = false; });

  startAutoplay();
}

/* --- Course Details Database & Step Modal Logic --- */
const COURSE_DATABASE = {
  'hip-hop': {
    title: 'Hip-Hop & Urban Choreography',
    category: 'Urban & Street',
    badge: 'Urban Street',
    badgeClass: 'badge-purple',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    trainer: 'Alex Rivera (Senior Urban Director)',
    timing: 'Mon, Wed, Fri @ 6:00 PM - 7:30 PM & Sat @ 4:00 PM',
    level: 'All Levels (Beginner to Advanced)',
    price: '₹2,500 / month',
    duration: '3 Months (24 Masterclasses)',
    description: 'Master popping, locking, isolations, bounce dynamics, footwork, and high-octane commercial stage & music video choreography.',
    highlights: [
      'Popping, Locking & B-boy foundations',
      'Commercial Music Video routines',
      'Rhythm, bounce & isolations drill',
      'Annual studio showcase feature'
    ]
  },
  'contemporary': {
    title: 'Contemporary & Ballet Flow',
    category: 'Ballet & Modern',
    badge: 'Ballet & Modern',
    badgeClass: 'badge-pink',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    trainer: 'Elena Rostova (Founder & Master Trainer)',
    timing: 'Tue, Thu @ 5:30 PM - 7:00 PM & Sun @ 10:00 AM',
    level: 'Intermediate & Advanced',
    price: '₹2,800 / month',
    duration: '3 Months (24 Masterclasses)',
    description: 'Express deep emotion through fluid floorwork, spatial awareness, lyrical alignment, balance, and modern stage grace.',
    highlights: [
      'Lyrical storytelling & emotion flow',
      'Fluid floorwork & posture alignment',
      'Classical Ballet turn & leap technique',
      'Spotlight stage performance'
    ]
  },
  'bollywood': {
    title: 'Bollywood Fusion & Beats',
    category: 'Commercial',
    badge: 'Commercial',
    badgeClass: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1535525153412-5a42439e2b0d?auto=format&fit=crop&w=800&q=80',
    trainer: 'Karan Malhotra (Bollywood & Stage Director)',
    timing: 'Mon, Wed @ 7:30 PM - 8:30 PM & Sat @ 6:00 PM',
    level: 'All Levels (Kids, Teens & Adults)',
    price: '₹2,200 / month',
    duration: 'Ongoing Monthly Program',
    description: 'Combine cinematic Bollywood routines, high-energy Bhangra beats, and modern pop trends into exhilarating, fun routines.',
    highlights: [
      'Cinematic Bollywood choreography',
      'High-energy Bhangra & Folk rhythms',
      'Full-body cardio & expression',
      'Studio video shoot feature'
    ]
  },
  'salsa': {
    title: 'Salsa & Bachata Partnering',
    category: 'Social & Latin',
    badge: 'Partner Dance',
    badgeClass: 'badge-cyan',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=800&q=80',
    trainer: 'Marcus & Sophia (Latin Social Directors)',
    timing: 'Fri @ 8:00 PM - 9:30 PM & Sun @ 5:00 PM',
    level: 'Adults (All Levels)',
    price: '₹3,000 / month',
    duration: '2 Months (16 Masterclasses)',
    description: 'Master partner lead & follow connection, turn patterns, footwork timing (On-1 & On-2), body isolation, and social dance etiquette.',
    highlights: [
      'Salsa On-1 & On-2 footwork',
      'Sensual Bachata body movement',
      'Lead & Follow connection mechanics',
      'Social dance party admission'
    ]
  },
  'classical': {
    title: 'Bharatanatyam Classical',
    category: 'Classical Fine Arts',
    badge: 'Classical Fine Art',
    badgeClass: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    trainer: 'Priya Sundaram (Classical Fine Arts Master)',
    timing: 'Sat & Sun @ 9:00 AM - 10:30 AM',
    level: 'Age 6+ (Beginner to Senior)',
    price: '₹3,200 / month',
    duration: '6 Months Certification',
    description: 'Systematic traditional training in Adavus, Nritta, Abhinaya facial expressions, Tala rhythm theory, and classical Arangetram preparation.',
    highlights: [
      'Fundamental Adavus & posture',
      'Abhinaya facial expressions & Mudras',
      'Tala rhythm theory & footwork',
      'Stage graduation certificate'
    ]
  },
  'kids': {
    title: 'Kids Dance Grooves',
    category: 'Kids & Juniors',
    badge: 'Junior Dancers',
    badgeClass: 'badge-purple',
    image: 'https://images.unsplash.com/photo-1535525153412-5a42439e2b0d?auto=format&fit=crop&w=800&q=80',
    trainer: 'Nisha Varma (Kids Program Director)',
    timing: 'Tue, Thu @ 4:00 PM - 5:00 PM & Sat @ 11:00 AM',
    level: 'Age 5-11 (Juniors)',
    price: '₹2,000 / month',
    duration: 'Monthly Junior Program',
    description: 'Build rhythm, motor skills, coordination, physical stamina, teamwork, and creative self-confidence through fun dance games.',
    highlights: [
      'Rhythm & coordination games',
      'Junior Hip-Hop & Jazz basics',
      'Confidence & stage bravery',
      'End-of-month parent performance'
    ]
  }
};

let currentSelectedCourseTitle = '';

function initTrialModal() {
  document.addEventListener('click', (e) => {
    // 1. Cover Image / Title clicked -> Open Class Details Modal
    const detailsTrigger = e.target.closest('[data-class-details]');
    if (detailsTrigger) {
      e.preventDefault();
      const courseKey = detailsTrigger.getAttribute('data-class-details');
      showClassDetailsModal(courseKey);
      return;
    }

    // 2. Direct Book Trial Trigger
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const courseTitle = trigger.getAttribute('data-course-title') || '';
      openModal(targetId, courseTitle);
    }

    const closeBtn = e.target.closest('[data-modal-close]') || e.target.classList.contains('modal');
    if (closeBtn && e.target === closeBtn) {
      closeAllModals();
    }
  });

  // Proceed to Book Now from Details Modal
  const proceedBtn = document.getElementById('proceedToBookBtn');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      closeAllModals();
      openModal('trialModal', currentSelectedCourseTitle);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function showClassDetailsModal(courseKey) {
  const data = COURSE_DATABASE[courseKey] || COURSE_DATABASE['hip-hop'];
  currentSelectedCourseTitle = data.title;

  const modal = document.getElementById('classDetailsModal');
  if (!modal) return;

  const imgEl = document.getElementById('detailImg');
  if (imgEl) {
    imgEl.src = data.image;
    imgEl.alt = data.title;
  }
  
  const badgeEl = document.getElementById('detailBadge');
  if (badgeEl) {
    badgeEl.textContent = data.badge;
    badgeEl.className = `badge ${data.badgeClass} class-details-badge`;
  }

  const titleEl = document.getElementById('detailTitle');
  if (titleEl) titleEl.textContent = data.title;

  const descEl = document.getElementById('detailDesc');
  if (descEl) descEl.textContent = data.description;

  const trainerEl = document.getElementById('detailTrainer');
  if (trainerEl) trainerEl.textContent = data.trainer;

  const timingEl = document.getElementById('detailTiming');
  if (timingEl) timingEl.textContent = data.timing;

  const levelEl = document.getElementById('detailLevel');
  if (levelEl) levelEl.textContent = `${data.level} • ${data.duration}`;

  const priceEl = document.getElementById('detailPrice');
  if (priceEl) priceEl.textContent = data.price;

  const highlightsList = document.getElementById('detailHighlightsList');
  if (highlightsList) {
    highlightsList.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      highlightsList.appendChild(li);
    });
  }

  openModal('classDetailsModal', data.title);
}

function openModal(modalId, courseTitle = '') {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (courseTitle) {
      const courseSelect = modal.querySelector('select[name="danceStyle"]');
      if (courseSelect) {
        for (let option of courseSelect.options) {
          if (option.value.toLowerCase().includes(courseTitle.toLowerCase()) || 
              courseTitle.toLowerCase().includes(option.value.toLowerCase())) {
            option.selected = true;
            break;
          }
        }
      }
    }
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
}

/* --- Client-Side Form Validation & Handling --- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          isValid = false;
          if (group) group.classList.add('error');
        } else {
          if (group) group.classList.remove('error');
        }
      });

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const group = emailInput.closest('.form-group');
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          if (group) group.classList.add('error');
        }
      }

      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value.trim()) {
        const phoneRegex = /^[0-9+\s-]{10,15}$/;
        const group = phoneInput.closest('.form-group');
        if (!phoneRegex.test(phoneInput.value.trim())) {
          isValid = false;
          if (group) group.classList.add('error');
        }
      }

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }

        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          closeAllModals();

          showToast('🎉 Request submitted successfully! Our team will contact you within 24 hours.', 'success');
        }, 1200);
      } else {
        showToast('Please fill in all required fields correctly.', 'error');
      }
    });

    form.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('error')) {
          group.classList.remove('error');
        }
      });
    });
  });
}

/* --- Toast Notification System --- */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  toast.innerHTML = `
    <span style="font-weight: 800; color: ${type === 'success' ? '#10b981' : '#ef4444'}">${icon}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --- World-Class Smooth Scroll & Ripple Animations --- */
function initScrollAnimations() {
  // 1. Grid Stagger Delays
  const grids = document.querySelectorAll('.features-grid, .classes-grid, .instructors-grid, .gallery-grid');
  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, idx) => {
      const staggerClass = `stagger-${(idx % 4) + 1}`;
      child.classList.add('reveal-on-scroll', staggerClass);
    });
  });

  // 2. Section Headers & Floating Cards
  document.querySelectorAll('.section-header, .feature-card, .class-card, .raack-team-card, .gallery-item, .obsession-review-box').forEach(el => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  // 3. Intersection Observer for Smooth Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // 4. Interactive Button Click Ripple Effect
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('button-ripple');

      const existingRipple = button.querySelector('.button-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      button.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // 5. Touch Toggle for Instructor Faculty Cards on Mobile Devices
  document.querySelectorAll('.raack-team-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a') && !e.target.closest('button')) {
        document.querySelectorAll('.raack-team-card').forEach(other => {
          if (other !== card) other.classList.remove('active-touch');
        });
        card.classList.toggle('active-touch');
      }
    });
  });
}
