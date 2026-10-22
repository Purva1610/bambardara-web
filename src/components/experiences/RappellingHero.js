import React, { useState } from 'react';
import { FaTimes, FaArrowRight } from 'react-icons/fa';

export default function RappellingHero({
  onExploreClick,
  tagline = 'READ MORE',
  titleLine1 = 'Featured Rappelling',
  titleLine2 = 'Cliff Rappelling',
  skyText = 'Rappelling',
  descText = 'Descend sheer basalt rock faces in the Western Ghats with certified IMF mountaineering guides and dual-line safety belays.',
  cardTitle = '100ft Basalt Descent',
  cardDesc = 'Controlled dual-line UIAA safety belays and certified rigging for all skill levels.',
  cardCta = 'READ ARTICLE',
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleRouteScroll = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('rappelling-routes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="rappelling-hero"
      className="relative w-full min-h-[760px] md:min-h-[860px] lg:h-screen lg:min-h-[820px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-deep-forest select-none text-white font-body"
    >
      {/* ── HIGH DEFINITION MOUNTAIN / RAPPELLING VIDEO BACKDROP ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={`${process.env.PUBLIC_URL}/images/opt/rappelling-ref-1920.webp`}
          className="w-full h-full object-cover object-center select-none"
        >
          <source
            src={`${process.env.PUBLIC_URL}/videos/rappelling-web.mp4`}
            type="video/mp4"
          />
          <picture className="w-full h-full">
            <source
              srcSet={`${process.env.PUBLIC_URL}/images/opt/rappelling-ref-1920.webp`}
              type="image/webp"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/opt/rappelling-ref-1920.webp`}
              alt="Adventurers on Alpine Mountain Ridge with Towering Peak and Deep Sky"
              className="w-full h-full object-cover object-center select-none"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </video>
      </div>

      {/* ── BLACK OVERLAY ── */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-[1]" />

      {/* ── ATMOSPHERIC GRADIENT OVERLAYS (Preserves exact reference mood) ── */}
      {/* Top subtle nav scrim */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6, 32, 24, 0.75) 0%, rgba(6, 32, 24, 0.25) 55%, transparent 100%)',
        }}
      />
      {/* Bottom vignette for card contrast */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to top, rgba(6, 32, 24, 0.88) 0%, rgba(6, 32, 24, 0.35) 60%, transparent 100%)',
        }}
      />

      {/* ── GIANT OUTLINE TYPOGRAPHY ACROSS THE SKY ("Adventure") ── */}
      <div className="absolute top-[10%] sm:top-[12%] md:top-[13%] left-6 sm:left-12 lg:left-20 pointer-events-none select-none z-10">
        <span
          className="font-heading font-extrabold uppercase text-[76px] sm:text-[110px] md:text-[150px] lg:text-[180px] xl:text-[210px] leading-none tracking-wide text-transparent block"
          style={{
            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.24)',
            letterSpacing: '0.04em',
          }}
        >
          {skyText}
        </span>
      </div>

      {/* ── LEFT-SIDE EDITORIAL DESCRIPTION PARAGRAPH ── */}
      <div className="absolute left-6 sm:left-12 lg:left-20 top-[57%] sm:top-[58%] md:top-[60%] z-20 max-w-[270px] sm:max-w-sm select-none">
        <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed font-light drop-shadow-md">
          {descText}
        </p>
      </div>

      {/* ── BOTTOM-LEFT FLOATING CIRCULAR FEATURE CARD ── */}
      <div className="absolute left-6 sm:left-12 lg:left-20 bottom-8 sm:bottom-12 z-20 flex items-center gap-4 sm:gap-5 select-none">
        {/* Exact Circular Thumbnail from Reference (Extracted with Sharp) */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-luxury-gold shadow-2xl shrink-0 bg-black/40">
          <picture>
            <source
              srcSet={`${process.env.PUBLIC_URL}/images/opt/rappelling-article-thumb.webp`}
              type="image/webp"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/opt/rappelling-article-thumb.png`}
              alt="Hiker viewing mountain peak"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Card Copy + Action Link */}
        <div className="flex flex-col text-left">
          <h2 className="font-heading font-bold text-base sm:text-xl text-white uppercase tracking-wider leading-tight drop-shadow">
            {cardTitle}
          </h2>
          <p className="font-body text-[11px] sm:text-xs text-white/80 leading-snug max-w-[230px] sm:max-w-[280px] mt-1 font-light drop-shadow">
            {cardDesc}
          </p>
          <button
            type="button"
            onClick={handleRouteScroll}
            className="mt-2 text-[10px] sm:text-xs uppercase font-body font-bold tracking-widest text-luxury-gold hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 self-start group"
          >
            <span>{cardCta}</span>
            <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* ── FULLSCREEN VIDEO TOUR MODAL ── */}
      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-deep-forest border border-white/20 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-green animate-pulse" />
                <span className="font-body font-bold uppercase tracking-wider text-sm text-white">
                  Bambarddara Rappelling • Experience Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video modal"
                className="text-white/70 hover:text-white text-lg p-1 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Video Player / Presentation Frame */}
            <div className="relative aspect-video w-full bg-[#062018] flex items-center justify-center overflow-hidden">
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                poster={`${process.env.PUBLIC_URL}/images/opt/rappelling-ref-1920.webp`}
              >
                <source
                  src={`${process.env.PUBLIC_URL}/videos/rappelling-web.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
