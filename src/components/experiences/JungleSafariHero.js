import React from 'react';

export default function JungleSafariHero({ onExploreClick }) {
  const handleScrollDown = (e) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const target = document.getElementById('safari-overview') || document.getElementById('about-safari');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="jungle-safari-hero"
      className="relative w-full h-screen min-h-[660px] max-h-[1080px] flex flex-col justify-between items-center overflow-hidden select-none bg-[#1a1612] pt-20 sm:pt-24 md:pt-28"
    >
      {/* ── BACKGROUND IMAGE: D:\bam\bambardara-web\public\images\opt\jungle-hero.jpg ── */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          srcSet={`${process.env.PUBLIC_URL}/images/opt/jungle-hero.webp`}
          type="image/webp"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/jungle-hero.jpg`}
          alt="Majestic Lion Sanctuary at Bambardara Jungle Safari"
          className="w-full h-full object-cover object-center select-none"
          fetchPriority="high"
          loading="eager"
        />
      </picture>

      {/* ── CINEMATIC WARM ATMOSPHERIC OVERLAYS ── */}
      {/* Top subtle fade for global header contrast */}
      <div
        className="absolute inset-x-0 top-0 h-44 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12, 10, 8, 0.75) 0%, rgba(12, 10, 8, 0.3) 55%, transparent 100%)',
        }}
      />
      {/* Soft center radial wash to make white serif text glow crisply */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(15, 12, 8, 0.22) 0%, rgba(10, 8, 6, 0.45) 100%)',
        }}
      />
      {/* Bottom atmospheric shadow for seamless transition into the overview section */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(15, 12, 8, 0.9) 0%, rgba(15, 12, 8, 0.25) 55%, transparent 100%)',
        }}
      />

      {/* ── CENTER HERO CONTENT: EXACT TYPOGRAPHY & COMPOSITION ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center my-auto">
        {/* Eyebrow Subheading */}
        <p className="font-body text-xs sm:text-sm md:text-base font-normal tracking-[0.16em] sm:tracking-[0.24em] text-white/95 uppercase drop-shadow-md">
          Welcome to Bambarddara Tours and Safaris
        </p>

        {/* Big Classic Serif Headline */}
        <h1 className="mt-2.5 sm:mt-3.5 font-serif font-normal text-white text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.3rem] xl:text-[6rem] leading-[1.05] sm:leading-[0.98] tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
          Experience the Wild<br />
          Heart of Bambarddara.
        </h1>

        {/* ── CIRCULAR DOWN-ARROW BUTTON (Exact Reference) ── */}
        <a
          href="#safari-overview"
          onClick={handleScrollDown}
          aria-label="Scroll to safari details"
          className="mt-6 sm:mt-8 md:mt-10 group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/70 hover:border-white bg-black/10 hover:bg-white/15 backdrop-blur-xs flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-xl"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-5-5m5 5l5-5" />
          </svg>
        </a>
      </div>

      {/* ── BOTTOM BAR: ESTATE SUBTITLE & RESERVE STATS ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-5 sm:pb-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/75 font-body text-[0.7rem] sm:text-[0.75rem]">
        {/* Subtle Estate Note */}
        <span className="tracking-widest uppercase text-white/70 text-[0.68rem] sm:text-[0.75rem] font-medium">
          BAMBARDARA ESTATE • WILDLIFE RESERVE
        </span>

        <div className="flex items-center gap-4 text-white/60 text-xs">
          <span className="tracking-wider uppercase">Open Jeep Safari</span>
          <span>•</span>
          <span className="tracking-wider uppercase">Wildlife Trails</span>
        </div>
      </div>
    </section>
  );
}
