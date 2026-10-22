import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaintballHero from '../components/experiences/PaintballHero';
import PaintballFeatures from '../components/experiences/PaintballFeatures';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';
import {
  FaCrosshairs,
  FaCheck,
  FaPhone,
  FaArrowRight,
} from 'react-icons/fa6';

const GAME_MODES = [
  {
    id: 'warzone',
    title: 'Warzone Battle Royale',
    category: 'Squad vs Squad',
    duration: '45 Mins',
    desc: 'Two squads enter from opposite perimeter gates. Eliminate all enemy combatants or secure the central fortified bunker.',
    rules: ['Full tactical gear included', '500 Paintballs per player', '3 Respawn tokens'],
    badge: 'Most Popular',
  },
  {
    id: 'respawn',
    title: 'Respawn Domination',
    category: 'Territory Control',
    duration: '60 Mins',
    desc: 'Fast-paced action with infinite respawns at baseline rally points. Capture and hold 3 electronic beacon flags across the terrain.',
    rules: ['Electronic sensor scoring', '3-second respawn timer', 'Continuous ammo reload stations'],
    badge: 'High Action',
  },
  {
    id: 'powerup',
    title: 'VIP Extraction & Payload',
    category: 'Tactical Objective',
    duration: '45 Mins',
    desc: 'Escort an unarmed high-value asset across 300 yards of wooded bunkers and trench lines while an ambush squad defends.',
    rules: ['Tactical smoke canisters', 'Shield loadouts for VIP escorts', 'Stealth terrain corridors'],
    badge: 'Strategy Focus',
  },
];

export default function Paintball() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    players: '4',
    mode: 'warzone',
    timeSlot: 'Morning (08:30 AM)',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Redline Paintball Arena — Bambardara Estate, Kolhapur';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory-white text-dark-charcoal min-h-screen">
      {/* ── HERO SECTION ── */}
      <PaintballHero />

      {/* ── LARGEST RECREATIONAL PAINTBALL CLUB FEATURES ── */}
      <PaintballFeatures />

      {/* ── ABOUT THE ARENA ── */}
      <section id="about-arena" className="py-20 md:py-28 px-6 max-w-editorial mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-green" />
                <span className="font-body text-xs tracking-widest uppercase text-forest-green font-bold">
                  Battleground Intelligence
                </span>
              </div>
              <h2 className="mt-3 font-heading text-3xl md:text-5xl font-light text-forest-green leading-tight">
                Two Acres of Natural Woodland Combat
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-6 font-body text-base md:text-lg font-light leading-relaxed text-light-charcoal">
                Set against the dense tree canopies of Bambardara Estate, the Redline Paintball Arena
                combines authentic Western Ghats topography with engineered tactical architecture.
                Navigate natural stream gullies, reinforced sandbag bunkers, sniper watchtowers, and
                cqb tire corridors designed for heart-racing team battles.
              </p>
              <p className="mt-4 font-body text-sm md:text-base font-light leading-relaxed text-light-charcoal/90">
                Whether organizing a company team-building clash, celebrating with friends, or testing
                tactical reflexes, our certified safety marshals guarantee safe, adrenaline-soaked
                skirmishes from first whistle to final extraction.
              </p>
            </Reveal>

            {/* Quick Metrics */}
            <Reveal delay={200} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  2 Acres
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Combat Arena
                </span>
              </div>
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  30+
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Bunkers & Towers
                </span>
              </div>
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  300 FPS
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Calibrated Speed
                </span>
              </div>
              <div className="border border-stone bg-warm-sand/50 p-4 rounded-sm text-center">
                <span className="block font-heading text-2xl md:text-3xl font-light text-forest-green">
                  100%
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                  Referee Supervised
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="relative rounded-2xl overflow-hidden border border-stone shadow-luxury group">
                <img
                  src={`${process.env.PUBLIC_URL}/images/opt/paintball-1280.jpg`}
                  alt="Bambardara Woodland Paintball Grounds"
                  className="w-full h-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-ivory-white">
                  <span className="text-[0.68rem] uppercase font-body font-medium tracking-wider text-luxury-gold block">
                    Bambardara Natural Terrain
                  </span>
                  <p className="font-heading text-lg font-light text-ivory-white mt-1">
                    Authentic Western Ghats Woodland Arena
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ALL GAME MODES ── */}
      <section id="game-modes" className="py-20 md:py-28 px-6 bg-warm-sand/40 border-y border-stone">
        <div className="max-w-editorial mx-auto">
          <SectionHeading
            label="Tactical Scenarios"
            title="Choose Your Combat Mode"
            lede="Select from competitive tournament scenarios engineered for squad synergy and tactical warfare."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {GAME_MODES.map((mode, i) => (
              <Reveal key={mode.id} delay={i * 120}>
                <div className="bg-ivory-white border border-stone hover:border-forest-green rounded-sm p-8 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-luxury group">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.7rem] uppercase font-body tracking-wider text-forest-green font-medium">
                        {mode.category}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-forest-green/10 text-forest-green font-medium">
                        {mode.duration}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-xl font-bold text-forest-green group-hover:text-deep-forest transition-colors">
                      {mode.title}
                    </h3>
                    <p className="mt-3 font-body text-sm text-light-charcoal font-light leading-relaxed">
                      {mode.desc}
                    </p>

                    <div className="mt-6 pt-6 border-t border-stone/60 space-y-2.5">
                      {mode.rules.map((rule, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-light-charcoal font-light">
                          <FaCrosshairs className="w-3.5 h-3.5 text-forest-green flex-shrink-0" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <a
                      href="#reserve"
                      onClick={() => setFormData((prev) => ({ ...prev, mode: mode.id }))}
                      className="w-full py-2.5 rounded-sm border border-forest-green text-forest-green group-hover:bg-forest-green group-hover:text-ivory-white font-body text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Deploy In This Mode</span>
                      <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* ── TOURNAMENTS & ONLINE MULTIPLAYER ARENA ── */}
      <section id="multiplayer-arena" className="py-20 md:py-28 px-6 bg-warm-sand/40 border-t border-stone">
        <div id="tournaments" className="max-w-editorial mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="font-body text-xs tracking-widest uppercase text-forest-green font-bold">
                  Competitive Circuit
                </span>
                <h2 className="mt-3 font-heading text-3xl md:text-5xl font-light text-forest-green leading-tight">
                  Weekend Clan Tournaments & Corporate Leagues
                </h2>
                <p className="mt-6 font-body text-base font-light text-light-charcoal leading-relaxed">
                  Join our seasonal Western Ghats Paintball Open! Compete in structured 5v5 double-elimination
                  brackets with live stream broadcasts, professional referees, custom team jerseys, and grand
                  trophies awarded at the clubhouse.
                </p>
                <div className="mt-8 space-y-4 font-body text-sm text-dark-charcoal/90">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-forest-green" />
                    <span>Bracket seeding based on team battle ratings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-forest-green" />
                    <span>Real-time scoreboards & tactical arena playback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-forest-green" />
                    <span>Custom private arena lockouts available for corporate squads</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={150}>
                <div className="rounded-xl overflow-hidden border border-stone bg-ivory-white p-8 shadow-luxury">
                  <h3 className="font-heading text-xl text-forest-green font-bold uppercase tracking-wider">
                    Next Open Tournament
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-b border-stone/60 pb-4">
                    <div>
                      <span className="text-xs text-natural-brown uppercase block font-medium">Event</span>
                      <span className="text-base font-bold text-forest-green">Redline Ghats Showdown</span>
                    </div>
                    <div>
                      <span className="text-xs text-natural-brown uppercase block font-medium">Slots Left</span>
                      <span className="text-base font-bold text-forest-green">4 Squads</span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <a
                      href="#reserve"
                      className="flex-1 py-3 bg-forest-green hover:bg-deep-forest text-ivory-white text-center font-body text-xs uppercase tracking-wider font-bold rounded-sm transition-colors shadow-sm"
                    >
                      Register Clan
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="px-6 py-3 border border-forest-green text-forest-green hover:bg-forest-green hover:text-ivory-white text-center font-body text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <FaPhone className="w-3.5 h-3.5 text-forest-green" />
                      <span>Contact Marshal</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESERVATION FORM ── */}
      <section id="reserve" className="py-20 md:py-28 px-6 max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center">
            <span className="font-body text-xs tracking-widest uppercase text-forest-green font-bold">
              Deploy Your Squad
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-light text-forest-green">
              Reserve Paintball Arena Slots
            </h2>
            <p className="mt-3 text-sm text-light-charcoal font-light">
              Secure your date, tactical game mode, and marker loadouts. Immediate booking confirmation.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-10">
          {submitted ? (
            <div className="bg-warm-sand/40 border border-forest-green rounded-xl p-8 text-center shadow-luxury">
              <span className="w-14 h-14 mx-auto rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-4">
                <FaCheck className="w-6 h-6" />
              </span>
              <h3 className="font-heading text-2xl font-normal text-forest-green">Mission Confirmed!</h3>
              <p className="mt-2 text-sm text-light-charcoal font-light max-w-md mx-auto">
                Your squad slot has been registered. Our Chief Arena Marshal will contact you via WhatsApp / Call with your operational briefing and arena arrival instructions.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 rounded-sm border border-forest-green text-forest-green hover:bg-forest-green hover:text-ivory-white font-body text-xs uppercase tracking-wider transition-colors"
              >
                Book Another Squad
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-warm-sand/20 border border-stone rounded-xl p-8 sm:p-10 shadow-lg space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                    Squad Commander Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Captain Rohan"
                    className="w-full bg-ivory-white border border-stone px-4 py-3 rounded text-sm text-forest-green focus:outline-none focus:border-forest-green"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-ivory-white border border-stone px-4 py-3 rounded text-sm text-forest-green focus:outline-none focus:border-forest-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                    Combat Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-ivory-white border border-stone px-4 py-3 rounded text-sm text-forest-green focus:outline-none focus:border-forest-green"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                    Squad Size (Players)
                  </label>
                  <select
                    value={formData.players}
                    onChange={(e) => setFormData({ ...formData, players: e.target.value })}
                    className="w-full bg-ivory-white border border-stone px-4 py-3 rounded text-sm text-forest-green focus:outline-none focus:border-forest-green"
                  >
                    <option value="2-4">2 - 4 Operatives</option>
                    <option value="4-8">4 - 8 Operatives (Squad)</option>
                    <option value="8-16">8 - 16 Operatives (Clan)</option>
                    <option value="16+">16+ Operatives (Corporate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                    Game Scenario
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full bg-ivory-white border border-stone px-4 py-3 rounded text-sm text-forest-green focus:outline-none focus:border-forest-green"
                  >
                    <option value="warzone">Warzone Royale</option>
                    <option value="respawn">Respawn Domination</option>
                    <option value="powerup">VIP Extraction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Morning (08:30 AM)', 'Mid-day (11:30 AM)', 'Afternoon (02:30 PM)', 'Sunset (05:00 PM)'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`p-3 rounded text-center border text-xs transition-all ${
                        formData.timeSlot === slot
                          ? 'border-forest-green bg-forest-green text-ivory-white font-bold'
                          : 'border-stone bg-ivory-white text-dark-charcoal hover:border-forest-green/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-body text-forest-green font-bold mb-2">
                  Special Tactical Requests
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Need extra smoke canisters, birthday squad trophy, or private referee?"
                  className="w-full bg-ivory-white border border-stone px-4 py-3 rounded text-sm text-forest-green focus:outline-none focus:border-forest-green"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-sm bg-forest-green hover:bg-deep-forest text-ivory-white font-body text-sm uppercase tracking-wider font-extrabold transition-all duration-300 shadow-md hover:shadow-luxury"
              >
                Confirm Squad Reservation
              </button>
            </form>
          )}
        </Reveal>
      </section>

      {/* ── EXPLORE OTHER ACTIVITIES ── */}
      <section className="py-16 px-6 border-t border-stone bg-warm-sand/40 text-center">
        <div className="max-w-editorial mx-auto">
          <span className="text-xs uppercase tracking-widest text-light-charcoal block font-body font-medium">
            More Adventures At Bambardara Estate
          </span>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-body uppercase tracking-wider">
            <Link
              to="/experience/archery"
              className="px-5 py-2.5 rounded-sm border border-stone bg-ivory-white hover:border-forest-green text-forest-green transition-colors"
            >
              Archery Range &rarr;
            </Link>
            <Link
              to="/waterpark"
              className="px-5 py-2.5 rounded-sm border border-stone bg-ivory-white hover:border-forest-green text-forest-green transition-colors"
            >
              Waterpark &rarr;
            </Link>
            <Link
              to="/ropeway"
              className="px-5 py-2.5 rounded-sm border border-stone bg-ivory-white hover:border-forest-green text-forest-green transition-colors"
            >
              Ropeway Ride &rarr;
            </Link>
            <Link
              to="/experiences"
              className="px-5 py-2.5 rounded-sm border border-forest-green bg-forest-green text-ivory-white hover:bg-deep-forest transition-colors"
            >
              All Experiences &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
