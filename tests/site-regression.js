const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    throw error;
  }
}

test('hero presents a direct shopping action and product expectation', () => {
  assert.match(html, /SHOP DROP 01 ↓/);
  assert.match(html, /five original designs built to be worn/i);
});

test('collection cards expose product and price action', () => {
  assert.equal((html.match(/VIEW PRODUCTS & PRICE ↗/g) || []).length, 5);
  assert.equal((html.match(/data-design="0[1-5]"/g) || []).length, 5);
});

test('mobile sticky shop CTA is explicit and touch-friendly', () => {
  assert.match(html, /class="sticky-btn"/);
  assert.match(html, /SHOP DROP 01 ↗/);
  assert.match(html, /min-height:44px/);
});

test('shopping friction is answered near the conversion CTA', () => {
  assert.match(html, /Product options, sizes, colors, and live pricing are shown there before checkout/i);
  assert.match(html, /OPEN FULL SHOP ↗/);
});

test('external shopping links keep safe new-tab behavior', () => {
  const redbubbleLinks = html.match(/href="https:\/\/www\.redbubble\.com\/[^"]+"[^>]*target="_blank"[^>]*>/g) || [];
  assert.ok(redbubbleLinks.length >= 7, `expected at least 7 Redbubble links, found ${redbubbleLinks.length}`);
  for (const link of redbubbleLinks) assert.match(link, /rel="noopener"/);
});

console.log('ANOMALY-RAW regression suite complete.');
