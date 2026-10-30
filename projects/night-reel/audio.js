// Night reel: score + sound effects, each tied to a moment in the voiceover (seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { NIGHT_END: 9.26, MORNING: 19.67, BUILD: 28.38, KICKS: 30.74, CLAPS: 33.76, RESOLVE: 50.78, CRICKETS: [[0.5, 19.4], [37.2, 39.6]] };
const SFX = [
  ['like', 4.32],                                                     // heart on "pasand"
  ...Array.from({ length: 14 }, (_, k) => ['type', 6.1 + k * 0.093]),  // typing "Price kya hai?"
  ['send', 7.86],                                                     // message sent
  ['buzz', 10.2],                                                     // silent vibration on your sleeping phone
  ['whip', 9.1], ['whip', 11.3],                                      // swipes to your phone and back
  ['tick', 11.75], ['tick', 12.15], ['tick', 12.55],                  // clock jumps while he waits
  ['swoosh', 13.2],                                                   // his phone swipes to the competitor
  ['tap', 17.15], ['dimding', 17.55],                                 // he orders from the competitor
  ['whip', 19.45], ['sunrise', 19.7], ['birds', 20.0],                // morning
  ['notify', 22.3],                                                   // 1 missed message
  ['whip', 24.95], ['sad', 27.04],                                    // the sale goes away
  ['whip', 28.25],
  ['tap', 35.84], ['order', 36.3],                                    // he orders on your website
  ['whip', 37.0], ['chime', 37.6],                                    // new order while you sleep
  ['whip', 39.6], ['swoosh', 41.18], ['swoosh', 43.96],               // the two cards
  ['whip', 45.6], ['fill', 46.62],                                    // 24h ring fills
  ['whip', 50.25],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(56.5, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
