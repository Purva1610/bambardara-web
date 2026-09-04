import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found — shown for any route that doesn't match.
 * Styled to match the BAMBARDDARA estate brand.
 */
const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory-white px-6 py-32 text-center">
      {/* Estate monogram */}
      <span className="font-heading text-6xl font-light italic text-luxury-gold select-none">
        B
      </span>

      {/* Rule */}
      <span className="mt-8 block h-px w-16 bg-luxury-gold" />

      {/* Label */}
      <span className="mt-8 lux-label text-light-charcoal">
        Page not found
      </span>

      {/* Heading */}
      <h1 className="mt-5 font-heading text-[clamp(3rem,8vw,6rem)] font-light leading-none text-dark-charcoal">
        404
      </h1>

      {/* Copy */}
      <p className="mt-8 max-w-prose font-body text-[0.9rem] font-light leading-[1.9] text-light-charcoal">
        The page you are looking for has moved, been removed, or perhaps never
        existed. The estate is still here — return to the main house and we will
        help you find your way.
      </p>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link to="/" className="lux-btn-dark">
          <span>Return to the estate</span>
        </Link>
        <Link
          to="/enquire"
          className="font-body text-[0.825rem] font-light text-light-charcoal underline-offset-4 hover:underline"
        >
          Send an enquiry
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
