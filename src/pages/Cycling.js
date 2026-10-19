import React, { useState, useEffect } from 'react';
import CyclingHero from '../components/experiences/CyclingHero';
import CyclingStory from '../components/experiences/CyclingStory';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';
import {
  FaRoute,
  FaShieldAlt,
  FaCheck,
  FaPhoneAlt,
  FaUserCheck,
} from 'react-icons/fa';

const TRAILS = [
  {
    id: 'pine-ridge',
    title: 'Western Ghats Pine Ridge',
    distance: '14.5 KM',
    elevation: '+480m Climb',
    difficulty: 'Challenging / Technical',
    desc: 'High-altitude singletrack winding through dense Western Ghats cloud forests, rock gardens, and sweeping ridge viewpoints.',
    surface: 'Natural Singletrack & Granite Slabs',
    recommendedBike: 'Pivot Mach 5.5 Carbon / Full Suspension',
  },
  {
    id: 'forest-loop',
    title: 'Estate Forest & Orchard Loop',
    distance: '8.2 KM',
    elevation: '+180m Climb',
    difficulty: 'Moderate / All Skill Levels',
    desc: 'Smooth gravel tracks and flowy woodland berms passing through organic coffee plantations, spice gardens, and tranquil water gullies.',
    surface: 'Hardpack Gravel & Forest Trail',
    recommendedBike: 'Trail 429 / Hardtail or e-MTB',
  },
  {
    id: 'valley-lake',
    title: 'Bambardara Lake Perimeter',
    distance: '5.0 KM',
    elevation: '+60m Gentle Roll',
    difficulty: 'Easy / Family & Leisure',
    desc: 'Gentle, scenic lakeside path with panoramic water vistas, flat terrain, rest gazebos, and bird-watching photo spots.',
    surface: 'Paved & Packed Soil Path',
    recommendedBike: 'All Bikes / Family Cruisers',
  },
];

const FLEET = [
  {
    name: 'Pivot Mach 5.5 Carbon (Anniversary Blue)',
    category: 'Enduro & Technical Trail',
    specs: '160mm Fox Factory / 27.5" Reynolds Carbon / 1x12 Eagle',
    rate: '₹1,499 / 2 Hours',
    badge: 'Pro Tier',
  },
  {
    name: 'Pivot Trail 429 (Forest Green)',
    category: 'Fast Cross-Country & Trail',
    specs: '140mm Fox Float / 29" Wheels / Progressive Geometry',
    rate: '₹1,199 / 2 Hours',
    badge: 'Most Popular',
  },
  {
    name: 'Pivot Shuttle SL e-MTB (Matte Titanium)',
    category: 'Lightweight Electric Mountain Bike',
    specs: '60Nm Motor / 430Wh Battery / 150mm Travel / 29er',
    rate: '₹1,999 / 2 Hours',
    badge: 'Electric Boost',
  },
  {
    name: 'Bambardara Comfort All-Terrain Cruisers',
    category: 'Leisure & Family Exploration',
    specs: 'Ergonomic saddles / Front Suspension / Shimano 8-Speed',
    rate: '₹499 / 2 Hours',
    badge: 'Family Pick',
  },
];

export default function Cycling() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    bikeType: 'Pivot Mach 5.5 Carbon (Anniversary Blue)',
    riders: '2',
    trail: 'Western Ghats Pine Ridge',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Luxury Mountain Biking & Cycling Trails — Bambardara Estate';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory-white text-dark-charcoal min-h-screen">
      {/* ── HERO SECTION MATCHING REFERENCE ── */}
      <CyclingHero />

      {/* ── WHY WE RIDE EDITORIAL STORY SECTION ── */}
      <CyclingStory />

      {/* ── TRAIL CIRCUITS SECTION ── */}
      <section id="trails" className="py-20 md:py-28 px-6 max-w-editorial mx-auto">
        <SectionHeading
          label="Curated Mountain Tracks"
          title="World-Class Western Ghats Trail Networks"
          lede="From aggressive downhill singletrack to tranquil lakeside family paths, experience 79+ acres of dedicated mountain biking terrain."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAILS.map((trail, idx) => (
            <Reveal key={trail.id} delay={idx * 120}>
              <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-lg p-7 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-forest-green">
                    <span>{trail.distance}</span>
                    <span className="text-luxury-gold font-bold">{trail.elevation}</span>
                  </div>

                  <h3 className="mt-3 font-heading text-2xl font-light text-forest-green group-hover:text-luxury-gold transition-colors">
                    {trail.title}
                  </h3>

                  <span className="mt-2 inline-block text-[0.72rem] font-bold uppercase tracking-wider text-light-charcoal bg-warm-sand px-2.5 py-0.5 rounded">
                    {trail.difficulty}
                  </span>

                  <p className="mt-4 font-body text-sm font-light text-light-charcoal leading-relaxed">
                    {trail.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-stone/80 text-xs text-light-charcoal flex flex-col gap-1.5">
                  <div>
                    <strong className="text-dark-charcoal">Terrain:</strong> {trail.surface}
                  </div>
                  <div>
                    <strong className="text-dark-charcoal">Optimal Bike:</strong> {trail.recommendedBike}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PREMIUM FLEET & SPECIFICATIONS ── */}
      <section className="py-20 md:py-28 px-6 bg-warm-sand/40 border-y border-stone">
        <div className="max-w-editorial mx-auto">
          <SectionHeading
            label="Championship Armory"
            title="Premium Bicycle Fleet & Rental Packages"
            lede="Every bicycle is precision-tuned, washed, and pressure-checked by certified mechanics before every excursion."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET.map((bike, idx) => (
              <Reveal key={bike.name} delay={idx * 100}>
                <div className="bg-ivory-white border border-stone rounded-lg p-6 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[0.68rem] uppercase font-bold tracking-widest text-forest-green bg-forest-green/10 px-2.5 py-1 rounded">
                      {bike.badge}
                    </span>
                    <h4 className="mt-4 font-heading text-xl font-light text-dark-charcoal leading-snug">
                      {bike.name}
                    </h4>
                    <p className="mt-1 text-xs text-luxury-gold font-semibold uppercase tracking-wider">
                      {bike.category}
                    </p>
                    <p className="mt-3 text-xs text-light-charcoal leading-relaxed font-mono">
                      {bike.specs}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone/80 flex items-center justify-between">
                    <span className="font-heading text-lg font-light text-forest-green">
                      {bike.rate}
                    </span>
                    <a
                      href="#reserve"
                      className="text-xs uppercase font-bold tracking-wider text-luxury-gold hover:text-forest-green underline"
                    >
                      Book &rarr;
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY, HELMETS & CERTIFIED GUIDES ── */}
      <section className="py-16 md:py-24 px-6 max-w-editorial mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="border border-stone bg-ivory-white p-7 rounded-lg flex items-start gap-4">
            <FaShieldAlt className="text-3xl text-forest-green shrink-0 mt-1" />
            <div>
              <h4 className="font-heading text-lg text-forest-green font-normal">
                Complimentary Pro Safety Gear
              </h4>
              <p className="mt-2 text-xs text-light-charcoal leading-relaxed">
                Every rental includes Fox/Giro full-face or open trail helmets, knee and elbow pads, and high-visibility safety jerseys.
              </p>
            </div>
          </div>

          <div className="border border-stone bg-ivory-white p-7 rounded-lg flex items-start gap-4">
            <FaUserCheck className="text-3xl text-forest-green shrink-0 mt-1" />
            <div>
              <h4 className="font-heading text-lg text-forest-green font-normal">
                Certified Trail Marshals
              </h4>
              <p className="mt-2 text-xs text-light-charcoal leading-relaxed">
                First-time rider? Book a private trail guide who leads optimal lines, pace management, and emergency technical support.
              </p>
            </div>
          </div>

          <div className="border border-stone bg-ivory-white p-7 rounded-lg flex items-start gap-4">
            <FaRoute className="text-3xl text-forest-green shrink-0 mt-1" />
            <div>
              <h4 className="font-heading text-lg text-forest-green font-normal">
                GPS Map Tracking & Wash Stations
              </h4>
              <p className="mt-2 text-xs text-light-charcoal leading-relaxed">
                Downloadable GPX trail routes, on-course rescue radios, and post-ride bike wash and gear locker facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESERVATION / BOOKING SECTION ── */}
      <section id="reserve" className="py-20 md:py-28 px-6 bg-deep-forest text-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase font-body font-bold tracking-widest text-luxury-gold">
            Western Ghats Expeditions
          </span>
          <h2 className="mt-2 font-heading text-3xl sm:text-5xl font-light text-white">
            Reserve Your Mountain Bike &amp; Trail Pass
          </h2>
          <p className="mt-4 text-sm text-ivory-white/70 font-light">
            Book in advance to ensure your preferred frame size and suspension tuning are prepared upon your arrival.
          </p>

          {submitted ? (
            <div className="mt-10 bg-white/10 border border-white/20 p-8 rounded-lg text-center backdrop-blur-md">
              <FaCheck className="text-4xl text-luxury-gold mx-auto mb-3" />
              <h3 className="font-heading text-2xl text-white">Reservation Request Received</h3>
              <p className="mt-2 text-sm text-ivory-white/70">
                Thank you, {formData.name}. Our Trail Concierge will contact you shortly at {formData.phone} to confirm your bike sizing and trail timing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 text-left grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Reservation Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Select Bicycle Fleet *
                </label>
                <select
                  value={formData.bikeType}
                  onChange={(e) => setFormData({ ...formData, bikeType: e.target.value })}
                  className="w-full bg-dark-charcoal border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                >
                  {FLEET.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name} ({b.rate})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Preferred Trail Circuit
                </label>
                <select
                  value={formData.trail}
                  onChange={(e) => setFormData({ ...formData, trail: e.target.value })}
                  className="w-full bg-dark-charcoal border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                >
                  {TRAILS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-ivory-white/70 mb-1.5">
                  Rider Height / Frame Size Notes
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Please specify rider heights (e.g. 5ft 10in, Small / Medium / Large frame) or requested pedal types (flat vs clipless)."
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full bg-forest-green hover:bg-forest-green/90 text-white font-body font-bold tracking-[0.2em] uppercase py-4 rounded shadow-xl transition-all duration-200 transform hover:scale-[1.01]"
                >
                  Confirm Bicycle &amp; Trail Booking
                </button>
              </div>
            </form>
          )}

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-ivory-white/60">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-luxury-gold" /> Direct Trail Desk: +91 94220 12345
            </span>
            <span>&bull;</span>
            <span>Operating Hours: 06:30 AM &ndash; 06:00 PM Daily</span>
          </div>
        </div>
      </section>
    </main>
  );
}
