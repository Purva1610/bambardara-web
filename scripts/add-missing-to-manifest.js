/**
 * Adds missing image slugs that exist in public/images/opt/ to the manifest
 */
const fs = require('fs');
const path = require('path');

const OPT = path.join(__dirname, '..', 'public', 'images', 'opt');
const MANIFEST_PATH = path.join(__dirname, '..', 'src', 'images-manifest.json');

// Read current manifest
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// Get all files in opt
const optFiles = fs.readdirSync(OPT).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp'));

// Group by slug
const slugFiles = new Map();
for (const file of optFiles) {
  const match = file.match(/^(.+?)-(\d+|opt)\.(jpg|jpeg|png|webp)$/);
  if (match) {
    const slug = match[1];
    if (!slugFiles.has(slug)) slugFiles.set(slug, []);
    slugFiles.get(slug).push(file);
  } else {
    // Files with custom src paths (no width suffix)
    const slug = path.basename(file, path.extname(file));
    if (!slugFiles.has(slug)) slugFiles.set(slug, []);
    slugFiles.get(slug).push(file);
  }
}

// Add missing slugs
let added = 0;
for (const [slug, files] of slugFiles) {
  if (!manifest[slug]) {
    // Check if it's a simple src-based entry (single file)
    const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
    const webpFiles = files.filter(f => f.endsWith('.webp'));
    
    if (jpgFiles.length === 1 && webpFiles.length === 0) {
      // Simple src entry
      manifest[slug] = { src: `/images/opt/${jpgFiles[0]}` };
    } else {
      // Extract widths from filenames
      const widths = [];
      for (const file of webpFiles) {
        const match = file.match(/-(\d+)\.webp$/);
        if (match) widths.push(parseInt(match[1]));
      }
      widths.sort((a, b) => a - b);
      
      // Find fallback width from jpg files
      let fallbackWidth = 1280;
      for (const file of jpgFiles) {
        const match = file.match(/-(\d+)\.(jpg|jpeg)$/);
        if (match) {
          fallbackWidth = parseInt(match[1]);
          break;
        }
      }
      
      if (widths.length > 0 || jpgFiles.length > 0) {
        manifest[slug] = {
          widths: widths.length > 0 ? widths : [],
          fallbackWidth: fallbackWidth
        };
      }
    }
    added++;
    console.log(`Added: ${slug}`);
  }
}

// Add aliases for case-sensitive variations
const aliases = {
  'sushas': 'Sushas',
  'serenity': 'Serenity',
  'folk-performances': 'Folk Performances',
  'traditional-crafts': 'Traditional-Crafts',
  'shivneri-fort': 'Shivneri-Fort',
  'sinhagad-fort': 'Sinhagad-Fort',
  'sindhudurg-fort': 'Sindhudurg-Fort',
  'lohagad-fort': 'Lohagad-Fort',
  'suvarnadurg-fort': 'Suvarnadurg-Fort',
  'vijaydurg-fort': 'Vijaydurg-Devgad',
  'torna-fort': 'torona',
  'kolaba-fort': 'kolaba',
  'pratapgad-fort': 'pratapgad',
  'panhala-fort': 'pahalna',
  'fort-protector-full': 'Protector',
  'strategic-leader-full': 'leader',
  'visionary-king-full': 'Visionary_King',
  'hindavi-swarajya-full': 'swarajya',
  'pratapgad-victory-full': 'victory',
  'cultivate-wisdom': 'find',
  'find-wisdom': 'wisd',
  'shivaji-statue-card': 'Chattrapati Shivaji Maharaj',
  'culture-day': 'culture',
  'intro-dhol': 'dhol',
  'temple-heritage': 'heritage',
  'harvest-traditions': 'tradition',
  'welcome-shared': 'shared',
  'traditions-numbers': 'maha',
  'hero-maha': 'maha',
  'ropeway-opt': 'ropeway',
  'kayaking-opt': 'kayaking',
  'rajgad-fort': 'Rajgad-fort'
};

for (const [alias, target] of Object.entries(aliases)) {
  if (!manifest[alias] && manifest[target]) {
    manifest[alias] = manifest[target];
    added++;
    console.log(`Aliased: ${alias} -> ${target}`);
  }
}

// Write updated manifest
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`\n✓ Added ${added} missing slugs to manifest`);
console.log(`✓ Total slugs in manifest: ${Object.keys(manifest).length}`);
