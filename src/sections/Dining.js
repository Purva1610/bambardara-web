import React from 'react';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';

const TABLES = [
  {
    name: 'The Long Table',
    hours: 'Breakfast · Lunch · Dinner',
    body:
      'One forty-foot table of local teak under an open roof. No menu is printed — the kitchen tells you what came in that morning and cooks it.',
  },
  {
    name: 'The Orchard Kitchen',
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

export default function Dining() {
  return (
    <section id="dining" className="bg-dark-charcoal">
      {/* Full-bleed cinematic band */}
      <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
        <EstateImage
          slug="fine-dining-restaurant-2"
          alt="The Long Table set for dinner at Bambardara"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
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

      {/* Three tables */}
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
