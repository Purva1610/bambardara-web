import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function ArcheryHero({ onReadMore }) {
  const handleScrollDown = (e) => {
    e.preventDefault();
    if (onReadMore) {
      onReadMore();
      return;
    }
    const target = document.getElementById('overview');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="archery-hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none bg-[#1a140f] pt-24 sm:pt-28 md:pt-32"
    >
      {/* Background Image: D:\bam\bambardara-web\public\images\opt\archery-hero.jpg */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          srcSet={`${process.env.PUBLIC_URL}/images/opt/archery-hero.webp`}
          type="image/webp"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/archery-hero.jpg`}
          alt="Archery at Bambardara Estate"
          className="w-full h-full object-cover object-[75%_center] sm:object-[68%_center] lg:object-center select-none"
          fetchPriority="high"
          loading="eager"
        />
      </picture>

      {/* Atmospheric Vignette & Gradient Overlays for maximum text clarity & vivid archery imagery */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(15, 10, 6, 0.88) 0%, rgba(20, 14, 8, 0.7) 35%, rgba(20, 14, 8, 0.3) 60%, transparent 82%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 8, 5, 0.75) 0%, rgba(10, 8, 5, 0.25) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10, 8, 5, 0.7) 0%, transparent 100%)',
        }}
      />


      {/* Main Hero Content Block */}
      <div className="relative z-10 h-full w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-center">
        <div className="max-w-xl pt-12 sm:pt-6">
          {/* Main Title: ARCHERY */}
          <h1 className="font-heading font-medium text-[4.2rem] xs:text-[5.2rem] sm:text-[7rem] md:text-[8.5rem] lg:text-[10rem] uppercase tracking-[0.02em] text-[#f5efe6] leading-[0.88] drop-shadow-md select-none">
            ARCHERY
          </h1>

          {/* Description matching exact text */}
          <p className="mt-4 sm:mt-6 font-body text-base sm:text-lg md:text-xl font-normal text-[#f5efe6]/90 leading-relaxed max-w-sm sm:max-w-md drop-shadow-sm">
            The sport of archery involves shooting arrows with a bow at a target.
          </p>

          {/* READ MORE -> Pill Button */}
          <div className="mt-7 sm:mt-9">
            <a
              href="#overview"
              onClick={handleScrollDown}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[#f5efe6]/40 bg-black/10 backdrop-blur-xs text-[#f5efe6] text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:border-[#f5efe6] hover:bg-[#f5efe6]/15 hover:gap-4 shadow-sm"
              style={{
                letterSpacing: '0.14em',
              }}
            >
              <span>READ MORE</span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
