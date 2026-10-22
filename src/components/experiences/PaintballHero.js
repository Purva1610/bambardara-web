import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function PaintballHero() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setVideoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavScroll = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="paintball-hero"
      className="relative w-full min-h-[620px] md:min-h-[700px] lg:h-[92vh] lg:min-h-[740px] max-h-[1000px] flex flex-col justify-center overflow-hidden bg-[#0c0d12] select-none pt-24 sm:pt-28 md:pt-32"
    >
      {/* ── BACKGROUND IMAGE: D:\bam\bambardara-web\public\images\opt\paintball-action-hero.webp ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <picture className="block w-full h-full">
          <source
            srcSet={`${process.env.PUBLIC_URL}/images/opt/paintball-action-hero.webp?v=2`}
            type="image/webp"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/opt/paintball-action-hero.jpg?v=2`}
            alt="Paintball Arena Warzone at Bambardara Estate"
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* ── ATMOSPHERIC GRADIENTS FOR OPTIMAL READABILITY & VIBRANT ACTION ── */}
      {/* Top subtle dark gradient for global site header visibility */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 11, 16, 0.65) 0%, rgba(10, 11, 16, 0.2) 60%, transparent 100%)',
        }}
      />
      {/* Right side vignette to make white & green typography pop while keeping players crystal clear */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-3/5 lg:w-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, rgba(10, 11, 16, 0.62) 0%, rgba(10, 11, 16, 0.32) 50%, rgba(10, 11, 16, 0.05) 85%, transparent 100%)',
        }}
      />
      {/* Bottom fade for smooth transition to the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10, 11, 16, 0.75) 0%, rgba(10, 11, 16, 0.2) 50%, transparent 100%)',
        }}
      />

      {/* ── CENTER / RIGHT HERO MAIN CONTENT (Matching Reference Image) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center pb-12 sm:pb-16 md:pb-20">
        <div className="w-full flex justify-end">
          <div className="w-full md:w-[62%] lg:w-[54%] xl:w-[48%] flex flex-col items-start text-left">
            
            {/* Big Headline: STEP INTO THE ARENA */}
            <h1 className="font-heading font-medium text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] leading-[0.96] uppercase tracking-tight drop-shadow-2xl">
              STEP INTO THE <span className="text-luxury-gold">ARENA</span>
            </h1>

            {/* White Ribbon Tag: GO WILD IN OUR 79 ACRES FOREST */}
            <div className="mt-3.5 sm:mt-4 bg-ivory-white text-black font-body font-bold text-[0.68rem] sm:text-[0.78rem] md:text-[0.85rem] tracking-[0.24em] sm:tracking-[0.28em] px-3.5 sm:px-5 py-1.5 sm:py-2 uppercase shadow-xl inline-flex items-center select-all">
              GO WILD IN OUR 79 ACRES FOREST
            </div>

            {/* Action Buttons: BOOK TODAY & GET T-SHIRTS */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4 font-body">
              <a
                href="#reserve"
                onClick={handleNavScroll('reserve')}
                className="inline-flex items-center justify-center bg-luxury-gold hover:bg-rich-gold text-dark-charcoal font-bold uppercase text-xs sm:text-[0.82rem] tracking-wider px-7 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg shadow-luxury-gold/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                BOOK TODAY
              </a>
              <a
                href="#paintball-club-info"
                onClick={handleNavScroll('paintball-club-info')}
                className="inline-flex items-center justify-center border border-white/80 hover:border-white hover:bg-white/10 text-white font-bold uppercase text-xs sm:text-[0.82rem] tracking-wider px-7 sm:px-8 py-2.5 sm:py-3 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                GET T-SHIRTS
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── VIDEO TRAILER MODAL ── */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Paintball Arena Cinematic Trailer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-dark-charcoal border border-white/20 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40">
              <span className="font-heading text-base tracking-wider text-white uppercase font-medium">
                BAMBARDARA PAINTBALL — TACTICAL WARZONE TRAILER
              </span>
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded focus:outline-none"
                aria-label="Close video"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="relative aspect-video bg-[#062018] flex items-center justify-center">
              <iframe
                title="Paintball Trailer Video"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full border-0"
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
