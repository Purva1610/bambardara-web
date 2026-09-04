import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import EstateImage from '../components/shared/EstateImage';
import Reveal from '../components/shared/Reveal';
import SectionHeading from '../components/shared/SectionHeading';
import BoardOfDirectors from '../components/BoardOfDirectors';

const RESIDENCES = [
  {
    slug: 'resort-and-villas-2',
    name: 'The Valley Villas',
    kicker: 'Private pool · 2 bedrooms',
    body:
      'Five stone villas along the upper ridge, each turned a few degrees off its neighbour so no terrace looks onto another. A private plunge pool runs the length of the deck and falls away into the valley.',
    facts: ['1,850 sq ft', 'Sleeps 4', 'Valley-facing'],
    price: '₹34,000',
  },
  {
    slug: 'luxury-hotel-rooms-and-suites-3',
    name: 'Luxury Suites',
    kicker: 'Garden terrace · 1 bedroom',
    body:
      'Set inside the mango orchard, with lime-plaster walls, a deep soaking tub cut from local basalt, and shutters that open onto fruit you are welcome to pick before breakfast.',
    facts: ['940 sq ft', 'Sleeps 2', 'Luxury-facing'],
    price: '₹21,500',
  },
  {
    slug: 'organic-farming-and-farm-stay-3',
    name: 'The Farmhouse Rooms',
    kicker: 'Working farm · 8 rooms',
    body:
      'The original farmhouse, kept as it was and quietly brought up to standard. Guests here wake with the dairy at four if they choose to, and most choose to at least once.',
    facts: ['620 sq ft', 'Sleeps 3', 'Courtyard-facing'],
    price: '₹14,000',
  },
  {
    slug: 'camping-2',
    name: 'Riverside Tented Camp',
    kicker: 'Seasonal · October to March',
    body:
      'Six canvas pavilions on timber platforms at the water line, with proper beds, hot water drawn from the estate boiler, and a fire lit for you at dusk.',
    facts: ['480 sq ft', 'Sleeps 2', 'River-facing'],
    price: '₹11,500',
    customImage: '/images/opt/camp.jpg',
  },
];

const TABLES = [
  {
    name: 'The Long Table',
    hours: 'Breakfast · Lunch · Dinner',
    body:
      'One forty-foot table of local teak under an open roof. No menu is printed — the kitchen tells you what came in that morning and cooks it.',
  },
  {
    name: 'The Luxury Kitchen',
    hours: 'By reservation · Dinner only',
    body:
      'Twelve covers among the fruit trees, lit end to end with lanterns. A seven-course tasting built entirely inside the estate boundary.',
  },
  {
    name: 'The Dairy Counter',
    hours: 'All day',
    body:
      'Cheese, curd and butter made forty metres away, alongside bread from the wood oven and coffee from the western slope.',
  },
];

const DETAILS = [
  { label: 'The Estate', lines: ['Parale Nina Shahuwadi Kolhapur Maharashtra 416 003, India'] },
  { label: 'Reservations', lines: ['+91 7588775757', '+91 9322275757'] },
  { label: 'Correspondence', lines: ['info@bambarddara.com'] },
  { label: 'Arrivals', lines: ['Kolhapur airport, 38 km', 'Helipad on the north field'] },
];

const EXPERIENCES = [
  {
    n: '01',
    slug: 'jungle-safari-and-wild-life',
    title: 'Jungle Safari',
    body: 'Open-top drives into the reserve at first light, with an estate naturalist reading the ground for you.',
  },
  {
    n: '02',
    slug: 'waterfalls-and-nature-trails-3',
    title: 'Waterfall Trails',
    body: 'Three graded walks through the forest, each ending at water. The longest takes a morning.',
  },
  {
    n: '03',
    slug: 'kayaking-3',
    title: 'Kayaking & Boating',
    body: 'Flat water on the reservoir at dawn, when the surface holds the ridge line perfectly still.',
  },
  {
    n: '04',
    slug: 'trekking-2',
    title: 'Ridge Trekking',
    body: 'Guided ascents to the escarpment edge, timed so you are above the cloud when it breaks.',
  },
  {
    n: '05',
    slug: 'rock-climbing-2',
    title: 'Rock Climbing',
    body: 'Bolted routes on estate basalt from grade four upward, with instruction for first-timers.',
  },
  {
    n: '06',
    slug: 'cycling-3',
    title: 'Luxury Cycling',
    body: 'Fourteen kilometres of packed farm track through the plantations and out along the canal.',
  },
  {
    n: '07',
    slug: 'ropeway',
    title: 'The Ropeway',
    body: 'A cable crossing spanning the gorge, dropping you at the far trailhead above the falls.',
  },
  {
    n: '08',
    slug: 'animal-farm-and-dairy-farm-2',
    title: 'Dairy & Animal Farm',
    body: 'The four a.m. milking, the cheese room at nine, and the calves in between. Children rarely leave.',
  },
  {
    n: '09',
    slug: 'helicopter-landing-2',
    title: 'Helicopter Arrivals',
    body: 'A licensed pad on the north field — Mumbai and Pune in well under the hour.',
  },
];

const PLATES = [
  { slug: 'infinity-pool',               alt: 'The infinity pool above the valley',        span: 'md:col-span-2 md:row-span-2' },
  { slug: 'family-fun-and-adventure-3',  alt: 'Family fun and adventure at the estate',    span: 'md:col-span-4 md:row-span-2' },
  { slug: 'trekking',                    alt: 'A guided trek along the escarpment',        span: 'md:col-span-2 md:row-span-2' },
  { slug: 'luxury-hotel-rooms-and-suites-4', alt: 'Interior of an orchard suite',          span: 'md:col-span-2' },

  { slug: 'familiy',                     alt: 'Family fun and hospitality at the estate',  span: 'md:col-span-2' },
  { slug: 'pick',                        alt: 'Family walk through the estate',            span: 'md:col-span-2' },

  { slug: 'meidtation',                  alt: 'Meditation and wellness at the estate',     span: 'md:col-span-2' },
  { slug: 'about',                       alt: 'Mountain valley view from the estate',      span: 'md:col-span-2' },
  { slug: 'water-park-3',                alt: 'The estate water park',                     span: 'md:col-span-2 md:row-span-2' },
  { slug: 'boating',                     alt: 'Boating activities on the estate waters',   span: 'md:col-span-2' },
  { slug: 'cycling',                     alt: 'Cycling through the estate grounds',        span: 'md:col-span-2' },
  { slug: 'nature',                      alt: 'Well-planted roads and natural landscapes', span: 'md:col-span-2' },
];

const MEASURES = [
  { figure: '150', unit: 'Acres', note: 'Luxury, pasture and forest' },
  { figure: '100+', unit: 'Luxury Rooms', note: 'None overlooking another' },
  { figure: '5', unit: 'Star Facilities', note: 'Guided daily from the estate' },
  { figure: '10', unit: 'Activity Zones', note: 'Adventures, farm, spa and wellness' },
];

const OCCASIONS = [
  {
    slug: 'weeding',
    label: 'Weddings',
    title: 'Terrace Weddings',
    body:
      'Vows on the upper terrace with the whole valley behind you, seating to three hundred, and the entire estate held for one party at a time.',
    capacity: 'Up to 300 guests',
  },
  {
    slug: 'conference',
    label: 'Corporate',
    title: 'Offsites & Conferences',
    body:
      'Two open-sided meeting barns with proper connectivity, farm-to-table catering, and adventure built into the afternoons.',
    capacity: '20 – 180 delegates',
  },
  {
    slug: 'seasonal',
    label: 'Seasonal',
    title: 'Harvest Nights',
    body:
      'Each October the village and the estate cook together — bonfires, folk performance, and a feast entirely from that week of picking.',
    capacity: 'Open to residents',
  },
];

const PILLARS = [
  {
    figure: '91%',
    title: 'Grown on site',
    body: 'Of everything served, measured by weight across the last twelve months.',
  },
  {
    figure: '100%',
    title: 'Water returned',
    body: 'Greywater is treated on the estate and put back into the orchard lines.',
  },
  {
    figure: '68',
    title: 'Households employed',
    body: 'All from the three villages inside a four-kilometre radius.',
  },
  {
    figure: 'Zero',
    title: 'Single-use plastic',
    body: 'Removed from guest areas and the back of house in 2022.',
  },
];

const RITUALS = [
  {
    slug: 'international-meditation-center',
    title: 'The Meditation Centre',
    body: 'A domed hall on the quietest corner of the estate. Guided sittings at dawn and dusk, silent access all day.',
  },

  {
    slug: 'infinity-pool-3',
    title: 'The Infinity Pool',
    body: 'Heated to twenty-nine degrees year round, set flush with the ridge so the water meets the valley.',
  },
  {
    slug: 'temple',
    title: 'The Estate Temple',
    body: 'Two hundred years older than anything else here. Morning aarti is open to guests who wish to attend.',
  },
];

function Legacy() {
  return (
    <section id="estate" className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            label="The Estate"
            title={
              <>
                A farm first.
                <span className="block italic text-luxury-gold">
                  A retreat second.
                </span>
              </>
            }
            lede="BAMBARDDARA was planted before it was built. The dairy still runs at four in the morning, the orchards are picked by the families who planted them, and the kitchen takes its list from whatever the fields gave up that day."
          />
          <Reveal delay={300}>
            <p className="mt-7 max-w-prose font-body text-[0.95rem] font-light leading-[1.9] text-light-charcoal">
              What we added was restraint: stone and lime plaster, linen instead of
              polyester, and twenty-four rooms on land that could have held two
              hundred. Nothing here is staged for a photograph, which is exactly
              why it photographs well.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <a href="#stays" className="lux-link mt-12 text-forest-green">
              Explore the residences
            </a>
          </Reveal>
        </div>
        <div className="relative lg:col-span-7">
          <Reveal>
            <div className="lux-frame aspect-[4/5] w-full sm:aspect-[16/11]">
              <EstateImage
                slug="about"
                alt="Mountain valley view from the estate"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="lux-frame absolute -bottom-12 left-6 hidden aspect-[3/4] w-40 border-8 border-ivory-white shadow-2xl md:block lg:-left-14 lg:w-56">
              <EstateImage
                slug="about"
                alt="Morning mist over the estate valley"
                sizes="240px"
                widths={[640, 1280]}
              />
            </div>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto mt-28 max-w-editorial border-t border-stone md:mt-36">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {MEASURES.map((m, i) => (
            <Reveal
              key={m.unit}
              delay={i * 110}
              className={`px-2 py-10 md:px-8 md:py-14 ${
                i % 2 === 1 ? 'border-l' : ''
              } ${i > 1 ? 'border-t lg:border-t-0' : ''} ${
                i > 0 ? 'lg:border-l' : ''
              }`}
            >
              <dt className="font-heading text-5xl font-light text-forest-green md:text-6xl">
                {m.figure}
              </dt>
              <dd className="mt-4">
                <span className="lux-label block">{m.unit}</span>
                <span className="mt-3 block font-body text-[0.8rem] font-light leading-relaxed text-light-charcoal">
                  {m.note}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Accommodation() {
  return (
    <section id="stays" className="bg-warm-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          label="Residences"
          title={
            <>
              Hundred Rooms,
              <span className="block italic text-luxury-gold">
                and a great deal of space between them
              </span>
            </>
          }
          lede="Four kinds of stay across the estate, from the ridge villas down to the tented camp at the river. Rates are nightly for two, inclusive of all meals from the farm."
          align="center"
          className="mb-24 md:mb-32"
        />
        <div className="space-y-24 md:space-y-32">
          {RESIDENCES.map((r, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={r.name}>
                <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div
                    className={`lg:col-span-7 ${
                      flipped ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="lux-frame zoom-hover aspect-[4/3] w-full">
                      {r.customImage ? (
                        <img
                          src={r.customImage}
                          alt={r.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <EstateImage
                          slug={r.slug}
                          alt={r.name}
                          sizes="(min-width: 1024px) 58vw, 100vw"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`lg:col-span-5 ${
                      flipped ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <span className="lux-label">{r.kicker}</span>
                    <h3 className="mt-5 font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight text-forest-green">
                      {r.name}
                    </h3>
                    <span className="lux-rule mt-6" />
                    <p className="mt-6 font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
                      {r.body}
                    </p>
                    <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-stone pt-6">
                      {r.facts.map((f) => (
                        <li
                          key={f}
                          className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
                      <p className="font-body text-[0.8rem] font-light text-light-charcoal">
                        From{' '}
                        <span className="font-heading text-2xl text-forest-green">
                          {r.price}
                        </span>{' '}
                        per night
                      </p>
                      <Link to="/signup" className="lux-link text-forest-green">
                        Enquire
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section
      id="experiences"
      className="bg-deep-forest px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          label="Experiences"
          tone="light"
          title={
            <>
              Journey through a landscape
              <span className="block italic text-muted-gold">
                carved by time and terrain
              </span>
            </>
          }
          lede="Every experience is guided by someone who lives on the estate, capped at small numbers, and included in your stay unless noted otherwise."
          className="mb-20 md:mb-28"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 110}>
              <article className="group">
                <div className="lux-frame zoom-hover aspect-[4/5] w-full">
                  <EstateImage
                    slug={e.slug}
                    alt={e.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="absolute left-6 top-6 font-mono text-[0.7rem] tracking-wider text-muted-gold">
                    {e.n}
                  </span>
                </div>
                <h3 className="mt-7 font-heading text-2xl font-light text-ivory-white">
                  {e.title}
                </h3>
                <span className="mt-4 block h-px w-10 origin-left bg-muted-gold/60 transition-transform duration-700 ease-luxe group-hover:scale-x-[2.4]" />
                <p className="mt-5 font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/60">
                  {e.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-20 border-t border-ivory-white/15 pt-10 text-center font-body text-[0.85rem] font-light text-ivory-white/55">
            Golf, the water park, temple visits and cultural evenings are also
            arranged on request —{' '}
            <a href="#enquire" className="text-muted-gold underline-offset-4 hover:underline">
              speak to the concierge
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Wellness() {
  return (
    <section id="wellness" className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-editorial">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div className="lux-frame aspect-[4/5] w-full">
              <EstateImage
                slug="spa-and-wellness-2"
                alt="Treatment pavilion at the BAMBARDDARA spa"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              label="Wellness"
              title={
                <>
                  Treatments drawn
                  <span className="block italic text-luxury-gold">
                    from the same soil
                  </span>
                </>
              }
              lede="Four treatment pavilions open to the forest on one side. The oils are pressed on the estate, the herbs cut that morning, and the therapists trained in the Kerala tradition."
            />
            <Reveal delay={300}>
              <ul className="mt-12 divide-y divide-stone border-y border-stone">
                {[
                  ['Abhyanga', '90 min', '₹6,500'],
                  ['Estate Herbal Wrap', '60 min', '₹4,800'],
                  ['Valley Sound Bath', '45 min', '₹3,200'],
                ].map(([name, mins, price]) => (
                  <li
                    key={name}
                    className="flex items-baseline justify-between gap-4 py-5"
                  >
                    <span className="font-heading text-xl font-light text-forest-green">
                      {name}
                    </span>
                    <span className="flex items-baseline gap-6">
                      <span className="font-body text-[0.7rem] uppercase tracking-wider text-light-charcoal">
                        {mins}
                      </span>
                      <span className="font-body text-[0.85rem] text-dark-charcoal">
                        {price}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
        <div className="mt-28 grid grid-cols-1 gap-10 md:mt-36 md:grid-cols-3">
          {RITUALS.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <article className="group">
                <div className="lux-frame aspect-[3/4] w-full">
                  <EstateImage
                    slug={r.slug}
                    alt={r.title}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <h3 className="mt-6 font-heading text-xl font-light text-forest-green">
                  {r.title}
                </h3>
                <p className="mt-4 font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
                  {r.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dining() {
  return (
    <section id="dining" className="bg-dark-charcoal">
      <div className="relative h-[60vh] min-h-[380px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <EstateImage
            slug="dining"
            alt="The Long Table set for dinner at BAMBARDDARA"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="lux-scrim absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <span className="lux-label text-muted-gold">Dining</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-7 max-w-3xl text-section font-heading font-light text-ivory-white">
              The menu is written
              <span className="block italic text-muted-gold">
                by whatever the fields gave up
              </span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-ivory-white/75">
              Ninety-one per cent of what reaches the table is grown, grazed or
              pressed within the estate. The remaining nine is salt, coffee and
              things the soil here refuses to give.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto max-w-editorial px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 divide-y divide-ivory-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {TABLES.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 120}
              className="px-0 py-10 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <span className="lux-label text-muted-gold">{t.hours}</span>
              <h3 className="mt-5 font-heading text-2xl font-light text-ivory-white">
                {t.name}
              </h3>
              <p className="mt-5 font-body text-[0.85rem] font-light leading-[1.85] text-ivory-white/60">
                {t.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Occasions() {
  return (
    <section
      id="occasions"
      className="bg-warm-sand px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          label="Occasions"
          title={
            <>
              The estate takes
              <span className="block italic text-luxury-gold">
                one celebration at a time
              </span>
            </>
          }
          lede="Weddings, offsites and harvest gatherings are held on exclusive use. When your party is here, no other guests are."
          align="center"
          className="mb-20 md:mb-28"
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 130}>
              <article className="lux-frame zoom-hover group h-[30rem] w-full">
                <EstateImage
                  slug={o.slug}
                  alt={o.title}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="lux-scrim absolute inset-0" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="lux-label text-muted-gold">{o.label}</span>
                  <h3 className="mt-4 font-heading text-[1.75rem] font-light leading-tight text-ivory-white">
                    {o.title}
                  </h3>
                  <span className="mt-5 block h-px w-10 origin-left bg-muted-gold/70 transition-transform duration-700 ease-luxe group-hover:scale-x-[3]" />
                  <p className="mt-5 font-body text-[0.85rem] font-light leading-[1.8] text-ivory-white/75">
                    {o.body}
                  </p>
                  <span className="mt-6 font-body text-[0.7rem] uppercase tracking-wider text-ivory-white/55">
                    {o.capacity}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <div className="mt-20 text-center">
            <Link to="/signup" className="lux-btn-dark">
              <span>Request a Proposal</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section id="sustainability" className="bg-ivory-white">
      <div className="mx-auto max-w-editorial px-6 pt-28 md:px-10 md:pt-40">
        <SectionHeading
          label="Stewardship"
          title={
            <>
              Luxury that costs
              <span className="block italic text-luxury-gold">
                the valley nothing
              </span>
            </>
          }
          lede="The estate was built to leave the farm more productive than it found it. These are the numbers we publish, and they are audited each March."
          align="center"
          className="mb-20 md:mb-24"
        />
        <dl className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110} className="px-2 md:px-6">
              <dt className="font-heading text-4xl font-light text-luxury-gold md:text-5xl">
                {p.figure}
              </dt>
              <dd className="mt-5">
                <span className="block font-heading text-lg font-light text-forest-green">
                  {p.title}
                </span>
                <span className="mt-3 block font-body text-[0.8rem] font-light leading-[1.8] text-light-charcoal">
                  {p.body}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
      <div className="relative mt-28 h-[60vh] min-h-[360px] w-full overflow-hidden md:mt-36">
        <EstateImage
          slug="sustainable-and-eco-friendly-2"
          alt="Solar arrays and planted avenues across the estate"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep-forest/55" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal>
            <p className="max-w-3xl text-center font-heading text-[clamp(1.4rem,2.6vw,2.25rem)] font-light italic leading-snug text-ivory-white">
              &ldquo;We are tenants here. The farm was working long before the
              first guest arrived, and it will be working long after the last one
              leaves.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GalleryMosaic() {
  return (
    <section id="gallery" className="bg-warm-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          label="Gallery"
          title={
            <>
              The estate,
              <span className="block italic text-luxury-gold">in fragments</span>
            </>
          }
          align="center"
          className="mb-20 md:mb-24"
        />
        <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[11rem] md:grid-cols-6 md:gap-4">
          {PLATES.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 100}
              className={`gallery-tile group ${p.span}`}
            >
              <EstateImage
                slug={p.slug}
                alt={p.alt}
                sizes="(min-width: 768px) 50vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-110"
              />
              <div className="tile-caption">
                <span className="font-body text-xs uppercase tracking-widest text-ivory-white">
                  {p.alt}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Enquiry() {
  return (
    <section id="enquire" className="relative overflow-hidden bg-deep-forest">
      <EstateImage
        slug="waterfall"
        alt=""
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-deep-forest/70" />
      <div className="relative mx-auto max-w-editorial px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="lux-label text-muted-gold">Reservations</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-7 text-section font-heading font-light text-ivory-white">
              The gate opens
              <span className="block italic text-muted-gold">
                every morning at sunrise
              </span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-8 max-w-prose font-body text-[0.95rem] font-light leading-[1.9] text-ivory-white/75">
              Stays, farm days and occasions are booked directly with the estate.
              No agents, no allocation, and never more than one party on exclusive
              use at a time.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-4">
              <Link to="/enquire" className="lux-btn-light">
                <span>Begin an Enquiry</span>
              </Link>
              <a href="tel:+917588775757" className="lux-btn-light">
                <span>Call the Estate</span>
              </a>
            </div>
          </Reveal>
        </div>
        <div className="mt-24 grid grid-cols-1 gap-y-12 border-t border-ivory-white/15 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((d, i) => (
            <Reveal key={d.label} delay={i * 110} className="lg:px-4">
              <span className="lux-label text-muted-gold">{d.label}</span>
              <div className="mt-5 space-y-1">
                {d.lines.map((line, index) => (
                  <p
                    key={`${d.label}-${line}-${index}`}
                    className="font-body text-[0.875rem] font-light leading-relaxed text-ivory-white/70"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Legacy />
      <Accommodation />
      <Experiences />
      <Wellness />
      <Dining />
      <Occasions />
      <Sustainability />
      <GalleryMosaic />
      <BoardOfDirectors />
      <Enquiry />
    </>
  );
}
