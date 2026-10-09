import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiLeaf, PiRecycle, PiPlant, PiArrowsClockwise } from 'react-icons/pi';
import { FiArrowUpRight, FiTruck } from 'react-icons/fi';
import { GiWheat, GiFlowerPot } from 'react-icons/gi';
import { TbClipboardData } from 'react-icons/tb';
import { BsBarChartLine } from 'react-icons/bs';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

const SOIL_FEATURES = [
  {
    icon: PiLeaf,
    title: 'No synthetic inputs',
    body: 'No pesticide or fertiliser bought in a bag — only what the compost yard and crop rotation provide.',
  },
  {
    icon: PiRecycle,
    title: 'Built by rotation',
    body: 'Rice, wheat and rest, in the same order every year, so the same bed keeps giving after sixty seasons.',
  },
];

const PRACTICES = [
  { label: 'Composting', when: 'Year-round', body: 'Manure from the dairy and residue from the terraces are turned into fertility, not bought in a sack.' },
  { label: 'Crop rotation', when: 'Jun – May', body: 'Rice, then wheat and gram behind it, then a season of rest — the same order every year, for sixty of them.' },
  { label: 'Companion planting', when: 'Every sowing', body: 'Beds are mixed by design, so one crop’s pests find another crop’s scent in the way.' },
  { label: 'Natural pest control', when: 'Jun – Feb', body: 'Beneficial insects, hand-picking and timing do the work a spray would otherwise do.' },
  { label: 'Cover cropping', when: 'Mar – May', body: 'Idle ground is never bare ground — something is always holding the soil together.' },
  { label: 'Water conservation', when: 'Year-round', body: 'Drip lines and rain-fed tanks mean the fields are never watered more than they need.' },
];

/* The agricultural year opens with the monsoon rather than January, since
   that is when the first crop of the year actually goes in. */
const SEASONS = [
  {
    id: 'monsoon',
    name: 'Monsoon',
    range: 'June — September',
    image: 'monsoon',
    sown: 'Rice, transplanted by hand into the lower terraces as each tank fills.',
    tended: 'Okra, ridge gourd and monsoon greens go into the walled beds, weeded by hand through the wet weeks.',
    composted: 'The yard keeps turning through the rain — this is when fertility is built for the season ahead.',
  },
  {
    id: 'rabi',
    name: 'Rabi',
    range: 'October — February',
    image: 'winter',
    sown: 'Wheat and gram, sown straight behind the rice harvest while the soil still holds the monsoon’s moisture.',
    tended: 'Winter greens and citrus come in; this is the longest and busiest stretch of the growing year.',
    composted: 'Rice straw and husks from the harvest go into the yard, the bulk of a full year’s compost.',
  },
  {
    id: 'summer',
    name: 'Summer',
    range: 'March — May',
    image: 'summer',
    sown: 'Nothing new goes into the ground — the beds rest, and the irrigation lines are opened up and repaired.',
    tended: 'Orchard pruning and mulching, ahead of the fruit that will ripen through April and May.',
    composted: 'The yard is turned three times before the rain returns — the single busiest job of the dry months.',
  },
];

export default function OrganicFarming() {
  const [activeSeason, setActiveSeason] = useState(0);
  const season = SEASONS[activeSeason];

  return (
    <main className="bg-ivory-white">
      {/* ══════════════════════════════════════════════════════════
          HERO - Cultivating Smarter Farming Futures
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <EstateImage
            slug="organic-farming-landscape"
            alt="Organic farming fields at the estate"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[70vh] flex-col justify-center px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <span className="inline-block font-body text-sm uppercase tracking-[0.2em] text-white/70">
                🌾 Bambardara Agro Tourism
              </span>
            </Reveal>
            
            <Reveal delay={100}>
              <h1 className="mt-6 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-tight text-white">
                Grown on Compost
                <br />
                and Rotation
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8">
                <Link
                  to="/enquire"
                  className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-8 py-4 font-body text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-muted-gold"
                >
                  <span>Explore Farm</span>
                  <FiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          QUALITY CHECK - Evaluating Crop Quality In Field
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            {/* Left - Image */}
            <Reveal>
              <div className="overflow-hidden rounded-2xl h-[400px] lg:h-[550px]">
                <EstateImage
                  slug="evaluate"
                  alt="Evaluating crop quality in the field"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full"
                />
              </div>
            </Reveal>

            {/* Right - Content */}
            <div className="space-y-8">
              <Reveal delay={100}>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-body text-sm uppercase tracking-[0.2em] text-light-charcoal">
                    Quality Check
                  </span>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-dark-charcoal">
                  Evaluating Crop Quality In Field
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-luxury-gold/20 px-4 py-2 font-body text-sm text-luxury-gold">
                    ✓ Our Objective
                  </span>
                  <span className="rounded-full bg-forest-green px-4 py-2 font-body text-sm text-white">
                    ● Our Goals
                  </span>
                  <span className="rounded-full bg-forest-green/80 px-4 py-2 font-body text-sm text-white">
                    ★ Our Heritage
                  </span>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <p className="font-body text-sm leading-relaxed text-light-charcoal">
                  Our objective is to craft meaningful solutions that elevate identity and inspire reliability.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="space-y-3">
                  {[
                    'Future Focused',
                    'Quality Craftsmanship',
                    'Smart Solutions',
                    'Design Precision'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg className="h-4 w-4 flex-shrink-0 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="font-body text-sm text-dark-charcoal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <button className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-8 py-4 font-body text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-muted-gold">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat With Us</span>
                </button>
              </Reveal>
            </div>

            {/* Right Column - Two Stacked Images */}
            <div className="space-y-6">
              <Reveal delay={100}>
                <div className="overflow-hidden rounded-2xl">
                  <EstateImage
                    slug="farming"
                    alt="Tractor working in the field"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="overflow-hidden rounded-2xl">
                  <EstateImage
                    slug="organic-farming-and-farm-stay-3"
                    alt="Organic farming landscape"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          OUR PRACTICES - 3 Service Cards with Alternating Layout
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#4A5C4E] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center">
            <Reveal delay={100}>
              <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
                Sustainable Growth For Farms
              </h2>
            </Reveal>
          </div>

          {/* 3 Service Cards Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            
            {/* Card 1 - Harvest Services (Text Top, Image Bottom) */}
            <Reveal delay={150}>
              <div className="group overflow-hidden rounded-3xl bg-white">
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-dark-charcoal">
                    Harvest Services
                  </h3>

                  <p className="mt-4 font-body text-sm leading-relaxed text-light-charcoal">
                    Harvest Services ensure timely crop collection using efficient tools and skilled teams.
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-forest-green transition-all hover:gap-3">
                    <span>View Details</span>
                    <FiArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Bottom Image */}
                <div className="overflow-hidden">
                  <EstateImage
                    slug="harvest"
                    alt="Harvest services in action"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </Reveal>

            {/* Card 2 - Land Cultivation (Image Top, Text Bottom) */}
            <Reveal delay={200}>
              <div className="group overflow-hidden rounded-3xl bg-white">
                {/* Top Image */}
                <div className="overflow-hidden">
                  <EstateImage
                    slug="farming"
                    alt="Land cultivation with tractor"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-dark-charcoal">
                    Land Cultivation
                  </h3>

                  <p className="mt-4 font-body text-sm leading-relaxed text-light-charcoal">
                    Land Cultivation prepares soil for planting through ploughing, tilling, and conditioning.
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-forest-green transition-all hover:gap-3">
                    <span>View Details</span>
                    <FiArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Card 3 - Farm Management (Text Top, Image Bottom) */}
            <Reveal delay={250}>
              <div className="group overflow-hidden rounded-3xl bg-white">
                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-dark-charcoal">
                    Farm Management
                  </h3>

                  <p className="mt-4 font-body text-sm leading-relaxed text-light-charcoal">
                    Farm Management oversees daily operations to ensure productive and efficient farming.
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-forest-green transition-all hover:gap-3">
                    <span>View Details</span>
                    <FiArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Bottom Image */}
                <div className="overflow-hidden">
                  <EstateImage
                    slug="dairy"
                    alt="Farm management operations"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </Reveal>

          </div>

          {/* See All Services Button */}
          <Reveal delay={300}>
            <div className="mt-12 text-center">
              <Link
                to="/enquire"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-dark-charcoal shadow-lg transition-all duration-300 hover:scale-105 hover:bg-ivory-white"
              >
                <GiWheat className="h-5 w-5 text-luxury-gold" />
                <span>See All Services</span>
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          OUR AGRICULTURE PROCESS - 4 Steps
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-soft-beige px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center">
            <Reveal>
              <span className="inline-block font-body text-sm uppercase tracking-[0.2em] text-light-charcoal">
                🌾 Precision Farming
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-dark-charcoal">
                Our Agriculture Process
              </h2>
            </Reveal>
          </div>

          {/* Process Steps */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Step 1 - Field Planning */}
            <Reveal delay={150}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Icon Box */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1B4D3E] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2D7A4F]">
                    <TbClipboardData className="h-10 w-10 text-luxury-gold" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold text-sm font-bold text-dark-charcoal shadow-lg">
                    01
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-dark-charcoal">
                  Field Planning
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-light-charcoal">
                  Strategic planning and soil analysis to optimize crop selection and layout
                </p>
              </div>
            </Reveal>

            {/* Step 2 - Growth Monitoring */}
            <Reveal delay={200}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Icon Box */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1B4D3E] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2D7A4F]">
                    <BsBarChartLine className="h-10 w-10 text-luxury-gold" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold text-sm font-bold text-dark-charcoal shadow-lg">
                    02
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-dark-charcoal">
                  Growth Monitoring
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-light-charcoal">
                  Regular tracking and data-driven insights for healthy crop development
                </p>
              </div>
            </Reveal>

            {/* Step 3 - Plant Nurture */}
            <Reveal delay={250}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Icon Box */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1B4D3E] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2D7A4F]">
                    <GiFlowerPot className="h-10 w-10 text-luxury-gold" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold text-sm font-bold text-dark-charcoal shadow-lg">
                    03
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-dark-charcoal">
                  Plant Nurture
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-light-charcoal">
                  Organic care and sustainable practices for optimal plant health
                </p>
              </div>
            </Reveal>

            {/* Step 4 - Farm Delivery */}
            <Reveal delay={300}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Icon Box */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1B4D3E] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2D7A4F]">
                    <FiTruck className="h-10 w-10 text-luxury-gold" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold text-sm font-bold text-dark-charcoal shadow-lg">
                    04
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-dark-charcoal">
                  Farm Delivery
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-light-charcoal">
                  Fresh harvest delivered directly from our farm to your table
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── CRAFTING LIVING SOIL ─────────────────────────────────── */}
      <section className="overflow-hidden bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column - Text Content */}
          <div>
            <Reveal>
              <span className="font-body text-sm uppercase tracking-[0.3em] text-luxury-gold">
                Welcome to organic farming
              </span>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="mt-6 font-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-forest-green">
                Farming living
                <span className="block text-luxury-gold">soil.</span>
              </h2>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-light-charcoal">
                We're not chasing yield at any cost. Every bed on this estate is a reflection of patience — rotated, composted, and left to rest when it needs to be. Whether it's rice, orchard fruit or the kitchen's own herbs, nothing here is rushed to the table.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <a
                href="#practices"
                className="mt-8 inline-flex items-center rounded-full border-2 border-forest-green px-6 py-3 font-body text-sm font-semibold text-forest-green transition-all duration-300 hover:bg-forest-green hover:text-white"
              >
                Our practices
              </a>
            </Reveal>

            {/* Feature Icons */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {SOIL_FEATURES.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={400 + i * 100}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dark-charcoal text-luxury-gold">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <dt className="font-heading text-base font-bold text-dark-charcoal">
                        {title}
                      </dt>
                      <dd className="mt-2 font-body text-sm leading-relaxed text-light-charcoal">
                        {body}
                      </dd>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column - Overlapping Images */}
          <div className="relative">
            <Reveal delay={150}>
              {/* Main Large Image */}
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <EstateImage
                  slug="about-farm"
                  alt="The rice harvest across the estate terraces"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={250}>
              {/* Overlapping Small Image */}
              <div className="absolute -bottom-8 -left-8 overflow-hidden rounded-3xl shadow-2xl md:-bottom-12 md:-left-12">
                <EstateImage
                  slug="farm-about"
                  alt="Tractor and workers in the orchard"
                  sizes="300px"
                  className="aspect-[4/3] w-48 object-cover md:w-64"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── PHILOSOPHY · FIELD NOTES ENTRY 01 ───────────────────── */}
      <section className="border-b border-stone bg-soft-beige px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="font-body text-sm uppercase tracking-[0.3em] text-luxury-gold">
                  Entry No. 01
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-6 font-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-forest-green">
                  Slower. More work.
                  <span className="block text-luxury-gold">Better food.</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-light-charcoal">
                  Buying in fertiliser would be quicker. Spraying would be easier. Neither is done here, because the point of farming this estate organically was never efficiency — it was that a vegetable grown this way tastes the way a vegetable is supposed to, and the soil is still capable of growing it next year, and the year after that.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Link
                  to="/agro-farming#plan"
                  className="mt-8 inline-flex items-center rounded-full border-2 border-forest-green px-6 py-3 font-body text-sm font-semibold text-forest-green transition-all duration-300 hover:bg-forest-green hover:text-white"
                >
                  See the beds on the estate plan
                </Link>
              </Reveal>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-6">
              {[
                { icon: PiPlant, title: 'Composting', body: PRACTICES[0].body },
                { icon: PiArrowsClockwise, title: 'Crop rotation', body: PRACTICES[1].body },
              ].map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={150 + i * 100}>
                  <div className="flex items-start gap-5">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forest-green text-luxury-gold">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-dark-charcoal">
                        {title}
                      </h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-light-charcoal">
                        {body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THREE SEASONS - Before Planting, After Prosperity
          ══════════════════════════════════════════════════════════ */}
      <section id="calendar" className="scroll-mt-24 bg-[#4A5C4E] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Top Label */}
          <div className="text-center">
            <Reveal>
              <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-white/60">
                A modern proposal
              </span>
            </Reveal>
          </div>

          {/* Main Heading */}
          <div className="mt-6 text-center">
            <Reveal delay={100}>
              <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-white">
                Three seasons, the same order every year.
              </h2>
            </Reveal>
          </div>

          {/* Season Pills - Interactive */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {SEASONS.map((s, i) => (
              <Reveal key={s.id} delay={150 + i * 30}>
                <button
                  type="button"
                  onClick={() => setActiveSeason(i)}
                  className={`rounded-full px-6 py-2 font-body text-sm font-semibold transition-all duration-300 ${
                    i === activeSeason
                      ? 'bg-luxury-gold text-dark-charcoal scale-105'
                      : 'border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20'
                  }`}
                >
                  {s.name}
                </button>
              </Reveal>
            ))}
          </div>

          {/* Content Grid: Image Left, Dynamic Content Right */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            
            {/* Left Column - Dynamic Image based on active season */}
            <Reveal delay={200} key={`season-img-${season.id}`}>
              <div className="overflow-hidden rounded-3xl aspect-[4/3]">
                <EstateImage
                  slug={season.image || 'farming'}
                  alt={`${season.name} season farming`}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-all duration-500"
                />
              </div>
            </Reveal>

            {/* Right Column - Dynamic Content */}
            <div className="flex flex-col justify-center space-y-8">
              
              {/* Project Title */}
              <Reveal delay={250}>
                <h3 className="font-heading text-3xl font-bold text-white">
                  Seasonal Farming Cycle
                </h3>
              </Reveal>

              {/* Active Season Title */}
              <Reveal delay={280}>
                <div className="space-y-3">
                  <h4 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-luxury-gold">
                    {season.name} ({season.range})
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    {season.sown}
                  </p>
                </div>
              </Reveal>

              {/* Tended Section */}
              <Reveal delay={310}>
                <div className="space-y-3">
                  <h4 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-luxury-gold">
                    Tended
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    {season.tended}
                  </p>
                </div>
              </Reveal>

              {/* Composted Section */}
              <Reveal delay={340}>
                <div className="space-y-3">
                  <h4 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-luxury-gold">
                    Composted
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    {season.composted}
                  </p>
                </div>
              </Reveal>

              {/* Learn More Button */}
              <Reveal delay={370}>
                <button className="group inline-flex items-center gap-3 self-start rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-dark-charcoal shadow-lg transition-all hover:scale-105 hover:bg-luxury-gold hover:text-white">
                  <span>Learn More</span>
                  <FiArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Reveal>

            </div>

          </div>
        </div>
      </section>

      {/* ── CLOSING · SIGN-OFF ───────────────────────────────────── */}
      <section className="bg-deep-forest px-6 pb-20 pt-4 md:px-10 md:pb-28">
        <div className="mx-auto max-w-editorial">
          <div className="grid gap-8 border-t border-luxury-gold/40 pt-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(1.75rem,3.6vw,3rem)] font-light leading-tight text-ivory-white">
                Walk the beds
                <span className="italic text-luxury-gold"> whatever the season.</span>
              </h2>
              <span className="mt-4 block font-hand text-xl text-luxury-gold">
                — recorded by the farm team, every season
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link
                to="/enquire"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white underline decoration-luxury-gold/50 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                Enquire about a visit →
              </Link>
              <Link
                to="/agro-farming"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white/70 underline decoration-luxury-gold/30 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                Back to Agro Farming →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
