import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RopeCourseHero from '../components/experiences/RopeCourseHero';
import {
  FaShieldAlt,
  FaAward,
  FaHardHat,
  FaTree,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';

const ROPE_CIRCUITS = [
  {
    id: 'burma-canopy',
    title: 'The Green Canopy Burma Bridge',
    level: 'Level 1 (Beginner & Family)',
    height: '15 Feet (4.5m)',
    duration: '25-35 Mins',
    obstacles: '8 Suspended Obstacles',
    desc: 'Gentle introductory suspension bridge with dual guide handrails spanning ancient rain trees, ideal for children and first-time aerialists.',
    image: '/images/opt/bridge-1280.jpg',
    tag: 'Introductory Circuit',
    featured: false,
  },
  {
    id: 'swinging-logs',
    title: 'Swinging Log Traverse & Zig-Zag',
    level: 'Level 2 (Intermediate)',
    height: '25 Feet (7.5m)',
    duration: '35-45 Mins',
    obstacles: '12 Balance Obstacles',
    desc: 'Step across oscillating vertical logs, tightrope traverses, and spaced timber planks that test footwork and core balance.',
    image: '/images/opt/rope-swinging-logs-1280.jpg',
    tag: 'Balance & Core',
    featured: true,
  },
  {
    id: 'spider-cargo',
    title: 'Spider Web Cargo Net & High Wire',
    level: 'Level 3 (Challenger)',
    height: '35 Feet (10.5m)',
    duration: '45-55 Mins',
    obstacles: '14 High Obstacles',
    desc: 'Horizontal cargo net crawling high above the forest floor followed by single-wire high wire steps with overhead continuous lanyard.',
    image: '/images/opt/rope-course-1280.jpg',
    tag: 'High Thrill',
    featured: false,
  },
  {
    id: 'tarzan-flying-fox',
    title: 'Tarzan Swing & Flying Fox Exit',
    level: 'Level 4 (Signature Expert)',
    height: '45 Feet (13.5m)',
    duration: '50-60 Mins',
    obstacles: '10 Canopy Obstacles + Zipline',
    desc: 'The pinnacle aerial route: rope pendulum leaps, ring traverses, and an exhilarating 80-meter mini flying-fox glide over estate orchards.',
    image: '/images/opt/zipline-1280.jpg',
    tag: 'Signature Aerial',
    featured: false,
  },
];

export default function RopeCourse() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCircuits = ROPE_CIRCUITS.filter((c) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.level.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    document.title = 'Tree Canopy Rope Course | Bambarddara Agro Tourism Pvt. Ltd.';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ivory-white min-h-screen text-dark-charcoal font-body">
      {/* ── Exact Reference Hero Section ── */}
      <RopeCourseHero
        onExploreClick={() => {
          const el = document.getElementById('rope-course-circuits');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ── Rope Course Circuits & Obstacle Selection ── */}
      <section
        id="rope-course-circuits"
        className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-body font-bold uppercase tracking-[0.2em] text-forest-green text-sm md:text-base">
            Canopy Obstacle Circuits
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-charcoal mt-2 mb-4 tracking-tight">
            Suspended Tree Challenges
          </h2>
          <p className="font-body text-light-charcoal text-sm md:text-base leading-relaxed">
            Strung between mature estate trees and connected by a continuous
            closed-loop safety lifeline. Choose your difficulty or conquer all 4
            canopy circuits consecutively.
          </p>

          {filterQuery && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-sm text-light-charcoal">
                Filtering by: <strong className="text-dark-charcoal">"{filterQuery}"</strong>
              </span>
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="text-xs text-forest-green hover:underline uppercase font-bold cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Circuit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {filteredCircuits.map((circuit) => (
            <div
              key={circuit.id}
              className="group bg-ivory-white rounded-2xl border border-stone/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full justify-between hover:-translate-y-1"
            >
              {/* Circuit Image Container */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-warm-sand shrink-0">
                <img
                  src={circuit.image}
                  alt={circuit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-forest-green text-white text-[11px] font-bold uppercase px-3 py-1 font-body tracking-wider rounded-md shadow">
                  {circuit.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 font-semibold rounded-md">
                  {circuit.level}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-dark-charcoal mb-2 leading-snug min-h-[3.25rem] flex items-center">
                    {circuit.title}
                  </h3>
                  <p className="font-body text-light-charcoal text-xs sm:text-sm leading-relaxed mb-6 font-light line-clamp-3">
                    {circuit.desc}
                  </p>
                </div>

                <div className="mt-auto space-y-2.5 border-t border-stone/20 pt-4 text-xs text-light-charcoal font-body">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 shrink-0 text-light-charcoal">
                      <FaTree className="text-forest-green" />
                      <span>Canopy Height:</span>
                    </span>
                    <strong className="text-dark-charcoal text-right font-semibold">{circuit.height}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 shrink-0 text-light-charcoal">
                      <FaClock className="text-forest-green" />
                      <span>Duration:</span>
                    </span>
                    <strong className="text-dark-charcoal text-right font-semibold">{circuit.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 shrink-0 text-light-charcoal">
                      <FaCheckCircle className="text-forest-green" />
                      <span>Challenges:</span>
                    </span>
                    <strong className="text-dark-charcoal text-right font-semibold">{circuit.obstacles}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0 mt-auto shrink-0">
                <Link
                  to="/enquire"
                  className="w-full block text-center bg-forest-green hover:bg-dark-charcoal text-white font-body font-bold uppercase tracking-wider text-xs sm:text-sm py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book This Circuit
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
                Continuous Lifeline Belay
              </h4>
              <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                Zero accidental unhooking. Participants are secured to an
                unbroken steel cable from start to finish via continuous roller
                carabiners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-forest-green/40 text-luxury-gold text-2xl rounded-xl shrink-0">
              <FaAward />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                Certified Arborist Rigging
              </h4>
              <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                Non-invasive tree collars protect living canopies while engineered
                steel cables undergo daily tension and torque calibration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-forest-green/40 text-luxury-gold text-2xl rounded-xl shrink-0">
              <FaHardHat />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase text-xl mb-1 text-white">
                CE Full-Body Harnesses
              </h4>
              <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                High-end Petzl full-body aerial harnesses and ventilated safety
                helmets fitted individually for all children and adult climbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 text-center max-w-4xl mx-auto">
        <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-charcoal mb-4">
          Ready to Step Into The Canopy?
        </h2>
        <p className="font-body text-light-charcoal text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          Experience exhilarating aerial balance courses set within pristine
          Sahyadri forest canopies at Bambarddara Estate. Morning and afternoon
          slots available daily with expert guides.
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
