document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileNavToggle.textContent = nav.classList.contains('active') ? '×' : '☰';
    });
  }

  // Smooth scroll with offset for header
  document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      nav.classList.remove('active');
      mobileNavToggle.textContent = '☰';
      
      const target = document.querySelector(this.getAttribute('href'));
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Code copy button
  document.querySelectorAll('.code-panel pre').forEach(pre => {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    pre.appendChild(copyButton);

    copyButton.addEventListener('click', async () => {
      const code = pre.querySelector('code').innerText;
      await navigator.clipboard.writeText(code);
      
      copyButton.textContent = 'Copied!';
      copyButton.style.background = 'var(--accent)';
      
      setTimeout(() => {
        copyButton.textContent = 'Copy';
        copyButton.style.background = 'var(--card)';
      }, 2000);
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
  }
});
