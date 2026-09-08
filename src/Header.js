import React from 'react';

const Header = () => {
  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Activities', href: '#activities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <span className="text-forest-green text-2xl font-normal font-heading">
            Bambardara Agro Tourism
          </span>
        </div>

        <nav className="flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-forest-green font-medium text-base font-body hover:text-luxury-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center">
          <button
            type="button"
            className="bg-black text-white font-medium py-2 px-6 rounded-none font-body hover:bg-opacity-90 transition-colors"
          >
            Book Your Stay
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
