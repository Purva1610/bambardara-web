import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaHeartbeat,
  FaLungs,
  FaBrain,
  FaCompass,
  FaChevronRight,
  FaFeatherAlt,
  FaSpa,
  FaHiking,
  FaChild,
  FaChair,
  FaTint,
  FaRestroom,
  FaParking,
  FaVideo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaCampground,
} from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

// The 4 core benefits from the poster left box
const BENEFITS = [
  {
    icon: FaLungs,
    title: 'BOOSTS IMMUNITY',
    desc: 'Fresh oxygen strengthens your body, supports cellular recovery & vitality.',
  },
  {
    icon: FaBrain,
    title: 'REDUCES STRESS',
    desc: 'Natural lush surroundings and calming greenery naturally soothe your mind.',
  },
  {
    icon: FaHeartbeat,
    title: 'IMPROVES HEALTH',
    desc: 'Purifies lungs, enriches blood oxygenation, and enhances overall well-being.',
  },
  {
    icon: FaLeaf,
    title: 'CONNECTS WITH NATURE',
    desc: 'Brings deep peace, sustained happiness, and uplifting positive energy.',
  },
];

// The 6 activities from the poster center strip
const ACTIVITIES = [
  {
    icon: FaHiking,
    title: 'Nature Walk',
    desc: 'Shaded scenic trails through dense high-oxygen tree canopies.',
    slug: 'nature',
  },
  {
    icon: FaFeatherAlt,
    title: 'Bird Watching',
    desc: 'Spot vibrant native birds, kingfishers, and mountain species.',
    slug: 'waterfalls-and-nature-trails-3',
  },
  {
    icon: GiMeditation,
    title: 'Yoga Zone',
    desc: 'Open-air lawns and cedar decks for morning pranayama & yoga.',
    slug: 'plantation',
  },
  {
    icon: FaChild,
    title: 'Children Play Area',
    desc: 'Safe swings, grassy meadows, and nature-themed outdoor fun.',
    slug: 'bamboo-plant',
  },
  {
    icon: FaCampground,
    title: 'Picnic Spots',
    desc: 'Shaded wooden gazebos and private family sitting clearings.',
    slug: 'well-planted-roads-and-street-lights',
  },
  {
    icon: FaSpa,
    title: 'Relaxation Zone',
    desc: 'Hammocks nestled between trees for unhurried rest and reading.',
    slug: 'waterfall',
  },
];

// The 4 photo exploration cards from the poster right side
const GALLERY_CARDS = [
  {
    slug: 'nature',
    title: 'NATURE WALK',
    subtitle: 'Canopy Pathways & Pure Air',
  },
  {
    slug: 'well-planted-roads-and-street-lights',
    title: 'BEAUTIFUL LANDSCAPING',
    subtitle: 'Floral Gazebos & Scenic Lawns',
  },
  {
    slug: 'plantation',
    title: 'YOGA & MEDITATION',
    subtitle: 'Mindful Forest Wellness',
  },
  {
    slug: 'bamboo-plant',
    title: 'RELAX & UNWIND',
    subtitle: 'Tranquil Hammock Groves',
  },
];

// The 5 facilities from the poster
const FACILITIES = [
  { icon: FaChair, title: 'Sitting Areas', subtitle: 'Shaded Benches' },
  { icon: FaTint, title: 'Drinking Water', subtitle: 'Pure Mineral Water' },
  { icon: FaRestroom, title: 'Clean Toilets', subtitle: 'Sanitized Facilities' },
  { icon: FaParking, title: 'Parking Area', subtitle: 'Spacious & Secure' },
  { icon: FaVideo, title: 'Security', subtitle: '24/7 CCTV & Patrols' },
];

// Bottom ribbon ticker from poster
const RIBBON_ITEMS = [
  'SAVE NATURE • SAVE LIFE',
  'COME CLOSER TO NATURE',
  'BREATHE PURE, LIVE PURE',
];

export default function OxygenPark() {
  return (
    <main className="bg-ivory-white text-forest-green selection:bg-luxury-gold selection:text-dark-charcoal">
      {/* ── HERO SECTION (EXACT SICHUAN POSTER ARCHITECTURE) ── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-deep-forest text-ivory-white">
        {/* Cinematic Forest & Mountain Lake Background */}
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="nature"
            alt="Bambardara Oxygen Park pristine mountain sanctuary and serene lake waters"
            sizes="100vw"
            priority
            className="h-full w-full object-cover scale-105 transition-transform duration-[12000ms] hover:scale-100"
          />
          {/* Subtle cinematic overlays for depth & poster contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(6,32,24,0.55)_60%,rgba(4,18,13,0.92)_100%)]" />
        </div>

        {/* Ambient Grid Lines */}
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(201,169,97,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,97,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* CENTER HERO: Giant Poster Title & 2-Line Subtitle */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-36 sm:pt-40 md:pt-44 pb-10 md:pb-16 text-center flex flex-col items-center justify-center my-auto">
          {/* Main Title */}
          <Reveal delay={100}>
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/70 drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] leading-none select-none pl-[0.14em]">
              OXYGEN
            </h1>
          </Reveal>

          {/* Centered 2-Line Subtitle Exact to Poster Structure */}
          <Reveal delay={200}>
            <div className="mt-6 sm:mt-8 max-w-3xl space-y-1.5 px-4">
              <p className="font-body text-sm sm:text-base md:text-lg text-white/90 font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                A national park with unique lakes and cascading waterfalls.
              </p>
              <p className="font-body text-xs sm:text-sm md:text-base text-white/80 font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                Lakes change color depending on the lighting &amp; pristine forest air.
              </p>
            </div>
          </Reveal>

          {/* Action CTA Buttons */}
          <Reveal delay={280}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/enquire"
                className="inline-flex items-center gap-3 bg-luxury-gold px-8 py-3.5 rounded-full font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(201,169,97,0.6)] hover:scale-105 active:scale-95"
              >
                <span>Visit Oxygen Park</span>
                <FaChevronRight className="text-[0.65rem]" />
              </Link>
              <a
                href="#park-benefits"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/30 backdrop-blur-md px-6 py-3.5 font-body text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold hover:bg-black/50"
              >
                <FaCompass className="text-luxury-gold" />
                <span>View Park Features</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* BOTTOM ROW: 3 Columns with — • — Node Dividers (Exact to Reference Poster) */}
        <div className="relative z-20 w-full pb-10 sm:pb-14 pt-6 px-6 md:px-12 bg-gradient-to-t from-deep-forest/95 via-deep-forest/70 to-transparent">
          <Reveal delay={350}>
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
              {/* Column 1: Tourist reviews */}
              <div className="flex flex-col items-start text-left">
                <span className="font-body text-xs sm:text-sm font-medium text-white/90 tracking-wide">
                  Tourist reviews:
                </span>
                {/* — • — Divider Node */}
                <div className="flex items-center gap-2 my-2.5 w-full">
                  <div className="h-[1px] w-6 bg-white/50" />
                  <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <div className="h-[1px] flex-1 max-w-[90px] bg-white/50" />
                </div>
                <p className="font-body text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  “The lakes are alive. I have never seen such flowers in nature”
                </p>
              </div>

              {/* Column 2: Why it's worth a visit */}
              <div className="flex flex-col items-start md:items-center text-left md:text-center">
                <span className="font-body text-xs sm:text-sm font-medium text-white/90 tracking-wide">
                  Why it's worth a visit:
                </span>
                {/* — • — Divider Node */}
                <div className="flex items-center gap-2 my-2.5 w-full md:justify-center">
                  <div className="h-[1px] w-6 md:w-10 bg-white/50" />
                  <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <div className="h-[1px] w-12 md:w-10 bg-white/50" />
                </div>
                <div className="font-body text-xs sm:text-sm text-white/80 font-light leading-relaxed space-y-0.5">
                  <p>Hidden lakes and waterfalls</p>
                  <p>Immersion in Tibetan &amp; mountain nature</p>
                </div>
              </div>

              {/* Column 3: Legend */}
              <div className="flex flex-col items-start md:items-end text-left md:text-right">
                <span className="font-body text-xs sm:text-sm font-medium text-white/90 tracking-wide">
                  Legend:
                </span>
                {/* — • — Divider Node */}
                <div className="flex items-center gap-2 my-2.5 w-full md:justify-end">
                  <div className="h-[1px] flex-1 max-w-[90px] md:order-1 bg-white/50" />
                  <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] md:order-2" />
                  <div className="h-[1px] w-6 md:order-3 bg-white/50" />
                </div>
                <p className="font-body text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  Lakes are the tears of a goddess who wept for the beauty of the world
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BENEFITS & RIGHT VISUAL CARDS SECTION (POSTER CORE) ── */}
      <section id="park-benefits" className="py-20 md:py-28 bg-warm-sand/30 border-b border-stone/30 relative">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold font-semibold">
              Wellness &amp; Health
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-light text-forest-green">
              Benefits of Oxygen Park
            </h2>
            <p className="mt-4 font-body text-xs sm:text-sm text-forest-green/75 leading-relaxed">
              Step into an unpolluted natural ecosystem designed to strengthen immunity and revive your spirit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Benefits Box (Matching Poster Style) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-deep-forest to-[#081810] p-8 text-ivory-white border border-luxury-gold/40 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/15">
                  <FaLungs className="text-2xl text-luxury-gold" />
                  <span className="font-body text-xs uppercase tracking-[0.22em] text-luxury-gold font-bold">
                    BENEFITS OF OXYGEN PARK
                  </span>
                </div>

                <div className="space-y-6">
                  {BENEFITS.map((b) => {
                    const Icon = b.icon;
                    return (
                      <div key={b.title} className="flex items-start gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-luxury-gold/15 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold mt-0.5">
                          <Icon className="text-lg text-luxury-gold" />
                        </div>
                        <div>
                          <h4 className="font-heading text-sm font-semibold tracking-wider text-ivory-white uppercase">
                            {b.title}
                          </h4>
                          <p className="mt-1 font-body text-xs text-ivory-white/75 leading-relaxed font-light">
                            {b.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15">
                <Link
                  to="/enquire"
                  className="block w-full text-center bg-luxury-gold py-3 font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all hover:bg-ivory-white hover:shadow-lg"
                >
                  Book Forest Wellness Experience
                </Link>
              </div>
            </div>

            {/* Right 4 Visual Cards (Matching Poster Right Column) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {GALLERY_CARDS.map((card) => (
                <div
                  key={card.slug}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone/60 bg-deep-forest"
                >
                  <EstateImage
                    slug={card.slug}
                    alt={card.title || 'Bambardara Oxygen Park serene views'}
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENJOY OUR ACTIVITIES (THE 6 ACTIVITIES FROM POSTER) ── */}
      <section className="py-20 bg-ivory-white border-b border-stone/30">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold font-semibold">
              Explore &amp; Enjoy
            </span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-light text-forest-green">
              Enjoy Our Activities
            </h2>
            <p className="mt-3 font-body text-xs sm:text-sm text-forest-green/75">
              Activities tailored for mindfulness, gentle recreation, and quality time together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.title}
                  className="rounded-2xl border border-stone/60 bg-warm-sand/20 overflow-hidden shadow-sm transition-all duration-300 hover:border-luxury-gold hover:-translate-y-1 hover:shadow-lg flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <EstateImage
                      slug={act.slug}
                      alt={act.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="h-9 w-9 rounded-full bg-deep-forest/80 backdrop-blur-md border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
                        <Icon className="text-base" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-medium text-forest-green">
                        {act.title}
                      </h3>
                      <p className="mt-2 font-body text-xs text-forest-green/75 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR FACILITIES STRIP (FROM POSTER) ── */}
      <section className="py-16 bg-warm-sand/40 border-b border-stone/30">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-10">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold font-bold">
              Comfort &amp; Convenience
            </span>
            <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-light text-forest-green">
              Our Facilities
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {FACILITIES.map((fac) => {
              const Icon = fac.icon;
              return (
                <div
                  key={fac.title}
                  className="rounded-xl border border-stone/60 bg-ivory-white p-5 text-center shadow-sm transition-all duration-300 hover:border-luxury-gold hover:-translate-y-0.5"
                >
                  <div className="h-11 w-11 mx-auto rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green mb-3">
                    <Icon className="text-xl text-forest-green" />
                  </div>
                  <h4 className="font-heading text-sm font-semibold text-forest-green uppercase tracking-wide">
                    {fac.title}
                  </h4>
                  <span className="block mt-1 font-body text-[0.68rem] text-forest-green/70">
                    {fac.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE & INSPIRATIONAL BANNER (FROM POSTER) ── */}
      <section className="py-16 bg-ivory-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Box 1: Target Audience */}
            <div className="rounded-2xl border border-stone/60 bg-warm-sand/30 p-8 text-center flex flex-col justify-center items-center shadow-sm">
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-forest-green font-bold block mb-2">
                A PERFECT GETAWAY FOR
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-light text-forest-green">
                Families, Friends &amp; Groups
              </p>
              <span className="mt-3 font-serif italic text-sm text-forest-green/80">
                Refresh... Recharge... Reconnect...
              </span>
            </div>

            {/* Box 2: Quote Box from poster */}
            <div className="rounded-2xl border-2 border-luxury-gold/60 bg-gradient-to-br from-[#123120] to-[#091b11] p-8 text-center flex flex-col justify-center items-center text-ivory-white shadow-md">
              <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-luxury-gold font-bold block mb-2">
                VISIT &amp; FEEL THE DIFFERENCE
              </span>
              <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold font-normal">
                &ldquo;Where Every Breath Brings Life!&rdquo;
              </span>
              <p className="mt-2 text-xs font-light text-ivory-white/70">
                Immerse your senses in pure mountain air
              </p>
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
                  Daily Visitor Access
                </h4>
                <p className="font-body text-xs text-ivory-white/80 leading-relaxed">
                  Open daily from sunrise to sunset. Guided morning pranayama &amp; nature walks
                  available for resort guests and day visitors.
                </p>
                <div className="mt-5">
                  <Link
                    to="/enquire"
                    className="block w-full text-center bg-luxury-gold py-3 font-body text-xs uppercase tracking-[0.2em] text-deep-forest font-bold transition-all hover:bg-ivory-white"
                  >
                    Enquire / Plan Your Visit
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
