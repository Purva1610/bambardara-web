import React from 'react';
import EstateImage from './EstateImage';
import Reveal from './Reveal';

const CARDS = [
  {
    title: 'Luxury Living',
    tag: 'Resorts & Villas',
    tagStyle: 'bg-white text-dark-charcoal',
    subtext: '',
    slug: 'resort-and-villas-3',
    colSpan: 'md:col-span-2',
  },
  {
    title: 'Thrilling Adventures',
    tag: '',
    tagStyle: '',
    subtext: 'Safaris, ropeways, and water parks.',
    slug: 'jungle-safari-and-wild-life',
    colSpan: 'md:col-span-1',
  },
  {
    title: 'Wellness & Spirit',
    tag: '',
    tagStyle: '',
    subtext: 'Find peace at our Meditation Center.',
    slug: 'international-meditation-center',
    colSpan: 'md:col-span-1',
  },
  {
    title: 'Integrated Farming',
    tag: 'Farming & Sustainability',
    tagStyle: 'bg-amber-500 text-white',
    subtext: 'Return to roots with hands-on organic farming and dairy experiences.',
    slug: 'organic-farming-and-farm-stay-3',
    colSpan: 'md:col-span-2',
  },
];

export default function DiscoverOurEstate() {
  return (
    <section className="bg-ivory-white py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <div className="text-center mb-16">
          <Reveal delay={0}>
            <h2 className="text-section font-heading font-light text-forest-green">
              Escape Into Luxury
            </h2>
          </Reveal>
           <span className="lux-rule mt-6 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 120}>
              <div
                className={`group relative h-[380px] overflow-hidden rounded-2xl shadow-lg ${
                  card.colSpan
                }`}
              >
                <EstateImage
                  slug={card.slug}
                  alt={card.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 group-hover:from-black/90" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left text-white">
                  {card.tag && (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-body mb-3 w-fit ${
                        card.tagStyle
                      }`}
                    >
                      {card.tag}
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold mb-2 font-heading">
                    {card.title}
                  </h3>
                  {card.subtext && (
                    <p className="text-sm font-body leading-relaxed opacity-90">
                      {card.subtext}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
