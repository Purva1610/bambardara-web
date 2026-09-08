import React from 'react';

const Footer = () => {
  return (
    <footer
      id="contact"
      className="relative text-ivory-white py-12 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer.jpg')" }}
    >
      <div className="absolute inset-0 bg-dark-charcoal/80"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-normal font-heading text-luxury-gold mb-4">Bambardara Agro Tourism</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              A serene retreat nestled in the heart of Western Ghats, offering luxury accommodation, wildlife adventures, wellness experiences, and unforgettable family holidays.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-heading text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">About Us</a></li>
              <li><a href="#activities" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">Activities</a></li>
              <li><a href="#gallery" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-sm text-gray-300 hover:text-luxury-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-heading text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Parale Ninai, Kolhapur</li>
              <li>Maharashtra, India</li>
              <li>Email: contact@bambardara.com</li>
              <li>Phone: +91 12345 67890</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2026 Bambardara Agro Tourism. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
