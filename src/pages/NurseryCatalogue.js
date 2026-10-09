import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

/* Ordinary horticultural facts, safe to state plainly — but framed as what
   this actually is on the estate: stock the nursery propagates for its own
   rooms and grounds, not a retail catalogue. */
const FEATURES = [
  {
    label: 'Air purifying',
    body: 'Cleans the air of the room they stand in',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
  },
  {
    label: 'Low maintenance',
    body: 'Right for a guest room nobody waters daily',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Ornamental',
    body: 'Chosen for how they look, not only what they do',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    label: 'Wellness',
    body: 'Proven to lift mood and focus indoors',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: 'Grown here',
    body: 'Propagated on the estate, never bought in',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 19V6m0 0l-3 3m3-3l3 3M6 19a6 6 0 016-6 6 6 0 016 6" />
      </svg>
    ),
  },
];


const BADGES = [
  'Premium quality plants',
  'Climate-controlled nursery',
  'Organic & natural growth',
  'Expert horticulture team',
  'Grown for the estate, never sold',
];

const TOP_SELLING_PLANTS = [
  {
    id: 1,
    name: 'Snake Plant',
    botanical: '(Sansevieria)',
    image: '/images/opt/snake-plant.png',
    feature1: 'Air Purifier • Low Light',
    feature2: 'Very Low Maintenance',
    iconType: 'air',
  },
  {
    id: 2,
    name: 'Peace Lily',
    botanical: '(Spathiphyllum)',
    image: '/images/opt/lilyplant.png',
    feature1: 'Air Purifier • Beautiful Blooms',
    feature2: 'Low to Medium Light',
    iconType: 'bloom',
  },
  {
    id: 3,
    name: 'ZZ Plant',
    botanical: '(Zamioculcas zamiifolia)',
    image: '/images/opt/ZZ_Plant.png',
    feature1: 'Low Light Tolerant',
    feature2: 'Very Low Maintenance',
    iconType: 'plant',
  },
  {
    id: 4,
    name: 'Pothos',
    botanical: '(Epipremnum aureum)',
    image: '/images/opt/Golden_Pothos.png',
    feature1: 'Easy to Grow',
    feature2: 'Purifies Indoor Air',
    iconType: 'leaf',
  },
  {
    id: 5,
    name: 'Spider Plant',
    botanical: '(Chlorophytum comosum)',
    image: '/images/opt/Spider_Plants.png',
    feature1: 'Air Purifier • Non Toxic',
    feature2: 'Best for Hanging Baskets',
    iconType: 'air',
  },
  {
    id: 6,
    name: 'Rubber Plant',
    botanical: '(Ficus elastica)',
    image: '/images/opt/Rubber_Tree_Plant_.png',
    feature1: 'Large Air Purifier',
    feature2: 'Bright Indirect Light',
    iconType: 'leaf',
  },
  {
    id: 7,
    name: 'Areca Palm',
    botanical: '(Dypsis lutescens)',
    image: '/images/opt/Areca_Palm.png',
    feature1: 'Natural Humidifier',
    feature2: 'Bright Indirect Light',
    iconType: 'water',
  },
  {
    id: 8,
    name: 'Aglaonema',
    botanical: '(Chinese Evergreen)',
    image: '/images/opt/Aglaonema_White.png',
    feature1: 'Low Light Tolerant',
    feature2: 'Attractive Foliage',
    iconType: 'plant',
  },
  {
    id: 9,
    name: 'Monstera',
    botanical: '(Monstera deliciosa)',
    image: '/images/opt/Monstera_Plant.png',
    feature1: 'Unique Look',
    feature2: 'Bright Indirect Light',
    iconType: 'sun',
  },
  {
    id: 10,
    name: 'Bamboo Palm',
    botanical: '(Chamaedorea seifrizii)',
    image: '/images/opt/Bamboo_plant.png',
    feature1: 'Air Purifier • Pet Friendly',
    feature2: 'Low to Bright Light',
    iconType: 'leaf',
  },
];

function PlantIcon({ type }) {
  if (type === 'water') {
    return (
      <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3c-2.5 3-6 7.5-6 11a6 6 0 1012 0c0-3.5-3.5-8-6-11z" />
      </svg>
    );
  }
  if (type === 'sun') {
    return (
      <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    );
  }
  if (type === 'bloom') {
    return (
      <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2a4 4 0 00-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 00-4-4zm-5 8a4 4 0 00-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 00-4-4zm10 0a4 4 0 00-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 00-4-4z" />
      </svg>
    );
  }
  if (type === 'air') {
    return (
      <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19V6m0 0l-3 3m3-3l3 3M6 19a6 6 0 016-6 6 6 0 016 6" />
    </svg>
  );
}

export default function NurseryCatalogue() {
  return (
    <main className="bg-ivory-white">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-ivory-white">
        <div className="relative flex h-screen w-full">
          {/* Left Content Area - Ivory White Background */}
          <div className="relative z-20 flex w-full flex-col justify-between px-8 py-16 pt-28 lg:w-[45%] lg:px-16 lg:py-20 lg:pt-36">
            {/* Top Content */}
            <div>
              {/* Main Heading */}
              <h1 className="font-heading text-[clamp(3rem,8vw,5.5rem)] font-light uppercase leading-[0.95] tracking-tight text-deep-forest">
                Indoor
                <br />
                Plantation
              </h1>

              {/* Decorative Line */}
              <div className="mt-8 h-[2px] w-16 bg-luxury-gold"></div>

              {/* Body Copy */}
              <div className="mt-10 max-w-sm space-y-3 font-body text-[0.95rem] font-light leading-[1.8] text-light-charcoal">
                <p>Transform your indoor spaces with lush greenery.</p>
                <p>Curated plants for every room, bringing nature closer to home.</p>
                <p>Expert care and sustainable growth guaranteed.</p>
              </div>

              {/* CTA Button */}
              <a
                href="#catalogue"
                className="mt-12 inline-block rounded-full bg-forest-green px-10 py-3.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ivory-white transition-colors duration-400 hover:bg-luxury-gold hover:text-deep-forest"
              >
                Explore Plants
              </a>
            </div>

            {/* Bottom Label */}
            <div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-light-charcoal/60">
                Bambardara Estate
              </span>
            </div>
          </div>

          {/* Right Image Section with Organic Curve Cutout */}
          <div className="absolute right-0 top-0 h-screen w-full lg:w-[65%]">
            {/* White Curve Overlay - Creates the flowing S-curve */}
            <div className="absolute left-0 top-0 z-10 h-full w-[200px] lg:w-[280px]">
              <svg
                viewBox="0 0 280 1000"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                {/* Smooth organic flowing curve */}
                <path
                  d="M 0,0 
                     C 180,70 200,140 140,260 
                     C 90,370 120,480 160,600
                     C 190,700 180,830 0,1000 
                     L 0,0 Z"
                  fill="#FDFBF7"
                />
              </svg>
            </div>

            {/* Image Container */}
            <div className="h-full w-full">
              <EstateImage
                slug="nursery-indoor-plants"
                alt="Indoor courtyard with plants"
                sizes="(min-width: 1024px) 65vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Navigation Dots - Bottom Right */}
        <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-3">
          <button 
            className="h-2 w-2 rounded-full bg-forest-green/40 transition-all hover:bg-forest-green"
            aria-label="Slide 1"
          ></button>
          <button 
            className="h-2 w-2 rounded-full bg-forest-green"
            aria-label="Slide 2"
          ></button>
          <button 
            className="h-2 w-2 rounded-full bg-forest-green/40 transition-all hover:bg-forest-green"
            aria-label="Slide 3"
          ></button>
        </div>
      </section>

      {/* ── PLANTS CATALOGUE GRID ───────────────────────────────── */}
      <section id="catalogue" className="scroll-mt-20 bg-deep-forest px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <h2 className="mb-12 text-center font-heading text-3xl font-light text-ivory-white md:text-4xl">
            Our Top Selling
          </h2>

          {/* Top Selling Plants Grid - 5 columns on desktop matching reference layout */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {TOP_SELLING_PLANTS.map((plant) => (
              <div
                key={plant.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-ivory-white/20 bg-forest-green/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-luxury-gold/50 hover:bg-forest-green/40 hover:shadow-luxury-lg"
              >
                {/* Header: Number Badge & Names */}
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-forest-green/90 font-mono text-xs font-bold text-luxury-gold border border-luxury-gold/40">
                    {plant.id}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-ivory-white leading-tight">
                      {plant.name}
                    </h3>
                    <p className="mt-0.5 font-body text-[0.7rem] font-light italic text-luxury-gold/90 leading-tight">
                      {plant.botanical}
                    </p>
                  </div>
                </div>

                {/* Plant Specimen Image */}
                <div className="my-5 flex h-44 items-end justify-center">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="h-full w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Bottom Feature Pill */}
                <div className="mt-auto flex items-center gap-2.5 rounded-lg border border-ivory-white/10 bg-deep-forest/70 p-2.5 backdrop-blur-sm">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-forest-green/60 border border-luxury-gold/30">
                    <PlantIcon type={plant.iconType} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="font-body text-[0.72rem] font-medium text-ivory-white leading-tight truncate">
                      {plant.feature1}
                    </p>
                    <p className="mt-0.5 font-body text-[0.66rem] font-light text-ivory-white/70 leading-tight truncate">
                      {plant.feature2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="border-b border-stone/80 bg-warm-sand/20 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-stone/70 bg-white/70 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-luxury-gold/60 hover:bg-white hover:shadow-luxury-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest-green/10 text-forest-green transition-all duration-300 group-hover:bg-forest-green group-hover:text-luxury-gold">
                    {f.icon}
                  </div>
                  <span className="block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-forest-green">
                    {f.label}
                  </span>
                  <div className="my-3 h-px w-8 bg-luxury-gold/40 transition-all duration-300 group-hover:w-12 group-hover:bg-luxury-gold" />
                  <span className="block font-body text-xs font-light leading-relaxed text-light-charcoal">
                    {f.body}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT SPACES / GALLERY ───────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FBF9F5] px-6 py-16 md:px-12 md:py-24 border-b border-stone/60">
        {/* Top-Right Decorative Foliage Accent */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-70 md:h-56 md:w-56">
          <svg viewBox="0 0 200 200" className="h-full w-full fill-forest-green/20">
            <path d="M180,0 C120,20 80,60 60,120 C100,100 140,80 180,0 Z M140,0 C100,30 60,70 30,130 C70,110 110,80 140,0 Z M200,40 C150,70 110,110 90,170 C130,140 170,110 200,40 Z" />
          </svg>
        </div>

        {/* Bottom-Right Decorative Foliage Accent */}
        <div className="pointer-events-none absolute -bottom-8 -right-6 h-36 w-36 opacity-60 md:h-48 md:w-48">
          <svg viewBox="0 0 200 200" className="h-full w-full fill-forest-green/20">
            <path d="M200,160 C140,140 100,100 80,40 C120,60 160,80 200,160 Z M160,200 C120,170 80,130 50,70 C90,90 130,120 160,200 Z" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Section Heading */}
          <div className="mb-10 text-left">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-deep-forest md:text-3xl lg:text-[2.2rem]">
              PROJECT SPACES &amp; LIVING ARCHITECTURE
            </h2>
          </div>

          {/* Mosaic Gallery Layout */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
            {/* Left Large Vertical Image */}
            <div className="group relative overflow-hidden rounded-xl border border-stone/60 bg-warm-sand/30 shadow-sm transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-luxury-lg lg:col-span-6 lg:h-[540px]">
              <img
                src="/images/opt/plantation.jpg"
                alt="Main Indoor Living Garden Area"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6 lg:h-[540px]">
              {/* Top-Left: Garden patio */}
              <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-stone/60 bg-warm-sand/30 shadow-sm transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-luxury-lg lg:aspect-auto lg:h-[258px]">
                <img
                  src="/images/opt/plant.jpg"
                  alt="Outdoor Garden Seating"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Top-Right: Aerial canopy walkway */}
              <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-stone/60 bg-warm-sand/30 shadow-sm transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-luxury-lg lg:aspect-auto lg:h-[258px]">
                <img
                  src="/images/opt/sappling.jpg"
                  alt="Aerial View Garden Walkways"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bottom-Left: Balcony nook */}
              <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-stone/60 bg-warm-sand/30 shadow-sm transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-luxury-lg lg:aspect-auto lg:h-[258px]">
                <img
                  src="/images/opt/plantt.jpg"
                  alt="Cozy Balcony Lounge"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bottom-Right: Skylight water feature */}
              <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-stone/60 bg-warm-sand/30 shadow-sm transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-luxury-lg lg:aspect-auto lg:h-[258px]">
                <img
                  src="/images/opt/plan.jpg"
                  alt="Skylight Architectural Court"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTANICAL KNOWLEDGE BANNER ─────────────────────────── */}
      <section className="bg-ivory-white px-4 py-6 sm:px-6 md:px-10 md:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative flex min-h-[140px] md:min-h-[170px] w-full items-center justify-between overflow-hidden rounded-2xl border border-stone/50 bg-gradient-to-r from-[#D7E3DC] via-[#E6EDE8] to-[#D5E1DA] px-6 py-6 shadow-sm sm:px-10 sm:py-7 md:px-12 md:py-8">
            {/* Left Content */}
            <div className="relative z-10 flex flex-col items-start justify-center gap-3 sm:gap-4 md:gap-5">
              <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-[#2B3D32] sm:text-2xl md:text-3xl lg:text-[1.9rem]">
                BOTANICAL CARE &amp; KNOWLEDGE
              </h3>
              <a
                href="#catalogue"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 sm:px-7 sm:py-2.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[#33473B] shadow-sm transition-all duration-300 hover:bg-[#2B3D32] hover:text-white hover:shadow-md"
              >
                EXPLORE NOW
              </a>
            </div>

            {/* Right Leaf Branch Graphic */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-2/5 sm:w-1/3 md:w-1/4 lg:w-[260px] overflow-hidden">
              <img
                src="/images/opt/eucalyptus_branch_hd.png"
                alt="Eucalyptus foliage"
                className="h-full w-full object-cover object-left mix-blend-multiply opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US ────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-16 md:px-12 md:py-24 border-t border-stone/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
            {/* Left Plant Illustration */}
            <div className="flex items-center justify-center md:col-span-5">
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-md">
                <img
                  src="/images/opt/indorep.jpg"
                  alt="About Us Plant"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="flex flex-col items-start md:col-span-7">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-[#2B3D32] sm:text-3xl lg:text-[2.1rem]">
                ABOUT US
              </h2>

              <p className="mt-6 font-body text-[0.88rem] sm:text-[0.92rem] font-light leading-[1.85] text-light-charcoal/90 text-justify">
                From our perspective, cultivating and nurturing living greenery is a deeply fulfilling passion, and bringing nature into everyday spaces is essential. Understanding our craft thoroughly, we pay meticulous attention to every detail—soil composition, humidity, light exposure, and optimal placement—to offer expert guidance that guarantees your plants remain vibrant, resilient, and perfectly suited to your home.
              </p>

              <div className="mt-8">
                <a
                  href="#catalogue"
                  className="inline-flex items-center justify-center rounded-full bg-[#528F6D] px-8 py-2.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white shadow-sm transition-all duration-300 hover:bg-[#2B3D32] hover:shadow-md"
                >
                  EXPLORE NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deep-forest px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-ivory-white/15 pt-8">
            {BADGES.map((b) => (
              <span
                key={b}
                className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-ivory-white/55"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(1.75rem,3.6vw,3rem)] font-light leading-tight text-ivory-white">
                Ask which room
                <span className="italic text-luxury-gold"> yours will have.</span>
              </h2>
              <span className="mt-4 block font-hand text-xl text-luxury-gold">
                — every cutting dated the day it was taken
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link
                to="/enquire"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white underline decoration-luxury-gold/50 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                Enquire about a stay →
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
