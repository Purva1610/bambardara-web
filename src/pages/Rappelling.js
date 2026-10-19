import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RappellingHero from '../components/experiences/RappellingHero';
import {
  FaShieldAlt,
  FaAward,
  FaHardHat,
  FaMountain,
  FaClock,
} from 'react-icons/fa';

const RAPPELLING_ROUTES = [
  {
    id: 'waterfall-descent',
    title: 'The 100ft Basalt Waterfall Descent',
    grade: 'Grade 4 (Signature)',
    height: '30 Meters (100 ft)',
    duration: '45-60 Mins',
    desc: 'Our flagship cliff descent alongside rushing mountain cascade spray on ancient Sahyadri basalt rock with dual safety anchors.',
    image: '/images/opt/rappelling-adventure-1280.jpg',
    tag: 'Signature Descent',
    featured: true,
  },
  {
    id: 'sunset-escarpment',
    title: 'Sunset Escarpment Face',
    grade: 'Grade 3 (Intermediate)',
    height: '22 Meters (72 ft)',
    duration: '35-45 Mins',
    desc: 'Golden-hour rappel with panoramic views over the Kadavi valley and Western Ghats ridges under expert belayer supervision.',
    image: '/images/opt/rock-climbing-hero-1280.jpg',
    tag: 'Sunset View',
    featured: false,
  },
  {
    id: 'canopy-slab',
    title: 'Forest Canopy Training Slab',
    grade: 'Grade 1-2 (All Levels)',
    height: '12 Meters (40 ft)',
    duration: '25-35 Mins',
    desc: 'Gentle angled rock face surrounded by dense rainforest, ideal for beginners, kids, and first-time harness technique coaching.',
    image: '/images/opt/rock-climbing-2-1280.jpg',
    tag: 'Beginner & Family',
    featured: false,
  },
  {
    id: 'overhang-freehang',
    title: 'Overhang Free-Hang Challenge',
    grade: 'Grade 5 (Advanced)',
    height: '35 Meters (115 ft)',
    duration: '50-65 Mins',
    desc: 'A breathless 15-meter vertical cliff followed by 20 meters of free-hanging descent into the canyon with Petzl descenders.',
    image: '/images/opt/rock-climbing-3-1280.jpg',
    tag: 'High Adrenaline',
    featured: false,
  },
];

export default function Rappelling() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredRoutes = RAPPELLING_ROUTES.filter((r) => {
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
    document.title = 'Cliff Rappelling Adventure | Bambarddara Agro Tourism Pvt. Ltd.';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ivory-white min-h-screen text-dark-charcoal font-body">
      {/* ── Exact Reference Hero Section ── */}
      <RappellingHero
        onExploreClick={() => {
          const el = document.getElementById('rappelling-routes');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ── Rappelling Circuits & Route Selection ── */}
      <section id="rappelling-routes" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body font-bold uppercase tracking-[0.2em] text-forest-green text-sm md:text-base">
            Choose Your Descent
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-charcoal mt-2 mb-4 tracking-tight">
            Curated Basalt Cliff Rappels
          </h2>
          <p className="font-body text-light-charcoal text-sm md:text-base leading-relaxed">
            From introductory low-angle slabs for beginners to sheer 100ft free-hang drops for thrill-seekers, every descent uses redundant dual-line anchor systems bolted to UIAA standards.
          </p>

          {filterQuery && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-sm text-light-charcoal">
                Filtering by: <strong className="text-dark-charcoal">"{filterQuery}"</strong>
              </span>
              <button
                onClick={() => setFilterQuery('')}
                className="text-xs text-forest-green hover:underline uppercase font-bold cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="group bg-ivory-white rounded-2xl border border-stone/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full justify-between"
            >
              {/* Route Image Container */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-warm-sand shrink-0">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-forest-green text-white text-[11px] font-bold uppercase px-3 py-1 font-body tracking-wider rounded-md shadow">
                  {route.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 font-semibold rounded-md">
                  {route.grade}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-dark-charcoal mb-2 leading-snug min-h-[3.25rem] flex items-center">
                    {route.title}
                  </h3>
                  <p className="font-body text-light-charcoal text-xs sm:text-sm leading-relaxed mb-6 font-light line-clamp-3">
                    {route.desc}
                  </p>
                </div>

                <div className="mt-auto space-y-2.5 border-t border-stone/20 pt-4 text-xs text-light-charcoal font-body">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 shrink-0 text-light-charcoal">
                      <FaMountain className="text-forest-green" />
                      <span>Descent Height:</span>
                    </span>
                    <strong className="text-dark-charcoal text-right font-semibold">{route.height}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 shrink-0 text-light-charcoal">
                      <FaClock className="text-forest-green" />
                      <span>Duration:</span>
                    </span>
                    <strong className="text-dark-charcoal text-right font-semibold">{route.duration}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-auto shrink-0">
                <Link
                  to="/enquire"
                  className="w-full block text-center bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold uppercase tracking-wider text-xs sm:text-sm py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book This Descent
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety Standards Banner ── */}
      <section className="bg-deep-forest text-white py-16 px-6 sm:px-12 lg:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-forest-green/40 text-luxury-gold text-2xl rounded-xl shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                Dual-Line Safety Rigging
              </h4>
              <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                Two completely independent dynamic lines with continuous belay backup operated by a dedicated guide on top.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-forest-green/40 text-luxury-gold text-2xl rounded-xl shrink-0">
              <FaAward />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                IMF Certified Instructors
              </h4>
              <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                Led by Indian Mountaineering Foundation certified technical leads with decades of Sahyadri rock experience.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-forest-green/40 text-luxury-gold text-2xl rounded-xl shrink-0">
              <FaHardHat />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                Full Petzl Gear Included
              </h4>
              <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                CE-certified Petzl Corax harnesses, Boreo vented helmets, figure-8 descenders, and heavy-duty rappel gloves provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 text-center max-w-4xl mx-auto">
        <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-charcoal mb-4">
          Ready For The Vertical Drop?
        </h2>
        <p className="font-body text-light-charcoal text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          Book your private or small-group cliff rappelling expedition today. Morning and golden-hour sunset slots available daily at the Bambarddara estate.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/enquire"
            className="w-full sm:w-auto bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold uppercase tracking-wider text-base px-8 py-4 rounded-full transition-colors duration-200 shadow-md"
          >
            Reserve Your Session
          </Link>
          <Link
            to="/experiences"
            className="w-full sm:w-auto border border-forest-green hover:bg-forest-green hover:text-white text-forest-green font-body font-bold uppercase tracking-wider text-base px-8 py-4 rounded-full transition-colors duration-200"
          >
            Explore All Adventures
          </Link>
        </div>
      </section>
    </div>
  );
}
