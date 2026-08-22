const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.join(__dirname, '..', 'public', 'images', 'entrance.png');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const TMP_DIR = path.join(__dirname, '..', 'tmp');

if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

async function main() {
  const meta = await sharp(INPUT).metadata();
  console.log(`Image dimensions: ${meta.width}x${meta.height}`);

  const { width, height } = meta;

  // Step 1: Initial guess of door region
  const guess = {
    left: Math.floor(width * 0.15),
    top: Math.floor(height * 0.25),
    right: Math.floor(width * 0.85),
    bottom: Math.floor(height * 0.95),
  };
  const guessW = guess.right - guess.left;
  const guessH = guess.bottom - guess.top;

  console.log('Initial crop guess:', guess);
  await sharp(INPUT)
    .extract({ left: guess.left, top: guess.top, width: guessW, height: guessH })
    .toFile(path.join(TMP_DIR, 'crop-guess.png'));
  console.log('Saved crop-guess.png');

  const guessBuffer = await sharp(INPUT)
    .extract({ left: guess.left, top: guess.top, width: guessW, height: guessH })
    .raw()
    .toBuffer();

  // Step 2: Analyze vertical slices to find seam between doors
  // Compute vertical edge strength (gradient magnitude in x direction)
  const sliceWidth = 8;
  const edgeStrengths = [];
  for (let x = 0; x < guessW; x += sliceWidth) {
    let totalEdge = 0;
    let count = 0;
    for (let y = 0; y < guessH; y++) {
      const idx = (y * guessW + x) * 3;
      const r = guessBuffer[idx];
      const g = guessBuffer[idx + 1];
      const b = guessBuffer[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (x > 0) {
        const prevIdx = (y * guessW + Math.max(0, x - 1)) * 3;
        const prevLum = 0.299 * guessBuffer[prevIdx] + 0.587 * guessBuffer[prevIdx + 1] + 0.114 * guessBuffer[prevIdx + 2];
        totalEdge += Math.abs(lum - prevLum);
        count++;
      }
    }
    edgeStrengths.push({ x, strength: count ? totalEdge / count : 0 });
  }

  // Smooth edge strengths
  const smoothed = edgeStrengths.map((e, i) => {
    const window = edgeStrengths.slice(Math.max(0, i - 2), Math.min(edgeStrengths.length, i + 3));
    return {
      x: e.x,
      strength: window.reduce((s, v) => s + v.strength, 0) / window.length,
    };
  });

  // Find the seam: look for a strong vertical edge roughly in the center third
  const centerThirdStart = Math.floor(guessW * 0.3);
  const centerThirdEnd = Math.floor(guessW * 0.7);
  const centerCandidates = smoothed.filter(s => s.x >= centerThirdStart && s.x <= centerThirdEnd);
  const seamCandidate = centerCandidates.reduce((best, curr) => (curr.strength > best.strength ? curr : best), centerCandidates[0]);

  const seamX = seamCandidate ? seamCandidate.x : Math.floor(guessW / 2);
  console.log(`Detected seam at x=${seamX} (relative to guess), strength=${seamCandidate?.strength.toFixed(2)}`);

  // Step 3: Refine crop boundaries
  // Also refine top/bottom by looking for strong horizontal edges (top and bottom of doors)
  const rowStrengths = [];
  for (let y = 0; y < guessH; y++) {
    let totalEdge = 0;
    let count = 0;
    for (let x = 0; x < guessW; x++) {
      const idx = (y * guessW + x) * 3;
      const lum = 0.299 * guessBuffer[idx] + 0.587 * guessBuffer[idx + 1] + 0.114 * guessBuffer[idx + 2];
      if (y > 0) {
        const prevIdx = ((y - 1) * guessW + x) * 3;
        const prevLum = 0.299 * guessBuffer[prevIdx] + 0.587 * guessBuffer[prevIdx + 1] + 0.114 * guessBuffer[prevIdx + 2];
        totalEdge += Math.abs(lum - prevLum);
        count++;
      }
    }
    rowStrengths.push({ y, strength: count ? totalEdge / count : 0 });
  }

  const smoothedRows = rowStrengths.map((r, i) => {
    const window = rowStrengths.slice(Math.max(0, i - 5), Math.min(rowStrengths.length, i + 6));
    return {
      y: r.y,
      strength: window.reduce((s, v) => s + v.strength, 0) / window.length,
    };
  });

  // Find top boundary (strong horizontal edge in upper half)
  const upperHalf = smoothedRows.slice(0, Math.floor(guessH / 2));
  const topEdge = upperHalf.reduce((best, curr) => (curr.strength > best.strength ? curr : best), upperHalf[0]);
  const refinedTop = Math.max(0, topEdge.y - 10);

  // Find bottom boundary (strong horizontal edge in lower half)
  const lowerHalf = smoothedRows.slice(Math.floor(guessH / 2));
  const bottomEdge = lowerHalf.reduce((best, curr) => (curr.strength > best.strength ? curr : best), lowerHalf[0]);
  const refinedBottom = Math.min(guessH, bottomEdge.y + 10);

  const refinedCrop = {
    left: guess.left,
    top: guess.top + refinedTop,
    width: guessW,
    height: refinedBottom - refinedTop,
  };

  console.log('Refined crop:', refinedCrop);
  await sharp(INPUT)
    .extract({ left: refinedCrop.left, top: refinedCrop.top, width: refinedCrop.width, height: refinedCrop.height })
    .toFile(path.join(TMP_DIR, 'crop-refined.png'));
  console.log('Saved crop-refined.png');

  // Step 4: Split refined crop at seam
  const leftWidth = seamX;
  const rightWidth = refinedCrop.width - seamX;

  console.log(`Split: left=${leftWidth}px, right=${rightWidth}px`);

  await sharp(INPUT)
    .extract({ left: refinedCrop.left, top: refinedCrop.top, width: leftWidth, height: refinedCrop.height })
    .png()
    .toFile(path.join(OUT_DIR, 'gate-left.png'));

  await sharp(INPUT)
    .extract({ left: refinedCrop.left + leftWidth, top: refinedCrop.top, width: rightWidth, height: refinedCrop.height })
    .png()
    .toFile(path.join(OUT_DIR, 'gate-right.png'));

  console.log('Saved gate-left.png and gate-right.png');
  console.log('Done');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
