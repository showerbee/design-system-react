#!/usr/bin/env node
/**
 * One-off accessibility audit: runs axe-core against every story in a built
 * Storybook (storybook-static/index.json), using the same WCAG 2.1/2.2 AA
 * ruleset configured in .storybook/preview.js.
 *
 * Usage:
 *   npm run build-storybook
 *   npx http-server storybook-static -p 6008 -s &
 *   node scripts/a11y-audit.mjs [--url http://localhost:6008] [--out a11y-report.json]
 *
 * Note: use http-server, not `serve` — `serve` 301-redirects clean URLs
 * (/iframe.html -> /iframe), which breaks Storybook's runtime routing.
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : fallback;
};

const BASE_URL = getArg('url', 'http://localhost:6008');
const OUT_PATH = resolve(getArg('out', 'a11y-report.json'));
const INDEX_PATH = resolve('storybook-static/index.json');

const AXE_RUN_ONLY = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
  'best-practice',
];

const index = JSON.parse(readFileSync(INDEX_PATH, 'utf-8'));
const stories = Object.values(index.entries).filter((e) => e.type === 'story');

console.log(`Auditing ${stories.length} stories against ${BASE_URL} ...`);

const axeSource = readFileSync(resolve('node_modules/axe-core/axe.min.js'), 'utf-8');

const browser = await chromium.launch();
const page = await browser.newPage();
// addInitScript re-runs on every navigation, unlike addScriptTag which only
// applies once and is wiped by each story's full page reload.
await page.addInitScript(axeSource);

const results = [];
let violationCount = 0;

for (const [i, story] of stories.entries()) {
  const url = `${BASE_URL}/iframe.html?id=${story.id}&viewMode=story`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForFunction(
      () => document.body.classList.contains('sb-show-main'),
      { timeout: 15000 },
    );
    const axeResults = await page.evaluate(
      (runOnly) =>
        window.axe.run(document.getElementById('storybook-root'), {
          runOnly,
        }),
      AXE_RUN_ONLY,
    );

    if (axeResults.violations.length > 0) {
      violationCount += axeResults.violations.length;
      results.push({
        id: story.id,
        title: story.title,
        name: story.name,
        violations: axeResults.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          helpUrl: v.helpUrl,
          nodes: v.nodes.map((n) => ({
            html: n.html,
            target: n.target,
            failureSummary: n.failureSummary,
          })),
        })),
      });
    }
    console.log(
      `[${i + 1}/${stories.length}] ${story.id} — ${axeResults.violations.length} violation(s)`,
    );
  } catch (err) {
    console.error(`[${i + 1}/${stories.length}] ${story.id} — ERROR: ${err.message}`);
    results.push({ id: story.id, title: story.title, name: story.name, error: err.message });
  }
}

await browser.close();

writeFileSync(OUT_PATH, JSON.stringify({ storyCount: stories.length, violationCount, results }, null, 2));
console.log(
  `\nDone. ${results.length} stor${results.length === 1 ? 'y' : 'ies'} with findings, ${violationCount} total violations.`,
);
console.log(`Full report: ${OUT_PATH}`);
