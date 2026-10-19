import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaPlay } from 'react-icons/fa';

const PARTNERS = [
  {
    name: 'UIAA Global',
    subtitle: 'Safety Certified',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5v7.4l-7 3.5-7-3.5V8.3l7-3.5zm0 3.2L7 10.5v3l5-2.5 5 2.5v-3L12 8z" />
      </svg>
    ),
  },
  {
    name: 'IMF Certified',
    subtitle: 'Mountaineering Fed',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 6l-3.8 5.7 1.6 2.4L10 17H3l6-9 2 3L14 6zm7 11h-7l4-6 3 6z" />
      </svg>
    ),
  },
  {
    name: 'PETZL PRO',
    subtitle: 'Access & Rigging',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'BLACK DIAMOND',
    subtitle: 'Equip Benchmark',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 12l8 10 8-10L12 2zm0 4.2L17.2 12 12 18.5 6.8 12 12 6.2z" />
      </svg>
    ),
  },
];

const EVENTS_DATA = [
  {
    id: 'overhang-climb',
    date: '23 September 2024',
    title: 'Mountain Overhang Climb',
    desc: 'Master advanced friction climbing and dynamic roof holds suspended above the scenic canyon with expert spotters.',
    isFeatured: true,
    bgImage: '/images/opt/mountain-overhang.jpg',
  },
  {
    id: 'high-climbing',
    date: '12 January 2025',
    title: 'High Climbing Sahyadris',
    desc: 'Sustained multi-pitch ascent on ancient granite monoliths with IMF-certified expedition leaders and panoramic vistas.',
    isFeatured: false,
  },
  {
    id: 'boulder-meet',
    date: '01 August 2024',
    title: 'Monsoon Bouldering Meet',
    desc: 'Technical low-level boulder circuits in lush forest canopy with premium high-density crash pads and spotter coaching.',
    isFeatured: false,
  },
  {
    id: 'crag-camp',
    date: '19 February 2025',
    title: 'Kadavi Valley Crag Camp',
    desc: 'Comprehensive introduction to rope management, top-roping fundamentals, footwork precision, and anchor rigging.',
    isFeatured: false,
  },
  {
    id: 'night-ascent',
    date: '25 October 2024',
    title: 'Starlight Night Ascent',
    desc: 'Ascend illuminated volcanic basalt towers under clear night skies with certified lead guides and headlamp gear.',
    isFeatured: false,
  },
];

export default function RockClimbingEvents() {
  return (
    <div id="rock-climbing-events" className="w-full select-none font-body">
      {/* ── 1. Brand Partners / Certification Bar ── */}
      <section className="w-full bg-deep-forest text-white py-5 px-6 sm:px-12 lg:px-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-3.5 py-2 md:py-1 px-4 text-center group cursor-default"
            >
              <div className="text-luxury-gold group-hover:text-white transition-colors duration-200">
                {partner.icon}
              </div>
              <div className="text-left">
                <div className="font-heading font-black uppercase text-base sm:text-lg tracking-wider text-white leading-tight">
                  {partner.name}
                </div>
                <div className="text-[10px] sm:text-[11px] font-body uppercase tracking-widest text-white/70 font-medium">
                  {partner.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Events & Club Benefits Section ── */}
      <section className="w-full bg-ivory-white py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-b border-stone/40">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 sm:mb-16">
            <span className="font-body font-bold uppercase tracking-[0.24em] text-luxury-gold text-sm sm:text-base block mb-2">
              OUR EVENT
            </span>
            <h2 className="font-heading font-extrabold uppercase text-3xl sm:text-4xl lg:text-[46px] text-dark-charcoal tracking-tight leading-[1.1] max-w-2xl mx-auto">
              Get Various Benefits If You Join Our Club
            </h2>
          </div>

          {/* Cards Grid: Row 1 (2 larger cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Featured Image Card (Card 1) */}
            <div className="relative rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[380px] flex flex-col justify-end p-8 shadow-md hover:shadow-xl transition-all duration-300 group border border-stone/30">
              {/* Background Photo */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={`${process.env.PUBLIC_URL}${EVENTS_DATA[0].bgImage}`}
                  alt={EVENTS_DATA[0].title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
              </div>

              {/* Card Foreground Content */}
              <div className="relative z-10 text-white">
                {/* Date Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3.5 py-1.5 mb-4 rounded-md shadow-sm font-body">
                  <FaCalendarAlt className="text-luxury-gold text-[11px]" />
                  <span>{EVENTS_DATA[0].date}</span>
                </div>

                <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-white mb-2 leading-tight">
                  {EVENTS_DATA[0].title}
                </h3>
                <p className="font-body text-white/80 text-xs sm:text-sm leading-relaxed mb-5 max-w-lg font-light">
                  {EVENTS_DATA[0].desc}
                </p>

                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 text-white hover:text-luxury-gold font-body font-bold uppercase text-sm tracking-wider transition-colors duration-200"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white">
                    <FaPlay className="ml-[1px]" />
                  </span>
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Standard White Card (Card 2) */}
            <div className="relative bg-ivory-white rounded-2xl p-8 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-stone/30 overflow-hidden group">
              {/* Mountain Silhouette Watermark in Card Background */}
              <div className="absolute right-0 bottom-0 w-3/4 h-3/4 pointer-events-none opacity-45">
                <svg
                  viewBox="0 0 300 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-stone/40"
                >
                  <polygon points="50,200 160,80 250,200" fill="#f5efe6" />
                  <polygon points="160,80 210,200 250,200" fill="#eae1d3" />
                  <polygon points="120,200 220,50 300,200" fill="#f8f4ec" />
                  <polygon points="220,50 270,200 300,200" fill="#ded4c4" />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Date Badge */}
                <div className="inline-flex items-center gap-2 bg-forest-green/10 text-forest-green border border-forest-green/25 text-xs font-semibold px-3.5 py-1.5 mb-4 rounded-md font-body">
                  <FaCalendarAlt className="text-forest-green text-[11px]" />
                  <span>{EVENTS_DATA[1].date}</span>
                </div>

                <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-dark-charcoal mb-3 leading-tight">
                  {EVENTS_DATA[1].title}
                </h3>
                <p className="font-body text-light-charcoal text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {EVENTS_DATA[1].desc}
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 text-forest-green hover:text-dark-charcoal font-body font-bold uppercase text-sm tracking-wider transition-colors duration-200"
                >
                  <span className="w-5 h-5 rounded-full bg-forest-green/15 flex items-center justify-center text-[9px] text-forest-green">
                    <FaPlay className="ml-[1px]" />
                  </span>
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Cards Grid: Row 2 (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS_DATA.slice(2).map((item) => (
              <div
                key={item.id}
                className="relative bg-ivory-white rounded-2xl p-7 min-h-[300px] flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-stone/30 overflow-hidden group"
              >
                {/* Mountain Silhouette Watermark in Card Background */}
                <div className="absolute right-0 bottom-0 w-3/4 h-3/4 pointer-events-none opacity-40">
                  <svg
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full text-stone/40"
                  >
                    <polygon points="40,200 150,70 240,200" fill="#f5efe6" />
                    <polygon points="150,70 200,200 240,200" fill="#eae1d3" />
                    <polygon points="100,200 200,40 290,200" fill="#f8f4ec" />
                    <polygon points="200,40 250,200 290,200" fill="#ded4c4" />
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-2 bg-forest-green/10 text-forest-green border border-forest-green/25 text-xs font-semibold px-3 py-1 mb-4 rounded-md font-body">
                    <FaCalendarAlt className="text-forest-green text-[10px]" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-heading font-bold uppercase text-xl sm:text-2xl text-dark-charcoal mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-light-charcoal text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-2">
                  <Link
                    to="/enquire"
                    className="inline-flex items-center gap-2 text-forest-green hover:text-dark-charcoal font-body font-bold uppercase text-sm tracking-wider transition-colors duration-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-forest-green/15 flex items-center justify-center text-[9px] text-forest-green">
                      <FaPlay className="ml-[1px]" />
                    </span>
                    <span>Learn More</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
