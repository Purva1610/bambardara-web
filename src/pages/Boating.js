import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCamera,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaShip,
  FaParking,
  FaUtensils,
  FaTshirt,
  FaChild,
  FaFirstAid,
  FaPhoneAlt,
  FaQrcode,
  FaRegClock,
  FaAnchor,
  FaLifeRing,
} from 'react-icons/fa';
import { GiSpeedBoat, GiSailboat, GiLifeJacket, GiShipWheel } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';
import BoatingHero from '../components/experiences/BoatingHero';
import BoatingAbout from '../components/experiences/BoatingAbout';

const HIGHLIGHTS = [
  {
    icon: GiSpeedBoat,
    title: 'Luxury Fleet',
    body: 'Modern high-speed boats and spacious cruisers fitted with comfortable seating and scenic 360° water vantage.',
  },
  {
    icon: FaAnchor,
    title: 'Lake Celebrations',
    body: 'Private lake gatherings, birthday rides, and romantic sunset cruises gliding peacefully along the Sahyadri shores.',
  },
  {
    icon: GiShipWheel,
    title: 'Boat Rentals',
    body: 'Easy self-pedal boats and motorboat rentals with simple instructions, full gear provided, and optional guided captains.',
  },
  {
    icon: FaLifeRing,
    title: 'Private Charters',
    body: 'Custom excursions letting your family charter private boats for dedicated durations to explore hidden lake corners.',
  },
];

const BOATING_INFO = [
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Bambardara Lake, Maharashtra',
    detail: 'Parale Ninai, Shahuwadi, Kolhapur',
  },
  {
    icon: FaRegClock,
    label: 'Timings',
    value: '8:00 AM – 6:00 PM',
    detail: 'Daily morning & evening slots',
  },
  {
    icon: FaCalendarAlt,
    label: 'Open All Days',
    value: 'Monday to Sunday',
    detail: 'Weather Permitting',
  },
  {
    icon: GiLifeJacket,
    label: 'Life Jackets',
    value: 'Compulsory For Everyone',
    detail: 'All sizes available on shore',
  },
  {
    icon: FaUsers,
    label: 'Capacity',
    value: '1 to 8 Persons',
    detail: 'As per selected boat type',
  },
];

const BOAT_OPTIONS = [
  {
    name: 'Speed Boat',
    seats: '6 – 8 Seater',
    duration: '15 Minutes',
    price: '₹800/-',
    icon: GiSpeedBoat,
    slug: 'speedboat',
    kicker: 'Over 2,000 HP • High Speed Thrill',
    description: 'High-speed motorboat thrills with sharp turns, wind in your hair, and splashing excitement.',
    badge: 'Thrilling Ride',
  },
  {
    name: 'Shikara Boat',
    seats: '4 – 6 Seater',
    duration: '30 Minutes',
    price: '₹500/-',
    icon: GiSailboat,
    slug: 'shkaria',
    kicker: 'Royal Kashmiri Canopy • Cushioned Comfort',
    description: 'Traditional Kashmiri-style canopied wooden boat with comfortable cushioned seating.',
    badge: 'Royal Serenity',
  },
  {
    name: 'Paddle Boat',
    seats: '2 – 4 Seater',
    duration: '30 Minutes',
    price: '₹300/-',
    icon: FaShip,
    slug: 'paddle-boat',
    kicker: 'Self-Pedal Leisure • Calm Scenic Waters',
    description: 'Pedal at your own leisurely pace with family or friends across the gentle calm waters.',
    badge: 'Popular for Families',
  },
  {
    name: 'Row Boat',
    seats: '2 – 3 Seater',
    duration: '30 Minutes',
    price: '₹250/-',
    icon: FaShip,
    slug: 'row',
    kicker: 'Classic Wooden • Authentic Traditional Cruise',
    description: 'Classic wooden rowing experience with lightweight oars for an authentic traditional cruise.',
    badge: 'Classic Experience',
  },
  {
    name: 'Family Safari Cruise',
    seats: 'Up to 8 Persons',
    duration: '30 Minutes',
    price: '₹1,200/-',
    icon: FaShip,
    slug: 'cruise',
    kicker: 'Group Charter • 360° Lake Tour',
    description: 'Spacious luxury motorboat cruising the entire lake perimeter with life jackets for everyone.',
    badge: 'Exclusive Charter',
  },
];

const GALLERY = [
  { slug: 'sunrise', caption: 'Serene Morning Swells' },
  { slug: 'family-boating', caption: 'Family Boating Adventure' },
  { slug: 'panoramic', caption: 'Panoramic Lake Horizon' },
  { slug: 'pristine-mountain', caption: 'Pristine Mountain Waters' },
];

const FACILITIES = [
  {
    icon: FaParking,
    title: 'Parking Facility',
    desc: 'Ample organized parking for private cars, bikes, and tourist buses.',
  },
  {
    icon: FaUtensils,
    title: 'Food Court & Rest Area',
    desc: 'Lakeside snacks, fresh refreshments, hot beverages, and shaded seating.',
  },
  {
    icon: FaTshirt,
    title: 'Changing Rooms',
    desc: 'Clean, sanitized, and separate changing facilities for gents and ladies.',
  },
  {
    icon: FaCamera,
    title: 'Photo Points',
    desc: 'Scenic viewpoints perfect for capturing memorable photos against the hills.',
  },
  {
    icon: FaChild,
    title: 'Children Play Area',
    desc: 'Safe and fun open playground for kids right beside the boating jetty.',
  },
  {
    icon: FaFirstAid,
    title: 'First Aid Available',
    desc: 'Equipped first aid kit and trained staff ready on shore at all times.',
  },
  {
    icon: FaShieldAlt,
    title: 'Security & Safety',
    desc: 'Strict safety standards, lifebuoys, and continuous lifeguard supervision.',
  },
];

export default function Boating() {
  const [showAllBoats, setShowAllBoats] = useState(false);
  const visibleBoats = showAllBoats ? BOAT_OPTIONS : BOAT_OPTIONS.slice(0, 3);

  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* LUXURY YACHT/BOAT HERO MATCHING REFERENCE */}
      <BoatingHero />

      {/* LUXURY YACHT/BOAT ABOUT MOSAIC SECTION MATCHING REFERENCE */}
      <BoatingAbout />


      {/* 4 BOATING HIGHLIGHTS (DARK FOREST GREEN SECTION) */}
      <section className="bg-deep-forest px-6 py-20 text-ivory-white md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Boating Highlights"
            title={
              <>
                An Unforgettable Time,
                <span className="block italic text-luxury-gold">Adrift On The Lake</span>
              </>
            }
            lede="Immerse in the calm waters of Bambardara Lake with premium safety gear, scenic mountain horizons, and enjoyable rides for all ages."
            tone="light"
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <div className="group relative flex h-full flex-col justify-between rounded-lg border border-white/20 bg-white/[0.03] p-8 sm:p-9 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-luxury-gold/60 hover:bg-white/[0.06] hover:shadow-2xl">
                  <div>
                    <div className="mb-8 flex items-center justify-start transition-transform duration-500 group-hover:scale-110">
                      <h.icon className="h-11 w-11 sm:h-12 sm:w-12 text-white drop-shadow" />
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-light text-white tracking-wide">
                      {h.title}
                    </h3>
                    <p className="mt-3.5 font-body text-xs sm:text-[0.82rem] font-light leading-relaxed text-white/75">
                      {h.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR BOATING OPTIONS (EXACT 3-CARD SHOWCASE MATCHING REFERENCE) */}
      <section id="boat-types" className="bg-[#FAF7F2] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          {/* Top Header Row with Pill, Title & Action Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center rounded-full border border-dark-charcoal/30 bg-ivory-white px-4 py-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-dark-charcoal shadow-soft">
                  Boat Types
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-wide text-dark-charcoal leading-[1.15]">
                  WHICH BOAT TYPE IS
                  <span className="block font-medium">PERFECT FOR YOU?</span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <button
                type="button"
                onClick={() => setShowAllBoats(!showAllBoats)}
                className="group inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ivory-white shadow-luxury transition-all duration-300 hover:bg-forest-green hover:shadow-luxury-lg hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <span>{showAllBoats ? 'Show Less' : 'View All Fleet'}</span>
                <span
                  className="text-base transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </button>
            </Reveal>
          </div>

          {/* 3-Card Grid Matching Reference */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {visibleBoats.map((boat, idx) => (
              <Reveal key={boat.name} delay={idx * 80}>
                <div className="group relative flex flex-col justify-end min-h-[520px] sm:min-h-[560px] md:min-h-[580px] w-full overflow-hidden rounded-2xl border border-stone/40 bg-deep-forest shadow-luxury transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                  {/* Full Bleed Background Image */}
                  <div className="absolute inset-0 isolate">
                    <EstateImage
                      slug={boat.slug}
                      alt={boat.name}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-40% to-transparent pointer-events-none" />

                  {/* Floating Circular Arrow Action Button (Top-Right) */}
                  <Link
                    to="/enquire"
                    aria-label={`Reserve ${boat.name}`}
                    className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-ivory-white text-dark-charcoal shadow-luxury transition-all duration-300 hover:bg-luxury-gold hover:text-deep-forest hover:scale-110 active:scale-95"
                  >
                    <span className="text-lg font-bold" aria-hidden="true">&rarr;</span>
                  </Link>

                  {/* Content (Bottom of Card) - Fully Padded with Generous Clearance */}
                  <div className="relative z-10 p-6 pb-7 sm:p-8 sm:pb-8 text-white">
                    <span className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-luxury-gold block mb-1.5">
                      {boat.kicker || `${boat.seats} • ${boat.duration}`}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-light text-white leading-tight">
                      {boat.name}
                    </h3>
                    <p className="mt-2.5 font-body text-xs font-light text-white/80 leading-relaxed line-clamp-2">
                      {boat.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-heading text-xl sm:text-2xl font-semibold text-luxury-gold leading-none">
                          {boat.price}
                        </span>
                        <span className="text-[0.68rem] text-white/60 font-body">/ ride</span>
                      </div>
                      <Link
                        to="/enquire"
                        className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:text-luxury-gold group-hover:translate-x-1"
                      >
                        <span>Reserve Now</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOATING INFO + TARIFF SECTION */}
      <section className="bg-deep-forest px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Left: Essential Info */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="lux-label text-muted-gold">Essential Guidelines</span>
                <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-ivory-white">
                  Boating <span className="italic text-luxury-gold">Information</span>
                </h3>
                <p className="mt-3 font-body text-sm font-light text-ivory-white/75">
                  Everything you need to know before stepping aboard at Bambardara Lake.
                </p>

                <dl className="mt-8 divide-y divide-ivory-white/10 border-y border-ivory-white/10">
                  {BOATING_INFO.map((r) => (
                    <div key={r.label} className="flex items-start justify-between gap-4 py-4">
                      <dt className="flex items-center gap-3 font-body text-[0.8rem] uppercase tracking-wider text-ivory-white/80">
                        <r.icon className="h-4 w-4 flex-shrink-0 text-luxury-gold" />
                        <span>{r.label}</span>
                      </dt>
                      <dd className="text-right font-body text-sm text-ivory-white">
                        <div className="font-medium text-luxury-gold">{r.value}</div>
                        <div className="text-[0.75rem] font-light text-ivory-white/60">{r.detail}</div>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Right: Boating Tariff Table */}
            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="lux-label text-muted-gold">Official Rates</span>
                    <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-ivory-white">
                      Boating <span className="italic text-luxury-gold">Tariff</span>
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block rounded-full border border-luxury-gold/40 bg-ivory-white/10 px-3.5 py-1 text-[0.65rem] uppercase tracking-wider text-luxury-gold">
                    All-Inclusive Rates
                  </span>
                </div>

                <div className="mt-8 overflow-hidden rounded-lg border border-ivory-white/15 bg-ivory-white/5 backdrop-blur-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-ivory-white/15 bg-ivory-white/10">
                        <th className="px-5 py-3.5 font-body text-[0.7rem] font-semibold uppercase tracking-wider text-luxury-gold">
                          Boat Type
                        </th>
                        <th className="px-4 py-3.5 font-body text-[0.7rem] font-semibold uppercase tracking-wider text-luxury-gold">
                          Seats
                        </th>
                        <th className="px-4 py-3.5 font-body text-[0.7rem] font-semibold uppercase tracking-wider text-luxury-gold">
                          Duration
                        </th>
                        <th className="px-5 py-3.5 text-right font-body text-[0.7rem] font-semibold uppercase tracking-wider text-luxury-gold">
                          Charges
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ivory-white/10">
                      {BOAT_OPTIONS.map((b, i) => (
                        <tr
                          key={b.name}
                          className={`transition-colors hover:bg-ivory-white/10 ${i % 2 === 1 ? 'bg-ivory-white/[0.02]' : ''
                            }`}
                        >
                          <td className="px-5 py-3.5 font-body text-sm font-medium text-ivory-white">
                            {b.name}
                          </td>
                          <td className="px-4 py-3.5 font-body text-xs text-ivory-white/70">
                            {b.seats}
                          </td>
                          <td className="px-4 py-3.5 font-body text-xs text-ivory-white/70">
                            {b.duration}
                          </td>
                          <td className="px-5 py-3.5 text-right font-heading text-base font-semibold text-luxury-gold">
                            {b.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-light text-ivory-white/60">
                  <p>* Rates may change without prior notice.</p>
                  <p>Life jackets provided free with every ticket.</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/enquire" className="lux-btn-gold">
                    <span>Book Your Ride</span>
                  </Link>
                  <a href="tel:+917588775757" className="lux-btn-light">
                    <span>Inquire By Phone</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MORE THAN BOATING FACILITIES */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="On-Shore Comfort"
            title={
              <>
                More Than Boating!
                <span className="block italic text-luxury-gold">Complete Guest Amenities</span>
              </>
            }
            lede="Relax by the lake, enjoy tasty meals, let the children play, and take scenic photos with family in a clean and peaceful setting."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="flex h-full flex-col items-center rounded-lg border border-stone bg-ivory-white p-7 text-center transition-all duration-500 hover:border-luxury-gold hover:shadow-lg">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/30 bg-warm-sand text-forest-green shadow-soft">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h4 className="mt-4 font-heading text-lg font-light text-forest-green">
                    {f.title}
                  </h4>
                  <p className="mt-2 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Lake Moments"
            title={
              <>
                Mornings &amp; Afternoons
                <span className="block italic text-luxury-gold">Spent Adrift On The Lake</span>
              </>
            }
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((item, idx) => (
              <Reveal key={item.caption} delay={idx * 90}>
                <div className="lux-frame aspect-[4/5] w-full">
                  <EstateImage
                    slug={item.slug}
                    alt={item.caption}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="isolate"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <span className="font-heading text-base font-light text-ivory-white">
                      {item.caption}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UNWIND ESCAPE & CONTACT SECTION */}
      <section className="bg-deep-forest px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Left Column: Escape Slogan */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <span className="lux-label text-muted-gold">The Perfect Retreat</span>
              <h2 className="mt-4 font-heading text-4xl font-light italic leading-tight text-luxury-gold md:text-5xl">
                Unwind. Refresh. Enjoy.
              </h2>
              <p className="mt-4 font-heading text-xl font-light text-ivory-white/90">
                A perfect escape for your family &amp; friends!
              </p>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-ivory-white/75">
                Whether you seek peaceful solitude on a morning row or high-energy family laughter in a pedal boat, Bambardara Lake offers the perfect natural sanctuary.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/enquire"
                  className="inline-flex items-center justify-center rounded-sm bg-luxury-gold px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-deep-forest transition-all duration-300 hover:bg-rich-gold hover:shadow-gold hover:-translate-y-0.5"
                >
                  <span>Book Your Ride Today!</span>
                </Link>
                <a
                  href="tel:+917588775757"
                  className="inline-flex items-center justify-center rounded-sm border border-ivory-white/40 px-8 py-3.5 font-body text-xs font-medium uppercase tracking-[0.2em] text-ivory-white transition-all duration-300 hover:bg-ivory-white/10 hover:border-ivory-white hover:-translate-y-0.5"
                >
                  <span>Call Us Directly</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact & QR Code Card */}
          <div className="lg:col-span-6 flex flex-col justify-center border-t border-ivory-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <Reveal delay={150}>
              <span className="lux-label text-muted-gold">Reach &amp; Contact Us</span>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-heading text-lg font-medium text-ivory-white">
                    Bambarddara Agro Tourism Pvt. Ltd.
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

                <div className="flex items-center justify-between border-t border-ivory-white/15 pt-6">
                  <div>
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

                  <div className="flex flex-col items-center rounded-lg border border-luxury-gold/40 bg-ivory-white/10 p-3 text-center">
                    <FaQrcode className="h-8 w-8 text-luxury-gold" />
                    <span className="mt-1 font-body text-[0.6rem] font-medium uppercase tracking-wider text-ivory-white">
                      Scan &amp; Visit
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLOSING TAGLINE STRIP */}
      <div className="border-t border-stone bg-warm-sand py-5">
        <p className="mx-auto flex max-w-editorial flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-center font-body text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-forest-green">
          <span>Safe Boating</span>
          <span className="text-luxury-gold">|</span>
          <span>Clean Lake</span>
          <span className="text-luxury-gold">|</span>
          <span>Green Future</span>
          <span className="text-luxury-gold">|</span>
          <span>Book Your Ride Today!</span>
        </p>
      </div>
    </main>
  );
}
