import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const SLIDES = [
  {
    num: '01',
    titleLine1: 'Games with idea &',
    titleLine2: 'memorable design.',
    subtitle: 'Step into Bambardara Indoor Games Zone — where cutting-edge VR, arcade games, and sports unite.',
  },
  {
    num: '02',
    titleLine1: 'Virtual reality &',
    titleLine2: 'motion simulators.',
    subtitle: '9D VR battle pods, high-speed racing simulators, and immersive tournament stations.',
  },
  {
    num: '03',
    titleLine1: 'Classic sports &',
    titleLine2: 'family recreation.',
    subtitle: 'Billiards, table tennis, mini bowling, air hockey, and climate-controlled badminton courts.',
  },
];

export default function IndoorGameHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setVideoOpen(false);
      if (e.key === 'ArrowLeft') {
        setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const current = SLIDES[activeSlide];

  return (
    <section
      id="indoor-game-hero"
      className="relative w-full min-h-[640px] md:min-h-[720px] lg:h-[92vh] lg:min-h-[760px] max-h-[1050px] flex flex-col justify-between overflow-hidden bg-[#05060b] select-none pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14"
    >
      {/* ── BACKGROUND ARCADE GAMING ARENA ARTWORK ── */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <source
          srcSet={`${process.env.PUBLIC_URL}/images/opt/indoorgame-hero.webp`}
          type="image/webp"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/indoorgame-hero.jpg`}
          alt="Bambardara Indoor Games Zone Arcade and Gaming Arena"
          className="w-full h-full object-cover object-[70%_center] sm:object-center select-none"
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {/* ── AMBIENT CONTRAST GRADIENTS ── */}
      {/* Top subtle dark gradient for global site header visibility */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5, 6, 11, 0.75) 0%, rgba(5, 6, 11, 0.25) 60%, transparent 100%)',
        }}
      />
      {/* Left side atmospheric contrast gradient for text clarity while keeping vibrant arcade machines visible */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5, 6, 11, 0.75) 0%, rgba(5, 6, 11, 0.5) 45%, rgba(5, 6, 11, 0.15) 75%, transparent 100%)',
        }}
      />
      {/* Bottom subtle grounding vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(5, 6, 11, 0.85) 0%, rgba(5, 6, 11, 0.2) 60%, transparent 100%)',
        }}
      />

      {/* ── FAR-LEFT SOCIAL ICONS RAIL (Matching mockup vertical alignment) ── */}
      <div className="absolute left-3 sm:left-5 lg:left-7 bottom-8 sm:bottom-12 z-30 flex flex-col items-center gap-4 text-white/50">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-white hover:scale-110 transition-all text-sm"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-white hover:scale-110 transition-all text-xs"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-white hover:scale-110 transition-all text-xs"
        >
          <FaTwitter />
        </a>
      </div>

      {/* ── MAIN CONTENT (Left Aligned Display Typography & CTA) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-10 sm:px-14 lg:px-20 my-auto">
        <div className="max-w-2xl flex flex-col items-start text-left">
          
          {/* Index Number: '01' */}
          <span
            key={`num-${activeSlide}`}
            className="font-body text-xs sm:text-sm text-luxury-gold font-medium tracking-[0.25em] mb-1.5 uppercase transition-all duration-300 animate-fadeIn"
          >
            {current.num}
          </span>

          {/* Main Display Headline */}
          <h1
            key={`title-${activeSlide}`}
            className="font-heading font-light text-ivory-white text-3xl sm:text-5xl md:text-6xl lg:text-[4.15rem] leading-[1.08] tracking-[-0.015em] drop-shadow-lg transition-all duration-300 animate-fadeIn"
          >
            {current.titleLine1}
            <br />
            {current.titleLine2}
          </h1>

          {/* Watch now Button */}
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="mt-6 sm:mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-forest-green hover:bg-luxury-gold text-ivory-white hover:text-deep-forest border border-luxury-gold/60 font-body font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] shadow-gold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Watch now
          </button>

        </div>
      </div>

      {/* ── BOTTOM LEFT SLIDER PAGINATION ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-10 sm:px-14 lg:px-20 mt-auto">
        <div className="flex items-center gap-2.5 sm:gap-3 text-sm select-none">
          
          {/* Previous Arrow '<' */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="text-ivory-white/80 hover:text-luxury-gold hover:scale-110 p-1.5 transition-all cursor-pointer"
          >
            <FaChevronLeft size={11} />
          </button>

          {/* Slide 01 Badge */}
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              activeSlide === 0
                ? 'bg-forest-green text-luxury-gold border border-luxury-gold shadow-gold'
                : 'bg-black/50 hover:bg-forest-green/40 border border-luxury-gold/30 text-ivory-white/80'
            }`}
          >
            01
          </button>

          {/* Dash Separator '—' */}
          <span className="text-luxury-gold/50 font-body text-xs select-none">—</span>

          {/* Slide 02 Badge */}
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              activeSlide === 1
                ? 'bg-forest-green text-luxury-gold border border-luxury-gold shadow-gold'
                : 'bg-black/50 hover:bg-forest-green/40 border border-luxury-gold/30 text-ivory-white/80'
            }`}
          >
            02
          </button>

          {/* Double Slash Separator '//' */}
          <span className="text-luxury-gold/40 font-body text-xs select-none">{'//'}</span>

          {/* Slide 03 Badge */}
          <button
            type="button"
            onClick={() => setActiveSlide(2)}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              activeSlide === 2
                ? 'bg-forest-green text-luxury-gold border border-luxury-gold shadow-gold'
                : 'bg-black/50 hover:bg-forest-green/40 border border-luxury-gold/30 text-ivory-white/80'
            }`}
          >
            03
          </button>

          {/* Next Arrow '>' */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="text-ivory-white/80 hover:text-luxury-gold hover:scale-110 p-1.5 transition-all cursor-pointer"
          >
            <FaChevronRight size={11} />
          </button>

        </div>
      </div>

      {/* ── VIDEO MODAL (Watch now) ── */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Indoor Game Zone Video Showcase"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-deep-forest border border-luxury-gold/30 rounded-2xl overflow-hidden shadow-2xl text-ivory-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-pulse" />
                <h3 className="font-heading font-medium text-ivory-white text-base tracking-wide">
                  Bambarddara Indoor Games Zone &amp; VR Arena
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                aria-label="Close Video"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-luxury-gold hover:text-deep-forest text-ivory-white flex items-center justify-center transition-all cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Video Player or Fallback Showcase */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster={`${process.env.PUBLIC_URL}/images/opt/indoorgame-hero.jpg`}
              >
                <source
                  src={`${process.env.PUBLIC_URL}/videos/paintball.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-ivory-white/10 bg-white/5 text-xs text-ivory-white/70">
              <span className="font-body font-light">Experience 16+ Indoor Sports, VR Pods, Racing Simulators &amp; Arcade Games</span>
              <a
                href="/enquire"
                onClick={() => setVideoOpen(false)}
                className="px-6 py-2.5 rounded-sm bg-luxury-gold hover:bg-rich-gold text-deep-forest font-body font-semibold text-xs uppercase tracking-[0.15em] transition-all"
              >
                Book Game Session
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
