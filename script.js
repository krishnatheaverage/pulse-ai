// ═══════════════════════════════════════════
// PULSE — Interactions & Animations
// ═══════════════════════════════════════════

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// ── Mobile menu toggle ──
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    mobileToggle.classList.toggle('active');
  });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileToggle.classList.remove('active');
  });
});

// ── Scroll-triggered animations (Intersection Observer) ──
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation for siblings
      const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
      const siblingIndex = Array.from(siblings).indexOf(entry.target);
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, siblingIndex * 100);
      
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ── Counter animation for stats ──
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const suffix = element.textContent.replace(/[0-9]/g, '');
  const duration = 2000;
  const start = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Toggle button interactions ──
document.querySelectorAll('.control-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
  });
});

// ── Approval button interactions ──
document.querySelectorAll('.approve-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.approval-item');
    item.style.transition = 'all 0.4s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => {
      item.style.maxHeight = '0';
      item.style.padding = '0 20px';
      item.style.overflow = 'hidden';
    }, 300);
  });
});

document.querySelectorAll('.reject-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.approval-item');
    item.style.transition = 'all 0.4s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      item.style.maxHeight = '0';
      item.style.padding = '0 20px';
      item.style.overflow = 'hidden';
    }, 300);
  });
});

// ── Parallax-like effect on hero orbs ──
let ticking = false;
window.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      const orb1 = document.querySelector('.orb-1');
      const orb2 = document.querySelector('.orb-2');
      
      if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
      if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px)`;
      
      ticking = false;
    });
    ticking = true;
  }
});

// ── Active nav link highlighting ──
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { passive: true });

// ── Add active link style ──
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--text-primary); }
.nav-links a.active::after { width: 100%; }`;
document.head.appendChild(style);
