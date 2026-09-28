# Pixel art curriculum

How to use: take the FIRST unchecked item, top to bottom. After publishing its lesson, change `- [ ]` to `- [x]` and append ` (published <YYYY-MM-DD>, <slug>)` to that line. If you discover something worth teaching that is not listed, append it to the Backlog section.

## Track 1: Pixels, canvases, and linework

- [x] **Pixels and resolution** — Why every pixel is a deliberate choice in pixel art and how the resolution of a sprite limits the detail it can hold. Demo: drag a slider to redraw the same procedural sprite on grids from 8 to 64 pixels wide and watch detail appear and vanish. (published 2026-09-27, pixels-and-resolution)
- [x] **Choosing a canvas size** — How common sprite sizes such as 8, 16, 32 and 64 pixels change your workload, your style and the screen resolution of the whole game. Demo: toggle a character between four canvas sizes placed on a mock game screen to compare how much space and detail each one gives. (published 2026-09-28, choosing-canvas-size)
- [ ] **Nearest neighbour scaling** — Why pixel art must be enlarged with nearest neighbour sampling and how smooth filtering blurs it. Demo: an A/B view scales one sprite with nearest neighbour and with bilinear filtering while you move a zoom slider.
- [ ] **Integer scaling and uneven pixels** — Why scaling by whole numbers keeps every pixel the same size while fractional scales create fat and thin pixels. Demo: a scale slider moves from 1x to 6x in small steps and highlights the columns that end up wider than their neighbours.
- [ ] **Straight lines and perfect slopes** — How lines built from equal steps such as 1:1, 2:1 and 3:1 look cleaner than lines at arbitrary angles. Demo: drag the end of a line around a grid to see its run lengths listed, with a toggle that snaps it to the nearest perfect slope.
- [ ] **Jaggies and how to spot them** — What jaggies are and how uneven runs of pixels break the flow of a line. Demo: click pixels to edit a wobbly line while a checker highlights every segment that breaks the pattern.
- [ ] **Clean curves** — How curves stay smooth when their segment lengths grow and shrink in a steady order. Demo: drag a control point to bend a pixel curve and read the run lengths printed beside it, with bad transitions marked in red.
- [ ] **Pixel-perfect lines and doubles** — Why stray corner pixels, called doubles, make lines look heavy and how removing them gives a clean stroke one pixel wide. Demo: draw freehand on a grid with a pixel-perfect toggle that removes doubles as you go.
- [ ] **Circles and ellipses at tiny sizes** — How to build round shapes from symmetric runs and why some diameters look rounder than others. Demo: a diameter slider draws circles from 3 to 32 pixels and lets you toggle between odd and even centres.
- [ ] **Symmetry and mirroring** — How mirror drawing speeds up sprite work and when to break symmetry so the result does not look stiff. Demo: a small editor with a mirror toggle lets you draw half a creature and then nudge single pixels to break the symmetry.

## Track 2: Colour and palettes

- [ ] **Hue, saturation, and value** — How the three parts of a colour work and why they are easier to reason about than red, green and blue numbers. Demo: three sliders recolour a simple sprite live and show the matching RGB values.
- [ ] **Value comes first** — Why a sprite must read clearly in greyscale before colour is added. Demo: toggle a scene between colour and greyscale and drag value sliders until the character separates from the background.
- [ ] **Building a colour ramp** — How to make an ordered ramp from dark to light that you can reuse for shading. Demo: pick a base colour and a step count to generate a ramp that is applied to a shaded ball.
- [ ] **Hue shifting** — Why shifting hue towards warm highlights and cool shadows makes ramps look richer than changing brightness alone. Demo: a hue shift slider morphs a straight ramp into a shifted one in an A/B comparison on the same sprite.
- [ ] **Saturation across a ramp** — Why saturation usually peaks in the mid-tones and falls off in the brightest and darkest steps. Demo: drag points on a saturation curve and watch the ramp and a sample sprite update.
- [ ] **Limited palettes** — How restricting the number of colours creates a unified look and faster decisions. Demo: a colour count slider reduces a procedural scene from 32 colours down to 4.
- [ ] **Sharing colours between ramps** — How one colour can serve several ramps so that a small palette covers many materials. Demo: click swatches to link ramps in a palette map and see the total colour count drop while the scene stays readable.
- [ ] **Contrast with the background** — How value and saturation contrast keep characters and pickups visible on busy backgrounds. Demo: drag a sprite across light and dark backgrounds while adjusting its brightness, with a contrast score shown.
- [ ] **Colour temperature and mood** — How warm and cool palettes change the mood of the same scene. Demo: a temperature slider shifts a small landscape from dawn to night by remapping its palette.
- [ ] **Classic hardware palettes** — What the Game Boy, NES and PICO-8 palettes look like and how fixed palettes shaped classic game art. Demo: choose a palette button to remap a scene to that palette using nearest colour matching.

## Track 3: Light, shading, and materials

- [ ] **Choosing a light source** — Why picking one light direction and keeping it consistent makes every sprite in a game belong together. Demo: drag a light around a pixel sphere and watch the highlight and shadow bands follow it.
- [ ] **Shading basic forms** — How spheres, cubes and cylinders each catch light differently and how complex sprites are built from them. Demo: switch between the three forms and change the number of shades from 2 to 5.
- [ ] **Avoiding pillow shading** — Why shading inwards from the outline flattens a form and how directional light fixes it. Demo: an A/B toggle shows the same sprite pillow shaded and correctly lit, with a slider that blends between the two.
- [ ] **Avoiding banding** — How shade bands that hug each other in parallel reveal the pixel grid and how to stagger them. Demo: click to move the edge of each shade band and see a detector mark the banded rows.
- [ ] **Dithering patterns** — How checker and ordered patterns fake extra shades with only two colours. Demo: pick a dither pattern and drag a slider to control how far it spreads across a gradient.
- [ ] **Anti-aliasing by hand** — How placing a few in-between pixels softens a jagged edge without blurring it. Demo: click to add in-between pixels on a curve and compare your result with no smoothing and with automatic smoothing.
- [ ] **Highlights and reflected light** — How a small highlight and a faint bounce light on the shadow side make forms look solid. Demo: toggles add a highlight, a core shadow and reflected light to a sphere one layer at a time.
- [ ] **Cast shadows and grounding** — How a simple shadow under a sprite anchors it to the ground and shows its height. Demo: drag a character up and down while switching between no shadow, a blob shadow and a projected shadow.
- [ ] **Shiny materials: metal and glass** — How high contrast and sharp highlights make a surface read as polished. Demo: a shininess slider changes a grey ball from matte clay to chrome by remapping its shade bands.
- [ ] **Rough materials: wood, stone, and cloth** — How small clusters of pixels suggest texture without turning into noise. Demo: choose a material for a shaded cube and adjust a texture density slider to find the point where it becomes noisy.

## Track 4: Tiles and environments

- [ ] **Tiles and the tile grid** — How a game world is assembled from a small set of repeated square tiles. Demo: paint a small level with four procedural tiles and see the tile index array update.
- [ ] **Seamless tiling** — How to make the edges of a tile match so that it repeats without visible seams. Demo: edit a tile in a small editor while a 3x3 repeated preview and an offset toggle reveal the seams.
- [ ] **Breaking up repetition** — How tile variants and scattered details hide the grid in large areas. Demo: a slider sets the number of grass variants from 1 to 4 and a button reshuffles the field.
- [ ] **Edges and corners of a platform tileset** — How a set of nine pieces made of corners, edges and a centre builds platforms of any size. Demo: drag to resize a platform and watch the nine pieces highlight as they are reused.
- [ ] **Autotiling with a 4-bit mask** — How checking four neighbours lets the game pick the right tile from a set of 16 automatically. Demo: paint terrain with the mouse and see the mask number and chosen tile of each cell.
- [ ] **Corner-aware autotiling** — Why inner corners need diagonal neighbours and how the 47 tile blob set handles them. Demo: paint the same shape with the 16 tile and the 47 tile rules side by side to compare the corners.
- [ ] **Top-down and side-view conventions** — How the camera angle changes the way walls, floors and objects are drawn. Demo: toggle one small room between a side view and a three-quarter top-down view.
- [ ] **Props larger than one tile** — How trees, houses and rocks span several tiles and how their draw order creates overlap. Demo: drag a character in front of and behind a tree with a toggle for sorting by vertical position.
- [ ] **Depth with atmospheric perspective** — How lowering contrast and shifting colour with distance separates background layers from gameplay. Demo: sliders control the fade and tint of three layers of procedural hills.
- [ ] **Animated tiles** — How a few looping frames bring water, lava and grass to life. Demo: a frame count toggle and a speed slider drive an animated water tile repeated across a pond.

## Track 5: Characters and animation

- [ ] **Silhouettes first** — Why a character should be recognisable from its filled outline alone. Demo: toggle a silhouette view and drag limbs and props until the pose reads clearly.
- [ ] **Proportions at 16 and 32 pixels** — How head size and body ratios change the appeal of a character and how much room is left for detail. Demo: a head to body slider rebuilds a procedural character at both sizes.
- [ ] **Faces in a handful of pixels** — How one or two pixels for the eyes and mouth can carry a whole expression. Demo: click pixels on an 8 by 8 face to build expressions and cycle through presets.
- [ ] **Outlines: black, coloured, and selective** — How different outline styles change readability and softness. Demo: switch one sprite between no outline, black outline, coloured outline and selective outline on light and dark backgrounds.
- [ ] **Frames and timing** — How the frame count and the time each frame is held control the feeling of speed and weight. Demo: set the hold time of each frame in a bouncing ball loop and scrub through it on a timeline.
- [ ] **Idle animations** — How a breathing loop of two to four frames keeps a standing character alive. Demo: toggle between a static sprite, a two frame bob and a four frame breathing loop with a speed slider.
- [ ] **Walk cycles** — How the contact, down, passing and up poses combine into a looping walk. Demo: scrub through a labelled walk cycle frame by frame and toggle between 4 and 8 frame versions.
- [ ] **Squash and stretch** — How deforming a sprite while keeping its volume adds weight and energy. Demo: a slider sets the amount of squash and stretch on a jumping slime from none to extreme.
- [ ] **Sub-pixel animation** — How shifting colours inside a sprite suggests movement smaller than one pixel. Demo: an A/B view compares a whole pixel bob with a sub-pixel bob at the same speed.
- [ ] **Anticipation and smears** — How a wind-up pose and a smear frame make a fast attack readable. Demo: toggle anticipation and smear frames on and off in a sword swing and step through the result.

## Track 6: UI and game integration

- [ ] **Pixel fonts** — How letters are designed on tiny grids and what keeps them legible. Demo: edit glyphs on a 5 by 7 grid and see a line of sample text update live.
- [ ] **Icons that read at a glance** — How to simplify an object into a clear icon of 16 pixels or fewer. Demo: toggle a set of icons between 8, 12 and 16 pixel versions and shrink them to real size for a squint test.
- [ ] **Panels and nine-slice scaling** — How a small bordered image stretches into windows of any size without distorting its corners. Demo: drag the corner of a dialog box and toggle between naive stretching and nine-slice scaling.
- [ ] **Sprite sheets** — How animation frames are packed into one image and addressed by row and column. Demo: click cells of a procedural sprite sheet to build a frame sequence and play it back.
- [ ] **Palette swapping** — How storing colour indexes instead of colours lets one sprite become many variants. Demo: click swatches to change palette entries and see an enemy recoloured instantly.
- [ ] **Generated outlines** — How a game can build an outline from the pixels of a sprite to highlight selected or hovered objects without extra art. Demo: hover over sprites to outline them with toggles for outline colour and for 4 or 8 neighbour checks.
- [ ] **Pixel-perfect cameras** — Why scrolling by fractions of a pixel makes art shimmer and how snapping the camera fixes it. Demo: an A/B view scrolls a tile map with a smooth camera and a snapped camera while you change the speed.
- [ ] **Parallax scrolling** — How layers moving at different speeds create depth in a 2D scene. Demo: drag to scroll a scene and set the speed factor of each of four layers with sliders.
- [ ] **Rotating and scaling sprites in game** — Why rotating pixel art creates mixed pixel sizes and how rendering to a low resolution buffer keeps it consistent. Demo: an angle slider rotates a sprite with a toggle between full resolution rotation and rotation on the low resolution grid.
- [ ] **Exporting without seams** — How padding and edge extrusion in a sprite sheet prevent colour bleeding between neighbouring tiles. Demo: zoom and scroll a tile map with toggles for padding and extrusion to make the seams appear and disappear.

## Backlog

- (empty)
