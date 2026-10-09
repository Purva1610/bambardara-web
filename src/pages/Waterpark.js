import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaWater,
  FaChild,
  FaUtensils,
  FaShieldAlt,
  FaParking,
  FaLock,
  FaShower,
  FaFirstAid,
  FaLifeRing,
  FaUsers,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSun,
  FaBus,
  FaBriefcase,
  FaUmbrellaBeach,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaCheckCircle,
} from 'react-icons/fa';
import { GiWaterSplash, GiWaterTower } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const KEY_HIGHLIGHTS = [
  {
    icon: FaWater,
    title: 'Wave Pool',
    tagline: 'Feel the waves, love the fun!',
    description:
      'Experience artificial ocean-like waves surrounded by the breathtaking greenery of the Western Ghats. Perfect for high-energy splashing and family relaxation.',
    badge: 'Popular',
  },
  {
    icon: GiWaterSplash,
    title: 'Thrilling Slides',
    tagline: 'High speed. High excitement!',
    description:
      'Adrenaline-pumping multi-lane body slides, dizzying spiral flumes, and fast drops engineered for thrill-seekers of all ages.',
    badge: 'Thrilling',
  },
  {
    icon: FaChild,
    title: 'Kids Play Area',
    tagline: 'Safe & fun for little adventurers!',
    description:
      'A dedicated shallow splash wonderland with interactive water fountains, mini rainbow slides, and the famous giant tipping water bucket.',
    badge: 'Family Favorite',
  },
  {
    icon: FaUtensils,
    title: 'Food Court',
    tagline: 'Tasty bites to refuel your energy!',
    description:
      'Delicious multi-cuisine snacks, hot meals, cool refreshing beverages, and ice creams to recharge after hours of water fun.',
    badge: 'Refreshing',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Hygienic',
    tagline: 'Clean, secure & well maintained!',
    description:
      'Continuous multi-stage water filtration, strict hygiene protocols, and certified lifeguards on duty across every pool and slide.',
    badge: '100% Certified',
  },
];

const ATTRACTION_CARDS = [
  {
    title: 'Exciting Rides',
    tagline: 'High-Speed Thrills & Multi-Flume Slides',
    description:
      'Take the plunge on giant spiral tubes, racer slides, and open chutes designed for non-stop laughs and screams of joy.',
    slug: 'waterpark-rides',
    features: ['Multi-lane racing slides', 'High-speed spiral flumes', 'Continuous water flow control'],
  },
  {
    title: 'Wave Pool Fun',
    tagline: 'Ocean Swells in the Mountains',
    description:
      'Ride rhythmic gentle swells and big wave sets in our expansive crystal-clear wave pool with safety tubes and life jackets.',
    slug: 'waterpark-wavepool',
    features: ['Multi-pattern wave cycles', 'Shallow entry zone', 'Dedicated lifeguard watchtower'],
  },
  {
    title: 'Kids Zone',
    tagline: 'Safe, Colorful & Interactive Splash Park',
    description:
      'A toddler-friendly aquatic park featuring giant tipping buckets, water cannons, sprinkler arches, and mini slides.',
    slug: 'waterpark-kids',
    features: ['Zero-depth & shallow pool', 'Giant splash tipping bucket', 'Soft landing safety mats'],
  },
  {
    title: 'Lazy River',
    tagline: 'Slow Drift Through Tropical Greenery',
    description:
      'Grab a single or double inflatable tube and drift peacefully along our winding lazy river surrounded by swaying palm trees.',
    slug: 'waterpark-lazyriver',
    features: ['Gentle continuous stream', 'Single & double tubes provided', 'Scenic tropical landscaping'],
  },
  {
    title: 'Food & Refreshments',
    tagline: 'Refuel with Tasty Treats & Cold Drinks',
    description:
      'Enjoy hot Maharashtrian specialties, crisp fast food, chilled fresh juices, and ice-creams at our hygienic food court.',
    slug: 'waterpark-food',
    features: ['Multi-cuisine menu', 'Family dining seating', 'Hygiene-certified kitchen'],
  },
];

const PERFECT_FOR = [
  {
    icon: FaBus,
    title: 'School Picnic',
    description:
      'Safe, engaging, and memorable group day trips tailored for students with full teacher assistance and certified lifeguards.',
  },
  {
    icon: FaBriefcase,
    title: 'Corporate Outing',
    description:
      'Recharge your team, build stronger connections, and beat workday stress with thrilling water rides and group dining.',
  },
  {
    icon: FaUmbrellaBeach,
    title: 'Weekend Getaway',
    description:
      'Escape the city heat with family and friends for an unforgettable weekend of refreshing water adventures and agrotourism.',
  },
  {
    icon: FaUsers,
    title: 'Family, Friends & Groups',
    description:
      'Celebrate birthdays, family reunions, and anniversaries with unlimited water rides, splash zones, and private group packages.',
  },
];

const AMENITIES = [
  {
    icon: FaParking,
    title: 'Spacious Parking',
    desc: 'Ample and organized parking space for cars, two-wheelers, and large tour buses.',
  },
  {
    icon: FaLock,
    title: 'Locker Facility',
    desc: 'Secure digital and keyed storage lockers to keep your valuables safe while you swim.',
  },
  {
    icon: FaShower,
    title: 'Changing Rooms',
    desc: 'Separate, private, and sanitized changing suites with hot and cold fresh water showers.',
  },
  {
    icon: FaFirstAid,
    title: 'First Aid Support',
    desc: 'Equipped medical station and trained first-aid response team on standby throughout open hours.',
  },
  {
    icon: FaLifeRing,
    title: 'Certified Lifeguards',
    desc: 'Professional and vigilant lifeguards stationed at every slide, wave pool, and splash zone.',
  },
];

export default function Waterpark() {
  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="waterpark-hero"
            alt="Bambardara Water Park with giant slides, wave pool and splash castle"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        {/* Scrim Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,32,24,0.3) 0%, rgba(6,32,24,0.7) 65%, rgba(6,32,24,0.95) 100%), linear-gradient(90deg, rgba(6,32,24,0.85) 0%, rgba(6,32,24,0.4) 60%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <Reveal>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-luxury-gold/50 bg-ivory-white/15 px-4 py-1.5 font-body text-[0.7rem] uppercase tracking-wider text-muted-gold backdrop-blur-md">
              <span className="font-semibold text-ivory-white">Bambardara Agrotourism Pvt. Ltd.</span>
              <span className="text-luxury-gold">•</span>
              <span>Nature • Agriculture • Hospitality</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-5 flex items-center gap-3">
              <span className="inline-block rounded-md bg-amber-500/90 px-3 py-1 font-body text-[0.75rem] font-bold uppercase tracking-wider text-deep-forest shadow-md">
                Beat the Heat
              </span>
              <span className="font-heading text-lg font-light italic text-luxury-gold">
                Enjoy the WATER FUN!
              </span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-3 max-w-3xl font-heading text-5xl font-light leading-[1.05] tracking-tight text-ivory-white md:text-7xl">
              Water Park
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 max-w-2xl font-heading text-2xl font-normal italic text-luxury-gold md:text-3xl">
              Fun Unlimited... Memories Forever!
            </p>
          </Reveal>

          <Reveal delay={280}>
            {/* Feature Pills from Poster */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-ivory-white/90">
              <span className="rounded-full bg-ivory-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-ivory-white/20">
                🎢 Thrilling Rides
              </span>
              <span className="text-luxury-gold">•</span>
              <span className="rounded-full bg-ivory-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-ivory-white/20">
                💦 Splashing Fun
              </span>
              <span className="text-luxury-gold">•</span>
              <span className="rounded-full bg-ivory-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-ivory-white/20">
                👨‍👩‍👧‍👦 Family Entertainment
              </span>
              <span className="text-luxury-gold">•</span>
              <span className="rounded-full bg-ivory-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-ivory-white/20">
                🌿 Refreshing Experience
              </span>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/enquire" className="lux-btn-gold inline-flex items-center gap-2">
                <span>Book Your Tickets Today</span>
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
            &ldquo;Come... Splash... Enjoy... Create Memories!&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-ivory-white/80">
            <span>Enjoy</span>
            <span className="text-luxury-gold">•</span>
            <span>Relax</span>
            <span className="text-luxury-gold">•</span>
            <span>Refresh</span>
            <span className="text-luxury-gold">•</span>
            <span>Repeat</span>
          </div>
        </div>
      </section>

      {/* 5 KEY HIGHLIGHTS SECTION */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Unlimited Water Fun"
            title={
              <>
                Dive Into
                <span className="block italic text-luxury-gold">Pure Excitement &amp; Joy</span>
              </>
            }
            lede="Designed for all age groups with international safety standards, clean mountain-fresh filtered water, and non-stop thrilling attractions."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="group relative flex h-full flex-col border border-stone bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-luxury-gold hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-colors group-hover:bg-forest-green group-hover:text-luxury-gold">
                      <h.icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-warm-sand px-3 py-1 font-body text-[0.65rem] font-medium uppercase tracking-wider text-forest-green">
                      {h.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 font-heading text-2xl font-light text-forest-green">
                    {h.title}
                  </h3>
                  <p className="mt-1 font-heading text-sm italic text-luxury-gold">
                    {h.tagline}
                  </p>
                  <span className="lux-rule mt-4" />
                  <p className="mt-4 flex-1 font-body text-[0.88rem] font-light leading-[1.8] text-light-charcoal">
                    {h.description}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* BONUS CARD: WATER PARK TIMINGS & TICKET CALLOUT */}
            <Reveal delay={400}>
              <div className="flex h-full flex-col justify-between border border-luxury-gold/40 bg-gradient-to-br from-deep-forest to-emerald-950 p-8 text-ivory-white shadow-luxury-md">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/40 bg-ivory-white/10 px-3 py-1 font-body text-[0.65rem] uppercase tracking-wider text-luxury-gold">
                    <FaSun className="h-3 w-3" />
                    Plan Your Visit
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-light text-ivory-white">
                    Full Day of Splashes
                  </h3>
                  <p className="mt-2 font-body text-xs font-light leading-relaxed text-ivory-white/80">
                    Open every day from <strong>10:00 AM to 6:00 PM</strong>. Special discounted packages available for schools, corporate outings, and family groups.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-ivory-white/15">
                  <Link to="/enquire" className="lux-btn-gold w-full text-center">
                    <span>Book Your Tickets</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED ATTRACTIONS & ZONES */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Attractions & Zones"
            title={
              <>
                Explore The
                <span className="block italic text-luxury-gold">Water Park Zones</span>
              </>
            }
            lede="From high-adrenaline rides to soothing lazy river floats, there is something thrilling for every member of your family."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ATTRACTION_CARDS.map((card, idx) => (
              <Reveal key={card.title} delay={idx * 100}>
                <div className="group flex h-full flex-col overflow-hidden border border-stone bg-white shadow-soft transition-all duration-500 hover:shadow-xl">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-forest-green">
                    <EstateImage
                      slug={card.slug}
                      alt={card.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="isolate h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="font-heading text-lg font-light text-ivory-white drop-shadow">
                        {card.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <h4 className="font-heading text-xl font-light text-forest-green">
                      {card.title}
                    </h4>
                    <p className="mt-1 font-heading text-xs italic text-luxury-gold">
                      {card.tagline}
                    </p>
                    <p className="mt-3 font-body text-[0.85rem] font-light leading-relaxed text-light-charcoal">
                      {card.description}
                    </p>

                    <div className="mt-6 border-t border-stone pt-4">
                      <ul className="space-y-2">
                        {card.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 font-body text-xs font-light text-light-charcoal">
                            <FaCheckCircle className="h-3 w-3 flex-shrink-0 text-luxury-gold" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERFECT DESTINATION FOR */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Perfect Destination"
            title={
              <>
                Ideal For
                <span className="block italic text-luxury-gold">Family, Friends &amp; Groups</span>
              </>
            }
            lede="Celebrate milestones, organize memorable school tours, or host dynamic corporate team outings with customized food and ride packages."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERFECT_FOR.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="flex h-full flex-col items-center border border-stone bg-white p-8 text-center transition-all duration-500 hover:border-luxury-gold hover:shadow-lg">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/30 bg-warm-sand text-forest-green shadow-soft">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-light text-forest-green">
                    {item.title}
                  </h3>
                  <span className="lux-rule mt-3" />
                  <p className="mt-3 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR AMENITIES */}
      <section className="bg-emerald-950 px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Our Amenities"
            tone="light"
            title={
              <>
                Comfort, Safety &amp;
                <span className="block italic text-muted-gold">Seamless Hospitality</span>
              </>
            }
            lede="We have thought of every detail to ensure your water park visit is hassle-free, safe, and comfortable from start to finish."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {AMENITIES.map((amenity, i) => (
              <Reveal key={amenity.title} delay={i * 80}>
                <div className="flex h-full flex-col items-center rounded-lg border border-ivory-white/15 bg-ivory-white/5 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:bg-ivory-white/10 hover:border-luxury-gold/50">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/40 bg-ivory-white/10 text-luxury-gold shadow-inner">
                    <amenity.icon className="h-6 w-6" />
                  </span>
                  <h4 className="mt-4 font-heading text-lg font-light text-ivory-white">
                    {amenity.title}
                  </h4>
                  <p className="mt-2 font-body text-xs font-light leading-relaxed text-ivory-white/70">
                    {amenity.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK TICKETS & REACH US / CONTACT INFO */}
      <section className="bg-deep-forest px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Left Column: Booking CTA */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/40 bg-ivory-white/10 px-3.5 py-1.5 font-body text-[0.65rem] uppercase tracking-wider text-muted-gold">
                <GiWaterTower className="h-3.5 w-3.5" />
                Easy Ticket Booking
              </span>
              <h2 className="mt-6 font-heading text-[clamp(2rem,4vw,3rem)] font-light leading-tight text-ivory-white">
                Book Your
                <span className="block italic text-luxury-gold">Tickets Today!</span>
              </h2>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-ivory-white/80">
                Come splash with us and create timeless memories with your family and loved ones. Special rates available for group packages, school tours, and corporate events.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 font-body text-sm font-light text-ivory-white/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold/20 text-luxury-gold text-xs">✓</span>
                  <span>Instant confirmation for online reservations</span>
                </div>
                <div className="flex items-center gap-3 font-body text-sm font-light text-ivory-white/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold/20 text-luxury-gold text-xs">✓</span>
                  <span>All-access pass to slides, wave pool, and kids zone</span>
                </div>
                <div className="flex items-center gap-3 font-body text-sm font-light text-ivory-white/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-luxury-gold/20 text-luxury-gold text-xs">✓</span>
                  <span>Complimentary locker assistance and parking</span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/enquire" className="lux-btn-gold">
                  <span>Reserve Tickets Online</span>
                </Link>
                <a href="tel:+917588775757" className="lux-btn-light">
                  <span>Call For Instant Booking</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Location & Contact Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center border-t border-ivory-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <Reveal delay={150}>
              <span className="lux-label text-muted-gold">Reach &amp; Contact Us</span>

              <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ivory-white/10 text-luxury-gold">
                    <FaMapMarkerAlt className="h-4 w-4" />
                  </span>
                  <div>
                    <h5 className="font-heading text-sm font-medium uppercase tracking-wider text-luxury-gold">Location</h5>
                    <p className="mt-1 font-body text-sm font-light leading-relaxed text-ivory-white/80">
                      Parale Ninai, Shahuwadi, Kolhapur – 415101, Maharashtra
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ivory-white/10 text-luxury-gold">
                    <FaPhoneAlt className="h-4 w-4" />
                  </span>
                  <div>
                    <h5 className="font-heading text-sm font-medium uppercase tracking-wider text-luxury-gold">Call &amp; WhatsApp</h5>
                    <div className="mt-1 flex flex-col gap-1 font-body text-sm font-light text-ivory-white">
                      <a href="tel:+917588775757" className="transition-colors hover:text-luxury-gold">
                        +91 75887 75757
                      </a>
                      <a href="tel:+919322275757" className="transition-colors hover:text-luxury-gold">
                        +91 93222 75757
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-ivory-white/15">
                  <h5 className="font-heading text-xs font-medium uppercase tracking-wider text-luxury-gold">Follow Us</h5>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Follow Bambardara on Instagram"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-white/10 text-ivory-white transition-colors hover:bg-luxury-gold hover:text-deep-forest"
                    >
                      <FaInstagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Follow Bambardara on Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-white/10 text-ivory-white transition-colors hover:bg-luxury-gold hover:text-deep-forest"
                    >
                      <FaFacebookF className="h-4 w-4" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Follow Bambardara on YouTube"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-white/10 text-ivory-white transition-colors hover:bg-luxury-gold hover:text-deep-forest"
                    >
                      <FaYoutube className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING TAGLINE BAR */}
      <div className="border-t border-stone bg-warm-sand py-6">
        <p className="mx-auto flex max-w-editorial flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-center font-body text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-forest-green">
          <span>Enjoy</span>
          <span className="text-luxury-gold">|</span>
          <span>Relax</span>
          <span className="text-luxury-gold">|</span>
          <span>Refresh</span>
          <span className="text-luxury-gold">|</span>
          <span>Repeat</span>
        </p>
      </div>
    </main>
  );
}
