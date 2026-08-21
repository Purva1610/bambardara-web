import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const navLinks = [
    { name: 'Estate', hash: '#estate' },
    { name: 'Residences', hash: '#stays' },
    { name: 'Experiences', hash: '#experiences' },
    { name: 'Dining', hash: '#dining' },
    { name: 'Occasions', hash: '#occasions' },
    { name: 'Gallery', hash: '#gallery' },
    { name: 'Investment', href: '/investment' },
    { name: 'Membership', href: '/membership' },
  ];

  const getHref = (link) => {
    if (link.href) return link.href;
    return isHome ? link.hash : `/${link.hash}`;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-forest-green text-2xl font-normal font-heading">
            BAMBARDARA
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-forest-green font-medium text-base font-body hover:text-luxury-gold transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={getHref(link)}
                className="text-forest-green font-medium text-base font-body hover:text-luxury-gold transition-colors"
              >
                {link.name}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              type="button"
              onClick={onLogout}
              className="text-forest-green font-medium text-base font-body hover:text-luxury-gold transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-forest-green font-medium text-base font-body hover:text-luxury-gold transition-colors"
            >
              Sign In
            </Link>
          )}
          <Link
            to="/enquire"
            className="bg-black text-white font-medium py-2 px-6 rounded-none font-body hover:bg-opacity-90 transition-colors"
          >
            Enquire
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
