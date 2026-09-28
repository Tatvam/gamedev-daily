# Shaders and graphics curriculum

How to use: take the FIRST unchecked item, top to bottom. After publishing its lesson, change `- [ ]` to `- [x]` and append ` (published <YYYY-MM-DD>, <slug>)` to that line. If you discover something worth teaching that is not listed, append it to the Backlog section.

## Track 1: Foundations and shaping functions

- [x] **What a shader is** — How a fragment shader is a small program that runs once for every pixel and returns a colour. Demo: a live shader paints the canvas from pixel coordinates while sliders for red, green and blue change its output. (published 2026-09-27, what-a-shader-is)
- [x] **The rendering pipeline** — How vertices become triangles, then fragments, then pixels, and where vertex and fragment shaders fit in GLSL, Godot and Unity. Demo: step through the stages of drawing one triangle with sliders that move its vertices and a toggle that shows the rasterised fragments. (published 2026-09-28, rendering-pipeline)
- [ ] **UV coordinates** — How normalised coordinates from 0 to 1 let a shader work at any resolution. Demo: view UV as colour with toggles to centre the origin and correct the aspect ratio.
- [ ] **Colour as vectors** — How colours are vectors that can be added, multiplied and swizzled. Demo: pick two colours and an operation to see the result, with sliders for each channel.
- [ ] **Step and smoothstep** — How thresholds create hard and soft edges. Demo: sliders for the edge position and softness draw the function as a graph and as a gradient.
- [ ] **Blending with mix** — How mix interpolates between colours using any value as a mask. Demo: choose two colours and a mask pattern with a slider for blend amount.
- [ ] **Repeating space with fract** — How fract and floor tile space into cells that each have their own local coordinates. Demo: a tile count slider repeats a simple motif with a toggle that shows cell coordinates.
- [ ] **Stripes and checkerboards** — How to combine fract, step and mod into basic patterns. Demo: sliders for frequency, angle and line width switch between stripes, grids and checkers.
- [ ] **Circles from distance** — How the length function turns distance from a point into discs, rings and glows. Demo: sliders for radius, edge softness and ring thickness shape a circle.
- [ ] **Alpha and blending** — How alpha combines a fragment with what is already on screen and why premultiplied alpha avoids dark fringes. Demo: toggle between straight and premultiplied alpha and between normal, additive and multiply blending on overlapping shapes.

## Track 2: Shapes, motion, and textures

- [ ] **2D signed distance functions** — How a function that returns the distance to the edge of a shape draws boxes, rounded boxes and lines with clean edges. Demo: choose a shape and adjust its size and corner radius with a toggle that shows the distance field as bands.
- [ ] **Combining distance fields** — How min, max and smooth minimum join, cut and melt shapes together. Demo: drag two shapes together and pick union, subtraction, intersection or smooth union with a smoothness slider.
- [ ] **Time and animation** — How a time uniform with sine and fract creates pulsing and looping motion. Demo: sliders for speed and amplitude drive a pulsing shape with a pause toggle.
- [ ] **Scrolling UVs** — How adding an offset to the UV moves a pattern across a surface for conveyors, clouds and waterfalls. Demo: direction and speed sliders scroll two pattern layers at different rates.
- [ ] **Rotating and scaling UV space** — How transforming the coordinates instead of the shape rotates and zooms a pattern. Demo: angle, zoom and pivot sliders transform a grid pattern.
- [ ] **Polar coordinates in shaders** — How converting UV to angle and radius makes radial bars, spirals and sunbursts. Demo: sliders for segments, twist and fill amount shape a radial cooldown indicator.
- [ ] **UV distortion** — How offsetting coordinates with a wave bends whatever is drawn. Demo: sliders for amplitude, frequency and speed ripple a checker pattern.
- [ ] **Texture sampling** — How a sampler returns a texel for a UV, shown with a texture generated in code. Demo: move a probe across a small generated texture to see the sampled texel, with sliders for UV scale and offset.
- [ ] **Wrap modes** — How repeat, clamp and mirror decide what happens outside the 0 to 1 range. Demo: switch wrap mode while a slider scales the UV beyond the edges of the texture.
- [ ] **Texture filtering** — How nearest and linear filtering differ when a texture is magnified. Demo: an A/B view zooms into a tiny generated texture with both filters.
- [ ] **Mipmaps** — How smaller copies of a texture prevent shimmering when it is drawn small or at a steep angle. Demo: a checker floor stretches into the distance with a mipmap toggle and a bias slider.

## Track 3: Lighting

- [ ] **Normals and Lambert diffuse** — How the dot product of the surface normal and the light direction gives basic shading. Demo: drag a light around a sphere drawn in the shader with a toggle that shows the normals as colour.
- [ ] **Point lights and attenuation** — How the brightness of a light falls off with distance. Demo: drag a point light over a surface with sliders for range and falloff curve.
- [ ] **Blinn-Phong specular** — How the half vector creates highlights and how shininess controls their size. Demo: sliders for shininess and specular strength change a lit sphere.
- [ ] **Normal maps** — How a texture of stored normals fakes fine surface detail on flat geometry. Demo: a generated bump pattern is lit by a draggable light with a strength slider.
- [ ] **Lighting 2D sprites** — How normal maps let flat sprites react to lights in a 2D game. Demo: drag a coloured light around a sprite generated in code with a toggle for the normal map.
- [ ] **Rim light and Fresnel** — How surfaces that face away from the viewer can glow at their edges. Demo: sliders for rim power and colour light the edge of a sphere.
- [ ] **Toon shading** — How quantising light into bands produces a cartoon look. Demo: a band count slider and an edge softness slider restyle a lit sphere, with a toggle for a hard specular spot.
- [ ] **Outlines for 3D shapes** — How outlines can be drawn from the view angle or from edges in depth and normals, and how the inverted hull method does the same with geometry. Demo: toggle between a view angle outline and an edge detection outline on a shaded shape with a thickness slider.

## Track 4: Noise and 2D game effects

- [ ] **Random values from a hash** — How a shader makes repeatable random numbers from coordinates without any stored state. Demo: a cell size slider changes a grid of random grey cells with a toggle to animate the seed.
- [ ] **Noise in a fragment shader** — How to write smooth value and gradient noise in GLSL and when it can replace a noise texture. Demo: scale and speed sliders animate a noise field with a toggle between the two types.
- [ ] **Cellular patterns** — How the distance to the nearest random point makes cells, scales and cracks. Demo: sliders for cell count and jitter change the pattern with a toggle between distance and edge display.
- [ ] **Procedural materials** — How layered noise and simple shaping build wood, marble and clouds. Demo: choose a material and adjust the octave, stretch and contrast sliders.
- [ ] **Hit flash** — How mixing the colour of a sprite towards white shows that damage was taken. Demo: click a sprite to trigger a flash with sliders for duration and flash colour.
- [ ] **Dissolve** — How comparing noise with a threshold burns a sprite away with a glowing edge. Demo: a progress slider dissolves a sprite with sliders for edge width and edge colour.
- [ ] **Palette swap on the GPU** — How looking up colours in a palette texture recolours a sprite in the shader. Demo: choose a palette row to recolour a character with a slider that blends between two palettes.
- [ ] **Sprite outlines** — How sampling neighbouring texels for alpha draws an outline around a sprite. Demo: sliders for thickness and colour outline a sprite with a toggle between 4 and 8 samples.
- [ ] **2D water** — How distortion, scrolling and a tinted reflection make a water surface. Demo: sliders for wave height, speed and tint control water that reflects the scene above it.
- [ ] **Fire** — How scrolling noise shaped by a gradient and mapped through a colour ramp becomes a flame. Demo: sliders for height, speed and turbulence shape a campfire.

## Track 5: Screen effects and post-processing

- [ ] **Full-screen passes** — How post-processing draws the finished frame to a texture and runs a shader over it, as with a screen shader in Godot or a full-screen pass in Unity. Demo: toggle simple effects such as invert and greyscale on a small animated scene with a strength slider.
- [ ] **Pixelation** — How snapping UVs to a grid lowers the apparent resolution. Demo: a pixel size slider pixelates an animated scene.
- [ ] **Vignette** — How darkening towards the edges focuses attention on the centre. Demo: sliders for radius, softness and strength shape the vignette.
- [ ] **Chromatic aberration** — How sampling the red, green and blue channels at slightly different offsets imitates a lens. Demo: a strength slider and a radial toggle split the colours of a scene.
- [ ] **CRT and scanlines** — How scanlines, screen curvature and a pixel mask imitate an old television. Demo: toggles and sliders for each part build up the look step by step.
- [ ] **Blur** — How averaging neighbouring samples blurs an image and why a Gaussian blur is split into two passes. Demo: a radius slider blurs a scene with a toggle between box and Gaussian weights.
- [ ] **Bloom** — How extracting bright areas, blurring them and adding them back makes lights glow. Demo: sliders for threshold, radius and intensity come with a view that shows each stage.
- [ ] **Gamma and linear colour** — Why lighting maths must happen in linear space and how gamma correction converts the result for display. Demo: an A/B view blends colours and lights with and without gamma correction.
- [ ] **Tone mapping** — How bright values above 1 are compressed into the range a screen can show. Demo: an exposure slider and a choice of Reinhard, ACES or plain clamping change a bright scene.
- [ ] **Colour grading** — How contrast, saturation and tint adjustments, or a lookup table, set the mood of a frame. Demo: sliders for lift, contrast, saturation and tint grade a scene with a split-screen comparison.

## Track 6: Performance and advanced rendering

- [ ] **Overdraw** — Why drawing the same pixel many times with transparency is expensive and how to see it. Demo: a layer count slider stacks transparent quads in a heat map view that shows how often each pixel is shaded.
- [ ] **Draw calls and batching** — Why many small draw calls are slow and how batching sprites into one buffer helps. Demo: a sprite count slider and a batching toggle show the frame time for each approach.
- [ ] **Precision** — How lowp, mediump and highp affect accuracy and why large coordinates or time values break patterns on mobile hardware. Demo: a time offset slider pushes coordinates to large values until the pattern breaks up, with a toggle that simulates medium precision.
- [ ] **Branching and cheap maths** — When if statements cost performance and how step and mix can replace them. Demo: an A/B view runs the same effect with and without branches while an iteration slider raises the load and a frame time readout compares them.
- [ ] **Ray marching basics** — How stepping along a ray using a distance function renders 3D shapes without triangles. Demo: a step limit slider renders a sphere with a view that colours pixels by the number of steps taken.
- [ ] **3D distance functions** — How spheres, boxes and tori are defined by distance and then combined or repeated. Demo: choose shapes and an operation with sliders for blend smoothness and repetition.
- [ ] **Normals and lighting for ray marching** — How the gradient of the distance field gives a surface normal for lighting. Demo: drag a light around a ray-marched scene with a toggle that shows the normals and a slider for the sampling offset.
- [ ] **Soft shadows and ambient occlusion** — How extra marches towards the light and along the normal give soft shadows and contact darkening. Demo: sliders for shadow softness and occlusion strength come with a toggle for each effect.
- [ ] **Shadow mapping** — How rendering depth from the point of view of the light decides which pixels are in shadow. Demo: drag a light in a 2D scene to see its one-dimensional depth map beside the shadowed result, with sliders for bias and resolution.
- [ ] **Forward and deferred rendering** — How the two approaches handle many lights and what a G-buffer stores. Demo: a light count slider compares the estimated shading cost of each approach while a view shows the albedo, normal and depth buffers of a small scene.
- [ ] **Physically based rendering intuition** — How roughness and metallic parameters describe most real materials while conserving energy. Demo: sliders for roughness, metallic and base colour change a lit sphere.

## Backlog

- (empty)
