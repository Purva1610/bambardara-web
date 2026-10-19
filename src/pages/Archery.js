import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBullseye,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaCheckCircle,
  FaCalendarAlt,
  FaUserTie,
  FaPhoneAlt,
} from 'react-icons/fa';
import {
  GiBowArrow,
} from 'react-icons/gi';
import ArcheryHero from '../components/experiences/ArcheryHero';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const RANGE_DISTANCES = [
  {
    distance: '10 Meters',
    level: 'Beginner & Family',
    image: `${process.env.PUBLIC_URL}/images/opt/archery-10m.jpg`,
    description:
      'Ideal for first-time archers and children aged 8+. Focuses on proper stance, arrow nocking, eye dominance, and smooth finger release.',
    targetSize: '122 cm World Archery Face',
    recurveWeight: '16 – 20 lbs draw weight',
  },
  {
    distance: '20 Meters',
    level: 'Intermediate',
    image: `${process.env.PUBLIC_URL}/images/opt/archery-20m.jpg`,
    description:
      'Designed for guests wanting to hone their grouping and consistency. Instructors guide micro-adjustments in sightline and anchor point.',
    targetSize: '80 cm High-Density Target',
    recurveWeight: '22 – 28 lbs draw weight',
  },
  {
    distance: '30 Meters',
    level: 'Marksman & Advanced',
    image: `${process.env.PUBLIC_URL}/images/opt/archery-30m.jpg`,
    description:
      'A true outdoor target challenge against natural valley breezes. Experience the thrill of hitting yellow gold at championship distances.',
    targetSize: '80 cm World Archery Face',
    recurveWeight: '28 – 35 lbs draw weight',
  },
];

const SAFETY_RULES = [
  {
    title: 'Certified Instruction',
    desc: 'Every session is conducted under the watchful supervision of certified archery instructors.',
    icon: FaUserTie,
  },
  {
    title: 'Personal Safety Gear',
    desc: 'Leather forearm guards and finger tabs are individually fitted to prevent string slap.',
    icon: FaShieldAlt,
  },
  {
    title: 'Controlled Range Line',
    desc: 'Strict whistle and command protocols: no retrieval until all archers have stepped back.',
    icon: FaBullseye,
  },
  {
    title: 'All Ages from 8+',
    desc: 'Lightweight youth bows ensure young enthusiasts develop confidence safely.',
    icon: FaAward,
  },
];

export default function Archery() {
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (08:00 - 10:30)',
    guests: '2',
    targetLane: '10 Meters · Novice & Family Lane',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory-white">
      {/* ── HERO SECTION: Exact Replica of Reference Image ── */}
      <ArcheryHero />

      {/* ── OVERVIEW & PHILOSOPHY ── */}
      <section id="overview" className="px-6 py-20 md:py-28 max-w-editorial mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="lux-label text-luxury-gold">Target Sport</span>
              <h2 className="mt-4 font-heading text-3xl md:text-5xl font-light text-forest-green leading-tight">
                Precision, Balance, & Calm in the Open Wilderness.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-6 font-body text-base md:text-lg font-light leading-relaxed text-light-charcoal">
                Archery is ancient discipline refined into meditative sport. Set against the serene
                slopes of the Western Ghats at Bambardara Estate, our dedicated range provides a
                tranquil haven where you can quiet the mind, steady your breathing, and feel the
                unmatched satisfaction of arrows sinking into the yellow center ring.
              </p>
              <p className="mt-4 font-body text-sm md:text-base font-light leading-relaxed text-light-charcoal/90">
                Whether you have never drawn a string or are an experienced bowman looking to shoot
                at distance, our certified coaches calibrate equipment specifically for your draw
                length and comfort.
              </p>
            </Reveal>

            {/* Quick Stat Badges */}
            <Reveal delay={200} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  3
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Target Distances
                </span>
              </div>
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  15-35
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Lbs Draw Weight
                </span>
              </div>
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  8+
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Suitable Age
                </span>
              </div>
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  100%
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Supervised
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-luxury-gold/40 bg-gradient-to-br from-[#faf6f0] via-warm-sand to-[#ede1d1] p-8 md:p-10 transition-all duration-300 hover:shadow-luxury-lg">
                <div className="flex items-center justify-between pb-6 border-b border-stone/60">
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-full bg-forest-green text-luxury-gold flex items-center justify-center shadow-sm">
                      <GiBowArrow className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl text-forest-green tracking-wide">The Range Experience</h3>
                      <p className="text-xs text-natural-brown/80 font-medium tracking-wider uppercase">Bambardara Target Range</p>
                    </div>
                  </div>
                  <span className="text-[0.7rem] font-mono font-medium px-3.5 py-1 bg-forest-green/10 border border-forest-green/25 rounded-full text-forest-green uppercase tracking-wider">
                    OPEN DAILY
                  </span>
                </div>

                <div className="mt-6 space-y-4 font-body text-sm text-dark-charcoal/90 font-light leading-relaxed">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-4 h-4 text-forest-green mt-1 flex-shrink-0" />
                    <span>Traditional laminated wooden recurve bows tailored to individual draw strengths.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-4 h-4 text-forest-green mt-1 flex-shrink-0" />
                    <span>Olympic-dimension high density straw boss targets with World Archery ring scoring.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-4 h-4 text-forest-green mt-1 flex-shrink-0" />
                    <span>Safe outdoor lawn range surrounded by trees with zero wind interference corridors.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-4 h-4 text-forest-green mt-1 flex-shrink-0" />
                    <span>One-on-one stance, anchor point, and arrow trajectory guidance from resident pros.</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone/60 flex items-center justify-between">
                  <div>
                    <span className="text-[0.68rem] uppercase tracking-wider text-natural-brown font-medium block">
                      Daily Timings
                    </span>
                    <span className="text-sm font-semibold text-forest-green tracking-wide">
                      07:30 AM &ndash; 06:30 PM
                    </span>
                  </div>
                  <a
                    href="#reserve"
                    className="px-6 py-2.5 rounded-sm bg-forest-green hover:bg-deep-forest text-ivory-white text-xs uppercase font-medium tracking-wider transition-colors duration-300 shadow-sm"
                  >
                    <span>Book Session</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TARGET DISTANCES SECTION ── */}
      <section className="bg-warm-sand/40 border-y border-stone px-6 py-20 md:py-28">
        <div className="max-w-editorial mx-auto">
          <SectionHeading
            label="Range Progression"
            title="Three Target Distances"
            lede="Start close to master posture, then step back as your arrow groupings tighten."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {RANGE_DISTANCES.map((zone, i) => (
              <Reveal key={zone.distance} delay={i * 120}>
                <div className="bg-ivory-white border border-stone rounded-sm overflow-hidden h-full flex flex-col justify-between hover:shadow-luxury transition-all duration-300 group">
                  <div>
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone/20">
                      <img
                        src={zone.image}
                        alt={`${zone.distance} - ${zone.level}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="text-[0.65rem] uppercase tracking-wider font-semibold px-2.5 py-1 bg-ivory-white/95 backdrop-blur-sm text-forest-green rounded-full shadow-sm">
                          {zone.level}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex items-baseline justify-between">
                        <span className="font-heading text-2xl md:text-3xl font-light text-forest-green">
                          {zone.distance}
                        </span>
                      </div>
                      <p className="mt-3 font-body text-sm font-light leading-relaxed text-light-charcoal">
                        {zone.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <div className="pt-4 border-t border-stone space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-light-charcoal/70 uppercase tracking-wider">Target:</span>
                        <span className="font-medium text-dark-charcoal">{zone.targetSize}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-light-charcoal/70 uppercase tracking-wider">Bows:</span>
                        <span className="font-medium text-dark-charcoal">{zone.recurveWeight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY PROTOCOLS ── */}
      <section className="bg-forest-green text-ivory-white px-6 py-20 md:py-28">
        <div className="max-w-editorial mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="lux-label text-luxury-gold">Range Discipline</span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-light">
              Safety is Our First Rule.
            </h2>
            <p className="mt-4 font-body text-sm md:text-base font-light text-ivory-white/80 leading-relaxed">
              Every arrow discharged on our grounds adheres strictly to World Archery safety
              standards, monitored continuously by our range officer.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SAFETY_RULES.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <Reveal key={rule.title} delay={i * 100}>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-6 text-center hover:bg-white/10 transition-colors">
                    <span className="mx-auto w-14 h-14 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                      <Icon className="w-6 h-6" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-light text-ivory-white">
                      {rule.title}
                    </h3>
                    <p className="mt-3 font-body text-xs md:text-sm font-light text-ivory-white/70 leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RESERVATION / BOOKING FORM ── */}
      <section id="reserve" className="px-6 py-20 md:py-28 max-w-editorial mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="lux-label text-luxury-gold">Reserve An Experience</span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-light text-forest-green leading-tight">
                Step Up to the Shooting Line.
              </h2>
              <p className="mt-6 font-body text-sm md:text-base font-light leading-relaxed text-light-charcoal">
                Advance reservations are recommended to ensure dedicated lane availability and personal
                equipment fitting.
              </p>

              <div className="mt-8 space-y-4 border-t border-stone pt-6">
                <div className="flex items-center gap-3 text-sm text-light-charcoal">
                  <FaCalendarAlt className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                  <span>Available every day: 7:30 AM – 6:30 PM</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-light-charcoal">
                  <FaUsers className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                  <span>Individual, couples & group bookings welcome</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-light-charcoal">
                  <FaPhoneAlt className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                  <span>Direct Estate Concierge: +91 98230 00000</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="border border-stone bg-warm-sand/40 p-8 md:p-10 rounded-sm">
                {submitted ? (
                  <div className="py-12 text-center">
                    <span className="w-16 h-16 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="w-8 h-8" />
                    </span>
                    <h3 className="font-heading text-2xl font-light text-forest-green">
                      Reservation Request Sent
                    </h3>
                    <p className="mt-3 font-body text-sm text-light-charcoal max-w-md mx-auto">
                      Thank you, <strong className="text-dark-charcoal">{booking.name}</strong>. Our
                      estate activity desk has received your request for{' '}
                      <strong>{booking.targetLane}</strong> on <strong>{booking.date || 'your selected date'}</strong>.
                      We will confirm your lane via phone shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 lux-btn-light px-6 py-2.5 text-xs uppercase"
                    >
                      <span>Submit Another Booking</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-light-charcoal mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={booking.name}
                          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-ivory-white border border-stone px-4 py-3 text-sm text-dark-charcoal focus:border-luxury-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-light-charcoal mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={booking.phone}
                          onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-ivory-white border border-stone px-4 py-3 text-sm text-dark-charcoal focus:border-luxury-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-light-charcoal mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={booking.date}
                          onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                          className="w-full bg-ivory-white border border-stone px-4 py-3 text-sm text-dark-charcoal focus:border-luxury-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-light-charcoal mb-2">
                          Preferred Time Slot *
                        </label>
                        <select
                          value={booking.timeSlot}
                          onChange={(e) => setBooking({ ...booking, timeSlot: e.target.value })}
                          className="w-full bg-ivory-white border border-stone px-4 py-3 text-sm text-dark-charcoal focus:border-luxury-gold focus:outline-none"
                        >
                          <option>Morning (08:00 - 10:30)</option>
                          <option>Midday (11:00 - 01:30)</option>
                          <option>Golden Hour (03:30 - 06:30)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-light-charcoal mb-2">
                          Participants
                        </label>
                        <select
                          value={booking.guests}
                          onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                          className="w-full bg-ivory-white border border-stone px-4 py-3 text-sm text-dark-charcoal focus:border-luxury-gold focus:outline-none"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="4">3 - 4 People</option>
                          <option value="6">5 - 8 People (Group)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-body text-xs uppercase tracking-wider text-light-charcoal mb-2">
                          Target Range Preference
                        </label>
                        <select
                          value={booking.targetLane}
                          onChange={(e) => setBooking({ ...booking, targetLane: e.target.value })}
                          className="w-full bg-ivory-white border border-stone px-4 py-3 text-sm text-dark-charcoal focus:border-luxury-gold focus:outline-none"
                        >
                          <option>10 Meters · Novice & Family Lane</option>
                          <option>20 Meters · Field Target Lane</option>
                          <option>30 Meters · Marksman Range</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-forest-green hover:bg-deep-forest text-ivory-white font-body text-xs uppercase tracking-widest font-semibold transition-colors duration-300 shadow-md"
                    >
                      Confirm Archery Reservation Request
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPLORE MORE LEISURE ACTIVITIES ── */}
      <section className="bg-warm-sand/50 border-t border-stone px-6 py-16">
        <div className="max-w-editorial mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="lux-label text-luxury-gold">More to Experience</span>
            <h3 className="mt-2 font-heading text-2xl font-light text-forest-green">
              Explore Other Outdoor Activities
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/experience/golf-course"
              className="px-5 py-2.5 bg-ivory-white border border-stone text-xs uppercase tracking-wider font-semibold text-dark-charcoal hover:border-luxury-gold transition-colors"
            >
              Golf Course &rarr;
            </Link>
            <Link
              to="/experience/boating"
              className="px-5 py-2.5 bg-ivory-white border border-stone text-xs uppercase tracking-wider font-semibold text-dark-charcoal hover:border-luxury-gold transition-colors"
            >
              Boating &rarr;
            </Link>
            <Link
              to="/experience/waterpark"
              className="px-5 py-2.5 bg-ivory-white border border-stone text-xs uppercase tracking-wider font-semibold text-dark-charcoal hover:border-luxury-gold transition-colors"
            >
              Waterpark &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
