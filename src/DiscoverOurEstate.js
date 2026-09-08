import React from 'react';

const DiscoverOurEstate = () => {
  const cards = [
    {
      title: 'Luxury Living',
      tag: 'Resorts & Villas',
      tagStyle: 'bg-white text-dark-charcoal',
      subtext: '',
      img: '/images/luxury hotel rooms and suites.jpg',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Thrilling Adventures',
      tag: '',
      tagStyle: '',
      subtext: 'Safaris, ropeways, and water parks.',
      img: '/images/jungle safari and wildlife.jpg',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Wellness & Spirit',
      tag: '',
      tagStyle: '',
      subtext: 'Find peace at our Meditation Center.',
      img: '/images/international meditation center.jpg',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Integrated Farming',
      tag: 'Farming & Sustainability',
      tagStyle: 'bg-amber-500 text-white',
      subtext: 'Return to roots with hands-on organic farming and dairy experiences.',
      img: '/images/organic farming and farm stay.jpg',
      colSpan: 'md:col-span-2',
    },
  ];

  return (
    <section className="py-16 px-0 bg-ivory-white">
      <div className="max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-normal mb-3 font-heading text-forest-green">
            Discover Our Estate
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative h-[350px] rounded-2xl overflow-hidden group hover:scale-[1.01] transition-transform duration-500 ease-out shadow-lg`}
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left text-white">
                {card.tag && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-body mb-3 w-fit ${card.tagStyle}`}>
                    {card.tag}
                  </span>
                )}
                <h3 className="text-2xl font-semibold mb-2 font-heading">{card.title}</h3>
                {card.subtext && (
                  <p className="text-sm font-body leading-relaxed opacity-90">{card.subtext}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverOurEstate;
