# Game Dev Daily

A website of daily game development lessons, written by eight topic agents and published with
GitHub Pages from the `docs/` folder on `main`.

Site: https://tatvam.github.io/gamedev-daily/

## How it runs

A scheduled cloud routine starts a session in this repository once a day. That session follows
`prompts/daily-run.md`, which launches the eight agents in `.claude/agents/`. Each agent follows
`prompts/lesson-procedure.md` to publish one lesson page. Nothing is remembered between runs
except what is committed here, so the repository is the memory.

## Layout

| Path | What it is |
|---|---|
| `topics.json` | The eight topics (id, title, blurb). Source of truth for topic ids |
| `.claude/agents/<topic>.md` | One agent per topic |
| `curriculum/<topic>.md` | Ordered roadmap per topic. First unchecked item is next |
| `prompts/daily-run.md` | What the daily session does |
| `prompts/lesson-procedure.md` | How an agent writes one lesson |
| `templates/lesson.html` | Skeleton every lesson starts from |
| `docs/` | The published site |
| `docs/assets/` | Shared `site.css`, `site.js`, `demo-kit.js` |
| `docs/lessons/<topic>/<date>-<slug>.html` | Lesson pages |
| `docs/lessons/<topic>/index.json` | That topic's manifest |
| `docs/lessons.json` | Merged index, generated. Never edit by hand |
| `scripts/validate.mjs` | Page checker |
| `scripts/build-index.mjs` | Builds `docs/lessons.json` |

The reference lesson that sets the quality bar is
`docs/lessons/game-physics/2026-09-27-fix-your-timestep.html`. Read it before writing a lesson.

## Hard rules

1. **Self-contained pages.** A lesson may load only the three shared files in `docs/assets/` by
   relative path. No CDNs, no web fonts, no remote images, no `fetch` to other sites. Art and
   diagrams are inline SVG or drawn in code.
2. **Every lesson is visual and interactive.** At least one demo the reader can manipulate, and
   at least one diagram. A lesson that is only text is a failed lesson.
3. **Own words, original art.** Explain techniques in your own words. Never copy sprites, maps,
   code or text from commercial games or tutorials. Recreate the *idea* with original visuals.
4. **Be accurate.** If you are not sure a fact is true, say so on the page or leave it out.
   History lessons must list sources. Never invent a quote, a date or a source.
5. **Stay in your lane.** An agent writes only inside `docs/lessons/<its-topic>/` and edits only
   `curriculum/<its-topic>.md`. Shared assets, scripts, templates and other topics are off limits
   during a daily run.
6. **Dates are India time.** Get today's date with `TZ=Asia/Kolkata date +%F`.
7. **Validate before you finish.** `node scripts/validate.mjs <page>` must pass.
8. **One commit per run, on `main`.** Only the orchestrator commits and pushes. Agents never run
   git commands that change state.
9. **Accessible and responsive.** Pages work at 360px wide, in light and dark themes, with
   keyboard and touch. Demos respect reduced-motion and never autoplay sound.
10. **Code examples are in Lua.** The code a reader learns from and copies (the `code` section
    and any snippet in the text) is written in Lua, in a style that runs in LÖVE: use
    `love.update(dt)` and `love.draw()` when a game loop is needed. Add GDScript and Unity C#
    tabs when the lesson is about those engines, and GLSL for shaders. Never present JavaScript
    as an example language. The demo's own `<script>` is still JavaScript because it has to run
    in the browser; that is plumbing, not the lesson, and it is not shown to the reader.
11. **Writing style.** Plain, direct English. Short paragraphs. Define a term the first time it
    appears. No emojis. No filler introductions.

## Commands

```bash
node scripts/validate.mjs docs/lessons/game-math/2026-10-01-dot-product.html   # one page
node scripts/validate.mjs --date 2026-10-01                                    # all pages of a day
node scripts/validate.mjs --all                                                # everything
node scripts/build-index.mjs                                                   # rebuild docs/lessons.json
python3 -m http.server 4173 --directory docs                                   # preview locally
```
