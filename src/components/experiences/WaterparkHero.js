import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const CARDS = [
  {
    id: '01',
    num: '01',
    title: 'Thunder Slides & Flumes',
    desc: 'Experience adrenaline-pumping speed on giant multi-lane racer slides, steep drop chutes, and dizzying spiral flumes.',
    image: `${process.env.PUBLIC_URL}/images/opt/waterpark-1.webp?v=2`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/waterpark-1.jpg?v=2`,
    alt: 'Bambardara Waterpark thrilling body and tube slides',
    tag: 'HIGH-SPEED RACER & TUBE SLIDES',
    detail:
      'Engineered for pure thrills, our slide complex features multi-lane racing mats, high-banked turns, enclosed spiral flumes, and exhilarating splash pools with continuous certified lifeguard supervision.',
  },
  {
    id: '02',
    num: '02',
    title: 'Kids Splash Fort & Rain Dance',
    desc: 'Safe aquatic wonderland featuring interactive water cannons, mini rainbow slides, tipping buckets, and high-energy rain dance.',
    image: `${process.env.PUBLIC_URL}/images/opt/waterpark-2.webp?v=2`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/waterpark-2.jpg?v=2`,
    alt: 'Bambardara Waterpark kids splash fort and tipping bucket',
    tag: 'FAMILY SPLASH WONDERLAND',
    detail:
      'Designed especially for children and families, featuring zero-depth splash pads, gentle sprinkler tunnels, interactive water shooters, and the crowd-favorite 500-liter tipping water bucket.',
  },
  {
    id: '03',
    num: '03',
    title: 'Giant Wave Pool & River',
    desc: 'Ride rolling ocean-like waves surrounded by lush tropical greenery or drift peacefully along the lazy river currents.',
    image: `${process.env.PUBLIC_URL}/images/opt/waterpark-3.webp?v=2`,
    fallback: `${process.env.PUBLIC_URL}/images/opt/waterpark-3.jpg?v=2`,
    alt: 'Bambardara Waterpark giant wave pool and lazy river',
    tag: 'ARTIFICIAL OCEAN SWELLS',
    detail:
      'Immerse yourself in gentle rhythmic swells or high-energy wave cycles in our expansive, mountain-view pool complex with tube rentals, shallow entry, and poolside loungers.',
  },
];

export default function WaterparkHero() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section
      id="waterpark-hero"
      className="relative w-full min-h-[760px] md:min-h-[860px] lg:h-screen lg:min-h-[820px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-[#041424] select-none pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10"
    >
      {/* ── CINEMATIC WATERPARK BACKGROUND VIDEO: D:\bam\bambardara-web\public\videos\waterpark.mp4 ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={`${process.env.PUBLIC_URL}/images/opt/waterpark-hero-poster.jpg?v=2`}
          className="w-full h-full object-cover object-center select-none"
        >
          <source
            src={`${process.env.PUBLIC_URL}/videos/waterpark.mp4`}
            type="video/mp4"
          />
          {/* Fallback picture if video playback is not supported */}
          <picture className="w-full h-full">
            <source
              srcSet={`${process.env.PUBLIC_URL}/images/opt/waterpark-hero-poster.webp?v=2`}
              type="image/webp"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/opt/waterpark-hero-poster.jpg?v=2`}
              alt="Bambardara Waterpark Aerial View"
              className="w-full h-full object-cover object-center select-none"
              loading="eager"
            />
          </picture>
        </video>
      </div>

      {/* ── CINEMATIC BLACK OVERLAY & AMBIENCE GRADIENTS ── */}
      {/* Base black tint across entire video for optimal text contrast */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />

      {/* Top subtle dark scrim for navbar contrast */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(4, 18, 30, 0.85) 0%, rgba(4, 18, 30, 0.45) 50%, transparent 100%)',
        }}
      />
      {/* Bottom vignette so cards stand out with cinematic pop */}
      <div
        className="absolute inset-x-0 bottom-0 h-80 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to top, rgba(2, 10, 18, 0.95) 0%, rgba(2, 10, 18, 0.55) 55%, transparent 100%)',
        }}
      />

      {/* ── TOP DISPLAY HEADERS & SPLIT SUBTITLE (Matching Reference Exactly) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 lg:gap-x-20 items-start">
          
          {/* Left Header: WATER PARK */}
          <div className="flex flex-col items-start text-left">
            <h1 className="font-heading font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] uppercase tracking-[0.04em] leading-[0.92] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              WATER PARK
            </h1>
            <p className="mt-3.5 sm:mt-5 font-body text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Dive into endless thrills, high-speed slides, and
            </p>
          </div>

          {/* Right Header: SPLASH & SLIDES (Outline hollow typography) */}
          <div className="flex flex-col items-start md:items-end md:text-right">
            <h2
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] uppercase tracking-[0.04em] leading-[0.92] select-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px #ffffff',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 0, 0, 0.8)',
              }}
            >
              SPLASH &amp; SLIDES
            </h2>
            <p className="mt-3.5 sm:mt-5 font-body text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              refreshing family adventures at Bambarddara.
            </p>
          </div>

        </div>
      </div>

      {/* ── BOTTOM 3 WATERPARK FEATURE CARDS (01 Slides, 02 Kids Fort, 03 Wave Pool) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mt-auto pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group relative rounded-2xl sm:rounded-3xl border border-white/45 hover:border-white overflow-hidden bg-black/40 backdrop-blur-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer aspect-[16/10] sm:aspect-[16/9.5] md:aspect-[16/11] flex flex-col justify-end p-5 sm:p-6"
            >
              {/* Card Background Photo */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <picture className="block w-full h-full">
                  <source srcSet={card.image} type="image/webp" />
                  <img
                    src={card.fallback}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="sync"
                  />
                </picture>
              </div>

              {/* Card Contrast Dark Gradient Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.15) 100%)',
                }}
              />

              {/* Card Content (Matching Reference) */}
              <div className="relative z-10 text-white">
                <span className="font-heading font-black text-lg sm:text-xl tracking-wider block leading-none">
                  {card.num}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mt-1 tracking-wide leading-snug text-white group-hover:text-luxury-gold transition-colors">
                  {card.title}
                </h3>
                <p className="font-body text-[0.72rem] sm:text-xs text-white/85 font-light leading-relaxed mt-2 max-w-sm line-clamp-3">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPANDED CARD DETAILS MODAL ── */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-xl bg-deep-forest border border-luxury-gold/30 rounded-2xl overflow-hidden shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={selectedCard.fallback}
                alt={selectedCard.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-luxury-gold hover:text-deep-forest text-white flex items-center justify-center transition-all focus:outline-none"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-[0.68rem] font-body uppercase tracking-[0.25em] text-luxury-gold font-semibold block">
                  {selectedCard.tag}
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1">
                  {selectedCard.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4 font-body">
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                {selectedCard.desc}
              </p>
              <p className="text-xs sm:text-sm text-ivory-white/80 leading-relaxed font-light">
                {selectedCard.detail ||
                  'Enjoy world-class aquatic safety with continuous multi-stage fresh water filtration, certified lifeguards on duty, complimentary life jackets, and clean locker amenities.'}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <Link
                  to="/enquire"
                  onClick={() => setSelectedCard(null)}
                  className="bg-luxury-gold hover:bg-rich-gold text-deep-forest font-body font-semibold text-xs uppercase tracking-[0.18em] px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-gold"
                >
                  Book Waterpark Tickets
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="text-xs text-white/70 hover:text-luxury-gold uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
