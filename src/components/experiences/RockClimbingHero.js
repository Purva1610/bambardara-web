import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const PITCH_ROUTES = [
  {
    year: '2025©',
    pitch: 'PITCH 01',
    name: 'The Overhang Roof Ascent',
    grade: 'Grade 6B+ • 35m',
    location: 'Sahyadri Escarpment',
    coords: '17°04\'N 73°48\'E',
    pattern: '01 / 04',
    bg: '/images/opt/rock-climbing-hero-1920.jpg',
    webp: '/images/opt/rock-climbing-hero-1920.webp',
  },
  {
    year: '2025©',
    pitch: 'PITCH 02',
    name: 'Granite Monolith Vertical Face',
    grade: 'Grade 5C • 25m',
    location: 'Kadavi Gorge Crag',
    coords: '17°05\'N 73°49\'E',
    pattern: '02 / 04',
    bg: '/images/opt/rock-climbing-3-1280.jpg',
    webp: '/images/opt/rock-climbing-3-1920.webp',
  },
  {
    year: '2025©',
    pitch: 'PITCH 03',
    name: 'Forest Bouldering Circuit',
    grade: 'V1 - V4 • 8m',
    location: 'Bambarddara Rainforest',
    coords: '17°03\'N 73°47\'E',
    pattern: '03 / 04',
    bg: '/images/opt/rock-climbing-2-1280.jpg',
    webp: '/images/opt/rock-climbing-2-1920.webp',
  },
  {
    year: '2025©',
    pitch: 'PITCH 04',
    name: 'Sahyadri Ridge Multi-Pitch',
    grade: 'Grade 6A • 60m',
    location: 'Summit Pinnacle View',
    coords: '17°06\'N 73°50\'E',
    pattern: '04 / 04',
    bg: '/images/opt/rock-climbing-hero-1280.jpg',
    webp: '/images/opt/rock-climbing-hero-1280.webp',
  },
];

export default function RockClimbingHero({ onExploreClick }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeRoute = PITCH_ROUTES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? PITCH_ROUTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === PITCH_ROUTES.length - 1 ? 0 : prev + 1));
  };

  const handleMainCTA = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('climbing-routes') || document.getElementById('rock-climbing-about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0d0a0d] text-white overflow-hidden select-none flex flex-col justify-between">
      {/* ── Layer 1: Background Climber & Mountain Landscape ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ease-out">
        <picture>
          <source srcSet={activeRoute.webp} type="image/webp" />
          <img
            src={activeRoute.bg}
            alt="Rock Climbing Landscape"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] saturate-[1.12]"
            loading="eager"
          />
        </picture>
      </div>

      {/* ── Layer 2: Atmospheric Sunset / Surreal Twilight Cloud Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 36%, rgba(248, 113, 113, 0.45) 0%, rgba(251, 146, 60, 0.3) 35%, rgba(192, 132, 252, 0.18) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(10, 8, 12, 0.75) 85%, rgba(8, 6, 10, 0.95) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12, 9, 14, 0.8) 0%, rgba(12, 9, 14, 0.15) 30%, rgba(12, 9, 14, 0.1) 60%, rgba(8, 6, 10, 0.92) 100%)',
        }}
      />

      {/* ── Layer 3: Organic Cave / Natural Rock Overhang Perimeter Silhouette ── */}
      {/* Top Stalactite Cave Ceiling Framing */}
      <svg
        className="absolute top-0 inset-x-0 w-full h-24 sm:h-36 md:h-44 pointer-events-none z-10 text-[#0c090d]"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,0 L1440,0 L1440,42 Q1380,85 1320,54 Q1250,110 1180,68 Q1110,135 1030,82 Q960,115 890,62 Q820,132 750,75 Q680,128 610,65 Q540,118 470,72 Q390,140 310,68 Q240,112 170,55 Q90,95 0,48 Z" />
        <path
          d="M0,0 L1440,0 L1440,24 Q1350,60 1260,32 Q1170,78 1080,42 Q990,85 900,38 Q810,92 720,48 Q630,88 540,36 Q450,82 360,40 Q270,74 180,32 Q90,58 0,26 Z"
          opacity="0.6"
        />
      </svg>

      {/* Left Craggy Rock Cavern Edge */}
      <svg
        className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-44 h-full pointer-events-none z-10 text-[#0c090d]"
        viewBox="0 0 180 900"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,0 L65,0 Q120,80 75,160 Q145,240 85,330 Q160,420 95,510 Q140,610 80,720 Q125,810 60,900 L0,900 Z" />
      </svg>

      {/* Right Craggy Rock Cavern Edge */}
      <svg
        className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-44 h-full pointer-events-none z-10 text-[#0c090d]"
        viewBox="0 0 180 900"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M180,0 L115,0 Q60,80 105,160 Q35,240 95,330 Q20,420 85,510 Q40,610 100,720 Q55,810 120,900 L180,900 Z" />
      </svg>

      {/* ── Layer 4: Top Spacer & Clearance for Global Site Header ── */}
      <div className="w-full pt-28 sm:pt-32 md:pt-36" />

      {/* ── Top Center Headline (Exact Reference Typography) ── */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center px-6 text-center select-none">
        <h1
          className="font-heading font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white tracking-[-0.02em] leading-[0.98] drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)] max-w-4xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Speaks Softly
          <br />
          Lasts Boldly
        </h1>
      </div>

      {/* ── Floating Widgets Area (Top Left & Top Right with Leader Lines) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mt-6 sm:mt-8 md:mt-12 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-between">
          
          {/* ── Top-Left Callout Card with Geometric Leader Line ── */}
          <div className="relative flex flex-col items-start pointer-events-auto">
            <div className="relative bg-black/40 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-none shadow-[0_8px_32px_rgba(0,0,0,0.6)] min-w-[190px] sm:min-w-[220px]">
              <p className="font-sans text-[11px] sm:text-xs font-semibold text-white/95 uppercase tracking-wider">
                Ascent That Speaks
              </p>
              <p className="font-sans text-[10px] sm:text-[11px] text-white/65 mt-1 font-light leading-tight">
                Scale Ancient Basalt Monoliths
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMainCTA}
                  aria-label="View climbing pitch"
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 border border-white/35 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                >
                  <FaPlus className="text-[10px]" />
                </button>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold/90 font-medium">
                  {activeRoute.pitch}
                </span>
              </div>
            </div>

            {/* Delicate Connecting Leader Line + Glowing Anchor Node */}
            <div className="hidden lg:block absolute left-full top-8 pointer-events-none">
              <svg width="150" height="70" className="overflow-visible">
                {/* Horizontal branch, angled step down */}
                <path
                  d="M 0 10 L 60 10 L 105 45"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1"
                />
                {/* Glowing Circular Anchor Node */}
                <circle cx="105" cy="45" r="4.5" fill="#ffffff" />
                <circle cx="105" cy="45" r="9" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* ── Top-Right Social Proof / Testimonials Card with Leader Line ── */}
          <div className="relative flex flex-col items-start md:items-end pointer-events-auto">
            <div className="relative bg-black/40 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-none shadow-[0_8px_32px_rgba(0,0,0,0.6)] min-w-[210px] sm:min-w-[240px]">
              <p className="font-sans text-[11px] sm:text-xs font-semibold text-white/95 uppercase tracking-wider">
                What people say?
              </p>
              <p className="font-sans text-[10px] sm:text-[11px] text-white/65 mt-1 font-light leading-tight">
                Built to inspire, designed to endure
              </p>
              
              {/* Overlapping Member Avatars */}
              <div className="mt-3 flex items-center -space-x-2">
                <img
                  src="/images/opt/rock-climbing-hero-640.jpg"
                  alt="Climber 1"
                  className="w-7 h-7 rounded-full object-cover border-2 border-dark-charcoal"
                />
                <img
                  src="/images/opt/rock-climbing-about-climber.png"
                  alt="Climber 2"
                  className="w-7 h-7 rounded-full object-cover border-2 border-dark-charcoal bg-forest-green"
                />
                <img
                  src="/images/opt/rock-climbing-hero-1280.jpg"
                  alt="Climber 3"
                  className="w-7 h-7 rounded-full object-cover border-2 border-dark-charcoal"
                />
                <span className="pl-3 text-[10px] tracking-wider text-white/70 font-mono">
                  4.9★ / 120+
                </span>
              </div>
            </div>

            {/* Delicate Connecting Leader Line + Glowing Anchor Node */}
            <div className="hidden lg:block absolute right-full top-8 pointer-events-none">
              <svg width="150" height="70" className="overflow-visible" style={{ transform: 'scaleX(-1)' }}>
                <path
                  d="M 0 10 L 55 10 L 95 42"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1"
                />
                <circle cx="95" cy="42" r="4.5" fill="#ffffff" />
                <circle cx="95" cy="42" r="9" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* ── Layer 5: Center Horizontal Axis & Circular Arrow CTA Button ── */}
      <div className="relative z-30 w-full my-auto py-10 sm:py-14">
        {/* Crisp Horizontal Hairline across section */}
        <div className="relative w-full flex items-center">
          <div className="w-full border-t border-white/25" />

          {/* Left Metadata on Hairline */}
          <div className="absolute left-6 sm:left-12 lg:left-24 flex items-center gap-4 sm:gap-6 text-xs text-white/75 font-mono pointer-events-auto">
            <span className="tracking-widest uppercase">{activeRoute.year}</span>
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors duration-200 cursor-pointer text-white/90 font-sans text-xs tracking-wider uppercase"
            >
              <span>&lt; Previous</span>
            </button>
            <span className="w-2 h-2 rounded-full bg-ivory-white shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Dead Center: Prominent Circular White Arrow Button */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
            <button
              type="button"
              onClick={handleMainCTA}
              aria-label="Explore climbing circuits"
              className="group relative w-16 h-16 sm:w-20 sm:h-20 bg-ivory-white hover:bg-luxury-gold text-dark-charcoal hover:text-white rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer z-40"
            >
              {/* Bold Diagonal Arrow ↗ */}
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>

            {/* Trajectory Dotted Curved Arc beneath Center Button */}
            <div className="absolute top-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] md:w-[560px] h-[100px] sm:h-[130px] border-b border-dashed border-white/40 rounded-b-[100%] pointer-events-none -z-10" />
          </div>

          {/* Right Metadata on Hairline */}
          <div className="absolute right-6 sm:right-12 lg:right-24 flex items-center gap-4 sm:gap-6 text-xs text-white/75 font-mono pointer-events-auto">
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 hover:text-luxury-gold transition-colors duration-200 cursor-pointer text-white/90 font-sans text-xs tracking-wider uppercase"
            >
              <span>Next &gt;</span>
            </button>
            <span className="w-2 h-2 rounded-full bg-ivory-white shadow-[0_0_8px_#ffffff]" />
            <span className="hidden sm:inline-block tracking-widest uppercase text-white/60">
              {activeRoute.location}
            </span>
          </div>
        </div>
      </div>

      {/* ── Layer 6: Bottom Grid, Editorial Statement & Signature Footer ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end justify-between">
          
          {/* ── Bottom-Left: Technical Blueprint Matrix Grid Widget ── */}
          <div className="md:col-span-3 flex flex-col items-start select-none">
            {/* 4x4 Coordinate Blueprint Grid with Checkered Blocks */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 border border-white/25 grid grid-cols-4 grid-rows-4 bg-black/25 backdrop-blur-sm">
              {/* Grid cell lines */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border-r border-b border-white/15" />
                ))}
              </div>

              {/* Exact L-Pattern Checkered Filled White Blocks from Reference */}
              {/* Row 2, Col 2 */}
              <div
                className="col-start-2 row-start-2 bg-white/90 shadow-sm"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                }}
              />
              {/* Row 3, Col 2 */}
              <div
                className="col-start-2 row-start-3 bg-white/90 shadow-sm"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                }}
              />
              {/* Row 3, Col 3 */}
              <div
                className="col-start-3 row-start-3 bg-white/90 shadow-sm"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                }}
              />
            </div>

            <div className="mt-2.5 flex items-center gap-2 text-[10px] tracking-widest text-white/60 font-mono uppercase">
              <span>Pattern</span>
              <span>•</span>
              <span className="text-white/80">{activeRoute.coords}</span>
            </div>
          </div>

          {/* ── Bottom-Center: Editorial Philosophy Copy ── */}
          <div className="md:col-span-6 flex flex-col items-center text-center px-2 sm:px-6">
            <p className="text-white/80 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-lg tracking-normal">
              We craft ascents and vertical experiences that don't just look beautiful, they endure. Every pitch, every foothold, designed to echo long after the descent.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Link
                to="/enquire"
                className="text-[11px] uppercase tracking-widest text-luxury-gold hover:text-white underline underline-offset-4 font-semibold transition-colors duration-200"
              >
                Book This Route Session
              </Link>
              <span className="text-white/30">•</span>
              <span className="text-[11px] uppercase tracking-wider text-white/50">
                {activeRoute.grade}
              </span>
            </div>
          </div>

          {/* ── Bottom-Right: Kicker Statement & Handwritten Signature ── */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right select-none">
            <p className="font-sans text-[11px] sm:text-xs text-white/70 max-w-[220px] leading-snug">
              Creating routes for the future of mountain exploration
            </p>

            {/* Handwritten Signature SVG Graphic (Exact stylized flow from reference) */}
            <div className="mt-2 text-white/90 w-36 sm:w-44 h-12 flex items-center justify-end">
              <svg
                viewBox="0 0 200 65"
                className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Stylized cursive signature path replicating the reference */}
                <path d="M 20 52 C 22 28, 28 8, 38 10 C 44 12, 34 50, 48 48 C 58 45, 62 26, 70 30 C 76 34, 68 52, 82 46 C 92 42, 98 28, 106 32 C 114 36, 110 50, 122 44 C 134 38, 142 22, 154 36 C 160 42, 168 44, 185 38" />
                <path d="M 32 30 C 50 26, 85 24, 120 22" strokeWidth="1.4" opacity="0.7" />
                <path d="M 65 52 C 85 54, 125 50, 155 46" strokeWidth="1.2" opacity="0.6" />
              </svg>
            </div>
            <span className="text-[9px] tracking-widest uppercase text-white/40 font-mono -mt-1">
              Founder &amp; Lead Mountaineer
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
