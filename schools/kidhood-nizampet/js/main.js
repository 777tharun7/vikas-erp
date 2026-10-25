/**
 * KIDHOOD NIZAMPET — MASTER JAVASCRIPT CONTROLLER
 * Advanced Animations: Morph Words, Bouncy Letters, 3D Tilt, Sparkle Confetti, Scroll Reveal, Ripples
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Setup Scroll Progress Bar
  let progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scrollProgressBar';
    document.body.prepend(progressBar);
  }

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';

    // Navbar scroll elevation styling
    const navHeader = document.querySelector('.nav-header');
    if (navHeader) {
      if (window.scrollY > 40) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
    }
  });

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el, index) => {
      if (!el.style.transitionDelay && el.parentElement && el.parentElement.classList.contains('stagger-grid')) {
        el.style.transitionDelay = `${(index % 4) * 0.12}s`;
      }
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 4. Click Ripple Wave Effect on Buttons & Cards
  const rippleTargets = document.querySelectorAll('.btn-pill, button, .clickable-card, .pillar-card, .program-card, .card-organic');
  rippleTargets.forEach(target => {
    target.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-wave');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 5. Dynamic Rotating Word Morph Carousel
  initWordMorph();

  // 6. Interactive Bouncy Split-Text Letters
  initBouncyLetters();

  // 7. Interactive 3D Mouse Tilt Physics
  initInteractive3DTilt();

  // 8. Click Confetti / Star Sparkle Trigger on Living Mascot Pods & Sketches
  initMascotConfetti();

  // 9. Interactive Dynamic HTML5 Canvas Background Engine
  initKidsDoodleCanvas();

  // 10. Default date for Tour Modal
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tourDateInput = document.getElementById('tourDate');
  if (tourDateInput) {
    tourDateInput.value = tomorrow.toISOString().split('T')[0];
    tourDateInput.min = tomorrow.toISOString().split('T')[0];
  }
});

// ==========================================================================
// 1. ROTATING WORD MORPH CAROUSEL
// ==========================================================================
function initWordMorph() {
  const wrappers = document.querySelectorAll('.morphing-words-wrapper');
  wrappers.forEach(wrapper => {
    const words = wrapper.querySelectorAll('.morph-word');
    if (words.length <= 1) return;

    let currentIndex = 0;
    setInterval(() => {
      const currentWord = words[currentIndex];
      currentIndex = (currentIndex + 1) % words.length;
      const nextWord = words[currentIndex];

      currentWord.classList.remove('active');
      currentWord.classList.add('exit');

      setTimeout(() => {
        currentWord.classList.remove('exit');
      }, 550);

      nextWord.classList.add('active');
    }, 2800);
  });
}

// ==========================================================================
// 2. INTERACTIVE BOUNCY SPLIT-TEXT LETTERS
// ==========================================================================
function initBouncyLetters() {
  const targets = document.querySelectorAll('.split-text-bouncy');
  targets.forEach(target => {
    const text = target.textContent.trim();
    target.innerHTML = '';
    const chars = text.split('');
    chars.forEach((char, idx) => {
      const span = document.createElement('span');
      span.className = 'bouncy-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      const randomRot = (Math.random() * 16 - 8).toFixed(1);
      span.style.setProperty('--rot', `${randomRot}deg`);
      target.appendChild(span);
    });
  });
}

// ==========================================================================
// 3. INTERACTIVE 3D MOUSE TILT PHYSICS
// ==========================================================================
function initInteractive3DTilt() {
  const tiltItems = document.querySelectorAll('.mascot-living-pod, .interactive-tilt');
  tiltItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 14;
      const rotY = (x / (rect.width / 2)) * 14;
      item.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // Enhanced 3D Tilt for Class Cards with Dynamic Glare Effect (As on Kidhood Nizampet)
  const classTiltCards = document.querySelectorAll('.class-tilt-3d');
  classTiltCards.forEach(card => {
    const inner = card.querySelector('.class-tilt-inner') || card;
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      inner.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotX = -((y - centerY) / centerY) * 11;
      const rotY = ((x - centerX) / centerX) * 11;

      inner.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
      
      // Update glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      inner.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease';
      setTimeout(() => {
        inner.style.transition = '';
      }, 450);
    });
  });
}

// ==========================================================================
// 4. CONFETTI STAR SPARKLE BURST (Mascot Pods & Buttons)
// ==========================================================================
function initMascotConfetti() {
  const pods = document.querySelectorAll('.mascot-living-pod, .btn-primary-yellow, .sketch-pod');
  const sparkles = ['⭐', '✨', '🎈', '🌸', '🐝', '💛', '🎉', '🌟', '🚀', '🎨'];

  pods.forEach(pod => {
    pod.addEventListener('click', (e) => {
      const count = 10;
      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'confetti-sparkle';
        span.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        
        // Spawn around mouse coordinate
        span.style.left = `${e.clientX}px`;
        span.style.top = `${e.clientY}px`;

        const angle = (Math.PI * 2 / count) * i;
        const velocity = Math.random() * 80 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 30; // slight upward drift
        const dr = Math.random() * 360;

        span.style.setProperty('--dx', `${dx}px`);
        span.style.setProperty('--dy', `${dy}px`);
        span.style.setProperty('--dr', `${dr}deg`);

        document.body.appendChild(span);
        setTimeout(() => {
          span.remove();
        }, 850);
      }
    });
  });
}

function triggerMascotSparkle(e) {
  if (!e) return;
  const sparkles = ['🐝', '✨', '⭐', '💛', '🎈', '🍯', '🎉'];
  const count = 12;
  const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
  const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'confetti-sparkle';
    span.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    span.style.left = `${clientX}px`;
    span.style.top = `${clientY}px`;

    const angle = (Math.PI * 2 / count) * i;
    const velocity = Math.random() * 90 + 60;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 40;
    const dr = Math.random() * 360;

    span.style.setProperty('--dx', `${dx}px`);
    span.style.setProperty('--dy', `${dy}px`);
    span.style.setProperty('--dr', `${dr}deg`);

    document.body.appendChild(span);
    setTimeout(() => {
      span.remove();
    }, 900);
  }
}

// ==========================================================================
// MODAL CONTROLS
// ==========================================================================
function openTourModal(programName) {
  if (programName) {
    const select = document.getElementById('programChoice');
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase().includes(programName.toLowerCase())) {
          select.selectedIndex = i;
          break;
        }
      }
    }
  }
  const modal = document.getElementById('tourModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeTourModal() {
  const modal = document.getElementById('tourModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

window.onclick = function(event) {
  const tourModal = document.getElementById('tourModal');
  const loginModal = document.getElementById('loginModal');
  const lightboxModal = document.getElementById('lightboxModal');

  if (event.target === tourModal) closeTourModal();
  if (event.target === loginModal) closeLoginModal();
  if (event.target === lightboxModal) {
    lightboxModal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeTourModal();
    closeLoginModal();
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
      lightboxModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// ==========================================================================
// ACCORDION FAQ CONTROLS
// ==========================================================================
function toggleFaq(questionEl) {
  const item = questionEl.parentElement;
  const wasActive = item.classList.contains('active');
  
  const parentContainer = item.closest('.faq-container') || document;
  parentContainer.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
  
  if (!wasActive) {
    item.classList.add('active');
  }
}

// ==========================================================================
// FORM SUBMISSION & ROLE LAUNCH HANDLERS
// ==========================================================================
function handleTourSubmit(e) {
  e.preventDefault();
  const parentName = document.getElementById('parentName')?.value || 'Parent';
  const phone = document.getElementById('parentPhone')?.value || '';
  const date = document.getElementById('tourDate')?.value || new Date().toISOString().split('T')[0];
  const program = document.getElementById('programChoice')?.value || document.querySelector('#tourModal h3')?.textContent || 'Preschool Class';

  const formBox = document.querySelector('#tourModal .modal-box');
  if (formBox) {
    formBox.innerHTML = `
      <button class="modal-close-btn" onclick="closeTourModal()">✕</button>
      <div style="text-align:center; padding:15px 5px;">
        <div style="font-size:3.5rem; margin-bottom:10px;">🎉</div>
        <h3 style="font-size:1.8rem; color:var(--text-dark); margin-bottom:6px;">Visit Booked Successfully!</h3>
        <p style="font-size:0.95rem; color:var(--accent-green-dark); font-weight:700; margin-bottom:16px;">
          ✓ Confirmation sent to ${phone || 'your WhatsApp'}
        </p>
        <div style="background:#FFF9ED; border:2px dashed #FEC802; border-radius:18px; padding:16px; margin-bottom:20px; text-align:left;">
          <div style="font-size:0.9rem; margin-bottom:6px;"><strong>Parent:</strong> ${parentName}</div>
          <div style="font-size:0.9rem; margin-bottom:6px;"><strong>Program:</strong> ${program}</div>
          <div style="font-size:0.9rem; margin-bottom:6px;"><strong>Scheduled Tour Date:</strong> ${date}</div>
          <div style="font-size:0.9rem;"><strong>Campus:</strong> 2B Lane, Madhura Nagar, Nizampet</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <a href="https://wa.me/919429422434?text=Hello%20Kidhood%20Nizampet,%20I%20have%20booked%20a%20campus%20tour%20for%20${encodeURIComponent(program)}%20on%20${encodeURIComponent(date)}" target="_blank" class="btn-pill btn-green" style="width:100%; justify-content:center; text-decoration:none; padding:12px;">
            <span>Chat on WhatsApp With Admissions 💬</span>
          </a>
          <button class="btn-pill btn-outline" onclick="closeTourModal()" style="width:100%; justify-content:center; padding:10px;">
            Close Window ✓
          </button>
        </div>
      </div>
    `;
    if (typeof triggerMascotSparkle === 'function') {
      triggerMascotSparkle({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
    }
  }
}

function fillLogin(email, pass, role) {
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPass');
  if (emailInput) emailInput.value = email;
  if (passInput) passInput.value = pass;
  if (role) {
    try { localStorage.setItem('edupulse_active_role', role); } catch(e) {}
  }
}

function quickLaunchRole(role) {
  try { localStorage.setItem('edupulse_active_role', role); } catch(e) {}
  window.location.href = '../../index.html?role=' + encodeURIComponent(role);
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value || '';
  let role = 'principal';
  if (email.includes('teacher')) role = 'teacher';
  if (email.includes('parent')) role = 'parent';
  if (email.includes('student')) role = 'student';

  try { localStorage.setItem('edupulse_active_role', role); } catch(err) {}
  window.location.href = '../../index.html?role=' + encodeURIComponent(role);
}

// ==========================================================================
// GALLERY LIGHTBOX
// ==========================================================================
function openLightbox(imgSrc, captionText) {
  let lightbox = document.getElementById('lightboxModal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightboxModal';
    lightbox.className = 'modal-backdrop';
    lightbox.innerHTML = `
      <div style="background:white; border-radius:24px; padding:20px; max-width:800px; width:90%; position:relative; text-align:center; box-shadow:0 30px 60px rgba(0,0,0,0.4); border:4px solid var(--accent-yellow);">
        <button class="modal-close-btn" onclick="document.getElementById('lightboxModal').style.display='none'">✕</button>
        <img id="lightboxImg" src="" style="width:100%; max-height:70vh; object-fit:contain; border-radius:16px; margin-bottom:12px;">
        <h4 id="lightboxCaption" style="font-size:1.2rem; color:var(--text-dark);"></h4>
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  document.getElementById('lightboxImg').src = imgSrc;
  document.getElementById('lightboxCaption').textContent = captionText || 'Kidhood Nizampet Campus Moment';
  lightbox.style.display = 'flex';
}

// ==========================================================================
// INTERACTIVE HTML5 CANVAS BACKGROUND ENGINE
// Floating storybook doodles, stardust physics, and interactive mouse sparkles
// ==========================================================================
function initKidsDoodleCanvas() {
  let canvas = document.getElementById('kidsDoodleCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'kidsDoodleCanvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  // Palette of soft kid-friendly doodle colors
  const colors = [
    'rgba(254, 200, 2, 0.45)',   // Sunny yellow
    'rgba(0, 172, 243, 0.4)',    // Sky cyan
    'rgba(238, 32, 110, 0.35)',  // Coral pink
    'rgba(128, 196, 28, 0.4)',   // Meadow green
    'rgba(139, 92, 246, 0.35)',  // Soft lavender
    'rgba(255, 138, 61, 0.4)'    // Warm orange
  ];

  // Ambient floating particles
  const ambientParticles = [];
  const ambientCount = Math.min(36, Math.floor(width / 35));

  for (let i = 0; i < ambientCount; i++) {
    ambientParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 4,
      vy: -(Math.random() * 0.45 + 0.2),
      vx: (Math.random() - 0.5) * 0.35,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.02,
      shape: Math.floor(Math.random() * 4), // 0: star, 1: circle, 2: swirl, 3: cross
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: Math.random() * Math.PI * 2
    });
  }

  // Interactive mouse sparkles trail
  const mouseSparkles = [];
  let mouse = { x: -100, y: -100, active: false };
  let lastSpawn = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    const now = performance.now();
    if (now - lastSpawn > 32 && mouseSparkles.length < 35) {
      lastSpawn = now;
      mouseSparkles.push({
        x: mouse.x + (Math.random() * 16 - 8),
        y: mouse.y + (Math.random() * 16 - 8),
        size: Math.random() * 8 + 3,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8 - 0.8,
        life: 1.0,
        decay: Math.random() * 0.028 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? 'star' : 'dot'
      });
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Helper: Draw 4-point doodle star
  function drawDoodleStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // Helper: Draw little curly spiral swirl
  function drawDoodleSwirl(cx, cy, radius, color) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    for (let a = 0; a < Math.PI * 3; a += 0.2) {
      const r = (a / (Math.PI * 3)) * radius;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  let animationFrameId;
  let isRunning = true;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      lastTime = performance.now();
      loop(lastTime);
    }
  });

  let lastTime = performance.now();

  function loop(currentTime) {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);
    const time = currentTime * 0.0015;

    // 1. Render Ambient Particles
    for (let i = 0; i < ambientParticles.length; i++) {
      const p = ambientParticles[i];
      p.y += p.vy;
      p.x += Math.sin(time + p.phase) * 0.4 + p.vx;
      p.angle += p.vAngle;

      // Wrap around screen seamlessly
      if (p.y < -30) {
        p.y = height + 30;
        p.x = Math.random() * width;
      }
      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.shape === 0) {
        // 4-point Star
        drawDoodleStar(0, 0, 4, p.size, p.size * 0.4, p.color);
      } else if (p.shape === 1) {
        // Soft Circle
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (p.shape === 2) {
        // Curly Swirl
        drawDoodleSwirl(0, 0, p.size * 0.8, p.color);
      } else {
        // Star cross (+)
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-p.size * 0.5, 0);
        ctx.lineTo(p.size * 0.5, 0);
        ctx.moveTo(0, -p.size * 0.5);
        ctx.lineTo(0, p.size * 0.5);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 2. Render Interactive Mouse Trail Sparkles
    for (let i = mouseSparkles.length - 1; i >= 0; i--) {
      const sp = mouseSparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.04; // Gentle gravity
      sp.life -= sp.decay;

      if (sp.life <= 0) {
        mouseSparkles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = sp.life;
      if (sp.shape === 'star') {
        drawDoodleStar(sp.x, sp.y, 4, sp.size * sp.life, sp.size * 0.35 * sp.life, sp.color);
      } else {
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * 0.5 * sp.life, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.fill();
      }
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  animationFrameId = requestAnimationFrame(loop);
}
