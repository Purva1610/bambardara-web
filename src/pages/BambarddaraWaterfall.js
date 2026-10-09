import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCompass,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';


// Footer ribbon tickers
const RIBBON_ITEMS = [
  'BREATHE DEEP',
  'RELAX MORE',
  'LIVE PURE',
  'LOVE NATURE',
  'KEEP NATURE GREEN',
];

export default function BambarddaraWaterfall() {
  return (
    <main className="bg-ivory-white text-forest-green selection:bg-luxury-gold selection:text-dark-charcoal">
      {/* ── HERO SECTION (EXACT ICELAND WATERFALLS POSTER DESIGN) ── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-deep-forest text-ivory-white">
        {/* Background visual with dramatic waterfall landscape */}
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="waterfalls-and-nature-trails-2"
            alt="Bambardara Waterfall plunging from rocky green cliffs"
            sizes="100vw"
            priority
            className="h-full w-full object-cover scale-105 transition-transform duration-[12000ms] hover:scale-100"
          />
          {/* Subtle cinematic overlays for depth & poster contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/35 to-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(6,32,24,0.55)_65%,rgba(4,18,13,0.92)_100%)]" />
        </div>

        {/* Ambient Grid Lines */}
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(212,175,55,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* CENTER HERO: Exact "Waterfalls OF ICELAND" Typography */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-36 sm:pt-44 md:pt-48 pb-10 text-center flex flex-col items-center justify-center my-auto">
          <Reveal delay={100}>
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[-0.02em] text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] leading-none select-none">
              Waterfalls
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-3 sm:mt-4">
              <span className="font-body text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] sm:tracking-[0.45em] text-white/90 font-medium pl-[0.35em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                OF BAMBARDARA
              </span>
            </div>
          </Reveal>

          {/* Action CTA Buttons */}
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/enquire"
                className="inline-flex items-center gap-3 bg-luxury-gold px-8 py-3.5 rounded-full font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95"
              >
                <span>Visit Waterfall</span>
                <FaChevronRight className="text-[0.65rem]" />
              </Link>
              <a
                href="#waterfall-highlights"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/30 backdrop-blur-md px-6 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold hover:bg-black/50"
              >
                <FaCompass className="text-luxury-gold" />
                <span>Explore Highlights</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* BOTTOM FEATURE / INDEX ROW: 01, 02, 03 Columns (Exact Reference Architecture) */}
        <div className="relative z-20 w-full pb-10 sm:pb-14 pt-6 px-6 md:px-12 bg-gradient-to-t from-deep-forest/95 via-deep-forest/75 to-transparent">
          <Reveal delay={320}>
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start text-left">
              {/* Column 01: List of Waterfalls */}
              <div className="group flex flex-col">
                <span className="font-body text-xs text-luxury-gold font-bold tracking-widest mb-1.5 block">
                  01
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-light text-white group-hover:text-luxury-gold transition-colors duration-300">
                  List of Waterfalls
                </h3>
                <p className="font-body text-xs text-white/75 font-light leading-relaxed mt-1.5">
                  Explore an interactive trail map of scenic cascade basins.
                </p>
                <div className="mt-3.5 h-[1px] w-full bg-white/25 group-hover:bg-luxury-gold/60 transition-colors duration-300" />
              </div>

              {/* Column 02: Trips & Tours */}
              <div className="group flex flex-col">
                <span className="font-body text-xs text-luxury-gold font-bold tracking-widest mb-1.5 block">
                  02
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-light text-white group-hover:text-luxury-gold transition-colors duration-300">
                  Trips &amp; Tours
                </h3>
                <p className="font-body text-xs text-white/75 font-light leading-relaxed mt-1.5">
                  Itineraries for group and single tours led by certified naturalists.
                </p>
                <div className="mt-3.5 h-[1px] w-full bg-white/25 group-hover:bg-luxury-gold/60 transition-colors duration-300" />
              </div>

              {/* Column 03: Galleries */}
              <div className="group flex flex-col">
                <span className="font-body text-xs text-luxury-gold font-bold tracking-widest mb-1.5 block">
                  03
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-light text-white group-hover:text-luxury-gold transition-colors duration-300">
                  Galleries
                </h3>
                <p className="font-body text-xs text-white/75 font-light leading-relaxed mt-1.5">
                  See for yourself the pristine beauty of Sahyadri cascades.
                </p>
                <div className="mt-3.5 h-[1px] w-full bg-white/25 group-hover:bg-luxury-gold/60 transition-colors duration-300" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CORE WATERFALL FEATURES SECTION (FULL SCREEN PRESENTATION) ── */}
      <section id="waterfall-highlights" className="py-12 md:py-16 bg-white border-y border-stone/30 w-full relative">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          {/* Header matching slide exactly (Full Width) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between mb-8 pb-4 border-b border-gray-200">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-[#1A1916]">
                WATERFALL FEATURES &amp; HIGHLIGHTS
              </h2>
              <p className="mt-1 font-body text-xs sm:text-sm md:text-base text-gray-500 font-light">
                Discover the distinctive natural wonders, pristine streams &amp; wellness features of Bambardara
              </p>
            </div>
            <div className="mt-2 sm:mt-0 font-body text-xs sm:text-sm font-mono font-bold text-luxury-gold tracking-wider">
              #BAMBARDARA • 9 FEATURES
            </div>
          </div>

          {/* Scrollable Container with Ruler Layout (Full Width) */}
          <div className="overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-luxury-gold/40 scrollbar-track-stone/10">
            <div className="w-full min-w-[1150px] select-none">
              {/* ── TOP ROW (Above Ruler) ── */}
              <div className="grid grid-cols-9 gap-3 xl:gap-4 items-end mb-0">
                {/* Col 1: 01 (Text top, Image below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pb-3 flex flex-col justify-end min-h-[190px]">
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    01 • VISTA
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">SCENIC VISTA</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug my-1.5">
                    Panoramic clifftop decks overlooking misty Sahyadri valleys.
                  </p>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <EstateImage
                      slug="nature"
                      alt="Scenic Vista feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Col 2: 02 (Empty top) */}
                <div className="min-h-[190px]" />

                {/* Col 3: 03 (Image top, Text below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pb-3 flex flex-col justify-end min-h-[190px]">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-1.5">
                    <EstateImage
                      slug="waterfall"
                      alt="Twin Cascades feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    03 • CASCADES
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">TWIN CASCADES</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug mt-1">
                    Majestic waters plunging over ancient natural basalt rock cliffs.
                  </p>
                </div>

                {/* Col 4: 04 (Empty top) */}
                <div className="min-h-[190px]" />

                {/* Col 5: 05 (Text top, Image below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pb-3 flex flex-col justify-end min-h-[190px]">
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    05 • STREAM
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">STREAM CROSSING</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug my-1.5">
                    Gentle mountain brooks with clear flowing freshwater currents.
                  </p>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <EstateImage
                      slug="well-planted-roads-and-street-lights"
                      alt="Stream Crossing feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Col 6: 06 (Empty top) */}
                <div className="min-h-[190px]" />

                {/* Col 7: 07 (Image top, Text below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pb-3 flex flex-col justify-end min-h-[190px]">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-1.5">
                    <EstateImage
                      slug="bamboo-plant"
                      alt="Rainbow Cove feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    07 • RAINBOW
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">RAINBOW COVE</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug mt-1">
                    Sunlit water spray creating vibrant natural rainbow arcs.
                  </p>
                </div>

                {/* Col 8: 08 (Empty top) */}
                <div className="min-h-[190px]" />

                {/* Col 9: 09 (Text top, Image below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pb-3 flex flex-col justify-end min-h-[190px]">
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    09 • SUNSET
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">SUNSET VISTAS</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug my-1.5">
                    Breathtaking dusk horizons across the Western Ghat ranges.
                  </p>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <EstateImage
                      slug="about"
                      alt="Sunset Vistas feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* ── MIDDLE RULER LINE (Measurement Ticks) ── */}
              <div className="relative w-full my-0 py-2 flex items-center border-t border-b border-gray-400 bg-gray-50/70">
                <div
                  className="w-full h-3.5"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to right, #6b7280 0, #6b7280 1px, transparent 1px, transparent 10px)',
                  }}
                />
              </div>

              {/* ── BOTTOM ROW (Below Ruler) ── */}
              <div className="grid grid-cols-9 gap-3 xl:gap-4 items-start mt-0">
                {/* Col 1: 01 (Empty bottom) */}
                <div className="min-h-[190px]" />

                {/* Col 2: 02 (Image top, Text below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pt-3 flex flex-col justify-start min-h-[190px]">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-1.5">
                    <EstateImage
                      slug="waterfalls-and-nature-trails-2"
                      alt="Canopy Trails feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    02 • CANOPY
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">CANOPY TRAILS</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug mt-1">
                    Dense evergreen paths filled with pure high-oxygen mountain air.
                  </p>
                </div>

                {/* Col 3: 03 (Empty bottom) */}
                <div className="min-h-[190px]" />

                {/* Col 4: 04 (Text top, Image below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pt-3 flex flex-col justify-start min-h-[190px]">
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    04 • SPRINGS
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">CRYSTAL SPRINGS</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug my-1.5">
                    Pure mineral-rich natural spring pools for refreshing dips.
                  </p>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <EstateImage
                      slug="waterfalls-and-nature-trails-3"
                      alt="Crystal Springs feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Col 5: 05 (Empty bottom) */}
                <div className="min-h-[190px]" />

                {/* Col 6: 06 (Image top, Text below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pt-3 flex flex-col justify-start min-h-[190px]">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-1.5">
                    <EstateImage
                      slug="plantation"
                      alt="Zen Sanctuary feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    06 • ZEN
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">ZEN SANCTUARY</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug mt-1">
                    Open-air yoga &amp; pranayama decks surrounded by birdsong.
                  </p>
                </div>

                {/* Col 7: 07 (Empty bottom) */}
                <div className="min-h-[190px]" />

                {/* Col 8: 08 (Text top, Image below) */}
                <div className="border-l border-gray-400/80 pl-3 pr-1 pt-3 flex flex-col justify-start min-h-[190px]">
                  <span className="font-body text-[0.65rem] font-bold text-luxury-gold tracking-wider uppercase">
                    08 • GAZEBOS
                  </span>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#1A1916]">FOREST GAZEBOS</h4>
                  <p className="font-body text-[0.68rem] sm:text-xs text-gray-500 leading-snug my-1.5">
                    Wooden rest pavilions serving herbal tea in shaded woods.
                  </p>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <EstateImage
                      slug="5-star-hospitality"
                      alt="Forest Gazebos feature view"
                      sizes="200px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Col 9: 09 (Empty bottom) */}
                <div className="min-h-[190px]" />
              </div>
            </div>
          </div>

          {/* Bottom reservation CTA (Full Width) */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-body text-xs sm:text-sm font-bold text-forest-green tracking-wider uppercase">
                EXPERIENCE ALL 9 WATERFALL FEATURES
              </span>
              <p className="font-body text-xs sm:text-sm text-gray-500 font-light">
                Guided naturalist tours available daily from 7:00 AM to 6:30 PM.
              </p>
            </div>
            <Link
              to="/enquire"
              className="inline-flex items-center gap-2 bg-luxury-gold px-8 py-3.5 rounded-full font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all duration-300 hover:bg-forest-green hover:text-white"
            >
              <span>Book Waterfall Experience</span>
              <FaChevronRight className="text-[0.65rem]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AUDIENCE & INSPIRATIONAL BANNER ── */}
      <section className="py-16 bg-ivory-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: A Perfect Getaway For */}
            <div className="rounded-xl border border-stone/60 bg-warm-sand/30 p-8 text-center flex flex-col justify-center items-center shadow-sm">
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-forest-green font-bold block mb-2">
                A PERFECT GETAWAY FOR
              </span>
              <p className="font-heading text-xl sm:text-2xl font-light text-forest-green">
                Families, Friends, Couples &amp; Nature Lovers!
              </p>
            </div>

            {/* Box 2: Quote Box from poster */}
            <div className="rounded-xl border-2 border-luxury-gold/60 bg-gradient-to-br from-[#123120] to-[#091b11] p-8 text-center flex flex-col justify-center items-center text-ivory-white shadow-md">
              <span className="font-serif italic text-lg sm:text-xl text-ivory-white/90">
                &ldquo;Let the Waterfall
              </span>
              <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold font-normal">
                Refresh Your Soul&rdquo;
              </span>
            </div>

            {/* Box 3: Visit Today CTA from poster */}
            <div className="rounded-xl border border-stone/60 bg-warm-sand/30 p-8 text-center flex flex-col justify-center items-center shadow-sm">
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold font-bold block mb-2">
                VISIT TODAY
              </span>
              <p className="font-body text-xs sm:text-sm text-forest-green/85 leading-relaxed">
                and make beautiful memories with the magic of nature!
              </p>
              <Link
                to="/enquire"
                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-forest-green hover:text-luxury-gold"
              >
                <span>Plan Your Trip</span>
                <FaChevronRight className="text-[0.6rem]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION & CONTACT INFORMATION (FROM POSTER) ── */}
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
                    Parale Ninai, Shahuwadi, Kolhapur - 415101, Maharashtra, India
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
                <h4 className="font-heading text-lg font-normal text-luxury-gold mb-2">
                  Daily Visitor Timings
                </h4>
                <p className="font-body text-xs text-ivory-white/80 leading-relaxed">
                  Open daily from 7:00 AM to 6:00 PM. Guided morning walks depart at 7:30 AM.
                  Family picnic slots and private photography sessions available.
                </p>
                <div className="mt-5">
                  <Link
                    to="/enquire"
                    className="block w-full text-center bg-luxury-gold py-3 font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all hover:bg-ivory-white"
                  >
                    Enquire / Pre-Book Visit
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
                {item}
              </span>
              {idx < RIBBON_ITEMS.length - 1 && (
                <span className="text-luxury-gold/60 text-xs">🍃</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
