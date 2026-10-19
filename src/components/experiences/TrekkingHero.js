import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function TrekkingHero() {

  return (
    <section
      id="trekking-hero"
      className="relative w-full min-h-[720px] md:min-h-[820px] lg:h-screen lg:min-h-[780px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-[#0c1611] select-none pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12"
    >
      {/* ── HIGH DEFINITION TREKKING HERO BACKGROUND ── */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          srcSet={`${process.env.PUBLIC_URL}/images/opt/treking-hero.webp`}
          type="image/webp"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/treking-hero.jpg`}
          alt="Trekkers hiking through scenic lush green forest trail"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {/* ── AMBIENT CONTRAST GRADIENTS (Matching reference image lighting) ── */}
      {/* Subtle top nav protection */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8, 18, 14, 0.6) 0%, rgba(8, 18, 14, 0.2) 60%, transparent 100%)',
        }}
      />
      {/* Bottom shadow for clean stats contrast */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6, 14, 10, 0.85) 0%, rgba(6, 14, 10, 0.3) 60%, transparent 100%)',
        }}
      />

      {/* ── TOP HERO CONTENT: INTRO PILL + GIANT DISPLAY HEADLINE ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-2 sm:pt-6">
        <div className="max-w-2xl flex flex-col items-start text-left">
          
          {/* Small Intro Block + Pill Button (Matching Reference Exactly) */}
          <div className="mb-4 sm:mb-6 flex flex-col items-start">
            <span className="font-body text-xs sm:text-[0.82rem] text-white/80 font-normal leading-relaxed max-w-[200px]">
              Let's get to know each other better
            </span>
            <a
              href="#community"
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/25 bg-black/20 hover:bg-white/15 hover:border-white/50 backdrop-blur-xs font-body text-[0.72rem] sm:text-xs text-white/90 transition-all duration-200"
            >
              <span>About Community</span>
              <FiArrowRight size={12} />
            </a>
          </div>

          {/* Main Giant Headline: WHERE EVERY STEP EARNS THE VIEW */}
          <h1 className="font-heading font-medium text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] leading-[0.93] uppercase tracking-[0.02em] drop-shadow-xl select-none">
            WHERE EVERY<br />
            STEP EARNS<br />
            THE VIEW
          </h1>

        </div>
      </div>

      {/* ── BOTTOM ROW: 3 STATS COLUMNS (LEFT) + CHAT BUBBLE & ONLINE STATUS (RIGHT) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-2">
          
          {/* Bottom Left Stats */}
          <div className="max-w-md w-full">
            {/* Fine horizontal divider line */}
            <div className="w-full max-w-sm sm:max-w-md h-px bg-white/25 mb-4 sm:mb-5" />
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {/* Stat 1: 40+ Directions */}
              <div>
                <span className="font-heading font-normal text-3xl sm:text-4xl md:text-[2.75rem] text-white leading-none block">
                  40+
                </span>
                <span className="font-body text-[0.72rem] sm:text-xs text-white/75 font-normal block mt-1.5">
                  Directions
                </span>
              </div>

              {/* Stat 2: 21 Top-guides */}
              <div>
                <span className="font-heading font-normal text-3xl sm:text-4xl md:text-[2.75rem] text-white leading-none block">
                  21
                </span>
                <span className="font-body text-[0.72rem] sm:text-xs text-white/75 font-normal block mt-1.5">
                  Top-guides
                </span>
              </div>

              {/* Stat 3: 4.8/5 ★ Google Score */}
              <div>
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="font-heading font-normal text-3xl sm:text-4xl md:text-[2.75rem] text-white">
                    4.8/5
                  </span>
                  <span className="text-[#facc15] text-lg sm:text-xl font-bold">
                    ★
                  </span>
                </div>
                <span className="font-body text-[0.72rem] sm:text-xs text-white/75 font-normal block mt-1.5">
                  Google Score
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
