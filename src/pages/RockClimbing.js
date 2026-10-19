import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RockClimbingHero from '../components/experiences/RockClimbingHero';
import RockClimbingAbout from '../components/experiences/RockClimbingAbout';
import RockClimbingEvents from '../components/experiences/RockClimbingEvents';
import RockClimbingBenefits from '../components/experiences/RockClimbingBenefits';
import {
  FaShieldAlt,
  FaAward,
  FaHardHat,
  FaMountain,
  FaClock,
} from 'react-icons/fa';

const CLIMBING_ROUTES = [
  {
    id: 'overhang-challenge',
    title: 'The Overhang Roof Ascent',
    grade: 'Grade 6B+ (Advanced)',
    height: '35 Meters',
    duration: '45-60 Mins',
    desc: 'Our flagship dramatic rock roof challenge. Suspended over sheer vertical drop-offs with natural finger pockets and dynamic jug holds, overseen by lead belayers.',
    image: '/images/opt/rock-climbing-hero-1280.jpg',
    tag: 'Signature Challenge',
    featured: true,
  },
  {
    id: 'granite-face',
    title: 'Granite Monolith Vertical Face',
    grade: 'Grade 5C (Intermediate)',
    height: '25 Meters',
    duration: '35-45 Mins',
    desc: 'Sustained friction climbing on ancient weathered basalt monoliths. Develop precise footwork and balance techniques with full top-rope safety systems.',
    image: '/images/opt/rock-climbing-3-1280.jpg',
    tag: 'Most Popular',
    featured: false,
  },
  {
    id: 'bouldering-circuit',
    title: 'Forest Bouldering Circuit',
    grade: 'V1 - V4 (All Levels)',
    height: '5-8 Meters',
    duration: 'Flexible / Open',
    desc: 'Low-altitude technical boulder problems surrounded by lush rainforest canopy, equipped with multi-layered high-density crash pads and spotter guides.',
    image: '/images/opt/rock-climbing-2-1280.jpg',
    tag: 'Beginner & Technique',
    featured: false,
  },
  {
    id: 'alpine-tower',
    title: 'Sahyadri Ridge Multi-Pitch',
    grade: 'Grade 6A (Expedition)',
    height: '60 Meters',
    duration: '90-120 Mins',
    desc: 'A full two-pitch guided mountain climb offering 360-degree vistas across the Kadavi reservoir valley and mist-shrouded rainforest peaks.',
    image: '/images/opt/rock-climbing-4-1280.jpg',
    tag: 'Panorama Expedition',
    featured: false,
  },
];

export default function RockClimbing() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredRoutes = CLIMBING_ROUTES.filter((r) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.grade.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q) ||
      r.tag.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    document.title = 'Rock Climbing & Bouldering | Bambarddara Agro Tourism Pvt. Ltd.';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ivory-white min-h-screen text-dark-charcoal font-body">
      {/* ── Exact Reference Hero Section ── */}
      <RockClimbingHero
        onExploreClick={() => {
          const el = document.getElementById('rock-climbing-about') || document.getElementById('climbing-routes');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ── Reference About Us Section ("Nothing Feels Better Than A Successful Climb") ── */}
      <RockClimbingAbout
        onLearnMoreClick={() => {
          const el = document.getElementById('rock-climbing-events') || document.getElementById('climbing-routes');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ── Reference Events & Club Benefits Section ("OUR EVENT - Get Various Benefits If You Join Our Club") ── */}
      <RockClimbingEvents />

      {/* ── Reference Benefits Section ("BENEFIT - Get Various Benefits If You Join Our Club") ── */}
      <RockClimbingBenefits
        onLearnMoreClick={() => {
          const el = document.getElementById('climbing-routes');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ── Climbing Circuits & Route Selection ── */}
      <section id="climbing-routes" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body font-bold uppercase tracking-[0.2em] text-forest-green text-sm md:text-base">
            Choose Your Ascent
          </span>
          <h2 className="font-heading font-extrabold uppercase text-4xl sm:text-5xl text-dark-charcoal mt-2 mb-4 tracking-tight">
            Curated Natural Cliff Circuits
          </h2>
          <p className="font-body text-light-charcoal text-sm md:text-base leading-relaxed">
            From introductory bouldering for novices to technical overhang roofs for veteran mountaineers, each route is bolted to international UIAA standards.
          </p>

          {filterQuery && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-sm text-light-charcoal">
                Filtering by: <strong className="text-forest-green">"{filterQuery}"</strong>
              </span>
              <button
                onClick={() => setFilterQuery('')}
                className="text-xs text-forest-green hover:underline uppercase font-bold"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="group bg-ivory-white rounded-none border border-stone/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Route Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-warm-sand/30">
                  <img
                    src={route.image}
                    alt={route.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-forest-green text-white text-[11px] font-bold uppercase px-3 py-1 font-body tracking-wider shadow-sm">
                    {route.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 font-semibold rounded-none">
                    {route.grade}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-heading font-bold uppercase text-2xl text-dark-charcoal mb-2 leading-tight">
                    {route.title}
                  </h3>
                  <p className="font-body text-light-charcoal text-xs sm:text-sm leading-relaxed mb-6">
                    {route.desc}
                  </p>

                  <div className="space-y-2 border-t border-stone/30 pt-4 text-xs text-light-charcoal">
                    <div className="flex items-center gap-2">
                      <FaMountain className="text-forest-green" />
                      <span>Ascent Height: <strong className="text-dark-charcoal">{route.height}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-forest-green" />
                      <span>Duration: <strong className="text-dark-charcoal">{route.duration}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  to="/enquire"
                  className="w-full block text-center bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold uppercase tracking-wider text-sm py-3 transition-colors duration-200"
                >
                  Book This Route
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety Standards Banner ── */}
      <section className="bg-deep-forest text-white py-16 px-6 sm:px-12 lg:px-20 border-y border-stone/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-luxury-gold/20 text-luxury-gold text-2xl shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                Certified UIAA Equipment
              </h4>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Every anchor, carabiner, harness, and dynamic rope undergoes daily ultrasonic tension inspection and strict load cycling audits.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-luxury-gold/20 text-luxury-gold text-2xl shrink-0">
              <FaAward />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                IMF Certified Belayers
              </h4>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Led exclusively by Indian Mountaineering Foundation certified instructors with high-altitude alpine rescue accreditations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-luxury-gold/20 text-luxury-gold text-2xl shrink-0">
              <FaHardHat />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                Full Technical Gear Included
              </h4>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Professional climbing shoes, chalk bags, Petzl vented helmets, and belay glasses provided to all participants at no extra charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ready to Climb CTA ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 text-center max-w-4xl mx-auto">
        <h2 className="font-heading font-extrabold uppercase text-4xl sm:text-5xl text-dark-charcoal mb-4">
          Ready To Conquer The Cliff?
        </h2>
        <p className="font-body text-light-charcoal text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Book your private or small-group rock climbing expedition today. Morning and golden-hour sunset slots available daily at the Bambarddara estate.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/enquire"
            className="w-full sm:w-auto bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold uppercase tracking-wider text-base px-8 py-4 transition-colors duration-200 shadow-md"
          >
            Reserve Your Session
          </Link>
          <Link
            to="/experiences"
            className="w-full sm:w-auto border border-dark-charcoal hover:bg-dark-charcoal hover:text-white text-dark-charcoal font-body font-bold uppercase tracking-wider text-base px-8 py-4 transition-colors duration-200"
          >
            Explore All Adventures
          </Link>
        </div>
      </section>
    </div>
  );
}
