import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLandmark,
  FaUtensils,
  FaDrum,
  FaHandsHelping,
  FaPaintBrush,
  FaHorse,
  FaMonument,
  FaOm,
  FaArrowRight,
} from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';

const PLACES = [
  {
    slug: 'shivaji-statue-card',
    icon: FaMonument,
    title: 'Shivaji Maharaj Statue',
    body: 'A commanding tribute to the Maratha warrior-king, set on the ridge where the whole valley opens beneath it.',
    to: '/cultural-experience/shivaji-statue',
  },
  {
    slug: 'temple-sanctum',
    icon: FaOm,
    title: 'The Estate Temple',
    body: 'Two hundred years older than anything else here. Morning aarti is open to any guest who wishes to attend.',
    to: '/cultural-experience/temple',
  },
  {
    slug: 'international-meditation-center',
    icon: GiMeditation,
    title: 'International Meditation Centre',
    body: 'A domed hall on the quietest corner of the estate, with guided sittings at dawn and dusk and silent access all day.',
    to: '/cultural-experience/meditation-center',
  },
];

const HIGHLIGHTS = [
  {
    slug: 'temple',
    icon: FaLandmark,
    title: 'Temple Heritage Trails',
    body: 'Guided walks to the shrines and stepwells across the Kolhapur countryside.',
    detail: 'Each stop carries its own centuries-old story, led by local guides who grew up walking these same paths — not a route memorised from a brochure.',
  },
  {
    slug: 'organic-food',
    icon: FaUtensils,
    title: 'Kolhapuri Cuisine',
    body: 'A kitchen built on the district’s own spice blends.',
    detail: 'Cooked and served the way it’s eaten in a Kolhapur home, not adjusted for a hotel menu or a visitor’s palate.',
  },
  {
    slug: 'folk-performances',
    icon: FaDrum,
    title: 'folk-performances',
    body: 'The region’s own music and dance, by troupes from the surrounding villages.',
    detail: 'An evening given over to performers who bring the same repertoire they’d play at a local wedding or festival night, not a staged show.',
  },
  {
    slug: 'village-walk',
    icon: FaHandsHelping,
    title: 'Village Walks',
    body: 'An afternoon in the neighbouring village, meeting the families who farm it.',
    detail: 'Time with the craftspeople and families who’ve worked this land for generations, away from any rehearsed welcome.',
  },
  {
    slug: 'traditional-crafts',
    icon: FaPaintBrush,
    title: 'Traditional Crafts',
    body: 'Pottery, weaving and leatherwork demonstrated by local artisans.',
    detail: 'Techniques passed down within their own families, with a chance to sit at the wheel or the loom and try it yourself.',
  },
  {
    slug: 'cart-ride',
    icon: FaHorse,
    title: 'Bullock Cart Rides',
    body: 'A slow circuit of the farm roads, the way the estate has always moved.',
    detail: 'Unhurried, and timed to the pace the land actually keeps — not a photo-op loop built for a schedule.',
  },
];

const GALLERY = [
  { slug: 'event-and-cultural-experience', caption: 'Festival Evenings' },
  { slug: 'temple', caption: 'Temple Heritage Trails' },
  { slug: 'kolhapuri-food', caption: 'Kolhapuri Cuisine' },
  { slug: 'cart-ride', caption: 'Bullock Cart Rides' },
];

export default function CulturalExperience() {
  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-[80vh] flex-col overflow-hidden bg-deep-forest px-6 pb-8 pt-28 md:px-12 md:pb-10 md:pt-32">
        <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-body text-[0.75rem] font-semibold uppercase tracking-wide text-ivory-white">
                Cultural Specialists
              </span>
              <span className="h-px w-10 bg-ivory-white/40" />
              <span className="font-body text-[0.75rem] uppercase tracking-wide text-ivory-white/70">
                Bambardara Estate
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-start gap-4 sm:max-w-xs">
              <p className="font-body text-[0.75rem] font-light leading-relaxed text-ivory-white/75">
                Beyond the fields and the falls, BAMBARDDARA sits inside a
                living tradition of temples, festivals, and a cuisine kept
                true to the district.
              </p>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ivory-white/30 bg-ivory-white/10">
                <EstateImage
                  slug="logo"
                  alt="Bambardara estate crest"
                  sizes="48px"
                  className="h-8 w-8"
                />
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative z-10 mt-auto grid grid-cols-1 items-end gap-10 pt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={160}>
            <h1 className="font-heading text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[1.02] text-ivory-white">
              The Culture of
              <br />
              Kolhapur,
              <br />
              <span className="italic text-muted-gold">Kept Alive</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="lux-frame aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <EstateImage
                slug="shivaji-maharaj-hero"
                alt="A cultural festival evening at the estate"
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-ivory-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <div className="flex items-center justify-between gap-6 border-b border-stone pb-4">
              <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
                A Living Tradition
              </span>
              <span className="hidden h-px flex-1 bg-stone sm:block" />
              <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
                Bambardara Estate
              </span>
              <span className="shrink-0 font-body text-[0.65rem] text-light-charcoal/50">02</span>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal delay={80}>
                <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-tight text-forest-green">
                  More Than a Stay
                  <span className="block italic text-luxury-gold">— a District, Shared</span>
                </h2>
              </Reveal>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Reveal delay={140}>
                  <div>
                    <p className="lux-label mb-2">The Rhythm</p>
                    <p className="font-body text-[0.85rem] font-light leading-[1.8] text-light-charcoal">
                      Kolhapur's temples, its festivals and its kitchens have
                      run on their own rhythm for generations, unhurried by
                      the tourist season.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <div>
                    <p className="lux-label mb-2">The Guides</p>
                    <p className="font-body text-[0.85rem] font-light leading-[1.8] text-light-charcoal">
                      The estate's naturalists and local guides open a door
                      into that rhythm, rather than performing a version of
                      it for visitors.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal delay={100} className="lg:col-span-6">
              <div className="lux-frame aspect-[4/5] w-full">
                <EstateImage
                  slug="welcome-shared"
                  alt="A temple along the estate's heritage trail"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRADITIONS, BY THE NUMBERS */}
      <section className="relative overflow-hidden bg-deep-forest">
        <Reveal>
          <div className="relative z-10 flex items-center justify-between gap-6 px-6 py-5 md:px-12">
            <span className="shrink-0 font-body text-[0.7rem] font-semibold uppercase tracking-wide text-ivory-white">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-ivory-white/30 sm:block" />
            <span className="shrink-0 font-body text-[0.7rem] uppercase tracking-wide text-ivory-white/70">
              Bambardara Estate
            </span>
            <span className="shrink-0 font-body text-[0.7rem] text-ivory-white/50">03</span>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute inset-0">
            <EstateImage
              slug="traditions-numbers"
              alt="A cultural festival evening at the estate"
              sizes="100vw"
              position="top"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-10 bg-black/65" />
          </div>

          <div className="relative z-10 px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20">
            <Reveal delay={80}>
              <h2 className="max-w-lg font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-ivory-white">
                Traditions,
                <span className="block italic text-muted-gold">By the Numbers</span>
              </h2>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 md:mt-24">
              {[
                { value: '200+', label: 'Years, the temple’s age', height: 'h-10 md:h-14' },
                { value: '3', label: 'Heritage sites on the estate', height: 'h-16 md:h-24' },
                { value: '2', label: 'Guided sittings, dawn & dusk', height: 'h-24 md:h-32' },
                { value: 'Daily', label: 'Morning aarti, open to guests', height: 'h-32 md:h-44' },
              ].map((stat, idx) => (
                <Reveal key={stat.label} delay={140 + idx * 80}>
                  <div className="flex flex-col">
                    <div className="flex h-32 items-end md:h-44">
                      <span className={`w-px bg-ivory-white/60 ${stat.height}`} />
                    </div>
                    <span className="mt-4 font-heading text-xl font-light text-ivory-white md:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 max-w-[9rem] font-body text-[0.68rem] font-light leading-snug text-ivory-white/65">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={420}>
              <p className="mt-16 max-w-sm font-body text-[0.8rem] font-light leading-[1.8] text-ivory-white/70 md:mt-20">
                A shrine older than the estate itself, a statue on the ridge,
                and a hall built for silence — kept exactly as the district
                has always kept them, not restaged for a visitor's camera.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW WE WELCOME YOU IN */}
      <section className="relative bg-ivory-white px-6 pb-16 pt-5 md:px-12 md:pb-20">
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="culturalArch" clipPathUnits="objectBoundingBox">
              <path d="M0,1 L0,0.32 Q0,0.05 0.5,0 Q1,0.05 1,0.32 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>

        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-stone pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-stone sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
              Bambardara Estate
            </span>
            <span className="shrink-0 font-body text-[0.65rem] text-light-charcoal/50">04</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-editorial grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div
              className="aspect-[3/4] w-full overflow-hidden"
              style={{ clipPath: 'url(#culturalArch)' }}
            >
              <EstateImage
                slug="intro-dhol"
                alt="A temple along the estate's heritage trail"
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-forest-green">
                How We
                <span className="block italic text-luxury-gold">Welcome You In</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-lg font-body text-[0.9rem] font-light leading-[1.85] text-light-charcoal">
                Nothing here is staged for the season. Guests are folded into
                the district's own calendar — a sitting, a festival night, a
                walk through the village — guided by people who grew up with
                it, not a script written for visitors.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { step: '01', title: 'We Ask First', body: 'A cultural specialist learns what your party wants before building the day.' },
                { step: '02', title: 'We Walk With You', body: 'An estate naturalist or local guide joins every visit, not a recorded tour.' },
                { step: '03', title: 'We Keep It Real', body: 'No performance staged for a camera — just the district on its own day.' },
              ].map((item, idx) => (
                <Reveal key={item.step} delay={200 + idx * 80}>
                  <div>
                    <span className="font-heading text-sm text-luxury-gold">{item.step}</span>
                    <h3 className="mt-2 font-heading text-base font-medium text-forest-green">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-[0.78rem] font-light leading-[1.7] text-light-charcoal">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW A CULTURAL DAY UNFOLDS */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-deep-forest px-6 py-10 md:px-12 md:py-14">
            <Reveal>
              <div className="flex items-center justify-between gap-6 border-b border-ivory-white/25 pb-4">
                <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-ivory-white/80">
                  A Living Tradition
                </span>
                <span className="hidden h-px flex-1 bg-ivory-white/25 sm:block" />
                <span className="shrink-0 font-body text-[0.65rem] text-ivory-white/50">05</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-10 font-heading text-[clamp(2rem,4vw,2.75rem)] font-light leading-tight text-ivory-white">
                Our Journey,
                <span className="block italic text-muted-gold">Through the Day</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-sm font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/70">
                A cultural day on the estate runs on the district's own
                clock — not a tour itinerary, but the hours Kolhapur has
                always kept.
              </p>
            </Reveal>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <EstateImage
              slug="culture-day"
              alt="A cultural festival evening at the estate"
              sizes="(min-width: 1024px) 50vw, 100vw"
              position="bottom"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="bg-ivory-white px-6 py-14 md:px-12 md:py-16">
          <div className="mx-auto grid max-w-editorial grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { time: 'Dawn', title: 'Morning Aarti', body: 'The temple opens for guests who wish to join the first ritual of the day.' },
              { time: 'Morning', title: 'Heritage Walk', body: 'A guided walk to the shrines and stepwells, each with its own story.' },
              { time: 'Afternoon', title: 'Village & Crafts', body: 'Time with the neighbouring village, and a turn at the wheel or the loom.' },
              { time: 'Evening', title: 'Festival Night', body: 'Folk music and dance around the fire, performed by local troupes.' },
            ].map((item, idx) => (
              <Reveal key={item.time} delay={idx * 80}>
                <div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-forest font-body text-[0.7rem] font-semibold text-ivory-white">
                    {idx + 1}
                  </span>
                  <p className="mt-4 font-body text-[0.65rem] uppercase tracking-wide text-luxury-gold">
                    {item.time}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-medium text-forest-green">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.78rem] font-light leading-[1.7] text-light-charcoal">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE PROTECT */}
      <section className="bg-ivory-white px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-stone pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-stone sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] text-light-charcoal/50">06</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-editorial grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-forest-green">
                What We
                <span className="block italic text-luxury-gold">Protect, Not Perform</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                It would be easy to repackage the district's temples and
                festivals into something tidier for a hotel brochure. The
                estate chooses not to — the aarti runs on its own time, and
                the festival calendar doesn't bend for a check-in date.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal delay={200}>
                <div className="lux-frame aspect-[4/3] w-full">
                  <EstateImage
                    slug="temple-heritage"
                    alt="Temple heritage trails near the estate"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
                <p className="mt-3 font-body text-[0.75rem] uppercase tracking-wide text-light-charcoal/60">
                  Temple Heritage
                </p>
              </Reveal>
              <Reveal delay={260}>
                <div className="lux-frame aspect-[4/3] w-full">
                  <EstateImage
                    slug="harvest-traditions"
                    alt="Harvest traditions on the estate"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
                <p className="mt-3 font-body text-[0.75rem] uppercase tracking-wide text-light-charcoal/60">
                  Harvest Traditions
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={120} className="relative lg:col-span-6">
            <div className="lux-frame aspect-[4/5] w-full">
              <EstateImage
                slug="event-and-cultural-experience"
                alt="A cultural festival evening at the estate"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-ivory-white/95 px-4 py-2 shadow-md">
              <span className="h-2 w-2 rounded-full bg-luxury-gold" />
              <span className="font-body text-[0.7rem] uppercase tracking-wide text-forest-green">
                Festival Evenings
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* EACH TRADITION, IN FULL */}
      <section className="relative overflow-hidden bg-deep-forest px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-ivory-white/25 pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-ivory-white/80">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-ivory-white/25 sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] text-ivory-white/50">07</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-editorial grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal delay={80} className="lg:col-span-6">
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-ivory-white">
              Each Tradition,
              <span className="block italic text-muted-gold">in Full</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-6">
            <p className="max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/70">
              None of it is staged for guests — it's a real wage for a real
              craftsperson, troupe or guide. Cultural tourism here pays the
              families who keep these traditions going, the same way it
              always has.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-editorial grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {HIGHLIGHTS.map((item, idx) => (
            <Reveal key={item.title} delay={200 + idx * 60}>
              <div className="flex items-start gap-4 border-t border-ivory-white/25 pt-5">
                <item.icon className="mt-1 h-5 w-5 shrink-0 text-muted-gold" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-base font-medium text-ivory-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.78rem] font-light leading-[1.7] text-ivory-white/65">
                    {item.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PLACES TO VISIT */}
      <section className="bg-warm-sand px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-stone pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-stone sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] text-light-charcoal/50">08</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-editorial">
          <Reveal delay={80}>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-forest-green">
              Three Places,
              <span className="block italic text-luxury-gold">Worth the Walk</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
              Each sits in its own corner of the grounds, on its own rhythm —
              a shrine, a statue, and a hall built for silence.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {PLACES.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link
                  to={p.to}
                  className="group relative block overflow-hidden rounded-3xl bg-deep-forest shadow-luxury transition-all duration-500 hover:shadow-luxury-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <EstateImage
                      slug={p.slug}
                      alt={p.title}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/45 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-luxury-gold/90 text-deep-forest">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-light text-ivory-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-body text-[0.8rem] font-light leading-relaxed text-ivory-white/75">
                      {p.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-wider text-luxury-gold">
                      Visit
                      <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-ivory-white px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-stone pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-stone sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] text-light-charcoal/50">09</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-editorial">
          <Reveal delay={60}>
            <p className="lux-label">At a Glance</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-forest-green">
              Culture,
              <span className="block italic text-luxury-gold">Close at Hand</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-md font-body text-[0.8rem] font-light text-light-charcoal/70">
              Six ways the district shows up on the estate — the full story
              on each is just below.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((item, idx) => (
              <Reveal key={item.title} delay={160 + idx * 60}>
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-warm-sand">
                    {item.slug ? (
                      <EstateImage
                        slug={item.slug}
                        alt={item.title}
                        sizes="(min-width: 1024px) 30vw, 90vw"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <item.icon className="h-8 w-8 text-forest-green/25" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-start gap-3 border-t border-stone pt-4">
                    <item.icon className="mt-1 h-5 w-5 shrink-0 text-luxury-gold" aria-hidden="true" />
                    <div>
                      <h3 className="font-heading text-base font-medium text-forest-green">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-body text-[0.78rem] font-light leading-[1.6] text-light-charcoal">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-deep-forest px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-ivory-white/25 pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-ivory-white/80">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-ivory-white/25 sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] text-ivory-white/50">10</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-editorial">
          <Reveal delay={80}>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-ivory-white">
              Festivals, Food
              <span className="block italic text-muted-gold">and the Ordinary Day</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {GALLERY.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 120}>
                <div className="lux-frame aspect-[4/3] w-full">
                  <EstateImage
                    slug={item.slug}
                    alt={item.caption}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="isolate"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <span className="font-heading text-xl font-light text-ivory-white">
                      {item.caption}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory-white px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex items-center justify-between gap-6 border-b border-stone pb-4">
            <span className="shrink-0 font-body text-[0.65rem] uppercase tracking-wide text-light-charcoal/70">
              A Living Tradition
            </span>
            <span className="hidden h-px flex-1 bg-stone sm:block" />
            <span className="shrink-0 font-body text-[0.65rem] text-light-charcoal/50">11</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl">
          <Reveal delay={80}>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight text-forest-green">
              Meet the District,
              <span className="block italic text-luxury-gold">Not Just the Estate</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-md font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
              A cultural specialist can build the day around what your party
              wants to see — a temple trail at dawn, a village walk, or an
              evening of local music around the fire.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              to="/enquire"
              className="group flex items-center justify-between rounded-2xl border border-luxury-gold/30 bg-luxury-gold/5 p-6 transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold/10"
            >
              <div>
                <div className="font-body text-[0.7rem] uppercase tracking-wider text-luxury-gold">
                  Primary
                </div>
                <div className="mt-1 font-heading text-lg font-light text-forest-green">
                  Speak to a Cultural Specialist
                </div>
              </div>
              <FaArrowRight className="h-5 w-5 flex-shrink-0 text-luxury-gold transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+917588775757"
              className="group flex items-center justify-between rounded-2xl border border-stone bg-warm-sand p-6 transition-all duration-300 hover:border-luxury-gold/40"
            >
              <div>
                <div className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal/60">
                  Call
                </div>
                <div className="mt-1 font-heading text-lg font-light text-forest-green">
                  +91 75887 75757
                </div>
              </div>
              <FaArrowRight className="h-5 w-5 flex-shrink-0 text-forest-green transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
