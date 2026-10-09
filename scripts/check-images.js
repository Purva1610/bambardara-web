/**
 * Verifies every image slug referenced anywhere in src/ against
 * src/images-manifest.json, and every manifest entry against the actual
 * files in public/images/opt/ (or public/<src> for custom-src entries).
 *
 * This exists because the manifest is a git-tracked JSON file that a second
 * agent/session working on this repo concurrently can silently overwrite
 * with a stale copy — the images themselves stay on disk, untouched, but
 * EstateImage can no longer find their manifest entry and renders nothing.
 * That happened on 2026-09-21: the manifest dropped from 127 to 81 keys
 * with no trace in `git status` (it's a tracked-file content overwrite, not
 * a deletion), and the only sign was images vanishing from the live site.
 *
 * Run manually with `npm run check-images`. It also runs automatically
 * before every `npm run build` (see the "prebuild" script in package.json),
 * so a corrupted manifest fails the build loudly instead of shipping a
 * broken site.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');
const OPT = path.join(PUBLIC, 'images', 'opt');
const MANIFEST_PATH = path.join(SRC, 'images-manifest.json');

function walkJsFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJsFiles(full, files);
    else if (/\.jsx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

// Route-slug false positives: string values that look like image slugs
// (used with the same `slug:`/`image:` key names) but are actually URL path
// segments, not references to images-manifest.json entries.
const IGNORE = new Set(['villas', 'suites', 'farm-stay', 'tent', 'Villa', 'Suite', 'Tent', 'plan']);

function collectSlugRefs() {
  const files = walkJsFiles(SRC);
  const refs = new Map();

  const patterns = [
    /slug=\{?['"`]([a-zA-Z0-9_-]+)['"`]\}?/g,
    /slug:\s*['"`]([a-zA-Z0-9_-]+)['"`]/g,
    /image:\s*['"`]([a-zA-Z0-9_-]+)['"`]/g,
    /heroSlug:\s*['"`]([a-zA-Z0-9_-]+)['"`]/g,
  ];

  const record = (slug, file, index, content) => {
    if (IGNORE.has(slug)) return;
    const line = content.slice(0, index).split('\n').length;
    if (!refs.has(slug)) refs.set(slug, []);
    refs.get(slug).push(`${path.relative(SRC, file)}:${line}`);
  };

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of patterns) {
      let m;
      pattern.lastIndex = 0;
      while ((m = pattern.exec(content))) record(m[1], file, m.index, content);
    }
    const galleryPattern = /gallery:\s*\[([^\]]*)\]/g;
    let gm;
    while ((gm = galleryPattern.exec(content))) {
      const itemPattern = /['"`]([a-zA-Z0-9_-]+)['"`]/g;
      let im;
      while ((im = itemPattern.exec(gm[1]))) record(im[1], file, gm.index, content);
    }
  }
  return refs;
}

function filesForEntry(slug, info) {
  if (info.src) return [path.join(PUBLIC, info.src.replace(/^\//, ''))];
  const paths = [];
  for (const w of info.widths || []) paths.push(path.join(OPT, `${slug}-${w}.webp`));
  if (info.fallbackWidth != null) paths.push(path.join(OPT, `${slug}-${info.fallbackWidth}.jpg`));
  return paths;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const refs = collectSlugRefs();

  const missingFromManifest = [];
  const missingFiles = [];

  for (const [slug, locations] of refs) {
    const info = manifest[slug];
    if (!info) {
      missingFromManifest.push({ slug, locations });
      continue;
    }
    const absent = filesForEntry(slug, info).filter((p) => !fs.existsSync(p));
    if (absent.length) missingFiles.push({ slug, locations, absent });
  }

  if (missingFromManifest.length === 0 && missingFiles.length === 0) {
    console.log(`check-images: OK — ${refs.size} referenced slugs, all present in the manifest with backing files on disk.`);
    return;
  }

  console.error('check-images: FOUND PROBLEMS\n');

  if (missingFromManifest.length) {
    console.error(`${missingFromManifest.length} slug(s) referenced in code but missing from images-manifest.json:\n`);
    for (const { slug, locations } of missingFromManifest) {
      console.error(`  "${slug}"  used at ${locations.join(', ')}`);
    }
    console.error('');
  }

  if (missingFiles.length) {
    console.error(`${missingFiles.length} slug(s) in the manifest with missing backing file(s):\n`);
    for (const { slug, locations, absent } of missingFiles) {
      console.error(`  "${slug}"  missing: ${absent.map((p) => path.relative(ROOT, p)).join(', ')}`);
      console.error(`    used at ${locations.join(', ')}`);
    }
    console.error('');
  }

  console.error(
    'If this manifest was recently a lot bigger, check `git diff src/images-manifest.json` —\n' +
    'a concurrent session may have overwritten it with a stale copy. The image files\n' +
    'themselves are usually still on disk; `git checkout -- src/images-manifest.json`\n' +
    '(or restoring from an earlier commit) is often enough to fix it.'
  );

  process.exitCode = 1;
}

main();
