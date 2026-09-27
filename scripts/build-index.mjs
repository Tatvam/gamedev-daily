#!/usr/bin/env node
// Merges every docs/lessons/<topic>/index.json into docs/lessons.json, which the hub page reads.
//
//   node scripts/build-index.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'topics.json'), 'utf8'));

const lessons = [];
const problems = [];

config.topics.forEach((topic, order) => {
  const manifestPath = path.join(DOCS, 'lessons', topic.id, 'index.json');
  if (!fs.existsSync(manifestPath)) return;

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    problems.push(topic.id + ': manifest is not valid JSON (' + error.message + ')');
    return;
  }

  for (const entry of manifest.lessons || []) {
    if (!entry || !entry.file) {
      problems.push(topic.id + ': entry without a file');
      continue;
    }
    if (!fs.existsSync(path.join(DOCS, 'lessons', topic.id, entry.file))) {
      problems.push(topic.id + ': ' + entry.file + ' is listed but does not exist, skipped');
      continue;
    }
    lessons.push({
      topic: topic.id,
      order,
      date: entry.date,
      slug: entry.slug,
      title: entry.title,
      summary: entry.summary,
      level: entry.level,
      engine: entry.engine,
      minutes: entry.minutes,
      tags: entry.tags || [],
      url: 'lessons/' + topic.id + '/' + entry.file
    });
  }
});

lessons.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.order - b.order));
for (const lesson of lessons) delete lesson.order;

const output = {
  site: config.site,
  topics: config.topics,
  latest: lessons.length ? lessons[0].date : null,
  count: lessons.length,
  lessons
};

const target = path.join(DOCS, 'lessons.json');
const text = JSON.stringify(output, null, 2) + '\n';
const before = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
if (before !== text) fs.writeFileSync(target, text);

for (const problem of problems) console.log('warning: ' + problem);
console.log((before === text ? 'Unchanged: ' : 'Wrote ') + path.relative(ROOT, target) +
  ' (' + lessons.length + ' lessons, latest ' + (output.latest || 'none') + ')');
