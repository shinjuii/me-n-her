// ===== INTRO SCREEN =====
const introOverlay = document.getElementById('introOverlay');
const introBtn = document.getElementById('introBtn');
const introHeartsContainer = document.getElementById('introHearts');

const introEmojis = ['💕', '🌸', '✨', '💖', '🎀', '💗', '🌷', '⭐'];

function spawnIntroHeart() {
  const el = document.createElement('div');
  el.classList.add('intro-heart-item');
  el.textContent = introEmojis[Math.floor(Math.random() * introEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 1.4 + 0.8) + 'rem';
  const dur = Math.random() * 4 + 4;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * 3 + 's';
  introHeartsContainer.appendChild(el);
  setTimeout(() => el.remove(), (dur + 3) * 1000);
}

// spawn hearts di intro
for (let i = 0; i < 18; i++) {
  setTimeout(() => spawnIntroHeart(), i * 300);
}
const introHeartInterval = setInterval(spawnIntroHeart, 600);

introBtn.addEventListener('click', () => {
  clearInterval(introHeartInterval);
  introOverlay.classList.add('hide');
  // hapus dari DOM setelah animasi selesai
  setTimeout(() => introOverlay.remove(), 900);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth trail
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor click effect
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
  cursor.style.background = '#e91e8c';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  cursor.style.background = '#ff6eb4';
});

// Cursor hover on interactive elements
document.querySelectorAll('a, button, .polaroid, .note-card, .art-frame, .badge').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ===== FLOATING DECORATIONS =====
const decoContainer = document.getElementById('floatingDeco');
const decoEmojis = ['🌸', '✨', '💕', '🌷', '⭐', '🎀', '💫', '🌙', '🎮', '🎨', '🌺', '💖'];

function createDecoItem() {
  const deco = document.createElement('div');
  deco.classList.add('deco-item');
  deco.textContent = decoEmojis[Math.floor(Math.random() * decoEmojis.length)];
  deco.style.left = Math.random() * 100 + 'vw';
  deco.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
  const duration = Math.random() * 15 + 10;
  deco.style.animationDuration = duration + 's';
  deco.style.animationDelay = Math.random() * 5 + 's';
  decoContainer.appendChild(deco);

  // Remove after animation
  setTimeout(() => {
    deco.remove();
  }, (duration + 5) * 1000);
}

// Create initial decorations
for (let i = 0; i < 12; i++) {
  setTimeout(() => createDecoItem(), i * 800);
}

// Keep creating new ones
setInterval(createDecoItem, 2000);

// ===== CLICK SPARKLE EFFECT =====
function createSparkle(x, y) {
  const sparkles = ['💕', '✨', '🌸', '⭐', '💫'];
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${Math.random() * 16 + 10}px;
      pointer-events: none;
      z-index: 9999;
      animation: sparkleAnim 0.8s ease forwards;
      transform: translate(-50%, -50%);
    `;
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    document.body.appendChild(sparkle);

    const angle = (Math.random() * 360) * (Math.PI / 180);
    const distance = Math.random() * 60 + 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.animate([
      { transform: `translate(-50%, -50%) scale(0)`, opacity: 1 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, opacity: 1, offset: 0.5 },
      { transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5}px)) scale(0.5)`, opacity: 0 }
    ], { duration: 800, easing: 'ease-out' });

    setTimeout(() => sparkle.remove(), 800);
  }
}

document.addEventListener('click', (e) => {
  createSparkle(e.clientX, e.clientY);
});

// ===== SCROLL FADE-IN ANIMATION =====
const fadeElements = document.querySelectorAll('.polaroid, .art-frame, .note-card, .sticky-note, .section-header');

fadeElements.forEach(el => {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ===== POLAROID WOBBLE ON HOVER =====
document.querySelectorAll('.polaroid').forEach(polaroid => {
  polaroid.addEventListener('mousemove', (e) => {
    const rect = polaroid.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 15;
    const rotateY = (e.clientX - centerX) / 15;
    polaroid.style.transform = `perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  polaroid.addEventListener('mouseleave', (e) => {
    const originalTilt = polaroid.classList.contains('tilt-left') ? 'rotate(-3deg)' : 'rotate(3deg)';
    polaroid.style.transform = originalTilt;
  });
});

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(tab.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navTabs = document.querySelectorAll('.nav-tab');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navTabs.forEach(tab => {
    tab.style.fontWeight = '700';
    tab.style.opacity = '1';
    if (tab.getAttribute('href') === '#' + current) {
      tab.style.transform = 'translateY(-4px)';
      tab.style.boxShadow = '0 -4px 12px rgba(255,110,180,0.4)';
    } else {
      tab.style.transform = '';
      tab.style.boxShadow = '';
    }
  });
});

// ===== TITLE EASTER EGG =====
let titleInterval;
const originalTitle = 'Cleo & Laluna 🌸';
const altTitles = ['💕 cleo & Laluna 💕', '🌸 our memories 🌸', '✨ forever & always ✨', '🎮 our memories 🎮', '🎨 art pacar 🎨'];
let titleIndex = 0;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    titleInterval = setInterval(() => {
      document.title = altTitles[titleIndex % altTitles.length];
      titleIndex++;
    }, 1500);
  } else {
    clearInterval(titleInterval);
    document.title = originalTitle;
  }
});

console.log('%c🌸 Cleo & Laluna 🌸', 'color: #e91e8c; font-size: 24px; font-weight: bold; font-family: cursive;');
console.log('%cmade with 💕 for our memories', 'color: #a855f7; font-size: 14px;');
