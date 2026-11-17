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

    // Spawn floating ambient champagne petals on intro screen
    function spawnIntroAmbiance() {
      if (prefersReducedMotion || isWeakDevice) return;
      const layer = document.getElementById('introGoldDustLayer');
      if (!layer) return;
      layer.innerHTML = '';
      const count = isPhone ? 6 : 12;
      for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'intro-ambient-petal';
        const size = 6 + Math.random() * 8;
        const left = 5 + Math.random() * 90;
        const dur = 7 + Math.random() * 8;
        const delay = Math.random() * 6;
        petal.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + left + '%;bottom:-10px;animation-duration:' + dur + 's;animation-delay:' + delay + 's;';
        layer.appendChild(petal);
      }
    }

    // Intro Entrance Animation on first page load
    function playIntroEntrance() {
      if (prefersReducedMotion) return;
      const screen = document.getElementById('envelopeScreen');
      if (!screen || isEnvelopeOpened) return;

      gsap.set(['#envelopeGreeting', '#envelopeBody', '#waxSeal', '#openGuidePill', '#introCtaBtn', '#introAudioCue', '.intro-corner-ornament'], {
        opacity: 0
      });
      gsap.set('#envelopeGreeting', { y: -24 });
      gsap.set('#envelopeBody', { scale: 0.92, y: 15 });
      gsap.set('#waxSeal', { scale: 0.6 });
      gsap.set(['#introCtaBtn', '#introAudioCue'], { y: 20 });

      const enterTl = gsap.timeline({ delay: 0.15 });
      enterTl
        .to('.intro-corner-ornament', { opacity: 0.45, duration: 0.8, ease: 'power2.out', stagger: 0.08 })
        .to('#envelopeGreeting', { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.6')
        .to('#envelopeBody', { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.55')
        .to('#waxSeal', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, '-=0.45')
        .to(['#openGuidePill', '#introCtaBtn', '#introAudioCue'], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '-=0.35');
    }

    // Silky Smooth Opening Sequence
    function startOpeningSequence() {
      if (isEnvelopeOpened || isIntroAnimating) return;
      isEnvelopeOpened = true;
      isIntroAnimating = true;

      const screen = document.getElementById('envelopeScreen');
      if (screen) {
        screen.classList.add('is-animating');
        gsap.set(screen, { willChange: 'transform, opacity' });
      }

      // Hardware-accelerate elements & prevent CSS transition fight
      gsap.set(['#envelopeFlap', '#innerCard', '#waxSealContainer', '#waxSeal', '#envelopeBody'], {
        force3D: true,
        willChange: 'transform, opacity'
      });

      // Clear any tilt from mousemove
      if (envelopeBody) {
        envelopeBody.style.transform = 'none';
      }

      // Unmute & play wedding audio on this valid user gesture
      if (!isPlayingAudio) {
        toggleAudio();
      }

      // Quick fade of button & guides
      gsap.to(['#openGuidePill', '#introCtaBtn', '#introAudioCue', '#introFooterInfo'], {
        opacity: 0,
        y: 12,
        duration: 0.3,
        pointerEvents: 'none',
        ease: 'power2.in'
      });
      gsap.to('#envelopeGreeting', {
        opacity: 0.35,
        y: -12,
        duration: 0.75,
        ease: 'power2.out'
      });

      const tl = gsap.timeline({
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
            setTimeout(() => ScrollTrigger.refresh(), 250);
          }
        }
      });

      // Step 1: Wax seal compression & pop
      tl.to('#waxSeal', { scale: 0.94, duration: 0.16, ease: 'power2.in' })
        .to('#waxSeal', {
          scale: 1.25,
          z: 50,
          boxShadow: '0 24px 42px rgba(0,0,0,0.85)',
          duration: 0.45,
          ease: 'back.out(1.5)'
        })
        .to('#waxSealContainer', {
          x: 230,
          y: -110,
          opacity: 0,
          rotation: 28,
          duration: 0.65,
          ease: 'power2.in'
        }, '-=0.1')

        // Step 2: Flap opens smoothly 180deg (z-index flipped at midpoint without onUpdate thrash)
        .to('#envelopeFlap', {
          rotateX: 180,
          duration: 1.05,
          ease: 'power2.inOut',
          transformOrigin: 'top center'
        }, '-=0.35')
        .set('#envelopeFlap', { zIndex: 5 }, '<0.52')

        // Step 3: Inner Card rises majestically from within envelope
        .to('#innerCard', {
          y: -215,
          rotateZ: -1.5,
          scale: 1.05,
          duration: 1.15,
          ease: 'power3.out'
        }, '-=0.45')
        .to('#envelopeBody', {
          y: 42,
          opacity: 0.88,
          duration: 0.95,
          ease: 'power2.out'
        }, '<')

        // Step 4: Card becomes centerpiece
        .to('#innerCard', {
          scale: 1.15,
          y: -95,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.inOut'
        })

        // Step 5: Screen slides up like a theatre curtain, revealing the cover hero
        .to('#envelopeScreen', {
          yPercent: -100,
          duration: 0.88,
          ease: 'power3.inOut'
        }, '-=0.15');
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
        duration: 1.1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        infinite: false,
      });
      window.lenisInstance = lenis;
      if (document.documentElement.classList.contains('intro-active')) { lenis.stop(); }
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
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
        track.style.scrollBehavior = 'smooth';
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

    // ── 5. Section scroll-reveal engine (Rich animations for ALL sections) ──
    function reveal(targets, vars, trigger, start) {
      if (!motionOK || !trigger || typeof gsap === 'undefined') return;
      if (!targets) return;
      const elements = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
      if (!elements.length) return;
      try {
        gsap.from(elements, {
          opacity: 0,
          y: 35,
          duration: 0.85,
          ease: 'power2.out',
          ...(vars || {}),
          scrollTrigger: {
            trigger: trigger,
            start: start || 'top 85%',
            toggleActions: 'play none none none',
            once: true
          },
          onComplete() { gsap.set(elements, { clearProps: 'transform,opacity,filter' }); }
        });
      } catch (err) {
        console.warn('reveal error:', err);
        try { gsap.set(elements, { opacity: 1, clearProps: 'all' }); } catch (_) {}
      }
    }

    function initSectionReveals() {
      if (!motionOK) return;
      const q = (s, root) => Array.from((root || document).querySelectorAll(s));
      const one = (s, root) => (root || document).querySelector(s);

      // SECTION 2: Cover Hero
      try {
        const cover = one('#coverHeroScreen');
        if (cover) {
          reveal(one('#coverHeroScreen .pt-2, #coverHeroScreen .pt-4'), { y: 35 }, cover, 'top 75%');
          reveal(one('#coverHeroScreen .my-auto'), { y: 45, scale: 0.96, duration: 0.95 }, cover, 'top 70%');
          reveal(one('#coverHeroScreen .max-w-xl.mx-auto.flex-col'), { y: 25, duration: 0.8 }, cover, 'top 65%');
        }
      } catch (e) { console.warn('Cover reveal error:', e); }

      // SECTION 3: Formal Royal Invitation
      try {
        const inv = one('#invitationSection');
        if (inv) {
          const invCols = q('#invitationSection [class*="lg:col-span-"]');
          const invLeft = invCols[0] || one('#invitationSection .grid > div:first-child');
          const invRight = invCols[1] || one('#invitationSection .grid > div:last-child');
          if (invLeft) {
            reveal(invLeft, { x: isDesktop ? -45 : 0, y: isDesktop ? 0 : 35, scale: 0.95, duration: 0.95 }, inv, 'top 82%');
          }
          if (invRight) {
            reveal(invRight, { x: isDesktop ? 45 : 0, y: isDesktop ? 0 : 35, scale: 0.95, duration: 0.95 }, inv, 'top 82%');
            const cardPlaque = invRight.querySelector('div');
            if (cardPlaque && cardPlaque.children.length) {
              reveal(Array.from(cardPlaque.children), { y: 25, stagger: 0.08, duration: 0.8 }, inv, 'top 80%');
            }
          }
        }
      } catch (e) { console.warn('Invitation reveal error:', e); }

      // SECTION 4: The Couple
      try {
        const couple = one('#coupleSection');
        if (couple) {
          reveal(one('#coupleHeader'), { y: 35 }, couple, 'top 85%');
          const groomCol = one('#coupleLayout > div:nth-child(1)');
          const couplePhoto = one('#coupleLayout > div:nth-child(2)');
          const brideCol = one('#coupleLayout > div:nth-child(3)');

          if (groomCol) reveal(groomCol, { x: isDesktop ? -50 : 0, y: isDesktop ? 0 : 35, duration: 0.9 }, couple, 'top 82%');
          if (couplePhoto) reveal(couplePhoto, { scale: 0.9, y: 45, duration: 1 }, couple, 'top 82%');
          if (brideCol) reveal(brideCol, { x: isDesktop ? 50 : 0, y: isDesktop ? 0 : 35, duration: 0.9 }, couple, 'top 82%');
        }
      } catch (e) { console.warn('Couple reveal error:', e); }

      // SECTION 5: Live Countdown
      try {
        const countdown = one('#countdownSection');
        if (countdown) {
          reveal(one('#countdownSection .text-center > span, #countdownSection .text-center > h2'), { y: 30 }, countdown, 'top 85%');
          const cdCards = q('#countdownSection .grid > div');
          if (cdCards.length) {
            reveal(cdCards, { y: 40, scale: 0.88, stagger: 0.1, duration: 0.75, ease: 'back.out(1.4)' }, countdown, 'top 82%');
          }
          const cdBtn = one('#countdownSection button');
          if (cdBtn) reveal(cdBtn, { y: 20, scale: 0.9, duration: 0.6 }, countdown, 'top 78%');
        }
      } catch (e) { console.warn('Countdown reveal error:', e); }

      // SECTION 6: Ceremony Programme
      try {
        const prog = one('#programmeSection');
        if (prog) {
          reveal(one('#programmeSection .text-center.mb-16'), { y: 35 }, prog, 'top 85%');
          const milestones = q('#programmeSection .space-y-12 > div');
          milestones.forEach((m, i) => {
            const fromVars = isDesktop
              ? { x: (i % 2 === 0 ? -45 : 45), opacity: 0, duration: 0.85 }
              : { y: 35, opacity: 0, duration: 0.85 };
            reveal(m, fromVars, m, 'top 88%');
            const badge = one('.rounded-full', m);
            if (badge) reveal(badge, { scale: 0, duration: 0.6, ease: 'back.out(1.8)' }, m, 'top 88%');
          });
        }
      } catch (e) { console.warn('Programme reveal error:', e); }

      // SECTION 7: Love Story
      try {
        const story = one('#loveStorySection') || one('#storySection');
        if (story) {
          reveal(one('#loveStorySection .story-header, #storySection .text-center'), { y: 35 }, story, 'top 85%');
        }
      } catch (e) { console.warn('Story reveal error:', e); }

      // SECTION 8: Pre-Wedding Photo Gallery Header
      try {
        const gal = one('#gallerySection');
        if (gal) {
          reveal(one('#gallerySection .text-center.mb-10, #gallerySection .text-center.mb-14'), { y: 35 }, gal, 'top 85%');
        }
      } catch (e) { console.warn('Gallery header reveal error:', e); }

      // SECTION 9: Venue & Location Map
      try {
        const venue = one('#venueSection');
        if (venue) {
          reveal(one('#venueSection .text-center.mb-12'), { y: 35 }, venue, 'top 85%');
          const venueInfo = one('#venueSection .grid > div:first-child');
          const venueMap = one('#venueSection .grid > div:last-child');
          if (venueInfo) reveal(venueInfo, { x: isDesktop ? -45 : 0, y: isDesktop ? 0 : 35, duration: 0.9 }, venue, 'top 82%');
          if (venueMap) reveal(venueMap, { x: isDesktop ? 45 : 0, y: isDesktop ? 0 : 35, duration: 0.9 }, venue, 'top 82%');
        }
      } catch (e) { console.warn('Venue reveal error:', e); }

      // SECTION 10: Wedding Gift / ចំណងដៃ
      try {
        const gift = one('#giftSection');
        if (gift) {
          reveal(one('#giftSection .text-center.mb-12'), { y: 35 }, gift, 'top 85%');
          const giftCards = q('#giftSection .grid > div');
          if (giftCards.length >= 2) {
            reveal(giftCards[0], { x: isDesktop ? -45 : 0, y: 35, duration: 0.85 }, gift, 'top 82%');
            reveal(giftCards[1], { x: isDesktop ? 45 : 0, y: 35, duration: 0.85 }, gift, 'top 82%');
          } else if (giftCards.length) {
            reveal(giftCards, { y: 45, stagger: 0.18 }, gift, 'top 82%');
          }
        }
      } catch (e) { console.warn('Gift reveal error:', e); }

      // SECTION 12: Footer & Platform Share
      try {
        const footer = one('footer');
        if (footer) {
          reveal(one('footer h2, footer .rosegold-foil-title'), { y: 30 }, footer, 'top 88%');
          reveal(one('footer .text-center.mb-8'), { y: 25 }, footer, 'top 86%');
          const shareBtns = q('footer a, footer button');
          if (shareBtns.length) {
            reveal(shareBtns, { scale: 0.88, y: 20, stagger: 0.08, duration: 0.6, ease: 'back.out(1.5)' }, footer, 'top 84%');
          }
        }
      } catch (e) { console.warn('Footer reveal error:', e); }
    }

    // ── 6. Hero parallax + gold dust ──────────────────────────────────────────
    function initHeroMotion() {
      if (!motionOK) return;
      gsap.to('#coverParallax', {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: '#coverHeroScreen', start: 'top top', end: 'bottom top', scrub: true },
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
        gsap.set(items, { opacity: 0, y: 35, scale: 0.95 });
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: true,
          interval: 0.08,
          batchMax: 6,
          onEnter: (batch) => gsap.to(batch, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, ease: 'power2.out',
            overwrite: true, stagger: 0.08,
            clearProps: 'transform',
          }),
        });
      } catch (e) {
        console.warn('Gallery batch error:', e);
        try { gsap.set(items, { opacity: 1, y: 0, scale: 1, clearProps: 'all' }); } catch (_) {}
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
      for (let i = 0; i < 18; i++) {
        const s = document.createElement('span');
        const size = 2 + Math.random() * 3.5;
        const dur = 9 + Math.random() * 9;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        s.className = 'gold-dust';
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.left = left + '%';
        s.style.bottom = '-10px';
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

    // ── 7. Boot all motions immediately (DOMContentLoaded & window load) ─────
    function bootAllMotions() {
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
