import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaOm,
  FaSun,
  FaMoon,
  FaDoorOpen,
  FaChevronRight,
  FaChevronLeft,
  FaLeaf,
  FaGlobe,
  FaUsers,
  FaBed,
  FaMountain,
  FaBriefcase,
  FaChalkboardTeacher,
  FaHeartbeat,
  FaBrain,
  FaBalanceScale,
  FaDumbbell,
  FaSeedling,
  FaBolt,
  FaQuoteLeft,
} from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const LABEL = 'font-body text-[0.65rem] uppercase tracking-wider text-luxury-gold';
const FIELD =
  'mt-3 w-full border border-stone bg-ivory-white px-4 py-3 font-body text-[0.85rem] ' +
  'font-light text-dark-charcoal placeholder:text-light-charcoal/50 transition-colors ' +
  'duration-500 focus:border-luxury-gold focus:outline-none';

const RETREAT_POINTS = [
  { icon: FaOm, title: 'Inner Peace & Mental Clarity', body: 'Reduce stress, calm your mind, and discover inner harmony.' },
  { icon: FaLeaf, title: 'Holistic Well-Being', body: 'Yoga, meditation, pranayama, and holistic healing therapies.' },
  { icon: FaGlobe, title: 'International Programs', body: 'Programs designed by global spiritual experts and gurus.' },
  { icon: FaMountain, title: 'Natural & Serene Environment', body: 'Surrounded by mountains, forests, and pure open air.' },
  { icon: FaUsers, title: 'For Everyone', body: 'Individuals, families, groups & corporate wellness programs.' },
  { icon: FaBed, title: 'Comfortable Stay', body: 'Luxury rooms, satvik food, and green living.' },
];

const HIGHLIGHTS = [
  { slug: 'international-meditation-center', label: 'Spacious Meditation Halls' },
  { slug: 'waterfalls-and-nature-trails-2', label: 'Peaceful Nature Trails' },
  { slug: 'meditation', label: 'Yoga & Pranayama Sessions' },
  { slug: 'spa', label: 'Ayurvedic Therapies' },
  { slug: 'fine-dining-restaurant', label: 'Satvik Vegetarian Cuisine' },
  { slug: 'luxury-hotel-rooms-and-suites', label: 'Premium Accommodation' },
];

const PROGRAMS = [
  { icon: FaOm, label: 'Meditation Retreats' },
  { icon: FaLeaf, label: 'Yoga & Wellness Programs' },
  { icon: FaDoorOpen, label: 'Silence & Vipassana Retreats' },
  { icon: FaChalkboardTeacher, label: 'Spiritual Workshops' },
  { icon: FaBriefcase, label: 'Corporate Wellness' },
  { icon: FaGlobe, label: 'International Spiritual Events' },
];

const BENEFITS = [
  { icon: FaHeartbeat, label: 'Stress Relief' },
  { icon: FaBrain, label: 'Better Focus' },
  { icon: FaBalanceScale, label: 'Emotional Balance' },
  { icon: FaDumbbell, label: 'Physical Wellness' },
  { icon: FaSeedling, label: 'Spiritual Growth' },
  { icon: FaBolt, label: 'Positive Energy' },
];

const IDEAL_FOR = [
  'Personal Growth',
  'Family Wellness',
  'Corporate Retreats',
  'Spiritual Seekers',
  'Health & Healing',
];

const COMPASSION_POINTS = [
  'Dawn & Dusk Guided Sittings',
  'Silent Hall Access All Day',
  'No Experience Needed',
  'Guided by Estate Naturalists',
  'Add It to Your Cultural Itinerary',
];

function StayInTouchForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative border border-stone bg-white p-8 shadow-xl">
      <span className={LABEL}>Get In Touch</span>
      <h3 className="mt-2 font-heading text-xl font-light text-forest-green">
        Let's Stay in Touch
      </h3>
      <p className="mt-3 font-body text-[0.8rem] font-light leading-relaxed text-light-charcoal">
        Ask about sitting times or add a session to your stay — a cultural
        specialist will follow up.
      </p>

      {submitted ? (
        <p className="mt-8 font-body text-[0.9rem] font-light text-forest-green">
          Thank you — the estate will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL} htmlFor="med-name">Name</label>
              <input id="med-name" type="text" required className={FIELD} placeholder="Your name" />
            </div>
            <div>
              <label className={LABEL} htmlFor="med-email">Email</label>
              <input id="med-email" type="email" required className={FIELD} placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <label className={LABEL} htmlFor="med-phone">Phone</label>
            <input id="med-phone" type="tel" className={FIELD} placeholder="+91" />
          </div>
          <div className="mt-4">
            <label className={LABEL} htmlFor="med-message">Message</label>
            <textarea
              id="med-message"
              required
              rows={4}
              className={`${FIELD} resize-none`}
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-copper py-4 font-body text-[0.7rem] uppercase tracking-wider text-ivory-white transition-colors duration-500 hover:bg-bronze"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

const SITTINGS = [
  {
    icon: FaSun,
    title: 'Dawn Sitting',
    body: 'A guided session as the first light reaches the dome — the quietest hour anywhere on the estate.',
  },
  {
    icon: FaMoon,
    title: 'Dusk Sitting',
    body: 'A second guided session as the day winds down, before dinner and the evening’s bonfire.',
  },
  {
    icon: FaDoorOpen,
    title: 'Silent Access All Day',
    body: 'The hall stays open between sittings for anyone who wants a quiet half hour on their own.',
  },
  {
    icon: FaOm,
    title: 'No Experience Needed',
    body: 'Sessions are framed for first-timers as easily as for a guest with a regular practice.',
  },
];

export default function MeditationCenter() {
  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-ivory-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-xs font-body text-[0.9rem] font-light leading-[1.8] text-light-charcoal">
                Welcome to the International Meditation Centre at Bambardara
                Estate — a quiet retreat for guided sittings, stillness, and a
                hall that's open whenever you need it.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-copper text-ivory-white transition-colors hover:bg-bronze"
                >
                  <FaChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-copper text-ivory-white transition-colors hover:bg-bronze"
                >
                  <FaChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <span className="mt-10 block h-px w-32 bg-copper" />
            </Reveal>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-8">
            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute h-[115%] w-[115%] text-forest-green/30"
              aria-hidden="true"
            >
              <circle
                cx="50" cy="50" r="46"
                fill="none" stroke="currentColor" strokeWidth="0.6"
                strokeDasharray="135 145"
                strokeDashoffset="-10"
              />
              <circle
                cx="50" cy="50" r="40"
                fill="none" stroke="#B87333" strokeWidth="0.6"
                strokeDasharray="110 170"
                strokeDashoffset="30"
                opacity="0.6"
              />
            </svg>
            <div className="lux-frame relative aspect-square w-full max-w-[560px] overflow-hidden rounded-full border-[6px] border-ivory-white shadow-xl">
              <EstateImage
                slug="cultivate-wisdom"
                alt="A guided group meditation ceremony at the estate"
                sizes="(min-width: 1024px) 45vw, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="border-b border-t border-stone bg-ivory-white px-6 py-10 md:px-10">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex items-center gap-4 lg:col-span-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-luxury-gold">
              <EstateImage
                slug="serenity"
                alt="Guests in a guided group meditation ceremony"
                sizes="64px"
                className="h-full w-full"
              />
            </div>
            <p className="font-body text-[0.7rem] uppercase tracking-wide text-light-charcoal/60">
              Guided
              <br />
              Practice, Daily
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-heading text-xl font-light leading-snug text-forest-green">
              Find Harmony Within,
              <br />
              <span className="inline-flex items-center gap-2 italic text-luxury-gold">
                Peace Without
                <FaOm className="h-4 w-4" aria-hidden="true" />
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-5">
            <p className="font-body text-[0.8rem] font-light leading-[1.7] text-light-charcoal">
              A single guided sitting is often all it takes — the hall stays
              open to guests all day for a quiet half hour on their own.
            </p>
            <Link
              to="/enquire"
              className="shrink-0 rounded bg-copper px-6 py-3 text-center font-body text-[0.65rem] font-semibold uppercase tracking-wider text-ivory-white"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              label="The Quietest Corner"
              title={
                <>
                  Discover Serenity
                  <span className="block italic text-luxury-gold">&amp; Wisdom</span>
                </>
              }
              lede="Set apart from the villas and the farm on purpose, the centre was built around silence rather than views. Guests arrive for a single guided sitting and often find themselves back the next morning without having planned to."
            />
            <Reveal delay={260}>
              <Link to="/enquire" className="lux-btn-dark mt-8 inline-flex">
                <span>Book a Session</span>
              </Link>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <Reveal>
              <div className="lux-frame aspect-[4/5] w-full">
                <EstateImage
                  slug="wisdom"
                  alt="The domed meditation hall at dawn"
                  sizes="(min-width: 1024px) 35vw, 90vw"
                />
              </div>
            </Reveal>

            <Reveal delay={140} className="absolute -bottom-8 -left-6 w-64 max-w-[80%] sm:-left-10">
              <div className="border border-stone bg-white p-5 shadow-xl">
                <p className="lux-label">Today's Sittings</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 font-body text-[0.75rem] text-light-charcoal">
                    <FaSun className="h-3.5 w-3.5 text-luxury-gold" aria-hidden="true" />
                    Dawn Sitting
                  </div>
                  <div className="flex items-center gap-2 font-body text-[0.75rem] text-light-charcoal">
                    <FaMoon className="h-3.5 w-3.5 text-luxury-gold" aria-hidden="true" />
                    Dusk Sitting
                  </div>
                  <div className="flex items-center gap-2 font-body text-[0.75rem] text-light-charcoal">
                    <FaDoorOpen className="h-3.5 w-3.5 text-luxury-gold" aria-hidden="true" />
                    Silent Hall, All Day
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex flex-col items-start gap-4 border border-stone bg-white p-6">
                <FaOm className="h-8 w-8 text-copper" aria-hidden="true" />
                <p className="font-body text-[0.7rem] uppercase tracking-wide text-light-charcoal/60">
                  Daily
                  <br />
                  Guided Practice
                </p>
                <div className="lux-frame aspect-[3/4] w-full">
                  <EstateImage
                    slug="meditation"
                    alt="A guest in silent meditation at the estate"
                    sizes="128px"
                    position="top"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CENTERED STATEMENT */}
      <section className="relative overflow-hidden bg-ivory-white px-6 py-20 text-center md:px-10 md:py-28">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[18vw] font-bold uppercase leading-none text-forest-green/[0.04]"
        >
          Serenity Serenity
        </p>
        <div className="relative mx-auto max-w-xl">
          <Reveal>
            <div className="mx-auto h-24 w-20 overflow-hidden rounded-t-full border-2 border-copper/40">
              <EstateImage
                slug="meditation"
                alt="A guest in silent meditation at the estate"
                sizes="80px"
                position="top"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 font-heading text-[clamp(1.15rem,2.6vw,1.5rem)] font-light italic leading-snug text-forest-green">
              Discover the path to inner harmony and enlightenment, and
              embrace tranquility.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CULTIVATE WISDOM */}
      <section className="relative flex h-screen flex-col justify-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0">
          <EstateImage
            slug="cultivate-wisdom"
            alt="The domed meditation hall"
            sizes="100vw"
            position="center 35%"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-deep-forest/60" />
        <div className="relative z-10 flex flex-1 items-center justify-center px-6">
          <Reveal>
            <h2 className="font-heading text-[clamp(2rem,6vw,3.5rem)] uppercase tracking-[0.15em] text-ivory-white">
              Cultivate <span className="italic text-muted-gold">Wisdom</span>
            </h2>
          </Reveal>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-2 bg-copper px-6 py-4 text-center sm:grid-cols-4 md:px-10">
          {['Stillness', 'Breath', 'Silence', 'Clarity'].map((word) => (
            <span
              key={word}
              className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-ivory-white/90"
            >
              {word}
            </span>
          ))}
        </div>
      </section>

      {/* RADIATE COMPASSION */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <StayInTouchForm />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-tight text-forest-green">
                Radiate Compassion
                <span className="block italic text-luxury-gold">at Our Meditation Centre</span>
              </h2>
            </Reveal>
            <div className="mt-8 divide-y divide-stone border-y border-stone">
              {COMPASSION_POINTS.map((point, idx) => (
                <Reveal key={point} delay={idx * 60}>
                  <div className="flex items-center justify-between py-4">
                    <span className="font-body text-[0.9rem] font-light text-light-charcoal">
                      {point}
                    </span>
                    <FaChevronRight className="h-3 w-3 shrink-0 text-luxury-gold" aria-hidden="true" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MINDFULNESS */}
      <section className="bg-ivory-white pt-16 md:pt-20">
        <Reveal>
          <h2 className="text-center font-heading text-[clamp(2rem,5vw,3rem)] font-light text-dark-charcoal">
            Mindfulness
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]">
            <EstateImage
              slug="sadhu"
              alt="A guest practising mindful meditation at the estate"
              sizes="100vw"
              className="h-full w-full"
            />
            <div className="absolute inset-0 z-10 bg-deep-forest/30" />
            <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
              <span className="font-heading text-[clamp(4rem,11vw,9rem)] font-light tracking-wide text-ivory-white">
                4 Noble Truths
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* REFLECTION */}
      <section className="bg-ivory-white pt-4 md:pt-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]">
          <EstateImage
            slug="dhyan"
            alt="A guest in quiet reflection at the estate"
            position="top"
            sizes="100vw"
            className="h-full w-full"
          />
          <div className="absolute inset-0 z-10 bg-deep-forest/30" />
          <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
            <span className="font-heading text-[clamp(4rem,11vw,9rem)] font-light tracking-wide text-ivory-white">
              Marks of Existence
            </span>
          </div>
        </div>
      </section>

      {/* THE QUIET PATH */}
      <section className="bg-ivory-white pt-4 pb-16 md:pb-20">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]">
          <EstateImage
            slug="yoga-wellness"
            alt="The domed meditation hall"
            position="bottom"
            sizes="100vw"
            className="h-full w-full"
          />
          <div className="absolute inset-0 z-10 bg-deep-forest/30" />
          <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
            <span className="font-heading text-[clamp(4rem,11vw,9rem)] font-light tracking-wide text-ivory-white">
              Noble Path
            </span>
          </div>
        </div>
      </section>

      {/* JOURNEY STATS + PATH */}
      <section className="bg-ivory-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-3">
            <span className={LABEL}>Guided Practice</span>
            <div className="mt-6 space-y-6">
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-4xl font-light text-forest-green">Daily</span>
                <span className="font-body text-[0.8rem] font-light text-light-charcoal">
                  Guided Sittings, Dawn &amp; Dusk
                </span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-4xl font-light text-forest-green">Open</span>
                <span className="font-body text-[0.8rem] font-light text-light-charcoal">
                  Silent Hall Access, All Day
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="font-heading text-2xl font-light leading-snug text-forest-green">
              Awaken Your Spirit,
              <span className="block italic text-luxury-gold">Reconnect Your Breath</span>
            </h3>
            <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
              Discover serenity in the heart of the estate. Embark on a
              journey of self-discovery, compassion, and stillness at our
              tranquil meditation centre — no experience required.
            </p>
            <Link to="/enquire" className="lux-btn-dark mt-6 inline-flex">
              <span>Book a Session</span>
            </Link>
          </div>

          <div className="lg:col-span-3">
            <div className="lux-frame aspect-[3/4] w-full">
              <EstateImage
                slug="meditation"
                alt="A guest in silent meditation at the estate"
                sizes="(min-width: 1024px) 20vw, 80vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOW SEEDS OF COMPASSION */}
      <section>
        <div className="grid grid-cols-1 gap-0 bg-deep-forest px-6 py-10 md:grid-cols-2 md:px-10">
          <h2 className="font-heading text-2xl font-light leading-tight text-ivory-white">
            Sow Seeds of
            <span className="block italic">Compassion in Our Centre</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 md:mt-0">
            {[
              ['Sittings', 'Dawn & Dusk'],
              ['Access', 'All Day'],
              ['Group Size', 'Any'],
              ['Booking', 'Via Enquiry'],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-body text-[0.6rem] uppercase tracking-wide text-ivory-white/60">
                  {label}
                </p>
                <p className="font-body text-[0.8rem] text-ivory-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="aspect-square w-full md:w-1/2">
            <EstateImage
              slug="meditation-center-hall"
              alt="The domed meditation hall"
              sizes="50vw"
              className="h-full w-full"
            />
          </div>
          <div className="aspect-square w-full md:w-1/2">
            <EstateImage
              slug="meditation-spiritual"
              alt="A guest in silent meditation at the estate"
              sizes="50vw"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 bg-ivory-white px-6 py-12 text-center sm:grid-cols-3 md:px-10">
          {[
            { icon: FaSun, label: 'Dawn Sitting' },
            { icon: FaMoon, label: 'Dusk Sitting' },
            { icon: FaDoorOpen, label: 'Silent Access' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <item.icon className="h-7 w-7 text-copper" aria-hidden="true" />
              <span className="font-body text-[0.7rem] uppercase tracking-wide text-light-charcoal">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY OF INSIGHT */}
      <section className="bg-warm-sand px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-snug text-forest-green">
                Journey of Insight,
                <span className="block italic text-luxury-gold">Exploring Wisdom</span>
              </h2>
              <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                Every guided sitting is a small step back toward stillness —
                no destination to reach, just an hour set aside for it.
              </p>
              <Link to="/enquire" className="lux-btn-dark mt-6 inline-flex">
                <span>Book a Session</span>
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="lux-frame aspect-[4/3] w-full">
                <EstateImage
                  slug="find-wisdom"
                  alt="The domed meditation hall"
                  sizes="(min-width: 1024px) 35vw, 90vw"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4 border-t border-stone pt-6">
              <FaSun className="h-7 w-7 shrink-0 text-luxury-gold" aria-hidden="true" />
              <div>
                <p className="font-heading text-base text-forest-green">Dawn &amp; Dusk</p>
                <p className="mt-1 font-body text-[0.75rem] font-light text-light-charcoal">
                  Guided sittings, twice daily
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-t border-stone pt-6">
              <FaDoorOpen className="h-7 w-7 shrink-0 text-luxury-gold" aria-hidden="true" />
              <div>
                <p className="font-heading text-base text-forest-green">Open All Day</p>
                <p className="mt-1 font-body text-[0.75rem] font-light text-light-charcoal">
                  Silent hall access whenever you need it
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SITTINGS */}
      <div className="bg-deep-forest">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="For Guests"
            title={
              <>
                A Day
                <span className="block italic text-muted-gold">at the Centre</span>
              </>
            }
            align="center"
            tone="light"
            className="mb-16 md:mb-20"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SITTINGS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 80}>
                <div className="flex h-full flex-col border border-ivory-white/15 bg-forest-green/40 p-7">
                  <item.icon className="h-8 w-8 text-luxury-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-base font-light text-ivory-white">
                    {item.title}
                  </h3>
                  <span className="mt-3 block h-px w-10 bg-luxury-gold/60" />
                  <p className="mt-4 font-body text-[0.8rem] font-light leading-[1.75] text-ivory-white/70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* A WORLD-CLASS SPIRITUAL RETREAT */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Bambardara International Meditation Centre"
            title="A World-Class Spiritual Retreat"
            align="center"
            className="mb-16 md:mb-20"
          />
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {RETREAT_POINTS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 60}>
                <div className="flex gap-4">
                  <item.icon className="mt-1 h-6 w-6 shrink-0 text-copper" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-base font-semibold text-forest-green">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-body text-[0.8rem] font-light leading-[1.6] text-light-charcoal">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR HIGHLIGHTS */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading label="What to Expect" title="Our Highlights" align="center" className="mb-16 md:mb-20" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((item, idx) => (
              <Reveal key={item.slug + item.label} delay={idx * 60}>
                <div className="lux-frame aspect-square w-full">
                  <EstateImage
                    slug={item.slug}
                    alt={item.label}
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
                <p className="mt-3 text-center font-body text-[0.75rem] font-semibold uppercase tracking-wide text-forest-green">
                  {item.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROGRAMS */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <SectionHeading label="Choose Your Path" title="Our Programs" align="center" className="mb-16 md:mb-20" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {PROGRAMS.map((item, idx) => (
              <Reveal key={item.label} delay={idx * 60}>
                <div className="flex h-full flex-col items-center gap-3 border border-stone bg-white px-5 py-8 text-center transition-shadow duration-500 hover:shadow-lg">
                  <item.icon className="h-8 w-8 text-copper" aria-hidden="true" />
                  <span className="font-body text-[0.8rem] font-medium text-forest-green">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS OF MEDITATION */}
      <section className="bg-deep-forest px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <FaQuoteLeft className="mx-auto h-7 w-7 text-luxury-gold/50" aria-hidden="true" />
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 text-center font-heading text-[clamp(1.2rem,2.8vw,1.75rem)] italic font-light text-ivory-white">
              "Peace comes from within. Awakening begins with stillness."
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {BENEFITS.map((item, idx) => (
              <Reveal key={item.label} delay={160 + idx * 60}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="h-6 w-6 text-muted-gold" aria-hidden="true" />
                  <span className="font-body text-[0.65rem] uppercase tracking-wide text-ivory-white/80">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE THE JOURNEY WITHIN YOU */}
      <section className="relative overflow-hidden bg-warm-sand px-6 py-24 text-center md:px-10 md:py-28">
        <FaOm
          className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 text-forest-green/[0.04]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-editorial">
          <SectionHeading
            label="For Every Guest"
            title={
              <>
                Experience the Journey
                <span className="block italic text-luxury-gold">Within You</span>
              </>
            }
            lede="Disconnect from the noise, reconnect with your soul."
            align="center"
          />
          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {IDEAL_FOR.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-luxury-gold/40 bg-white px-4 py-1.5 font-body text-[0.7rem] uppercase tracking-wide text-forest-green"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={240}>
            <Link to="/enquire" className="lux-btn-dark mt-10 inline-flex">
              <span>Begin Your Journey</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone bg-ivory-white px-6 py-16 text-center md:px-10">
        <p className="mx-auto max-w-prose font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
          A cultural specialist can add a sitting to your itinerary, or simply
          point you toward the hall for a quiet hour on your own.
        </p>
        <Link to="/cultural-experience" className="lux-btn-dark mt-8 inline-flex">
          <span>Back to Cultural Experience</span>
        </Link>
      </section>
    </main>
  );
}
