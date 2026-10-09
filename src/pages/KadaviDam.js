import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShip,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaArrowRight,
  FaArrowLeft,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

// 6 Horizontal Photo Cards from the poster with editorial descriptions
const POSTER_PHOTO_CARDS = [
  {
    slug: 'boating-3',
    title: 'Mesmerizing Sunsets',
    subtitle: 'Golden Reflections on the Reservoir',
    kicker: 'Popularity • SERENITY',
    desc: 'A wonderful serenity has taken possession of the entire valley. Feel those peaceful mornings and evenings with golden sunlight reflecting across the expansive catchment water basin.',
  },
  {
    slug: 'waterfalls-and-nature-trails-3',
    title: 'Scenic Mountain Views',
    subtitle: 'Panoramic Lakeside Mountain Walk',
    kicker: 'Experience • TRANQUILITY',
    desc: 'Towering Sahyadri mountain ridgelines cradle the serene reservoir waters, creating unbroken 360-degree natural vistas, crisp mountain air, and restorative open skies.',
  },
  {
    slug: 'nature',
    title: 'Dense Forest Canopy',
    subtitle: 'Old-Growth Indigenous Reserve',
    kicker: 'Eco Reserve • BIODIVERSITY',
    desc: 'Dense green woods teeming with exotic butterflies, nesting hornbills, and rare botanical species flourishing in an undisturbed, protected sanctuary environment.',
  },
  {
    slug: 'boating',
    title: 'Boating & Relaxation',
    subtitle: 'Tranquil Rowboats, Kayaks & Shikaras',
    kicker: 'Water Activity • LEISURE',
    desc: 'Glide gently across pristine waters on family paddleboats, kayaks, and traditional shikara rides with certified lifejackets and professional boatmen.',
  },
  {
    slug: 'waterfalls-and-nature-trails-2',
    title: 'Natural Water Flow',
    subtitle: 'Cascading Mountain Catchment Streams',
    kicker: 'Catchment • PURE SPRINGS',
    desc: 'Pure freshwater feeds continuously from perennial mountain cascades, sustaining rich valley ecosystems, lush plantations, and fertile organic orchards.',
  },
  {
    slug: 'well-planted-roads-and-street-lights',
    title: 'Picnic Spot & Promenade',
    subtitle: 'Lush Green Lawns & Gazebos',
    kicker: 'Hospitality • LEISURE',
    desc: 'Paved walkways, shaded viewpoint pavilions, and manicured lawns designed for memorable family picnics, quiet meditation, and leisurely strolls.',
  },
];

// Bottom ribbon ticker from poster
const RIBBON_ITEMS = [
  'CONNECT WITH NATURE',
  'FEEL THE PEACE',
  'LIVE THE EXPERIENCE',
];

// Pinned Target Point Marker Component for Hero
function HeroTargetPin({ title, desc, className = '' }) {
  return (
    <div className={`flex flex-col items-center text-center group cursor-default ${className}`}>
      {/* Target icon [ • ] with crosshairs and stalk */}
      <div className="flex flex-col items-center mb-1.5 sm:mb-2">
        <div className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-sm border border-cyan-300/80 bg-cyan-950/80 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-200 group-hover:bg-white animate-pulse" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-cyan-300/80" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-cyan-300/80" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-0.5 bg-cyan-300/80" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-0.5 bg-cyan-300/80" />
        </div>
        <div className="h-3 sm:h-4 w-px bg-gradient-to-b from-cyan-300/80 to-transparent" />
      </div>
      <h4 className="font-sans text-xs sm:text-sm font-semibold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-cyan-200 transition-colors">
        {title}
      </h4>
      <p className="mt-0.5 max-w-[180px] sm:max-w-[210px] font-sans text-[0.65rem] sm:text-xs text-cyan-100/80 leading-tight font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
        {desc}
      </p>
    </div>
  );
}

export default function KadaviDam() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = POSTER_PHOTO_CARDS.length;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleCards = [
    POSTER_PHOTO_CARDS[activeSlide % totalSlides],
    POSTER_PHOTO_CARDS[(activeSlide + 1) % totalSlides],
    POSTER_PHOTO_CARDS[(activeSlide + 2) % totalSlides],
  ];

  return (
    <main className="bg-ivory-white text-forest-green selection:bg-luxury-gold selection:text-dark-charcoal">
      {/* ── HERO SECTION (EXACT REFERENCE POSTER LAYOUT) ── */}
      <section className="relative min-h-[108vh] flex flex-col justify-between overflow-hidden bg-[#03131a] text-white pt-28 sm:pt-32 pb-10 sm:pb-14">
        {/* Background Visual: Panoramic Lake & Mountains */}
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="boating-3"
            alt="Kadavi Dam reservoir view with scenic mountain panorama"
            sizes="100vw"
            priority
            className="h-full w-full object-cover scale-105 transition-transform duration-[12000ms] hover:scale-100"
          />
          {/* Cyan/Teal Mountain Atmosphere Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#021117] via-[#041f27]/75 to-[#021017]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.25)_0%,transparent_75%)]" />
        </div>

        {/* Inset Framing Box (Increased Height & Coverage) */}
        <div className="pointer-events-none absolute top-20 sm:top-24 md:top-24 bottom-3 sm:bottom-4 md:bottom-5 inset-x-4 sm:inset-x-8 md:inset-x-12 rounded-3xl sm:rounded-[2.5rem] border border-cyan-200/40 z-20 shadow-[inset_0_0_30px_rgba(6,182,212,0.08)]" />

        {/* Top Left Vertical Glyphs inside Framing Box */}
        <div className="absolute top-32 sm:top-36 left-7 sm:left-12 md:left-16 z-30 flex flex-col items-center">
          <span className="[writing-mode:vertical-rl] font-serif text-xs sm:text-sm md:text-base tracking-[0.45em] text-cyan-100/80 font-light select-none">
            क ड वी • ध र ण
          </span>
          <span className="mt-2 text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] text-cyan-300/80 font-mono">
            16.98° N
          </span>
        </div>

        {/* Top Right Vertical Glyphs inside Framing Box */}
        <div className="absolute top-32 sm:top-36 right-7 sm:right-12 md:right-16 z-30 flex flex-col items-center">
          <span className="[writing-mode:vertical-rl] font-serif text-xs sm:text-sm md:text-base tracking-[0.45em] text-cyan-100/80 font-light select-none">
            बा म ब र्द रा
          </span>
          <span className="mt-2 text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] text-cyan-300/80 font-mono">
            SAHYADRI
          </span>
        </div>

        {/* Center Hero Block: Giant Sans Title & Subtitle */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-6 sm:pt-10 text-center flex flex-col items-center">
          <Reveal>
            <h1 className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] xl:text-[9.5rem] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100/95 to-cyan-300/40 drop-shadow-[0_15px_40px_rgba(6,182,212,0.4)] select-none">
              KADAVI
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-1 sm:mt-2 font-sans text-xs sm:text-base md:text-lg font-light text-cyan-100/90 tracking-wide max-w-2xl drop-shadow-md">
              A tour that you can't see, you can only feel it
            </p>
          </Reveal>

          {/* Elevated Center Node */}
          <Reveal delay={200}>
            <div className="mt-8 sm:mt-10 md:mt-12">
              <HeroTargetPin
                title="Non-tourist regions"
                desc="(you will see real natural locations)"
              />
            </div>
          </Reveal>
        </div>

        {/* Bottom Row: 4 Target Nodes Distributed Across Width */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 md:px-16 mt-8 sm:mt-12">
          <Reveal delay={280}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 items-start justify-items-center">
              <HeroTargetPin
                title="Small groups"
                desc="(up to 10 people, to make it comfortable)"
              />
              <HeroTargetPin
                title="Full organization"
                desc="(boating, guided walks, picnic lawns & meals)"
              />
              <HeroTargetPin
                title="Slow pace"
                desc="(without running around: more nature, silence and personal time)"
              />
              <HeroTargetPin
                title="The real experience"
                desc="(not just to see Kadavi Dam, but to soak up the atmosphere and relax)"
              />
            </div>
          </Reveal>

          {/* Bottom Action Bar */}
          <Reveal delay={340}>
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/enquire"
                className="inline-flex items-center gap-2.5 rounded-full bg-luxury-gold px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-deep-forest shadow-lg transition-all duration-300 hover:bg-ivory-white hover:text-deep-forest hover:shadow-[0_0_20px_rgba(201,169,97,0.5)] hover:scale-105"
              >
                <span>Visit Kadavi Dam</span>
                <FaChevronRight className="text-[0.65rem]" />
              </Link>
              <Link
                to="/experience/boating"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-950/50 px-6 py-3 font-body text-xs uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-md transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-900/60 hover:text-white"
              >
                <FaShip className="text-xs text-cyan-300" />
                <span>Boating Experience</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GREAT OUR NATURE / VISUAL HIGHLIGHTS SHOWCASE ── */}
      <section className="py-20 md:py-24 bg-[#faf9f6] border-b border-stone/30 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Section Heading matching reference */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-dark-charcoal tracking-tight">
              Great Our Nature
            </h2>
            <p className="mt-2.5 font-body text-xs sm:text-sm text-dark-charcoal/70 uppercase tracking-[0.2em] font-light">
              Moments Along the Sahyadri Catchment & Reservoir
            </p>
          </div>

          {/* 3 Tall Vertical Cards on Left, Editorial Stack on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 3 Rounded Vertical Photo Cards */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-3 sm:gap-5">
              {visibleCards.map((card, idx) => (
                <div
                  key={`${card.slug}-${idx}`}
                  className="group relative h-[360px] sm:h-[430px] md:h-[470px] rounded-3xl overflow-hidden shadow-xl bg-deep-forest transition-all duration-500 hover:-translate-y-1.5"
                >
                  <EstateImage
                    slug={card.slug}
                    alt={card.title}
                    sizes="(max-width: 768px) 33vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-5 inset-x-3 text-center">
                    <span className="font-body text-[0.62rem] uppercase tracking-[0.2em] text-cyan-200/90 font-semibold block">
                      {card.kicker?.split('•')[1] || 'KADAVI'}
                    </span>
                    <span className="mt-1 font-heading text-xs sm:text-sm text-ivory-white font-normal block leading-tight">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side Editorial Copy & Controls */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-7 pl-0 lg:pl-4">
              {/* Block 1 */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-forest-green">
                    {visibleCards[0]?.kicker || 'Popularity • SERENITY'}
                  </span>
                </div>
                <p className="mt-2.5 font-body text-xs sm:text-sm text-dark-charcoal/80 leading-relaxed font-light">
                  {visibleCards[0]?.desc}
                </p>
              </div>

              {/* Block 2 */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-forest-green">
                    {visibleCards[1]?.kicker || 'Experience • TRANQUILITY'}
                  </span>
                </div>
                <p className="mt-2.5 font-body text-xs sm:text-sm text-dark-charcoal/80 leading-relaxed font-light">
                  {visibleCards[1]?.desc}
                </p>
              </div>

              {/* Action Buttons (High Visibility Solid Brand Colors) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/enquire"
                  className="inline-flex items-center justify-center rounded-lg bg-forest-green px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md transition-all duration-300 hover:bg-deep-forest hover:shadow-lg hover:scale-[1.02]"
                >
                  <span>Visit Kadavi</span>
                </Link>
                <Link
                  to="/experience/boating"
                  className="inline-flex items-center justify-center rounded-lg bg-luxury-gold px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-deep-forest shadow-md transition-all duration-300 hover:bg-forest-green hover:text-white hover:shadow-lg hover:scale-[1.02]"
                >
                  <span>Explore</span>
                </Link>
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous photos"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-forest-green/50 text-forest-green transition-all duration-300 hover:bg-forest-green hover:text-white cursor-pointer shadow-sm"
                >
                  <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next photos"
                  className="group flex items-center gap-2.5 text-forest-green hover:text-deep-forest transition-colors cursor-pointer"
                >
                  <span className="font-body text-xs font-bold tracking-wider uppercase text-forest-green">
                    Next Moments
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-green text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-deep-forest">
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── A PERFECT DESTINATION FOR / ATTRACTIONS SECTION ── */}
      <section className="py-20 md:py-24 bg-[#faf9f6] border-b border-stone/30 relative overflow-hidden">
        {/* Subtle decorative watermark circle at bottom right */}
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#7cb342]/10 blur-2xl" />

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Tall Rounded Nature Reservoir Image */}
            <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[540px] rounded-3xl overflow-hidden shadow-2xl bg-deep-forest group">
              <EstateImage
                slug="waterfalls-and-nature-trails-2"
                alt="Winding water stream and lush nature at Kadavi"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-cyan-200 block mb-1">
                  Kadavi Reservoir Catchment
                </span>
                <span className="font-heading text-xl sm:text-2xl font-light text-ivory-white block">
                  Untouched Sahyadri Sanctuary
                </span>
              </div>
            </div>

            {/* Right Column: Title + 2-Column Split */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {/* Header Title with Top-Right Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-body text-xs font-bold uppercase tracking-[0.22em] text-forest-green block mb-1">
                    Welcome Everyone
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium text-dark-charcoal tracking-tight">
                    A Perfect Destination For
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-wider text-[#7cb342]">
                  <span>Featured • 02</span>
                  <span className="h-4 w-4 rounded-full bg-[#7cb342] flex items-center justify-center text-white text-[0.5rem]">✓</span>
                </div>
              </div>

              {/* 2-Column Split: Dark Feature Card on Left, Editorial Blocks on Right */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch flex-1">
                {/* Sub-Column 1: Dark Feature Card with Green Bottom Bar */}
                <div className="rounded-2xl bg-[#152721] text-ivory-white border border-white/10 shadow-xl overflow-hidden flex flex-col justify-between">
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="pb-3 border-b border-white/10">
                      <span className="font-heading text-sm font-semibold text-ivory-white block">
                        Families
                      </span>
                      <span className="font-body text-[0.7rem] text-ivory-white/70 font-light block mt-0.5 leading-snug">
                        A wonderful serene retreat for all generations
                      </span>
                    </div>

                    <div className="pb-3 border-b border-white/10">
                      <span className="font-heading text-sm font-semibold text-ivory-white block">
                        Groups &amp; Friends
                      </span>
                      <span className="font-body text-[0.7rem] text-ivory-white/70 font-light block mt-0.5 leading-snug">
                        Memorable outings, boating &amp; shared moments
                      </span>
                    </div>

                    <div className="pb-3 border-b border-white/10">
                      <span className="font-heading text-sm font-semibold text-ivory-white block">
                        Photographers
                      </span>
                      <span className="font-body text-[0.7rem] text-ivory-white/70 font-light block mt-0.5 leading-snug">
                        Golden hour sunset &amp; landscape vantage points
                      </span>
                    </div>

                    <div>
                      <span className="font-heading text-sm font-semibold text-ivory-white block">
                        Nature Lovers
                      </span>
                      <span className="font-body text-[0.7rem] text-ivory-white/70 font-light block mt-0.5 leading-snug">
                        Pure mountain air, native flora &amp; calm waters
                      </span>
                    </div>
                  </div>

                  {/* Full-width Bottom Accent Bar */}
                  <Link
                    to="/enquire"
                    className="bg-[#7cb342] text-white px-5 py-3.5 flex items-center justify-between font-body text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#689f38]"
                  >
                    <span>Plan Your Visit</span>
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>

                {/* Sub-Column 2: Clean Direct Editorial Text Blocks + Solid Buttons */}
                <div className="flex flex-col justify-between space-y-6 sm:space-y-8 py-1">
                  {/* Block 1 */}
                  <div>
                    <p className="font-body text-xs sm:text-sm text-dark-charcoal/85 leading-relaxed font-light">
                      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.
                    </p>
                    <div className="mt-3.5">
                      <Link
                        to="/enquire"
                        className="inline-flex items-center justify-center rounded-md bg-forest-green px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-deep-forest hover:shadow-lg hover:scale-[1.02]"
                      >
                        <span>Project 01</span>
                      </Link>
                    </div>
                  </div>

                  {/* Block 2 */}
                  <div>
                    <p className="font-body text-xs sm:text-sm text-dark-charcoal/85 leading-relaxed font-light">
                      Take a break... Make memories! Experience tranquil paddle boating, lakeside gazebos, and sweet mornings of spring.
                    </p>
                    <div className="mt-3.5">
                      <Link
                        to="/experience/boating"
                        className="inline-flex items-center justify-center rounded-md bg-forest-green px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-deep-forest hover:shadow-lg hover:scale-[1.02]"
                      >
                        <span>Project 02</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION & CONTACT CARD (FROM POSTER) ── */}
      <section className="py-20 bg-deep-forest text-ivory-white relative overflow-hidden border-t border-luxury-gold/30">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/40 bg-white/5 px-4 py-1 mb-4">
                <FaMapMarkerAlt className="text-luxury-gold text-xs" />
                <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold">
                  Official Destination Details
                </span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-light text-ivory-white">
                Bambardara Agrotourism Pvt. Ltd.
              </h3>

              <div className="mt-6 space-y-4 text-sm font-light text-ivory-white/85">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-luxury-gold shrink-0 text-base mt-1" />
                  <span>
                    Kadavi Dam, Parale Ninai, Shahuwadi, Kolhapur - 415101, Maharashtra, India
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="text-luxury-gold shrink-0 text-base mt-1" />
                  <span>
                    +91 75887 75757 &nbsp;|&nbsp; +91 93222 75757
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FaGlobe className="text-luxury-gold shrink-0 text-base mt-1" />
                  <span>www.bambardaraagrotourism.com</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-xl border border-luxury-gold/40 bg-white/5 p-6 backdrop-blur-md">
                <div className="inline-block bg-luxury-gold text-deep-forest px-3 py-1 font-body text-[0.65rem] font-bold uppercase tracking-wider rounded mb-2">
                  VISIT TODAY
                </div>
                <h4 className="font-heading text-lg font-normal text-ivory-white mb-2">
                  Plan Your Sunset &amp; Boating Trip
                </h4>
                <p className="font-body text-xs text-ivory-white/80 leading-relaxed">
                  Open daily with boating operating from 8:00 AM to 6:00 PM. Sunset viewing decks
                  accessible until dusk.
                </p>
                <div className="mt-5">
                  <Link
                    to="/enquire"
                    className="block w-full text-center bg-luxury-gold py-3 font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all hover:bg-ivory-white"
                  >
                    Enquire &amp; Reserve Excursion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM SLOGAN RIBBON TICKER (FROM POSTER FOOTER) ── */}
      <div className="bg-[#05110a] py-4 border-t border-luxury-gold/30 text-center overflow-x-auto">
        <div className="flex items-center justify-center gap-6 md:gap-10 px-6 whitespace-nowrap">
          {RIBBON_ITEMS.map((item, idx) => (
            <div key={item} className="flex items-center gap-6 md:gap-10">
              <span className="font-body text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold">
                🍃 {item}
              </span>
              {idx < RIBBON_ITEMS.length - 1 && (
                <span className="text-luxury-gold/40 text-sm">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
