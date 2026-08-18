import React from 'react';

const Gallery = () => {
  const images = [
    'https://via.placeholder.com/400x300.png?text=Farm+View',
    'https://via.placeholder.com/400x300.png?text=Cottage',
    'https://via.placeholder.com/400x300.png?text=Fresh+Produce',
    'https://via.placeholder.com/400x300.png?text=Happy+Guests',
  ];

  return (
    <section id="gallery" className="py-16 px-4 text-center bg-ivory-white">
      <h2 className="text-3xl font-bold text-forest-green mb-8 font-heading">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-sm border-2 border-luxury-gold"
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
