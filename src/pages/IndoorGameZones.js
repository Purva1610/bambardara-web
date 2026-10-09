import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGamepad,
  FaTableTennis,
  FaChess,
  FaVrCardboard,
  FaDumbbell,
  FaChild,
  FaUsers,
  FaShieldAlt,
  FaGem,
  FaHandshake,
  FaStar,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBowlingBall,
  FaDice,
  FaBuilding,
  FaBullseye,
  FaFutbol,
  FaHockeyPuck,
  FaCar,
  FaCircle,
  FaVolleyballBall,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const SEVEN_PILLARS = [
  {
    icon: FaUsers,
    title: 'All Age Entertainment',
    desc: 'Exciting games and activities tailored for children, teens, adults, and seniors.',
  },
  {
    icon: FaGlobe,
    title: 'World Class Facilities',
    desc: 'International-standard tables, high-end consoles, simulators, and equipment.',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Secure Environment',
    desc: 'Sanitized, climate-controlled, well-supervised, and family-friendly at all times.',
  },
  {
    icon: FaUsers,
    title: 'Family & Friends Time Together',
    desc: 'Multi-player group games, bonding spaces, and friendly tournament setups.',
  },
  {
    icon: FaGem,
    title: 'Premium Ambience & Comfort',
    desc: 'Luxury lounge seating, atmospheric neon and mood lighting, and full air conditioning.',
  },
  {
    icon: FaHandshake,
    title: 'Corporate & Events Facilities',
    desc: 'Dedicated spaces for team building, offsite breaks, and customized private bookings.',
  },
  {
    icon: FaStar,
    title: 'Fun • Learn • Relax • Repeat',
    desc: 'Unmatched recreation variety to keep every visitor thrilled and energized.',
  },
];

const GAME_ACTIVITIES = [
  {
    title: 'Billiards & Pool',
    category: 'Cue Sports',
    desc: 'Championship 8-ball and 9-ball tables with premium slate, smooth cloth, and balanced cues.',
    icon: FaCircle,
    badge: 'Tournament Grade',
  },
  {
    title: 'Table Tennis',
    category: 'Racket Sport',
    desc: 'ITTF-approved tables with anti-glare tops, pro paddles, and non-slip rubber flooring.',
    icon: FaTableTennis,
    badge: 'Fast Action',
  },
  {
    title: 'Darts',
    category: 'Target Game',
    desc: 'Precision electronic and classic bristle dartboards with regulation steel-tip darts.',
    icon: FaBullseye,
    badge: 'Focus & Aim',
  },
  {
    title: 'Chess & Carrom',
    category: 'Mind & Strategy',
    desc: 'Life-sized giant chess sets and championship smooth carrom boards with weighted strikers.',
    icon: FaChess,
    badge: 'Strategic Mind',
  },
  {
    title: 'Gaming Zone',
    category: 'Console Gaming',
    desc: 'Next-gen PlayStation 5 and Xbox consoles with the latest trending multi-player titles.',
    icon: FaGamepad,
    badge: 'Latest Consoles',
  },
  {
    title: 'Racing Simulator',
    category: 'High-Tech Sim',
    desc: 'Force-feedback racing wheels, realistic pedals, curved panoramic screens, and bucket cockpit seats.',
    icon: FaCar,
    badge: 'Adrenaline Rush',
  },
  {
    title: 'Mini Bowling',
    category: 'Alley Bowling',
    desc: 'Multi-lane automated mini bowling alley with neon track lighting and digital scoring screens.',
    icon: FaBowlingBall,
    badge: 'Group Favorite',
  },
  {
    title: 'Badminton Court',
    category: 'Indoor Court',
    desc: 'High-ceiling indoor badminton court with synthetic cushioning and professional lighting.',
    icon: FaVolleyballBall,
    badge: 'Full Court',
  },
  {
    title: 'Foosball',
    category: 'Table Soccer',
    desc: 'Heavy-duty commercial foosball tables with fast rods, counter-balanced men, and smooth balls.',
    icon: FaFutbol,
    badge: 'Team Battle',
  },
  {
    title: 'Air Hockey',
    category: 'Arcade Classic',
    desc: 'High-powered air cushion tables with LED illuminated goals and responsive dual pushers.',
    icon: FaHockeyPuck,
    badge: 'Speed & Reflex',
  },
  {
    title: 'Kids Play Area',
    category: 'Soft Play Zone',
    desc: 'Safe soft play jungle gym, multi-level slides, ball pits, and interactive toddler activities.',
    icon: FaChild,
    badge: 'Safe For Toddlers',
  },
  {
    title: 'Board Games Lounge',
    category: 'Tabletop Games',
    desc: 'Expansive library featuring Monopoly, Scrabble, Catan, Uno, Jenga, and family classics.',
    icon: FaDice,
    badge: 'Classic Fun',
  },
  {
    title: 'VR Experience',
    category: 'Virtual Reality',
    desc: 'Cutting-edge VR headsets, 360° motion pod seats, roller-coaster rides, and virtual worlds.',
    icon: FaVrCardboard,
    badge: 'Immersive 360°',
  },
  {
    title: 'Fitness & Wellness',
    category: 'Gym & Cardio',
    desc: 'State-of-the-art treadmills, cross-trainers, free weights, and dedicated stretching/yoga mats.',
    icon: FaDumbbell,
    badge: 'Health & Energy',
  },
  {
    title: 'E-Sports Arena',
    category: 'Competitive PC',
    desc: 'High-refresh gaming rigs, mechanical RGB keyboards, surround headsets, and zero-lag LAN.',
    icon: FaGamepad,
    badge: 'Pro PC Gaming',
  },
  {
    title: 'Multipurpose Hall',
    category: 'Events & Theater',
    desc: 'Acoustically treated sound-equipped hall for private screenings, meetings, and parties.',
    icon: FaBuilding,
    badge: 'Gatherings & Events',
  },
];

const GROUP_EXPERIENCES = [
  {
    title: 'Family & Friends Outings',
    desc: 'Spend memorable quality hours playing multi-player games, foosball tournaments, and air hockey showdowns.',
  },
  {
    title: 'Corporate Team Building',
    desc: 'Boost morale, encourage healthy competition, and build teamwork through bowling leagues and table tennis matches.',
  },
  {
    title: 'Birthday & Private Parties',
    desc: 'Host unforgettable celebrations with private gaming lounge access, VR sessions, and banquet dining.',
  },
  {
    title: 'Monsoon & Rainy Day Retreat',
    desc: 'Full-day indoor entertainment safe from heat or rain in a comfortable, fully air-conditioned environment.',
  },
];

export default function IndoorGameZones() {
  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="indoor-games"
            alt="Bambardara Indoor Games Zone with Billiards, Table Tennis, and Gaming Arcades"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,32,24,0.35) 0%, rgba(6,32,24,0.7) 65%, rgba(6,32,24,0.95) 100%), linear-gradient(90deg, rgba(6,32,24,0.85) 0%, rgba(6,32,24,0.4) 60%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <Reveal>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-luxury-gold/50 bg-ivory-white/15 px-4 py-1.5 font-body text-[0.7rem] uppercase tracking-wider text-muted-gold backdrop-blur-md">
              <span className="font-semibold text-ivory-white">Bambardara Agrotourism Pvt. Ltd.</span>
              <span className="text-luxury-gold">•</span>
              <span>Live Green • Live Smart • Live Better</span>
            </div>
          </Reveal>

          {/* Slogan Banner */}
          <Reveal delay={100}>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-lg border border-amber-600/40 bg-gradient-to-r from-amber-900/80 to-amber-950/80 px-4 py-2 text-amber-200 shadow-luxury-md backdrop-blur-sm">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold md:text-sm">
                Fun • Fitness • Entertainment • Relaxation
              </span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-light leading-[1.05] tracking-tight text-ivory-white md:text-7xl">
              Indoor <span className="italic text-luxury-gold">Games Zone</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 max-w-2xl font-heading text-2xl font-normal italic text-luxury-gold md:text-3xl">
              Play • Enjoy • Connect — Memories for Life
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-3 font-body text-[0.85rem] font-semibold uppercase tracking-[0.25em] text-ivory-white/85">
              &ldquo;Bambardara &mdash; More Than A Destination, It&rsquo;s An Experience&rdquo;
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/enquire" className="lux-btn-gold inline-flex items-center gap-2">
                <span>Book Group Session</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <a
                href="tel:+917588775757"
                className="inline-flex items-center gap-2 rounded-full border border-ivory-white/30 bg-ivory-white/10 px-6 py-3 font-body text-xs font-semibold uppercase tracking-wider text-ivory-white backdrop-blur-md transition-colors hover:bg-ivory-white/20"
              >
                <FaPhoneAlt className="h-3.5 w-3.5 text-luxury-gold" />
                <span>+91 75887 75757</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROMO TICKER STRIP */}
      <section className="border-y border-stone bg-emerald-950 py-4 text-ivory-white">
        <div className="mx-auto flex max-w-editorial flex-wrap items-center justify-between gap-4 px-6 md:px-10">
          <p className="font-heading text-sm italic tracking-wide text-luxury-gold md:text-base">
            &ldquo;Play • Enjoy • Connect &mdash; Memories for Life&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ivory-white/80">
            <span>16+ Game Zones</span>
            <span className="text-luxury-gold">•</span>
            <span>All-Age Fun</span>
            <span className="text-luxury-gold">•</span>
            <span>Climate-Controlled AC</span>
            <span className="text-luxury-gold">•</span>
            <span>VR &amp; E-Sports</span>
          </div>
        </div>
      </section>

      {/* 7 FEATURE PILLARS */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Why Choose Our Games Zone"
            title={
              <>
                Entertainment Built For
                <span className="block italic text-luxury-gold">Every Generation</span>
              </>
            }
            lede="Step into a world-class indoor recreation arena where luxury ambience meets endless active fun and friendly rivalry."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SEVEN_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="group relative flex h-full flex-col border border-stone bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-luxury-gold hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-colors group-hover:bg-forest-green group-hover:text-luxury-gold p-3">
                      <p.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-luxury-gold/70">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-light text-forest-green">
                    {p.title}
                  </h3>
                  <span className="lux-rule mt-3" />
                  <p className="mt-3 flex-1 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ALL 16 GAME & ACTIVITY ZONES */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Explore Our 16+ Attractions"
            title={
              <>
                16 Exciting
                <span className="block italic text-luxury-gold">Games &amp; Activity Zones</span>
              </>
            }
            lede="From classic cue sports and racket games to immersive VR and high-speed racing simulators, explore our full spectrum of entertainment."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GAME_ACTIVITIES.map((game, idx) => (
              <Reveal key={game.title} delay={idx * 50}>
                <div className="group flex h-full flex-col rounded-xl border border-stone bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-luxury-gold hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-green/10 text-forest-green transition-colors group-hover:bg-forest-green group-hover:text-luxury-gold">
                      <game.icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-warm-sand px-2.5 py-1 font-body text-[0.62rem] font-medium uppercase tracking-wider text-forest-green">
                      {game.badge}
                    </span>
                  </div>

                  <div className="mt-4 flex-1">
                    <span className="font-body text-[0.68rem] font-semibold uppercase tracking-wider text-luxury-gold">
                      {game.category}
                    </span>
                    <h4 className="mt-1 font-heading text-xl font-light text-forest-green">
                      {game.title}
                    </h4>
                    <p className="mt-2 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
                      {game.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP VISITS & EVENT OCCASIONS */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Perfect For Every Group"
            title={
              <>
                Ideal For
                <span className="block italic text-luxury-gold">Parties, Offsites &amp; Family Days</span>
              </>
            }
            lede="Custom tournament formats, private hall bookings, and combined meal packages designed to elevate your visit."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GROUP_EXPERIENCES.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-lg border border-stone bg-white p-7 transition-all duration-500 hover:border-luxury-gold hover:shadow-lg">
                  <span className="font-heading text-2xl font-light text-luxury-gold">
                    0{i + 1}.
                  </span>
                  <h4 className="mt-3 font-heading text-xl font-light text-forest-green">
                    {item.title}
                  </h4>
                  <span className="lux-rule mt-3" />
                  <p className="mt-3 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & BOOKING CTA */}
      <section className="bg-emerald-950 px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Left: Quote & Experience Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <span className="lux-label text-muted-gold">Plan Your Experience</span>
              <h2 className="mt-4 font-heading text-4xl font-light italic leading-tight text-luxury-gold md:text-5xl">
                More Than A Destination,
                <span className="block font-normal text-ivory-white">It&rsquo;s An Experience.</span>
              </h2>
              <p className="mt-5 font-body text-sm font-light leading-relaxed text-ivory-white/80">
                Open all 7 days of the week. Combine your indoor gaming experience with our resort stay, dining, water park, and agro farm tours.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/enquire" className="lux-btn-gold">
                  <span>Reserve Group Slots</span>
                </Link>
                <a href="tel:+917588775757" className="lux-btn-light">
                  <span>Call Us For Bookings</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Contact Details Card */}
          <div className="lg:col-span-6 flex flex-col justify-center border-t border-ivory-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <Reveal delay={150}>
              <span className="lux-label text-muted-gold">Reach &amp; Contact Us</span>

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

      {/* CLOSING TAGLINE */}
      <div className="border-t border-stone bg-warm-sand py-5">
        <p className="mx-auto flex max-w-editorial flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-center font-body text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-forest-green">
          <span>Play</span>
          <span className="text-luxury-gold">|</span>
          <span>Enjoy</span>
          <span className="text-luxury-gold">|</span>
          <span>Connect</span>
          <span className="text-luxury-gold">|</span>
          <span>Memories For Life</span>
        </p>
      </div>
    </main>
  );
}
