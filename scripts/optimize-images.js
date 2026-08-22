/**
 * Generates web-sized derivatives of the estate photography.
 *
 * Source files (camera originals, 2-12 MB each) live in public/images/.
 * This script writes resized WebP + JPEG fallbacks into public/images/opt/
 * and keeps two manifests in sync:
 *
 *   public/images/opt/manifest.json  — filename-keyed, for reference
 *   src/images-manifest.json         — slug-keyed, imported by EstateImage
 *
 * Run after adding or replacing estate photos:
 *   node scripts/optimize-images.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, '..', 'public', 'images');
const OUT_DIR = path.join(SRC_DIR, 'opt');

/* Widths cover the layout's real breakpoints: card, half-bleed, full-bleed. */
const WIDTHS = [640, 1280, 1920];
const JPEG_FALLBACK_WIDTH = 1280;

/* Already-derived or non-photographic assets stay untouched. */
const SKIP = new Set(['gate-left.png', 'gate-right.png', 'entrance.png']);

const slugify = (filename) =>
  path
    .basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .filter((f) => !SKIP.has(f))
    .filter((f) => fs.statSync(path.join(SRC_DIR, f)).isFile());

  const manifest = {};
  let srcBytes = 0;
  let outBytes = 0;

  /* "cycling (2).jpg" and "cycling 2.jpg" both slug to "cycling-2"; without a
     guard the second pass would silently overwrite the first's derivatives. */
  const takenSlugs = new Map();
  const uniqueSlug = (file) => {
    const base = slugify(file);
    const seen = takenSlugs.get(base) || 0;
    takenSlugs.set(base, seen + 1);
    return seen === 0 ? base : `${base}-alt${seen}`;
  };

  for (const file of files) {
    const src = path.join(SRC_DIR, file);
    const slug = uniqueSlug(file);
    srcBytes += fs.statSync(src).size;

    const meta = await sharp(src).metadata();
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (widths.length === 0) widths.push(meta.width);

    for (const w of widths) {
      const out = path.join(OUT_DIR, `${slug}-${w}.webp`);
      await sharp(src)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(out);
      outBytes += fs.statSync(out).size;
    }

    /* One JPEG so <picture> has a fallback for anything without WebP. */
    const fallbackWidth = Math.min(JPEG_FALLBACK_WIDTH, meta.width);
    const jpg = path.join(OUT_DIR, `${slug}-${fallbackWidth}.jpg`);
    await sharp(src)
      .rotate()
      .resize({ width: fallbackWidth, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpg);
    outBytes += fs.statSync(jpg).size;

    manifest[file] = { slug, widths, width: meta.width, height: meta.height };
    console.log(`${file} -> ${slug} [${widths.join(', ')}]`);
  }

  /* public/images/opt/manifest.json — filename-keyed */
  fs.writeFileSync(
    path.join(OUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  /* src/images-manifest.json — slug-keyed, imported by EstateImage at build time */
  const slugManifest = {};
  for (const v of Object.values(manifest)) {
    slugManifest[v.slug] = {
      widths: v.widths,
      fallbackWidth: Math.min(JPEG_FALLBACK_WIDTH, v.width),
    };
  }
  const SRC_MANIFEST = path.join(__dirname, '..', 'src', 'images-manifest.json');
  fs.writeFileSync(SRC_MANIFEST, JSON.stringify(slugManifest, null, 2));
  console.log(`Manifest written -> src/images-manifest.json (${Object.keys(slugManifest).length} slugs)`);

  const mb = (b) => `${(b / 1024 / 1024).toFixed(1)}MB`;
  console.log(
    `\n${files.length} images: ${mb(srcBytes)} -> ${mb(outBytes)} ` +
      `(${(100 - (outBytes / srcBytes) * 100).toFixed(1)}% smaller)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
