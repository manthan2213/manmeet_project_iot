// Smooth scrolling for anchor links and scroll reveal for elements with .reveal
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for header nav
  document.querySelectorAll('.nav a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
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
});
