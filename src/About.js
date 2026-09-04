import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 px-4 text-center bg-ivory-white">
      <h2 className="text-3xl font-bold text-forest-green mb-4 font-heading">About Bambardara</h2>
      <p className="max-w-2xl mx-auto leading-relaxed font-body text-dark-charcoal mb-8">
        Bambardara Agro Tourism is a serene retreat nestled in the heart of Western Ghats, offering luxury accommodation, wildlife adventures, wellness experiences, organic farming, and unforgettable family holidays.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <img
          src="/images/wakeup.jpg"
          alt="Wakeup View"
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        <img
          src="/images/about.jpg"
          alt="About Bambardara"
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default About;
