import React from 'react';

export default function CyclingHero() {
  const handleScrollToReserve = (e) => {
    if (e) e.preventDefault();
    const el =
      document.getElementById('reserve') ||
      document.getElementById('trails') ||
      document.getElementById('why-we-ride');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cycling-hero"
      className="relative w-full bg-[#0d1611] text-white overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-10 md:pb-12 px-3 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* ── Framed Sanctuary Card with Warm Golden/Beige Rounded Border ── */}
        <div className="relative w-full min-h-[560px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] rounded-[24px] sm:rounded-[32px] md:rounded-[38px] overflow-hidden border-[1.5px] border-[#d8c49d]/60 shadow-[0_24px_70px_rgba(0,0,0,0.5)] flex items-center">
          {/* ── Background: Cycling Hero Image ── */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <img
              src={`${process.env.PUBLIC_URL}/images/opt/cycling-hero.jpg`}
              alt="Mountain cycling at Bambardara Estate"
              className="w-full h-full object-cover object-[center_35%] md:object-center transform scale-[1.01]"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* ── Ambient Contrast Overlays (Matching Reference Lighting) ── */}
          {/* Left-side directional dark gradient for razor-sharp typography readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(10, 18, 13, 0.85) 0%, rgba(10, 18, 13, 0.68) 28%, rgba(10, 18, 13, 0.32) 55%, transparent 100%)',
            }}
          />
          {/* Subtle top & bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(6, 12, 9, 0.35) 0%, transparent 30%, transparent 70%, rgba(6, 12, 9, 0.45) 100%)',
            }}
          />

          {/* ── Left Content (Exact Reference Layout & Typography) ── */}
          <div className="relative z-20 w-full flex flex-col justify-center items-start text-left px-7 sm:px-14 md:px-20 lg:px-24 py-12 sm:py-16">
            {/* Main Headline: "Find and ride your sanctuary." */}
            <h1
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-normal text-white leading-[1.08] tracking-[-0.015em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] max-w-xl"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Find and ride your
              <br />
              sanctuary.
            </h1>

            {/* Subheading / Philosophy Paragraph */}
            <p
              className="font-serif text-white/95 text-base sm:text-lg md:text-[19px] font-light leading-relaxed max-w-sm sm:max-w-md mt-5 sm:mt-7 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              A ride shaped by vision, rooted in purpose, and nurtured with the wisdom to bring it to life.
            </p>

            {/* CTA Button: "BOOK YOUR RIDE WITH US" */}
            <div className="mt-7 sm:mt-9">
              <a
                href="#reserve"
                onClick={handleScrollToReserve}
                className="inline-block bg-ivory-white hover:bg-forest-green text-[#1a1916] hover:text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-[3px] text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                BOOK YOUR RIDE WITH US
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
