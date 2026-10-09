import Reveal from '../components/shared/Reveal';
import { GiWheat, GiNestEggs } from 'react-icons/gi';
import { MdRestaurant } from 'react-icons/md';
import { TbEgg } from 'react-icons/tb';

export default function PoultryFarming() {
  return (
    <main className="bg-ivory-white">
      {/* ══════════════════════════════════════════════════════════
          HERO SECTION - Smart Poultry Farming for a Better Future
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/opt/hen-hero.jpg"
            alt="Smart Poultry Farming"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
          <div className="flex min-h-[80vh] items-center">
            <div className="max-w-2xl space-y-8">
              
              {/* Main Heading */}
              <Reveal delay={100}>
                <h1 className="font-heading text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] text-white">
                  Smart Poultry Farming for a Better Future
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal delay={200}>
                <p className="max-w-xl font-body text-[1rem] leading-relaxed text-white/90">
                  Baraka connects chicken farmers, traders, and suppliers with technology and trusted solutions to grow productivity, open wider markets, and ensure sustainable poultry farming.
                </p>
              </Reveal>

              {/* CTA Buttons */}
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <button className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100">
                    <span>Explore Poultry Solutions</span>
                    <svg 
                      className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  <button className="group inline-flex items-center gap-3 rounded-full border-2 border-white bg-transparent px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:bg-white hover:text-gray-900">
                    <span>Get Free Consultation</span>
                    <svg 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT OUR POULTRY FARM - Three Column Layout
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* LEFT - Image with Eggs */}
            <Reveal className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-[3/4]">
                  <img
                    src="/images/opt/pout.jpg"
                    alt="Chickens in the coop with fresh eggs"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* CENTER - Content */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Badge */}
              <Reveal>
                <div className="flex items-center gap-2 text-luxury-gold">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M17 8L9 2L1 8V18H7V12H11V18H17V8Z" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-body text-sm font-medium">About Our Poultry Farm</span>
                </div>
              </Reveal>

              {/* Main Heading */}
              <Reveal delay={100}>
                <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.15] text-dark-charcoal">
                  Rooted in Nature,
                  <br />
                  Raised with Care
                </h2>
              </Reveal>

              {/* Description */}
              <Reveal delay={200}>
                <p className="font-body text-[0.9rem] font-light leading-relaxed text-light-charcoal">
                  Organico is built on the belief that real food starts with real farmers. We raise our poultry in open, clean spaces where they can roam freely and grow naturally. No shortcuts, no chemicals just honest, ethical practices. From hatch to harvest, every step is taken with care to ensure you get only the best quality chicken and eggs.
                </p>
              </Reveal>

              {/* Learn More Button */}
              <Reveal delay={250}>
                <button className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-7 py-3.5 font-body text-sm font-medium text-white shadow-lg transition-all hover:bg-muted-gold hover:shadow-xl">
                  <span>Learn More</span>
                  <svg 
                    className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Reveal>

              {/* Feature List */}
              <Reveal delay={300}>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold/20">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path 
                          d="M11.667 3.5L5.25 9.917 2.333 7" 
                          stroke="currentColor" className="text-luxury-gold" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-sm text-light-charcoal">
                      Ethical Farming for a Healthier Tomorrow
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-luxury-gold/20">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path 
                          d="M11.667 3.5L5.25 9.917 2.333 7" 
                          stroke="currentColor" className="text-luxury-gold" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-sm text-light-charcoal">
                      Your Source for Honest, Organic Poultry
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT - Image with Chickens in Field */}
            <Reveal delay={150} className="lg:col-span-4">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-[4/3]">
                  <img
                    src="/images/opt/cock.jpg"
                    alt="Free-range chickens in open field"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ORGANIC SERVICES - Four Cards with Center Chicken
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-soft-beige px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
            
            {/* Left - Title */}
            <div>
              <Reveal>
                <div className="flex items-center gap-2 text-luxury-gold">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M17 8L9 2L1 8V18H7V12H11V18H17V8Z" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-body text-sm font-medium">Our Services</span>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] text-dark-charcoal">
                  Organic Services
                  <br />
                  For All Your Needs
                </h2>
              </Reveal>
            </div>

            {/* Right - Description and Button */}
            <div className="flex flex-col gap-6 lg:items-end">
              <Reveal delay={150}>
                <p className="max-w-lg font-body text-[0.9rem] font-light leading-relaxed text-light-charcoal lg:text-right">
                  At Organico, we offer a range of poultry services designed to deliver quality, freshness, and trust. From supplying organic, free-range chickens...
                </p>
              </Reveal>
              <Reveal delay={200}>
                <button className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-7 py-3.5 font-body text-sm font-medium text-white shadow-lg transition-all hover:bg-muted-gold hover:shadow-xl">
                  <span>Learn More</span>
                  <svg 
                    className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Reveal>
            </div>
          </div>

          {/* Services Grid with Center Chicken */}
          <div className="relative flex items-center justify-center gap-8">
            
            {/* Left Side - 2 Cards */}
            <div className="hidden lg:flex lg:w-[35%] lg:flex-col lg:gap-8">
              {/* Card 1 - Top Left */}
              <Reveal delay={100}>
                <div className="group ml-auto w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <TbEgg className="text-3xl text-luxury-gold" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">
                    Farm-Fresh Eggs Delivery
                  </h3>
                  
                  {/* Description */}
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    We bring the farm to your table with services that prioritize local sourcing, seasonal freshness, and zero compromises.
                  </p>
                  
                  {/* Learn More Link */}
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal transition-colors hover:text-luxury-gold">
                    <span>Learn More</span>
                    <svg 
                      className="h-4 w-4 transition-transform group-hover/link:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>

              {/* Card 3 - Bottom Left */}
              <Reveal delay={300}>
                <div className="group ml-auto w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <MdRestaurant className="text-3xl text-luxury-gold" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">
                    Farm-to-Table Restaurant
                  </h3>
                  
                  {/* Description */}
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    All our poultry is raised with care and used exclusively in our on-site restaurant. Experience truly fresh, farm-to-table dining with every meal.
                  </p>
                  
                  {/* Learn More Link */}
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal transition-colors hover:text-luxury-gold">
                    <span>Learn More</span>
                    <svg 
                      className="h-4 w-4 transition-transform group-hover/link:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Center - Chicken Image */}
            <Reveal delay={250}>
              <div className="pointer-events-none z-20 hidden lg:block lg:w-[30%]">
                <div className="relative mx-auto h-[500px] w-[500px]">
                  <img
                    src="/images/opt/heen.png"
                    alt="Organic chicken"
                    className="h-full w-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </Reveal>

            {/* Right Side - 2 Cards */}
            <div className="hidden lg:flex lg:w-[35%] lg:flex-col lg:gap-8">
              {/* Card 2 - Top Right */}
              <Reveal delay={200}>
                <div className="group mr-auto w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <GiNestEggs className="text-3xl text-luxury-gold" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">
                    Farm-Fresh Eggs Delivery
                  </h3>
                  
                  {/* Description */}
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    We bring the farm to your table with services that prioritize local sourcing, seasonal freshness, and zero compromises.
                  </p>
                  
                  {/* Learn More Link */}
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal transition-colors hover:text-luxury-gold">
                    <span>Learn More</span>
                    <svg 
                      className="h-4 w-4 transition-transform group-hover/link:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>

              {/* Card 4 - Bottom Right */}
              <Reveal delay={400}>
                <div className="group mr-auto w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <GiWheat className="text-3xl text-luxury-gold" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">
                    Customized Feed Solutions
                  </h3>
                  
                  {/* Description */}
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    We partner with local farmers, feed suppliers, and retailers to deliver high-quality organic poultry in bulk.
                  </p>
                  
                  {/* Learn More Link */}
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal transition-colors hover:text-luxury-gold">
                    <span>Learn More</span>
                    <svg 
                      className="h-4 w-4 transition-transform group-hover/link:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Mobile - Stack all cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
              {/* All 4 cards for mobile */}
              <Reveal delay={100}>
                <div className="group rounded-3xl bg-white p-8 shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <TbEgg className="text-3xl text-luxury-gold" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">Farm-Fresh Eggs Delivery</h3>
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    We bring the farm to your table with services that prioritize local sourcing, seasonal freshness, and zero compromises.
                  </p>
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal">
                    <span>Learn More</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="group rounded-3xl bg-white p-8 shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <GiNestEggs className="text-3xl text-luxury-gold" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">Farm-Fresh Eggs Delivery</h3>
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    We bring the farm to your table with services that prioritize local sourcing, seasonal freshness, and zero compromises.
                  </p>
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal">
                    <span>Learn More</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
              
              <Reveal delay={300}>
                <div className="group rounded-3xl bg-white p-8 shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <MdRestaurant className="text-3xl text-luxury-gold" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">Farm-to-Table Restaurant</h3>
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    All our poultry is raised with care and used exclusively in our on-site restaurant for truly fresh dining.
                  </p>
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal">
                    <span>Learn More</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
              
              <Reveal delay={400}>
                <div className="group rounded-3xl bg-white p-8 shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream">
                    <GiWheat className="text-3xl text-luxury-gold" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-dark-charcoal">Customized Feed Solutions</h3>
                  <p className="mb-4 font-body text-sm font-light leading-relaxed text-light-charcoal">
                    We partner with local farmers, feed suppliers, and retailers to deliver high-quality organic poultry in bulk.
                  </p>
                  <button className="group/link flex items-center gap-2 font-body text-sm font-medium text-light-charcoal">
                    <span>Learn More</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BUILDING A BETTER FARM - Three Steps Cards
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            
            {/* Left - Badge and Title */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="font-body text-sm text-light-charcoal">Go the Stages</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.15] text-dark-charcoal">
                  Building a Better
                  <br />
                  Farm, Step by Step
                </h2>
              </Reveal>
            </div>

            {/* Right - Description and Button */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:items-end">
              <Reveal delay={150}>
                <p className="max-w-lg font-body text-[0.9rem] font-light leading-relaxed text-light-charcoal lg:text-right">
                  Organico, we don't just raise chickens—we build a system that values nature, animal welfare, and quality at every stage. From sustainable coops to happy, healthy birds, here's how we do it right.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <button className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-7 py-3.5 font-body text-sm font-medium text-white shadow-lg transition-all hover:bg-muted-gold hover:shadow-xl">
                  <span>See More Details</span>
                  <svg 
                    className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Reveal>
            </div>
          </div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1 - Sunset Farm Scene */}
            <Reveal delay={100}>
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/opt/poutry-farm.jpg"
                    alt="Free-range chickens at sunset"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                {/* Number Badge - Top Left */}
                <div className="absolute left-6 top-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="font-heading text-xl font-bold text-dark-charcoal">01</span>
                  </div>
                </div>

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Sustainable Farm Design
                  </h3>
                  <p className="mt-2 font-body text-sm font-light text-white/90">
                    Eco-friendly infrastructure built to support natural living
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2 - Chickens in Coop */}
            <Reveal delay={200}>
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/opt/healthy.jpg"
                    alt="Healthy chickens in the coop"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                {/* Number Badge - Top Left */}
                <div className="absolute left-6 top-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="font-heading text-xl font-bold text-dark-charcoal">02</span>
                  </div>
                </div>

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Happy, Healthy Birds
                  </h3>
                  <p className="mt-2 font-body text-sm font-light text-white/90">
                    Stress-free environment with room to roam and thrive
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3 - Person with Eggs */}
            <Reveal delay={300}>
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/opt/egg.jpg"
                    alt="Farm-fresh organic eggs"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                {/* Number Badge - Top Left */}
                <div className="absolute left-6 top-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="font-heading text-xl font-bold text-dark-charcoal">03</span>
                  </div>
                </div>

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    Premium Quality Output
                  </h3>
                  <p className="mt-2 font-body text-sm font-light text-white/90">
                    Fresh organic eggs and poultry raised with care
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Pagination Dots */}
          <Reveal delay={400}>
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="h-2 w-2 rounded-full bg-luxury-gold transition-all" />
              <button className="h-2 w-2 rounded-full bg-luxury-gold/30 transition-all hover:bg-luxury-gold/50" />
              <button className="h-2 w-2 rounded-full bg-luxury-gold/30 transition-all hover:bg-luxury-gold/50" />
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PREMIUM POULTRY PRODUCTS - Four Product Cards
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF3E9] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <Reveal>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                Our Products
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-dark-charcoal">
                Premium Poultry Products
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="mx-auto mt-4 h-0.5 w-16 bg-luxury-gold" />
            </Reveal>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Product 1 - Fresh Chicken */}
            <Reveal delay={100}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/opt/hen.jpg"
                    alt="Fresh Chicken"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="px-5 pb-6 pt-6 text-center">
                  <h3 className="font-heading text-lg font-semibold text-dark-charcoal">
                    Fresh Chicken
                  </h3>
                  <p className="mt-2 px-2 font-body text-xs leading-relaxed text-light-charcoal">
                    Farm-fresh chicken, raised on natural feed for better taste and nutrition.
                  </p>
                  
                  <button className="mt-4 rounded-lg border border-gray-300 px-6 py-2 font-body text-xs font-medium uppercase tracking-wider text-light-charcoal transition-all hover:border-[#D4A574] hover:bg-luxury-gold hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Product 2 - Farm Fresh Eggs */}
            <Reveal delay={200}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/opt/eggs.jpg"
                    alt="Farm Fresh Eggs"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="px-5 pb-6 pt-6 text-center">
                  <h3 className="font-heading text-lg font-semibold text-dark-charcoal">
                    Farm Fresh Eggs
                  </h3>
                  <p className="mt-2 px-2 font-body text-xs leading-relaxed text-light-charcoal">
                    High-quality, protein-rich eggs from healthy and happy hens.
                  </p>
                  
                  <button className="mt-4 rounded-lg border border-gray-300 px-6 py-2 font-body text-xs font-medium uppercase tracking-wider text-light-charcoal transition-all hover:border-[#D4A574] hover:bg-luxury-gold hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Product 3 - Chicken Meat */}
            <Reveal delay={300}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/opt/chicken.jpg"
                    alt="Chicken Meat"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="px-5 pb-6 pt-6 text-center">
                  <h3 className="font-heading text-lg font-semibold text-dark-charcoal">
                    Chicken Meat
                  </h3>
                  <p className="mt-2 px-2 font-body text-xs leading-relaxed text-light-charcoal">
                    Tender, hygienic, and freshly processed chicken for your family.
                  </p>
                  
                  <button className="mt-4 rounded-lg border border-gray-300 px-6 py-2 font-body text-xs font-medium uppercase tracking-wider text-light-charcoal transition-all hover:border-[#D4A574] hover:bg-luxury-gold hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Product 4 - Day Old Chicks */}
            <Reveal delay={400}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/opt/chick.jpg"
                    alt="Day Old Chicks"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="px-5 pb-6 pt-6 text-center">
                  <h3 className="font-heading text-lg font-semibold text-dark-charcoal">
                    Day Old Chicks
                  </h3>
                  <p className="mt-2 px-2 font-body text-xs leading-relaxed text-light-charcoal">
                    Healthy day-old chicks for a great start to your poultry journey.
                  </p>
                  
                  <button className="mt-4 rounded-lg border border-gray-300 px-6 py-2 font-body text-xs font-medium uppercase tracking-wider text-light-charcoal transition-all hover:border-[#D4A574] hover:bg-luxury-gold hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY CHOOSE US - Dark Forest Green Background with Features
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#1B4D3E] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            
            {/* Left - Four Features */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <p className="font-body text-xs font-medium uppercase tracking-wider text-luxury-gold">
                  Why Choose Us
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* Feature 1 - Natural Nutrition */}
                <Reveal delay={100}>
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex h-16 w-16 items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" className="text-luxury-gold" strokeWidth="2">
                        <path d="M24 8V24M24 24L16 16M24 24L32 16" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 24C12 20 14 16 24 12C34 16 36 20 36 24C36 32 30 38 24 40C18 38 12 32 12 24Z"/>
                        <circle cx="24" cy="28" r="3" fill="#D4A574"/>
                      </svg>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-base font-semibold uppercase text-white">
                      Natural Nutrition
                    </h3>
                    
                    {/* Description */}
                    <p className="font-body text-xs leading-relaxed text-white/80">
                      We use high-quality feed to ensure healthy growth and great taste.
                    </p>
                  </div>
                </Reveal>

                {/* Feature 2 - Strict Hygiene */}
                <Reveal delay={200}>
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex h-16 w-16 items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" className="text-luxury-gold" strokeWidth="2">
                        <path d="M24 4L30 12L38 14L31 21L32 30L24 26L16 30L17 21L10 14L18 12L24 4Z"/>
                        <circle cx="24" cy="24" r="16" strokeDasharray="2 3"/>
                      </svg>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-base font-semibold uppercase text-white">
                      Strict Hygiene
                    </h3>
                    
                    {/* Description */}
                    <p className="font-body text-xs leading-relaxed text-white/80">
                      Clean, sanitized, and well-maintained poultry environment.
                    </p>
                  </div>
                </Reveal>

                {/* Feature 3 - Farm-to-Table Freshness */}
                <Reveal delay={300}>
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex h-16 w-16 items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" className="text-luxury-gold" strokeWidth="2">
                        <path d="M8 20L24 8L40 20V38C40 39.1 39.1 40 38 40H10C8.9 40 8 39.1 8 38V20Z"/>
                        <path d="M18 40V24H30V40"/>
                        <circle cx="24" cy="16" r="2" fill="#D4A574"/>
                      </svg>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-base font-semibold uppercase text-white">
                      Farm-to-Table Freshness
                    </h3>
                    
                    {/* Description */}
                    <p className="font-body text-xs leading-relaxed text-white/80">
                      Our poultry goes straight from the farm to our restaurant kitchen, ensuring ultimate freshness.
                    </p>
                  </div>
                </Reveal>

                {/* Feature 4 - Customer Focused */}
                <Reveal delay={400}>
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex h-16 w-16 items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" className="text-luxury-gold" strokeWidth="2">
                        <circle cx="24" cy="16" r="6"/>
                        <circle cx="16" cy="16" r="4"/>
                        <circle cx="32" cy="16" r="4"/>
                        <path d="M8 36C8 30 12 26 18 26H30C36 26 40 30 40 36V40H8V36Z"/>
                      </svg>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-base font-semibold uppercase text-white">
                      Customer Focused
                    </h3>
                    
                    {/* Description */}
                    <p className="font-body text-xs leading-relaxed text-white/80">
                      Your satisfaction is our priority. We are always here to help.
                    </p>
                  </div>
                </Reveal>

              </div>

              {/* Additional Content - Checkmarks */}
              <Reveal delay={500}>
                <div className="mt-12 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2D7A4F]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-body text-sm text-white/90">
                      Locally owned & operated farm
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2D7A4F]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-body text-sm text-white/90">
                      Focused on quality, health & hygiene
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2D7A4F]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-body text-sm text-white/90">
                      Advanced farming & feeding practices
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2D7A4F]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-body text-sm text-white/90">
                      Dedicated to customer satisfaction
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right - Egg Basket Image */}
            <Reveal delay={250} className="lg:col-span-4">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <img
                    src="/images/opt/kuku.jpg"
                    alt="Fresh organic eggs in basket"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </main>
  );
}
