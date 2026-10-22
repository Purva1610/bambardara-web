import React, { useState } from 'react';
import { FaChevronRight, FaTimes, FaArrowRight } from 'react-icons/fa';

export default function RopeCourseHero({
  onExploreClick,
  headlineLine1 = 'High Canopy',
  headlineLine2 = 'Rope Course Adventure',
  cardWord1 = 'Aerial',
  cardLine1Rest = 'Obstacle Challenge',
  cardWord2 = 'Suspended',
  cardLine2Rest = 'Across Ancient',
  cardLine3 = 'Sahyadri Canopies',
  cardDescription = 'Test your balance, agility, and courage across suspended Burma bridges, swinging logs, and high cargo nets — secured with certified continuous safety lifelines.',
  cardButtonText = 'EXPLORE CANOPY CIRCUITS',
  bottomTicker = 'Certified Dual Continuous Lifelines • 4 Skill Circuits • Expert Forest Guides',
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('rope-course-circuits');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="rope-course-hero"
      className="relative w-full min-h-[720px] md:min-h-[840px] lg:h-screen lg:min-h-[800px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-deep-forest select-none text-white font-body"
    >
      {/* ── HIGH DEFINITION ROPE COURSE ADVENTURE BACKDROP ── */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          media="(max-width: 640px)"
          srcSet={`${process.env.PUBLIC_URL}/images/opt/rope-course-hero-640.webp`}
          type="image/webp"
        />
        <source
          media="(max-width: 1280px)"
          srcSet={`${process.env.PUBLIC_URL}/images/opt/rope-course-hero-1280.webp`}
          type="image/webp"
        />
        <source
          srcSet={`${process.env.PUBLIC_URL}/images/opt/rope-course-hero-1920.webp`}
          type="image/webp"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/rope-course-hero-1920.jpg`}
          alt="Adventurer Traversing Suspended Tree Canopy Rope Course at Bambarddara"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {/* ── ATMOSPHERIC SCENE GRADIENTS (Enhances contrast across sky & canopy) ── */}
      {/* Top Header Scrim */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6, 32, 24, 0.65) 0%, rgba(6, 32, 24, 0.25) 50%, transparent 100%)',
        }}
      />
      {/* Bottom Vignette for Crisp Headline Legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-80 sm:h-96 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6, 32, 24, 0.92) 0%, rgba(6, 32, 24, 0.55) 50%, transparent 100%)',
        }}
      />


      {/* ── MAIN CONTENT LAYER ── */}
      <div className="relative z-20 w-full h-full flex-1 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-20 sm:pb-24 lg:pb-28">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-12">
          {/* ── EXACT FROSTED GLASSMORPHIC CARD (Left side) ── */}
          <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[28px] border border-white/25 bg-black/40 sm:bg-deep-forest/45 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-luxury-gold/50">
            {/* Top Left Minimalist Circular Emblem */}
            <div className="w-7 h-7 mb-6 sm:mb-8 text-white">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-white"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm2 6a4 4 0 1 1-4 4 4 4 0 0 1 4-4Z"
                />
              </svg>
            </div>

            {/* Editorial Heading */}
            <h2 className="font-heading text-white text-lg sm:text-[21px] leading-[1.3] tracking-tight mb-4 select-none">
              <span className="font-bold text-white">{cardWord1}</span>{' '}
              <span className="font-normal text-white/90">{cardLine1Rest}</span>
              <br />
              <span className="font-bold text-white">{cardWord2}</span>{' '}
              <span className="font-normal text-white/90">{cardLine2Rest}</span>
              <br />
              <span className="font-bold text-white">{cardLine3}</span>
            </h2>

            {/* Left Vertical Line + Description Paragraph */}
            <div className="flex items-stretch gap-3 mb-6">
              <div className="w-[1.5px] bg-luxury-gold/60 shrink-0 rounded-full my-0.5" />
              <p className="font-body text-[11px] sm:text-[12px] text-white/80 font-light leading-relaxed select-none">
                {cardDescription}
              </p>
            </div>

            {/* Pill Action Button */}
            <button
              type="button"
              onClick={handleExploreClick}
              className="inline-flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full border border-white/40 hover:border-luxury-gold bg-black/15 hover:bg-white/10 backdrop-blur-md transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
            >
              <span className="w-7 h-7 rounded-full bg-ivory-white text-dark-charcoal flex items-center justify-center text-xs shadow-md group-hover:scale-105 transition-transform shrink-0">
                <FaChevronRight className="text-[9px] text-dark-charcoal group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="font-body text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white group-hover:text-luxury-gold transition-colors">
                {cardButtonText}
              </span>
            </button>
          </div>

          {/* ── GIANT MODERN DISPLAY HEADLINE (Bottom Right / Center) ── */}
          <div className="flex-1 w-full text-left lg:text-right select-none pb-1">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-normal leading-[1.04] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <span className="block font-semibold">{headlineLine1}</span>
              <span className="block font-light italic text-white/95">{headlineLine2}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── BOTTOM DIVIDER LINE & STATUS TICKER ── */}
      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-xs text-white/80 pb-3 select-none">
            {/* Left Ticker Text */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span className="font-body tracking-wide text-xs sm:text-sm font-light text-white/90">
                {bottomTicker}
              </span>
            </div>

            {/* Right Interactive Navigation Pill */}
            <button
              type="button"
              onClick={handleExploreClick}
              className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wider uppercase text-white/85 hover:text-luxury-gold transition-colors cursor-pointer group"
            >
              <span>Explore Rope Course</span>
              <span className="w-6 h-6 rounded-full border border-white/40 group-hover:border-luxury-gold flex items-center justify-center transition-colors">
                <FaArrowRight className="text-[9px] text-luxury-gold group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Continuous Ultra-Thin White Line */}
          <div className="w-full h-[1px] bg-white/25" />
        </div>
      </div>

      {/* ── FULLSCREEN VIDEO PREVIEW MODAL ── */}
      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-deep-forest border border-luxury-gold/30 overflow-hidden shadow-2xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-pulse" />
                <span className="font-heading font-bold uppercase tracking-wider text-sm text-white">
                  Bambarddara Tree Canopy Rope Course • Obstacle Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video preview"
                className="text-white/70 hover:text-white text-lg p-1 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-[#062018]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Bambarddara Tree Canopy Rope Course Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
