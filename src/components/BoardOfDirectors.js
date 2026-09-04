import React from 'react';
import Reveal from './shared/Reveal';
import SectionHeading from './shared/SectionHeading';

const directors = [
  {
    name: 'Mr Santosh Navale',
    title: 'Chairman & Founder',
    bio: 'Santosh brings extensive expertise and visionary leadership to the board, driving strategic initiatives and sustainable growth across the estate. With over 25 years in hospitality and real estate development.',
    image: '/images/opt/chairman.jpeg',
  },
  {
    name: 'Prakash Patil',
    title: 'Director',
    bio: 'Prakash contributes valuable insights and strategic direction, leveraging his deep industry knowledge and experience to shape our future. Specializes in luxury resort operations and guest experience excellence.',
    image: '/images/opt/patil.jpeg',
  },
  {
    name: 'Prakash Pawar',
    title: 'Director',
    bio: 'Prakash oversees daily operations and implements innovative hospitality solutions. His expertise in sustainable tourism and community development has transformed Bambarddara into a premier destination.',
    image: '/images/opt/pawar.jpeg',
  },
  {
    name: 'Mr Krushnath Sutar',
    title: 'Director',
    bio: 'Krushnath ensures financial excellence and strategic investments with his extensive background in corporate finance. He brings fiscal discipline and growth-oriented strategies to the board.',
    image: '/images/opt/Krushnath.jpeg',
  },
  {
    name: 'Mr Suhas Kadam',
    title: 'Director',
    bio: 'Suhas leads operational excellence across all estate facilities. His commitment to quality standards and safety protocols ensures world-class guest experiences and staff development.',
    image: '/images/opt/Sushas.jpeg',
  },
  {
    name: 'Mr Sachin Choughule',
    title: 'Director',
    bio: "Sachin drives brand positioning and strategic partnerships. His innovative marketing campaigns and digital strategies have elevated Bambarddara's presence in luxury travel markets globally.",
    image: '/images/opt/sachin.jpeg',
  },
  {
    name: 'Mr Maruti More',
    title: 'Director',
    bio: 'Maruti spearheads infrastructure expansion and estate development projects. His architectural vision and sustainable design principles ensure Bambarddara grows while preserving natural beauty.',
    image: '/images/opt/maruti.jpeg',
  },
  {
    name: 'Mr Dilip Ghavale',
    title: 'Director',
    bio: 'Dilip champions exceptional guest experiences and service excellence. His background in international hospitality brings world-class standards and personalized care to every visitor.',
    image: '/images/opt/dilip.jpeg',
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

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16 auto-rows-max">
          {directors.map((director, index) => (
            <Reveal key={director.name} delay={index * 100}>
              <article className="group flex flex-col h-full">
                <div className="lux-frame zoom-hover w-full mx-auto mb-6 border border-luxury-gold p-2 flex-shrink-0">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="h-72 w-full object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="lux-label text-xs">{director.title}</span>
                  <h3 className="mt-4 font-heading text-[clamp(1.25rem,2vw,1.5rem)] font-light leading-tight text-forest-green">
                    {director.name}
                  </h3>
                  <span className="lux-rule mt-4" />
                  <p className="mt-6 font-body text-[0.8rem] font-light leading-[1.7] text-light-charcoal">
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
