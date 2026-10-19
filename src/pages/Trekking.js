import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCompass,
  FaMountain,
  FaShieldAlt,
  FaUserCheck,
  FaBinoculars,
  FaClock,
  FaPhoneAlt,
  FaStar,
  FaCheckCircle,
} from 'react-icons/fa';
import TrekkingHero from '../components/experiences/TrekkingHero';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const TRAILS = [
  {
    id: 'sunrise-ridge',
    title: 'Sunrise Ridge Escarpment',
    difficulty: 'Moderate',
    distance: '5.4 KM',
    duration: '2.5 Hours',
    elevation: '+320 m',
    desc: 'Ascend through early-morning mist to greet the first golden rays breaking over the Western Ghats mountain ridges.',
    highlights: ['Cloud sea photography', 'Complimentary dawn coffee on summit', 'Gentle return slope'],
  },
  {
    id: 'cloudline-traverse',
    title: 'Cloudline Summit Traverse',
    difficulty: 'Challenging',
    distance: '8.2 KM',
    duration: '4 Hours',
    elevation: '+540 m',
    desc: 'A rugged high-altitude expedition across granite boulders, ancient oak canopy, and windswept ridgeline saddles.',
    highlights: ['Alpine ridge panorama', 'Wildlife & eagle spotting', 'Technical rocky trails'],
  },
  {
    id: 'canyon-waterfall',
    title: 'Kadavi Canyon & Hidden Cascade',
    difficulty: 'Easy / Family',
    distance: '3.6 KM',
    duration: '1.5 Hours',
    elevation: '+160 m',
    desc: 'A gentle shaded trek following crystal-clear mountain streams to a secluded natural waterfall plunge pool.',
    highlights: ['Stream crossing bridges', 'Wild orchids & butterflies', 'Shaded picnic groves'],
  },
];

const GUIDES = [
  {
    name: 'Rajesh Patil',
    experience: '12 Years Western Ghats',
    role: 'Head Wilderness Guide',
    cert: 'Wilderness First Responder (WFR)',
  },
  {
    name: 'Sunita Deshmukh',
    experience: '8 Years Trail Leadership',
    role: 'Botanist & Alpine Guide',
    cert: 'High Altitude Mountaineering Certified',
  },
  {
    name: 'Vikram Shinde',
    experience: '10 Years Mountain Search & Rescue',
    role: 'Safety Marshal & Lead Trekker',
    cert: 'Certified Mountain Rescue Technician',
  },
];

export default function Trekking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    trail: 'sunrise-ridge',
    date: '',
    guests: '2',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* ── HERO SECTION (Exact Reference Design) ── */}
      <TrekkingHero />

      {/* ── EXPEDITION TRAILS SHOWCASE ── */}
      <section id="community" className="py-20 md:py-28 px-6 bg-[#f4f7f5] border-b border-stone">
        <div className="max-w-editorial mx-auto">
          <SectionHeading
            label="Curated Escarpment Routes"
            title="Choose Your Mountain Path"
            lede="Every trail is cleared, mapped with satellite coordinates, and supervised by certified wilderness guides."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAILS.map((trail, i) => (
              <Reveal key={trail.id} delay={i * 120}>
                <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-xl p-7 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-luxury group">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.68rem] uppercase font-body font-bold tracking-widest text-forest-green bg-forest-green/10 px-3 py-1 rounded-full">
                        {trail.difficulty}
                      </span>
                      <span className="text-xs font-body text-light-charcoal font-medium">
                        {trail.elevation}
                      </span>
                    </div>

                    <h3 className="font-heading font-medium text-2xl text-dark-charcoal mt-4 group-hover:text-forest-green transition-colors">
                      {trail.title}
                    </h3>

                    <p className="font-body text-xs text-light-charcoal font-light leading-relaxed mt-2.5">
                      {trail.desc}
                    </p>

                    <div className="mt-5 pt-4 border-t border-stone/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-body text-dark-charcoal">
                        <span className="text-light-charcoal flex items-center gap-1.5">
                          <FaCompass className="text-forest-green" /> Distance:
                        </span>
                        <span className="font-semibold">{trail.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-body text-dark-charcoal">
                        <span className="text-light-charcoal flex items-center gap-1.5">
                          <FaClock className="text-forest-green" /> Duration:
                        </span>
                        <span className="font-semibold">{trail.duration}</span>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {trail.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[0.72rem] font-body text-light-charcoal">
                          <FaCheckCircle className="text-luxury-gold shrink-0 text-xs" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 pt-4 border-t border-stone/60">
                    <a
                      href="#reserve-trek"
                      className="block text-center w-full bg-forest-green hover:bg-forest-green/90 text-ivory-white font-body font-medium text-xs uppercase tracking-wider py-2.5 rounded-lg transition-colors"
                    >
                      Book This Trek &rarr;
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPEDITION SAFETY & GEAR ── */}
      <section className="py-20 md:py-28 px-6 bg-ivory-white">
        <div className="max-w-editorial mx-auto">
          <SectionHeading
            label="Professional Wilderness Standards"
            title="Safe, Supported & World-Class"
            lede="From Swiss-engineered trekking poles to satellite radio communication, your safety is paramount."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0}>
              <div className="p-6 rounded-xl border border-stone bg-warm-sand/30 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center text-xl mb-4">
                  <FaUserCheck />
                </div>
                <h4 className="font-heading font-medium text-lg text-dark-charcoal">
                  Certified Naturalists
                </h4>
                <p className="font-body text-xs text-light-charcoal font-light leading-relaxed mt-2">
                  1 guide for every 6 trekkers ensures personalized guidance, natural history stories, and pace control.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="p-6 rounded-xl border border-stone bg-warm-sand/30 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center text-xl mb-4">
                  <FaShieldAlt />
                </div>
                <h4 className="font-heading font-medium text-lg text-dark-charcoal">
                  First-Aid Marshals
                </h4>
                <p className="font-body text-xs text-light-charcoal font-light leading-relaxed mt-2">
                  All lead guides carry emergency wilderness trauma kits, oxygen saturation meters, and splints.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="p-6 rounded-xl border border-stone bg-warm-sand/30 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center text-xl mb-4">
                  <FaBinoculars />
                </div>
                <h4 className="font-heading font-medium text-lg text-dark-charcoal">
                  Complimentary Gear
                </h4>
                <p className="font-body text-xs text-light-charcoal font-light leading-relaxed mt-2">
                  Ergonomic trekking poles, HD binoculars, hydration bladders, and rain ponchos provided gratis.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="p-6 rounded-xl border border-stone bg-warm-sand/30 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center text-xl mb-4">
                  <FaMountain />
                </div>
                <h4 className="font-heading font-medium text-lg text-dark-charcoal">
                  Summit Refreshments
                </h4>
                <p className="font-body text-xs text-light-charcoal font-light leading-relaxed mt-2">
                  Enjoy hot herbal mountain tea, fresh orchard fruits, energy trail mix, and spring water on ridgelines.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LEAD GUIDES TEAM ── */}
      <section className="py-20 md:py-28 px-6 bg-[#0d1e16] text-ivory-white">
        <div className="max-w-editorial mx-auto">
          <div className="text-center mb-14">
            <span className="lux-label text-luxury-gold">Experienced Mountain Guides</span>
            <h2 className="font-heading font-medium text-3xl sm:text-4xl md:text-5xl text-ivory-white mt-3">
              Meet Your Trail Leaders
            </h2>
            <p className="font-body text-xs sm:text-sm text-ivory-white/75 mt-3 max-w-xl mx-auto font-light">
              Locally raised mountaineers with deep ancestral knowledge of the Sahyadri trails and biodiversity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUIDES.map((guide, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-luxury-gold text-xs">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
                <h4 className="font-heading font-medium text-xl text-ivory-white mt-3">
                  {guide.name}
                </h4>
                <p className="font-body text-xs text-luxury-gold font-medium mt-1">
                  {guide.role}
                </p>
                <p className="font-body text-xs text-ivory-white/70 mt-2">
                  {guide.experience}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 text-[0.72rem] text-ivory-white/60 font-body">
                  Certified: {guide.cert}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING & RESERVATION SECTION ── */}
      <section id="reserve-trek" className="py-20 md:py-28 px-6 bg-warm-sand/50">
        <div className="max-w-2xl mx-auto bg-ivory-white border border-stone rounded-2xl p-8 sm:p-10 shadow-luxury">
          <div className="text-center mb-8">
            <span className="lux-label text-forest-green">Instant Reservation</span>
            <h3 className="font-heading font-medium text-3xl text-dark-charcoal mt-2">
              Book Your Guided Mountain Trek
            </h3>
            <p className="font-body text-xs text-light-charcoal mt-2 font-light">
              Choose your date and trail; our expedition desk will confirm within 30 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center text-3xl mx-auto">
                <FaCheckCircle />
              </div>
              <h4 className="font-heading font-medium text-2xl text-dark-charcoal">
                Trek Request Confirmed!
              </h4>
              <p className="font-body text-sm text-light-charcoal max-w-md mx-auto">
                Thank you, {formData.name}. Our lead wilderness guide has reserved your spots and will reach out at {formData.phone} with weather and gear advisories.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-body font-semibold uppercase tracking-wider text-forest-green hover:underline"
              >
                Submit another booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-body">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark-charcoal mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full border border-stone rounded-lg px-4 py-2.5 text-xs text-dark-charcoal focus:outline-none focus:border-forest-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-charcoal mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full border border-stone rounded-lg px-4 py-2.5 text-xs text-dark-charcoal focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark-charcoal mb-1">
                    Trail Route *
                  </label>
                  <select
                    value={formData.trail}
                    onChange={(e) => setFormData({ ...formData, trail: e.target.value })}
                    className="w-full border border-stone rounded-lg px-3 py-2.5 text-xs text-dark-charcoal focus:outline-none focus:border-forest-green"
                  >
                    <option value="sunrise-ridge">Sunrise Ridge (5.4 KM)</option>
                    <option value="cloudline-traverse">Cloudline Summit (8.2 KM)</option>
                    <option value="canyon-waterfall">Kadavi Canyon (3.6 KM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-charcoal mb-1">
                    Trek Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-stone rounded-lg px-3 py-2.5 text-xs text-dark-charcoal focus:outline-none focus:border-forest-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-charcoal mb-1">
                    Number of Trekkers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full border border-stone rounded-lg px-3 py-2.5 text-xs text-dark-charcoal focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-dark-charcoal mb-1">
                  Special Requests / Fitness Notes (Optional)
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="E.g., first-time hikers in group, requested sunrise departure time, dietary notes..."
                  className="w-full border border-stone rounded-lg px-4 py-2.5 text-xs text-dark-charcoal focus:outline-none focus:border-forest-green"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest-green hover:bg-[#08482d] text-ivory-white font-body font-semibold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.01]"
              >
                Confirm Mountain Trek Booking
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-stone/60 flex items-center justify-between text-xs text-light-charcoal">
            <span className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-forest-green" /> Direct Trail Desk: +91 94220 12345
            </span>
            <span className="text-forest-green font-medium">Free cancellation up to 24h</span>
          </div>
        </div>
      </section>

      {/* ── RELATED ADVENTURES NAV ── */}
      <section className="py-14 px-6 border-t border-stone bg-ivory-white text-center">
        <div className="max-w-editorial mx-auto">
          <span className="text-xs uppercase tracking-widest text-light-charcoal block font-body font-medium">
            Discover Other Adventures at Bambardara Estate
          </span>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-body uppercase tracking-wider">
            <Link
              to="/experience/cycling"
              className="px-5 py-2.5 rounded-full border border-stone bg-warm-sand/30 hover:border-forest-green text-forest-green transition-colors"
            >
              Mountain Cycling &rarr;
            </Link>
            <Link
              to="/experience/waterpark"
              className="px-5 py-2.5 rounded-full border border-stone bg-warm-sand/30 hover:border-forest-green text-forest-green transition-colors"
            >
              Bambarddara Water Park &rarr;
            </Link>
            <Link
              to="/experience/archery"
              className="px-5 py-2.5 rounded-full border border-stone bg-warm-sand/30 hover:border-forest-green text-forest-green transition-colors"
            >
              Archery Range &rarr;
            </Link>
            <Link
              to="/experience/paintball"
              className="px-5 py-2.5 rounded-full border border-stone bg-warm-sand/30 hover:border-forest-green text-forest-green transition-colors"
            >
              Paintball Arena &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
