import React from 'react';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

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
    title: 'Orchard Cycling',
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

export default function Experiences() {
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
              Days assembled from
              <span className="block italic text-muted-gold">
                dirt, altitude and water
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
                <div className="lux-frame aspect-[4/5] w-full">
                  <EstateImage
                    slug={e.slug}
                    alt={e.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="lux-scrim-soft pointer-events-none absolute inset-0" />
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
