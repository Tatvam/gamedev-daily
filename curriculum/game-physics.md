# Game physics curriculum

How to use: take the FIRST unchecked item, top to bottom. After publishing its lesson, change `- [ ]` to `- [x]` and append ` (published <YYYY-MM-DD>, <slug>)` to that line. If you discover something worth teaching that is not listed, append it to the Backlog section.

## Track 1: Time and motion

- [x] **Fix your timestep** — Why physics driven by a variable frame time behaves differently on every machine and how a fixed timestep with an accumulator makes it consistent. Demo: two simulations of the same bouncing balls run side by side, one variable and one fixed, while a frame-rate slider shows them drift apart. (published 2026-09-27, fix-your-timestep)
- [x] **Position, velocity, and acceleration** — How the three quantities relate and how a game updates them once per step. Demo: drag arrows to set the velocity and acceleration of a ball and watch its path and live graphs. (published 2026-09-27, position-velocity-acceleration)
- [ ] **Forces and mass** — How force, mass and acceleration connect and why heavier objects respond more slowly to the same push. Demo: click to push three boxes with the same force while sliders change their mass and the size of the force.
- [ ] **Explicit Euler integration** — How the simplest integrator works and why it slowly adds energy to a system. Demo: a step size slider drives an orbiting body that spirals outward while an energy graph climbs.
- [ ] **Semi-implicit Euler integration** — Why updating velocity before position is far more stable for the same cost. Demo: an A/B view runs the same orbit with explicit and semi-implicit Euler at a shared step size slider.
- [ ] **Verlet integration** — How storing the previous position instead of the velocity gives a stable integrator that is easy to constrain. Demo: choose between three integrators for a swinging pendulum and compare their energy graphs.
- [ ] **Gravity and free fall** — How constant acceleration produces a parabola and how to choose a gravity value in pixels per second squared. Demo: drop and throw a ball with a gravity slider and see its trail and fall time.
- [ ] **Jump arcs from height and time** — How to calculate gravity and launch speed from the jump height and time to peak that you want. Demo: sliders for height and time to peak redraw the jump arc and show the derived gravity and launch velocity.
- [ ] **Ground friction** — How friction slows a sliding object and how to bring it to a clean stop at zero instead of jittering back and forth. Demo: flick a box across the floor with a friction slider and a toggle between constant and proportional deceleration.
- [ ] **Drag and terminal velocity** — How air resistance grows with speed until it balances gravity. Demo: drop objects with a drag slider and a toggle between linear and quadratic drag while a speed graph levels off.

## Track 2: Collision detection

- [ ] **AABB overlap tests** — How to test two axis-aligned boxes for overlap by comparing their intervals on each axis. Demo: drag two boxes and watch their shadows on the x and y axes light up when they overlap.
- [ ] **Circle against circle** — How comparing the distance between centres with the sum of the radii detects overlap and why squared distances avoid a square root. Demo: drag two circles with radius sliders and see the distance line change colour on contact.
- [ ] **Circle against box** — How clamping the circle centre to the box gives the closest point and the overlap test. Demo: drag a circle around a box and watch the closest point and contact normal update.
- [ ] **Raycasts** — How to find the first thing a ray hits, the distance to it and the surface normal, as exposed by RayCast2D in Godot and Physics2D.Raycast in Unity. Demo: drag the origin and direction of a ray through a scene of boxes and circles to see the hit point and normal.
- [ ] **Tunnelling** — Why fast or small objects can skip through thin walls between two steps. Demo: sliders for bullet speed and wall thickness show the discrete positions jumping over the wall.
- [ ] **Swept AABB tests** — How to calculate the time of impact of a moving box so that it cannot tunnel. Demo: drag the velocity vector of a box towards an obstacle and see the entry time on each axis and the stopping position.
- [ ] **Separating axis theorem** — How two convex polygons are separate if any one axis shows a gap between their projections. Demo: drag and rotate two polygons while every tested axis shows its projections and gaps.
- [ ] **Minimum translation vector** — How the axis with the smallest overlap gives the direction and distance needed to push two shapes apart. Demo: overlap two polygons to see the push-out arrow, with a button that applies it.
- [ ] **Contact points and normals** — What information a collision must report so that the response can be calculated. Demo: drag one box onto another at different angles and see the contact points, normal and depth drawn.
- [ ] **Collision layers and masks** — How layers and masks decide which objects are tested against each other, as in the collision layers of Godot and the layer matrix of Unity. Demo: tick boxes in a layer matrix and watch which groups of bouncing shapes collide or pass through each other.

## Track 3: Collision response

- [ ] **Resolving penetration** — How to push overlapping bodies apart and how to split the correction by mass. Demo: drop boxes into each other with a toggle for equal or mass-weighted correction and a slider for correction strength.
- [ ] **Restitution and bouncing** — How a restitution value controls the energy kept after a bounce. Demo: drop balls with a restitution slider from 0 to 1 and compare their bounce heights.
- [ ] **Impulses and momentum** — How an instant change in velocity conserves momentum when two bodies collide on a line. Demo: launch two carts at each other with mass and speed sliders and read the momentum before and after.
- [ ] **Impulse resolution in 2D** — How to apply an impulse along the contact normal so that circles bounce off each other correctly. Demo: shoot a cue ball into a rack of balls with sliders for restitution and mass.
- [ ] **Contact friction** — How an impulse along the contact tangent stops objects from sliding forever. Demo: tilt a ramp with an angle slider and adjust friction until the box starts to slide.
- [ ] **Sliding along walls** — How removing the part of the velocity that points into a surface lets a body slide instead of stopping. Demo: drag a velocity arrow into a wall and see it split into a removed part and a sliding part.
- [ ] **Tile collisions one axis at a time** — Why moving and resolving on x and then on y gives reliable collisions against a tile map. Demo: steer a box through a tile map with a toggle between separated and combined resolution to expose corner snagging.
- [ ] **Slopes** — How to move along an angled surface and how to limit the steepest slope a character can climb. Demo: walk a character over slopes with sliders for slope angle and maximum walkable angle.
- [ ] **One-way platforms** — How to let a body pass up through a platform but land on it from above. Demo: jump through platforms from below with a drop-through key and a view of the rule that decides each collision.
- [ ] **Stacking and solver iterations** — Why stacks of boxes jitter or sink and how repeated solver passes make them stable. Demo: an iteration slider from 1 to 20 changes how steady a tower of boxes stands.

## Track 4: Character controllers and kinematic bodies

- [ ] **Static, kinematic, and dynamic bodies** — How the three body types differ and when to use each, with the matching node and component types in Godot and Unity. Demo: switch a box between the three types and push it with the mouse and with other bodies.
- [ ] **Move and slide** — How a kinematic character moves, collides and slides over several passes, like move_and_slide in Godot and CharacterController.Move in Unity. Demo: steer a character around a room while each slide pass is drawn as a coloured arrow, with a slider for the maximum number of passes.
- [ ] **Ground detection** — How to decide reliably whether a character is standing on the floor using contact normals or short downward casts. Demo: walk over ledges and slopes while toggling between ray, box cast and normal-based checks.
- [ ] **Snapping to the ground** — Why characters launch off the top of slopes and how a snap distance keeps them attached. Demo: run down a hill with a snap toggle and a snap distance slider.
- [ ] **Steps and stairs** — How a character can climb small ledges without jumping. Demo: walk into steps of different heights with a step height slider.
- [ ] **Moving platforms** — How a rider is carried by a platform and keeps the velocity of the platform when jumping off. Demo: ride horizontal and vertical platforms with toggles for carrying and velocity inheritance.
- [ ] **Pushing crates** — How a kinematic character passes motion to dynamic bodies. Demo: push crates of adjustable mass with a slider for push force.
- [ ] **Triggers and sensors** — How overlap areas detect entering and leaving without blocking movement, as with Area2D in Godot and trigger colliders in Unity. Demo: drag a character through zones and watch enter, stay and exit events appear in a log.

## Track 5: Springs, constraints, and soft bodies

- [ ] **Springs and the law of Hooke** — How a spring pulls back in proportion to how far it is stretched. Demo: drag a weight on a spring and release it with sliders for stiffness and rest length.
- [ ] **Damping** — How damping removes energy and what under-damped, critically damped and over-damped motion look like. Demo: a damping slider changes the motion of a spring and its position graph.
- [ ] **Stiff springs and instability** — Why very stiff springs explode at large timesteps and how substeps tame them. Demo: raise a stiffness slider until the system blows up and then add substeps to make it stable again.
- [ ] **Distance constraints** — How moving positions directly keeps two points a fixed distance apart. Demo: drag one end of a rigid stick with a slider for constraint iterations.
- [ ] **Ropes and chains** — How a line of Verlet points joined by distance constraints behaves like a rope. Demo: drag the end of a rope with sliders for segment count and iterations and a toggle to pin one end.
- [ ] **Cloth** — How a grid of points and constraints forms cloth that hangs and swings. Demo: drag a hanging cloth with a wind slider and a toggle that lets it tear.
- [ ] **Soft bodies** — How a ring of points with springs and internal pressure makes a squashy blob. Demo: drop and drag a blob with pressure and stiffness sliders.
- [ ] **Rotation, torque, and moment of inertia** — How forces applied away from the centre of mass make a body spin. Demo: click anywhere on a floating box to apply an impulse and see the resulting spin and movement.
- [ ] **Joints and angle limits** — How pin and hinge joints connect bodies and how limits restrict their swing. Demo: drag a chain of linked bars with sliders for the minimum and maximum joint angle.
- [ ] **Ragdoll basics** — How a character made of limbs, joints and limits collapses believably. Demo: drag and drop a stick figure ragdoll with a toggle for joint limits.

## Track 6: Scale, special simulations, and determinism

- [ ] **Broad phase with a uniform grid** — How sorting bodies into grid cells avoids testing every pair. Demo: a slider sets the number of balls and a toggle switches between brute force and grid while a counter shows the pair tests.
- [ ] **Quadtrees** — How a tree that subdivides crowded areas speeds up spatial queries. Demo: click to add points and drag a query box to see which nodes are visited.
- [ ] **Sweep and prune** — How sorting box edges along one axis finds overlapping pairs quickly. Demo: drag boxes and watch their sorted intervals on the x axis and the list of candidate pairs.
- [ ] **Sleeping bodies** — How resting bodies are put to sleep to save work and what wakes them up. Demo: drop boxes that turn grey when asleep, with a sleep threshold slider and a click to wake them.
- [ ] **Projectiles and ballistic aiming** — How to calculate the launch angle needed to hit a target at a given speed. Demo: drag a target and adjust the launch speed to see both the low and the high arc.
- [ ] **Orbits and gravity wells** — How inverse-square attraction produces orbits, slingshots and crashes. Demo: drag to launch a satellite around a planet with a slider for the mass of the planet.
- [ ] **Buoyancy** — How the submerged volume of a body produces an upward force and how water drag settles it. Demo: drop boxes into water with sliders for density and water drag.
- [ ] **Top-down car basics** — How separating forward and sideways velocity gives grip, drift and steering. Demo: drive a car with the keyboard and a grip slider that moves it from rails to ice.
- [ ] **Particle systems** — How thousands of simple bodies with short lives create sparks, smoke and debris cheaply. Demo: an emitter that follows the mouse has sliders for rate, gravity, drag and bounce.
- [ ] **Interpolating render state** — How blending the last two physics states removes stutter when the render rate and the physics rate differ. Demo: a toggle turns interpolation on and off for a moving object with sliders for physics rate and display rate.
- [ ] **Determinism and replays** — What makes a simulation repeat exactly from the same inputs and what breaks it. Demo: record your inputs and replay them with toggles for fixed timestep and seeded randomness to see when the replay diverges.
- [ ] **Network-friendly physics** — How client prediction and server reconciliation hide latency by using a deterministic step. Demo: move a character with sliders for latency and packet loss and toggles for prediction and reconciliation.

## Backlog

- (empty)
