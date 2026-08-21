import React from 'react';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const MEASURES = [
  { figure: '42', unit: 'Acres', note: 'Orchard, pasture and forest' },
  { figure: '24', unit: 'Villas & Suites', note: 'None overlooking another' },
  { figure: '30', unit: 'Experiences', note: 'Guided daily from the estate' },
  { figure: '10', unit: 'Nations', note: 'Guests received last season' },
];

export default function Legacy() {
  return (
    <section id="estate" className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Copy */}
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
            lede="Bambardara was planted before it was built. The dairy still runs at four in the morning, the orchards are picked by the families who planted them, and the kitchen takes its list from whatever the fields gave up that day."
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

        {/* Overlapping plates */}
        <div className="relative lg:col-span-7">
          <Reveal>
            <div className="lux-frame aspect-[4/5] w-full sm:aspect-[16/11]">
              <EstateImage
                slug="legacy"
                alt="Terraced fields and orchards across the Bambardara estate"
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

      {/* Measures */}
      <div className="mx-auto mt-28 max-w-editorial border-t border-stone md:mt-36">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {MEASURES.map((m, i) => (
            <Reveal
              key={m.unit}
              delay={i * 110}
              className={`border-stone px-2 py-10 md:px-8 md:py-14 ${
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
