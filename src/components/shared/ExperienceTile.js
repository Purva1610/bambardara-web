import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import EstateImage from './EstateImage';

/**
 * Activity card used on the /experiences/:type catalogue pages. Links
 * through to the activity's own gallery/amenities/booking page.
 *
 * `variant="overlay"` is the compact card used inside the dark "Wonders Of
 * Nature" panel — image, pin icon, title and one-line description all
 * layered on the photo itself. The default `variant="editorial"` is the
 * fuller card (numbered corner, category label, description below the
 * image) used everywhere else on the site.
 */
export default function ExperienceTile({ experience, index, variant = 'editorial' }) {
  if (variant === 'overlay') {
    return (
      <Link
        to={`/experience/${experience.id}`}
        className="group relative block aspect-[3/4] w-full overflow-hidden"
      >
        <EstateImage
          slug={experience.gallery[0]}
          alt={experience.title}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="isolate h-full w-full object-cover transition-transform duration-700 ease-luxe group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(6,10,8,0.9) 0%, rgba(6,10,8,0.35) 45%, transparent 75%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-1.5 text-muted-gold">
            <FaMapMarkerAlt className="h-3 w-3" />
            <h3 className="font-body text-sm font-semibold text-ivory-white">
              {experience.title}
            </h3>
          </div>
          <p className="mt-1 font-body text-xs font-light leading-snug text-ivory-white/70 line-clamp-2">
            {experience.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link to={`/experience/${experience.id}`} className="block">
        <div className="lux-frame zoom-hover aspect-[4/5] w-full">
          <EstateImage
            slug={experience.gallery[0]}
            alt={experience.title}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <span className="absolute left-6 top-6 font-mono text-[0.7rem] tracking-wider text-muted-gold">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <span className="mt-7 block lux-label">{experience.category}</span>
        <h3 className="mt-3 font-heading text-2xl font-light text-forest-green">
          {experience.title}
        </h3>
        <span className="mt-4 block h-px w-10 origin-left bg-luxury-gold/60 transition-transform duration-700 ease-luxe group-hover:scale-x-[2.4]" />
        <p className="mt-5 font-body text-[0.85rem] font-light leading-[1.85] text-light-charcoal">
          {experience.description}
        </p>
        <span className="lux-link mt-5 inline-block text-forest-green">View Details</span>
      </Link>
    </article>
  );
}
