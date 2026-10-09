import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';

const MILESTONE_WORD = 'MILESTONES';

const MILESTONES = [
  {
    numeral: '01',
    slug: 'wedding-decor',
    title: 'A Two-Day Destination Wedding',
    location: 'The Upper Terrace',
    body: 'Held the entire estate on exclusive use for a three-hundred-guest wedding — ceremony, sangeet and reception across two days, catered entirely from the estate’s own kitchens.',
  },
  {
    numeral: '02',
    slug: 'co-event',
    title: 'A Leadership Offsite for 180',
    location: 'The Meeting Barns',
    body: 'Ran a three-day corporate offsite across the open-sided meeting barns, with connectivity, catering and adventure activities built into every afternoon.',
  },
  {
    numeral: '03',
    slug: 'harvest-nights',
    title: 'Harvest Night, Village and Estate Together',
    location: 'The Orchard Lawns',
    body: 'Brought the neighbouring village onto the estate for a harvest feast grown entirely that week — bonfires, folk performance, and no guest list at the gate.',
  },
  {
    numeral: '04',
    slug: 'film-shooting',
    title: 'A Silver Jubilee Celebration',
    location: 'The Grand Lawn',
    body: 'Marked twenty-five years of the estate with a single evening for family, staff across three generations, and the households of the surrounding villages.',
  },
  {
    numeral: '05',
    slug: 'wedding-photoshoot',
    title: 'An Intimate Anniversary Dinner',
    location: 'The Riverside Pavilion',
    body: 'Laid a private table for twelve beside the water, plated entirely from that morning’s harvest — no menu card, just what the farm gave up that day.',
  },
  {
    numeral: '06',
    slug: 'birthday-celebration',
    title: 'A Milestone Birthday for Sixty',
    location: 'The Garden Lawn',
    body: 'Turned the garden lawn over to a sixtieth birthday, with a private bar, live music and a menu built entirely around the guest of honour’s own family recipes.',
  },
  {
    numeral: '07',
    slug: 'family-get-together',
    title: 'Three Generations, One Family Reunion',
    location: 'The Farmhouse Courtyard',
    body: 'Hosted a family scattered across three continents for a long weekend of reunion — games on the lawn, a shared table each evening, and the whole estate held just for them.',
  },
];

const ABOUT_COLUMNS = [
  {
    title: 'About the Estate',
    body: 'BAMBARDDARA is a hundred-and-fifty-acre working estate that has hosted private gatherings for two decades, from terrace weddings to corporate offsites. Every occasion is held on exclusive use, seen through by the estate’s own kitchens, grounds team and hospitality staff.',
  },
  {
    title: 'What We Handle',
    body: 'Catering, florals, seating and staffing are all managed directly by the estate. There’s no agent, no vendor list to coordinate — you plan the day with the people who will actually run it.',
  },
  {
    title: 'Our Approach',
    body: 'The whole estate is held for one party at a time, never two events in parallel. The aim is a gathering that feels entirely private and unhurried, shaped around what your occasion actually needs.',
  },
];

const OCCASIONS = [
  {
    slug: 'vows',
    ratio: 'aspect-[4/5]',
    label: 'Weddings',
    title: 'Terrace Weddings',
    body:
      'Vows on the upper terrace with the whole valley behind you, seating to three hundred, and the entire estate held for one party at a time. The kitchens plan the feast around what the farm has that week, and the grounds team clears every trace of the last event before yours arrives.',
    facts: ['Up to 300 guests', 'Exclusive use of the estate', 'In-house catering & florals'],
  },
  {
    slug: 'conference-hall',
    ratio: 'aspect-[3/4]',
    label: 'Corporate',
    title: 'Offsites & Conferences',
    body:
      'Two open-sided meeting barns with proper connectivity, farm-to-table catering, and adventure built into the afternoons. Sessions run in the cool of the morning; the valley trails and the spa take care of the rest of the day.',
    facts: ['20 – 180 delegates', 'AV & high-speed connectivity', 'Team activities on the estate'],
  },
  {
    slug: 'night-harvest',
    ratio: 'aspect-[4/5]',
    label: 'Seasonal',
    title: 'Harvest Nights',
    body:
      'Each October the village and the estate cook together — bonfires, folk performance, and a feast entirely from that week of picking. It isn’t staged for guests; guests are invited into something the estate would be doing anyway.',
    facts: ['Open to residents', 'Late September to November', 'A feast grown that week'],
  },
  {
    slug: 'movie',
    ratio: 'aspect-[3/4]',
    label: 'Production',
    title: 'Movie & Film Shoots',
    body:
      'Waterfalls, forest trails, terraces and a grand old farmhouse, all inside one boundary and available on exclusive use for the length of a shoot — no permissions to chase across multiple landowners, no crowds to clear.',
    facts: ['Full-day & multi-day rates', 'Crew stays on the estate', 'Locations across 150 acres'],
  },
  {
    slug: 'pre-wedding-shoot',
    ratio: 'aspect-[4/5]',
    label: 'Pre-Wedding',
    title: 'Pre-Wedding Shoots',
    tagline: 'Capture your love story in the lap of nature.',
    body:
      'Six kinds of backdrop across one estate — waterfalls, a lakeside deck, garden pavilions, mountain viewpoints, forest trails and a working farmhouse — styled and paced by a couple’s own photographer, drone shoots welcomed, and the grounds cleared for the day.',
    facts: [
      'Waterfalls & Rivers',
      'Lush Green Forests',
      'Lakes & Sunset Points',
      'Heritage & Rustic Zones',
      'Floral Gardens',
      'Adventure & Nature',
    ],
    amenities: [
      'Luxury Stay & Spa',
      'Gourmet Dining',
      'Makeup Room',
      'Changing Rooms',
      'Photography Zones',
      'Drone Shoot Allowed',
      '24x7 Assistance',
      'Ample Parking',
      'Helipad Nearby',
      'Security & Privacy',
    ],
  },
  {
    slug: 'birthday',
    ratio: 'aspect-[3/4]',
    label: 'Celebrations',
    title: 'Birthdays',
    body:
      'A private table, a garden lawn or the whole estate, sized to the occasion — from an intimate dinner for twelve to a milestone birthday for the whole family, menus built around the guest of honour and staffed directly by the estate.',
    facts: ['Any size, private or full estate', 'Menus built around the date', 'No agents, no packages'],
  },
  {
    slug: 'get-together',
    ratio: 'aspect-[4/5]',
    label: 'Reunions',
    title: 'Family Get-Togethers',
    body:
      'A long weekend for a family scattered across cities or continents — games on the lawn, a shared table each evening, and the whole estate held just for them, with nothing to plan once you arrive.',
    facts: ['Multi-day stays welcomed', 'Shared meals, private grounds', 'Activities for every age'],
  },
];

const GALLERY = [
  { slug: 'dining', caption: 'Farm-to-Table Feasts' },
  { slug: 'event-and-cultural-experience', caption: 'Festival Evenings' },
  { slug: 'kolhapuri-food', caption: 'Regional Catering' },
  { slug: 'banquet-and-conference', caption: 'Full Estate Buyouts' },
];

export default function Occasions() {
  const [occasionIdx, setOccasionIdx] = useState(0);
  const activeOccasion = OCCASIONS[occasionIdx];

  const [milestone, setMilestone] = useState(0);
  const active = MILESTONES[milestone];
  const filledLetters = Math.round(
    ((milestone + 1) / MILESTONES.length) * MILESTONE_WORD.length
  );

  /* Advances on its own every 6s. */
  useEffect(() => {
    const id = window.setInterval(() => {
      setMilestone((i) => (i + 1) % MILESTONES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [milestone]);

  return (
    <main className="bg-ivory-white">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-deep-forest">
        <div className="absolute inset-0 isolate">
          <EstateImage
            slug="event"
            alt="A celebration held on exclusive use at BAMBARDDARA"
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-editorial px-6 text-center md:px-10">
          <Reveal>
            <span className="lux-label text-muted-gold">Occasions</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mx-auto mt-6 max-w-3xl font-heading text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.02] text-ivory-white">
              Crafting Events
            </h1>
            <h2 className="mx-auto mt-3 max-w-2xl font-heading text-[clamp(1.85rem,4vw,3rem)] italic font-light leading-tight text-luxury-gold">
              Beyond the ordinary
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-prose font-body text-[1.05rem] font-light leading-[1.9] text-ivory-white/75">
              Weddings, offsites and harvest gatherings are held on exclusive
              use. When your party is here, no other guests are — the estate,
              its kitchens and its grounds team belong entirely to your event.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link to="/enquire" className="lux-btn-light mt-10 inline-flex">
              <span>Request a Proposal</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-warm-sand px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-editorial">
          <Reveal>
            <span className="lux-label text-luxury-gold">We Craft</span>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="mt-6 bg-clip-text font-heading text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(115deg, #A67C52 10%, #D4AF37 35%, #E5C158 50%, #B87333 65%, #8B5A2B 90%)',
              }}
            >
              Not Just an Occasion.
              <br />
              An Experience You'll
              <br />
              Never Forget.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-16 rounded-2xl border border-bronze/40 p-10 md:mt-20 md:p-14">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:divide-x md:divide-bronze/25">
                {ABOUT_COLUMNS.map((col) => (
                  <div key={col.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
                    <div className="flex items-center gap-3">
                      <h3 className="whitespace-nowrap font-body text-[0.8rem] font-semibold uppercase tracking-wider text-bronze">
                        {col.title}
                      </h3>
                      <span className="h-px flex-1 bg-bronze/40" />
                      <span className="h-1.5 w-1.5 flex-shrink-0 rotate-45 border border-bronze/60" />
                    </div>
                    <p className="mt-5 font-body text-[0.85rem] font-light leading-[1.8] text-natural-brown">
                      {col.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="lux-frame aspect-[3/2] w-full">
              <EstateImage
                slug="banquet-and-conference-2"
                alt="A gathering held on the estate grounds"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              label="Exclusive Use"
              title={
                <>
                  No Agents,
                  <span className="block italic text-luxury-gold">No Allocation</span>
                </>
              }
              lede="Every occasion at BAMBARDDARA is booked directly with the estate and held for a single party at a time. There is no second event sharing the grounds, no other guests moving through the background of your photographs — just your gathering, and the hundred and fifty acres around it."
            />
          </div>
        </div>
      </section>

      {/* OCCASION TYPES */}
      <div className="bg-warm-sand">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="7 Ways to Gather"
            title={
              <>
                Built for the
                <span className="block italic text-luxury-gold">Occasion at Hand</span>
              </>
            }
            align="center"
            className="mb-20 md:mb-28"
          />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Index */}
            <div className="lg:col-span-5">
              <ul className="divide-y divide-bronze/20 border-y border-bronze/20">
                {OCCASIONS.map((o, i) => {
                  const isActive = i === occasionIdx;
                  return (
                    <li key={o.slug}>
                      <button
                        type="button"
                        onClick={() => setOccasionIdx(i)}
                        className={`flex w-full items-center gap-5 py-5 text-left transition-colors duration-500 ${
                          isActive ? '' : 'hover:bg-ivory-white/40'
                        }`}
                      >
                        <span
                          className={`font-heading text-lg font-light transition-colors duration-500 ${
                            isActive ? 'text-luxury-gold' : 'text-bronze/40'
                          }`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`flex-1 border-l pl-5 transition-colors duration-500 ${
                            isActive ? 'border-luxury-gold' : 'border-transparent'
                          }`}
                        >
                          <span
                            className={`block font-body text-[0.65rem] uppercase tracking-wider transition-colors duration-500 ${
                              isActive ? 'text-luxury-gold' : 'text-light-charcoal/50'
                            }`}
                          >
                            {o.label}
                          </span>
                          <span
                            className={`mt-1 block font-heading text-xl font-light transition-colors duration-500 md:text-2xl ${
                              isActive ? 'text-forest-green' : 'text-light-charcoal/70'
                            }`}
                          >
                            {o.title}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Detail */}
            <div className="lg:col-span-7">
              <div key={activeOccasion.slug} className="animate-fade-in">
                <div className="lux-frame aspect-[16/10] w-full">
                  <EstateImage
                    slug={activeOccasion.slug}
                    alt={activeOccasion.title}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                </div>
                {activeOccasion.tagline && (
                  <p className="mt-5 font-heading text-lg italic font-light text-luxury-gold">
                    {activeOccasion.tagline}
                  </p>
                )}
                <p className="mt-4 font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
                  {activeOccasion.body}
                </p>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-stone pt-6">
                  {activeOccasion.facts.map((f) => (
                    <li
                      key={f}
                      className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                {activeOccasion.amenities && (
                  <div className="mt-6 border-t border-stone pt-6">
                    <span className="lux-label">Premium Facilities</span>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {activeOccasion.amenities.map((a) => (
                        <li
                          key={a}
                          className="rounded-full border border-luxury-gold/40 px-3.5 py-1.5 font-body text-[0.65rem] uppercase tracking-wider text-forest-green"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className="bg-forest-green">
        <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="From Past Occasions"
            title={
              <>
                A Thousand Small Details,
                <span className="block italic text-muted-gold">Never the Same Twice</span>
              </>
            }
            align="center"
            tone="light"
            className="mb-16 md:mb-20"
          />
          <div className="grid grid-cols-1 gap-4 sm:h-[34rem] sm:grid-cols-4 sm:grid-rows-2 sm:[&>*:first-child]:col-span-2 sm:[&>*:first-child]:row-span-2 sm:[&>*:nth-child(2)]:col-span-2">
            {GALLERY.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 120} className="h-full">
                <div className="lux-frame h-full min-h-[12rem] w-full">
                  <EstateImage
                    slug={item.slug}
                    alt={item.caption}
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="isolate h-full w-full object-cover"
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
      </div>

      {/* MILESTONES */}
      <section className="relative overflow-hidden bg-warm-sand px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-editorial">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr_auto] md:items-start">
            {/* Numeral */}
            <span className="font-heading text-[3rem] font-light leading-none text-bronze md:text-[4rem]">
              {active.numeral}
            </span>

            {/* Photo */}
            <div key={active.slug} className="animate-slide-in overflow-hidden">
              <div className="lux-frame aspect-[16/9] w-full">
                <EstateImage
                  slug={active.slug}
                  alt={active.title}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="isolate"
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-light text-forest-green md:text-[1.85rem]">
                    {active.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.85rem] font-light text-bronze">
                    {active.location}
                  </p>
                </div>
                <p className="max-w-sm font-body text-[0.85rem] font-light leading-relaxed text-light-charcoal">
                  {active.body}
                </p>
              </div>

            </div>

            {/* Vertical MILESTONES word, filling letter by letter */}
            <div
              className="hidden select-none flex-col items-center gap-1 justify-self-center md:flex"
              aria-hidden="true"
            >
              {MILESTONE_WORD.split('').map((letter, i) => (
                <span
                  key={i}
                  className={`font-heading text-2xl font-light leading-none transition-colors duration-700 ${
                    i < filledLetters ? 'text-bronze' : 'text-bronze/20'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-deep-forest px-6 py-24 md:px-10 md:py-32">
        <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-luxury-gold/40 md:left-10 md:top-10" />
        <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2 border-luxury-gold/40 md:right-10 md:top-10" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-luxury-gold/40 md:bottom-10 md:left-10" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-luxury-gold/40 md:bottom-10 md:right-10" />

        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="lux-label text-muted-gold">Plan Your Occasion</span>
            <h2 className="mt-6 font-heading text-[clamp(1.85rem,4vw,3rem)] font-light leading-tight text-ivory-white">
              Let's Build the
              <span className="block italic text-luxury-gold">Day Around You</span>
            </h2>
            <p className="mx-auto mt-8 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-ivory-white/70">
              An events specialist can walk through dates, capacity and
              catering for your wedding, offsite or gathering — no agents, no
              package deals, just the estate’s own team.
            </p>
            <p className="mx-auto mt-4 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-ivory-white/70">
              The whole estate is held on exclusive use for your party alone,
              from the first enquiry to the last guest leaving.
            </p>
            <Link
              to="/enquire"
              className="mt-10 inline-flex rounded-full border border-ivory-white/50 px-10 py-4 font-body text-[0.7rem] uppercase tracking-[0.2em] text-ivory-white transition-colors duration-500 hover:bg-ivory-white/10"
            >
              Speak to an Events Specialist
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
