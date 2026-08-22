import React from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import EstateImage from './EstateImage';

const directors = [
  {
    name: 'Prakash Pawar',
    title: 'Board Member',
    bio: 'Prakash brings extensive expertise and visionary leadership to the board, driving strategic initiatives and sustainable growth across the estate.',
    image: '/images/opt/pawar-477.jpg',
  },
  {
    name: 'Prakash Patil',
    title: 'Board Member',
    bio: 'Prakash contributes valuable insights and strategic direction, leveraging his deep industry knowledge and experience to shape our future.',
    image: '/images/opt/prakash.jpg',
  },
];

const BoardOfDirectors = () => {
  return (
    <section className="bg-ivory-white px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          label="Leadership"
          title={
            <>
              The Board
              <span className="block italic text-luxury-gold">of Directors</span>
            </>
          }
          lede="Guiding the vision and values that define BAMBARDDARA"
          align="center"
          className="mb-24 md:mb-32"
        />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24 auto-rows-max">
          {directors.map((director, index) => (
            <Reveal key={director.name} delay={index * 150}>
              <article className="group flex flex-col h-full">
                <div className="lux-frame zoom-hover w-full max-w-md mx-auto mb-8 border border-luxury-gold p-3 flex-shrink-0">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="h-96 w-full object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="lux-label">{director.title}</span>
                  <h3 className="mt-5 font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-light leading-tight text-forest-green">
                    {director.name}
                  </h3>
                  <span className="lux-rule mt-6" />
                  <p className="mt-8 font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
                    {director.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
