// Smooth scrolling for anchor links and scroll reveal for elements with .reveal
document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;
  
  // Handle menu toggle with improved transitions
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  function toggleMenu(force = null) {
    const willOpen = force !== null ? force : !nav.classList.contains('active');
    
    menuToggle.classList.toggle('active', willOpen);
    nav.classList.toggle('active', willOpen);
    
    // Prevent body scroll when menu is open
    body.style.overflow = willOpen ? 'hidden' : '';
    
    // Add transition delay to nav items
    const navItems = nav.querySelectorAll('a');
    navItems.forEach((item, index) => {
      item.style.transitionDelay = willOpen ? `${0.1 + index * 0.05}s` : '0s';
    });
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        toggleMenu(false);
      }
    }, 250);
  });

  // Close menu when clicking a link (mobile)
  document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      // Close mobile menu with animation
      if (window.innerWidth <= 768) {
        toggleMenu(false);
        // Wait for menu close animation
        setTimeout(() => {
          target.scrollIntoView({behavior: 'smooth'});
        }, 300);
      } else {
        target.scrollIntoView({behavior: 'smooth'});
      }
    });
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', function(e) {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Prevent clicks inside nav from bubbling
  nav.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // IntersectionObserver for reveal animations
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Open lightbox
  document.querySelectorAll('.photo-wrapper').forEach(photo => {
    photo.addEventListener('click', function() {
      const img = this.querySelector('img');
      const caption = this.parentElement.querySelector('figcaption').textContent;
      
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});
