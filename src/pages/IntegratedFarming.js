import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiChevronRight, FiDroplet, FiRefreshCw, FiTruck } from 'react-icons/fi';
import { PiLeaf, PiPlant } from 'react-icons/pi';
import { GiPlantSeed, GiWheat, GiFruitBowl, GiFlowerPot } from 'react-icons/gi';
import { TbClipboardData } from 'react-icons/tb';
import { BsBarChartLine } from 'react-icons/bs';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

/* ─────────────────────────────────────────────────────────────────────────────
   REDESIGNED AGRO FARMING PAGE
   
   Design Philosophy:
   - Immersive storytelling through full-bleed imagery
   - Card-based interactive farm plots (replacing complex SVG)
   - Cleaner visual hierarchy with breathing room
   - Better mobile-first responsive design
   - Contemporary luxury aesthetic with better spacing
   ───────────────────────────────────────────────────────────────────────────── */

/* Ordered and sized by acreage rather than uniformly — the biggest working
   plots (rice, trails/water) get the widest tiles and a wider photo crop, the
   smallest (the compost yard) gets the smallest, so the grid itself reads as
   a rough map of the estate's proportions instead of a flat photo gallery. */
const PLOTS = [
  {
    id: 'rice',
    n: '01',
    name: 'The Rice Terraces',
    acres: '54 acres',
    blurb:
      'Transplanted by hand in June and cut in October. Wheat and gram go in straight behind it while the soil still holds the rain.',
    sends: 'Grain to the kitchen, residue for composting',
    slug: 'farming',
    alt: 'The rice harvest across the estate terraces',
    link: { to: '/enquire', label: 'Come for harvest' },
    icon: GiWheat,
    color: 'from-yellow-800 to-amber-700',
    span: 'sm:col-span-3',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'trails',
    n: '02',
    name: 'Trails & Water Sources',
    acres: '26 acres',
    blurb:
      'Spring-fed streams run down through the forest edge and feed the irrigation tanks below. The morning farm walk starts here.',
    sends: 'Water to every plot on the plan',
    slug: 'nature',
    alt: 'Guests walking the estate terraces',
    link: { to: '/experiences/adventures', label: 'Walk the trails' },
    icon: FiDroplet,
    color: 'from-blue-900 to-cyan-800',
    span: 'sm:col-span-3',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'orchard',
    n: '03',
    name: 'The Orchard',
    acres: '12 acres',
    blurb:
      'Mango, chikoo and jackfruit along the eastern boundary, planted by the grandparents of the men who prune them now.',
    sends: 'Fruit to the kitchen, prunings to the compost yard',
    slug: 'farm',
    alt: 'The estate orchards at golden hour',
    link: { to: '/enquire', label: 'Pick in season' },
    icon: GiFruitBowl,
    color: 'from-orange-800 to-red-700',
    span: 'sm:col-span-2',
    aspect: 'aspect-square',
  },
  {
    id: 'beds',
    n: '04',
    name: 'The Walled Beds',
    acres: '9 acres',
    blurb:
      'Seasonal vegetables in rotation, worked by hand every morning. Cut against the kitchen order for that day, never before it.',
    sends: 'Fresh vegetables to the kitchen daily',
    slug: 'organic-farming-and-farm-stay',
    alt: 'Organic vegetable beds beside the farmhouse',
    link: { to: '/#dining', label: 'See the kitchen' },
    icon: PiLeaf,
    color: 'from-lime-800 to-green-700',
    span: 'sm:col-span-2',
    aspect: 'aspect-square',
  },
  {
    id: 'nursery',
    n: '05',
    name: 'High-Tech Nursery',
    acres: 'Under cover',
    blurb:
      'A climate-controlled polyhouse where every sapling on the estate starts its life with temperature, humidity and irrigation monitored daily, well before a single seedling goes out to the terraces or the orchard.',
    sends: 'Saplings to the orchard and beds, herbs to the kitchen year-round',
    slug: 'high-tech-nursery-facility',
    alt: 'Rows of lettuce under grow-lights in the estate vertical nursery',
    link: { to: '/enquire', label: 'Ask about the nursery' },
    icon: GiPlantSeed,
    color: 'from-teal-800 to-cyan-700',
    span: 'sm:col-span-2',
    aspect: 'aspect-square',
  },
  {
    id: 'compost',
    n: '06',
    name: 'The Compost Yard',
    acres: '4 acres',
    blurb:
      'Natural composting where organic waste is transformed through the monsoon and turned three times, creating rich soil for the beds and terraces.',
    sends: 'Natural compost to the beds and the terraces',
    slug: 'organic-farming-landscape',
    alt: 'The organic compost yard',
    link: { to: '/enquire', label: 'See how it works' },
    icon: FiRefreshCw,
    color: 'from-stone-800 to-slate-700',
    span: 'sm:col-span-2',
    aspect: 'aspect-square',
  },
];

const FARM_CYCLE = [
  { from: 'The terraces and beds', to: 'the compost yard', what: 'Plant residue' },
  { from: 'The compost yard', to: 'the terraces and beds', what: 'Natural fertility' },
  { from: 'The orchard', to: 'the compost yard', what: 'Prunings and leaves' },
  { from: 'All of it', to: 'your table', what: 'Daily harvest' },
];

const DISCIPLINES = [
  {
    slug: 'organic-farming',
    alt: 'Young crop rows in rich, dark soil',
    icon: PiLeaf,
    title: 'Organic Farming',
    body: 'Rice, vegetables and orchard fruit grown on compost and rotation with never a synthetic input, all worked by hand.',
    to: '/agro-farming/organic-farming',
  },
  {
    slug: 'high-tech-nursery-facility',
    alt: 'Rows of lettuce under grow-lights in the estate vertical nursery',
    icon: GiPlantSeed,
    title: 'High-Tech Nursery',
    body: 'A climate-controlled polyhouse where temperature, humidity and irrigation are monitored daily. Every sapling starts here.',
    to: '/agro-farming/high-tech-nursery',
  },
  {
    slug: 'indoor-plant',
    alt: 'Potted plants on a sunlit indoor shelf',
    icon: PiPlant,
    title: 'Indoor Plantation',
    body: 'A soil-less growing section under cover, raising the kitchen herbs fresh and out of season, year-round.',
    to: '/agro-farming/nursery',
  },
];

export default function AgroFarming() {
  const [activePlot, setActivePlot] = useState(null);

  return (
    <main className="bg-ivory-white">
      {/* ══════════════════════════════════════════════════════════
          HERO - Innovating Sustainable Agriculture Systems
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <EstateImage
            slug="farming"
            alt="The estate's fields at harvest"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
          {/* Black overlay for darker appearance */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[70vh] flex-col justify-end px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              
              {/* Left - Heading */}
              <div className="max-w-2xl">
                <Reveal>
                  <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.1] tracking-tight text-white">
                    Innovating Sustainable
                    <br />
                    Agriculture Systems
                  </h1>
                </Reveal>
              </div>

              {/* Right - Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Reveal delay={100}>
                  <Link
                    to="/enquire"
                    className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-6 py-3 font-body text-sm font-semibold text-dark-charcoal shadow-xl transition-all duration-300 hover:scale-105 hover:bg-muted-gold"
                  >
                    <span>Explore Systems</span>
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </Reveal>

                <Reveal delay={150}>
                  <Link
                    to="/enquire"
                    className="group inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-body text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20"
                  >
                    <span>Learn More</span>
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </Reveal>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          QUALITY CHECK - Evaluating Crop Quality In Field
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            {/* Left - Images */}
            <div className="space-y-6">
              <Reveal>
                <div className="overflow-hidden rounded-3xl">
                  <EstateImage
                    slug="evaluate"
                    alt="Evaluating crop quality in the field"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-video h-full w-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="overflow-hidden rounded-3xl">
                  <EstateImage
                    slug="farmer"
                    alt="Farmers evaluating crop quality"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-video h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>

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
                <p className="font-body text-base leading-relaxed text-light-charcoal">
                  Our objective is to craft meaningful solutions that elevate identity and inspire reliability.
                </p>
              </Reveal>

              <Reveal delay={300}>
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

              <Reveal delay={350}>
                <button className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-8 py-4 font-body text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-muted-gold">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat With Us</span>
                </button>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SUSTAINABLE GROWTH - Services Section
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1B4D3E] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center">
            <Reveal>
              <span className="inline-block font-body text-sm uppercase tracking-[0.2em] text-white/70">
                Our Services
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
                Sustainable Growth For Farms
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-white/80">
                Empowering farmers with innovative solutions for sustainable agriculture and long-term productivity
              </p>
            </Reveal>
          </div>

          {/* Service Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            
            {/* Card 1 - Harvest Services */}
            <Reveal delay={200}>
              <div className="group rounded-3xl bg-white p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B4D3E]">
                  <GiWheat className="h-8 w-8 text-luxury-gold" />
                </div>
                
                <h3 className="mt-6 font-heading text-2xl font-bold text-dark-charcoal">
                  Harvest Services
                </h3>

                <p className="mt-4 font-body text-sm leading-relaxed text-light-charcoal">
                  Professional harvesting solutions with modern equipment and trained teams ensuring maximum yield recovery and minimal crop loss during harvest season.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1B4D3E] transition-all hover:gap-3">
                  <span>Learn More</span>
                  <FiArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            {/* Card 2 - Land Cultivation */}
            <Reveal delay={250}>
              <div className="group rounded-3xl bg-white p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B4D3E]">
                  <PiLeaf className="h-8 w-8 text-luxury-gold" />
                </div>
                
                <h3 className="mt-6 font-heading text-2xl font-bold text-dark-charcoal">
                  Land Cultivation
                </h3>

                <p className="mt-4 font-body text-sm leading-relaxed text-light-charcoal">
                  Expert land preparation and cultivation services using sustainable practices that improve soil health while preparing optimal growing conditions.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1B4D3E] transition-all hover:gap-3">
                  <span>Learn More</span>
                  <FiArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            {/* Card 3 - Farm Management */}
            <Reveal delay={300}>
              <div className="group rounded-3xl bg-white p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B4D3E]">
                  <GiPlantSeed className="h-8 w-8 text-luxury-gold" />
                </div>
                
                <h3 className="mt-6 font-heading text-2xl font-bold text-dark-charcoal">
                  Farm Management
                </h3>

                <p className="mt-4 font-body text-sm leading-relaxed text-light-charcoal">
                  Comprehensive farm management support including planning, resource optimization, and expert guidance for improved productivity and profitability.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-[#1B4D3E] transition-all hover:gap-3">
                  <span>Learn More</span>
                  <FiArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

          </div>

          {/* See All Services Button */}
          <Reveal delay={350}>
            <div className="mt-12 text-center">
              <Link
                to="/enquire"
                className="group inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-body text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20"
              >
                <span>See All Services</span>
                <FiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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

      {/* ══════════════════════════════════════════════════════════
          THREE SEASONS - Before Planting, After Prosperity
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#4A5C4E] px-6 py-20 md:px-10 md:py-28">
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
                Before Planting. After Prosperity
              </h2>
            </Reveal>
          </div>

          {/* Season Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Reveal delay={150}>
              <span className="rounded-full bg-luxury-gold px-6 py-2 font-body text-sm font-semibold text-dark-charcoal">
                Spring
              </span>
            </Reveal>
            <Reveal delay={180}>
              <span className="rounded-full border-2 border-white/30 bg-white/10 px-6 py-2 font-body text-sm font-semibold text-white backdrop-blur-sm">
                Winter
              </span>
            </Reveal>
          </div>

          {/* Content Grid: Image Left, Text Right */}
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            
            {/* Left Column - Large Image */}
            <Reveal delay={200}>
              <div className="overflow-hidden rounded-3xl">
                <EstateImage
                  slug="farming"
                  alt="Soil preparation and irrigation"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center space-y-8">
              
              {/* Project Title */}
              <Reveal delay={250}>
                <h3 className="font-heading text-3xl font-bold text-white">
                  Soil Irrigation Project
                </h3>
              </Reveal>

              {/* Goals Section */}
              <Reveal delay={280}>
                <div className="space-y-3">
                  <h4 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-luxury-gold">
                    Goals
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    The seasons, rotating year upon year, dictate when to sow, when to harvest, and when to let the soil rest. Our objective is to follow this natural rhythm and prepare the land before each planting, ensuring prosperity follows.
                  </p>
                </div>
              </Reveal>

              {/* Our Approach Section */}
              <Reveal delay={310}>
                <div className="space-y-3">
                  <h4 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-luxury-gold">
                    Our approach
                  </h4>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    Before the monsoon breaks, the irrigation channels are cleared, drip lines laid, and soil fertility restored through composting. We align every action with the season: spring preparation, monsoon planting, winter harvest, summer rest. This way, the land gives back what we invest in it.
                  </p>
                </div>
              </Reveal>

              {/* Learn More Button */}
              <Reveal delay={340}>
                <button className="group inline-flex items-center gap-3 self-start rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-dark-charcoal shadow-lg transition-all hover:scale-105 hover:bg-luxury-gold hover:text-white">
                  <span>Learn More</span>
                  <FiArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Reveal>

            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THREE DISCIPLINES - Modern card grid
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-white px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="lux-label text-luxury-gold">Where It Starts</span>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-forest-green">
                Three disciplines,
                <span className="italic text-luxury-gold"> working as one.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {DISCIPLINES.map((d, i) => (
              <Reveal key={d.title} delay={i * 100}>
                <Link
                  to={d.to}
                  className="group relative overflow-hidden rounded-3xl bg-warm-sand transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <EstateImage
                      slug={d.slug}
                      alt={d.alt}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/50 to-transparent opacity-80" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/90 text-deep-forest backdrop-blur-sm">
                      <d.icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="mt-5 font-heading text-2xl font-light text-ivory-white">
                      {d.title}
                    </h3>
                    
                    <p className="mt-3 font-body text-sm leading-relaxed text-ivory-white/80">
                      {d.body}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-luxury-gold">
                      Explore
                      <FiChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FARM PLOTS - Interactive card-based explorer
          ══════════════════════════════════════════════════════════ */}
      <section id="explore" className="scroll-mt-20 bg-deep-forest px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-luxury-gold">
                The Estate Plan
              </span>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-ivory-white">
                Six plots,
                <span className="italic text-luxury-gold"> one ecosystem.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 font-body text-lg font-light leading-relaxed text-ivory-white/70">
                From ground level it's six separate jobs. From above, it's one shape—worked the same way for sixty years.
              </p>
            </Reveal>
          </div>

          {/* Plot Cards Grid — sized by acreage, not uniform, so the layout
              itself reads as a rough map of the estate rather than a plain
              photo gallery. */}
          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-6">
            {PLOTS.map((plot, i) => (
              <Reveal key={plot.id} delay={i * 80} className={plot.span}>
                <button
                  onClick={() => setActivePlot(activePlot === plot.id ? null : plot.id)}
                  className={`group relative h-full w-full overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                    activePlot === plot.id
                      ? 'border-luxury-gold bg-luxury-gold/5 shadow-xl shadow-luxury-gold/20'
                      : 'border-ivory-white/10 bg-ivory-white/5 hover:border-luxury-gold/50 hover:bg-ivory-white/10'
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${plot.aspect} overflow-hidden`}>
                    <EstateImage
                      slug={plot.slug}
                      alt={plot.alt}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${plot.color} opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-transparent opacity-90" />

                    {/* Plot Number */}
                    <div className="absolute left-4 top-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        activePlot === plot.id
                          ? 'border-luxury-gold bg-luxury-gold text-deep-forest'
                          : 'border-ivory-white/40 bg-deep-forest/60 text-ivory-white backdrop-blur-sm'
                      }`}>
                        <span className="font-mono text-xs font-bold">{plot.n}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="absolute right-4 top-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory-white/10 text-ivory-white backdrop-blur-sm">
                        <plot.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 text-left">
                    <h3 className="font-heading text-xl font-light text-ivory-white">
                      {plot.name}
                    </h3>
                    
                    <div className="mt-2 font-mono text-xs uppercase tracking-wider text-luxury-gold/80">
                      {plot.acres}
                    </div>

                    <div className={`mt-4 overflow-hidden transition-all duration-500 ${
                      activePlot === plot.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="font-body text-sm leading-relaxed text-ivory-white/70">
                        {plot.blurb}
                      </p>

                      <div className="mt-4 rounded-lg border border-luxury-gold/20 bg-luxury-gold/5 p-3">
                        <div className="font-mono text-xs uppercase tracking-wider text-luxury-gold">
                          Sends
                        </div>
                        <div className="mt-1 font-body text-xs leading-relaxed text-ivory-white/80">
                          {plot.sends}
                        </div>
                      </div>

                      <Link
                        to={plot.link.to}
                        className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-luxury-gold hover:text-ivory-white"
                      >
                        {plot.link.label}
                        <FiArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {activePlot !== plot.id && (
                      <div className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ivory-white/50">
                        Tap to explore
                        <FiChevronRight className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          THE CYCLE - Visual flow diagram
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-warm-sand px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Reveal>
              <span className="lux-label text-luxury-gold">The Regenerative Loop</span>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-forest-green">
                What makes it
                <span className="italic text-luxury-gold"> regenerative</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-2xl font-body text-lg font-light leading-relaxed text-light-charcoal">
                A plot on its own is just a field. The farm becomes regenerative when each plot feeds the others.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 space-y-6">
            {FARM_CYCLE.map((flow, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-stone/30 bg-ivory-white p-8 transition-all duration-500 hover:border-luxury-gold/50 hover:shadow-lg md:p-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                    {/* Number */}
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-forest-green text-luxury-gold">
                      <span className="font-heading text-2xl font-light">{String(i + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:gap-8">
                      <div className="flex-1">
                        <div className="font-heading text-xl font-light text-forest-green md:text-2xl">
                          {flow.from}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 md:flex-shrink-0">
                        <div className="h-px flex-1 bg-luxury-gold/30 md:w-12 md:flex-initial" />
                        <div className="whitespace-nowrap font-body text-sm italic text-light-charcoal/60">
                          {flow.what}
                        </div>
                        <FiArrowUpRight className="h-5 w-5 flex-shrink-0 text-luxury-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>

                      <div className="flex-1">
                        <div className="font-heading text-xl font-light italic text-luxury-gold md:text-2xl">
                          {flow.to}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CLOSING CTA
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-deep-forest px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <Reveal>
                <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-light leading-tight text-ivory-white">
                  Come walk
                  <span className="italic text-luxury-gold"> the plan.</span>
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-6 font-body text-lg font-light leading-relaxed text-ivory-white/70">
                  The farm is open every morning. Walk the terraces, meet the herd, see where your meal comes from.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-4">
              <Reveal delay={150}>
                <Link
                  to="/enquire"
                  className="group flex items-center justify-between rounded-2xl border border-luxury-gold/30 bg-luxury-gold/5 p-6 transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold/10"
                >
                  <div>
                    <div className="font-body text-sm uppercase tracking-wider text-luxury-gold">
                      Primary
                    </div>
                    <div className="mt-1 font-heading text-xl text-ivory-white">
                      Enquire About a Visit
                    </div>
                  </div>
                  <FiArrowUpRight className="h-6 w-6 text-luxury-gold transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </Reveal>

              <Reveal delay={200}>
                <Link
                  to="/stays/farm-stay"
                  className="group flex items-center justify-between rounded-2xl border border-ivory-white/10 bg-ivory-white/5 p-6 transition-all duration-300 hover:border-ivory-white/30 hover:bg-ivory-white/10"
                >
                  <div>
                    <div className="font-body text-sm uppercase tracking-wider text-ivory-white/60">
                      Stay
                    </div>
                    <div className="mt-1 font-heading text-xl text-ivory-white">
                      The Farmhouse
                    </div>
                  </div>
                  <FiChevronRight className="h-6 w-6 text-ivory-white/60 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>

              <Reveal delay={250}>
                <a
                  href="tel:+917588775757"
                  className="group flex items-center justify-between rounded-2xl border border-ivory-white/10 bg-ivory-white/5 p-6 transition-all duration-300 hover:border-ivory-white/30 hover:bg-ivory-white/10"
                >
                  <div>
                    <div className="font-body text-sm uppercase tracking-wider text-ivory-white/60">
                      Call
                    </div>
                    <div className="mt-1 font-heading text-xl text-ivory-white">
                      +91 75887 75757
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory-white/10">
                    <FiArrowUpRight className="h-5 w-5 text-ivory-white" />
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
