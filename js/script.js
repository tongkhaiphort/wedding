lucide.createIcons();

let isEnvelopeOpened = false;
let isPlayingAudio = false;
const bgm = document.getElementById('weddingBgm');
if (bgm) {
  bgm.volume = 0.35; // Soft background music volume (under 50%)
}

function switchLanguage(lang) {
  const btnKm = document.getElementById('btnLangKm');
  const btnEn = document.getElementById('btnLangEn');
  if (lang === 'en') {
    btnEn.className = "px-2.5 py-1 text-xs rounded-full bg-gradient-to-r from-[#d8c49a] to-[#f7efdc] text-[#3b3326] font-bold transition-all";
    btnKm.className = "px-2.5 py-1 text-xs rounded-full text-[#e2d7be] hover:text-white transition-all";
  } else {
    btnKm.className = "px-2.5 py-1 text-xs rounded-full bg-gradient-to-r from-[#d8c49a] to-[#f7efdc] text-[#3b3326] font-bold transition-all";
    btnEn.className = "px-2.5 py-1 text-xs rounded-full text-[#e2d7be] hover:text-white transition-all";
  }
}

function toggleAudio() {
  const musicDot = document.getElementById('musicDot');
  const musicPulse = document.getElementById('musicPulse');
  const musicLabel = document.getElementById('musicLabel');

  if (!isPlayingAudio) {
    if (bgm) {
      bgm.volume = 0.35; // Set volume to 35% (soft, less than 50%)
      const playPromise = bgm.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlayingAudio = true;
          if (musicDot) musicDot.classList.replace('bg-[#7c8b6a]', 'bg-[#d8c49a]');
          if (musicPulse) musicPulse.classList.remove('hidden');
          if (musicLabel) musicLabel.textContent = "បិទតន្ត្រី";
        }).catch(e => {
          console.log("Audio play error:", e);
        });
      }
    }
  } else {
    if (bgm) bgm.pause();
    isPlayingAudio = false;
    if (musicDot) musicDot.classList.replace('bg-[#d8c49a]', 'bg-[#7c8b6a]');
    if (musicPulse) musicPulse.classList.add('hidden');
    if (musicLabel) musicLabel.textContent = "តន្ត្រីអាពាហ៍ពិពាហ៍";
  }
}

// Auto-start music on first user gesture at gentle volume (less than 50%)
function initAudioOnFirstUserGesture() {
  if (!isPlayingAudio && bgm) {
    toggleAudio();
  }
  document.removeEventListener('click', initAudioOnFirstUserGesture);
  document.removeEventListener('touchstart', initAudioOnFirstUserGesture);
}
document.addEventListener('click', initAudioOnFirstUserGesture, { once: true });
document.addEventListener('touchstart', initAudioOnFirstUserGesture, { once: true });

let isIntroAnimating = false;
const envelopeBody = document.getElementById('envelopeBody');

// 3D Tilt on mouse move — only when idle
window.addEventListener('mousemove', (e) => {
  if (isEnvelopeOpened || isIntroAnimating || !envelopeBody) return;
  const xNorm = (e.clientX / window.innerWidth) - 0.5;
  const yNorm = (e.clientY / window.innerHeight) - 0.5;
  envelopeBody.style.transform = `rotateY(${xNorm * 10}deg) rotateX(${-yNorm * 8}deg)`;
});

// Spawn floating ambient champagne petals on intro screen (slow, graceful drift)
function spawnIntroAmbiance() {
  if (prefersReducedMotion || isWeakDevice) return;
  const layer = document.getElementById('introGoldDustLayer');
  if (!layer) return;
  layer.innerHTML = '';
  const count = isPhone ? 8 : 16;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'intro-ambient-petal';
    const size = 5 + Math.random() * 8;
    const left = 3 + Math.random() * 94;
    const dur = 18 + Math.random() * 14; // Slower: 18s - 32s
    const delay = Math.random() * 10;
    petal.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + left + '%;bottom:-15px;animation-duration:' + dur + 's;animation-delay:' + delay + 's;';
    layer.appendChild(petal);
  }
}

// Intro Entrance Animation on first page load
function playIntroEntrance() {
  if (prefersReducedMotion) return;
  const screen = document.getElementById('envelopeScreen');
  if (!screen || isEnvelopeOpened) return;

  // Start everything invisible
  gsap.set(['#envelopeGreeting', '#envelopeBody', '#waxSeal', '#openGuidePill', '#introCtaBtn', '#introAudioCue', '.intro-corner-ornament'], {
    opacity: 0
  });
  gsap.set('#envelopeGreeting', { y: -30, scale: 0.96 });
  gsap.set('#envelopeBody', { scale: 0.88, y: 30 });
  gsap.set('#waxSeal', { scale: 0.5, rotation: -15 });
  gsap.set(['#introCtaBtn', '#introAudioCue'], { y: 24, scale: 0.95 });
  gsap.set('#openGuidePill', { y: 16, scale: 0.9 });

  const enterTl = gsap.timeline({ delay: 0.3 });
  enterTl
    // Corner ornaments fade in gently
    .to('.intro-corner-ornament', {
      opacity: 0.45, duration: 1.2, ease: 'power2.out', stagger: 0.1
    })
    // Greeting text floats down
    .to('#envelopeGreeting', {
      opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out'
    }, '-=0.9')
    // Envelope body scales up elegantly
    .to('#envelopeBody', {
      opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out'
    }, '-=0.65')
    // Wax seal pops in with a satisfying bounce
    .to('#waxSeal', {
      opacity: 1, scale: 1, rotation: 0, duration: 0.85, ease: 'back.out(2.2)'
    }, '-=0.5')
    // Guide pill, button, audio cue stagger in
    .to('#openGuidePill', {
      opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out'
    }, '-=0.3')
    .to('#introCtaBtn', {
      opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.4)'
    }, '-=0.4')
    .to('#introAudioCue', {
      opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out'
    }, '-=0.35');
}

// Silky Smooth Opening Sequence
function startOpeningSequence() {
  if (isEnvelopeOpened || isIntroAnimating) return;
  isEnvelopeOpened = true;
  isIntroAnimating = true;

  const screen = document.getElementById('envelopeScreen');
  const flap = document.getElementById('envelopeFlap');
  const card = document.getElementById('innerCard');
  const body = document.getElementById('envelopeBody');

  if (screen) {
    screen.classList.add('is-animating');
    gsap.set(screen, { willChange: 'opacity, transform' });
  }

  // Remove CSS transitions that could fight GSAP
  if (body) {
    body.style.transition = 'none';
    body.style.transform = 'none';
  }
  if (flap) flap.style.transition = 'none';
  if (card) card.style.transition = 'none';

  // Hardware-accelerate elements & prevent layout jitter
  gsap.set(['#envelopeFlap', '#innerCard', '#waxSealContainer', '#waxSeal', '#envelopeBody'], {
    force3D: true,
    willChange: 'transform, opacity'
  });

  // Unmute & play wedding audio on this valid user gesture
  if (!isPlayingAudio) {
    toggleAudio();
  }

  // Smooth fade of UI elements (soft & graceful)
  gsap.to(['#openGuidePill', '#introCtaBtn', '#introAudioCue', '#introFooterInfo'], {
    opacity: 0,
    y: 16,
    scale: 0.94,
    duration: 0.45,
    pointerEvents: 'none',
    ease: 'power2.inOut',
    stagger: 0.03
  });
  gsap.to('#envelopeGreeting', {
    opacity: 0,
    y: -16,
    duration: 0.6,
    ease: 'power2.inOut'
  });

  // Fade out ambient petals
  gsap.to('.intro-ambient-petal', {
    opacity: 0,
    duration: 0.7,
    ease: 'power1.out'
  });

  const tl = gsap.timeline({
    defaults: { force3D: true },
    onComplete: () => {
      isIntroAnimating = false;
      if (screen) {
        screen.style.display = 'none';
        screen.classList.remove('is-animating');
        gsap.set(screen, { willChange: 'auto' });
      }
      gsap.set(['#envelopeFlap', '#innerCard', '#waxSealContainer', '#waxSeal', '#envelopeBody'], {
        willChange: 'auto'
      });

      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');

      if (window.lenisInstance) {
        window.lenisInstance.start();
        window.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 200);
      }
    }
  });

  // Step 1: Wax seal compression -> gentle bloom & dissolve
  tl.to('#waxSeal', {
    scale: 0.92,
    duration: 0.2,
    ease: 'power2.in'
  })
  .to('#waxSeal', {
    scale: 1.18,
    z: 40,
    duration: 0.45,
    ease: 'back.out(1.6)'
  })
  .to('#waxSealContainer', {
    y: -35,
    opacity: 0,
    scale: 1.05,
    duration: 0.65,
    ease: 'power2.out'
  }, '-=0.1')

  // Step 2: Flap unfolds smoothly 180deg with elegant deceleration
  .to('#envelopeFlap', {
    rotateX: 180,
    duration: 1.25,
    ease: 'power2.inOut',
    transformOrigin: 'top center'
  }, '-=0.35')
  .set('#envelopeFlap', { zIndex: 5 }, '<0.62')

  // Step 3: Inner Card rises majestically from within envelope
  .to('#innerCard', {
    y: -215,
    rotateZ: -1.0,
    scale: 1.06,
    duration: 1.35,
    ease: 'power3.out'
  }, '-=0.55')
  .to('#envelopeBody', {
    y: 38,
    opacity: 0.82,
    scale: 0.97,
    duration: 1.15,
    ease: 'power2.out'
  }, '<')

  // Step 4: Card becomes centerpiece with royal poise
  .to('#innerCard', {
    scale: 1.14,
    y: -105,
    opacity: 1,
    rotateZ: 0,
    duration: 0.85,
    ease: 'power2.inOut'
  })

  // Step 5: Screen gently cross-fades & glides up to reveal cover hero
  .to('#envelopeScreen', {
    opacity: 0,
    yPercent: -15,
    scale: 1.02,
    duration: 1.15,
    ease: 'power3.inOut'
  }, '+=0.15')

  // Seamlessly cue the hero titles as the intro fades
  .fromTo('#coverHeroScreen .rosegold-foil-title, #coverHeroScreen .rosegold-foil-couple', {
    y: 22,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.05,
    stagger: 0.12,
    ease: 'power3.out'
  }, '-=0.75');
}

function reopenIntro() {
  const screen = document.getElementById('envelopeScreen');
  if (!screen) return;
  isEnvelopeOpened = false;
  isIntroAnimating = false;
  screen.style.display = 'flex';
  screen.classList.remove('is-animating');
  document.documentElement.classList.add('intro-active');
  document.body.classList.add('intro-active');
  if (window.lenisInstance) window.lenisInstance.stop();

  // Reset all elements
  gsap.set(screen, { yPercent: 0, opacity: 1, clearProps: 'willChange' });
  gsap.set('#envelopeBody', { clearProps: 'all' });
  gsap.set('#envelopeFlap', { clearProps: 'all', zIndex: 30 });
  gsap.set('#innerCard', { clearProps: 'all', zIndex: 15 });
  gsap.set('#waxSealContainer', { clearProps: 'all', opacity: 1 });
  gsap.set('#waxSeal', { clearProps: 'all' });
  gsap.set('#envelopeGreeting', { opacity: 1, y: 0 });
  gsap.set(['#openGuidePill', '#introCtaBtn', '#introAudioCue', '#introFooterInfo'], {
    opacity: 1,
    y: 0,
    clearProps: 'pointerEvents'
  });
  window.scrollTo(0, 0);
}

const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
function toKhmerNum(num) {
  return num.toString().split('').map(d => khmerDigits[parseInt(d)] || d).join('');
}

function updateCountdown() {
  const targetDate = new Date("December 20, 2026 17:00:00").getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('khmerDays').innerText = toKhmerNum(days);
    document.getElementById('khmerHours').innerText = toKhmerNum(hours);
    document.getElementById('khmerMins').innerText = toKhmerNum(mins);
    document.getElementById('khmerSecs').innerText = toKhmerNum(secs);

    document.getElementById('latinDays').innerText = `${days} DAYS`;
    document.getElementById('latinHours').innerText = `${hours} HOURS`;
    document.getElementById('latinMins').innerText = `${mins} MINS`;
    document.getElementById('latinSecs').innerText = `${secs} SECS`;
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

function spawnFloatingLotus(event) {
  const container = document.getElementById('lotusPondInteractive');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const x = event ? (event.clientX - rect.left) : (rect.width * 0.5 + (Math.random() * 100 - 50));
  const y = event ? (event.clientY - rect.top) : (rect.height * 0.6 + (Math.random() * 80 - 40));

  const ripple = document.createElement('div');
  ripple.className = 'water-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  container.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1600);

  const lantern = document.createElement('div');
  lantern.className = 'lotus-lantern flex flex-col items-center select-none';
  lantern.style.left = `${x - 24}px`;
  lantern.style.top = `${y - 24}px`;

  lantern.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="w-6 h-6 rounded-full bg-[#f7efdc] filter blur-md opacity-80"></div>
          <svg class="w-10 h-10 text-[#d8c49a] relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 8 8 8 13C8 16 10 18 12 21C14 18 16 16 16 13C16 8 12 2 12 2Z"/>
            <path d="M4 14C4 14 7 15 10 12C9 16 6 18 4 18C2 18 2 16 4 14Z" fill="#f7efdc"/>
            <path d="M20 14C20 14 17 15 14 12C15 16 18 18 20 18C22 18 22 16 20 14Z" fill="#f7efdc"/>
          </svg>
        </div>
      `;
  container.appendChild(lantern);
  setTimeout(() => lantern.remove(), 9000);
}




// ── Lightbox with prev/next navigation across all photos ─────────────────
const lightboxItems = [];
let lightboxIndex = 0;
document.querySelectorAll('[onclick*="openLightbox"]').forEach(el => {
  const m = el.getAttribute('onclick').match(/openLightbox\('([^']+)',\s*'([^']+)'\)/);
  if (m) lightboxItems.push({ src: m[1], caption: m[2] });
});

function renderLightbox() {
  const item = lightboxItems[lightboxIndex];
  if (!item) return;
  const img = document.getElementById('lightboxImg');
  img.src = item.src;
  // retrigger the entrance animation
  img.style.animation = 'none';
  void img.offsetWidth;
  img.style.animation = '';
  document.getElementById('lightboxCaption').innerText = item.caption;
  document.getElementById('lbCounter').innerText =
    (lightboxIndex + 1) + ' / ' + lightboxItems.length;
}

function openLightbox(src, caption) {
  const idx = lightboxItems.findIndex(it => it.src === src);
  lightboxIndex = idx >= 0 ? idx : 0;
  if (idx < 0) lightboxItems.unshift({ src, caption });
  const lb = document.getElementById('galleryLightbox');
  lb.classList.remove('hidden');
  lb.classList.add('lb-open');
  renderLightbox();
  if (window.lenisInstance) window.lenisInstance.stop();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('galleryLightbox');
  lb.classList.add('hidden');
  lb.classList.remove('lb-open');
  if (window.lenisInstance) window.lenisInstance.start();
  document.body.style.overflow = '';
}

function lightboxStep(dir) {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  renderLightbox();
}

document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('galleryLightbox');
  if (lb.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') lightboxStep(-1);
  else if (e.key === 'ArrowRight') lightboxStep(1);
});

// Click on the dark backdrop closes the lightbox
document.getElementById('galleryLightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLightbox();
});

// ── Smooth anchor navigation (Lenis-aware) ────────────────────────────────
function scrollToTop() {
  if (window.lenisInstance) window.lenisInstance.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (!hash || hash === '#') return;
  const target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  if (window.lenisInstance) window.lenisInstance.scrollTo(target, { duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
});

// ── Page progress bar + back-to-top visibility ────────────────────────────
const pageBar = document.getElementById('pageProgressBar');
const backToTopBtn = document.getElementById('backToTopBtn');
function updatePageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  pageBar.style.width = Math.min(100, pct) + '%';
  backToTopBtn.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', updatePageProgress, { passive: true });
updatePageProgress();

function copyInvitationLink() {
  navigator.clipboard.writeText(window.location.href);
  const textSpan = document.getElementById('copyLinkText');
  textSpan.innerText = "បានចម្លង!";
  setTimeout(() => { textSpan.innerText = "Copy"; }, 2000);
}

function downloadWeddingICS() {
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "SUMMARY:អាពាហ៍ពិពាហ៍ ភត សុភ័ក្រ & កេត សុភាវី",
    "DESCRIPTION:ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ Phort Sopheak & Keth Sopheavy",
    "LOCATION:Battambang City Hall, Cambodia",
    "DTSTART:20261220T100000Z",
    "DTEND:20261220T150000Z",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Wedding_Sopheak_Sopheavy.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   MOTION ENGINE v4 — clean, no containerAnimation per-card
   Key fixes vs v3:
   1. ZERO containerAnimation tweens on individual cards — that was the root
      cause of cards getting stuck in their "from" state. GSAP cannot reliably
      measure card positions inside a horizontally-translating container.
   2. Card reveal done by watching onUpdate progress and toggling CSS classes.
      CSS transitions on compositor-only props (opacity, transform) → no paint.
   3. Lenis official wiring unchanged (confirmed correct).
   4. Only the finale card gets a GSAP tween (single element, triggered once).
========================================================================== */

// ── Capability flags ──────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isWeakDevice = navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
let isPhone = window.innerWidth < 768;
let isDesktop = !isPhone;
const motionOK = !prefersReducedMotion;

// ── 1. Register GSAP plugins ──────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── 2. Lenis — official GSAP integration ─────────────────────────────────
let lenis = null;
if (motionOK && isDesktop && typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
  });
  window.lenisInstance = lenis;
  if (document.documentElement.classList.contains('intro-active')) { lenis.stop(); }
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(500, 33);
}

// ── 3. Petal spawner ──────────────────────────────────────────────────────
function spawnPetal(section) {
  if (isPhone || isWeakDevice) return;
  const p = document.createElement('div');
  const size = 6 + Math.random() * 9;
  p.className = 'story-petal';
  p.style.cssText =
    'width:' + size + 'px;' +
    'height:' + size + 'px;' +
    'left:' + (8 + Math.random() * 84) + '%;' +
    'top:' + (35 + Math.random() * 55) + '%;' +
    'animation-duration:' + (5 + Math.random() * 7) + 's;' +
    'animation-delay:0s;';
  section.appendChild(p);
  p.addEventListener('animationend', () => p.remove(), { once: true });
}

// ── 4. Story motion init (re-runnable across breakpoints) ────────────────
const storyState = { triggers: [], observer: null };

function teardownStoryMotion() {
  storyState.triggers.forEach(st => st && st.kill());
  storyState.triggers = [];
  if (storyState.observer) { storyState.observer.disconnect(); storyState.observer = null; }
  const track = document.getElementById('storyHorizontalTrack');
  const section = document.getElementById('loveStorySection');
  if (track) gsap.set(track, { clearProps: 'all' });
  if (section) section.querySelectorAll('.story-photo-item').forEach(p => gsap.set(p, { clearProps: 'all' }));
  const bar = document.getElementById('storyProgressBar');
  if (bar) bar.style.width = '0%';
}

function scrollStoryTrack(dir) {
  const track = document.getElementById('storyHorizontalTrack');
  if (track) {
    const scrollAmount = Math.max(300, Math.round(track.clientWidth * 0.7));
    track.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  }
}

function initStoryMotion() {
  // Idempotency: kill any previously created story pin/triggers first so a
  // second boot (DOMContentLoaded + window load) or a resize re-init can never
  // stack two ScrollTriggers on #loveStorySection (that produced a corrupted
  // position:fixed + translate(0,pinDistance) hybrid and a blank story).
  teardownStoryMotion();

  const section = document.getElementById('loveStorySection');
  const track = document.getElementById('storyHorizontalTrack');
  const wrapper = document.getElementById('storyTrackWrapper');
  const bar = document.getElementById('storyProgressBar');
  const counter = document.getElementById('storyCounterCurrent');
  const glow1 = document.getElementById('storyGlow1');
  const glow2 = document.getElementById('storyGlow2');
  if (!section || !track || !wrapper) return;

  const photos = Array.from(section.querySelectorAll('.story-photo-item'));
  const imgCards = photos.filter(p => p.querySelector('img'));
  const TOTAL = imgCards.length;

  // Ensure all cards are visible immediately
  photos.forEach(p => {
    p.style.opacity = '1';
    p.style.transform = 'none';
  });

  // ── 4a. Header stagger entrance ──────────────────────────────────────
  if (motionOK && typeof gsap !== 'undefined') {
    try {
      const headerTween = gsap.from('.story-header > *', {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      });
      if (headerTween && headerTween.scrollTrigger) {
        storyState.triggers.push(headerTween.scrollTrigger);
      }
      const cueTween = gsap.to('#storyScrollCue', {
        opacity: 1, duration: 0.5, delay: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      });
      if (cueTween && cueTween.scrollTrigger) {
        storyState.triggers.push(cueTween.scrollTrigger);
      }
    } catch (e) {
      console.warn('Story header tween error:', e);
    }
  }

  // ── 4b. Live Counter, Progress Bar & Ambient Sync ────────────────────
  const finaleCard = photos[photos.length - 1];
  function syncStoryProgress() {
    const max = track.scrollWidth - track.clientWidth;
    const pct = max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0;
    if (bar) bar.style.width = (pct * 100) + '%';
    if (counter) {
      const idx = Math.min(TOTAL, Math.max(1, Math.ceil(pct * TOTAL)));
      counter.textContent = String(idx).padStart(2, '0');
    }
    if (glow1) glow1.style.transform = 'translateX(' + (pct * 70) + 'px)';
    if (glow2) glow2.style.transform = 'translateX(' + (-pct * 50) + 'px)';
    if (finaleCard && !finaleCard.querySelector('img')) {
      if (pct > 0.88) {
        finaleCard.style.opacity = '1';
        finaleCard.style.transform = 'scale(1)';
      }
    }
  }
  track.addEventListener('scroll', syncStoryProgress, { passive: true });
  syncStoryProgress();

  // ── 4c. Mouse Wheel Scroll Directly On The Row ───────────────────────
  // When hovering over the track, wheel scrolls the row horizontally!
  // When at the very end or beginning, page scroll continues naturally.
  wrapper.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0 && !e.shiftKey) {
      const max = track.scrollWidth - track.clientWidth;
      const canScrollRight = track.scrollLeft < max - 5;
      const canScrollLeft = track.scrollLeft > 5;
      if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 1.35;
      }
    }
  }, { passive: false });

  // ── 4d. Smooth Mouse Drag-to-Scroll (Desktop Grab & Swipe) ───────────
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let hasDragged = false;

  wrapper.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    isDown = true;
    hasDragged = false;
    startX = e.pageX - wrapper.offsetLeft;
    startScrollLeft = track.scrollLeft;
    track.style.scrollBehavior = 'auto';
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.style.scrollBehavior = 'auto';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.6;
    if (Math.abs(walk) > 5) hasDragged = true;
    track.scrollLeft = startScrollLeft - walk;
  });

  // Prevent triggering lightbox click when releasing a drag
  track.querySelectorAll('.story-photo-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (hasDragged) {
        e.stopPropagation();
        hasDragged = false;
      }
    }, true);
  });

  // ── 4e. Synchronized Page Scroll Pinning (Desktop) ───────────────────
  if (isDesktop && motionOK) {
    const getPinDistance = () => Math.min(2200, Math.max(1200, Math.round(window.innerHeight * 1.8)));

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      pin: true,
      pinType: 'fixed',
      start: 'top top',
      end: () => '+=' + getPinDistance(),
      scrub: 0.4,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate(self) {
        // When user scrolls the page vertically, glide the horizontal track
        if (!isDown) {
          const max = track.scrollWidth - track.clientWidth;
          if (max > 0) {
            track.scrollLeft = self.progress * max;
          }
        }
      }
    });
    storyState.triggers.push(pinTrigger);
  }
}

// ── 5. Section scroll-reveal engine (choreographed reveals for ALL sections) ──
// Supports an optional `blur: N` (focus-in: starts soft, resolves to sharp and is
// cleared on complete) plus richer default easing. Weak devices skip the blur so
// the one-time reveals stay cheap; everything is gated by prefers-reduced-motion.
function reveal(targets, vars, trigger, start) {
  if (!motionOK || !trigger || typeof gsap === 'undefined') return;
  if (!targets) return;
  const elements = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
  if (!elements.length) return;
  const v = Object.assign({}, vars || {});
  const blur = v.blur; delete v.blur;
  const fromVars = Object.assign({ opacity: 0, y: 35, duration: 0.9, ease: 'power3.out' }, v);
  if (blur && !isWeakDevice) fromVars.filter = 'blur(' + blur + 'px)';
  try {
    gsap.from(elements, Object.assign(fromVars, {
      scrollTrigger: {
        trigger: trigger,
        start: start || 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      onComplete() { gsap.set(elements, { clearProps: 'transform,opacity,filter' }); }
    }));
  } catch (err) {
    console.warn('reveal error:', err);
    try { gsap.set(elements, { opacity: 1, clearProps: 'all' }); } catch (_) { }
  }
}

function initSectionReveals() {
  if (!motionOK) return;
  const q = (s, root) => Array.from((root || document).querySelectorAll(s));
  const one = (s, root) => (root || document).querySelector(s);
  // Directional slide distance for two-column sections (desktop only).
  const dx = isDesktop ? 64 : 0;
  const dy = isDesktop ? 0 : 38;

  // SECTION 2: Cover Hero
  try {
    const cover = one('#coverHeroScreen');
    if (cover) {
      reveal(one('#coverHeroScreen .pt-2, #coverHeroScreen .pt-4'), { y: 30, blur: 6 }, cover, 'top 75%');
      reveal(one('#coverHeroScreen .my-auto'), { y: 46, scale: 0.955, blur: 7, duration: 1.05 }, cover, 'top 70%');
      reveal(one('#coverHeroScreen .max-w-xl.mx-auto.flex-col'), { y: 22, blur: 5, duration: 0.85 }, cover, 'top 65%');
    }
  } catch (e) { console.warn('Cover reveal error:', e); }

  // SECTION 3: Formal Royal Invitation — columns glide in from the sides
  try {
    const inv = one('#invitationSection');
    if (inv) {
      const invCols = q('#invitationSection [class*="lg:col-span-"]');
      const invLeft = invCols[0] || one('#invitationSection .grid > div:first-child');
      const invRight = invCols[1] || one('#invitationSection .grid > div:last-child');
      if (invLeft) {
        reveal(invLeft, { x: isDesktop ? -dx : 0, y: dy, scale: 0.95, blur: 6, duration: 1 }, inv, 'top 82%');
      }
      if (invRight) {
        reveal(invRight, { x: isDesktop ? dx : 0, y: dy, scale: 0.95, blur: 6, duration: 1 }, inv, 'top 82%');
        const cardPlaque = invRight.querySelector('div');
        if (cardPlaque && cardPlaque.children.length) {
          reveal(Array.from(cardPlaque.children), { y: 22, blur: 4, stagger: 0.06, duration: 0.75 }, inv, 'top 80%');
        }
      }
    }
  } catch (e) { console.warn('Invitation reveal error:', e); }

  // SECTION 4: The Couple — groom/bride part from the edges, photo settles center
  try {
    const couple = one('#coupleSection');
    if (couple) {
      reveal(one('#coupleHeader'), { y: 32, blur: 6 }, couple, 'top 85%');
      const groomCol = one('#coupleLayout > div:nth-child(1)');
      const couplePhoto = one('#coupleLayout > div:nth-child(2)');
      const brideCol = one('#coupleLayout > div:nth-child(3)');

      if (groomCol) reveal(groomCol, { x: isDesktop ? -dx : 0, y: dy, blur: 6, duration: 0.95 }, couple, 'top 82%');
      if (couplePhoto) reveal(couplePhoto, { scale: 0.9, y: 46, blur: 9, duration: 1.05 }, couple, 'top 82%');
      if (brideCol) reveal(brideCol, { x: isDesktop ? dx : 0, y: dy, blur: 6, duration: 0.95 }, couple, 'top 82%');
    }
  } catch (e) { console.warn('Couple reveal error:', e); }

  // SECTION 5: Live Countdown
  try {
    const countdown = one('#countdownSection');
    if (countdown) {
      reveal(one('#countdownSection .text-center > span, #countdownSection .text-center > h2'), { y: 28, blur: 6 }, countdown, 'top 85%');
      const cdCards = q('#countdownSection .grid > div');
      if (cdCards.length) {
        reveal(cdCards, { y: 42, scale: 0.88, blur: 5, stagger: 0.08, duration: 0.8, ease: 'back.out(1.4)' }, countdown, 'top 82%');
      }
      const cdBtn = one('#countdownSection button');
      if (cdBtn) reveal(cdBtn, { y: 18, scale: 0.9, blur: 4, duration: 0.65 }, countdown, 'top 78%');
    }
  } catch (e) { console.warn('Countdown reveal error:', e); }

  // SECTION 6: Ceremony Programme — milestones alternate from left/right
  try {
    const prog = one('#programmeSection');
    if (prog) {
      reveal(one('#programmeSection .text-center.mb-16'), { y: 32, blur: 6 }, prog, 'top 85%');
      const milestones = q('#programmeSection .space-y-12 > div');
      milestones.forEach((m, i) => {
        const fromVars = isDesktop
          ? { x: (i % 2 === 0 ? -54 : 54), opacity: 0, blur: 6, duration: 0.9 }
          : { y: 34, opacity: 0, blur: 5, duration: 0.9 };
        reveal(m, fromVars, m, 'top 88%');
        const badge = one('.rounded-full', m);
        if (badge) reveal(badge, { scale: 0, duration: 0.6, ease: 'back.out(1.8)' }, m, 'top 88%');
      });
    }
  } catch (e) { console.warn('Programme reveal error:', e); }

  // SECTION 7: Love Story header
  try {
    const story = one('#loveStorySection') || one('#storySection');
    if (story) {
      reveal(one('#loveStorySection .story-header, #storySection .text-center'), { y: 32, blur: 6 }, story, 'top 85%');
    }
  } catch (e) { console.warn('Story reveal error:', e); }

  // SECTION 8: Pre-Wedding Photo Gallery Header
  try {
    const gal = one('#gallerySection');
    if (gal) {
      reveal(one('#gallerySection .text-center.mb-10, #gallerySection .text-center.mb-14'), { y: 32, blur: 6 }, gal, 'top 85%');
    }
  } catch (e) { console.warn('Gallery header reveal error:', e); }

  // SECTION 9: Venue & Location Map — info and map glide from the sides
  try {
    const venue = one('#venueSection');
    if (venue) {
      reveal(one('#venueSection .text-center.mb-12'), { y: 32, blur: 6 }, venue, 'top 85%');
      const venueInfo = one('#venueSection .grid > div:first-child');
      const venueMap = one('#venueSection .grid > div:last-child');
      if (venueInfo) reveal(venueInfo, { x: isDesktop ? -dx : 0, y: dy, blur: 6, duration: 0.95 }, venue, 'top 82%');
      if (venueMap) reveal(venueMap, { x: isDesktop ? dx : 0, y: dy, blur: 6, duration: 0.95 }, venue, 'top 82%');
    }
  } catch (e) { console.warn('Venue reveal error:', e); }

  // SECTION 10: Wedding Gift / ចំណងដៃ
  try {
    const gift = one('#giftSection');
    if (gift) {
      reveal(one('#giftSection .text-center.mb-12'), { y: 32, blur: 6 }, gift, 'top 85%');
      const giftCards = q('#giftSection .grid > div');
      if (giftCards.length >= 2) {
        reveal(giftCards[0], { x: isDesktop ? -54 : 0, y: 34, blur: 6, duration: 0.9 }, gift, 'top 82%');
        reveal(giftCards[1], { x: isDesktop ? 54 : 0, y: 34, blur: 6, duration: 0.9 }, gift, 'top 82%');
      } else if (giftCards.length) {
        reveal(giftCards, { y: 44, blur: 5, stagger: 0.16 }, gift, 'top 82%');
      }
    }
  } catch (e) { console.warn('Gift reveal error:', e); }

  
      // SECTION 11: Wedding Wishes & Guestbook
      try {
        const wishes = one('#wishesSection');
        if (wishes) {
          reveal(one('#wishesSection .text-center.mb-10, #wishesSection .text-center.mb-14'), { y: 30 }, wishes, 'top 85%');
          const wishCols = q('#wishesSection .grid > div');
          if (wishCols.length) {
            reveal(wishCols, { y: 35, stagger: 0.12, duration: 0.8 }, wishes, 'top 82%');
          }
        }
      } catch (e) { console.warn('Wishes reveal error:', e); }

      // SECTION 12: Footer & Platform Share
  try {
    const footer = one('footer');
    if (footer) {
      reveal(one('footer h2, footer .rosegold-foil-title'), { y: 28, blur: 6 }, footer, 'top 88%');
      reveal(one('footer .text-center.mb-8'), { y: 22, blur: 4 }, footer, 'top 86%');
      const shareBtns = q('footer a, footer button');
      if (shareBtns.length) {
        reveal(shareBtns, { scale: 0.88, y: 18, blur: 4, stagger: 0.06, duration: 0.6, ease: 'back.out(1.5)' }, footer, 'top 84%');
      }
    }
  } catch (e) { console.warn('Footer reveal error:', e); }
}

// ── 6. Hero multi-layer scroll parallax (three depth planes) ───────────────
function initHeroMotion() {
  if (!motionOK || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const heroStart = { trigger: '#coverHeroScreen', start: 'top top', end: 'bottom top' };

  // Plane 1 (far): the background image drifts down slower than the page scroll.
  // #coverParallax is bled ±8% top/bottom, so ±5% keeps its edges fully covered
  // (no gap ever reveals the section background).
  gsap.fromTo('#coverParallax', { yPercent: -5 }, {
    yPercent: 5, ease: 'none',
    scrollTrigger: Object.assign({ scrub: 0.6 }, heroStart),
  });

  // Plane 2 (mid): the gold-dust layer drifts the opposite way → a second parallax
  // depth so particles and the photo separate as you scroll.
  gsap.fromTo('#goldDustLayer', { yPercent: 0 }, {
    yPercent: -12, ease: 'none',
    scrollTrigger: Object.assign({ scrub: 0.85 }, heroStart),
  });

  // Plane 3 (near): the royal corner ornaments rise and fade out as the cover
  // leaves the screen (they are decorative, never reveal-targeted).
  gsap.fromTo('#coverHeroScreen > div.absolute.z-10', { yPercent: 0, opacity: 0.35 }, {
    yPercent: -22, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '#coverHeroScreen', start: 'top top', end: 'bottom 40%', scrub: 0.6 },
  });
}

// ── 6b. Section 8: gallery cascade (coordinated, smooth) ──────────────────
function initGalleryMotion() {
  if (!motionOK || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const gal = document.getElementById('gallerySection');
  if (!gal) return;
  const items = Array.from(gal.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  // Pre-hide, then reveal in coordinated batches as the grid scrolls into view
  try {
    const softBlur = isWeakDevice ? null : 'blur(6px)';
    if (softBlur) gsap.set(items, { opacity: 0, y: 35, scale: 0.95, filter: softBlur });
    else gsap.set(items, { opacity: 0, y: 35, scale: 0.95 });
    ScrollTrigger.batch(items, {
      start: 'top 92%',
      once: true,
      interval: 0.08,
      batchMax: 6,
      onEnter: (batch) => gsap.to(batch, Object.assign({
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: 'power3.out',
        overwrite: true, stagger: 0.08,
        clearProps: 'transform,filter',
      }, softBlur ? { filter: 'blur(0px)' } : null)),
    });
  } catch (e) {
    console.warn('Gallery batch error:', e);
    try { gsap.set(items, { opacity: 1, y: 0, scale: 1, clearProps: 'all' }); } catch (_) { }
  }

  // One-time gold sheen sweep across the grid as it first enters (desktop only)
  try {
    const grid = gal.querySelector('.gallery-grid');
    if (grid && !isWeakDevice && !isPhone) {
      const sheen = document.createElement('div');
      sheen.id = 'gallerySheen';
      grid.appendChild(sheen);
      ScrollTrigger.create({
        trigger: grid, start: 'top 76%', once: true,
        onEnter() {
          sheen.style.animation = 'gallerySheenSweep 1.5s ease-out forwards';
          sheen.addEventListener('animationend', () => sheen.remove(), { once: true });
        },
      });
    }
  } catch (e) {
    console.warn('Gallery sheen error:', e);
  }
}

function spawnGoldDust() {
  if (!motionOK || isWeakDevice) return;
  const layer = document.getElementById('goldDustLayer');
  if (!layer) return;
  layer.innerHTML = '';
  const count = isPhone ? 12 : 24;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    const size = 2 + Math.random() * 3.5;
    const dur = 22 + Math.random() * 20; // Slower: 22s - 42s
    const left = Math.random() * 100;
    const delay = Math.random() * 14;
    s.className = 'gold-dust';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = left + '%';
    s.style.bottom = '-15px';
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = delay + 's';
    layer.appendChild(s);
  }
}

function applyHoverLift() {
  document.querySelectorAll(
    '#coupleSection .group, #invitationSection .group, #gallerySection .gallery-item, #giftSection .grid > div'
  ).forEach(el => el.classList.add('hover-lift'));
}

// ── 7. Boot all motions exactly once (guarded against DOMContentLoaded + load) ──
let motionsBooted = false;
function bootAllMotions() {
  if (motionsBooted) {
    // Already initialized — just re-measure (layout/fonts may have shifted).
    try { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); } catch (e) { console.warn(e); }
    return;
  }
  motionsBooted = true;
  try { initStoryMotion(); } catch (e) { console.warn('Story motion error:', e); }
  try { initSectionReveals(); } catch (e) { console.warn('Section reveals error:', e); }
  try { initGalleryMotion(); } catch (e) { console.warn('Gallery motion error:', e); }
  try { initHeroMotion(); } catch (e) { console.warn('Hero motion error:', e); }
  try { spawnGoldDust(); } catch (e) { console.warn('Gold dust error:', e); }
  try { applyHoverLift(); } catch (e) { console.warn('Hover lift error:', e); }
  try { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); } catch (e) { console.warn(e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    spawnIntroAmbiance();
    playIntroEntrance();
    bootAllMotions();
  });
} else {
  spawnIntroAmbiance();
  playIntroEntrance();
  bootAllMotions();
}

window.addEventListener('load', () => {
  bootAllMotions();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
});

// Rebuild story motion when crossing the mobile/desktop breakpoint
let lastDesktop = isDesktop;
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const nowDesktop = window.innerWidth >= 768;
    if (nowDesktop === lastDesktop) return;
    lastDesktop = nowDesktop;
    isPhone = !nowDesktop;
    isDesktop = nowDesktop;
    teardownStoryMotion();
    initStoryMotion();
    ScrollTrigger.refresh();
  }, 180);
});


// ── Wedding Wishes & Guestbook Logic ──────────────────────────────────────────
const DEFAULT_WISHES = [
  {
    id: 'w-1',
    name: 'ពូ សុខុម & មីង ចិន្តា',
    relationship: 'សាច់ញាតិបងប្អូន',
    message: 'សូមជូនពរក្មួយទាំងពីរឱ្យមានសុភមង្គលពេញលេញ ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំដូចទឹកអម្រឹត!',
    time: '១ ម៉ោងមុន',
    likes: 18,
    liked: false
  },
  {
    id: 'w-2',
    name: 'ចាន់ វណ្ណា (Vanna)',
    relationship: 'ភ្ញៀវខាងកូនកំលោះ',
    message: 'Happy Wedding to Phort Sopheak & Keth Sopheavy! ជូនពរមិត្តសម្លាញ់ជួបតែសំណាងល្អ សុខភាពមាំមួន និងឆាប់បានក្មួយបីឆាប់ៗណា៎!',
    time: '៣ ម៉ោងមុន',
    likes: 14,
    liked: false
  },
  {
    id: 'w-3',
    name: 'លីដា & ក្រុមការងារ',
    relationship: 'មិត្តភក្តិទាំងសងខាង',
    message: 'អបអរសាទរគូស្នេហ៍ដ៏ស័ក្តិសមបំផុត! សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍ពោរពេញដោយស្នាមញញឹម ភាពចម្រុងចម្រើន និងសេចក្តីសុខជានិរន្តរ៍។',
    time: '៥ ម៉ោងមុន',
    likes: 21,
    liked: false
  },
  {
    id: 'w-4',
    name: 'កញ្ញា ម៉ាលីកា',
    relationship: 'ភ្ញៀវខាងកូនក្រមុំ',
    message: 'ថ្ងៃនេះកូនក្រមុំស្អាតខ្លាំងណាស់! ជូនពរប្អូនស្រីមានក្តីសុខក្នុងជីវិតគូថ្មី ស្វាមីស្រឡាញ់ថ្នាក់ថ្នមមួយជីវិតណា៎!',
    time: 'ម្សិលមិញ',
    likes: 16,
    liked: false
  },
  {
    id: 'w-5',
    name: 'គឹម ហេង & គ្រួសារ',
    relationship: 'សាច់ញាតិបងប្អូន',
    message: 'សូមប្រសិទ្ធពរជ័យ បវរសួស្តី វិបុលសុខគ្រប់ប្រការដល់គូស្វាមីភរិយាថ្មី។ ស្រឡាញ់គ្នាលុះគ្រាអាវសាន្ត!',
    time: 'ម្សិលមិញ',
    likes: 12,
    liked: false
  }
];

function getStoredWishes() {
  try {
    const raw = localStorage.getItem('wedding_wishes_list_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('localStorage read error:', e);
  }
  return DEFAULT_WISHES;
}

function saveWishes(wishes) {
  try {
    localStorage.setItem('wedding_wishes_list_v1', JSON.stringify(wishes));
  } catch (e) {
    console.warn('localStorage write error:', e);
  }
}

let activeWishes = getStoredWishes();

function renderWishes() {
  const container = document.getElementById('wishesContainer');
  const countEl = document.getElementById('wishesCountNumber');
  if (!container) return;

  if (countEl) countEl.textContent = activeWishes.length;

  if (activeWishes.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-[#d8c49a]/60 text-xs font-sans">មិនទាន់មានពាក្យជូនពរនៅឡើយទេ។ សូមក្លាយជាអ្នកជូនពរដំបូងគេ!</div>';
    return;
  }

  container.innerHTML = activeWishes.map((w) => {
    const firstChar = (w.name || 'ភ្').trim().charAt(0);
    const relTag = w.relationship || 'មិត្តភក្តិ';
    const isLiked = !!w.liked;
    const likeCount = w.likes || 0;

    return `
      <div class="wish-card-enter bg-[#241e16]/85 hover:bg-[#241e16] border border-[#d8c49a]/25 hover:border-[#d8c49a]/45 rounded-xl sm:rounded-2xl p-4 transition-all shadow-sm">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#d8c49a] to-[#a38b5b] text-[#241e16] font-['Noto_Serif_Khmer'] font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
              ${firstChar}
            </div>
            <div>
              <h4 class="font-['Kantumruy_Pro'] font-medium text-xs sm:text-sm text-[#f7efdc] leading-tight">
                ${w.name}
              </h4>
              <div class="flex items-center space-x-2 mt-0.5">
                <span class="text-[10px] text-[#d8c49a] bg-[#d8c49a]/15 border border-[#d8c49a]/30 px-2 py-0.5 rounded-full font-['Kantumruy_Pro']">
                  ${relTag}
                </span>
                <span class="text-[10px] text-[#e5dac3]/50 font-['Kantumruy_Pro']">
                  ${w.time || 'ទើបតែផ្ញើ'}
                </span>
              </div>
            </div>
          </div>

          <button type="button" onclick="toggleWishLike('${w.id}')"
            class="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${isLiked ? 'bg-rose-500/20 border-rose-400/50 text-rose-300' : 'bg-[#3b3326]/60 hover:bg-[#3b3326] border-[#d8c49a]/30 text-[#e5dac3]'}"
            title="ចូលចិត្តពាក្យជូនពរនេះ">
            <i data-lucide="heart" class="w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : 'text-[#d8c49a]'}"></i>
            <span class="text-[11px] font-sans font-medium">${likeCount}</span>
          </button>
        </div>

        <p class="font-['Kantumruy_Pro'] text-xs sm:text-sm text-[#fffaf0]/95 leading-relaxed font-light pl-10 pr-2">
          ${w.message}
        </p>
      </div>
    `;
  }).join('');

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function insertQuickWish(text) {
  const textarea = document.getElementById('wishMessage');
  if (textarea) {
    textarea.value = text;
    textarea.focus();
  }
}

function handleWishSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('wishSenderName');
  const relInput = document.getElementById('wishRelationship');
  const messageInput = document.getElementById('wishMessage');
  const toast = document.getElementById('wishSuccessToast');

  if (!nameInput || !messageInput) return;

  const name = nameInput.value.trim();
  const relationship = relInput ? relInput.value : 'មិត្តភក្តិទាំងសងខាង';
  const message = messageInput.value.trim();

  if (!name || !message) return;

  const newWish = {
    id: 'w-' + Date.now(),
    name: name,
    relationship: relationship,
    message: message,
    time: 'ទើបតែផ្ញើ (Just now)',
    likes: 1,
    liked: true
  };

  activeWishes.unshift(newWish);
  saveWishes(activeWishes);

  // Reset form inputs
  nameInput.value = '';
  messageInput.value = '';

  // Format message for Telegram
  const telegramMessage = `🎉 សារជូនពរអាពាហ៍ពិពាហ៍ (Wedding Blessing) 🎉\n🤵 ភត សុភ័ក្រ & 👰 កេត សុភាវី\n-----------------------------------------\n👤 ពីភ្ញៀវ៖ ${name} (${relationship})\n💌 សារជូនពរ៖ ${message}\n-----------------------------------------\nសូមអរគុណ!`;

  const tgUrl = 'https://t.me/tongkhai08?text=' + encodeURIComponent(telegramMessage);

  // Automatically attempt to open Telegram
  try {
    window.open(tgUrl, '_blank');
  } catch (_) {}

  // Update button link inside toast
  const tgBtn = document.getElementById('wishTelegramBtn');
  if (tgBtn) {
    tgBtn.href = tgUrl;
  }

  // Show Toast
  if (toast) {
    toast.classList.remove('hidden');
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 12000);
  }

  // Scroll wishes feed removed (table deleted)
}

function toggleWishLike(id) {
  const wish = activeWishes.find(w => w.id === id);
  if (!wish) return;

  if (wish.liked) {
    wish.liked = false;
    wish.likes = Math.max(0, (wish.likes || 1) - 1);
  } else {
    wish.liked = true;
    wish.likes = (wish.likes || 0) + 1;
  }

  saveWishes(activeWishes);
  renderWishes();
}

// Initial render removed (guestbook table deleted)
