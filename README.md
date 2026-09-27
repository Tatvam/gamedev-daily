# Game Dev Daily

Eight small, visual game development lessons, published every day.

**Read them:** https://tatvam.github.io/gamedev-daily/

| Topic | What it covers |
|---|---|
| Pixel Art | Palettes, shading, tiles, sprites and animation |
| Game Physics | Motion, collisions, springs, stability |
| Game Engine | How engines work inside, in Godot and Unity |
| History & Optimizations | Famous technical tricks from shipped games, rebuilt |
| Daily Game Idea | An original game concept with a playable prototype |
| Game Math | Vectors, curves, noise, rotations |
| Shaders & Graphics | Live shaders and rendering techniques |
| Design & Game Feel | Why some games feel great, with A/B demos |

## How it works

A scheduled Claude Code routine runs once a day at 7:07 PM India time. It follows
[`prompts/daily-run.md`](prompts/daily-run.md), which starts one agent per topic. Each agent
takes the next item from its roadmap in [`curriculum/`](curriculum/), writes an interactive
lesson page, checks it, and records it. The run then commits everything to `main`, and GitHub
Pages publishes the `docs/` folder.

The lessons are written by AI agents. They are checked automatically for structure and for
errors in their demos, but not reviewed by a person, so they can contain mistakes.

## Tracking what you have read

Every lesson ends with a **Mark as completed** button. On the home page, the list of all
lessons shows your progress, has a tick box next to each lesson, and can be filtered to
**To read** or **Completed**, on its own or together with a topic.

Progress is saved in the browser you are using, not in an account. Each browser and device
keeps its own list, and clearing the browser's site data clears it.

## Changing what gets taught

| To change | Edit |
|---|---|
| What a topic teaches next, and in what order | `curriculum/<topic>.md` (the first unchecked item is next) |
| A topic's voice, level or visual style | `.claude/agents/<topic>.md` |
| How every lesson is structured | `prompts/lesson-procedure.md` and `templates/lesson.html` |
| Which topics run each day | the Settings section of `prompts/daily-run.md` |
| Look and feel of the site | `docs/assets/site.css` |
| Schedule or model | the routine, at claude.ai/code/routines |

## Working on it locally

```bash
python3 -m http.server 4173 --directory docs     # preview at http://localhost:4173
node scripts/validate.mjs --all                  # check every lesson
node scripts/build-index.mjs                     # rebuild docs/lessons.json
```

Requires Node 20 or later. There are no packages to install.
