// Offer reel: score + sound effects, each tied to a moment in the voiceover (seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { BRIGHT: 6.68, DROP: 10.84, BREAK_AT: 24.04, HIT: 24.54, CALM: 35.95, FINAL: 40.82, RESOLVE: 44.3 };
const SFX = [
  ['counter', 2.06], ['counter', 3.48],                      // ₹20,000 and ₹30,000 count up
  ['swoosh', 5.5], ['stamp', 5.62],                          // the purple strike on "nahi"
  ['whip', 6.4], ['chime', 6.75],                            // card slides in, logo appears
  ['swoosh', 8.7],                                           // store builds
  ['whip', 10.35], ['counter', 10.84], ['coin', 11.75],      // price rolls down to ₹999, coin
  ['whip', 13.35],
  ...[13.86, 14.88, 15.98, 17.58, 18.58, 19.6, 21.34].map(t => ['pop', t + 0.15]),   // each feature checks
  ['whip', 22.6],
  ...[26.3, 26.48, 26.66, 26.84, 27.02].map(t => ['coin', t + 0.25]),                // coins into the wallet
  ['whip', 27.8], ['rise', 28.48], ['chime', 29.9],          // setup progress, done
  ['whip', 30.5], ['stamp', 30.81], ['stamp', 32.42], ['stamp', 33.66],              // trust badges
  ['whip', 35.9], ['swoosh', 37.2],                          // OPEN sign drops and swings
  ...Array.from({ length: 13 }, (_, k) => ['type', 38.85 + k * 0.085]), ['tap', 40.1], // typing helioslabs.in, Visit
  ['whip', 40.6], ['chime', 40.85],                          // end card + logo
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(45.8, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
