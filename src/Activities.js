import React from 'react';

const Activities = () => {
  const activities = [
    { name: 'Organic Farming', description: 'Get your hands dirty and learn about sustainable farming practices.' },
    { name: 'Tractor Rides', description: 'Enjoy a fun and bumpy ride through the lush green fields.' },
    { name: 'Bird Watching', description: 'Discover the diverse local bird species in their natural habitat.' },
    { name: 'Stargazing', description: 'Witness the breathtaking beauty of the night sky, away from city lights.' },
  ];

  return (
    <section id="activities" className="py-16 px-4 text-center bg-dark-charcoal">
      <h2 className="text-3xl font-bold text-ivory-white mb-8 font-heading">Our Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-6xl mx-auto">
        {activities.map(activity => (
          <div key={activity.name} className="p-6 border border-luxury-gold rounded-lg bg-ivory-white shadow-sm">
            <h3 className="text-lg font-semibold text-forest-green mb-2 font-heading">{activity.name}</h3>
            <p className="text-sm text-dark-charcoal font-body">{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
