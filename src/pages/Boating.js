import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCamera,
  FaUserFriends,
  FaShieldAlt,
  FaLeaf,
  FaHeart,
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
  FaWater,
  FaQrcode,
  FaRegClock,
} from 'react-icons/fa';
import { GiSpeedBoat, GiSailboat, GiWaterSplash, GiLifeJacket } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const HIGHLIGHTS = [
  {
    icon: FaCamera,
    title: 'Scenic Beauty',
    tagline: 'Pure Mountain & Water Vistas',
    body: 'Enjoy breathtaking views of mist-covered mountains, dense green forests, and clear blue water from the center of the lake.',
  },
  {
    icon: FaUserFriends,
    title: 'Family Fun',
    tagline: 'Joy For Every Age',
    body: 'A perfect activity for families, friends, couples, and kids to relax, laugh, and share an unforgettable time on the water.',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Secure',
    tagline: 'Safety First, Always',
    body: 'Well-maintained boats with certified life jackets, life rings, and trained rescue staff on standby at all times.',
  },
  {
    icon: FaLeaf,
    title: 'Close to Nature',
    tagline: 'Tranquil Natural Escape',
    body: 'Relax, unwind, and connect with the peaceful surroundings, fresh mountain breeze, and serene ripples of the lake.',
  },
  {
    icon: FaHeart,
    title: 'Memorable Experience',
    tagline: 'Unforgettable Moments',
    body: 'Create beautiful photographs and cherish lasting memories with your loved ones against stunning natural backdrops.',
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
    name: 'Paddle Boat',
    seats: '2 – 4 Seater',
    duration: '30 Minutes',
    price: '₹300/-',
    icon: FaShip,
    slug: 'boating',
    description: 'Pedal at your own leisurely pace with family or friends across the gentle calm waters.',
    badge: 'Popular for Families',
  },
  {
    name: 'Row Boat',
    seats: '2 – 3 Seater',
    duration: '30 Minutes',
    price: '₹250/-',
    icon: FaShip,
    slug: 'boating-2',
    description: 'Classic wooden rowing experience with lightweight oars for an authentic traditional cruise.',
    badge: 'Classic Experience',
  },
  {
    name: 'Kayak',
    seats: '1 – 2 Seater',
    duration: '30 Minutes',
    price: '₹250/-',
    icon: GiSailboat,
    slug: 'kayaking-2',
    description: 'Agile single and tandem kayaks for active adventurers who love paddling close to the water.',
    badge: 'Adventure Choice',
  },
  {
    name: 'Speed Boat',
    seats: '6 – 8 Seater',
    duration: '15 Minutes',
    price: '₹800/-',
    icon: GiSpeedBoat,
    slug: 'boating-3',
    description: 'High-speed motorboat thrills with sharp turns, wind in your hair, and splashing excitement.',
    badge: 'Thrilling Ride',
  },
  {
    name: 'Shikara Boat',
    seats: '4 – 6 Seater',
    duration: '30 Minutes',
    price: '₹500/-',
    icon: GiSailboat,
    slug: 'kayaking-3',
    description: 'Traditional Kashmiri-style canopied wooden boat with comfortable cushioned seating.',
    badge: 'Royal Serenity',
  },
  {
    name: 'Coracle Ride',
    seats: '2 – 3 Seater',
    duration: '20 Minutes',
    price: '₹200/-',
    icon: FaWater,
    slug: 'boating',
    description: 'Unique circular basket boat gently spun and guided by a local boatman across the lake.',
    badge: 'Unique Tradition',
  },
];

const GALLERY = [
  { slug: 'boating', caption: 'Serene Morning Swells' },
  { slug: 'boating-2', caption: 'Family Boating Adventure' },
  { slug: 'boating-3', caption: 'Panoramic Lake Horizon' },
  { slug: 'kayaking-2', caption: 'Pristine Mountain Waters' },
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
  return (
    <main className="bg-ivory-white text-dark-charcoal">
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="boating"
            alt="Families enjoying boating on Bambardara Lake"
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
              <span>Nature • Agriculture • Hospitality</span>
            </div>
          </Reveal>

          {/* Wooden Board Slogan Badge */}
          <Reveal delay={100}>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-lg border border-amber-600/40 bg-gradient-to-r from-amber-900/80 to-amber-950/80 px-4 py-2 text-amber-200 shadow-luxury-md backdrop-blur-sm">
              <GiWaterSplash className="h-4 w-4 text-luxury-gold" />
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-luxury-gold md:text-sm">
                Ride The Waves, Feel The Breeze, Live The Moment!
              </span>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-light leading-[1.05] tracking-tight text-ivory-white md:text-7xl">
              Bambardara <span className="italic text-luxury-gold">Boating</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 max-w-2xl font-heading text-2xl font-normal italic text-luxury-gold md:text-3xl">
              Sail Into Serenity, Create Beautiful Memories!
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-3 font-body text-[0.85rem] font-medium uppercase tracking-[0.25em] text-ivory-white/80">
              Experience Nature Like Never Before
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

      {/* PROMO TICKER BAR */}
      <section className="border-y border-stone bg-emerald-950 py-4 text-ivory-white">
        <div className="mx-auto flex max-w-editorial flex-wrap items-center justify-between gap-4 px-6 md:px-10">
          <p className="font-heading text-sm italic tracking-wide text-luxury-gold md:text-base">
            &ldquo;Come For The View, Stay For The Experience!&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ivory-white/80">
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <GiLifeJacket className="h-3.5 w-3.5 text-luxury-gold" /> Safe Boating
            </span>
            <span className="text-luxury-gold">•</span>
            <span className="inline-flex items-center gap-1.5 text-cyan-300">
              <FaWater className="h-3.5 w-3.5 text-luxury-gold" /> Clean Lake
            </span>
            <span className="text-luxury-gold">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <FaLeaf className="h-3.5 w-3.5 text-luxury-gold" /> Green Future
            </span>
          </div>
        </div>
      </section>

      {/* 5 BOATING HIGHLIGHTS */}
      <section className="px-6 py-20 md:px-10 md:py-28">
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

            {/* BONUS CARD: TIMINGS & BOOKING BADGE */}
            <Reveal delay={400}>
              <div className="flex h-full flex-col justify-between border border-luxury-gold/40 bg-gradient-to-br from-deep-forest to-emerald-950 p-8 text-ivory-white shadow-luxury-md">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/40 bg-ivory-white/10 px-3 py-1 font-body text-[0.65rem] uppercase tracking-wider text-luxury-gold">
                    <FaRegClock className="h-3 w-3" />
                    Daily Timings
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-light text-ivory-white">
                    8:00 AM – 6:00 PM
                  </h3>
                  <p className="mt-2 font-body text-xs font-light leading-relaxed text-ivory-white/80">
                    Open all 7 days of the week (weather permitting). Compulsory life jackets fitted for every passenger before departure.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-ivory-white/15">
                  <Link to="/enquire" className="lux-btn-gold w-full text-center">
                    <span>Book Your Ride Today</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OUR BOATING OPTIONS (6 VISUAL CARDS) */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Our Boating Fleet"
            title={
              <>
                Explore Our
                <span className="block italic text-luxury-gold">Boating Options</span>
              </>
            }
            lede="Choose from peaceful pedal and row boats, agile kayaks, high-speed motorboats, royal Kashmiri shikaras, or traditional coracle rides."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BOAT_OPTIONS.map((boat, idx) => (
              <Reveal key={boat.name} delay={idx * 90}>
                <div className="group flex h-full flex-col overflow-hidden border border-stone bg-white shadow-soft transition-all duration-500 hover:shadow-xl">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-forest-green">
                    <EstateImage
                      slug={boat.slug}
                      alt={boat.name}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="isolate h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-forest-green/90 px-3 py-1 font-body text-[0.65rem] font-semibold uppercase tracking-wider text-luxury-gold shadow backdrop-blur-sm">
                        {boat.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
                      <span className="font-heading text-xl font-light text-ivory-white drop-shadow">
                        {boat.name}
                      </span>
                      <span className="font-heading text-lg font-semibold text-luxury-gold drop-shadow">
                        {boat.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-forest-green">
                      <span className="inline-flex items-center gap-1.5 bg-warm-sand px-3 py-1 rounded">
                        <FaUsers className="h-3 w-3 text-luxury-gold" />
                        {boat.seats}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-warm-sand px-3 py-1 rounded">
                        <FaRegClock className="h-3 w-3 text-luxury-gold" />
                        {boat.duration}
                      </span>
                    </div>

                    <p className="mt-4 flex-1 font-body text-[0.88rem] font-light leading-relaxed text-light-charcoal">
                      {boat.description}
                    </p>

                    <div className="mt-6 border-t border-stone pt-4 flex items-center justify-between">
                      <span className="font-body text-xs font-light text-light-charcoal/70">
                        Life jacket included
                      </span>
                      <Link
                        to="/enquire"
                        className="font-body text-xs font-semibold uppercase tracking-wider text-forest-green transition-colors hover:text-luxury-gold"
                      >
                        Reserve Slot &rarr;
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
                          className={`transition-colors hover:bg-ivory-white/10 ${
                            i % 2 === 1 ? 'bg-ivory-white/[0.02]' : ''
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
      <section className="bg-emerald-950 px-6 py-24 text-ivory-white md:px-10 md:py-32">
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
                <Link to="/enquire" className="lux-btn-gold">
                  <span>Book Your Ride Today!</span>
                </Link>
                <a href="tel:+917588775757" className="lux-btn-light">
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
