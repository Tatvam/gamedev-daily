# Game math curriculum

How to use: take the FIRST unchecked item, top to bottom. After publishing its lesson, change `- [ ]` to `- [x]` and append ` (published <YYYY-MM-DD>, <slug>)` to that line. If you discover something worth teaching that is not listed, append it to the Backlog section.

## Track 1: Vectors

- [ ] **Coordinates, axes, and units** — How screen space with y pointing down differs from world space and why choosing units such as pixels or metres matters. Demo: move the mouse over a grid to read screen and world coordinates with a toggle for y-up and a slider for pixels per unit.
- [ ] **Vectors as positions and directions** — How one pair of numbers can mean a place or a movement and how to tell the two apart. Demo: drag two points to see the vector between them drawn as an arrow with its components.
- [ ] **Adding and subtracting vectors** — How tip-to-tail addition combines movements and how subtraction gives the vector from one point to another. Demo: drag two arrows and watch their sum and difference update.
- [ ] **Length, distance, and scaling** — How the Pythagorean theorem gives the length of a vector and how multiplying by a number changes it. Demo: drag a vector and a scale slider to read its length, with a range circle that tests distance using squared values.
- [ ] **Normalising a vector** — How dividing by length gives a pure direction and fixes faster diagonal movement. Demo: move a character with the keyboard and toggle normalisation while a speed readout shows the difference.
- [ ] **Moving towards a target** — How direction multiplied by speed and delta time moves an object and how to avoid overshooting. Demo: click to set a target for a chaser with a speed slider and a toggle for overshoot protection.
- [ ] **The dot product** — How the dot product measures how much two vectors point the same way. Demo: drag two vectors and watch the dot value and the angle update while the sign changes colour.
- [ ] **Facing and field of view** — How a dot product test tells whether a target is in front of a character and inside its view cone. Demo: drag a player around a guard with a view angle slider and see the guard react.
- [ ] **Projection and reflection** — How to project one vector onto another and how to bounce a direction off a surface normal. Demo: drag an incoming arrow towards a rotatable wall and see its projection and reflection.
- [ ] **The 2D cross product** — How the perp-dot product tells whether a target is to the left or right and how it relates to perpendicular vectors. Demo: drag a target around a ship and watch the sign decide which way it turns.

## Track 2: Angles and interpolation

- [ ] **Radians, degrees, and the unit circle** — How angles are measured and how sine and cosine come from a point on a circle. Demo: drag a point around the unit circle and read the angle in both units with sine and cosine drawn as lines.
- [ ] **Sine waves for motion** — How amplitude, frequency and phase turn sine into bobbing, pulsing and swaying. Demo: three sliders shape the wave that drives a floating pickup and a graph.
- [ ] **From vector to angle with atan2** — How atan2 turns a direction into an angle in every quadrant. Demo: move the mouse to aim a turret and read the angle, with a toggle that shows how plain atan fails.
- [ ] **Rotating a vector** — How sine and cosine rotate a point around the origin or around any pivot. Demo: an angle slider rotates a shape around a draggable pivot.
- [ ] **Polar coordinates** — How describing a point by angle and radius makes circles, spirals and radial patterns simple. Demo: sliders for count, radius growth and twist arrange bullets into rings and spirals.
- [ ] **Angle wrapping and the shortest turn** — How to find the smallest difference between two angles so that objects never spin the long way round. Demo: a turret follows the mouse with a turn speed slider and a toggle between naive and wrapped differences.
- [ ] **Linear interpolation** — How lerp blends between two values with a parameter from 0 to 1. Demo: a slider for t blends a position, a size and a colour at the same time.
- [ ] **Inverse lerp and remap** — How to turn a value in one range into a fraction and then into another range. Demo: drag a health value and see it remapped to a bar width and a colour, with a clamp toggle.
- [ ] **Smoothstep** — How an S-shaped curve eases both ends of a transition. Demo: an A/B view moves two boxes with lerp and with smoothstep beside the two graphs.
- [ ] **Easing functions** — How ease-in, ease-out, back and bounce curves give movement character. Demo: pick an easing function from a list to see its graph and a box animated with it.
- [ ] **Exponential smoothing** — How to chase a target smoothly in a way that gives the same result at any frame rate. Demo: a follower chases the mouse with a smoothing slider, a frame-rate slider and a toggle between the naive and corrected formulas.

## Track 3: Curves and transforms

- [ ] **Quadratic Bezier curves** — How three points and repeated lerps define a smooth curve. Demo: drag the control points and a t slider to see the construction lines.
- [ ] **Cubic Bezier curves** — How four points give more control and how curves are joined smoothly into a path. Demo: drag the handles of two joined curves with a toggle that keeps the joint smooth.
- [ ] **Catmull-Rom splines** — How a curve can pass through every point you place. Demo: click to add points and adjust a tension slider to reshape the path.
- [ ] **Arc length and constant speed** — Why equal steps in t do not give equal distances and how a lookup table fixes it. Demo: two dots travel along one curve, one by t and one by distance, with a slider for table size.
- [ ] **2D transform matrices** — How one matrix stores translation, rotation and scale. Demo: sliders for each part transform a shape while the matrix values update.
- [ ] **The order of transforms** — Why rotating and then moving differs from moving and then rotating. Demo: drag transform steps into a different order and see the shape land somewhere else.
- [ ] **Transform hierarchies** — How child objects inherit the transforms of their parents. Demo: sliders rotate the shoulder, elbow and wrist of a robot arm.
- [ ] **Local space and world space** — How to convert points between the space of an object and the world using a transform and its inverse. Demo: move the mouse over a rotated ship to read the position in both spaces.
- [ ] **Cameras and world-to-screen** — How a camera is an inverse transform that pans, zooms and rotates the world. Demo: drag to pan and scroll to zoom a map, with click picking that converts the screen position back to world coordinates.
- [ ] **Perspective projection** — How dividing by depth makes distant things smaller. Demo: sliders for field of view and camera distance change a wireframe cube, with a toggle for orthographic projection.

## Track 4: 3D rotation and randomness

- [ ] **Euler angles and gimbal lock** — How three angles describe a 3D rotation and why they can lose an axis. Demo: three angle sliders rotate a wireframe plane inside gimbal rings until two rings line up.
- [ ] **Quaternion intuition** — How a quaternion stores a rotation as an axis and an angle without gimbal lock. Demo: drag an axis and an angle slider to rotate a wireframe cube and read the four quaternion numbers.
- [ ] **Slerp** — How spherical interpolation blends between two rotations at constant speed. Demo: a t slider blends two orientations in an A/B comparison against interpolated Euler angles.
- [ ] **Pseudo-random numbers and seeds** — How a generator makes repeatable sequences from a seed. Demo: type a seed to generate a small dungeon layout and press a button to confirm that the same seed always gives the same result.
- [ ] **Hashing coordinates** — How a hash turns a grid position into a repeatable random value without storing anything. Demo: pan across an endless star field generated from cell coordinates with a seed slider.
- [ ] **Distributions** — How adding or reshaping uniform random numbers makes bell curves and biased results. Demo: choose the number of dice and a bias curve and watch a histogram fill up.
- [ ] **Random points in shapes** — Why naive random points in a circle bunch up at the centre and how to fix it. Demo: an A/B view scatters points with the naive and corrected methods.
- [ ] **Weighted random choice** — How to pick items with different chances from a loot table. Demo: weight sliders for five items drive a roll button and a results chart.
- [ ] **Shuffle bags** — How drawing from a shuffled bag prevents long streaks while keeping the odds. Demo: compare the streaks of pure random and bag random draws with a bag size slider.

## Track 5: Noise and geometry

- [ ] **Value noise** — How interpolating random values on a grid makes smooth randomness. Demo: sliders for grid size and interpolation type redraw a noise image.
- [ ] **Perlin noise** — How gradient noise gives more natural results than value noise. Demo: an A/B view shows value and gradient noise with a toggle that draws the gradient arrows.
- [ ] **Simplex noise** — How a triangle grid makes noise with fewer directional artefacts and less work. Demo: an A/B comparison with Perlin noise has scale and scroll sliders.
- [ ] **Fractal noise** — How stacking octaves of noise adds detail at several scales. Demo: sliders for octaves, lacunarity and gain shape a terrain height map coloured by height.
- [ ] **Domain warping** — How feeding noise into the coordinates of other noise creates swirling organic shapes. Demo: a warp strength slider and an animation toggle distort a noise field.
- [ ] **Closest point on a segment** — How projection and clamping find the nearest point on a line segment. Demo: drag a point near a segment to see the closest point and the distance.
- [ ] **Line and segment intersection** — How to calculate where two lines cross and whether the crossing lies on both segments. Demo: drag four end points and see the intersection point and its two parameters.
- [ ] **Point in polygon** — How counting ray crossings tells whether a point is inside any polygon. Demo: drag the vertices of a polygon and move the mouse to see the crossings counted.
- [ ] **Barycentric coordinates** — How three weights locate a point inside a triangle and blend values across it. Demo: drag a point in a triangle to read its weights and the blended colour.
- [ ] **Polygon area and winding order** — How the shoelace formula gives the area of a polygon and the direction of its vertices. Demo: drag vertices to see the signed area flip when the order reverses.

## Track 6: Grids, probability, and balance

- [ ] **Grid coordinates and indices** — How to convert between world positions, cell coordinates and a one-dimensional array index. Demo: move the mouse over a grid with a cell size slider and read the cell and index.
- [ ] **Distance metrics** — How Manhattan, Chebyshev and Euclidean distance differ and which movement rules each one matches. Demo: click a cell and switch metric to see the distance to every other cell as a heat map.
- [ ] **Hex grids** — How axial and cube coordinates make neighbours and distances on hexagons simple. Demo: hover over a hex map to see coordinates, neighbours and the distance from a selected hex.
- [ ] **Isometric grids** — How to convert between grid and screen coordinates in an isometric view and how to pick tiles with the mouse. Demo: hover over an isometric map to highlight tiles with sliders for tile width and height.
- [ ] **Expected value** — How the average outcome lets you compare attacks, rewards and risks. Demo: sliders for hit chance, damage and critical chance compare the expected damage of two weapons as bars.
- [ ] **Repeated chances** — How to calculate the chance of at least one success over many attempts and why a 1 percent drop is not guaranteed in 100 tries. Demo: sliders for drop chance and attempts draw the probability curve beside a simulated result.
- [ ] **Pity timers** — How raising the chance after each failure limits bad luck while keeping the average rate. Demo: an A/B histogram compares the tries needed with and without a pity rule while you adjust a ramp slider.
- [ ] **Experience curves** — How linear, polynomial and exponential curves set the pace of levelling. Demo: choose a curve type and adjust its parameters to see the experience needed per level and the time to reach each level.
- [ ] **Damage formulas** — How subtractive and ratio-based armour formulas behave at the extremes. Demo: attack and armour sliders plot the damage from each formula side by side.
- [ ] **Diminishing returns** — How curves that flatten out keep stacked bonuses from breaking the game. Demo: a stat points slider moves along linear, hyperbolic and capped curves.

## Backlog

- (empty)
