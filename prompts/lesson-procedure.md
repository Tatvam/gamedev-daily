# Lesson procedure

Every topic agent follows these steps to publish one lesson. Your topic id and today's date come
from the prompt you were given. Work alone and do not ask questions.

## 1. Read

1. `CLAUDE.md` (the hard rules)
2. Your agent file, `.claude/agents/<topic>.md` (your voice, level and visual style)
3. `curriculum/<topic>.md` (what to teach next)
4. `docs/lessons/<topic>/index.json` if it exists (what you already published)
5. `templates/lesson.html` (the skeleton)
6. `docs/assets/demo-kit.js` (the helpers you must use for demos, documented at the top)
7. The reference lesson `docs/lessons/game-physics/2026-09-27-fix-your-timestep.html`
   (the quality bar: read how it explains, how its demo is built, and how long it is)

## 2. Choose

Take the **first unchecked item** in your curriculum. Do not skip ahead because another item
looks more fun. If your manifest shows you already covered that idea under another title, tick
the item with a note and take the next one.

Pick a slug: lowercase words joined by hyphens, 2 to 5 words, for example `dot-product-facing`.
Your page is `docs/lessons/<topic>/<date>-<slug>.html`.

## 3. Plan the lesson before writing

Decide, in this order:

1. **The one idea.** Finish the sentence "After this lesson the reader can ...". One idea only.
2. **The demo.** What does the reader drag, slide or toggle, and what do they *see change* that
   makes the idea click? The demo is the heart of the lesson. Design it first.
3. **The diagram.** One inline SVG that shows the structure of the idea.
4. **The code.** The smallest real implementation, 10 to 40 lines.

## 4. Write the page

Copy `templates/lesson.html` and fill it in. Keep every `data-section` block, in order:

| `data-section` | Content |
|---|---|
| `hook` | Two or three sentences. A concrete problem the reader has seen in a game |
| `concept` | The explanation, with at least one inline SVG diagram. Build up in small steps |
| `demo` | The interactive demo, with a sentence telling the reader what to try and what to notice |
| `code` | Minimal implementation. Use code tabs when showing more than one language |
| `pitfalls` | Common mistakes and performance notes |
| `in-the-wild` | Where real games or engines use this. Only what you are sure of |
| `exercise` | A 15 minute task the reader can do in their own project |
| `takeaways` | Three to five bullet points |
| `next` | One sentence on what comes next in this topic |
| `sources` | Further reading. Name the work and author. Link only to pages you actually opened in this session; otherwise give the name without a link |

Length: 700 to 1400 words of prose, not counting code.

### Demo rules

- Build demos with `DemoKit` from `docs/assets/demo-kit.js`. It handles sizing, high-DPI
  screens, pausing when off screen, theme colours, reduced motion, and pointer input.
- Put each demo in `<figure class="demo" data-demo="<name>">`.
- All demo code goes in one `<script>` at the end of the page, wrapped in an IIFE.
- Read colours from `DemoKit.colors()` inside the draw function so the demo follows the theme.
- Every control has a visible label. Every demo works with touch and with a keyboard.
- Demos must be deterministic enough to explain: if you use randomness, seed it.
- No external images, fonts or libraries. No sound unless the reader presses a button.
- Test your maths with small numbers. A demo that shows the wrong thing is worse than no demo.

### Diagram rules

- Inline `<svg>` with a `viewBox`, `role="img"` and an `aria-label`.
- Use the CSS classes from `site.css` (`.d-stroke`, `.d-fill`, `.d-accent`, `.d-text`,
  `.d-muted`) instead of hard-coded colours, so diagrams work in both themes.
- Keep the `viewBox` about 640 wide or less and text at 12 units or more. On phones a diagram
  keeps a readable size and scrolls sideways. For a small diagram that reads well at any
  width (viewBox 360 wide or less), use `<figure class="diagram compact">`.
- Leave room around text: labels must not touch or overlap shapes or each other.

## 5. Validate

```bash
node scripts/validate.mjs --draft docs/lessons/<topic>/<date>-<slug>.html
```

`--draft` skips the manifest check, which comes in the next step. Fix every error and run it
again until it passes. When a browser is available the validator also loads the page and
reports errors thrown by your demo; when it says the runtime check was skipped, you are the
only check. Either way, re-read your demo code once, line by line, looking for mistakes a
machine cannot see: the demo shows the wrong thing, a control does nothing, a value can divide
by zero, a loop can run forever.

## 6. Record

1. Add an entry to `docs/lessons/<topic>/index.json` (create the file if needed):

```json
{
  "topic": "<topic>",
  "lessons": [
    {
      "date": "2026-10-01",
      "slug": "dot-product-facing",
      "file": "2026-10-01-dot-product-facing.html",
      "title": "The dot product: is the enemy facing me?",
      "summary": "One sentence, under 160 characters, saying what the reader will learn.",
      "level": "beginner",
      "engine": "agnostic",
      "minutes": 9,
      "tags": ["vectors", "dot product"]
    }
  ]
}
```

   `level` is `beginner`, `intermediate` or `advanced`. `engine` is `agnostic`, `godot`,
   `unity` or `godot+unity`. Append to the end of `lessons`; keep existing entries untouched.

2. Tick your curriculum item: change `- [ ]` to `- [x]` and append
   ` (published <date>, <slug>)`.

3. Run the validator one more time, without `--draft`, so that it checks the manifest entry:
   `node scripts/validate.mjs docs/lessons/<topic>/<date>-<slug>.html`

Do not run `git add`, `git commit` or `git push`. The orchestrator does that.

## 7. Reply

Reply with exactly this and nothing else:

```
TOPIC: <topic>
STATUS: published | failed
TITLE: <lesson title>
FILE: docs/lessons/<topic>/<date>-<slug>.html
DEMO: <one sentence describing the interactive demo>
NOTES: <problems, things you could not verify, or "none">
```
