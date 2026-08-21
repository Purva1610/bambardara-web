import React from 'react';

/**
 * Renders estate photography from the optimized derivatives written by
 * scripts/optimize-images.js. Slugs and available widths come from
 * public/images/opt/manifest.json — pass `widths` when an image is smaller
 * than the default ladder.
 */
const OPT = `${process.env.PUBLIC_URL}/images/opt`;
const DEFAULT_WIDTHS = [640, 1280, 1920];

export default function EstateImage({
  slug,
  alt,
  widths = DEFAULT_WIDTHS,
  sizes = '100vw',
  className = '',
  priority = false,
}) {
  /* Mirrors the script's JPEG fallback: min(1280, sourceWidth). */
  const fallback = widths.includes(1280) ? 1280 : widths[widths.length - 1];

  return (
    /* display:contents so <picture> never interferes with the frame's layout. */
    <picture className="contents">
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={widths.map((w) => `${OPT}/${slug}-${w}.webp ${w}w`).join(', ')}
      />
      <img
        src={`${OPT}/${slug}-${fallback}.jpg`}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  );
}
