# Daily run

You are the orchestrator for Game Dev Daily. Your job in this session is to publish today's
lessons, one per topic, and push them to `main`. Nobody is watching, so do not ask questions.
Make sensible decisions, and report what happened at the end.

Read `CLAUDE.md` first.

## Settings

Edit these to change what the daily run does.

- **Topics to run:** all topics in `topics.json`
- **Maximum fix attempts per failed page:** 2

## Steps

### 1. Prepare

```bash
git checkout main
git pull --ff-only origin main
TODAY=$(TZ=Asia/Kolkata date +%F)
echo "$TODAY"
```

For each topic id in `topics.json`, open `docs/lessons/<topic>/index.json` (it may not exist yet)
and check whether it has an entry whose `date` equals today and that does not have
`"seed": true`. Topics that already have one are **done**: skip them. If every topic is done, say
so and stop without committing.

Then make sure no other run is already working on today:

```bash
git log origin/main --since="3 hours ago" --grep="^run started: $TODAY" --format="%h %cr"
```

If that prints anything, another run for today started less than three hours ago and may still
be writing. Stop here and say so in your report. Otherwise claim the day:

```bash
git commit --allow-empty -m "run started: $TODAY"
git push origin main
```

If this push is rejected, another run claimed the day at the same moment. Stop and report it.

### 2. Launch the agents

Launch one sub-agent per remaining topic, **all in a single message so they run in parallel**.
Use the agent type with the same name as the topic id (`pixel-art`, `game-physics`,
`game-engine`, `game-history`, `game-idea`, `game-math`, `shaders-graphics`, `game-design`).

Give each one this prompt, with the values filled in:

> Today is `<TODAY>`. Publish today's lesson for topic `<topic>`. Follow
> `prompts/lesson-procedure.md` exactly. When you are done, reply using the summary format at
> the end of that file.

If an agent type with that name is not available, use a general-purpose agent instead and put
this line at the top of its prompt: "Read `.claude/agents/<topic>.md` and act as that agent."

### 3. Check the results

When all agents have finished:

```bash
node scripts/validate.mjs --date "$TODAY"
```

For each page that fails, send the failure output back to that topic's agent (or a new one) and
ask it to fix the page. After the maximum number of attempts, remove that page and its manifest
entry, and untick its curriculum item, so that a broken page is never published.

Also check that no agent touched files outside its own lane:

```bash
git status --porcelain
```

Expected changes are only under `docs/lessons/<topic>/` and `curriculum/<topic>.md` for the
topics you ran. Revert anything else with `git checkout -- <path>`.

### 4. Build the index

```bash
node scripts/build-index.mjs
```

### 5. Commit and push

```bash
git add docs curriculum
git commit -m "lessons: $TODAY"
git push origin main
```

If the push is rejected because `main` moved, run `git pull --rebase origin main`, rebuild the
index, and push again. Never force push. Never push to any other branch.

### 6. Report

End with a short report:

- The date
- One line per topic: lesson title and its URL
  (`https://tatvam.github.io/gamedev-daily/lessons/<topic>/<file>`)
- Any topic that was skipped or failed, and why
- Anything that needs the owner's attention (for example, web access was blocked)
