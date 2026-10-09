import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaWater,
  FaCompass,
  FaFeatherAlt,
  FaCameraRetro,
  FaSun,
  FaCheckCircle,
  FaUserShield,
  FaHeartbeat,
  FaBinoculars,
  FaChevronRight,
  FaLeaf,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const TRAIL_PILLARS = [
  {
    icon: FaWater,
    title: 'Pristine Waterfalls & Streams',
    desc: 'Seasonal and perennial mountain cascades offering tranquil natural soundtracks and invigorating cool mist.',
  },
  {
    icon: FaLeaf,
    title: 'Rare Flora & Botanical Glades',
    desc: 'Rich biodiversity preserved through sustainable agro-tourism forestry, indigenous medicinal plants, and wild blooms.',
  },
  {
    icon: FaFeatherAlt,
    title: 'Birdwatching & Wildlife',
    desc: 'Over 80 bird species, butterflies, and gentle forest fauna thriving in an undisturbed sanctuary environment.',
  },
  {
    icon: FaHeartbeat,
    title: 'Wellness & Forest Bathing',
    desc: 'Designated silence glades for Shinrin-yoku meditation, yoga breathwork, and mindful connection with untouched earth.',
  },
];

const INCLUDED_AMENITIES = [
  'Over 12 KM of meticulously marked & maintained trails',
  'Certified estate naturalists & wilderness guides',
  'Complimentary trekking poles, trail maps & binoculars',
  'Hydration stations with pure mountain spring water',
  'Shaded rest pavilions & panoramic viewpoint benches',
  'First-aid certified trail marshals on continuous patrol',
  'Custom morning & sunset guided excursions',
  'Family-friendly gentle loops with accessible terrain',
];

export default function NatureTrails() {
  return (
    <main className="bg-ivory-white text-forest-green selection:bg-luxury-gold selection:text-dark-charcoal">
      {/* ── HERO SECTION (EXACT REFERENCE DESIGN) ── */}
      <section className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden bg-deep-forest text-ivory-white">
        {/* Background visual with primeval forest & moody mist */}
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="nature"
            alt="Moody misty forest and stone trail in Sahyadri"
            sizes="100vw"
            priority
            className="h-full w-full object-cover scale-105 transition-transform duration-[12000ms] ease-out hover:scale-100"
          />
          {/* Vignette and dark atmospheric scrims matching the reference */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,15,10,0.85)_100%)]" />
        </div>

        {/* Giant Watermark Lettering Behind Display Title */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-10 select-none">
          <span className="font-heading text-[15vw] font-black tracking-[0.25em] text-white whitespace-nowrap blur-[1px]">
            SAHYADRI
          </span>
        </div>

        {/* ── Top Spacer / Header Offset ── */}
        <div className="pt-28 md:pt-32" />

        {/* ── Center Content (Tags, Big Title, Subtitle) ── */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
          {/* Top Micro-Pill Tags */}
          <Reveal>
            <div className="flex items-center justify-center gap-6 sm:gap-10 font-body text-xs sm:text-sm tracking-[0.22em] text-ivory-white/80 lowercase font-light">
              <span>misty forests</span>
              <span className="h-1 w-1 rounded-full bg-luxury-gold/80" />
              <span>high mountains</span>
              <span className="h-1 w-1 rounded-full bg-luxury-gold/80" />
              <span>wild nature</span>
            </div>
          </Reveal>

          {/* Main Giant Display Title (Frosted Metallic Look) */}
          <Reveal delay={120}>
            <h1 className="mt-4 font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.14em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/60 drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
              BAMBARDARA
            </h1>
          </Reveal>

          {/* Center Subtitle Lede */}
          <Reveal delay={200}>
            <div className="mt-4 max-w-xl mx-auto space-y-1">
              <p className="font-body text-sm sm:text-base text-ivory-white/90 font-light tracking-wide leading-relaxed">
                One of Maharashtra's untouched private forest reserves.
              </p>
              <p className="font-body text-xs sm:text-sm text-ivory-white/75 font-light tracking-wide leading-relaxed">
                Where ancient trees, waterfalls, and wildlife thrive in untouched peace.
              </p>
            </div>
          </Reveal>

          {/* Quick Action CTA */}
          <Reveal delay={280}>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="#trail-routes"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 font-body text-xs uppercase tracking-[0.18em] text-ivory-white backdrop-blur-md transition-all duration-300 hover:bg-luxury-gold hover:text-deep-forest hover:border-luxury-gold hover:shadow-lg"
              >
                <FaCompass className="text-xs" />
                <span>Explore The Trails</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Bottom 3-Column Info Cards (Exact Reference Design with Node Dividers) ── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-16 md:px-12 md:pb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Column 1: Tourist Reviews */}
            <Reveal delay={320}>
              <div className="flex flex-col text-left">
                <span className="font-body text-xs tracking-wider text-ivory-white/80 font-normal">
                  Tourist reviews:
                </span>
                
                {/* Divider line with centered glowing node slider */}
                <div className="relative flex items-center my-3">
                  <div className="h-[1px] w-full bg-white/25" />
                  <div className="absolute left-6 h-2 w-2 rounded-full bg-ivory-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                </div>

                <p className="font-body text-xs sm:text-[0.82rem] leading-relaxed text-ivory-white/85 font-light italic">
                  &ldquo;We haven't seen anything like this in our lives, it's very impressive.&rdquo;
                </p>
              </div>
            </Reveal>

            {/* Column 2: Why it's worth a visit */}
            <Reveal delay={380}>
              <div className="flex flex-col text-center">
                <span className="font-body text-xs tracking-wider text-ivory-white/80 font-normal">
                  Why it&apos;s worth a visit:
                </span>
                
                {/* Divider line with centered glowing node slider */}
                <div className="relative flex items-center justify-center my-3">
                  <div className="h-[1px] w-full bg-white/25" />
                  <div className="absolute h-2 w-2 rounded-full bg-ivory-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                </div>

                <div className="flex flex-col gap-1 font-body text-xs sm:text-[0.82rem] leading-relaxed text-ivory-white/85 font-light">
                  <span>Photo expedition</span>
                  <span>Nature observation &amp; waterfall discovery</span>
                </div>
              </div>
            </Reveal>

            {/* Column 3: What will you lose if you don't go */}
            <Reveal delay={440}>
              <div className="flex flex-col text-right">
                <span className="font-body text-xs tracking-wider text-ivory-white/80 font-normal">
                  What will you lose if you don&apos;t go:
                </span>
                
                {/* Divider line with centered glowing node slider */}
                <div className="relative flex items-center justify-end my-3">
                  <div className="h-[1px] w-full bg-white/25" />
                  <div className="absolute right-6 h-2 w-2 rounded-full bg-ivory-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                </div>

                <p className="font-body text-xs sm:text-[0.82rem] leading-relaxed text-ivory-white/85 font-light">
                  The opportunity to see rare plants and animals in their natural environment.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS / EXPERIENCE HIGHLIGHTS ── */}
      <section className="py-20 md:py-28 bg-warm-sand/30 border-b border-stone/30 relative">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading
            kicker="Nature Sanctuary"
            title="A Living, Breathing Wilderness"
            lede="Every trail is designed to preserve the delicate balance of indigenous flora, tranquil waterways, and ancient rock formations."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRAIL_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 100}>
                  <div className="h-full rounded-xl border border-stone/60 bg-ivory-white p-8 shadow-sm transition-all duration-300 hover:border-luxury-gold/80 hover:-translate-y-1 hover:shadow-lg">
                    <div className="h-12 w-12 rounded-lg bg-deep-forest/5 flex items-center justify-center text-forest-green border border-forest-green/10 mb-6">
                      <Icon className="text-2xl text-forest-green" />
                    </div>
                    <h3 className="font-heading text-lg font-normal text-forest-green mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-xs leading-relaxed text-forest-green/75">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRAIL PATHWAYS (IN EXACT THREATS TO FORESTS LAYOUT) ── */}
      <section id="trail-routes" className="py-24 md:py-32 bg-[#13221b] text-[#e8f1ed] relative overflow-hidden border-t border-b border-stone/20">
        {/* Subtle atmospheric vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,97,0.04)_0%,transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          {/* Top Row: Title on Left, 4 Numbered Points on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 md:pb-24">
            {/* Top Left: Large Display Serif Title */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-[0.05em] text-[#e8f1ed] leading-[1.02] uppercase drop-shadow-sm">
                  TRAIL<br />
                  PATHWAYS
                </h2>
              </Reveal>
            </div>

            {/* Top Right: Numbered 2x2 Grid with Left Divider Line */}
            <div className="lg:col-span-7 border-l border-white/20 pl-6 sm:pl-10 lg:pl-12">
              <Reveal delay={150}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                  {/* Item 01 */}
                  <div className="flex items-start gap-4">
                    <span className="font-heading text-3xl sm:text-4xl text-[#d4e4dc] font-light tracking-wide shrink-0">
                      01
                    </span>
                    <p className="font-body text-xs sm:text-[0.82rem] text-[#b0c8bd] leading-relaxed font-light pt-1">
                      <strong className="font-normal text-[#e8f1ed]">Cascade &amp; Waterfall:</strong> Meander alongside pristine mountain brooks and twin natural cascade pools (2.5 KM • Easy).
                    </p>
                  </div>

                  {/* Item 03 */}
                  <div className="flex items-start gap-4">
                    <span className="font-heading text-3xl sm:text-4xl text-[#d4e4dc] font-light tracking-wide shrink-0">
                      03
                    </span>
                    <p className="font-body text-xs sm:text-[0.82rem] text-[#b0c8bd] leading-relaxed font-light pt-1">
                      <strong className="font-normal text-[#e8f1ed]">Hilltop Ridge &amp; Sunset:</strong> Ascend basalt ridgelines offering 360-degree panoramic valley vistas (4.6 KM • Moderate).
                    </p>
                  </div>

                  {/* Item 02 */}
                  <div className="flex items-start gap-4">
                    <span className="font-heading text-3xl sm:text-4xl text-[#d4e4dc] font-light tracking-wide shrink-0">
                      02
                    </span>
                    <p className="font-body text-xs sm:text-[0.82rem] text-[#b0c8bd] leading-relaxed font-light pt-1">
                      <strong className="font-normal text-[#e8f1ed]">Forest Canopy Walk:</strong> Deep dive into old-growth reserve with botanists identifying 120+ flora species (3.8 KM • Moderate).
                    </p>
                  </div>

                  {/* Item 04 */}
                  <div className="flex items-start gap-4">
                    <span className="font-heading text-3xl sm:text-4xl text-[#d4e4dc] font-light tracking-wide shrink-0">
                      04
                    </span>
                    <p className="font-body text-xs sm:text-[0.82rem] text-[#b0c8bd] leading-relaxed font-light pt-1">
                      <strong className="font-normal text-[#e8f1ed]">Dawn Wilderness Trek:</strong> Invigorating early morning ascent above the cloud line to the summit (6.2 KM • Challenging).
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom Row: Framed Image on Left, Right Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-8 border-t border-white/10">
            {/* Bottom Left: Framed Photograph */}
            <div className="lg:col-span-6">
              <Reveal delay={200}>
                <div>
                  <span className="block font-body text-xs sm:text-sm text-[#9eb8ad] tracking-wide mb-3 font-light">
                    Curated Routes: For Every Pace
                  </span>
                  
                  {/* Framed Photo Container (Matching Reference) */}
                  <div className="p-2 border border-white/30 rounded-sm bg-black/30 shadow-2xl max-w-xl">
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                      <EstateImage
                        slug="waterfalls-and-nature-trails-2"
                        alt="Curated scenic trail pathways across Bambardara"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bottom Right: Editorial Statement with Action Button */}
            <div className="lg:col-span-6 flex flex-col justify-end">
              <Reveal delay={280}>
                <div className="max-w-lg lg:ml-auto">
                  <p className="font-body text-base sm:text-lg md:text-xl text-[#cfe0d7] font-light leading-relaxed">
                    Curated routes designed for every pace, fitness level, and generation:
                  </p>
                  <p className="mt-4 font-body text-xs sm:text-sm text-[#9eb8ad] leading-relaxed font-light">
                    Whether you crave a serene morning stroll beside cascading streams or an invigorating
                    ridge climb at sunrise, our 12+ KM marked network provides shaded resting pavilions,
                    hydration points, and certified estate naturalist escorts.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/enquire"
                      className="inline-flex items-center gap-2 rounded-full bg-luxury-gold px-7 py-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-deep-forest shadow-md transition-all duration-300 hover:bg-ivory-white hover:text-deep-forest hover:shadow-[0_0_20px_rgba(201,169,97,0.4)] hover:scale-[1.02]"
                    >
                      <span>Schedule A Guided Trail Walk</span>
                      <FaChevronRight className="text-[0.65rem]" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY SECTION ── */}
      <section className="py-20 bg-warm-sand/20 border-t border-stone/30">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <SectionHeading
            kicker="Visual Journey"
            title="Moments Along the Estate Trails"
            lede="Immerse your senses in rushing mountain water, ancient forest canopies, and serene sunrises."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group flex flex-col">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-deep-forest/5">
                <EstateImage
                  slug="waterfalls-and-nature-trails-2"
                  alt="Hidden cascade pools along estate trail"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex flex-col">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-luxury-gold font-semibold">
                  Natural Springs
                </span>
                <h3 className="mt-1 font-heading text-xl md:text-2xl font-light text-forest-green tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                  Hidden Cascade Pools
                </h3>
                <p className="mt-2 font-body text-xs sm:text-sm text-forest-green/80 leading-relaxed font-light">
                  Secluded natural rock pools fed by pure mountain springs, offering refreshing resting halts alongside shaded fern corridors.
                </p>
              </div>
            </div>

            <div className="group flex flex-col">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-deep-forest/5">
                <EstateImage
                  slug="nature"
                  alt="Ancient old-growth forest canopy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex flex-col">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-luxury-gold font-semibold">
                  Indigenous Reserve
                </span>
                <h3 className="mt-1 font-heading text-xl md:text-2xl font-light text-forest-green tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                  Old-Growth Canopy
                </h3>
                <p className="mt-2 font-body text-xs sm:text-sm text-forest-green/80 leading-relaxed font-light">
                  Centuries-old indigenous trees form a cooling green vault overhead, home to exotic Western Ghats birdlife and native botanical flora.
                </p>
              </div>
            </div>

            <div className="group flex flex-col sm:col-span-2 lg:col-span-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-deep-forest/5">
                <EstateImage
                  slug="waterfalls-and-nature-trails-3"
                  alt="Sahyadri mountain ridge point vistas"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex flex-col">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-luxury-gold font-semibold">
                  Sunset Lookouts
                </span>
                <h3 className="mt-1 font-heading text-xl md:text-2xl font-light text-forest-green tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                  Sahyadri Ridge Point
                </h3>
                <p className="mt-2 font-body text-xs sm:text-sm text-forest-green/80 leading-relaxed font-light">
                  Elevated sunrise and sunset vantage points with unhindered 360-degree panoramas across misty valleys, lakes, and mountain peaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AMENITIES & VISITOR INFORMATION ── */}
      <section className="relative py-24 bg-[#0a1c14] text-ivory-white overflow-hidden border-t border-luxury-gold/20">
        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-luxury-gold/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-luxury-gold block">
              Estate Hospitality & Guest Care
            </span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl md:text-5xl font-light text-ivory-white tracking-wide">
              Prepared For Your Journey
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-[#9eb8ad] font-light leading-relaxed">
              Every trail exploration is supported with 5-star estate amenities and certified wilderness escorts to ensure your walk is tranquil, safe, and deeply rejuvenating.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Estate Amenities & Infrastructure */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-luxury-gold" />
                  <span className="font-body text-[0.65rem] uppercase tracking-[0.22em] text-luxury-gold font-semibold">
                    Included Amenities
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-light text-ivory-white">
                  Trail Services & Infrastructure
                </h3>
                <p className="mt-3 font-body text-xs sm:text-sm text-[#cfe0d7] font-light leading-relaxed">
                  Complimentary hospitality facilities provided for all estate guests, resort residents, and day-tour visitors:
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {INCLUDED_AMENITIES.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:border-luxury-gold/30 hover:bg-white/[0.05]"
                    >
                      <FaCheckCircle className="mt-0.5 shrink-0 text-luxury-gold text-sm" />
                      <span className="font-body text-xs text-[#cfe0d7] font-light leading-snug">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs text-[#9eb8ad]">
                <div className="flex items-center gap-2">
                  <FaUserShield className="text-luxury-gold text-base" />
                  <span>24/7 First-Aid & Wilderness Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLeaf className="text-luxury-gold text-base" />
                  <span>100% Eco-Sensitive Leave-No-Trace Route</span>
                </div>
              </div>
            </div>

            {/* Right Card: Trail Advisory & Essentials */}
            <div className="lg:col-span-5 rounded-3xl border border-luxury-gold/40 bg-gradient-to-b from-[#133024] to-[#0d2219] p-8 sm:p-10 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-luxury-gold animate-pulse" />
                  <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold font-semibold">
                    Trail Advisory
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-light text-ivory-white">
                  Recommended Essentials
                </h3>
                <p className="mt-3 font-body text-xs sm:text-sm text-[#cfe0d7] font-light leading-relaxed">
                  Recommended gear to enhance your comfort and safety while exploring our mountain paths:
                </p>

                <div className="mt-6 space-y-3.5">
                  <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-luxury-gold/15 text-luxury-gold">
                      <FaCompass className="text-sm" />
                    </div>
                    <span className="font-body text-xs text-[#e8f1ec] font-light leading-snug">
                      Sturdy walking or hiking shoes with non-slip grip
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-luxury-gold/15 text-luxury-gold">
                      <FaSun className="text-sm" />
                    </div>
                    <span className="font-body text-xs text-[#e8f1ec] font-light leading-snug">
                      Sun protection (hat, sunglasses) & breathable organic fabrics
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-luxury-gold/15 text-luxury-gold">
                      <FaCameraRetro className="text-sm" />
                    </div>
                    <span className="font-body text-xs text-[#e8f1ec] font-light leading-snug">
                      Camera or smartphone for waterfall & birdwatching vistas
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-black/20 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-luxury-gold/15 text-luxury-gold">
                      <FaBinoculars className="text-sm" />
                    </div>
                    <span className="font-body text-xs text-[#e8f1ec] font-light leading-snug">
                      Binoculars for canopy bird spotting (complimentary from concierge)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <Link
                  to="/enquire"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-luxury-gold px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-deep-forest shadow-lg transition-all duration-300 hover:bg-ivory-white hover:text-deep-forest hover:shadow-[0_0_25px_rgba(201,169,97,0.45)] hover:scale-[1.01]"
                >
                  <span>Schedule A Naturalist Walk</span>
                  <FaChevronRight className="text-[0.65rem]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
