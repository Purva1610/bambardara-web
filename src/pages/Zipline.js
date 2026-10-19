import React, { useState, useEffect } from 'react';
import ZiplineHero from '../components/experiences/ZiplineHero';
import Reveal from '../components/shared/Reveal';
import {
  FaShieldAlt,
  FaCheck,
  FaPhoneAlt,
  FaUserCheck,
  FaClock,
  FaTachometerAlt,
  FaRulerCombined,
  FaAward,
} from 'react-icons/fa';

const CIRCUITS = [
  {
    id: 'valley-express',
    title: 'The Great Valley Express',
    length: '650 Meters',
    speed: '75 KM/H Top Speed',
    height: '180m Gorge Drop',
    difficulty: 'Thrilling & Panoramic',
    desc: 'Our flagship twin-cable zip flight soaring high above the Western Ghats river gorge with uninterrupted 360-degree views of dense jungle canopies and distant cascades.',
    badge: 'Signature Flight',
    price: '₹999 / Rider',
  },
  {
    id: 'canopy-twilight',
    title: 'Twilight Canopy Whisper',
    length: '480 Meters',
    speed: '58 KM/H Gliding Speed',
    height: '95m Treetop Level',
    difficulty: 'Moderate & Scenic',
    desc: 'A serene flight through ancient teak and rosewood canopies during golden hour, terminating directly onto our high-altitude tea estate viewing pavilion.',
    badge: 'Sunset Favorite',
    price: '₹799 / Rider',
  },
  {
    id: 'tandem-falcon',
    title: 'Twin Falcon Tandem Race',
    length: '820 Meters (Dual Line)',
    speed: '82 KM/H High Velocity',
    height: '210m Canyon Span',
    difficulty: 'Extreme High-Flying',
    desc: 'Two parallel aerospace-grade stainless cables enabling friends, couples, or family members to soar simultaneously side-by-side across the deep Kadavi valley.',
    badge: 'Side-By-Side Tandem',
    price: '₹1,499 / Pair',
  },
];

const SAFETY_FEATURES = [
  {
    title: 'EN 15567 European Standard',
    desc: 'Engineered and certified strictly under European ropes course standards with an 8:1 safety factor redundancy.',
    icon: FaAward,
  },
  {
    title: 'Petzl Trac Guide Pulleys',
    desc: 'Dual-wheel drop-proof Petzl carabiner pulleys with integrated impact bumpers and automatic locking mechanisms.',
    icon: FaShieldAlt,
  },
  {
    title: 'Daily Ultrasonic Cable Testing',
    desc: 'Every morning our master riggers inspect the tension and metallurgical integrity of the 14mm galvanized steel lines.',
    icon: FaCheck,
  },
  {
    title: 'Certified Flight Instructors',
    desc: 'All launch and landing marshals are wilderness first responders certified by the Himalayan Mountaineering Institute.',
    icon: FaUserCheck,
  },
];

export default function Zipline() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    circuit: 'The Great Valley Express (₹999)',
    riders: '2',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Luxury High-Altitude Canopy Zipline — Bambardara Estate';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) return;
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory-white text-dark-charcoal min-h-screen">
      {/* ── 1. HERO SECTION MATCHING REFERENCE WITH PALETTE ACCENTS ── */}
      <ZiplineHero
        onMoreDetailsClick={() => {
          const el = document.getElementById('zipline-specs');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ── 2. FLIGHT SPECIFICATIONS & COURSE HIGHLIGHTS ── */}
      <section id="zipline-specs" className="py-20 md:py-28 px-6 max-w-editorial mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-body tracking-[0.25em] text-forest-green font-semibold">
              High-Altitude Western Ghats Canopy
            </span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-forest-green">
              Engineered For Pure Weightless Flight
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-light-charcoal font-light leading-relaxed">
              Experience the exhilarating sensation of soaring high above ancient cloud forests, cascading waterfalls, and misty mountain ridges in complete safety.
            </p>
          </div>
        </Reveal>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Reveal delay={100}>
            <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-xl p-6 text-center hover:shadow-luxury transition-all duration-300">
              <FaTachometerAlt className="text-3xl text-luxury-gold mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold font-heading text-forest-green">
                82 <span className="text-base font-normal font-body text-light-charcoal">km/h</span>
              </div>
              <div className="text-xs font-body uppercase tracking-wider text-light-charcoal mt-2">
                Top Flight Velocity
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-xl p-6 text-center hover:shadow-luxury transition-all duration-300">
              <FaRulerCombined className="text-3xl text-luxury-gold mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold font-heading text-forest-green">
                650 <span className="text-base font-normal font-body text-light-charcoal">m</span>
              </div>
              <div className="text-xs font-body uppercase tracking-wider text-light-charcoal mt-2">
                Valley Cable Span
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-xl p-6 text-center hover:shadow-luxury transition-all duration-300">
              <FaClock className="text-3xl text-luxury-gold mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold font-heading text-forest-green">
                45 <span className="text-base font-normal font-body text-light-charcoal">sec</span>
              </div>
              <div className="text-xs font-body uppercase tracking-wider text-light-charcoal mt-2">
                Airborne Glide Time
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-xl p-6 text-center hover:shadow-luxury transition-all duration-300">
              <FaShieldAlt className="text-3xl text-luxury-gold mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold font-heading text-forest-green">
                100% <span className="text-base font-normal font-body text-light-charcoal">Petzl</span>
              </div>
              <div className="text-xs font-body uppercase tracking-wider text-light-charcoal mt-2">
                Redundant Dual Locks
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. FLIGHT CIRCUITS & OVERLOOK LOCATIONS ── */}
      <section id="zipline-circuits" className="py-20 md:py-28 px-6 bg-cream/60 border-y border-stone/60">
        <div className="max-w-editorial mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase font-body tracking-[0.25em] text-forest-green font-semibold">
                Curated Cable Circuits
              </span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-forest-green">
                Choose Your Aerial Adventure
              </h2>
              <p className="mt-4 font-body text-sm sm:text-base text-light-charcoal font-light leading-relaxed">
                From high-speed canyon crossings to gentle sunset canopy glides suitable for the entire family.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CIRCUITS.map((circuit, idx) => (
              <Reveal key={circuit.id} delay={idx * 150}>
                <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-xl p-8 flex flex-col justify-between hover:shadow-luxury transition-all duration-300 transform hover:-translate-y-1 group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-3 py-1 rounded-full text-xs font-body uppercase tracking-wider bg-forest-green/10 text-forest-green font-bold">
                        {circuit.badge}
                      </span>
                      <span className="text-xl font-bold text-luxury-gold font-heading">
                        {circuit.price}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-light text-dark-charcoal group-hover:text-forest-green transition-colors mb-3">
                      {circuit.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm font-light text-light-charcoal leading-relaxed mb-6">
                      {circuit.desc}
                    </p>

                    <div className="space-y-2.5 border-t border-stone/80 pt-5 text-xs font-body text-dark-charcoal">
                      <div className="flex justify-between">
                        <span className="text-light-charcoal">Cable Span:</span>
                        <span className="font-semibold text-dark-charcoal">{circuit.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-light-charcoal">Flight Velocity:</span>
                        <span className="font-semibold text-dark-charcoal">{circuit.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-light-charcoal">Vertical Elevation:</span>
                        <span className="font-semibold text-dark-charcoal">{circuit.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-light-charcoal">Experience Level:</span>
                        <span className="font-semibold text-forest-green">{circuit.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#zipline-booking"
                    onClick={() => setFormData((prev) => ({ ...prev, circuit: `${circuit.title} (${circuit.price})` }))}
                    className="mt-8 w-full py-3 rounded-lg bg-forest-green hover:bg-deep-forest text-ivory-white font-body font-medium text-xs tracking-widest uppercase text-center transition-all shadow-sm hover:shadow-luxury"
                  >
                    Select This Circuit
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PETZL SAFETY & CERTIFICATIONS (SIGNATURE LUXURY DARK BLOCK) ── */}
      <section id="zipline-safety" className="py-20 md:py-28 px-6 bg-deep-forest text-ivory-white border-t border-stone/30">
        <div className="max-w-editorial mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div>
                <span className="text-xs uppercase font-body tracking-[0.25em] text-luxury-gold font-semibold">
                  Zero Compromise Safety Protocol
                </span>
                <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-ivory-white mb-6">
                  Engineered with Swiss Rigging & Petzl Gear
                </h2>
                <p className="font-body text-sm text-ivory-white/70 font-light leading-relaxed mb-8">
                  At Bambardara, your aerial safety is our highest engineering benchmark. We utilize dual redundant aerospace cable strands with a breaking strength exceeding 12,000 kg, anchored directly into granite bedrock foundations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {SAFETY_FEATURES.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-white/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                          <Icon className="text-lg" />
                        </div>
                        <div>
                          <h4 className="font-heading text-sm font-semibold text-ivory-white tracking-wide">
                            {feat.title}
                          </h4>
                          <p className="font-body text-xs text-ivory-white/60 mt-1 leading-relaxed font-light">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Safety Photo Showcase */}
            <Reveal delay={200}>
              <div className="relative rounded-2xl overflow-hidden border border-luxury-gold/30 shadow-luxury">
                <img
                  src={`${process.env.PUBLIC_URL}/images/opt/zipline-1280.jpg`}
                  alt="Zipline riders with helmets and safety harnesses"
                  className="w-full h-[440px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-body font-bold bg-luxury-gold text-deep-forest uppercase tracking-wider inline-block mb-2">
                    Verified Daily Inspection
                  </span>
                  <h4 className="font-heading text-xl font-bold text-ivory-white">
                    Full-Body Ergonomic Harnesses & Auto Braking
                  </h4>
                  <p className="font-body text-xs text-ivory-white/80 mt-1.5 font-light">
                    Every participant is fitted with an ergonomic Petzl full-body harness and guided by certified flight marshals.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. FLIGHT RESERVATION FORM ── */}
      <section id="zipline-booking" className="py-20 md:py-28 px-6 bg-ivory-white border-t border-stone/50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-body tracking-[0.25em] text-forest-green font-semibold">
                Instant Flight Passes
              </span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-light text-forest-green">
                Reserve Your Canopy Flight
              </h2>
              <p className="mt-3 font-body text-xs sm:text-sm text-light-charcoal font-light">
                Secure your preferred departure window. Includes harness gear, helmet, safety briefing, and certified guide.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="bg-ivory-white border border-stone rounded-2xl p-8 sm:p-12 shadow-luxury">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-forest-green/10 border-2 border-forest-green text-forest-green flex items-center justify-center mx-auto mb-4 text-2xl">
                    <FaCheck />
                  </div>
                  <h3 className="text-2xl font-bold text-forest-green font-heading">
                    Flight Passes Reserved!
                  </h3>
                  <p className="font-body text-sm text-light-charcoal mt-2 max-w-md mx-auto">
                    Thank you, <span className="text-dark-charcoal font-semibold">{formData.name}</span>! Our flight coordinator has logged your booking for <span className="text-forest-green font-semibold">{formData.date}</span>. An SMS confirmation with launch platform coordinates has been dispatched to {formData.phone}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-forest-green hover:bg-deep-forest text-ivory-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Reserve Another Flight
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal placeholder-light-charcoal/50 focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal placeholder-light-charcoal/50 focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                        Flight Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                        Time Window
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                      >
                        <option value="Morning (09:00 AM - 12:00 PM)">Morning Crisp Air (09:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 03:30 PM)">Afternoon Sun (12:00 PM - 03:30 PM)</option>
                        <option value="Sunset Twilight (03:30 PM - 06:00 PM)">Golden Sunset Hour (03:30 PM - 06:00 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                        Select Circuit
                      </label>
                      <select
                        value={formData.circuit}
                        onChange={(e) => setFormData({ ...formData, circuit: e.target.value })}
                        className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                      >
                        {CIRCUITS.map((c) => (
                          <option key={c.id} value={`${c.title} (${c.price})`}>
                            {c.title} — {c.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                        Number of Flyers
                      </label>
                      <select
                        value={formData.riders}
                        onChange={(e) => setFormData({ ...formData, riders: e.target.value })}
                        className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                      >
                        <option value="1">1 Solo Flyer</option>
                        <option value="2">2 Flyers (Couple / Duo)</option>
                        <option value="3-5">3 - 5 Flyers (Small Group)</option>
                        <option value="6+">6+ Flyers (Large Group / Corporate)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-forest-green mb-2 font-bold">
                      Special Requests / Height & Weight Note
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. First-time flyer, celebrating birthday, requesting tandem video recording..."
                      className="w-full bg-ivory-white border border-stone rounded-lg px-4 py-3 text-sm text-dark-charcoal placeholder-light-charcoal/50 focus:border-forest-green focus:ring-1 focus:ring-forest-green focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-light-charcoal">
                      <FaShieldAlt className="text-forest-green" />
                      <span>Certified Petzl gear included • Instant cancellation policy</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-forest-green hover:bg-deep-forest text-ivory-white font-semibold text-xs tracking-widest uppercase rounded-lg shadow-luxury transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Confirm Zipline Reservation →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Quick Helpline Hotline */}
          <div className="mt-8 text-center text-xs text-light-charcoal flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-forest-green" />
            <span>Have questions about weight limits or weather? Call Launch Desk:</span>
            <a href="tel:+919422012345" className="text-forest-green hover:text-deep-forest font-semibold underline">
              +91 94220 12345
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
