import React from 'react';
import EstateImage from '../components/EstateImage';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

/* Spans are set so each pair of rows closes out the six-column grid exactly. */
const PLATES = [
  { slug: 'infinity-pool', alt: 'The infinity pool above the valley', span: 'md:col-span-2 md:row-span-2' },
  { slug: 'boating', alt: 'Boats on the estate reservoir at dawn', span: 'md:col-span-4 md:row-span-2' },
  { slug: 'trekking', alt: 'A guided trek along the escarpment', span: 'md:col-span-2 md:row-span-2' },
  { slug: 'luxury-hotel-rooms-and-suites-4', alt: 'Interior of an orchard suite', span: 'md:col-span-2' },
  { slug: 'well-planted-roads-and-street-lights', alt: 'Planted avenue through the estate', span: 'md:col-span-2' },
  { slug: '5-star-hospitality-2', alt: 'Evening service on the terrace', span: 'md:col-span-2' },
  { slug: 'family-fun-and-adventure-2', alt: 'Families on the estate lawns', span: 'md:col-span-2' },
  { slug: 'temple', alt: 'The two-hundred-year-old estate temple', span: 'md:col-span-4 md:row-span-2' },
  { slug: 'water-park-3', alt: 'The estate water park', span: 'md:col-span-2 md:row-span-2' },
];

export default function GalleryMosaic() {
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
              className={`lux-frame ${p.span}`}
            >
              <EstateImage
                slug={p.slug}
                alt={p.alt}
                sizes="(min-width: 768px) 50vw, 50vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
