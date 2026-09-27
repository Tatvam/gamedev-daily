# Game design and game feel curriculum

How to use: take the FIRST unchecked item, top to bottom. After publishing its page, change `- [ ]` to `- [x]` and append ` (published <YYYY-MM-DD>, <slug>)` to that line. If you discover something worth covering that is not listed, append it to the Backlog section.

## Track 1: Game feel and juice

- [x] **Input response and latency** — How delay between pressing a button and seeing a result changes how a game feels, and how much delay players notice. Demo: A jumping character with a slider that adds input delay in milliseconds, plus a blind A/B test that asks which version feels more responsive. (published 2026-09-27, input-latency)
- [ ] **Acceleration, friction and top speed** — How the curve from standing still to full speed decides whether movement feels tight, heavy or slippery. Demo: Move a character with sliders for acceleration, deceleration and top speed, a live speed graph, and presets named tight, heavy and ice.
- [ ] **Screen shake** — How a short, decaying camera shake sells impact, and how direction, strength and duration keep it from becoming tiring. Demo: Trigger explosions with shake toggled on or off, with sliders for strength and decay and a switch between random and directional shake.
- [ ] **Hit stop and freeze frames** — How pausing the action for a few frames on impact makes hits feel heavy. Demo: Strike a training dummy with a slider for freeze length from zero to two hundred milliseconds and a toggle to compare with none.
- [ ] **Particles and impact effects** — How dust, sparks and debris tell the player what happened and how hard. Demo: A jumping and landing character with separate toggles for dust puffs, sparks and debris, and sliders for count and lifetime.
- [ ] **Squash and stretch** — How deforming a shape while keeping its volume adds weight and energy to movement. Demo: A jumping blob with a squash and stretch toggle and an amount slider, played side by side with a rigid copy.
- [ ] **Sound timing and variation** — How the timing, pitch and variety of sound effects change the feel of the same action. Demo: A hit button plays generated tones with a slider that delays the sound after the impact and toggles for pitch variation and layering.
- [ ] **Camera smoothing and dead zones** — How easing and a dead zone stop the camera from copying every small movement of the player. Demo: A platformer camera with a smoothing slider and a visible dead zone box that can be resized or switched off.
- [ ] **Camera lookahead and framing** — How shifting the camera toward where the player is heading shows them what matters next. Demo: A side-scrolling run with toggles for horizontal lookahead and vertical snapping to platforms, and a slider for lookahead distance.
- [ ] **Layering juice on a plain game** — How small effects add up, and how to tell when polish starts to hide the action. Demo: A plain brick-breaking game with a checklist of effects such as shake, particles, easing and sound that can be switched on one by one.

## Track 2: Forgiveness mechanics

- [ ] **Coyote time** — Why letting players jump for a few frames after leaving a ledge makes platforming feel fair. Demo: A row of gaps to jump with a coyote time slider in milliseconds, a success counter, and a ghost marker showing where each jump was pressed.
- [ ] **Jump buffering** — How remembering a jump press made just before landing prevents the game from ignoring inputs. Demo: A bouncing course where the player jumps again on landing, with a buffer slider and a counter of presses that were saved.
- [ ] **Variable jump height** — How cutting a jump short when the button is released gives players fine control. Demo: A set of low and high ledges with a toggle between fixed and variable jump height and a slider for the release gravity.
- [ ] **Jump arcs, hang time and fast fall** — How rise speed, time at the top and fall speed shape a jump that is easy to aim. Demo: Sliders for jump height, time to apex, hang time and fall multiplier redraw the arc on screen while the player jumps.
- [ ] **Corner correction** — How nudging the player around a corner they barely clipped saves jumps that should have worked. Demo: A jump up through a narrow gap with a correction toggle and a slider for how many pixels of overlap are forgiven.
- [ ] **Generous hitboxes** — Why the player's hurtbox is usually smaller than the sprite and pickups are larger than they look. Demo: A bullet dodging game with hitboxes drawn on screen and sliders for player hurtbox size and pickup size.
- [ ] **Aim assist** — How slowing the reticle near targets and bending shots toward them helps without taking control away. Demo: A target range aimed with keys or mouse with separate toggles for reticle friction and bullet magnetism and a slider for strength.
- [ ] **Last-hit protection and hidden mercy** — How games stretch the last sliver of health and soften the first hit to create close escapes. Demo: A survival arena with a toggle that makes the final portion of the health bar absorb more damage, and a tally of near-death escapes.
- [ ] **Checkpoints and the cost of failure** — How the distance to the last checkpoint and the speed of the restart decide whether failure motivates or frustrates. Demo: A hard obstacle course with sliders for checkpoint spacing and respawn delay and a record of time lost to retries.

## Track 3: Loops, pacing and level design

- [ ] **Core loops** — How a game's repeated cycle of action, reward and investment works at the scale of seconds, minutes and sessions. Demo: A tiny gather, sell and upgrade game with a loop diagram that highlights the current phase as you play.
- [ ] **Positive feedback loops** — How giving advantages to the leader creates snowballing, and when that is exciting or unfair. Demo: A two-sided battle simulation with a slider for how much each win strengthens the winner and a graph of the lead over time.
- [ ] **Negative feedback loops** — How catch-up mechanics keep contests close, and what they cost in fairness. Demo: A race against computer rivals with a slider for catch-up strength and a graph of the gaps between racers.
- [ ] **Pacing and intensity curves** — How alternating tension and rest keeps players engaged for longer than constant action. Demo: Drag points on an intensity curve and play a scrolling level whose enemy density follows the curve you drew.
- [ ] **The flow channel and difficulty curves** — How challenge must rise with skill to avoid both boredom and anxiety, and why a sawtooth curve works better than a straight line. Demo: Play ten short dodging waves under a linear, stepped or sawtooth curve while a dot shows your position on a chart of challenge against skill.
- [ ] **Dynamic difficulty adjustment** — How a game can tune itself to the player's performance, and the risks when players notice. Demo: A dodging game that adapts obstacle speed to recent performance, with a toggle for adaptation and a switch to reveal the hidden difficulty value.
- [ ] **Teaching without tutorials** — How a safe first room can teach a mechanic through play instead of text. Demo: Play the same opening twice, once with a text box explaining the dash and once with a room that can only be left by discovering it.
- [ ] **Introduce, develop, twist, conclude** — How the four-step structure inspired by kishotenketsu builds a level around one idea. Demo: Four short rooms built around a moving platform are labelled by step, and can be reordered and replayed to feel why the order matters.
- [ ] **Signposting** — How light, colour, lines and landmarks guide players without a map marker. Demo: A dark maze-like room with toggles for a lit exit, a landmark tower and a trail of pickups, and a timer for reaching the goal.
- [ ] **Affordances and visual language** — How consistent shapes and colours tell players what can be climbed, broken or feared. Demo: A room of objects where one toggle makes the colour rules consistent or random, with a counter of wrong guesses about which ones hurt.
- [ ] **Risk and reward** — How optional danger with a better payoff lets players choose their own difficulty. Demo: A coin run with a safe route and a dangerous route, a slider for the reward multiplier, and a tally of which route you choose.

## Track 4: Economy, progression and randomness

- [ ] **Sources and sinks** — How currency enters and leaves a game economy, and what happens when the two are out of balance. Demo: An economy simulation with sliders for income sources and spending sinks and a graph of money held and prices over time.
- [ ] **Reward schedules** — How fixed and variable rewards by count or by time create different habits. Demo: Four chests pay out on fixed ratio, variable ratio, fixed interval and variable interval schedules while a chart records your clicking pattern on each.
- [ ] **Upgrade curves** — How linear, exponential and diminishing curves for cost and power shape the time between upgrades. Demo: Sliders set cost growth and power growth, a chart shows the time to each next upgrade, and a small clicker lets you feel the curve.
- [ ] **Experience and level curves** — How the experience needed per level controls the rhythm of rewards across a whole game. Demo: Edit a level curve formula with sliders and watch a simulated player's timeline mark each level-up across ten hours of play.
- [ ] **Input randomness versus output randomness** — Why randomness before a decision creates planning while randomness after a decision creates gambling. Demo: A small tactics fight can switch between rolling the dice before you choose an action and rolling after.
- [ ] **Perceived fairness and pseudo-random distribution** — Why true randomness feels unfair in streaks and how raising the chance after each miss fixes it. Demo: Attack with a nominal 25 percent critical hit chance under true random and pseudo-random distribution, with histograms of streak lengths.
- [ ] **Pity timers** — How guaranteed rewards after a run of bad luck cap the worst case. Demo: Open loot boxes thousands of times with a slider for the pity threshold and a chart of how many openings each rare item took.
- [ ] **Shuffle bags** — How drawing from a bag without replacement keeps variety while preventing droughts and floods. Demo: A falling piece generator switches between pure random and a shuffled bag, with a chart of the longest wait for each piece.
- [ ] **Loot tables and rarity** — How weighted drop tables work and how long it really takes to collect a full set. Demo: Edit drop weights for five items, run a thousand drops, and chart the number of drops needed to collect every item.

## Track 5: Combat, puzzles and emergent systems

- [ ] **Anatomy of an attack** — How start-up, active and recovery frames create commitment and openings. Demo: A sword swing with sliders for each phase, a frame timeline, and a dummy that strikes back during recovery.
- [ ] **Telegraphing** — How wind-up poses, flashes and sounds give players a fair chance to react. Demo: Dodge an enemy's attack with a slider for wind-up length and toggles for a flash and a sound cue, with your success rate shown.
- [ ] **Enemy design and roles** — How enemies with clear, different jobs ask different questions of the player. Demo: An arena where you choose which of a charger, a shooter and a shield carrier to spawn and see how each one changes how you move.
- [ ] **Encounter design** — How combining enemy types and terrain creates challenges that no single enemy can. Demo: Place two enemy types and cover blocks on a small map, then fight the encounter and compare it with the same enemies fought alone.
- [ ] **Invincibility frames** — How brief invulnerability during dodges and after hits prevents unfair damage and rewards timing. Demo: Roll through a sweeping beam with a slider for invulnerable frames shown on a timeline, and a toggle for mercy invincibility after being hit.
- [ ] **Stagger and poise** — How interrupting enemies, and resisting interruption, creates rhythm in a fight. Demo: Attack an enemy with a visible poise meter, with sliders for poise damage and recovery and a toggle that lets heavy attacks break through.
- [ ] **Time to kill** — How the number of hits needed to defeat something changes tactics, tension and the value of aim. Demo: A duel against a computer opponent with a health slider that sets time to kill, and readouts for fight length and how often the first shot wins.
- [ ] **Puzzle design and the single insight** — How a good puzzle hides one clear idea behind an obvious wrong approach. Demo: A three-room block pushing puzzle shows the player's move trail, with a toggle that reveals the intended insight and the false lead.
- [ ] **Puzzle difficulty and step count** — How the number of steps, options and red herrings controls difficulty better than obscurity does. Demo: A generator builds switch puzzles with sliders for the number of steps and decoys, and a solver shows the size of the search space.
- [ ] **Emergent systems** — How a few simple rules that interact, such as fire, water and wind, create situations the designer never scripted. Demo: A grid sandbox where you paint grass, water, fire and wind and toggle each interaction rule to see chains of events appear or vanish.

## Track 6: Players, accessibility and production

- [ ] **Player motivation models** — How models such as autonomy, competence and relatedness, and player type surveys, explain why different people play. Demo: A small collecting game with toggles that add score feedback, a choice of routes and a ghost rival, with a short rating after each run.
- [ ] **Onboarding and the first five minutes** — How to order the first goals, controls and rewards so that new players stay. Demo: Rearrange five onboarding steps on a timeline and play the resulting opening, with a meter estimating how much the player has to remember at each point.
- [ ] **Readable interfaces and feedback** — How a heads-up display shows only what matters at the moment it matters. Demo: A busy action scene with toggles for a cluttered display, a minimal display and a display that shows elements only when they change.
- [ ] **Control remapping and input options** — Why letting players rebind keys, switch hold to toggle and play one-handed opens a game to more people. Demo: A small game with a rebinding panel, a hold or toggle switch for sprint and a one-handed preset.
- [ ] **Colour-blind friendly design** — How to avoid relying on colour alone by adding shape, pattern and contrast. Demo: A gem matching board viewed through simulated colour vision filters, with a toggle that adds shapes and patterns to each gem.
- [ ] **Assist modes and difficulty options** — How options such as game speed, extra health and skip buttons let players set their own challenge without shame. Demo: A hard platforming room with sliders for game speed and extra hits and a toggle for infinite air dashes.
- [ ] **Playtesting** — How to watch people play, what to ask and how to avoid leading them. Demo: Replays of simulated testers walk through a level showing where they hesitate and fail, after which you move one platform and run the testers again.
- [ ] **Metrics and heatmaps** — How recorded data such as deaths, quits and time per level reveals problems that players do not report. Demo: A level is played by hundreds of simulated players to draw a heatmap of deaths, with a drop-off chart that updates when you edit the level.
- [ ] **Scoping a game** — How to cut a design down to what a team can finish, and why estimates run over. Demo: Drag features into a schedule with optimistic and pessimistic estimates, then run a simulation that shows the spread of likely finish dates.
- [ ] **The vertical slice** — How finishing one small part of the game to final quality tests the whole plan. Demo: A feature grid lets you spend a fixed budget either broadly or on one polished slice, and a tiny game changes to show the result of each choice.
- [ ] **Ethical design and dark patterns** — How to recognise manipulative tricks such as fake timers, confusing currencies and guilt-tripping buttons, and what to build instead. Demo: A mock shop screen with a toggle for each dark pattern and a running total of the real money cost that each one hides.

## Backlog

- (empty)
