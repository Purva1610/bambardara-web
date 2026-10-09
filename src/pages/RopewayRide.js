import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMountain,
  FaCamera,
  FaUserFriends,
  FaLeaf,
  FaHeart,
  FaRulerHorizontal,
  FaRegClock,
  FaUsers,
  FaCalendarAlt,
  FaParking,
  FaUtensils,
  FaStore,
  FaChild,
  FaFirstAid,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTicketAlt,
} from 'react-icons/fa';
import { GiPineTree, GiSunset } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const HIGHLIGHTS = [
  {
    icon: FaMountain,
    title: 'Breathtaking Views',
    tagline: '360° Panoramic Horizons',
    body: 'Panoramic views of mist-covered mountains, shimmering lake waters, dense green forests, and deep rolling valleys.',
  },
  {
    icon: FaCamera,
    title: 'Scenic Ride',
    tagline: 'Thrills High Above Canopy',
    body: 'Enjoy a thrilling ropeway ride soaring above the lush greenery in a modern, secure, glass-sided observation cabin.',
  },
  {
    icon: FaUserFriends,
    title: 'Family Friendly',
    tagline: 'Safe & Joyful For All Ages',
    body: 'Safe, smooth, and enjoyable for grandparents, parents, and kids with easy walk-in boarding and spacious seating.',
  },
  {
    icon: FaLeaf,
    title: 'Eco Friendly',
    tagline: 'Zero-Emission Tourism',
    body: 'Sustainable electric ropeway system engineered for minimal environmental and ecological footprint in the reserve.',
  },
  {
    icon: FaHeart,
    title: 'Memorable Experience',
    tagline: 'Moments That Last A Lifetime',
    body: 'A must-do signature attraction for every nature enthusiast, vacationer, photographer, and family visiting the estate.',
  },
];

const ROPEWAY_INFO = [
  {
    icon: FaRulerHorizontal,
    label: 'Ropeway Length',
    value: 'Approx. 1.2 KM',
    detail: 'Continuous scenic aerial cable',
  },
  {
    icon: FaRegClock,
    label: 'Ride Duration',
    value: '8 – 10 Minutes',
    detail: 'Each single crossing',
  },
  {
    icon: FaUsers,
    label: 'Capacity',
    value: '8 Passengers / Cabin',
    detail: 'Spacious glass-enclosed cabins',
  },
  {
    icon: FaRegClock,
    label: 'Timings',
    value: '8:00 AM – 6:00 PM',
    detail: 'Daily morning & sunset slots',
  },
  {
    icon: FaCalendarAlt,
    label: 'Open All Days',
    value: 'Monday to Sunday',
    detail: 'Weather Permitting',
  },
];

const GALLERY_CARDS = [
  {
    slug: 'ropeway',
    title: 'Stunning Sunset Views',
    description: 'Watch the sun dip behind the Western Ghats with gold and crimson hues lighting up the water below.',
  },
  {
    slug: 'ropeway-2',
    title: 'Ride Above The Nature',
    description: 'Glide silently above the virgin forest canopy with fresh mountain air and sweeping ridge lines.',
  },
  {
    slug: 'ropeway-3',
    title: 'Perfect Family Outing',
    description: 'Cherish joyful moments with up to 8 family members seated together in comfort.',
  },
  {
    slug: 'ropeway',
    title: 'Untouched Beauty',
    description: 'Witness protected reserve valleys and tranquil lake shorelines impossible to view from the ground.',
  },
  {
    slug: 'ropeway-2',
    title: 'Memories That Last',
    description: 'Capture incredible photographs and videos from an exhilarating aerial viewpoint.',
  },
];

const FACILITIES = [
  {
    icon: FaParking,
    title: 'Parking Facility',
    desc: 'Spacious parking area for private vehicles, two-wheelers, and tour buses.',
  },
  {
    icon: FaUtensils,
    title: 'Food Court & Rest Area',
    desc: 'Hygienic snacks, cool drinks, hot chai, and shaded rest zones at base and summit stations.',
  },
  {
    icon: FaCamera,
    title: 'Photo Points',
    desc: 'Dedicated viewing decks designed for panoramic family and landscape photography.',
  },
  {
    icon: FaStore,
    title: 'Souvenir Shop',
    desc: 'Handcrafted local mementos, estate spices, organic honey, and photo prints.',
  },
  {
    icon: FaChild,
    title: 'Children Play Area',
    desc: 'Safe and engaging outdoor play zone for kids near the ropeway boarding pavilion.',
  },
  {
    icon: FaFirstAid,
    title: 'First Aid Available',
    desc: 'Trained first-aid responders and equipped medical station on standby.',
  },
  {
    icon: FaShieldAlt,
    title: 'Security & Safety',
    desc: 'Regular certified engineering inspections, emergency backup systems & monitored cabins.',
  },
];

export default function RopewayRide() {
  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="ropeway"
            alt="Bambardara Ropeway cabin gliding above the lake and lush forest"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,32,24,0.3) 0%, rgba(6,32,24,0.65) 65%, rgba(6,32,24,0.95) 100%), linear-gradient(90deg, rgba(6,32,24,0.85) 0%, rgba(6,32,24,0.4) 60%, transparent 100%)',
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

          {/* Top Wooden Ribbon Badge */}
          <Reveal delay={100}>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-lg border border-amber-600/40 bg-gradient-to-r from-amber-900/80 to-amber-950/80 px-4 py-2 text-amber-200 shadow-luxury-md backdrop-blur-sm">
              <FaMountain className="h-4 w-4 text-luxury-gold" />
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold md:text-sm">
                Ride Above, Discover Nature&rsquo;s Beauty
              </span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-light leading-[1.05] tracking-tight text-ivory-white md:text-7xl">
              Bambardara <span className="italic text-luxury-gold">Ropeway</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 max-w-2xl font-heading text-2xl font-normal italic text-luxury-gold md:text-3xl">
              A Scenic Journey to Serenity!
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-3 font-body text-[0.85rem] font-semibold uppercase tracking-[0.25em] text-ivory-white/85">
              Soar High, See Far, Feel Alive!
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/enquire" className="lux-btn-gold inline-flex items-center gap-2">
                <span>Book Your Ride Today</span>
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
            &ldquo;Closer to Nature, Closer to Yourself.&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ivory-white/80">
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <FaMountain className="h-3.5 w-3.5 text-luxury-gold" /> 1.2 KM Cable Ride
            </span>
            <span className="text-luxury-gold">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <GiPineTree className="h-3.5 w-3.5 text-luxury-gold" /> Eco Friendly
            </span>
            <span className="text-luxury-gold">•</span>
            <span className="inline-flex items-center gap-1.5 text-cyan-300">
              <GiSunset className="h-3.5 w-3.5 text-luxury-gold" /> Sunset Views
            </span>
          </div>
        </div>
      </section>

      {/* 5 ROPEWAY HIGHLIGHTS */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Ropeway Highlights"
            title={
              <>
                A Ride Worth
                <span className="block italic text-luxury-gold">Looking Down For</span>
              </>
            }
            lede="Step into our glass-sided cabins and elevate your perspective over the untouched mountains, serene lake waters, and lush green reserve."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="group relative flex h-full flex-col border border-stone bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-luxury-gold hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-colors group-hover:bg-forest-green group-hover:text-luxury-gold">
                      <h.icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-warm-sand px-3 py-1 font-body text-[0.65rem] font-medium uppercase tracking-wider text-forest-green">
                      {h.tagline}
                    </span>
                  </div>

                  <h3 className="mt-6 font-heading text-2xl font-light text-forest-green">
                    {h.title}
                  </h3>
                  <span className="lux-rule mt-4" />
                  <p className="mt-4 flex-1 font-body text-[0.88rem] font-light leading-[1.8] text-light-charcoal">
                    {h.body}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* BONUS CARD: OPERATING HOURS & SAFETY */}
            <Reveal delay={400}>
              <div className="flex h-full flex-col justify-between border border-luxury-gold/40 bg-gradient-to-br from-deep-forest to-emerald-950 p-8 text-ivory-white shadow-luxury-md">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/40 bg-ivory-white/10 px-3 py-1 font-body text-[0.65rem] uppercase tracking-wider text-luxury-gold">
                    <FaRegClock className="h-3 w-3" />
                    Daily Operations
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-light text-ivory-white">
                    8:00 AM – 6:00 PM
                  </h3>
                  <p className="mt-2 font-body text-xs font-light leading-relaxed text-ivory-white/80">
                    Open all 7 days of the week (weather permitting). Certified safety operators and continuous cabin surveillance at both stations.
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

      {/* ROPEWAY INFO + TICKET PRICES SECTION */}
      <section className="bg-deep-forest px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Left: Ropeway Info */}
            <div className="lg:col-span-6">
              <Reveal>
                <span className="lux-label text-muted-gold">Technical Details</span>
                <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-ivory-white">
                  Ropeway <span className="italic text-luxury-gold">Information</span>
                </h3>
                <p className="mt-3 font-body text-sm font-light text-ivory-white/75">
                  Engineered with European safety standards, smooth cable traction, and panoramic viewing angles.
                </p>

                <dl className="mt-8 divide-y divide-ivory-white/10 border-y border-ivory-white/10">
                  {ROPEWAY_INFO.map((r) => (
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

            {/* Right: Ticket Prices Cards */}
            <div className="lg:col-span-6 flex flex-col justify-center border-t border-ivory-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <Reveal delay={150}>
                <span className="lux-label text-muted-gold">Affordable Luxury</span>
                <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-ivory-white">
                  Ticket <span className="italic text-luxury-gold">Prices</span>
                </h3>
                <p className="mt-3 font-body text-sm font-light text-ivory-white/75">
                  Transparent pricing for single crossings and return journeys.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="rounded-xl border border-luxury-gold/40 bg-ivory-white/10 p-6 text-center backdrop-blur-md shadow-luxury-md">
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ivory-white/70">
                      One Way
                    </span>
                    <div className="mt-3 font-heading text-4xl font-light text-luxury-gold">
                      ₹ 250/-
                    </div>
                    <p className="mt-2 text-xs font-light text-ivory-white/60">
                      Single crossing between stations
                    </p>
                  </div>

                  <div className="rounded-xl border border-luxury-gold/60 bg-gradient-to-b from-luxury-gold/20 to-ivory-white/10 p-6 text-center backdrop-blur-md shadow-luxury-md">
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                      Round Trip
                    </span>
                    <div className="mt-3 font-heading text-4xl font-light text-luxury-gold">
                      ₹ 400/-
                    </div>
                    <p className="mt-2 text-xs font-light text-ivory-white/60">
                      Complete to-and-fro aerial journey
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-emerald-900/50 p-4 border border-emerald-700/40">
                  <div className="flex items-center gap-3">
                    <FaTicketAlt className="h-4 w-4 flex-shrink-0 text-luxury-gold" />
                    <p className="font-body text-xs font-light text-ivory-white/90">
                      <strong>Children Below 5 Years:</strong> FREE entry. *(Terms &amp; Conditions Apply)*
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/enquire" className="lux-btn-gold">
                    <span>Reserve Ride Online</span>
                  </Link>
                  <a href="tel:+917588775757" className="lux-btn-light">
                    <span>Call To Book</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5 GALLERY VISUAL CARDS */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="From The Cabin"
            title={
              <>
                Every Angle,
                <span className="block italic text-luxury-gold">Worth The Ride</span>
              </>
            }
            lede="Immerse yourself in spectacular vistas that only the Bambardara Ropeway can provide."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {GALLERY_CARDS.map((card, idx) => (
              <Reveal key={`${card.title}-${idx}`} delay={idx * 80}>
                <div className="group flex h-full flex-col overflow-hidden border border-stone bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-forest-green">
                    <EstateImage
                      slug={card.slug}
                      alt={card.title}
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                      className="isolate h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-heading text-sm font-medium text-ivory-white drop-shadow">
                        {card.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <p className="font-body text-[0.78rem] font-light leading-relaxed text-light-charcoal">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="At The Station"
            title={
              <>
                Everything For A
                <span className="block italic text-luxury-gold">Comfortable Visit</span>
              </>
            }
            lede="Relax, refresh, and explore our full range of guest amenities before and after your aerial journey."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="flex h-full flex-col items-center rounded-lg border border-stone bg-white p-7 text-center transition-all duration-500 hover:border-luxury-gold hover:shadow-lg">
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

      {/* CONTACT & CTA SECTION */}
      <section className="bg-emerald-950 px-6 py-24 text-ivory-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Left: Thrill Callout Banner */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <span className="lux-label text-muted-gold">The Aerial Escape</span>
              <h2 className="mt-4 font-heading text-4xl font-light italic leading-tight text-luxury-gold md:text-5xl">
                Experience The Thrill.
                <span className="block font-normal text-ivory-white">Embrace Nature.</span>
              </h2>
              <p className="mt-5 font-body text-sm font-light leading-relaxed text-ivory-white/80">
                Glide high above the estate and create unforgettable memories with your family and loved ones. Special slots available for early sunrise departures and sunset cruises.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/enquire" className="lux-btn-gold">
                  <span>Book Your Ride Today!</span>
                </Link>
                <a href="tel:+917588775757" className="lux-btn-light">
                  <span>Call Us For Inquiries</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Contact & Location Info */}
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

      {/* CLOSING TAGLINE STRIP */}
      <div className="border-t border-stone bg-warm-sand py-5">
        <p className="mx-auto flex max-w-editorial flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-center font-body text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-forest-green">
          <span>Closer to Nature, Closer to Yourself</span>
          <span className="text-luxury-gold">|</span>
          <span>Experience The Thrill</span>
          <span className="text-luxury-gold">|</span>
          <span>Embrace Nature</span>
          <span className="text-luxury-gold">|</span>
          <span>Book Your Ride Today!</span>
        </p>
      </div>
    </main>
  );
}
