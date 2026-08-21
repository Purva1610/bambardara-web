import React from 'react';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const RITUALS = [
  {
    slug: 'international-meditation-center-2',
    title: 'The Meditation Centre',
    body: 'A domed hall on the quietest corner of the estate. Guided sittings at dawn and dusk, silent access all day.',
  },
  {
    slug: 'infinity-pool-3',
    title: 'The Infinity Pool',
    body: 'Heated to twenty-nine degrees year round, set flush with the ridge so the water meets the valley.',
  },
  {
    slug: 'temple-and-spiritual-experience-2',
    title: 'The Estate Temple',
    body: 'Two hundred years older than anything else here. Morning aarti is open to guests who wish to attend.',
  },
];

export default function Wellness() {
  return (
    <section id="wellness" className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-editorial">
        {/* Feature: the spa */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div className="lux-frame aspect-[4/5] w-full">
              <EstateImage
                slug="spa-and-wellness-2"
                alt="Treatment pavilion at the Bambardara spa"
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

        {/* Three rituals */}
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
