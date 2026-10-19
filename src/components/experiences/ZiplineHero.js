import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaCompass,
} from 'react-icons/fa';

export default function ZiplineHero({ onMoreDetailsClick }) {
  const scrollToCircuits = () => {
    if (onMoreDetailsClick) {
      onMoreDetailsClick();
    } else {
      const el = document.getElementById('zipline-specs') || document.getElementById('zipline-circuits');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="zipline-hero"
      className="relative w-full min-h-[85vh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-deep-forest text-white select-none pt-24 sm:pt-28 md:pt-32 pb-16 font-body"
    >
      {/* ── Background: High-Altitude Zipline Imagery (zip.jpg) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={`${process.env.PUBLIC_URL}/images/opt/zip.jpg`}
          alt="Scenic aerial view of Bambardara Zipline flight over the Western Ghats canopy"
          className="w-full h-full object-cover object-[center_35%] scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* ── Ambient Dark & Golden Gradients for Maximum Legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(6, 32, 24, 0.88) 0%, rgba(6, 32, 24, 0.65) 45%, rgba(6, 32, 24, 0.35) 75%, rgba(6, 32, 24, 0.5) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 40%, rgba(212, 175, 55, 0.18) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6, 32, 24, 0.95) 0%, rgba(6, 32, 24, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* ── Main Hero Content Area ── */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-8 md:py-16 max-w-5xl">
        {/* Primary Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-lg mb-6">
          Soar Above The Valley
          <br />
          <span className="text-luxury-gold italic font-normal">
            At 75 KM/H
          </span>
        </h1>

        {/* Descriptive Lede */}
        <p className="font-body text-white/85 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light mb-10">
          Experience 820 meters of pure aerial exhilaration suspended 210 meters
          above the lush Kadavi river canyon. Engineered with dual aerospace-grade
          cables, certified under European EN 15567 safety benchmarks, and surrounded
          by panoramic Western Ghats rainforest vistas.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            to="/enquire"
            className="inline-flex items-center justify-center gap-3 bg-luxury-gold hover:bg-rich-gold text-dark-charcoal font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-none transition-all duration-300 shadow-xl hover:shadow-luxury-gold/25 hover:-translate-y-0.5"
          >
            <span>Book Your Flight</span>
            <FaArrowRight className="text-xs" />
          </Link>

          <button
            type="button"
            onClick={scrollToCircuits}
            className="inline-flex items-center justify-center gap-2.5 bg-black/45 hover:bg-black/70 text-white border border-white/30 hover:border-luxury-gold font-semibold text-sm tracking-wider uppercase px-7 py-4 rounded-none backdrop-blur-md transition-all duration-300"
          >
            <FaCompass className="text-luxury-gold" />
            <span>Explore Circuits</span>
          </button>
        </div>
      </div>
    </section>
  );
}
