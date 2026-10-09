import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTrophy,
  FaBriefcase,
  FaCalendarCheck,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

const COURSE_CARDS = [
  {
    slug: 'golf-course-fairway',
    title: 'Perfect Greens',
    tagline: 'Pristine Putting Surfaces',
    desc: 'Tour-quality greens offering true roll, subtle contours, and consistent speeds for golfers of every handicap.',
  },
  {
    slug: 'golf-course-green',
    title: 'Cart Service',
    tagline: 'Comfort On Every Hole',
    desc: 'Modern fleet of silent electric golf buggies equipped with GPS tracking and refreshment coolers.',
  },
  {
    slug: 'golf-course-fairway',
    title: 'Pro Shop',
    tagline: 'Premium Gear & Apparel',
    desc: 'Fully stocked with international brand clubs, balls, glove fittings, apparel, and custom club repair.',
  },
  {
    slug: 'golf-course-green',
    title: 'Clubhouse',
    tagline: 'Panoramic Lounge & Dining',
    desc: 'Relax after your round with gourmet dining, refreshing drinks, and scenic views over the 18th fairway.',
  },
  {
    slug: 'golf-course-fairway',
    title: 'Putting Green',
    tagline: 'Practice & Warm-Up',
    desc: 'Expansive dedicated practice green to tune your stroke, alignment, and distance control before teeing off.',
  },
  {
    slug: 'golf-course-green',
    title: 'Scenic Fairways',
    tagline: 'Lush Mountain Vistas',
    desc: 'Sweeping emerald fairways framed by indigenous trees, lake reflections, and fresh mountain breezes.',
  },
];


const BOOKING_TYPES = [
  {
    title: 'Corporate Outings',
    desc: 'Executive tournaments, networking days, and corporate client entertainment.',
    icon: FaBriefcase,
  },
  {
    title: 'Tournaments',
    desc: 'Club championships, charity scrambles, and competitive medal play events.',
    icon: FaTrophy,
  },
  {
    title: 'Weekend Getaways',
    desc: 'Stay-and-play packages combining golf, luxury resort stay, and spa wellness.',
    icon: FaCalendarCheck,
  },
  {
    title: 'Events & Celebrations',
    desc: 'Clubhouse banquets, birthday golf days, and private celebration dinners.',
    icon: FaUsers,
  },
];

export default function GolfCourse() {
  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* HERO */}
      <section className="relative flex min-h-[92vh] lg:min-h-[100vh] items-center justify-center overflow-hidden bg-deep-forest text-center">
        {/* Background Image */}
        <div className="absolute inset-0 isolate">
          <img
            src="/images/opt/golf_hero_main.jpg"
            alt="Golfer with glove and clubs on championship golf fairway"
            className="h-full w-full object-cover object-[center_30%]"
          />
        </div>

        {/* Cinematic Atmosphere & Dark Contrast Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(6, 20, 14, 0.55) 0%, rgba(6, 20, 14, 0.35) 45%, rgba(6, 20, 14, 0.75) 100%)',
          }}
        />

        {/* Centered Hero Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-28 sm:py-36 md:py-44 text-center">

          <Reveal delay={100}>
            <h1 className="max-w-4xl font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-light tracking-tight text-ivory-white leading-[1.14] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              The Most{' '}
              <span className="italic font-normal text-luxury-gold">
                Elegant Way
              </span>
              <span className="block mt-2 sm:mt-3 font-light text-3xl sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                to Play, Learn &amp; Celebrate
              </span>
              <span className="block mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light text-ivory-white/90">
                the Game of Golf
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl mx-auto font-body text-sm sm:text-base md:text-lg font-light leading-relaxed text-ivory-white/90 tracking-wide">
              Surrounded by rolling Sahyadri hills, pristine greens, and tranquil waters—experience international championship standards and tailored golf hospitality.
            </p>
          </Reveal>

          {/* CTA Group */}
          <Reveal delay={260}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/enquire"
                className="inline-flex items-center justify-center rounded-full bg-luxury-gold px-8 py-3 sm:px-10 sm:py-3.5 font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-deep-forest shadow-luxury transition-all duration-300 hover:bg-ivory-white hover:scale-105"
              >
                Book a Tee Time
              </Link>
              <a
                href="#about-golf"
                className="inline-flex items-center justify-center rounded-full border border-ivory-white/70 bg-black/30 px-8 py-3 sm:px-10 sm:py-3.5 font-body text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-ivory-white shadow-luxury backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-deep-forest hover:border-white hover:scale-105"
              >
                Explore Course
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OUR PHILOSOPHY SECTION (Exact Reference Design) ─────────────── */}
      <section id="about-golf" className="bg-[#F4F0EA] px-6 py-20 sm:py-28 md:px-12 lg:px-16 xl:px-24 border-b border-[#E3DDD3]">
        <div className="mx-auto max-w-[1400px]">
          {/* Top Layout Grid: Philosophy Label, Big Headline & Paragraph, and 2 Supporting Columns */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Label */}
            <div className="lg:col-span-2">
              <Reveal>
                <span className="font-body text-xs sm:text-[0.85rem] font-normal tracking-wide text-[#5C6B5E] block">
                  Our philosophy
                </span>
              </Reveal>
            </div>

            {/* Main Headline & Lead Paragraph */}
            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-[#1E2E22] leading-[1.12] tracking-tight">
                  A club for those who think<br className="hidden sm:inline" /> from a distance.
                </h2>
                <p className="mt-6 font-body text-sm sm:text-[0.92rem] font-light leading-relaxed text-[#445246] max-w-lg">
                  We bring together people who stay the course when others change direction. A space for focus, strategic conversations, and long-term solutions—where what matters is not the moment, but the results over the years.
                </p>
              </Reveal>
            </div>

            {/* Right Supporting Columns */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2 lg:pt-3">
              <Reveal delay={160}>
                <p className="font-body text-xs sm:text-[0.82rem] font-light leading-[1.75] text-[#556457]">
                  The private area, limited number of residents, and absence of external noise create an environment in which one can think clearly and act consciously.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="font-body text-xs sm:text-[0.82rem] font-light leading-[1.75] text-[#556457]">
                  Every element of BAMBARDARA—from the course layout to the business lounge—supports a culture of strategic dialogue. It&apos;s not just a place to play, but an infrastructure for relations that work remotely.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Bottom Imagery Grid */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-end">
            {/* Left Column: Timestamp Year & Main Large Portrait Image */}
            <div className="lg:col-span-2 hidden lg:flex flex-col justify-between self-stretch pb-2">
              <div />
              <Reveal delay={300}>
                <span className="font-body text-xs text-[#7A8A7C] tracking-wider font-light">
                  2025
                </span>
              </Reveal>
            </div>

            {/* Main Center-Left Portrait Image (Two Golfers Walking) */}
            <div className="lg:col-span-5">
              <Reveal delay={200}>
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#E2DDD5] shadow-xs transition-transform duration-700 hover:scale-[1.01]">
                  <EstateImage
                    slug="golf-philosophy-golfers"
                    alt="Two gentlemen golfers walking along championship fairway"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <div className="mt-3 lg:hidden flex justify-between items-center text-xs text-[#7A8A7C]">
                <span>2025</span>
              </div>
            </div>

            {/* Right Bottom Dual Images (Clubhouse Lounge Interior & Facade Architecture) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
              <Reveal delay={300}>
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#E2DDD5] shadow-xs transition-transform duration-700 hover:scale-[1.02]">
                  <EstateImage
                    slug="golf-clubhouse-lounge"
                    alt="Sunlit modern luxury golf clubhouse lounge"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={380}>
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#E2DDD5] shadow-xs transition-transform duration-700 hover:scale-[1.02]">
                  <EstateImage
                    slug="golf-clubhouse-facade"
                    alt="Contemporary wooden pavilion and clubhouse architecture"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGIC ENVIRONMENT SECTION (Exact Reference Design) ─────────────── */}
      <section className="relative min-h-[90vh] lg:min-h-[105vh] bg-[#0A1A10] text-white py-20 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden flex flex-col justify-between border-b border-white/10">
        {/* Cinematic Fairway Backdrop with Dew & Soft Bokeh */}
        <div className="absolute inset-0 isolate pointer-events-none">
          <img
            src="/images/opt/golf-court-1280.jpg"
            alt="Lush green fairway with morning golden dew bokeh"
            className="h-full w-full object-cover opacity-25 filter contrast-125 saturate-125"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 55%, rgba(10, 30, 18, 0.6) 0%, rgba(6, 18, 11, 0.95) 75%), linear-gradient(180deg, rgba(6, 18, 11, 0.8) 0%, rgba(6, 18, 11, 0.96) 100%)',
            }}
          />
        </div>

        {/* Delicate Architectural Coordinate Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:100px_100px]" />
          {/* Faint Constellation Lines Overlay */}
          <svg className="absolute inset-0 h-full w-full stroke-white/15" xmlns="http://www.w3.org/2000/svg">
            <line x1="5%" y1="20%" x2="25%" y2="40%" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="25%" y1="40%" x2="50%" y2="52%" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="50%" y1="52%" x2="75%" y2="40%" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="75%" y1="40%" x2="95%" y2="20%" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="25%" y1="75%" x2="50%" y2="52%" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="50%" y1="52%" x2="75%" y2="75%" strokeWidth="0.5" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] w-full flex-1 flex flex-col justify-between">
          {/* Top Headline */}
          <div className="mb-12 lg:mb-16">
            <Reveal>
              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                Strategic Environment
              </h2>
            </Reveal>
          </div>

          {/* Core Interactive Layout: 3 Columns (Left Metrics | Central Ball & Ring Dial | Right Metrics) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* Left 3 Metrics Column */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-10 lg:space-y-14 z-10 text-left">
              {/* Metric 1: 18 holes */}
              <Reveal delay={100}>
                <div className="group relative pl-4 border-l border-white/20 transition-all duration-300 hover:border-luxury-gold hover:pl-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-none tracking-tight">
                      18
                    </span>
                    <span className="font-body text-sm sm:text-base font-normal text-white/90 lowercase tracking-wide">
                      holes
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75 max-w-[280px]">
                    A championship course where every distance demands precision and tactical thinking.
                  </p>
                </div>
              </Reveal>

              {/* Metric 2: 120 residents */}
              <Reveal delay={200}>
                <div className="group relative pl-4 border-l border-white/20 transition-all duration-300 hover:border-luxury-gold hover:pl-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-none tracking-tight">
                      120
                    </span>
                    <span className="font-body text-sm sm:text-base font-normal text-white/90 lowercase tracking-wide">
                      residents
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75 max-w-[280px]">
                    A private membership model that assures privacy, standard, and community.
                  </p>
                </div>
              </Reveal>

              {/* Metric 3: 2,500 m² clubhouse */}
              <Reveal delay={300}>
                <div className="group relative pl-4 border-l border-white/20 transition-all duration-300 hover:border-luxury-gold hover:pl-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-none tracking-tight">
                      2,500
                    </span>
                    <span className="font-body text-sm sm:text-base font-normal text-white/90 lowercase tracking-wide">
                      m² clubhouse
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75 max-w-[280px]">
                    A refined space designed for meetings, strategic sessions, and private rest.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Central Golf Ball & Segmented Dial Ring */}
            <div className="lg:col-span-4 flex items-center justify-center my-6 lg:my-0 relative">
              <Reveal delay={250}>
                <div className="relative flex items-center justify-center w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]">
                  {/* SVG Segmented Outer Dial Ring with Crosshairs & Glowing Connectors */}
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute inset-0 w-full h-full animate-spin-slow drop-shadow-[0_0_25px_rgba(200,165,90,0.25)]"
                    style={{ animationDuration: '60s' }}
                  >
                    <defs>
                      <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DFC386" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#4E7C59" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#DFC386" stopOpacity="0.9" />
                      </linearGradient>
                      <radialGradient id="ballShading" cx="35%" cy="32%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E2E8E4" />
                        <stop offset="85%" stopColor="#8A9E90" />
                        <stop offset="100%" stopColor="#32493A" />
                      </radialGradient>
                      {/* Realistic Dimple Pattern */}
                      <pattern id="dimples" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="8" cy="8" r="2.8" fill="#5F7666" fillOpacity="0.28" />
                        <circle cx="7.2" cy="7.2" r="2.4" fill="#FFFFFF" fillOpacity="0.32" />
                        <circle cx="0" cy="0" r="2.8" fill="#5F7666" fillOpacity="0.28" />
                        <circle cx="16" cy="0" r="2.8" fill="#5F7666" fillOpacity="0.28" />
                        <circle cx="0" cy="16" r="2.8" fill="#5F7666" fillOpacity="0.28" />
                        <circle cx="16" cy="16" r="2.8" fill="#5F7666" fillOpacity="0.28" />
                      </pattern>
                    </defs>

                    {/* Outer Coordinate Ring Guides */}
                    <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

                    {/* Segmented Metallic Ring Arcs */}
                    <path
                      d="M 200,45 A 155,155 0 0,1 345,155"
                      fill="none"
                      stroke="url(#ringGold)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 355,200 A 155,155 0 0,1 245,345"
                      fill="none"
                      stroke="url(#ringGold)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 200,355 A 155,155 0 0,1 55,245"
                      fill="none"
                      stroke="url(#ringGold)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 45,200 A 155,155 0 0,1 155,55"
                      fill="none"
                      stroke="url(#ringGold)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />

                    {/* Outer Cardinal Axis Tick Marks */}
                    <line x1="200" y1="2" x2="200" y2="28" stroke="#DFC386" strokeWidth="2" />
                    <line x1="200" y1="372" x2="200" y2="398" stroke="#DFC386" strokeWidth="2" />
                    <line x1="2" y1="200" x2="28" y2="200" stroke="#DFC386" strokeWidth="2" />
                    <line x1="372" y1="200" x2="398" y2="200" stroke="#DFC386" strokeWidth="2" />

                    {/* Connector Rays Spreading to Nodes */}
                    <line x1="60" y1="120" x2="10" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="60" cy="120" r="3" fill="#DFC386" />
                    <line x1="340" y1="120" x2="390" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="340" cy="120" r="3" fill="#DFC386" />
                    <line x1="60" y1="280" x2="10" y2="320" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="60" cy="280" r="3" fill="#DFC386" />
                    <line x1="340" y1="280" x2="390" y2="320" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="340" cy="280" r="3" fill="#DFC386" />
                  </svg>

                  {/* 3D Realistic Golf Ball Centerpiece */}
                  <div className="relative z-10 w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] lg:w-[195px] lg:h-[195px] rounded-full overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_35px_rgba(255,255,255,0.2)]">
                    {/* SVG 3D Ball Rendering */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Sphere base gradient */}
                      <circle cx="100" cy="100" r="99" fill="url(#ballShading)" />
                      {/* Dimple overlay with blend mode */}
                      <circle cx="100" cy="100" r="99" fill="url(#dimples)" />
                      {/* Specular Highlight on Top-Left */}
                      <ellipse cx="65" cy="55" rx="35" ry="22" fill="#FFFFFF" fillOpacity="0.45" transform="rotate(-25 65 55)" />
                      {/* Soft ambient inner border */}
                      <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right 3 Metrics Column */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-10 lg:space-y-14 z-10 text-left lg:text-left">
              {/* Metric 4: 365 days of access */}
              <Reveal delay={150}>
                <div className="group relative pl-4 border-l border-white/20 transition-all duration-300 hover:border-luxury-gold hover:pl-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-none tracking-tight">
                      365
                    </span>
                    <span className="font-body text-sm sm:text-base font-normal text-white/90 lowercase tracking-wide">
                      days of access
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75 max-w-[280px]">
                    The club operates year-round—decisions are not seasonal.
                  </p>
                </div>
              </Reveal>

              {/* Metric 5: 6 guests per month */}
              <Reveal delay={250}>
                <div className="group relative pl-4 border-l border-white/20 transition-all duration-300 hover:border-luxury-gold hover:pl-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-none tracking-tight">
                      6
                    </span>
                    <span className="font-body text-sm sm:text-base font-normal text-white/90 lowercase tracking-wide">
                      guests per month
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75 max-w-[280px]">
                    Invite partners and clients into an environment of equals.
                  </p>
                </div>
              </Reveal>

              {/* Metric 6: 1 clear direction */}
              <Reveal delay={350}>
                <div className="group relative pl-4 border-l border-white/20 transition-all duration-300 hover:border-luxury-gold hover:pl-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-white leading-none tracking-tight">
                      1
                    </span>
                    <span className="font-body text-sm sm:text-base font-normal text-white/90 lowercase tracking-wide">
                      clear direction
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75 max-w-[280px]">
                    A community of entrepreneurs and investors focused on long-time growth.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES PILL BAR & 6 GALLERY CARDS */}
      <section className="bg-warm-sand/40 px-6 py-20 md:px-10 md:py-28 border-t border-stone/50">
        <div className="mx-auto max-w-6xl">
          {/* Refined Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/30 bg-ivory-white px-4 py-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-forest-green shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                <span>World-Class Amenities</span>
                <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-5 font-heading text-3xl font-light text-forest-green sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12]">
                Championship Facilities{' '}
                <span className="italic font-normal text-luxury-gold">&amp; Club Services</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="my-5 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto max-w-2xl font-body text-[0.92rem] sm:text-[0.98rem] font-light leading-relaxed text-light-charcoal/90">
                From warm-up driving ranges and pro gear to luxury clubhouse dining and cart services, experience five-star golf hospitality on and off the course.
              </p>
            </Reveal>
          </div>

          {/* 6 Course Feature Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {COURSE_CARDS.map((item, idx) => (
              <Reveal key={`${item.title}-${idx}`} delay={idx * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone/80 bg-white shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-luxury-gold/60 hover:shadow-luxury-lg">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-forest-green">
                    <EstateImage
                      slug={item.slug}
                      alt={item.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="isolate h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3.5 left-4 right-4">
                      <span className="font-heading text-xl font-normal text-ivory-white drop-shadow">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-heading text-xs italic text-luxury-gold font-medium">
                        {item.tagline}
                      </span>
                      <p className="mt-2.5 font-body text-[0.88rem] font-light leading-relaxed text-light-charcoal/90">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK YOUR TEE TIME TODAY & CONTACT */}
      <section className="bg-deep-forest px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Left: Booking Occasions */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="lux-label text-muted-gold">Book Your Tee Time Today</span>
              <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-ivory-white md:text-5xl">
                A Perfect Getaway For
                <span className="block italic text-luxury-gold">Every Occasion</span>
              </h2>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-ivory-white/80">
                Reserve custom tee times, corporate group tournaments, or stay-and-play packages.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {BOOKING_TYPES.map((t) => (
                  <div
                    key={t.title}
                    className="rounded-lg border border-ivory-white/15 bg-ivory-white/5 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2.5 font-heading text-base font-medium text-luxury-gold">
                      <t.icon className="h-4 w-4" />
                      <span>{t.title}</span>
                    </div>
                    <p className="mt-2 font-body text-xs font-light text-ivory-white/70">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/enquire" className="lux-btn-gold">
                  <span>Book Your Tee Time</span>
                </Link>
                <a href="tel:+917588775757" className="lux-btn-light">
                  <span>Call Pro Shop</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Reach Us Card */}
          <div className="lg:col-span-5 flex flex-col justify-center border-t border-ivory-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <Reveal delay={150}>
              <span className="lux-label text-muted-gold">Reach Us</span>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-heading text-lg font-medium text-ivory-white">
                    Bambardara Agrotourism Pvt. Ltd.
                  </h4>
                  <p className="mt-2 flex items-start gap-3 font-body text-sm font-light leading-relaxed text-ivory-white/80">
                    <FaMapMarkerAlt className="mt-1 h-4 w-4 flex-shrink-0 text-luxury-gold" />
                    Parale Ninai, Shahuwadi, Kolhapur – 415101, Maharashtra
                  </p>
                </div>

                <div>
                  <h5 className="font-heading text-xs font-semibold uppercase tracking-wider text-luxury-gold">
                    Call &amp; WhatsApp
                  </h5>
                  <div className="mt-2 flex flex-col gap-1 font-body text-sm font-light text-ivory-white">
                    <a href="tel:+917588775757" className="flex items-center gap-2 transition-colors hover:text-luxury-gold">
                      <FaPhoneAlt className="h-3.5 w-3.5 text-luxury-gold" />
                      <span>+91 75887 75757</span>
                    </a>
                    <a href="tel:+919322275757" className="flex items-center gap-2 transition-colors hover:text-luxury-gold">
                      <FaPhoneAlt className="h-3.5 w-3.5 text-luxury-gold" />
                      <span>+91 93222 75757</span>
                    </a>
                  </div>
                </div>

                <div className="border-t border-ivory-white/15 pt-6">
                  <h5 className="font-heading text-xs font-semibold uppercase tracking-wider text-luxury-gold">
                    Official Website
                  </h5>
                  <a
                    href="https://www.bambardaraagrotourism.com"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block font-body text-sm font-light text-ivory-white/80 transition-colors hover:text-luxury-gold"
                  >
                    www.bambardaraagrotourism.com
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
