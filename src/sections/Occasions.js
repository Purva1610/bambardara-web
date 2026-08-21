import React from 'react';
import { Link } from 'react-router-dom';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const OCCASIONS = [
  {
    slug: 'event-and-cultural-experience-2',
    label: 'Weddings',
    title: 'Terrace Weddings',
    body:
      'Vows on the upper terrace with the whole valley behind you, seating to three hundred, and the entire estate held for one party at a time.',
    capacity: 'Up to 300 guests',
  },
  {
    slug: 'banquet-and-conference-2',
    label: 'Corporate',
    title: 'Offsites & Conferences',
    body:
      'Two open-sided meeting barns with proper connectivity, farm-to-table catering, and adventure built into the afternoons.',
    capacity: '20 – 180 delegates',
  },
  {
    slug: 'event',
    label: 'Seasonal',
    title: 'Harvest Nights',
    body:
      'Each October the village and the estate cook together — bonfires, folk performance, and a feast entirely from that week of picking.',
    capacity: 'Open to residents',
  },
];

export default function Occasions() {
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
              <article className="lux-frame group h-[30rem] w-full">
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
