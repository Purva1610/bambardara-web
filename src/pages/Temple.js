import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaClock,
  FaPrayingHands,
  FaPhoneAlt,
  FaOm,
  FaLeaf,
  FaUsers,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa';
import { GiTempleGate, GiLotus, GiCandleLight } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const TIMINGS = [
  { label: 'Temple Hours', value: '6:00 AM – 8:00 PM' },
  { label: 'Open', value: 'All Days' },
  { label: 'Special Pooja', value: 'Mon & Ekadashi' },
  { label: 'Parking', value: 'Ample Space' },
];

const CONTACT_INFO = [
  { label: 'Address', value: 'Parale, Shahuwadi, Kolhapur – 415101, MH' },
  { label: 'Email', value: 'info@bambarddara.com' },
  { label: 'Phone', value: '+91 7588775757' },
];

const FEATURED_STORIES = [
  {
    slug: 'diyas',
    title: 'Sacred Lamps',
    body: 'The story behind the rows of oil lamps lit each evening, and the family that has kept the flame going for two centuries.',
  },
  {
    slug: 'autumn-season',
    title: 'Autumn at the Temple',
    body: 'As the trees along the courtyard turn, the temple keeps its own slower season — a quieter time to visit, guests included.',
  },
];

const LATEST_POSTS = [
  { slug: 'bells', title: 'Morning Devotion', excerpt: 'What the first aarti of the day sounds like.' },
  { slug: 'village-blessing', title: 'Village Blessings', excerpt: 'How the temple marks a harvest, a birth, a wedding.' },
  { slug: 'temple', title: 'Harmony in Nature', excerpt: 'The courtyard trees older than the shrine itself.' },
];

const LABEL = 'font-body text-[0.65rem] uppercase tracking-wider text-luxury-gold';
const FIELD =
  'mt-3 w-full border border-stone bg-ivory-white px-4 py-3 font-body text-[0.85rem] ' +
  'font-light text-dark-charcoal placeholder:text-light-charcoal/50 transition-colors ' +
  'duration-500 focus:border-luxury-gold focus:outline-none';

const PRACTICES = [
  {
    icon: GiLotus,
    title: 'Guided Meditation',
    body: 'Structured sittings led by the estate’s resident guide, mornings and evenings, open to every guest.',
  },
  {
    icon: FaOm,
    title: 'Morning & Evening Aarti',
    body: 'The temple’s daily rhythm, unchanged for two centuries and open to any guest who wishes to attend.',
  },
  {
    icon: GiCandleLight,
    title: 'Open Darshan',
    body: 'No ticket, no itinerary — step in any time of day to sit, light a lamp, or simply be still.',
  },
];

const FEATURES = [
  {
    icon: FaOm,
    title: 'Divine Atmosphere',
    body: 'Feel the positive energy and spiritual vibrations that settle over the temple grounds.',
  },
  {
    icon: GiTempleGate,
    title: 'Beautiful Architecture',
    body: 'Traditional design with intricate carvings, built the way temples have always been built here.',
  },
  {
    icon: FaPrayingHands,
    title: 'Daily Aarti & Pooja',
    body: 'Morning and evening aarti, with special poojas and rituals through the week.',
  },
  {
    icon: GiLotus,
    title: 'Peace & Meditation',
    body: 'An ideal place for meditation, prayer and quiet self-realisation.',
  },
  {
    icon: FaUsers,
    title: 'Family Friendly',
    body: 'A safe, clean and divine environment welcoming guests of every age.',
  },
  {
    icon: FaLeaf,
    title: 'Nature Surroundings',
    body: 'Set amidst greenery, mountains and fresh air, away from the noise of the road.',
  },
];

const DEITIES = [
  { name: 'Shree Ganesha', slug: 'ganesha' },
  { name: 'Shree Mahadev', slug: 'mahadev' },
  { name: 'Shree Ram Darbar', slug: 'shriram' },
  { name: 'Goddess Durga', slug: 'durgamaa' },
  { name: 'Shree Vitthal', slug: 'vitthal-rukmini' },
  { name: 'Hanuman Ji', slug: 'hanumanji' },
];

const FACILITY_HIGHLIGHTS = [
  { slug: 'darshan', label: 'Grand Temple Complex' },
  { slug: 'aarti', label: 'Aarti & Pooja' },
  { slug: 'meditation', label: 'Meditation Area' },
  { slug: 'international-meditation-center', label: 'Well Maintained Gardens' },
  { slug: 'prasadam', label: 'Prasad & Gift Shop' },
  { slug: 'luxury-hotel-rooms-and-suites', label: 'Yatri Nivas / Rooms' },
];

const WHY_VISIT = [
  'Strengthens faith and positivity',
  'Brings peace and happiness',
  'Ideal for family and groups',
  'Spiritual growth and wellness',
  'An escape from daily stress',
];

const DEVOTEE_FACILITIES = [
  'Clean Premises',
  'Drinking Water',
  'Toilets',
  'Shoe Stand',
  'Seating Area',
  'Prasad Distribution',
  'Shade Area',
  'First Aid Available',
  'Senior Citizen Friendly',
];

const PERFECT_FOR = [
  'Family Outing',
  'School & College Trips',
  'Spiritual Retreats',
  'Group Visits',
  'Festivals & Celebrations',
];

function PracticeCard({ practice }) {
  const Icon = practice.icon;
  return (
    <div className="flex h-full flex-col items-center justify-center bg-ivory-white p-8 text-center">
      <Icon className="h-9 w-9 text-luxury-gold" aria-hidden="true" />
      <h3 className="mt-5 font-heading text-lg font-light text-forest-green">
        {practice.title}
      </h3>
      <p className="mt-3 font-body text-[0.82rem] font-light leading-relaxed text-light-charcoal">
        {practice.body}
      </p>
    </div>
  );
}

/* Plays immediately, muted, on a silent loop — no poster, no click needed.
   Autoplay only works unmuted-free when muted, so `muted` stays on; the
   sound toggle lets guests hear the aarti if they want to. */
function AartiVideo() {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative aspect-[21/9] w-full sm:aspect-[3/1]">
      <video
        src="/videos/arti.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
        aria-label="A morning aarti at the estate temple"
        className="h-full w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bronze/30 via-black/10 to-black/40" />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-ivory-white/95 text-forest-green shadow-luxury-lg transition-transform duration-500 hover:scale-110"
      >
        {muted ? <FaVolumeMute className="h-4 w-4" /> : <FaVolumeUp className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function Temple() {
  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 z-0">
          <EstateImage
            slug="temple-hero"
            alt="The Bambardara Hindu Temple"
            sizes="100vw"
            priority
            position="center"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/85" />
        <div className="relative z-20 mx-auto w-full max-w-editorial px-6 pb-20 text-center md:pb-28">
          <Reveal delay={100}>
            <h1 className="mt-5 font-heading text-[clamp(2.75rem,8vw,5.5rem)] font-light tracking-wide text-ivory-white">
              Temple
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 font-heading text-[1.1rem] italic font-light text-ivory-white md:text-[1.35rem]">
              A Sacred Journey, A Divine Experience
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body text-[0.7rem] uppercase tracking-[0.2em] text-ivory-white/80">
              <span>Spirituality</span>
              <span className="text-luxury-gold">•</span>
              <span>Peace</span>
              <span className="text-luxury-gold">•</span>
              <span>Positivity</span>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <Link to="/enquire" className="lux-btn-gold mt-9 inline-flex">
              <span>Plan Your Visit</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Older Than the Estate"
            title={
              <>
                Standing Here
                <span className="block italic text-luxury-gold">Long Before We Were</span>
              </>
            }
            lede="Every other structure on the estate was built around the temple, not the other way around. It keeps its own rhythm — morning aarti at first light, an open door through the day, and no ticket or itinerary attached to any of it."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Connect */}
            <Reveal>
              <div className="flex h-full flex-col bg-forest-green p-9">
                <GiTempleGate className="h-9 w-9 text-luxury-gold" aria-hidden="true" />
                <h3 className="mt-6 font-heading text-xl font-light text-ivory-white">
                  Connect With Us
                </h3>
                <p className="mt-4 flex-1 font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/70">
                  Reach out to plan your visit to the temple, ask about the
                  aarti timings, or fold it into a longer walk of the
                  estate's heritage trail.
                </p>
                <a
                  href="tel:+917588775757"
                  className="mt-6 inline-flex items-center gap-2.5 font-heading text-lg font-light text-luxury-gold"
                >
                  <FaPhoneAlt className="h-4 w-4" />
                  +91 75887 75757
                </a>
                <p className="mt-3 flex items-center gap-2.5 font-body text-[0.75rem] font-light text-ivory-white/60">
                  <FaMapMarkerAlt className="h-3.5 w-3.5 flex-shrink-0 text-luxury-gold" />
                  Bambardara, Maharashtra
                </p>
              </div>
            </Reveal>

            {/* Morning Aarti CTA */}
            <Reveal delay={100}>
              <div className="flex h-full flex-col bg-warm-sand p-9">
                <FaPrayingHands className="h-9 w-9 text-luxury-gold" aria-hidden="true" />
                <h3 className="mt-6 font-heading text-xl font-light text-forest-green">
                  Morning Aarti
                </h3>
                <p className="mt-4 flex-1 font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                  Have questions or need more information? We're here to help
                  — every guest is welcome to attend.
                </p>
                <Link to="/enquire" className="lux-btn-dark mt-6 inline-flex w-fit">
                  <span>Enquire Now</span>
                </Link>
              </div>
            </Reveal>

            {/* Timings */}
            <Reveal delay={200}>
              <div className="flex h-full flex-col bg-bronze p-9">
                <FaClock className="h-9 w-9 text-ivory-white" aria-hidden="true" />
                <h3 className="mt-6 font-heading text-xl font-light text-ivory-white">
                  Visitor Information
                </h3>
                <ul className="mt-6 flex-1 space-y-4 border-t border-ivory-white/25 pt-6">
                  {TIMINGS.map((t) => (
                    <li key={t.label} className="flex items-center justify-between gap-4">
                      <span className="font-body text-[0.8rem] font-light text-ivory-white/80">
                        {t.label}
                      </span>
                      <span className="font-body text-[0.8rem] font-medium text-ivory-white">
                        {t.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VISIT NOTES */}
      <div className="bg-warm-sand">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Photo mosaic */}
            <Reveal className="lg:col-span-6">
              <div className="grid h-[26rem] grid-cols-2 grid-rows-2 gap-4 sm:h-[30rem]">
                <div className="lux-frame row-span-2 w-full">
                  <EstateImage
                    slug="sacred-rituals"
                    alt="An aerial view of the temple complex"
                    sizes="(min-width: 1024px) 24vw, 50vw"
                  />
                </div>
                <div className="lux-frame w-full">
                  <EstateImage
                    slug="temple"
                    alt="The temple's tiered roofline"
                    sizes="(min-width: 1024px) 24vw, 50vw"
                  />
                </div>
                <div className="lux-frame w-full">
                  <EstateImage
                    slug="devotion"
                    alt="A quiet moment at the meditation centre"
                    sizes="(min-width: 1024px) 24vw, 50vw"
                  />
                </div>
              </div>
            </Reveal>

            {/* Content */}
            <div className="lg:col-span-6">
              <SectionHeading
                label="For Guests"
                title={
                  <>
                    A Place for Quiet
                    <span className="block italic text-luxury-gold">Reflection and Renewal</span>
                  </>
                }
                lede="This isn't a stop on a tour — it's a working shrine, run on its own rhythm, that guests are invited into rather than shown around. Come for the morning aarti, or simply sit a while in the quiet between."
              />

              <div className="mt-10 space-y-8">
                {FEATURES.map((f) => (
                  <Reveal key={f.title}>
                    <div className="flex items-start gap-5">
                      <f.icon className="mt-1 h-7 w-7 flex-shrink-0 text-luxury-gold" aria-hidden="true" />
                      <div>
                        <h3 className="font-heading text-lg font-light text-forest-green">
                          {f.title}
                        </h3>
                        <p className="mt-1.5 font-body text-[0.85rem] font-light leading-relaxed text-light-charcoal">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={150}>
                <Link
                  to="/enquire"
                  className="mt-10 inline-flex w-fit items-center rounded-sm bg-bronze px-8 py-3.5 font-body text-[0.7rem] uppercase tracking-wider text-ivory-white transition-colors duration-500 hover:bg-copper"
                >
                  Plan Your Visit
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY MOSAIC */}
      <section className="bg-ivory-white">
        <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2">
          {/* Text panel */}
          <Reveal className="flex flex-col justify-center bg-warm-sand px-8 py-14 sm:col-span-2 md:px-12">
            <h2 className="font-heading text-[1.85rem] font-light leading-tight text-forest-green md:text-[2.25rem]">
              Spiritual
              <span className="block italic text-luxury-gold">Growth</span>
            </h2>
            <p className="mt-4 max-w-xs font-body text-[0.85rem] font-light leading-relaxed text-light-charcoal">
              A quiet corner of the estate, set aside so guests can settle
              into the rhythm of your stay.
            </p>
            <Link
              to="/enquire"
              className="mt-8 inline-flex w-fit items-center rounded-sm bg-bronze px-7 py-3 font-body text-[0.65rem] uppercase tracking-wider text-ivory-white transition-colors duration-500 hover:bg-copper"
            >
              Plan Your Visit
            </Link>
          </Reveal>

          {/* Arch photo — two figures */}
          <Reveal
            delay={80}
            className="flex items-end justify-center bg-bronze p-6 sm:col-start-3 sm:row-start-1"
          >
            <div className="aspect-[3/4] w-2/3 overflow-hidden rounded-t-[999px]">
              <EstateImage
                slug="kalash"
                alt="The temple's carved gopuram against a clear sky"
                sizes="20vw"
                position="top"
              />
            </div>
          </Reveal>

          {/* Tall photo, full height */}
          <Reveal
            delay={140}
            className="bg-dark-charcoal sm:col-start-4 sm:row-span-2"
          >
            <div className="h-full min-h-[16rem] w-full">
              <EstateImage
                slug="hawan"
                alt="Folk musicians performing at a temple festival"
                sizes="(min-width: 640px) 25vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Plain photo */}
          <Reveal delay={200} className="sm:col-start-1 sm:row-start-2">
            <div className="h-full min-h-[14rem] w-full">
              <EstateImage
                slug="prasadam"
                alt="Prasadam offered at the temple"
                sizes="(min-width: 640px) 25vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Arch photo — statue */}
          <Reveal
            delay={260}
            className="flex items-end justify-center bg-forest-green p-6 sm:col-start-2 sm:row-start-2"
          >
            <div className="aspect-[3/4] w-2/3 overflow-hidden rounded-t-[999px]">
              <EstateImage
                slug="interior"
                alt="Inside the meditation centre"
                sizes="20vw"
              />
            </div>
          </Reveal>

          {/* Plain photo */}
          <Reveal delay={320} className="sm:col-start-3 sm:row-start-2">
            <div className="h-full min-h-[14rem] w-full">
              <EstateImage
                slug="temple-interior"
                alt="The temple's carved entrance, lit at dusk"
                sizes="(min-width: 640px) 25vw, 100vw"
                className="h-full w-full object-cover"
                position="bottom"
              />
            </div>
          </Reveal>
        </div>

      </section>

      {/* PRACTICES */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Ways to Engage"
            title={
              <>
                Mindfulness
                <span className="block italic text-luxury-gold">and Compassion</span>
              </>
            }
            lede="Explore the estate's quieter traditions through a small collection of daily rituals and guided moments. Immerse yourself in the rhythm of a temple that has kept its calm for two centuries."
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
            <div className="lux-frame aspect-square w-full sm:col-start-1 sm:row-start-1">
              <EstateImage
                slug="meditation"
                alt="An aerial view of the temple complex"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </div>
            <div className="h-full sm:col-start-2 sm:row-start-1">
              <PracticeCard practice={PRACTICES[0]} />
            </div>
            <div className="lux-frame aspect-square w-full sm:col-start-3 sm:row-start-1">
              <EstateImage
                slug="darshan"
                alt="Incense offerings inside the temple hall"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </div>

            <div className="h-full sm:col-start-1 sm:row-start-2">
              <PracticeCard practice={PRACTICES[1]} />
            </div>
            <div className="lux-frame aspect-square w-full sm:col-start-2 sm:row-start-2">
              <EstateImage
                slug="aarti"
                alt="A guided sitting at the meditation centre"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </div>
            <div className="h-full sm:col-start-3 sm:row-start-2">
              <PracticeCard practice={PRACTICES[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN DEITIES */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial text-center">
          <SectionHeading
            label="Worshipped Here"
            title={
              <>
                Main
                <span className="block italic text-luxury-gold">Deities</span>
              </>
            }
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {DEITIES.map((d, i) => (
              <Reveal key={d.name} delay={i * 80} className="flex flex-col items-center">
                <div
                  className={`flex aspect-[3/4] w-full items-end justify-center p-3 ${
                    i % 2 === 0 ? 'bg-bronze' : 'bg-warm-sand'
                  }`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-t-[999px]">
                    <EstateImage slug={d.slug} alt={d.name} sizes="(min-width: 1024px) 15vw, 30vw" />
                  </div>
                </div>
                <span className="mt-4 font-heading text-[0.85rem] font-light text-forest-green">
                  {d.name}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY HIGHLIGHTS */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="On the Grounds"
            title={
              <>
                Everything You'll
                <span className="block italic text-luxury-gold">Find Here</span>
              </>
            }
            align="center"
            className="mb-16 md:mb-20"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {FACILITY_HIGHLIGHTS.map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="border border-luxury-gold/50 p-1.5">
                  <div className="lux-frame aspect-[3/4] w-full">
                    <EstateImage
                      slug={f.slug}
                      alt={f.label}
                      sizes="(min-width: 1024px) 15vw, 30vw"
                    />
                  </div>
                  <div className="bg-forest-green py-2.5 text-center">
                    <span className="font-body text-[0.6rem] font-medium uppercase tracking-wider text-ivory-white">
                      {f.label}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VISIT / FACILITIES / PERFECT FOR */}
      <div className="bg-warm-sand">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Plan Your Visit"
            title={
              <>
                Why Guests
                <span className="block italic text-luxury-gold">Come Here</span>
              </>
            }
            align="center"
            className="mb-16 md:mb-20"
          />

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 sm:divide-x sm:divide-stone">
            {/* Why Visit */}
            <div>
              <span className="lux-label">Why Visit?</span>
              <ul className="mt-6 space-y-4">
                {WHY_VISIT.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-luxury-gold" aria-hidden="true" />
                    <span className="font-body text-[0.9rem] font-light text-light-charcoal">{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perfect For */}
            <div className="sm:pl-10">
              <span className="lux-label">Perfect For</span>
              <ul className="mt-6 space-y-4">
                {PERFECT_FOR.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <FaUsers className="mt-1 h-4 w-4 flex-shrink-0 text-luxury-gold" aria-hidden="true" />
                    <span className="font-body text-[0.9rem] font-light text-light-charcoal">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FACILITIES FOR DEVOTEES */}
      <section className="bg-ivory-white px-6 py-24 text-center md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            label="On the Grounds"
            title={
              <>
                Facilities for
                <span className="block italic text-luxury-gold">Devotees</span>
              </>
            }
            align="center"
            className="mb-14"
          />
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {DEVOTEE_FACILITIES.map((f) => (
              <span
                key={f}
                className="rounded-full border border-stone bg-warm-sand px-4 py-1.5 font-body text-[0.7rem] uppercase tracking-wider text-forest-green"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* REACH OUT */}
      <section className="bg-ivory-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Reveal className="min-h-[22rem]">
            <div className="h-full w-full">
              <EstateImage
                slug="trishul"
                alt="A trishul at the estate temple"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="flex items-center bg-ivory-white px-6 py-16 md:px-14 md:py-20">
            <ReachOutForm />
          </Reveal>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="relative overflow-hidden bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full border border-dashed border-luxury-gold/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-52 w-52 -translate-x-1/2 rotate-45 border border-luxury-gold/15"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-prose text-center">
          <SectionHeading
            label="From the Temple"
            title={
              <>
                Stories and
                <span className="block italic text-luxury-gold">Reflections</span>
              </>
            }
            lede="A small journal of the rituals, seasons and quiet moments that shape life around the temple — written by the estate's naturalists and the family who keeps it."
            align="center"
          />
          <Reveal delay={150}>
            <Link to="/cultural-experience" className="lux-btn-dark mt-8 inline-flex">
              <span>Explore</span>
            </Link>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-editorial grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Featured articles */}
          <div className="space-y-14 lg:col-span-2">
            {FEATURED_STORIES.map((a, idx) => (
              <Reveal key={a.title} delay={idx * 100}>
                <article>
                  <div className="lux-frame aspect-[16/10] w-full">
                    <EstateImage
                      slug={a.slug}
                      alt={a.title}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                    />
                  </div>
                  <h3 className="mt-6 text-center font-heading text-xl font-light text-forest-green">
                    {a.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-center font-body text-[0.85rem] font-light leading-relaxed text-light-charcoal">
                    {a.body}
                  </p>
                  <div className="mt-3 text-center">
                    <Link to="/cultural-experience" className="lux-link text-luxury-gold">
                      Read More
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Sidebar */}
          <div>
            <span className="lux-label">Latest Posts</span>
            <div className="mt-6 space-y-6 border-t border-stone/60 pt-6">
              {LATEST_POSTS.map((p) => (
                <div key={p.title} className="flex items-center gap-4">
                  <div className="lux-frame h-16 w-16 flex-shrink-0">
                    <EstateImage slug={p.slug} alt={p.title} sizes="64px" />
                  </div>
                  <div>
                    <h5 className="font-heading text-sm font-light text-forest-green">
                      {p.title}
                    </h5>
                    <p className="mt-1 font-body text-[0.72rem] font-light leading-snug text-light-charcoal">
                      {p.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-forest-green p-7 text-center">
              <h5 className="font-heading text-lg font-light text-ivory-white">
                Visit Our Sanctuary
              </h5>
              <p className="mt-2 font-body text-[0.75rem] font-light leading-relaxed text-ivory-white/70">
                Plan your visit and experience the temple's calm for yourself.
              </p>
              <Link
                to="/enquire"
                className="mt-4 inline-block font-body text-[0.7rem] uppercase tracking-wider text-luxury-gold"
              >
                Enquire →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO BANNER */}
      <section className="relative overflow-hidden bg-deep-forest">
        <AartiVideo />
      </section>

      <div className="border-t border-stone bg-warm-sand px-6 py-16 text-center">
        <p className="mx-auto max-w-md font-heading text-[1.15rem] font-light italic leading-relaxed text-forest-green">
          “Where there is faith, there is peace.
          <span className="block">Where there is peace, there is God.”</span>
        </p>
      </div>

      <div className="border-t border-stone bg-ivory-white py-10 text-center">
        <Link to="/cultural-experience" className="lux-link text-forest-green">
          Back to Cultural Experience
        </Link>
      </div>
    </main>
  );
}

function ReachOutForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="font-heading text-[1.85rem] font-light leading-tight text-forest-green md:text-[2.15rem]">
        Reach Out
        <span className="italic text-luxury-gold"> and Connect</span>
      </h2>
      <p className="mt-3 font-body text-[0.85rem] font-light text-light-charcoal">
        Questions about visiting the temple? We're here to help.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 border-y border-stone py-6">
        {CONTACT_INFO.map((c) => (
          <div key={c.label}>
            <span className={LABEL}>{c.label}</span>
            <p className="mt-2 font-body text-[0.7rem] font-light leading-snug text-light-charcoal">
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {submitted ? (
        <p className="mt-8 font-body text-[0.9rem] font-light text-forest-green">
          Thank you — the estate will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL} htmlFor="reach-name">Name</label>
              <input id="reach-name" type="text" required className={FIELD} placeholder="Your name" />
            </div>
            <div>
              <label className={LABEL} htmlFor="reach-email">Email</label>
              <input id="reach-email" type="email" required className={FIELD} placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <label className={LABEL} htmlFor="reach-message">Message</label>
            <textarea
              id="reach-message"
              required
              rows={4}
              className={`${FIELD} resize-none`}
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-bronze py-4 font-body text-[0.7rem] uppercase tracking-wider text-ivory-white transition-colors duration-500 hover:bg-copper"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
