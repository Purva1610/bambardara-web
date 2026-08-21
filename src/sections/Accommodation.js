import React from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

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
    name: 'Orchard Suites',
    kicker: 'Garden terrace · 1 bedroom',
    body:
      'Set inside the mango orchard, with lime-plaster walls, a deep soaking tub cut from local basalt, and shutters that open onto fruit you are welcome to pick before breakfast.',
    facts: ['940 sq ft', 'Sleeps 2', 'Orchard-facing'],
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
  },
];

export default function Accommodation() {
  return (
    <section id="stays" className="bg-warm-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          label="Residences"
          title={
            <>
              Twenty-four rooms,
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
                    <div className="lux-frame aspect-[4/3] w-full">
                      <EstateImage
                        slug={r.slug}
                        alt={r.name}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                      />
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
