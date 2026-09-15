import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

/**
 * /experiences — the estate's adventure and leisure hub.
 *
 * This page orients the visitor (hero + trust bar) and lets them choose a
 * lane (adventure vs. leisure); the full catalogue for whichever they pick
 * lives on its own page at /experiences/:type (see ExperienceTypePage),
 * and each activity has its own gallery/amenities/booking page at
 * /experience/:id (see ExperienceDetail) — the same listing → detail
 * pattern already used for rooms (RoomTypePage → RoomDetail). Every visual
 * pattern here already exists on Home — SectionHeading, Reveal, lux-frame —
 * so the page reads as part of the same site rather than a one-off.
 */

const STATS = [
  { figure: '18', label: 'Curated activities' },
  { figure: '150', label: 'Acres of terrain' },
  { figure: '25+', label: 'Years in hospitality' },
  { figure: 'Certified', label: 'Guides, every activity' },
];

/* Hero slides — image, kicker, headline and body rotate together, on the
   same cross-fade pattern as the homepage hero (see components/Hero.js).
   Each slide uses the same photo as the matching circle in HERO_SPOTS below,
   so the background always shows what the visitor is looking at on the
   right — never a fifth, unrelated image. */
const SLIDE_DURATION = 7000;
const SLIDES = [
  {
    slug: 'ropeway-opt',
    kicker: 'New',
    label: 'Ropeway Point · Aerial Adventure',
    title: ['Soar Above', 'the Valley'],
    body: 'A cable crossing above the ridge line, dropping you at the far trailhead with views the ground never gives you.',
    cta: { label: 'Explore Experiences', href: '/experiences/adventures' },
  },
  {
    slug: 'kayaking-opt',
    kicker: 'Water',
    label: 'The Reservoir · Kayaking & Boating',
    title: ['Flat Water', 'at First Light'],
    body: 'Kayak or boat across the reservoir at dawn, when the surface holds the ridge line perfectly still.',
    cta: { label: 'View Water Adventures', href: '/experiences/adventures' },
  },
  {
    slug: 'treking',
    kicker: 'Trek',
    label: 'The Ridge Trail · Guided Trekking',
    title: ['Ridges Worth', 'the Climb'],
    body: 'Guided ascents timed to arrive above the cloud line, led by an instructor who knows every foothold.',
    cta: { label: 'View Adventures', href: '/experiences/adventures' },
  },
  {
    slug: 'waterpark',
    kicker: 'Leisure',
    label: 'The Water Park · Family Fun',
    title: ['Leisure for Every', 'Generation'],
    body: 'Slides, splash pools and an afternoon built so every generation of the party is entertained together.',
    cta: { label: 'Explore Leisure', href: '/experiences/leisure' },
  },
];

/* Floating destination spots in the hero. `curve` is how far each circle
   sits from the right edge (rem) — increasing and easing back rather than
   a flat zig-zag traces a smooth wave down the column, and generous
   vertical gap (not negative margin) keeps captions from colliding with
   the circle above or below them. */
const HERO_SPOTS = [
  { slug: 'ropeway-opt', title: 'Ropeway Point', subtitle: 'Aerial Adventure', curve: 0 },
  { slug: 'kayaking-opt', title: 'The Reservoir', subtitle: 'Kayaking & Boating', curve: 4 },
  { slug: 'treking', title: 'The Ridge Trail', subtitle: 'Guided Trekking', curve: 1.5 },
  { slug: 'waterpark', title: 'The Water Park', subtitle: 'Family Fun', curve: 5 },
];

const LANES = [
  {
    id: 'adventures',
    slug: 'treking',
    label: 'For the Adventurous',
    title: 'Outdoor Adventures',
    body: 'Ropeways, rock faces and jungle trails — ten routes across the estate, each led by a certified guide.',
  },
  {
    id: 'leisure',
    slug: 'waterpark',
    label: 'For the Whole Party',
    title: 'Fun & Leisure',
    body: 'A golf course, a water park and indoor games — eight ways to spend an easier afternoon together.',
  },
];

const DAY_TIMELINE = [
  { time: '06:00', title: 'Kayaking at first light', body: 'Flat water on the reservoir before the wind picks up, when the surface holds the ridge line still.' },
  { time: '09:00', title: 'Trekking to the ridge', body: 'A guided ascent timed to arrive above the cloud line, with breakfast carried up for those who want it.' },
  { time: '12:00', title: 'Farm & dairy hour', body: 'The milking, the cheese room, and the calves in between. Children rarely want to leave.' },
  { time: '15:00', title: 'Water park or golf', body: 'The choice is the guest’s, and both run until dusk with instructors and lifeguards on hand.' },
  { time: '19:00', title: 'Bonfire & stories', body: 'The estate naturalist closes most evenings with the day’s sightings, over a fire on the upper field.' },
];

const ASSURANCES = [
  {
    title: 'Certified Guides',
    body: 'Every guide holds international certification and ten or more years of field experience.',
  },
  {
    title: 'Premium Gear',
    body: 'Industry-leading equipment, inspected daily and replaced well ahead of its rated life.',
  },
  {
    title: 'Medical Support',
    body: 'An on-site medical team and clear evacuation protocol for every activity zone.',
  },
  {
    title: 'Weather Monitoring',
    body: 'Real-time tracking so activities run only when conditions are genuinely safe.',
  },
];

const VOICES = [
  {
    quote:
      'The zipline was breathtaking. The guides were exact and unhurried, and the view from the top is not something a photograph explains well.',
    name: 'Arjun Mehta',
    place: 'Mumbai, India',
  },
  {
    quote:
      'A rare thing — an estate that entertains the children and the adults on the same afternoon, without either noticing the other was catered to.',
    name: 'Priya Sharma',
    place: 'Bangalore, India',
  },
  {
    quote:
      'Our guide on the safari knew the reserve the way most people know a room in their own house. We saw species we had not expected to.',
    name: 'Rajesh Gupta',
    place: 'Delhi, India',
  },
];

const PLAN_DETAILS = [
  { label: 'Call the Estate', lines: ['+91 7588775757', 'Daily, 9 a.m. to 8 p.m.'] },
  { label: 'Advance Booking', lines: ['48 hours ahead', 'for guaranteed availability'] },
  { label: 'Group Packages', lines: ['Special rates', 'for parties of ten or more'] },
  { label: 'Custom Itineraries', lines: ['Activities combined', 'into a single exclusive rate'] },
];

function AdventuresHero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const schedule = useCallback(() => {
    window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_DURATION
    );
  }, []);

  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    schedule();
    return () => window.clearInterval(timerRef.current);
  }, [schedule]);

  const select = (index) => {
    setActive(index);
    schedule();
  };

  return (
    <section className="relative min-h-viewport overflow-hidden bg-deep-forest">
      {/* Cross-fading background plates */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.slug}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-luxe ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <EstateImage
              slug={slide.slug}
              alt={slide.title.join(' ')}
              sizes="100vw"
              priority={i === 0}
              className={`h-full w-full object-cover ${i === active ? 'animate-ken-burns' : ''}`}
            />
          </div>
        ))}
      </div>

      {/* Base scrim — darkest on the left, where the text sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,32,24,0.8) 0%, rgba(6,32,24,0.5) 38%, rgba(6,32,24,0.22) 62%, rgba(6,32,24,0.1) 100%), linear-gradient(to top, rgba(6,32,24,0.55) 0%, transparent 30%)',
        }}
      />
      {/* Right-hand panel scrim — keeps the destination stack legible
          whatever sits behind it in the photo */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[38rem] lg:block"
        style={{
          background:
            'linear-gradient(to left, rgba(6,32,24,0.6) 0%, rgba(6,32,24,0.35) 45%, transparent 100%)',
        }}
      />

      {/* Left content — cross-fades in place so the layout never jumps */}
      <div className="relative z-10 min-h-viewport max-w-2xl px-6 py-28 md:px-10 lg:max-w-xl">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.slug}
            aria-hidden={i !== active}
            className={`flex min-h-viewport flex-col justify-center transition-opacity duration-700 ease-luxe ${
              i === active ? 'relative opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
            }`}
          >
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-ivory-white/25 bg-ivory-white/10 py-1.5 pl-1.5 pr-4 backdrop-blur-sm">
              <span className="rounded-full bg-ivory-white px-3 py-1 font-body text-[0.65rem] font-medium uppercase tracking-wider text-dark-charcoal">
                {slide.kicker}
              </span>
              <span className="font-body text-[0.7rem] uppercase tracking-wider text-ivory-white/90">
                {slide.label}
              </span>
            </span>

            <h1 className="mt-8 font-heading text-5xl font-medium italic leading-[1.08] text-ivory-white md:text-6xl">
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            <p className="mt-6 max-w-md font-body text-[0.95rem] font-light leading-[1.8] text-ivory-white/80">
              {slide.body}
            </p>

            <Link
              to={slide.cta.href}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-ivory-white px-7 py-3.5 font-body text-sm font-medium text-dark-charcoal transition-colors duration-500 hover:bg-muted-gold"
            >
              {slide.cta.label}
              <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Floating destination spots — each one offset from the right edge by
          a different amount (spot.curve), so the column traces a smooth
          wave rather than a flat line or a colliding zig-zag. Positioning
          lives on this wrapper div, not on Reveal itself — passing `style`
          straight to Reveal would overwrite the inline transitionDelay it
          sets internally. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[30rem] flex-col items-end justify-center gap-12 py-16 pr-8 xl:flex xl:gap-16 xl:pr-12">
        {HERO_SPOTS.map((spot, i) => (
          <div key={spot.slug} style={{ marginRight: `${spot.curve}rem` }}>
            <Reveal delay={200 + i * 120} className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-heading text-base italic text-ivory-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                  {spot.title}
                </p>
                <p className="font-body text-xs text-ivory-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                  {spot.subtitle}
                </p>
              </div>
              <div className="pointer-events-auto h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-[3px] border-ivory-white/80 shadow-luxury-lg xl:h-24 xl:w-24">
                <EstateImage slug={spot.slug} alt={spot.title} sizes="140px" />
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Slide selector */}
      <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => select(i)}
            aria-label={`Show ${slide.title.join(' ')}`}
            aria-current={i === active}
            className={`rounded-full transition-all duration-500 ${
              i === active ? 'h-2.5 w-2.5 bg-ivory-white' : 'h-1.5 w-1.5 bg-ivory-white/40 hover:bg-ivory-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Adventures() {
  return (
    <main className="bg-ivory-white">
      <AdventuresHero />

      {/* TRUST BAR */}
      <section className="border-b border-stone bg-ivory-white px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-editorial grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="px-2 text-center md:px-6">
              <span className="block font-heading text-3xl font-light text-luxury-gold md:text-4xl">
                {s.figure}
              </span>
              <span className="mt-2 block font-body text-[0.75rem] uppercase tracking-wider text-light-charcoal">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHOOSE YOUR LANE */}
      <section className="bg-warm-sand px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Where to Start"
            title={
              <>
                Two ways
                <span className="block italic text-luxury-gold">to spend your time</span>
              </>
            }
            lede="Most guests mix both across a stay. Pick a lane to see the full catalogue and book an activity."
            align="center"
            className="mb-16 md:mb-20"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {LANES.map((lane, i) => (
              <Reveal key={lane.id} delay={i * 130}>
                <Link to={`/experiences/${lane.id}`} className="group block">
                  <div className="lux-frame zoom-hover aspect-[16/10] w-full">
                    <EstateImage
                      slug={lane.slug}
                      alt={lane.title}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="lux-scrim-soft absolute inset-0" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <span className="lux-label text-muted-gold">{lane.label}</span>
                      <h3 className="mt-3 font-heading text-[1.75rem] font-light leading-tight text-ivory-white">
                        {lane.title}
                      </h3>
                      <p className="mt-4 font-body text-[0.85rem] font-light leading-[1.8] text-ivory-white/80">
                        {lane.body}
                      </p>
                      <span className="lux-link mt-6 text-ivory-white">Explore</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A DAY AT THE ESTATE */}
      <section className="bg-deep-forest px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="A Day at the Estate"
            tone="light"
            title={
              <>
                One morning,
                <span className="block italic text-muted-gold">told in full</span>
              </>
            }
            lede="No two days are scheduled alike, but most follow a shape close to this one."
            align="center"
            className="mb-20 md:mb-28"
          />
          <div className="mx-auto max-w-3xl divide-y divide-ivory-white/15 border-y border-ivory-white/15">
            {DAY_TIMELINE.map((d, i) => (
              <Reveal key={d.time} delay={i * 110}>
                <div className="flex flex-col gap-2 py-8 sm:flex-row sm:gap-10">
                  <span className="shrink-0 font-mono text-sm tracking-wider text-muted-gold sm:w-20">
                    {d.time}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-light text-ivory-white">{d.title}</h3>
                    <p className="mt-2 font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/60">
                      {d.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ASSURANCE */}
      <section className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Assurance"
            title={
              <>
                Safety carried
                <span className="block italic text-luxury-gold">as far as the gear</span>
              </>
            }
            lede="Every activity on the estate is built around the same standard, whatever the thrill."
            align="center"
            className="mb-20 md:mb-24"
          />
          <dl className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {ASSURANCES.map((a, i) => (
              <Reveal key={a.title} delay={i * 110} className="px-2 md:px-4">
                <dt className="font-mono text-[0.7rem] tracking-wider text-luxury-gold">
                  {String(i + 1).padStart(2, '0')}
                </dt>
                <dd className="mt-4">
                  <span className="block font-heading text-xl font-light text-forest-green">{a.title}</span>
                  <span className="mt-3 block font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                    {a.body}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* GUEST VOICES */}
      <section className="bg-warm-sand px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-editorial">
          <SectionHeading
            label="Guest Voices"
            title={
              <>
                Told by those who
                <span className="block italic text-luxury-gold">made the climb</span>
              </>
            }
            align="center"
            className="mb-20 md:mb-24"
          />
          <div className="grid grid-cols-1 gap-12 border-t border-stone pt-14 md:grid-cols-3 md:gap-10 md:divide-x md:divide-stone">
            {VOICES.map((v, i) => (
              <Reveal key={v.name} delay={i * 120} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <span className="font-heading text-4xl italic text-luxury-gold">&ldquo;</span>
                <p className="mt-4 font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
                  {v.quote}
                </p>
                <div className="mt-8">
                  <span className="block font-heading text-lg font-light text-forest-green">{v.name}</span>
                  <span className="mt-1 block font-body text-[0.75rem] uppercase tracking-wider text-light-charcoal/60">
                    {v.place}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN YOUR VISIT */}
      <section className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading
              label="Plan Your Visit"
              title={
                <>
                  Built around
                  <span className="block italic text-luxury-gold">your itinerary</span>
                </>
              }
              lede="An experience specialist can shape the day around your party, whether the goal is adrenaline or an afternoon of doing very little."
            />
            <Reveal delay={280}>
              <dl className="mt-12 divide-y divide-stone border-y border-stone">
                {PLAN_DETAILS.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-4 py-5">
                    <dt className="font-heading text-lg font-light text-forest-green">{d.label}</dt>
                    <dd className="text-right font-body text-[0.8rem] font-light leading-relaxed text-light-charcoal">
                      {d.lines.map((line, idx) => (
                        <span key={line} className={idx === 0 ? 'block' : 'block text-light-charcoal/70'}>
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6">
            <div className="lux-frame aspect-[4/5] w-full">
              <EstateImage
                slug="5-star-hospitality-2"
                alt="Planning an adventure at BAMBARDDARA"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-dark-charcoal">
        <div className="relative mx-auto max-w-editorial px-6 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <span className="lux-label text-muted-gold">Reservations</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mx-auto mt-7 max-w-2xl text-section font-heading font-light text-ivory-white">
              Begin your journey
              <span className="block italic text-muted-gold">at first light</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-prose font-body text-[0.95rem] font-light leading-[1.9] text-ivory-white/75">
              Speak with an experience specialist to design your itinerary and
              reserve your preferred dates.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-4">
              <Link to="/enquire" className="lux-btn-light">
                <span>Reserve an Experience</span>
              </Link>
              <a href="tel:+917588775757" className="lux-btn-light">
                <span>Call a Specialist</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
