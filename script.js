<<<<<<< HEAD
/* ============================================================
   SCRIPT.JS — Christian Panjaitan Portfolio
   Premium Interactions | Enhanced v2
   ============================================================ */

// ============================================================
// 0. CURSOR GLOW (Custom Touch)
// ============================================================
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.left = mouseX + 'px';
  cursorGlow.style.top = mouseY + 'px';
});

// ============================================================
// 1. NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }
  updateActiveNavLink();
});

// ============================================================
// 2. ACTIVE NAV LINK UPDATE
// ============================================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  const scrollPosition = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}` || (current === '' && link.getAttribute('href') === '#hero')) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// 3. MOBILE MENU TOGGLE
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    document.body.style.overflow = 'hidden';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = 'none';
  spans[1].style.opacity = '1';
  spans[2].style.transform = 'none';
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);

document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!e.target.closest('#mobileMenu') && !e.target.closest('#hamburger')) closeMobileMenu();
  }
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ============================================================
// 4. TYPING ANIMATION
// ============================================================
function initTypingAnimation() {
  const titleEl = document.querySelector('.hero-title span');
  if (!titleEl) return;
  
  const phrases = [
    'Student & Future Cyber Security Expert',
    'Juara 2 LKS Cyber Security Kota Medan',
    'Network & Linux Enthusiast',
    'Python Automation & Ethical Hacker'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  // Add cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  titleEl.parentNode.insertBefore(cursor, titleEl.nextSibling);
  
  function type() {
    const current = phrases[phraseIndex];
    
    if (isDeleting) {
      titleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      titleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let speed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }
    
    setTimeout(type, speed);
  }
  
  setTimeout(type, 1200);
}

// ============================================================
// 5. SCROLL REVEAL
// ============================================================
const revealElements = document.querySelectorAll('.reveal');
const timelineItems = document.querySelectorAll('.timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));
timelineItems.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// ============================================================
// 6. SKILL BARS ANIMATION
// ============================================================
const skillBarsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        const target = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = target + '%';
        }, i * 120);
      });
      skillBarsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillBarsContainer = document.querySelector('.skill-bars');
if (skillBarsContainer) skillBarsObserver.observe(skillBarsContainer);

// ============================================================
// 7. NOTIFICATION FUNCTION
// ============================================================
function showNotification(message) {
  const oldNotif = document.querySelector('.custom-notification');
  if (oldNotif) oldNotif.remove();
  
  const notification = document.createElement('div');
  notification.className = 'custom-notification';
  notification.innerHTML = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    padding: 14px 30px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    animation: slideUp 0.3s ease;
    white-space: nowrap;
    letter-spacing: 0.02em;
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================================
// 8. FORM HANDLER
// ============================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-pulse"></i> Mengirim...';
    btn.disabled = true;
    const formData = new FormData(contactForm);
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) {
        showNotification('✅ Pesan berhasil terkirim! Saya akan membalas dalam 24 jam.');
        contactForm.reset();
      } else {
        showNotification('❌ Gagal mengirim. Silakan coba lagi.');
      }
    } catch (error) {
      showNotification('❌ Gagal terhubung. Periksa koneksi internet Anda.');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

// ============================================================
// 9. SCROLL TOP
// ============================================================
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 10. SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// 11. PARALLAX HERO ORBS
// ============================================================
const heroOrbs = document.querySelectorAll('.hero-orb');
if (heroOrbs.length) {
  window.addEventListener('mousemove', (e) => {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;
    heroOrbs.forEach((orb, i) => {
      const speed = 18 + (i * 12);
      orb.style.transform = `translate(${(mx - 0.5) * speed}px, ${(my - 0.5) * speed}px)`;
    });
  });
}

// ============================================================
// 12. CARD 3D TILT EFFECT
// ============================================================
const tiltCards = document.querySelectorAll('.dashboard-card, .timeline-card, .stat-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / 25;
    const ry = (cx - x) / 25;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    // Update CSS variable for radial shimmer
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============================================================
// 13. FLOATING PARTICLES
// ============================================================
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  
  const particles = [];
  const count = Math.min(50, Math.floor(W / 30));
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.1
    });
  }
  
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
      ctx.fill();
      
      p.x += p.dx;
      p.y += p.dy;
      
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    requestAnimationFrame(draw);
  }
  draw();
  
  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
}

// ============================================================
// 14. SKILL CHIP INTERACTION
// ============================================================
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('click', function() {
    this.style.transform = 'scale(0.9)';
    setTimeout(() => { this.style.transform = ''; }, 200);
  });
});

// ============================================================
// 15. WINDOW LOAD
// ============================================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  initParticles();
  initTypingAnimation();
  console.log('✨ Christian Panjaitan Portfolio — Fully Loaded!');
});

// ============================================================
// 16. PREVENT EMPTY HREF
// ============================================================
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});

// ============================================================
// 17. NOTIFICATION CSS INJECT
// ============================================================
const notifStyle = document.createElement('style');
notifStyle.textContent = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateX(-50%) translateY(30px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(notifStyle);
=======
/* ============================================================
   SCRIPT.JS — Christian Panjaitan Portfolio
   Premium Interactions | Navbar Effects | Form Handler
   ============================================================ */

// ============================================================
// 1. NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  // Navbar background on scroll
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Scroll Top Button visibility
  if (scrollTopBtn) {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  
  // Update active nav link
  updateActiveNavLink();
});

// ============================================================
// 2. ACTIVE NAV LINK UPDATE
// ============================================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}` || (current === '' && href === '#hero')) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// 3. MOBILE MENU TOGGLE
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('open');
  
  // Animate hamburger icon
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    document.body.style.overflow = 'hidden';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = 'none';
  spans[1].style.opacity = '1';
  spans[2].style.transform = 'none';
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!e.target.closest('#mobileMenu') && !e.target.closest('#hamburger')) {
      closeMobileMenu();
    }
  }
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ============================================================
// 4. SCROLL REVEAL ANIMATION
// ============================================================
const revealElements = document.querySelectorAll('.reveal');
const timelineItems = document.querySelectorAll('.timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  revealObserver.observe(el);
});

timelineItems.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// ============================================================
// 5. NOTIFICATION FUNCTION (Didefinisikan TERLEBIH DAHULU)
// ============================================================
function showNotification(message) {
  // Hapus notifikasi lama jika ada
  const oldNotif = document.querySelector('.custom-notification');
  if (oldNotif) oldNotif.remove();
  
  // Buat notifikasi baru
  const notification = document.createElement('div');
  notification.className = 'custom-notification';
  notification.innerHTML = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(notification);
  
  // Hapus setelah 3 detik
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================================
// 6. FORM HANDLER - Web3Forms dengan AJAX (FIXED)
// ============================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Mencegah redirect
    
    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    
    // Tampilkan loading
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-pulse"></i> Mengirim...';
    btn.disabled = true;
    
    // Kirim data via AJAX
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        showNotification('✅ Pesan berhasil terkirim! Saya akan membalas dalam 24 jam.');
        contactForm.reset(); // Reset form
      } else {
        showNotification('❌ Gagal mengirim. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('❌ Gagal terhubung. Periksa koneksi internet Anda.');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

// Tambahkan CSS untuk animasi notifikasi
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  .custom-notification {
    animation: slideUp 0.3s ease;
  }
`;
document.head.appendChild(style);

// ============================================================
// 7. SCROLL TOP BUTTON
// ============================================================
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================================
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================================
// 9. PARALLAX EFFECT ON HERO ORBS
// ============================================================
const heroOrbs = document.querySelectorAll('.hero-orb');
if (heroOrbs.length) {
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    heroOrbs.forEach((orb, index) => {
      const speed = 20 + (index * 10);
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ============================================================
// 10. CARD HOVER 3D EFFECT
// ============================================================
const cards = document.querySelectorAll('.dashboard-card, .timeline-card, .stat-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============================================================
// 11. PREVENT DEFAULT FOR EMPTY HREF
// ============================================================
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => e.preventDefault());
});

// ============================================================
// 12. WINDOW LOAD ANIMATION
// ============================================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  console.log('✨ Christian Panjaitan Portfolio — Fully Loaded!');
});

// ============================================================
// 13. SKILL CHIP INTERACTION
// ============================================================
const skillChips = document.querySelectorAll('.skill-chip');
skillChips.forEach(chip => {
  chip.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
});
>>>>>>> c087169a39a99f53e5a1e127e1c5c581df478df1
