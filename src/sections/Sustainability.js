import React from 'react';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

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

export default function Sustainability() {
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

      {/* Full-bleed closing band */}
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
