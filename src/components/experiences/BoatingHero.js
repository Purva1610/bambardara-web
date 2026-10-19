import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../shared/Reveal';

export default function BoatingHero() {
  return (
    <section
      id="boating-hero"
      className="relative flex min-h-[85vh] sm:min-h-[92vh] lg:min-h-screen w-full flex-col justify-between overflow-hidden bg-deep-forest pt-28 sm:pt-36 md:pt-40"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HIGH-DEFINITION AERIAL BOAT HERO BACKGROUND
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 isolate pointer-events-none">
        <picture className="w-full h-full">
          <img
            src={`${process.env.PUBLIC_URL}/images/opt/boating-fun-hero.jpg`}
            alt="Scenic Lake Boating at Bambardara"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Soft, minimal right vignette for text legibility without obscuring the vibrant water, boat, and spray on the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(270deg, rgba(6,32,24,0.78) 0%, rgba(6,32,24,0.45) 45%, rgba(6,32,24,0.15) 80%, transparent 100%), linear-gradient(180deg, rgba(6,32,24,0.3) 0%, transparent 40%, rgba(6,32,24,0.35) 100%)',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN HERO CONTENT BLOCK (REFERENCE TYPOGRAPHY & WHITE PILL)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 sm:px-12 lg:px-16 my-auto pb-16 sm:pb-20 flex justify-end">
        <div className="max-w-xl lg:max-w-2xl text-left ml-auto">
          <Reveal>
            {/* Elegant Luxury Headline */}
            <h1 className="font-heading font-light uppercase tracking-wider text-3xl sm:text-5xl md:text-6xl text-ivory-white leading-[1.12] drop-shadow-xl">
              LUXURY LAKE BOATING
              <span className="block font-normal text-ivory-white/95 mt-1">
                FOR YOUR DREAM GETAWAY
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            {/* Delicate Refined Sub-paragraph */}
            <p className="mt-4 sm:mt-5 font-body text-xs sm:text-sm md:text-base font-light leading-relaxed text-ivory-white/90 max-w-lg drop-shadow">
              Glide across crystalline waters with peerless tranquility, scenic mountain reflections,
              and thrilling boat rides curated for an unforgettable escape.
            </p>
          </Reveal>

          <Reveal delay={220}>
            {/* White Rounded Pill CTA Button (Exact Reference Match) */}
            <div className="mt-7 sm:mt-9 flex items-center gap-4">
              <Link
                to="/enquire"
                className="group inline-flex items-center gap-3 rounded-full bg-ivory-white px-8 py-3.5 sm:px-9 sm:py-4 font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-dark-charcoal shadow-luxury transition-all duration-300 hover:bg-luxury-gold hover:text-deep-forest hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Fleet</span>
                <span
                  className="text-base transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>

              <a
                href="tel:+917588775757"
                className="inline-flex items-center gap-2 rounded-full border border-ivory-white/30 bg-deep-forest/40 px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-ivory-white backdrop-blur-md transition-all duration-300 hover:border-ivory-white hover:bg-ivory-white/15 hover:-translate-y-0.5"
              >
                <span>Call To Book</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ORGANIC WHITE BOTTOM WAVE DIVIDER (MATCHING REFERENCE)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full z-20 pointer-events-none -mb-px">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 md:h-32 block text-ivory-white"
        >
          <path
            d="M0,140 L1440,140 L1440,70 C1120,135 720,140 380,85 C190,55 80,68 0,90 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
