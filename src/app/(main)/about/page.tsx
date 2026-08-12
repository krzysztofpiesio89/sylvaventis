'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ─── CURSOR ─── */
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const ticker = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorDotRef.current) {
        gsap.set(cursorDotRef.current, { x: mx, y: my });
      }
      if (cursorRingRef.current) {
        gsap.set(cursorRingRef.current, { x: rx, y: ry });
      }
    };
    gsap.ticker.add(ticker);

    /* ─── LOADER ─── */
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          autoAlpha: 0,
          duration: 0.6,
          delay: 0.2,
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
            initHero();
          },
        });
      },
    });

    tl.to('#loader-logo', { opacity: 1, duration: 0.8, ease: 'power2.out' })
      .to('#loader-bar', { left: '100%', duration: 1.4, ease: 'power2.inOut' }, '-=.2')
      .to('#loader-text', { opacity: 0.4, duration: 0.3 }, '-=.6');

    /* ─── HERO INTRO ─── */
    function initHero() {
      gsap.from('#heroEyebrow', { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out' });
      gsap.from('.hero-title .word', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      });
      gsap.from('#heroDesc', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', delay: 0.6 });
      gsap.from('#heroScroll', { opacity: 0, y: 10, duration: 0.8, ease: 'power2.out', delay: 1 });

      // Scroll line animation
      gsap.to('#scrollLine', {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.8,
        ease: 'power2.in',
        repeat: -1,
        repeatDelay: 0.6,
        yoyo: false,
        onRepeat: () => gsap.set('#scrollLine', { scaleY: 1 }),
      });

      // Mushroom BG slow drift
      gsap.to('.hero-mushroom-bg', {
        y: 40,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Hero parallax on scroll
      gsap.to('.hero-title', {
        yPercent: -30,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }

    /* ─── SCROLL REVEALS ─── */
    gsap.utils.toArray('.reveal').forEach((el: any) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ─── PILLAR STAGGER ─── */
    gsap.from('.pillar', {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.pillars-grid', start: 'top 75%' },
    });

    /* ─── STAT COUNTERS ─── */
    document.querySelectorAll('.stat').forEach((stat: any, i) => {
      const numEl = stat.querySelector('.stat-num');
      const targetElement = stat.querySelector('[data-target]');
      if (!targetElement) return;
      const target = parseInt(targetElement.dataset.target);
      const unitEl = stat.querySelector('.stat-unit');
      const unit = unitEl ? unitEl.innerText : '';
      
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          let count = { val: 0 };
          gsap.to(count, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (numEl) numEl.innerHTML = Math.round(count.val) + `<span class="stat-unit align-super text-[0.45em] text-[#b8953f]">${unit}</span>`;
            },
          });
          gsap.from(stat, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', delay: i * 0.1 });
        },
      });
    });

    /* ─── TIMELINE ─── */
    gsap.utils.toArray('.timeline-item').forEach((item: any) => {
      gsap.from(item, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 80%' },
      });
      gsap.from(item.querySelector('.timeline-dot'), {
        scale: 0,
        duration: 0.4,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: item, start: 'top 80%' },
      });
    });

    // Spine progress
    ScrollTrigger.create({
      trigger: '.timeline-track',
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 0.5,
      onUpdate: (self) => {
        const spine = document.getElementById('spineProgress');
        if (spine) spine.style.height = self.progress * 100 + '%';
      },
    });

    /* ─── PROCESS STEPS ─── */
    gsap.from('.process-step', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: { trigger: '.process-steps', start: 'top 75%' },
    });

    /* ─── CTA MUSHROOM PARALLAX ─── */
    gsap.to('.cta-bg', {
      scale: 1.2,
      scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: 1 },
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#0f0d0a] text-[#f0ebe0] font-serif overflow-x-hidden selection:bg-[#b8953f] selection:text-white">
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] bg-[length:200px_200px]" />

      {/* CURSOR */}
      <div id="cursor" className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block">
        <div ref={cursorDotRef} className="w-1.5 h-1.5 bg-[#b8953f] rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-150" />
        <div ref={cursorRingRef} className="w-9 h-9 border border-[#b8953f]/50 rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300" />
      </div>

      {/* LOADER */}
      <div ref={loaderRef} className="fixed inset-0 z-[1000] bg-[#0f0d0a] flex flex-col items-center justify-center gap-6">
        <div id="loader-logo" className="text-4xl md:text-6xl font-light tracking-widest opacity-0">Amanita Sale</div>
        <div id="loader-bar-wrap" className="w-48 h-px bg-[#b8953f]/20 relative overflow-hidden">
          <div id="loader-bar" className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-[#b8953f] to-transparent" />
        </div>
        <div id="loader-text" className="font-syne text-[11px] tracking-[0.3em] uppercase text-[#b8953f]">Entering the forest</div>
      </div>

      {/* HERO */}
      <section className="hero min-h-screen flex items-end px-6 md:px-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_30%,rgba(61,74,47,0.35)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(92,61,46,0.25)_0%,transparent_60%)] bg-[#0f0d0a]" />
        
        {/* Mushroom SVG */}
        <svg className="hero-mushroom-bg absolute right-[-2%] top-1/2 -translate-y-1/2 w-[55%] h-auto opacity-[0.04] pointer-events-none" viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M220 700 C210 600 200 500 215 420 C225 370 270 360 285 420 C300 500 290 600 280 700Z" fill="white"/>
          <path d="M60 430 Q80 250 250 200 Q420 250 440 430 Q350 480 250 480 Q150 480 60 430Z" fill="white"/>
          <circle cx="200" cy="290" r="18" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="12"/>
          <circle cx="300" cy="270" r="14" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="10"/>
          <circle cx="250" cy="320" r="20" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="13"/>
        </svg>

        <div className="relative z-10 max-w-4xl">
          <p id="heroEyebrow" className="font-syne text-[11px] tracking-[0.4em] uppercase text-[#b8953f] mb-6">Est. in the northern forests · Ancient wisdom, modern science</p>
          <h1 className="hero-title text-6xl md:text-[8vw] font-light leading-[0.9] tracking-tighter">
            <span className="block overflow-hidden">
              <span className="word inline-block">Our&nbsp;</span>
              <span className="word inline-block italic text-[#d4c9a8]">Story</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block">Begins</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block">Underground</span>
            </span>
          </h1>
        </div>

        <p id="heroDesc" className="absolute right-6 md:right-12 bottom-20 max-w-xs text-base leading-relaxed text-[#d4c9a8] opacity-80 hidden md:block">
          Bridging the gap between ancient botanical wisdom and modern biological standards. Hand-selected specimens from pristine northern forests.
        </p>

        <div id="heroScroll" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-syne text-[10px] tracking-[0.3em] uppercase text-[#b8953f] opacity-60">
          <div id="scrollLine" className="w-px h-12 bg-gradient-to-b from-[#b8953f] to-transparent origin-top" />
          <span>Scroll</span>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="flex items-center gap-6 px-6 md:px-12 py-12">
        <div className="flex-1 h-px bg-white/10" />
        <div className="text-[#b8953f] text-lg opacity-50">✦</div>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* MANIFESTO */}
      <section ref={manifestoRef} className="px-6 md:px-12 py-32 grid md:grid-cols-2 gap-20">
        <div>
          <p className="reveal font-syne text-[10px] tracking-[0.4em] uppercase text-[#b8953f] mb-8">The Manifesto</p>
          <blockquote className="reveal text-4xl md:text-5xl font-light leading-tight tracking-tighter">
            "Nature's most <em className="italic text-[#d4c9a8]">misunderstood</em> gifts, now accessible to those who seek true wisdom."
          </blockquote>
        </div>
        <div className="pt-12 space-y-8">
          <p className="reveal text-lg md:text-xl leading-relaxed text-white/75">
            <span className="text-6xl font-light float-left leading-[0.85] mr-3 mt-1 text-[#b8953f]">A</span>
            manita Sale was born from a deep reverence for the mycelial networks that weave through every ancient forest floor. We believe that the most profound medicines and supplements have been waiting quietly beneath the soil for millennia, known to healers and shamans long before laboratories existed.
          </p>
          <p className="reveal text-lg leading-relaxed text-white/75">
            Our founders spent years traversing the boreal forests of Northern Europe, building relationships with local harvesters who carry generations of knowledge. Every product begins with a single question: does this specimen meet the standard of someone who truly understands it?
          </p>
          <p className="reveal text-lg leading-relaxed text-white/75">
            We bridge that world with rigorous laboratory science — third-party testing, precise extraction methodologies, and an uncompromising commitment to purity that respects both the organism and the person consuming it.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section ref={pillarsRef} className="px-6 md:px-12 py-32">
        <div className="flex items-baseline gap-6 mb-20">
          <h2 className="reveal text-5xl md:text-7xl font-light">Our <em className="italic">Core</em> Pillars</h2>
          <span className="reveal font-syne text-[11px] tracking-[0.3em] text-[#b8953f] opacity-60">03 principles</span>
        </div>
        <div className="pillars-grid grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {[
            { num: '01', title: 'Ancient Sourcing', text: 'Every specimen is hand-harvested from verified pristine ecosystems, following ethical wildcrafting practices passed down through generations of northern forest communities.' },
            { num: '02', title: 'Modern Rigour', text: 'Triple-tested for purity, potency, and contaminants by independent laboratories. Every batch is traceable from forest floor to final product — no exceptions.' },
            { num: '03', title: 'Uncompromising Craft', text: 'Small-batch production preserves the integrity of each specimen. We would rather produce less and preserve excellence than scale at the cost of quality.' }
          ].map((pillar, i) => (
            <div key={i} className="pillar group relative bg-[#1a1612] p-12 overflow-hidden transition-colors hover:bg-[#201c17]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#b8953f]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="pillar-num text-7xl font-light text-[#b8953f]/10 leading-none mb-6 group-hover:text-[#b8953f]/20 transition-colors">{pillar.num}</div>
              <h3 className="text-2xl font-normal mb-4 tracking-wide">{pillar.title}</h3>
              <p className="text-base leading-relaxed text-white/60">{pillar.text}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#b8953f] transition-[width] duration-500 ease-out group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="px-6 md:px-12 py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {[
            { target: 12, label: 'Years of research', unit: '+' },
            { target: 47, label: 'Forest regions sourced', unit: '+' },
            { target: 3, label: 'Laboratory tested', unit: '×' },
            { target: 100, label: 'Traceable batches', unit: '%' }
          ].map((stat, i) => (
            <div key={i} className="stat reveal bg-[#1a1612] p-12 relative overflow-hidden">
              <div className="stat-num text-5xl md:text-7xl font-light leading-none mb-3" data-target={stat.target}>
                0<span className="stat-unit text-[0.45em] text-[#b8953f] align-super">{stat.unit}</span>
              </div>
              <div className="stat-label font-syne text-[11px] tracking-widest uppercase text-white/45">{stat.label}</div>
              <div className="absolute right-[-10px] bottom-[-10px] text-8xl font-light text-[#b8953f]/5 pointer-events-none">{stat.target}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineRef} className="px-6 md:px-12 py-32 relative">
        <h2 className="reveal text-5xl md:text-7xl font-light mb-20">The <em className="italic">Journey</em></h2>
        <div className="timeline-track relative">
          <div className="absolute left-24 md:left-40 top-0 bottom-0 w-px bg-[#b8953f]/20">
            <div id="spineProgress" className="absolute top-0 left-0 right-0 h-0 bg-[#b8953f] transition-[height] duration-100" />
          </div>
          {[
            { year: '2012', event: 'First Expedition', desc: 'Our founders embarked on the first of many journeys into the boreal forests of northern Finland, forging bonds with local harvesters and beginning a decade of botanical research.' },
            { year: '2016', event: 'Laboratory Partnership', desc: 'Formed an exclusive partnership with a leading mycological research institute, establishing the triple-testing protocol that remains our gold standard today.' },
            { year: '2019', event: 'First Collection Launch', desc: 'Released our inaugural collection of seven carefully curated specimens to a private waiting list. All 300 units sold within 48 hours — without a single advertisement.' },
            { year: '2022', event: 'Global Sourcing Network', desc: 'Expanded our harvester network across 47 forest regions in 9 countries, each partner vetted personally and trained in our ethical wildcrafting protocols.' },
            { year: 'Now', event: 'The Full Experience', desc: 'We are building something larger than a store — a living archive of botanical wisdom, accessible to those who seek it. The full platform arrives soon.' }
          ].map((item, i) => (
            <div key={i} className="timeline-item group grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] gap-10 md:gap-16 py-12 border-b border-white/5 last:border-0 relative">
              <div className="timeline-year text-4xl md:text-5xl font-light text-[#b8953f] text-right pr-8 opacity-50 group-hover:opacity-100 transition-opacity">{item.year}</div>
              <div className="timeline-dot absolute left-24 md:left-40 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#b8953f] bg-[#0f0d0a] z-10 group-hover:bg-[#b8953f] transition-colors" />
              <div>
                <h3 className="text-2xl md:text-3xl font-normal mb-3">{item.event}</h3>
                <p className="text-base leading-relaxed text-white/55">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} className="px-6 md:px-12 py-32 bg-[#1a1612]">
        <h2 className="reveal text-5xl md:text-7xl font-light mb-20 leading-tight">From <em className="italic">Forest</em><br />to Your Hands</h2>
        <div className="process-steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { num: '01', title: 'Wild Harvest', text: 'Hand-selected by trusted harvesters in pristine northern forests, following centuries-old sustainable practices that preserve the ecosystem.' },
            { num: '02', title: 'Verification', text: 'Each specimen undergoes expert morphological identification before leaving the forest. Only confirmed specimens proceed to the next stage.' },
            { num: '03', title: 'Laboratory Testing', text: 'Triple-tested by independent labs for species purity, potency levels, heavy metals, pesticides, and microbiological safety. Full certificates available.' },
            { num: '04', title: 'Careful Delivery', text: 'Small-batch packaging preserves specimen integrity. Climate-controlled shipping with full traceability from harvest location to your door.' }
          ].map((step, i) => (
            <div key={i} className="process-step relative">
              <div className="font-syne text-[11px] tracking-[0.3em] text-[#b8953f] mb-5">Step {step.num}</div>
              <h3 className="text-2xl font-normal mb-4 leading-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{step.text}</p>
              {i < 3 && <div className="hidden lg:block absolute top-8 -right-6 w-12 h-px bg-[#b8953f]/30" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-40 text-center relative overflow-hidden">
        <div className="cta-bg absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(61,74,47,0.2)_0%,transparent_70%)]" />
        <p className="reveal font-syne text-[11px] tracking-[0.4em] uppercase text-[#b8953f] mb-8">Ready to begin?</p>
        <h2 className="reveal text-5xl md:text-[6vw] font-light leading-none mb-12">
          Explore the<br /><em className="italic text-[#d4c9a8]">Collection</em>
        </h2>
        <Link href="/products" className="reveal inline-block px-12 py-5 border border-[#b8953f] text-[#f0ebe0] font-syne text-[12px] tracking-[0.25em] uppercase relative group overflow-hidden transition-colors hover:text-[#0f0d0a]">
          <span className="absolute inset-0 bg-[#b8953f] translate-x-[-101%] transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10">View All Products</span>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left opacity-30 hover:opacity-100 transition-opacity">
        <p className="font-syne text-[11px] tracking-widest text-white/30">© 2026 Amanita Sale. Crafted for the enlightened.</p>
        <p className="text-sm italic text-white/30">Ancient wisdom, modern standards.</p>
        <div className="flex items-center gap-2 font-syne text-[11px] tracking-widest text-white/30">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3dba6b] animate-pulse" />
          Global Operations Active
        </div>
      </footer>
    </div>
  );
}
