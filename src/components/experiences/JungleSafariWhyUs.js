import React, { useState } from 'react';
import { FiCheck, FiCheckCircle, FiX, FiArrowRight, FiShield, FiCompass, FiHeart, FiAward } from 'react-icons/fi';

const PILLARS = [
  {
    id: 'support',
    title: 'Consistent Support & Assurance',
    icon: FiShield,
    summary: '24/7 Dedicated Concierge & Comprehensive Safety Protocols',
    details:
      'From the moment you arrive at Bambarddara to your final departure, our operations team monitors every leg of your safari. With round-the-clock field support, on-call medical assurance, and certified veteran naturalists, your peace of mind is unconditionally guaranteed.',
    highlights: ['24/7 Field Concierge', 'On-Call Medical Support', 'Master Certified Naturalist Rangers', 'Guaranteed Booking Protection'],
  },
  {
    id: 'logistics',
    title: 'Seamless Journey Logistics',
    icon: FiCompass,
    summary: 'Effortless Jungle Drives & Custom 4x4 Expedition Vehicles',
    details:
      'Experience zero friction across scenic sanctuary reserves. We provide customized safari 4x4 vehicles with pop-up photography roofs, device charging stations, and chilled refreshments. Expert route transfers and priority park permits are orchestrated down to the minute.',
    highlights: ['Custom 4x4 Safari Vehicles', 'Private Scenic Transfers', 'VIP Fast-Track Park Concessions', 'Luggage & Gear Concierge'],
  },
  {
    id: 'experiences',
    title: 'Cultivating Lifelong Experiences and Memories',
    icon: FiAward,
    summary: 'Rare Wildlife Encounters & Intimate Forest Sundowners',
    details:
      'Witness wildlife in their natural habitat, private forest breakfasts along natural streams, and dramatic golden-hour sunsets over the Sahyadri horizon. Every journey is engineered to deliver breathtaking, transformative wildlife moments.',
    highlights: ['Wild Corridor Front-Row Access', 'Private Forest Sundowners', 'Golden Hour Photography Drives', 'Indigenous Nature & Tribal Cultural Immersion'],
  },
  {
    id: 'relationships',
    title: 'Emotionally Intimate Guest Relationships',
    icon: FiHeart,
    summary: 'Deeply Personalized Itineraries & Warm Nature Hospitality',
    details:
      'Small group sizes and private vehicle charters ensure your safari feels like a deeply personal expedition. Our guides adapt each day to your individual passions—whether big cat tracking, birding, or luxury forest relaxation.',
    highlights: ['Private Vehicle Charters', 'Tailored Daily Itineraries', 'Boutique Tented Bush Camps', 'Handcrafted Gourmet Camp Dining'],
  },
];

export default function JungleSafariWhyUs() {
  const [activePillar, setActivePillar] = useState(null);
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <section
      id="why-bambarddara-safari"
      className="relative w-full min-h-[720px] lg:min-h-[820px] xl:min-h-[880px] flex flex-col justify-between overflow-hidden bg-[#1b1612] text-white select-none pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-16"
      aria-label="Why Bambarddara Jungle Safari"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN ELEPHANTS SUNSET BACKGROUND (NO TEXT IN IMAGE)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <picture className="w-full h-full block">
          <source
            srcSet={`${process.env.PUBLIC_URL}/images/opt/safari-why-us.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/opt/safari-why-us.jpg`}
            alt="Majestic Elephants at Sunset - Bambarddara Jungle Safari"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </picture>

        {/* Ambient Top Shadow for Headline Legibility */}
        <div
          className="absolute inset-x-0 top-0 h-96 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14, 11, 8, 0.72) 0%, rgba(14, 11, 8, 0.45) 45%, rgba(14, 11, 8, 0.1) 80%, transparent 100%)',
          }}
        />

        {/* Ambient Bottom Shadow for Frosted Cards Legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-96 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(14, 11, 8, 0.88) 0%, rgba(14, 11, 8, 0.55) 50%, transparent 100%)',
          }}
        />

        {/* Left atmospheric vignette */}
        <div
          className="absolute inset-y-0 left-0 w-2/3 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(14, 11, 8, 0.55) 0%, rgba(14, 11, 8, 0.2) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ACCESSIBILITY SCREEN READER SUMMARY
          ───────────────────────────────────────────────────────────── */}
      <div className="sr-only">
        <h2>Why Bambarddara Jungle Safari?</h2>
        <p>
          Explore the untamed beauty of Bambarddara with our bespoke wildlife tours. Whether you&apos;re seeking
          the thrill of a safari adventure or the tranquility of a nature retreat, we offer experiences
          that cater to every traveler&apos;s dream.
        </p>
        <ul>
          {PILLARS.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong>: {p.summary}
            </li>
          ))}
        </ul>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. REAL RENDERED HTML/CSS UI (EXACT REFERENCE REPLICATION)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between flex-1 gap-10 md:gap-14">
        {/* Top Header Block & Middle-Right "Learn More" Pill */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
          {/* Top-Left: Large Elegant Serif Heading & Subtitle */}
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] font-normal text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Why Bambarddara<br />
              Safaris?
            </h2>

            <p className="mt-4 sm:mt-5 font-body text-xs sm:text-sm md:text-[0.95rem] font-light text-white/90 leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Explore the untamed beauty of Bambarddara with our bespoke wildlife tours. Whether you&apos;re seeking
              the thrill of a safari adventure or the tranquility of a nature retreat, we offer experiences
              that cater to every traveler&apos;s dream.
            </p>
          </div>

          {/* Middle-Right Floating Oval "Learn More" Button */}
          <div className="md:self-center md:pt-8 md:pr-4">
            <button
              type="button"
              onClick={() => setShowLearnMore(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-black/30 hover:bg-ivory-white hover:text-black px-7 sm:px-8 py-2.5 sm:py-3 font-body text-xs sm:text-sm font-normal tracking-wide text-white backdrop-blur-md transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/80"
              aria-label="Learn More about Bambarddara Jungle Safari"
            >
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* Bottom 2x2 Grid of Frosted Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 w-full pt-6 md:pt-12">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => setActivePillar(pillar)}
              className="group cursor-pointer rounded-xl sm:rounded-2xl border border-white/25 hover:border-white/70 bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-md px-5 sm:px-6 py-4 sm:py-4.5 transition-all duration-300 shadow-2xl hover:scale-[1.015] hover:shadow-[0_12px_36px_rgba(0,0,0,0.55)] flex items-center gap-3.5 sm:gap-4"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePillar(pillar);
                }
              }}
            >
              {/* Circular Checkmark Icon matching reference */}
              <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/75 bg-white/10 text-white shrink-0 group-hover:border-white group-hover:bg-white/25 transition-colors">
                <FiCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white stroke-[2.5]" />
              </span>

              {/* Serif Title matching reference typography */}
              <h3 className="font-serif text-sm sm:text-base md:text-lg lg:text-[1.15rem] font-normal text-white group-hover:text-amber-100 transition-colors drop-shadow-md">
                {pillar.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ORGANIC BOTTOM WAVE DIVIDER TRANSITIONING TO NEXT SECTION
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full z-20 pointer-events-none -mb-8 sm:-mb-12 -mx-6 sm:-mx-10 lg:-mx-16 pt-8">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 md:h-14 block text-[#120f0c]"
        >
          <path
            d="M0,60 L1440,60 L1440,25 C1080,55 720,10 360,40 C180,55 60,35 0,40 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. INTERACTIVE PILLAR DETAIL MODAL
          ───────────────────────────────────────────────────────────── */}
      {activePillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePillar(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pillar-modal-title"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#16120e]/95 p-6 sm:p-8 text-white shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-inner">
                  <activePillar.icon className="h-6 w-6" />
                </span>
                <div>
                  <span className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                    Why Bambarddara Jungle Safari
                  </span>
                  <h3 id="pillar-modal-title" className="font-serif text-xl sm:text-2xl font-normal text-white">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
                aria-label="Close dialog"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Subtitle / summary */}
            <p className="mt-4 font-body text-xs sm:text-sm font-medium text-amber-200/90 leading-snug">
              {activePillar.summary}
            </p>

            {/* Description */}
            <p className="mt-3 font-body text-xs sm:text-sm font-light text-white/80 leading-relaxed">
              {activePillar.details}
            </p>

            {/* Highlights List */}
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
              <span className="font-body text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Key Commitments:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {activePillar.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                    <FiCheckCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setActivePillar(null)}
                className="px-4 py-2 rounded-full border border-white/30 text-xs font-medium text-white hover:bg-white/10 transition"
              >
                Close
              </button>
              <a
                href="#safari-destinations-cards"
                onClick={() => setActivePillar(null)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wide transition shadow-lg"
              >
                <span>View Safari Zones</span>
                <FiArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. LEARN MORE COMPREHENSIVE MODAL
          ───────────────────────────────────────────────────────────── */}
      {showLearnMore && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowLearnMore(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="learn-more-modal-title"
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-[#16120e]/95 p-6 sm:p-8 text-white shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Bespoke Jungle Expeditions
                </span>
                <h3 id="learn-more-modal-title" className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-white">
                  Why Bambarddara Jungle Safari?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLearnMore(false)}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
                aria-label="Close dialog"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 font-body text-xs sm:text-sm font-light text-white/85 leading-relaxed">
              Explore the untamed beauty of Bambarddara with our bespoke wildlife tours. Whether you&apos;re seeking
              the thrill of a safari adventure or the tranquility of a nature retreat, we offer experiences
              that cater to every traveler&apos;s dream.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  onClick={() => {
                    setShowLearnMore(false);
                    setActivePillar(pillar);
                  }}
                  className="p-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-400/50 cursor-pointer transition flex items-start gap-3"
                >
                  <pillar.icon className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-xs font-semibold text-white">{pillar.title}</h4>
                    <p className="font-body text-[11px] text-white/60 line-clamp-2 mt-0.5">{pillar.summary}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-body text-[11px] text-white/50">Curated with Passion at Bambarddara</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLearnMore(false)}
                  className="px-4 py-2 rounded-full border border-white/30 text-xs font-medium text-white hover:bg-white/10 transition"
                >
                  Close
                </button>
                <a
                  href="#safari-destinations-cards"
                  onClick={() => setShowLearnMore(false)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wide transition shadow-lg"
                >
                  <span>Explore Safaris</span>
                  <FiArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
