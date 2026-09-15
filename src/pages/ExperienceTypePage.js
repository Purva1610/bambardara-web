import React, { useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaShieldAlt, FaHeadset, FaCloudSun, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import ExperienceTile from '../components/shared/ExperienceTile';
import { EXPERIENCE_TYPES, getExperiencesByType } from '../data/experiences';

const SAFETY_HIGHLIGHTS = [
  {
    Icon: FaShieldAlt,
    title: 'Certified & Trained',
    body: 'Every guide holds international certification and years of field experience on this exact terrain.',
  },
  {
    Icon: FaHeadset,
    title: 'Reliable Support',
    body: 'An on-site medical team and a clear evacuation protocol are in place for every activity zone.',
  },
  {
    Icon: FaCloudSun,
    title: 'Ongoing Monitoring',
    body: 'Real-time weather and safety checks run before every departure, so activities proceed only when conditions are genuinely safe.',
  },
];

/* Annotated photo, keyed by lane — each caption sits at the same vertical
   `top` percentage as the SVG line's start, and each line ends at its
   matching dot's {x, y}. Keeping everything in percentages (not pixels) is
   what lets the whole diagram stay aligned as the section resizes. */
const EXPLORE_BY_TYPE = {
  adventures: {
    heading: 'Explore The Nature With Us',
    photoSlug: 'waterfalls-and-nature-trails-3',
    photoAlt: 'Forest canopy across the estate reserve',
    features: [
      { top: 20, title: 'Guided Trails', body: 'Walking paths curated by naturalists who know every turn of the forest.' },
      { top: 48, title: 'Native Wildlife', body: 'Spot species that call this reserve home, from birdlife to the shy forest cat.' },
      { top: 76, title: 'Untouched Canopy', body: 'Forest cover kept exactly as it was found, protected across every season.' },
    ],
    dots: [
      { x: 66, y: 30 },
      { x: 82, y: 48 },
      { x: 60, y: 66 },
    ],
  },
  leisure: {
    heading: 'Explore The Fun With Us',
    photoSlug: 'waterpark',
    photoAlt: 'The estate water park in full swing',
    features: [
      { top: 20, title: 'Golf & Greens', body: 'A nine-hole course across the upper slope, ready with clubs and buggies whenever you are.' },
      { top: 48, title: 'Water Play', body: 'Slides, splash pools and a shallow end for the youngest guests, staffed from open to close.' },
      { top: 76, title: 'Indoor Games', body: 'Table tennis, carrom and a console corner for the hotter hours of the day.' },
    ],
    dots: [
      { x: 66, y: 30 },
      { x: 82, y: 48 },
      { x: 60, y: 66 },
    ],
  },
};

/* Short films of two specific activities, keyed by lane so the adventures
   page never shows leisure content and vice versa. `videoSrc` points at
   real footage in public/videos/ — the leisure pair is still a placeholder
   path until that footage is supplied. */
/* Four-photo mosaic in the "Here's what makes it right for you" section,
   keyed by lane so leisure doesn't show trekking/temple photography. */
const MOSAIC_BY_TYPE = {
  adventures: [
    { slug: 'trekking-2', alt: 'A ridge line above the estate' },
    { slug: 'well-planted-roads-and-street-lights', alt: 'A road winding through the estate' },
    { slug: 'waterfalls-and-nature-trails-3', alt: 'Forest canopy along the nature trail' },
    { slug: 'temple', alt: 'Light falling through the estate temple' },
  ],
  leisure: [
    { slug: 'organic-farming-and-farm-stay-3', alt: 'The estate golf course' },
    { slug: 'cycling', alt: 'Cycling through the estate grounds' },
    { slug: '5-star-hospitality', alt: 'The estate water park' },
    { slug: 'banquet-and-conference', alt: 'The indoor games room' },
  ],
};

const FILMS_BY_TYPE = {
  adventures: {
    label: 'Adventure Films',
    films: [
      {
        id: 'jungle-safari',
        alt: 'A jungle safari through the estate reserve',
        videoSrc: '/videos/safari.mp4',
        quote:
          'Open-top drives into the reserve at first light, reading the ground for whatever the morning gives up — watch a safari from the jeep.',
      },
      {
        id: 'ropeway-ride',
        alt: 'The estate ropeway ride',
        videoSrc: '/videos/ropeway.mp4',
        quote:
          'A cable crossing above the ridge line, dropping you at the far trailhead with views the ground never gives you — watch the ride up.',
      },
    ],
  },
  leisure: {
    label: 'Leisure Films',
    films: [
      {
        id: 'waterpark',
        alt: 'The estate water park',
        videoSrc: '/videos/waterpark.mp4',
        quote:
          'Slides, splash pools and an afternoon that runs itself — watch the water park on a full day.',
      },
      {
        id: 'paintball',
        alt: 'A paintball match on the estate',
        videoSrc: '/videos/paintball.mp4',
        quote:
          'Two teams, a wooded arena, and full safety gear — watch a round play out from the tree line.',
      },
    ],
  },
};

/* Plays immediately, muted, on a silent loop — no poster, no click needed.
   Autoplay only works unmuted-free when muted, so `muted` stays on; a
   dedicated sound-toggle button gives visitors a way to hear it if they
   want to, without requiring a click just to see the footage move. */
function FilmClip({ videoSrc, alt }) {
  const [muted, setMuted] = useState(true);

  return (
    <div className="lux-frame relative aspect-[4/3] w-full">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
        aria-label={alt}
        className="h-full w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-dark-charcoal/60 text-ivory-white backdrop-blur-sm transition-colors duration-300 hover:bg-dark-charcoal/80"
      >
        {muted ? <FaVolumeMute className="h-4 w-4" /> : <FaVolumeUp className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function ExperienceTypePage() {
  const { type } = useParams();
  const meta = EXPERIENCE_TYPES[type];
  const items = getExperiencesByType(type);
  const scrollerRef = useRef(null);

  if (!meta || items.length === 0) {
    return <Navigate to="/experiences" replace />;
  }

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden bg-deep-forest">
        <div className="absolute inset-0">
          <EstateImage
            slug={items[0].gallery[0]}
            alt={meta.label}
            sizes="100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="lux-scrim absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <Link
              to="/experiences"
              className="lux-label text-muted-gold transition-colors hover:text-ivory-white"
            >
              &larr; All Experiences
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-section font-heading font-light text-ivory-white">
              {meta.label}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-prose font-body text-[0.9rem] font-light leading-[1.85] text-ivory-white/75">
              {meta.lede}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <span className="mt-6 block font-body text-[0.7rem] uppercase tracking-wider text-ivory-white/50">
              {items.length} activities
            </span>
          </Reveal>
        </div>
      </section>

      {/* CATALOGUE — a horizontally scrolling carousel of overlay cards */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <div className="relative flex items-start justify-between gap-6">
            <Reveal className="max-w-xl">
              <h2 className="font-heading text-2xl font-light text-forest-green md:text-3xl">
                {meta.panelTitle}
              </h2>
              <p className="mt-3 font-body text-[0.85rem] font-light leading-relaxed text-light-charcoal">
                {meta.panelLede}
              </p>
            </Reveal>

            <div className="flex flex-shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll to previous activities"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/50 text-luxury-gold transition-colors duration-500 hover:bg-luxury-gold hover:text-dark-charcoal"
              >
                <FaArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Scroll to next activities"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-gold text-dark-charcoal transition-transform duration-500 hover:scale-110"
              >
                <FaArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:mt-16 md:gap-5"
          >
            {items.map((exp, i) => (
              <Reveal
                key={exp.id}
                delay={(i % 4) * 100}
                className="w-[72%] flex-shrink-0 snap-start sm:w-[42%] lg:w-[23%]"
              >
                <ExperienceTile experience={exp} index={i} variant="overlay" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS FOR CHOOSING US — safety guidelines, at a glance */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <Reveal className="text-center">
            <h2 className="font-heading text-2xl font-light text-forest-green md:text-3xl">
              Reasons for Choosing Us
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 md:mt-20">
            {SAFETY_HIGHLIGHTS.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 130} className="text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-luxury-gold text-dark-charcoal">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-heading text-lg font-light text-forest-green">
                  {title}
                </h3>
                <p className="mx-auto mt-3 max-w-[16rem] font-body text-[0.8rem] font-light leading-relaxed text-light-charcoal">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERFECT FOR YOU — photo mosaic + booking pitch */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Left column: tall photo over a short one. Right column runs
                  the same two ratios in reverse order, so both columns sum
                  to the same total height instead of one running long. */}
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="lux-frame aspect-[3/4] w-full">
                  <EstateImage
                    slug={MOSAIC_BY_TYPE[type][0].slug}
                    alt={MOSAIC_BY_TYPE[type][0].alt}
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>
                <div className="lux-frame aspect-[16/9] w-full">
                  <EstateImage
                    slug={MOSAIC_BY_TYPE[type][1].slug}
                    alt={MOSAIC_BY_TYPE[type][1].alt}
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="lux-frame aspect-[16/9] w-full">
                  <EstateImage
                    slug={MOSAIC_BY_TYPE[type][2].slug}
                    alt={MOSAIC_BY_TYPE[type][2].alt}
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>
                <div className="lux-frame aspect-[3/4] w-full">
                  <EstateImage
                    slug={MOSAIC_BY_TYPE[type][3].slug}
                    alt={MOSAIC_BY_TYPE[type][3].alt}
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <h2 className="font-heading text-3xl font-light leading-tight text-forest-green md:text-4xl">
                Here&apos;s what makes
                <span className="block italic text-luxury-gold">it right for you</span>
              </h2>
              <span className="mt-6 block h-px w-16 bg-luxury-gold/70" />
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
                From the terrain we choose to the guide who leads it, every
                detail is built around comfort and safety — so whether you
                are after adrenaline or an easy afternoon, the day fits
                exactly how you want to spend it.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link to="/enquire" className="lux-btn-gold mt-10 inline-flex">
                <span>Book Now</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPLORE — annotated photo, content specific to this lane */}
      <section className="bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <Reveal className="text-center">
            <h2 className="font-heading text-2xl font-light text-forest-green md:text-3xl">
              {EXPLORE_BY_TYPE[type].heading}
            </h2>
            <span className="mx-auto mt-4 block h-px w-16 bg-luxury-gold" />
          </Reveal>

          <Reveal
            delay={140}
            className="relative mt-14 aspect-[16/10] w-full overflow-hidden md:mt-16 md:aspect-[16/8]"
          >
            <EstateImage
              slug={EXPLORE_BY_TYPE[type].photoSlug}
              alt={EXPLORE_BY_TYPE[type].photoAlt}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />

            {/* Highlight box, around the area the dots sit inside */}
            <div
              className="absolute hidden border-2 border-luxury-gold lg:block"
              style={{ left: '44%', top: '18%', right: '4%', bottom: '14%' }}
            />

            {/* Lines from each caption to its matching point in the photo */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {EXPLORE_BY_TYPE[type].features.map((f, i) => (
                <line
                  key={f.title}
                  x1={30}
                  y1={f.top}
                  x2={EXPLORE_BY_TYPE[type].dots[i].x}
                  y2={EXPLORE_BY_TYPE[type].dots[i].y}
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="0.4"
                />
              ))}
            </svg>

            {/* Points of interest */}
            {EXPLORE_BY_TYPE[type].dots.map((d, i) => (
              <span
                key={i}
                className="absolute hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory-white shadow-[0_0_0_5px_rgba(255,255,255,0.25)] lg:block"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
              />
            ))}

            {/* Captions — only overlaid on the photo once there's room for
                the diagram (lg+); at that width three ~13rem boxes at
                20/48/76% top never overlap. Below lg they'd collide, so
                mobile gets the plain stacked list underneath instead. */}
            {EXPLORE_BY_TYPE[type].features.map((f) => (
              <div
                key={f.title}
                className="absolute hidden max-w-[13rem] rounded-md bg-dark-charcoal/70 p-4 backdrop-blur-sm lg:block"
                style={{ left: '4%', top: `${f.top}%`, transform: 'translateY(-50%)' }}
              >
                <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-luxury-gold">
                  {f.title}
                </h3>
                <p className="mt-2 font-body text-xs font-light leading-relaxed text-ivory-white/80">
                  {f.body}
                </p>
              </div>
            ))}
          </Reveal>

          {/* Mobile/tablet fallback — the overlaid captions above are lg+ only */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:hidden">
            {EXPLORE_BY_TYPE[type].features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-luxury-gold">
                  {f.title}
                </h3>
                <p className="mt-2 font-body text-xs font-light leading-relaxed text-light-charcoal">
                  {f.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FILMS — short films of two activities, specific to this lane */}
      <section className="border-t border-stone bg-ivory-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="lux-label text-luxury-gold">{FILMS_BY_TYPE[type].label}</span>
          </Reveal>

          <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
            {/* Row 1 */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <span className="font-heading text-5xl italic text-luxury-gold">&ldquo;</span>
                <p className="mt-4 max-w-md font-body text-[0.95rem] font-light leading-[1.9] text-light-charcoal">
                  {FILMS_BY_TYPE[type].films[0].quote}
                </p>
                <Link
                  to={`/experience/${FILMS_BY_TYPE[type].films[0].id}`}
                  className="lux-btn-gold mt-8 inline-flex"
                >
                  <span>Learn More</span>
                </Link>
              </Reveal>
              <Reveal delay={120}>
                <FilmClip
                  videoSrc={FILMS_BY_TYPE[type].films[0].videoSrc}
                  alt={FILMS_BY_TYPE[type].films[0].alt}
                />
              </Reveal>
            </div>

            {/* Row 2 — mirrored on desktop */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className="lg:order-2">
                <span className="font-heading text-5xl italic text-luxury-gold">&ldquo;</span>
                <p className="mt-4 max-w-md font-body text-[0.95rem] font-light leading-[1.9] text-light-charcoal">
                  {FILMS_BY_TYPE[type].films[1].quote}
                </p>
                <Link
                  to={`/experience/${FILMS_BY_TYPE[type].films[1].id}`}
                  className="lux-btn-gold mt-8 inline-flex"
                >
                  <span>Learn More</span>
                </Link>
              </Reveal>
              <Reveal delay={120} className="lg:order-1">
                <FilmClip
                  videoSrc={FILMS_BY_TYPE[type].films[1].videoSrc}
                  alt={FILMS_BY_TYPE[type].films[1].alt}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone bg-ivory-white px-6 py-16 text-center md:px-10">
        <p className="font-body text-[0.9rem] font-light text-light-charcoal">
          Not sure which to pick? An experience specialist can build the day around your party.
        </p>
        <Link to="/enquire" className="lux-btn-dark mt-6 inline-flex">
          <span>Speak to a Specialist</span>
        </Link>
      </section>
    </main>
  );
}
