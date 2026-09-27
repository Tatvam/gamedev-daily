#!/usr/bin/env node
// Checks lesson pages against the rules in CLAUDE.md. No dependencies.
//
//   node scripts/validate.mjs <page.html> [more pages]
//   node scripts/validate.mjs --draft <page.html>     skip the manifest check (before step 6)
//   node scripts/validate.mjs --date 2026-10-01       every page published on that date
//   node scripts/validate.mjs --all                   every page
//   node scripts/validate.mjs --no-browser ...        skip the headless browser run
//
// Exit code 0 when every page passes, 1 otherwise.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const LESSONS = path.join(DOCS, 'lessons');

const TOPIC_IDS = JSON.parse(fs.readFileSync(path.join(ROOT, 'topics.json'), 'utf8')).topics.map((t) => t.id);
const SECTIONS = ['hook', 'concept', 'demo', 'code', 'pitfalls', 'in-the-wild', 'exercise', 'takeaways', 'next', 'sources'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const ENGINES = ['agnostic', 'godot', 'unity', 'godot+unity'];
const ALLOWED_SCRIPTS = ['../../assets/site.js', '../../assets/demo-kit.js'];
const ALLOWED_STYLES = ['../../assets/site.css'];
const PLACEHOLDERS = ['LESSON TITLE', 'TOPIC-ID', 'DEMO-NAME', 'YYYY-MM-DD', 'ONE SENTENCE SUMMARY', 'HEADING THAT NAMES THE IDEA'];
const MAX_BYTES = 400 * 1024;
const FILE_PATTERN = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.html$/;

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const draft = flags.has('--draft');
const useBrowser = !flags.has('--no-browser');

function listAllPages() {
  const pages = [];
  if (!fs.existsSync(LESSONS)) return pages;
  for (const topic of fs.readdirSync(LESSONS)) {
    const dir = path.join(LESSONS, topic);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.html')) pages.push(path.join(dir, file));
    }
  }
  return pages.sort();
}

function selectPages() {
  const dateIndex = args.indexOf('--date');
  if (dateIndex !== -1) {
    const date = args[dateIndex + 1];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
      console.error('--date needs a value like 2026-10-01');
      process.exit(1);
    }
    return listAllPages().filter((p) => path.basename(p).startsWith(date + '-'));
  }
  if (flags.has('--all')) return listAllPages();
  return args.filter((a) => !a.startsWith('--')).map((a) => path.resolve(a));
}

function attr(tag, name) {
  const match = new RegExp('\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i').exec(tag);
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? '';
}

function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if ((attr(tag, 'name') || '').toLowerCase() === name) return attr(tag, 'content') || '';
  }
  return null;
}

function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&middot;/g, '·');
}

function proseWords(html) {
  const text = html
    .replace(/<(script|style|pre|svg|head)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decode(text).split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

function findBrowser() {
  const candidates = [];
  if (process.env.CHROME_BIN) candidates.push(process.env.CHROME_BIN);
  candidates.push(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium',
    '/opt/google/chrome/chrome'
  );
  const cache = path.join(os.homedir(), '.cache', 'ms-playwright');
  if (fs.existsSync(cache)) {
    for (const dir of fs.readdirSync(cache).filter((d) => d.startsWith('chromium')).sort().reverse()) {
      candidates.push(path.join(cache, dir, 'chrome-linux', 'chrome'));
      candidates.push(path.join(cache, dir, 'chrome-linux', 'headless_shell'));
      candidates.push(path.join(cache, dir, 'chrome-headless-shell-linux64', 'chrome-headless-shell'));
    }
  }
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
    } catch { /* keep looking */ }
  }
  for (const name of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'chrome']) {
    const found = spawnSync('which', [name], { encoding: 'utf8' });
    if (found.status === 0 && found.stdout.trim()) return found.stdout.trim();
  }
  return null;
}

let browserPath;
function browser() {
  if (browserPath === undefined) browserPath = useBrowser ? findBrowser() : null;
  return browserPath;
}

function runInBrowser(file, errors, warnings) {
  const bin = browser();
  if (!bin) return 'skipped';
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-chrome-'));
  try {
    const url = pathToFileURL(file).href + '#gdd-test';
    const result = spawnSync(bin, [
      '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
      '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      '--hide-scrollbars', '--mute-audio', '--no-first-run', '--no-default-browser-check',
      '--allow-file-access-from-files',
      '--window-size=1100,1800',
      '--virtual-time-budget=6000',
      '--user-data-dir=' + profile,
      '--dump-dom', url
    ], { encoding: 'utf8', timeout: 90000, maxBuffer: 32 * 1024 * 1024 });

    const dom = result.stdout || '';
    if (!/<html/i.test(dom)) {
      warnings.push('runtime check could not run (browser produced no page)');
      return 'failed';
    }
    const recorded = /data-gdd-errors="([^"]*)"/.exec(dom);
    if (recorded && recorded[1]) {
      for (const message of decode(recorded[1]).split(' || ')) {
        errors.push('runtime error: ' + message);
      }
    }
    const boxes = dom.match(/<div\b[^>]*class="demo-error"[^>]*>[\s\S]*?<\/div>/gi) || [];
    for (const box of boxes) {
      const text = decode(box.replace(/<[^>]+>/g, '')).trim();
      if (/data-kind="no-webgl"/.test(box)) warnings.push('WebGL demo could not be run in this browser, so it was not checked');
      else if (!errors.some((e) => e.includes(text))) errors.push('demo error: ' + text);
    }
    const canvases = (dom.match(/<canvas\b[^>]*>/gi) || []);
    for (const tag of canvases) {
      const width = Number(attr(tag, 'width') || 0);
      if (!width || width <= 1) {
        errors.push('canvas ' + (attr(tag, 'id') || '(no id)') + ' was never set up by DemoKit (no size after load)');
      }
    }
    return 'ran';
  } finally {
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

function checkManifest(file, topic, meta, errors, warnings) {
  const manifestPath = path.join(path.dirname(file), 'index.json');
  if (!fs.existsSync(manifestPath)) {
    errors.push('manifest docs/lessons/' + topic + '/index.json does not exist (procedure step 6)');
    return;
  }
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    errors.push('manifest is not valid JSON: ' + error.message);
    return;
  }
  if (manifest.topic !== topic) errors.push('manifest "topic" is "' + manifest.topic + '", expected "' + topic + '"');
  if (!Array.isArray(manifest.lessons)) {
    errors.push('manifest has no "lessons" array');
    return;
  }
  const base = path.basename(file);
  const entries = manifest.lessons.filter((l) => l && l.file === base);
  if (entries.length === 0) {
    errors.push('manifest has no entry with "file": "' + base + '" (procedure step 6)');
    return;
  }
  if (entries.length > 1) errors.push('manifest has ' + entries.length + ' entries for ' + base);
  const entry = entries[0];
  const match = FILE_PATTERN.exec(base);
  if (match) {
    if (entry.date !== match[1]) errors.push('manifest date "' + entry.date + '" does not match the file name');
    if (entry.slug !== match[2]) errors.push('manifest slug "' + entry.slug + '" does not match the file name');
  }
  if (!entry.title || typeof entry.title !== 'string') errors.push('manifest entry has no title');
  if (!entry.summary || typeof entry.summary !== 'string') errors.push('manifest entry has no summary');
  else if (entry.summary.length > 200) errors.push('manifest summary is ' + entry.summary.length + ' characters, keep it under 160');
  if (!LEVELS.includes(entry.level)) errors.push('manifest level must be one of ' + LEVELS.join(', '));
  if (!ENGINES.includes(entry.engine)) errors.push('manifest engine must be one of ' + ENGINES.join(', '));
  if (!Number.isInteger(entry.minutes) || entry.minutes < 3 || entry.minutes > 30) errors.push('manifest minutes must be a whole number from 3 to 30');
  if (!Array.isArray(entry.tags) || entry.tags.some((t) => typeof t !== 'string')) errors.push('manifest tags must be an array of strings');
  if (meta.level && entry.level !== meta.level) warnings.push('manifest level differs from the page meta tag');
  if (meta.engine && entry.engine !== meta.engine) warnings.push('manifest engine differs from the page meta tag');
}

function checkPage(file) {
  const errors = [];
  const warnings = [];
  const notes = [];
  const relative = path.relative(ROOT, file);

  if (!fs.existsSync(file)) return { relative, errors: ['file does not exist'], warnings, notes };

  const parts = path.relative(LESSONS, file).split(path.sep);
  const base = path.basename(file);
  let topic = null;
  if (parts.length !== 2 || parts[0].startsWith('..')) {
    errors.push('page must live at docs/lessons/<topic>/<date>-<slug>.html');
  } else {
    topic = parts[0];
    if (!TOPIC_IDS.includes(topic)) errors.push('unknown topic folder "' + topic + '"');
  }
  const nameMatch = FILE_PATTERN.exec(base);
  if (!nameMatch) errors.push('file name must look like 2026-10-01-my-slug.html (lower case, hyphens)');

  const bytes = fs.statSync(file).size;
  if (bytes > MAX_BYTES) errors.push('file is ' + Math.round(bytes / 1024) + ' KB, the limit is ' + MAX_BYTES / 1024 + ' KB');

  const raw = fs.readFileSync(file, 'utf8');
  const html = raw.replace(/<!--[\s\S]*?-->/g, '');

  if (!/^\s*<!doctype html>/i.test(raw)) errors.push('missing <!doctype html> on the first line');
  if (!/<html\b[^>]*\blang=/i.test(html)) errors.push('<html> needs a lang attribute');
  if (!/<meta\b[^>]*charset/i.test(html)) errors.push('missing <meta charset="utf-8">');
  if (metaContent(html, 'viewport') === null) errors.push('missing viewport meta tag');

  const title = (/<title>([\s\S]*?)<\/title>/i.exec(html) || [])[1];
  if (!title || !title.trim()) errors.push('missing <title>');
  const h1s = html.match(/<h1\b[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length !== 1) errors.push('page needs exactly one <h1>, found ' + h1s.length);

  for (const placeholder of PLACEHOLDERS) {
    if (html.includes(placeholder)) errors.push('template placeholder still present: "' + placeholder + '"');
  }

  const meta = {
    topic: metaContent(html, 'gdd:topic'),
    date: metaContent(html, 'gdd:date'),
    level: metaContent(html, 'gdd:level'),
    engine: metaContent(html, 'gdd:engine'),
    minutes: metaContent(html, 'gdd:minutes'),
    description: metaContent(html, 'description')
  };
  for (const key of Object.keys(meta)) {
    if (!meta[key]) errors.push('missing or empty meta tag: ' + (key === 'description' ? 'description' : 'gdd:' + key));
  }
  if (meta.topic && topic && meta.topic !== topic) errors.push('gdd:topic is "' + meta.topic + '" but the page is in folder "' + topic + '"');
  if (meta.date && nameMatch && meta.date !== nameMatch[1]) errors.push('gdd:date "' + meta.date + '" does not match the file name');
  if (meta.level && !LEVELS.includes(meta.level)) errors.push('gdd:level must be one of ' + LEVELS.join(', '));
  if (meta.engine && !ENGINES.includes(meta.engine)) errors.push('gdd:engine must be one of ' + ENGINES.join(', '));
  if (meta.minutes && !/^\d+$/.test(meta.minutes)) errors.push('gdd:minutes must be a whole number');
  if (meta.description && meta.description.length > 200) warnings.push('description is ' + meta.description.length + ' characters, aim for under 160');

  const bodyTag = (/<body\b[^>]*>/i.exec(html) || [''])[0];
  if (topic && attr(bodyTag, 'data-topic') !== topic) errors.push('<body> needs data-topic="' + topic + '"');
  if (!/\blesson\b/.test(attr(bodyTag, 'class') || '')) errors.push('<body> needs class="lesson"');

  // Sections, present and in order.
  const found = [];
  const sectionPattern = /<section\b[^>]*\bdata-section="([^"]+)"/gi;
  let sectionMatch;
  while ((sectionMatch = sectionPattern.exec(html))) found.push(sectionMatch[1]);
  for (const name of SECTIONS) {
    if (!found.includes(name)) errors.push('missing <section data-section="' + name + '">');
  }
  const known = found.filter((name) => SECTIONS.includes(name));
  const sorted = [...known].sort((a, b) => SECTIONS.indexOf(a) - SECTIONS.indexOf(b));
  if (known.join() !== sorted.join()) errors.push('sections are out of order, expected: ' + SECTIONS.join(', '));

  // Visuals.
  if (!/<figure\b[^>]*\bdata-demo=/i.test(html)) errors.push('no interactive demo: need <figure class="demo" data-demo="...">');
  if (!/<canvas\b/i.test(html)) errors.push('no <canvas> found');
  if (!/<svg\b[^>]*\bviewBox=/i.test(html)) errors.push('no inline <svg viewBox="..."> diagram found');
  for (const svg of html.match(/<svg\b[^>]*>/gi) || []) {
    if (!attr(svg, 'aria-label') && attr(svg, 'aria-hidden') !== 'true') {
      warnings.push('an <svg> has no aria-label');
      break;
    }
  }

  // Resources.
  const resourceTags = html.match(/<(script|link|img|iframe|video|audio|source|embed|object|image|use|track)\b[^>]*>/gi) || [];
  for (const tag of resourceTags) {
    const name = /^<(\w+)/.exec(tag)[1].toLowerCase();
    if (['iframe', 'embed', 'object', 'video', 'audio'].includes(name)) {
      errors.push('<' + name + '> is not allowed in lessons');
      continue;
    }
    for (const key of ['src', 'href', 'xlink:href', 'srcset', 'poster', 'data']) {
      const value = attr(tag, key);
      if (value === null) continue;
      if (/^\s*(https?:)?\/\//i.test(value)) {
        errors.push('external resource is not allowed: <' + name + ' ' + key + '="' + value + '">');
      } else if (name === 'script' && key === 'src' && !ALLOWED_SCRIPTS.includes(value)) {
        errors.push('only the shared scripts may be loaded, found src="' + value + '"');
      } else if (name === 'link' && key === 'href' && /stylesheet/i.test(attr(tag, 'rel') || '') && !ALLOWED_STYLES.includes(value)) {
        errors.push('only ../../assets/site.css may be linked, found href="' + value + '"');
      } else if (name === 'img' && key === 'src' && !/^data:image\//i.test(value)) {
        errors.push('<img> files are not allowed, use inline SVG or draw on a canvas');
      }
    }
  }
  for (const needed of [...ALLOWED_SCRIPTS, ...ALLOWED_STYLES]) {
    if (!html.includes('"' + needed + '"')) errors.push('page must load ' + needed);
    else if (!fs.existsSync(path.resolve(path.dirname(file), needed))) errors.push('shared file is missing: ' + needed);
  }
  for (const style of html.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || []) {
    if (/@import/i.test(style)) errors.push('@import is not allowed in <style>');
    if (/url\(\s*['"]?\s*(https?:)?\/\//i.test(style)) errors.push('external url() is not allowed in <style>');
    if (/(^|[\s,{}])(:root|body|html)\s*[{,]/m.test(style.replace(/<\/?style[^>]*>/gi, ''))) {
      warnings.push('<style> restyles :root, html or body; lessons should only style their own elements');
    }
  }

  // Scripts.
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  let inlineCode = '';
  let index = 0;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gdd-validate-'));
  try {
    while ((scriptMatch = scriptPattern.exec(html))) {
      const tag = '<script' + scriptMatch[1] + '>';
      const code = scriptMatch[2];
      if (attr(tag, 'src') !== null) continue;
      const type = (attr(tag, 'type') || 'text/javascript').toLowerCase();
      if (!['text/javascript', 'application/javascript', 'module'].includes(type)) continue;
      index += 1;
      inlineCode += '\n' + code;
      const target = path.join(tmp, 'script-' + index + (type === 'module' ? '.mjs' : '.cjs'));
      fs.writeFileSync(target, code);
      const check = spawnSync(process.execPath, ['--check', target], { encoding: 'utf8' });
      if (check.status !== 0) {
        const lines = (check.stderr || '').split('\n').filter((l) => l.trim());
        const message = lines.find((l) => /Error/.test(l)) || 'syntax error';
        const where = (lines[0] || '').replace(target, 'inline script ' + index);
        errors.push('JavaScript does not parse: ' + message.trim() + ' (' + where.trim() + ')');
      }
    }
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* ignore */ }
  }
  if (index === 0) errors.push('no inline <script> found, the demo needs code');
  if (!/DemoKit\.(canvas|shader)\s*\(/.test(inlineCode)) errors.push('demo must be built with DemoKit.canvas() or DemoKit.shader()');

  const withoutNamespaces = inlineCode.replace(/https?:\/\/www\.w3\.org\/[^\s'"]*/g, '');
  if (/https?:\/\//i.test(withoutNamespaces)) errors.push('scripts must not contain web addresses');
  for (const banned of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'importScripts', 'document.write', 'eval(', 'localStorage', 'sessionStorage', 'document.cookie', 'navigator.sendBeacon']) {
    if (inlineCode.includes(banned)) errors.push('scripts must not use ' + banned.replace('(', ''));
  }
  if (/\bimport\s*\(/.test(inlineCode) || /^\s*import\s/m.test(inlineCode)) errors.push('scripts must not import modules');
  if (/\balert\s*\(|\bprompt\s*\(|\bconfirm\s*\(/.test(inlineCode)) errors.push('scripts must not use alert, prompt or confirm');

  for (const canvasTag of html.match(/<canvas\b[^>]*>/gi) || []) {
    const id = attr(canvasTag, 'id');
    if (!id) errors.push('every <canvas> needs an id');
    else if (!inlineCode.includes(id)) errors.push('canvas #' + id + ' is never used by the script');
  }

  // Prose.
  const words = proseWords(html);
  if (words < 500) errors.push('only ' + words + ' words of prose, the minimum is 700');
  else if (words < 700) warnings.push(words + ' words of prose, aim for 700 to 1400');
  else if (words > 1900) warnings.push(words + ' words of prose, aim for 700 to 1400');
  notes.push(words + ' words, ' + Math.round(bytes / 1024) + ' KB');

  // Emoji are not part of the house style.
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ''))) {
    warnings.push('page contains emoji or pictographs, the house style is plain text');
  }

  if (!draft && topic) checkManifest(file, topic, meta, errors, warnings);

  if (errors.length === 0) {
    const outcome = runInBrowser(file, errors, warnings);
    if (outcome === 'skipped') notes.push('runtime check skipped (no browser found)');
    if (outcome === 'ran') notes.push('ran in headless browser');
  } else {
    notes.push('runtime check not run until the errors above are fixed');
  }

  return { relative, errors, warnings, notes };
}

const pages = selectPages();
if (pages.length === 0) {
  console.log('No pages to check.');
  process.exit(args.includes('--date') || flags.has('--all') ? 0 : 1);
}

let failed = 0;
for (const page of pages) {
  const result = checkPage(page);
  const ok = result.errors.length === 0;
  if (!ok) failed += 1;
  console.log((ok ? 'PASS  ' : 'FAIL  ') + result.relative + '  [' + result.notes.join('; ') + ']');
  for (const message of result.errors) console.log('  error: ' + message);
  for (const message of result.warnings) console.log('  warning: ' + message);
}
console.log('');
console.log(failed === 0
  ? 'All ' + pages.length + ' page(s) passed.'
  : failed + ' of ' + pages.length + ' page(s) failed.');
process.exit(failed === 0 ? 0 : 1);
