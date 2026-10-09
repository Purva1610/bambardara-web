import { useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

/* Specialties, systems and plant categories are ordinary nursery-operations
   facts, safe to reuse — but reframed for what this actually is: a private
   propagation facility for the estate, not a commercial nursery with a shop
   and dispatch. "Plant Packaging & Dispatch" and "Plant Shop" are dropped for
   that reason; nothing here is sold or shipped out. */
const SYSTEMS = [
  { label: 'Climate-controlled polyhouses', body: 'Temperature held steady regardless of the weather outside' },
  { label: 'Drip irrigation & mist', body: 'Watered on a schedule, not on someone remembering to' },
  { label: 'Solar-powered operations', body: 'The nursery runs on what the roof collects' },
  { label: 'Smart sensors & automation', body: 'Soil moisture and humidity checked continuously' },
  { label: 'Organic & sustainable', body: 'No synthetic input anywhere under this roof' },
  { label: 'Rainwater harvesting', body: 'What falls on the polyhouse waters what grows in it' },
];

/* Country of origin and basic growing facts are ordinary horticultural
   information, safe to reuse — but the framing is rewritten: these are grown
   to maturity in the estate's own orchard, not exported for trade, so the
   market-value language ("Export Quality", "High Value") is dropped. */
const INTERNATIONAL_VARIETIES = [
  { name: 'Olive',         origin: 'Mediterranean', image: '/images/opt/olive.jpg',      body: 'Cold-pressed for the kitchen’s own oil, once the trees are old enough to bear.' },
  { name: 'Avocado',      origin: 'Mexico',         image: '/images/opt/avacado.jpg',                          body: 'A regular on the breakfast table, picked a few days before it’s needed.' },
  { name: 'Dragon Fruit', origin: 'Israel',         image: '/images/opt/dragon-fruit.jpg',                          body: 'An exotic, low-maintenance accent along the orchard’s edge.' },
  { name: 'Blueberry',    origin: 'USA',            image: '/images/opt/blueberry.jpg',   body: 'A short, precise season — the kitchen plans around it, not the other way round.' },
  { name: 'Cherry',       origin: 'Europe',         image: '/images/opt/cherry.jpg',      body: 'Sweet and short-lived; picked and served the same morning.' },
  { name: 'Kiwi',         origin: 'New Zealand',    image: '/images/opt/kiwi.jpg',        body: 'A vigorous climbing vine, trained along the orchard’s boundary wires.' },
  { name: 'Date Palm',    origin: 'Middle East',    image: '/images/opt/date.jpg',        body: 'Drought-tolerant enough to thrive through the estate’s driest months.' },
  { name: 'Macadamia',    origin: 'Australia',      image: '/images/opt/macadamia.webp',                          body: 'A slow grower — the nursery started these years before they’ll bear.' },
  { name: 'Vanilla',      origin: 'Madagascar',     image: '/images/opt/vannilla.webp',                          body: 'Hand-pollinated under the polyhouse canopy, one flower at a time.' },
  { name: 'Red Sandalwood', origin: 'Australia',    image: '/images/opt/sandalwood.jpg',                          body: 'A precious, slow-growing timber tree, planted for a generation after this one.' },
];

const ACTIVITIES = [
  'Educational tours',
  'Gardening workshops',
  'Adopt a tree',
  'Training & demonstration',
  'Eco-friendly environment',
];

function SystemsCarousel() {
  const [active, setActive] = useState(0);
  const total = SYSTEMS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const s = SYSTEMS[active];

  return (
    <section id="systems" className="scroll-mt-24 overflow-hidden bg-warm-sand">
      <div className="grid min-h-[480px] lg:grid-cols-2">

        {/* Left — heading + controls */}
        <div className="flex flex-col justify-between px-8 py-12 md:px-14 lg:px-16 lg:py-16">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-forest-green/60">
              Sheet 01 · How it runs
            </span>
            <h2 className="mt-5 font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] text-forest-green">
              Six systems,
              <span className="italic text-luxury-gold"> running quietly.</span>
            </h2>
            <p className="mt-5 max-w-xs font-body text-[0.85rem] font-light leading-[1.8] text-light-charcoal/70">
              Each one runs without a hand on a switch. Together they keep the nursery going in any weather.
            </p>
          </div>

          {/* Dot indicators + arrows */}
          <div className="mt-10 flex items-center gap-6">
            {/* Prev */}
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-green/20 text-forest-green/50 transition-all duration-300 hover:border-forest-green hover:text-forest-green"
              aria-label="Previous"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {SYSTEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'h-2 w-6 bg-luxury-gold'
                      : 'h-2 w-2 bg-forest-green/20 hover:bg-forest-green/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-green/20 text-forest-green/50 transition-all duration-300 hover:border-forest-green hover:text-forest-green"
              aria-label="Next"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <span className="ml-auto font-mono text-[0.6rem] tracking-[0.15em] text-light-charcoal/30">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Right — active slide content */}
        <div className="relative flex flex-col justify-center overflow-hidden border-l border-forest-green/10 bg-ivory-white px-8 py-12 md:px-14 lg:px-16 lg:py-16">

          {/* Large watermark number */}
          <span
            className="pointer-events-none absolute right-6 top-6 select-none font-mono font-bold leading-none text-forest-green/5"
            style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
          >
            {String(active + 1).padStart(2, '0')}
          </span>

          {/* Slide content */}
          <div key={active} style={{ animation: 'fadeSlideUp 0.4s ease forwards' }}>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-luxury-gold">
              System {String(active + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-light leading-tight text-forest-green">
              {s.label}
            </h3>
            <div className="mt-6 h-px w-12 bg-luxury-gold/50" />
            <p className="mt-6 max-w-sm font-body text-[0.95rem] font-light leading-[1.85] text-light-charcoal">
              {s.body}
            </p>
          </div>

          {/* Bottom row of all system labels */}
          <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2">
            {SYSTEMS.map((sys, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`font-mono text-[0.5rem] uppercase tracking-[0.15em] transition-colors duration-300 ${
                  i === active ? 'text-luxury-gold' : 'text-light-charcoal/30 hover:text-light-charcoal/60'
                }`}
              >
                {sys.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function FacilitiesSection() {
  const [active, setActive] = useState(0);
  
  const facilities = [
    {
      title: 'Tissue Culture Lab',
      subtitle: 'Advanced Propagation',
      body: 'Where a single cutting becomes dozens of identical, disease-free plants through advanced tissue culture techniques. Our sterile laboratory environment ensures optimal conditions for plant cell multiplication and development.',
      video: '/videos/lab.mp4',
    },
    {
      title: 'Automated Mist & Irrigation',
      subtitle: 'Smart Watering System',
      body: 'Fine mist on a timer keeps propagation trays humid without manual intervention, ensuring consistent moisture levels. Automated sensors monitor and adjust water delivery based on environmental conditions for optimal plant health.',
      video: '/videos/irrigation.mp4',
    },
    {
      title: 'Smart Nursery Management',
      subtitle: 'Digital Monitoring',
      body: 'A tablet at the door shows every bench\'s temperature, moisture and light levels — all data is logged, not guessed. Real-time monitoring and data analytics help optimize growing conditions and predict plant needs.',
      video: '/videos/management.mp4',
    },
    {
      title: 'Seed Germination Unit',
      subtitle: 'Controlled Environment',
      body: 'A separate, warmer bay dedicated to the earliest and most fragile stage of a plant\'s life cycle. Precise temperature and humidity control ensures maximum germination rates and healthy seedling development.',
      video: '/videos/seeds.mp4',
    },
    {
      title: 'Plant Packaging & Dispatch',
      subtitle: 'Professional Service',
      body: 'Professional packaging ensures safe delivery of plants to customers while maintaining optimal conditions. Our logistics team coordinates efficient dispatch with proper handling protocols for each plant variety.',
      video: '/videos/packaging.mp4',
    }
  ];

  const total = facilities.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const current = facilities[active];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          key={`facility-${active}`}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={current.video} type="video/mp4" />
        </video>
        {/* Gradient overlay - darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col">
        
        {/* Top Bar - Counter */}
        <div className="flex items-center justify-between px-8 py-6 md:px-16">
          <span className="font-mono text-xs tracking-widest text-white/60">
            OUR FACILITIES
          </span>
          <span className="font-mono text-sm tracking-wider text-white/80">
            {String(active + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Center Content */}
        <div className="flex flex-1 items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl" key={active} style={{ animation: 'fadeIn 0.6s ease-out' }}>
            
            {/* Facility Number Badge */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-luxury-gold/50 bg-luxury-gold/10 backdrop-blur-sm">
                <span className="font-mono text-sm font-bold text-luxury-gold">
                  {String(active + 1).padStart(2, '0')}
                </span>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-luxury-gold">
                {current.subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-6 font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] text-white">
              {current.title}
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-2xl font-body text-lg leading-relaxed text-white/90">
              {current.body}
            </p>

            {/* Action Button */}
            <button className="group inline-flex items-center gap-3 rounded-full bg-luxury-gold px-8 py-4 font-body text-sm font-semibold text-dark-charcoal transition-all duration-300 hover:bg-white hover:shadow-2xl">
              <span>Explore This Facility</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="px-8 pb-8 md:px-16">
          <div className="flex items-center justify-between gap-8">
            
            {/* Left - Prev/Next Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 backdrop-blur-md transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold/20"
                aria-label="Previous facility"
              >
                <svg className="h-5 w-5 text-white transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={next}
                className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 backdrop-blur-md transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold/20"
                aria-label="Next facility"
              >
                <svg className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Center - Dot Navigation */}
            <div className="flex items-center gap-3">
              {facilities.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'h-3 w-12 bg-luxury-gold'
                      : 'h-3 w-3 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to facility ${i + 1}`}
                />
              ))}
            </div>

            {/* Right - All Facilities Quick Nav */}
            <div className="hidden items-center gap-2 lg:flex">
              {facilities.map((fac, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    i === active
                      ? 'bg-luxury-gold/20 text-luxury-gold backdrop-blur-md'
                      : 'text-white/40 hover:bg-white/10 hover:text-white/80 hover:backdrop-blur-md'
                  }`}
                  title={fac.title}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
}

export default function HighTechNursery() {
  return (
    <main className="bg-ivory-white">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '640px', paddingTop: '5rem' }}>

        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <EstateImage
            slug="nursery-greenhouse-hero"
            alt="Agricultural drone flying over lush crop fields"
            sizes="100vw"
            priority
            className="h-full w-full"
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[2] bg-black/50" />

        {/* ── LEFT: vertical "Follow us" social bar ── */}
        <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex flex-col items-center gap-3 px-3 py-4 hidden md:flex">
          <span className="font-mono text-[0.52rem] uppercase tracking-[0.25em] text-white/70"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Follow us
          </span>
          <div className="h-px w-5 bg-white/40 rotate-90 my-1" />
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* Twitter/X */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="X / Twitter">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

        {/* ── CENTER: headline + subtitle ── */}
        <div className="absolute inset-x-0 top-[18%] z-10 flex flex-col items-center px-6 text-center">
          <h1 className="max-w-3xl font-body text-[clamp(2rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg">
            Boost Your Crop Yields with<br className="hidden sm:block" />
            Cutting-Edge Nursery Solutions
          </h1>
          <p className="mt-5 max-w-lg font-body text-[0.88rem] font-normal leading-[1.75] text-white/85 drop-shadow">
            Our state-of-the-art high-tech nursery provides real-time insights, enhanced
            crop monitoring, and precise cultivation techniques, helping you optimise
            yield, reduce costs, and improve sustainability.
          </p>
        </div>

        {/* ── BOTTOM ROW: left card + right trust badge ── */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-6 pb-6 md:px-10 md:pb-8">

          {/* Bottom-left: feature card */}
          <div className="flex items-start gap-4 rounded-2xl bg-white/15 p-4 backdrop-blur-md max-w-xs border border-white/20 shadow-xl">
            {/* thumbnail */}
            <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl">
              <EstateImage
                slug="high-tech-nursery-facility"
                alt="Nursery technology"
                sizes="96px"
                className="h-full w-full"
              />
            </div>
            {/* text */}
            <div className="flex-1">
              <h3 className="font-body text-[0.92rem] font-bold leading-tight text-white">
                Sustainable Farming<br />with Smart Nursery
              </h3>
              <p className="mt-1.5 font-body text-[0.72rem] font-light leading-[1.6] text-white/75">
                Smart technology enhances productivity while promoting more sustainable farming practices.
              </p>
            </div>
            {/* arrow button */}
            <a
              href="#systems"
              className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition-all hover:bg-white hover:scale-110"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* ── ABOUT / INTRO ────────────────────────────────────────── */}
      <section style={{ background: '#f4f8f1' }}>

        {/* ── Partner logos bar ── */}
        <div style={{
          borderTop: '1px solid #d8e8d0',
          borderBottom: '1px solid #d8e8d0',
          padding: '0.85rem 0',
          overflow: 'hidden',
          background: '#edf4e8',
        }}>
          <div style={{
            display: 'flex',
            gap: '3rem',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {['Agri-Tech India', 'NHB Certified', 'Polyhouse Pro', 'GreenRoot Labs', 'FarmBridge', 'ISO 22000'].map((name, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#5a7a5a',
                whiteSpace: 'nowrap',
              }}>{name}</span>
            ))}
          </div>
        </div>

        {/* ── Two-column about block ── */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4rem 2rem 5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '3.5rem',
          alignItems: 'center',
        }} className="about-grid">

          {/* LEFT: label + image + social */}
          <div>
            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#5ab26b', display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#3a5a3a',
              }}>About High Tech Nursery</span>
            </div>

            {/* Image */}
            <div style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              aspectRatio: '4/3',
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}>
              <EstateImage
                slug="nursery-greenhouse-hero"
                alt="High-tech polyhouse nursery"
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="h-full w-full"
              />
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.9rem', marginTop: '1.2rem', alignItems: 'center' }}>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#5a7a5a' }} aria-label="Instagram" title="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#5a7a5a' }} aria-label="LinkedIn" title="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#5a7a5a' }} aria-label="X / Twitter" title="X / Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT: description + CTAs */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              fontWeight: 400,
              lineHeight: 1.75,
              color: '#1a2e1a',
              marginBottom: '2rem',
            }}>
              BambarDara's high-tech nursery started with one simple principle: every plant that
              takes root on this estate should begin its life here. A decade on, we're still doing
              exactly that — from tissue-culture propagation under sterile lab conditions to
              climate-controlled polyhouses that keep temperature steady regardless of what the
              weather does outside.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href="/enquire"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  background: '#1a2e1a',
                  color: '#fff',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '2rem',
                  textDecoration: 'none',
                  transition: 'background 0.25s',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#2e5a2e'}
                onMouseOut={e => e.currentTarget.style.background = '#1a2e1a'}
              >
                Book a Tour
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: '#5ab26b', color: '#fff',
                }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </span>
              </a>
              <a
                href="#systems"
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: '#1a2e1a',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                Learn More ↗
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── SYSTEMS CAROUSEL ─────────────────────────────────────── */}
      <SystemsCarousel />

      {/* ── PLANT CATEGORIES ─────────────────────────────────────── */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <Reveal>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-luxury-gold">
                Our Collection
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] text-dark-charcoal">
                Plant <span className="italic text-luxury-gold">Categories</span>
              </h2>
            </Reveal>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Fruit Plants', slug: 'fruits', label: 'FRUIT PLANTS' },
              { name: 'Ornamental Plants', slug: 'ornamental', label: 'ORNAMENTAL PLANTS' },
              { name: 'Medicinal Plants', slug: 'medicinal', label: 'MEDICINAL PLANTS' },
              { name: 'Native Tree Saplings', slug: 'sapling-cultivation', label: 'NATIVE TREE SAPLINGS' },
              { name: 'Indoor Plants', slug: 'indoor', label: 'INDOOR PLANTS' },
              { name: 'Cactus & Succulents', slug: 'cactus', label: 'CACTUS & SUCCULENTS' },
            ].map((category, i) => (
              <Reveal key={category.name} delay={i * 60}>
                <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-500 hover:shadow-xl">
                  
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <EstateImage
                      slug={category.slug}
                      alt={category.name}
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay with label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-body text-[0.7rem] font-bold uppercase tracking-[0.15em] leading-tight text-white">
                      {category.label}
                    </h3>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── INTERNATIONAL VARIETIES ──────────────────────────────── */}
      <section className="bg-[#0f1f0f] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-luxury-gold">
                  Sheet 03 · From further afield
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-heading text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.05] text-ivory-white">
                  Ten varieties,{' '}
                  <span className="italic text-luxury-gold">raised for our own orchard.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <p className="max-w-sm font-body text-[0.85rem] font-light leading-[1.9] text-ivory-white/55 lg:text-right">
                None of these are native to Kolhapur. Each started as imported stock,
                propagated here under cover until it could hold its own outdoors.
              </p>
            </Reveal>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {INTERNATIONAL_VARIETIES.map((v, i) => (
              <Reveal key={v.name} delay={i * 40}>
                <div className="group relative overflow-hidden rounded-2xl transition-all duration-500" style={{ height: '280px' }}>

                  {/* Background image or fallback */}
                  {v.image ? (
                    <img
                      src={v.image}
                      alt={v.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1a3320]" />
                  )}

                  {/* Gradient overlay - becomes stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/70" />

                  {/* Content container - slides up on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 group-hover:-translate-y-12">
                    <span className="font-mono text-[0.5rem] tracking-[0.2em] text-luxury-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 font-heading text-[1rem] font-semibold leading-tight text-white">
                      {v.name}
                    </h3>
                    
                    {/* Description - fades in on hover */}
                    <p className="mt-3 font-body text-[0.62rem] leading-[1.6] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {v.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── FACILITIES ───────────────────────────────────────────── */}
      <FacilitiesSection />


      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <section className="bg-deep-forest px-6 pb-20 pt-4 md:px-10 md:pb-28">
        <div className="mx-auto max-w-editorial border-t border-luxury-gold/40 pt-10">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-luxury-gold">
            For guests
          </span>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-b border-ivory-white/15 pb-10">
            {ACTIVITIES.map((a) => (
              <span
                key={a}
                className="font-body text-[0.85rem] font-light text-ivory-white/80"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(1.75rem,3.6vw,3rem)] font-light leading-tight text-ivory-white">
                Plant today,
                <span className="italic text-luxury-gold"> for a better tomorrow.</span>
              </h2>
              <span className="mt-4 block font-hand text-xl text-luxury-gold">
                — every bench logged, every planting dated
              </span>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link
                to="/enquire"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white underline decoration-luxury-gold/50 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                Enquire about a tour →
              </Link>
              <Link
                to="/agro-farming/nursery"
                className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ivory-white/70 underline decoration-luxury-gold/30 underline-offset-8 transition-colors duration-500 hover:text-luxury-gold"
              >
                See the nursery catalogue →
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
