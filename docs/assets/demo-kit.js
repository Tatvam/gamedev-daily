/* DemoKit — helpers for interactive lesson demos. No dependencies.
 *
 * ---------------------------------------------------------------------------------------------
 * MARKUP
 *
 *   <figure class="demo" data-demo="bounce">
 *     <canvas id="bounce"></canvas>
 *     <figcaption>What to try, and what to notice.</figcaption>
 *   </figure>
 *
 *   Two canvases side by side (stacks on phones):
 *     <div class="demo-split">
 *       <div class="demo-stage"><canvas id="a"></canvas><span class="demo-label">Without</span></div>
 *       <div class="demo-stage"><canvas id="b"></canvas><span class="demo-label">With</span></div>
 *     </div>
 *
 * ---------------------------------------------------------------------------------------------
 * DemoKit.canvas(target, options) -> handle
 *
 *   target     canvas element or CSS selector
 *   options
 *     height     CSS pixels (default 320). Or use aspect.
 *     aspect     width / height, e.g. 16 / 9. Combine with minHeight / maxHeight.
 *     animate    true (default) runs every frame while on screen. false draws only on demand.
 *     update(dt, s)    advance your simulation. dt is seconds, never more than 0.1.
 *     draw(ctx, s)     paint. The canvas is already cleared and scaled for high-DPI screens,
 *                      so you work in CSS pixels: 0..s.width by 0..s.height.
 *     drag       true if the reader drags things on the canvas (stops the page scrolling).
 *     keys       true to make the canvas focusable and track held keys in s.keys.
 *     label      short description for screen readers.
 *     onDown(p, s), onMove(p, s), onUp(p, s)    pointer callbacks, p = { x, y, down, inside }
 *     onKey(key, isDown, s)                     key callback, key is lower case ('arrowleft', 'space', 'a')
 *     onResize(s)                               called when the canvas size changes
 *
 *   s (state passed to your callbacks)
 *     width, height   canvas size in CSS pixels
 *     time            seconds the demo has been running
 *     dt              seconds since the previous frame
 *     frame           frame counter
 *     pointer         { x, y, down, inside }
 *     keys            Set of held keys (when keys: true)
 *     colors          theme colours, see DemoKit.colors()
 *
 *   handle
 *     redraw()        draw now (use after a control changes in an animate:false demo)
 *     play(), pause() control the loop
 *     state           the same s object
 *
 *   Animated demos get a Pause button in the bottom-right corner of the canvas automatically.
 *   Keep that corner (about 80 by 40 pixels) free of anything important.
 *   Lessons are read on phones: a full-width canvas can be as narrow as 320 pixels, so lay
 *   things out from s.width and s.height, never from fixed coordinates.
 *
 * ---------------------------------------------------------------------------------------------
 * DemoKit.controls(figure) -> builder        figure = the <figure class="demo"> or a selector
 *
 *   var ui = DemoKit.controls('[data-demo="bounce"]');
 *   var g = ui.slider({ label: 'Gravity', min: 0, max: 2000, step: 10, value: 980, unit: ' px/s²',
 *                       onInput: function (v) { ... } });
 *   g.value            current number          g.set(500)   change it (does not call onInput)
 *
 *   ui.toggle({ label, value, onChange(bool) })          -> { value, set(bool) }
 *   ui.select({ label, options, value, onChange(str) })  -> { value, set(str) }
 *                      options: ['a', 'b'] or [{ value: 'a', label: 'Option A' }]
 *   ui.button({ label, onClick })                        -> { el }
 *   ui.readout({ label })                                -> { set(text) }
 *
 * ---------------------------------------------------------------------------------------------
 * DemoKit.shader(target, options) -> handle          full-canvas WebGL fragment shader
 *
 *   options
 *     fragment   GLSL ES 1.0 fragment shader source. "precision mediump float;" is added if missing.
 *     uniforms   { u_name: 1.5 | [r, g, b] | function (s) { return value; } }   floats and vectors
 *     height / aspect / minHeight / maxHeight / animate / label    as in DemoKit.canvas
 *   Provided for you:  uniform vec2 u_resolution;  (pixels)
 *                      uniform float u_time;       (seconds)
 *                      uniform vec2 u_mouse;       (pixels, origin bottom-left)
 *   handle.set(name, value)   change a uniform       handle.redraw(), play(), pause()
 *   If the shader fails to compile, the error is shown inside the figure.
 *
 * ---------------------------------------------------------------------------------------------
 * DemoKit.colors(element?) -> { bg, surface, surface2, ink, ink2, ink3, line, topic, good, bad, warn }
 *   Current theme colours as CSS colour strings. Inside draw() use s.colors instead.
 *
 * DemoKit.rng(seed) -> function returning a repeatable number in [0, 1)
 * DemoKit.clamp(x, min, max), DemoKit.lerp(a, b, t)
 * ---------------------------------------------------------------------------------------------
 */
(function () {
  'use strict';

  // Opening a lesson with #gdd-test runs every demo even when it is off screen. The validator
  // uses this so that mistakes in draw/update code show up as errors.
  var TEST = /(^|[#&])gdd-test\b/.test(window.location.hash);

  var reducedMotion = !TEST && !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function resolve(target) {
    if (typeof target === 'string') return document.querySelector(target);
    return target || null;
  }

  function colors(element) {
    var cs = getComputedStyle(element || document.body);
    function read(name, fallback) {
      var value = cs.getPropertyValue(name).trim();
      return value || fallback;
    }
    return {
      bg: read('--bg', '#faf8f4'),
      surface: read('--surface', '#ffffff'),
      surface2: read('--surface-2', '#f1eee7'),
      ink: read('--ink', '#1d1b18'),
      ink2: read('--ink-2', '#55514a'),
      ink3: read('--ink-3', '#857f74'),
      line: read('--line', '#e0dbd0'),
      topic: read('--topic', '#1f6fd6'),
      good: read('--good', '#23803a'),
      bad: read('--bad', '#c0362c'),
      warn: read('--warn', '#a76a00')
    };
  }

  function ensureStage(cv) {
    var parent = cv.parentElement;
    if (parent && parent.classList.contains('demo-stage')) return parent;
    var stage = document.createElement('div');
    stage.className = 'demo-stage';
    parent.insertBefore(stage, cv);
    stage.appendChild(cv);
    return stage;
  }

  function showError(stage, message, kind) {
    var box = stage.querySelector('.demo-error');
    if (!box) {
      box = document.createElement('div');
      box.className = 'demo-error';
      stage.appendChild(box);
    }
    box.setAttribute('data-kind', kind || 'error');
    box.setAttribute('role', 'alert');
    box.textContent = message;
  }

  function computeSize(stage, opts) {
    var w = Math.max(1, Math.round(stage.clientWidth));
    var h = opts.aspect ? w / opts.aspect : (opts.height || 320);
    if (opts.maxHeight) h = Math.min(h, opts.maxHeight);
    if (opts.minHeight) h = Math.max(h, opts.minHeight);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    return { w: w, h: Math.max(1, Math.round(h)), dpr: dpr };
  }

  /* Shared frame loop: runs only while the demo is on screen, the tab is visible, and the
     reader has not paused it. Calls step(dt) each frame. */
  function makeLoop(stage, cv, animate, step, renderOnce) {
    var wantPlay = animate && !reducedMotion;
    var onScreen = TEST || !('IntersectionObserver' in window);
    var running = false;
    var failed = false;
    var raf = 0;
    var last = 0;
    var button = null;

    function shouldRun() {
      return animate && wantPlay && onScreen && !failed && (TEST || !document.hidden);
    }
    function tick(now) {
      raf = 0;
      if (!running) return;
      var dt = Math.min(Math.max((now - last) / 1000, 0), 0.1);
      last = now;
      try {
        step(dt);
      } catch (error) {
        fail(error);
        return;
      }
      raf = window.requestAnimationFrame(tick);
    }
    function sync() {
      var run = shouldRun();
      if (run && !running) {
        running = true;
        last = window.performance.now();
        raf = window.requestAnimationFrame(tick);
      } else if (!run && running) {
        running = false;
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
      }
      if (button) {
        button.textContent = wantPlay ? 'Pause' : 'Play';
        button.setAttribute('aria-pressed', wantPlay ? 'false' : 'true');
      }
    }
    function fail(error) {
      failed = true;
      running = false;
      showError(stage, 'This demo hit an error: ' + (error && error.message ? error.message : error));
      if (window.console && console.error) console.error('DemoKit demo error:', error);
    }
    function safeRender() {
      if (failed) return;
      try { renderOnce(); } catch (error) { fail(error); }
    }

    if (animate) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'demo-play';
      button.addEventListener('click', function () {
        wantPlay = !wantPlay;
        sync();
      });
      stage.appendChild(button);
    }

    if (!TEST && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[entries.length - 1].isIntersecting;
        sync();
      }, { rootMargin: '80px' }).observe(stage);
    }
    document.addEventListener('visibilitychange', sync);

    return {
      sync: sync,
      render: safeRender,
      isRunning: function () { return running; },
      play: function () { wantPlay = true; sync(); },
      pause: function () { wantPlay = false; sync(); }
    };
  }

  function watchSize(stage, onResize) {
    if ('ResizeObserver' in window) {
      var lastWidth = -1;
      new ResizeObserver(function () {
        var w = Math.round(stage.clientWidth);
        if (w !== lastWidth) { lastWidth = w; onResize(); }
      }).observe(stage);
    } else {
      window.addEventListener('resize', onResize);
      onResize();
    }
  }

  function keyName(event) {
    var key = event.key || '';
    if (key === ' ' || key === 'Spacebar') return 'space';
    return key.toLowerCase();
  }

  function attachInput(cv, opts, state, loop) {
    function place(event) {
      var rect = cv.getBoundingClientRect();
      state.pointer.x = event.clientX - rect.left;
      state.pointer.y = event.clientY - rect.top;
    }
    function after() { if (!loop.isRunning()) loop.render(); }

    if (opts.drag) cv.style.touchAction = 'none';

    cv.addEventListener('pointerdown', function (event) {
      place(event);
      state.pointer.down = true;
      state.pointer.inside = true;
      if (opts.drag && cv.setPointerCapture) {
        try { cv.setPointerCapture(event.pointerId); } catch (e) { /* ignore */ }
      }
      if (opts.keys && cv.focus) cv.focus({ preventScroll: true });
      if (opts.onDown) opts.onDown(state.pointer, state);
      after();
    });
    cv.addEventListener('pointermove', function (event) {
      place(event);
      state.pointer.inside = true;
      if (opts.onMove) opts.onMove(state.pointer, state);
      after();
    });
    function release(event) {
      place(event);
      var wasDown = state.pointer.down;
      state.pointer.down = false;
      if (wasDown && opts.onUp) opts.onUp(state.pointer, state);
      after();
    }
    cv.addEventListener('pointerup', release);
    cv.addEventListener('pointercancel', release);
    cv.addEventListener('pointerleave', function () {
      state.pointer.inside = false;
      after();
    });

    if (opts.keys) {
      cv.tabIndex = 0;
      cv.addEventListener('keydown', function (event) {
        if (event.metaKey || event.ctrlKey || event.altKey) return;
        var key = keyName(event);
        if (key === 'tab' || key === 'escape') return;
        if (key.indexOf('arrow') === 0 || key === 'space') event.preventDefault();
        var fresh = !state.keys.has(key);
        state.keys.add(key);
        if (fresh && opts.onKey) opts.onKey(key, true, state);
        after();
      });
      cv.addEventListener('keyup', function (event) {
        var key = keyName(event);
        state.keys.delete(key);
        if (opts.onKey) opts.onKey(key, false, state);
        after();
      });
      cv.addEventListener('blur', function () { state.keys.clear(); after(); });
    }
  }

  function newState(cv) {
    return {
      width: 0, height: 0, dpr: 1,
      time: 0, dt: 0, frame: 0,
      pointer: { x: 0, y: 0, down: false, inside: false },
      keys: new Set(),
      colors: colors(cv)
    };
  }

  function describe(cv, opts) {
    if (opts.label && !cv.getAttribute('aria-label')) cv.setAttribute('aria-label', opts.label);
    if (!cv.getAttribute('role')) cv.setAttribute('role', opts.keys ? 'application' : 'img');
  }

  function canvas(target, options) {
    var cv = resolve(target);
    if (!cv || cv.tagName !== 'CANVAS') throw new Error('DemoKit.canvas: no canvas found for ' + target);
    var opts = options || {};
    var animate = opts.animate !== false;
    var stage = ensureStage(cv);
    var ctx = cv.getContext('2d');
    var state = newState(cv);
    describe(cv, opts);

    function render() {
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      ctx.clearRect(0, 0, state.width, state.height);
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([]);
      ctx.fillStyle = state.colors.ink;
      ctx.strokeStyle = state.colors.ink;
      ctx.font = '13px system-ui, -apple-system, "Segoe UI", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      if (opts.draw) {
        ctx.save();
        opts.draw(ctx, state);
        ctx.restore();
      }
    }
    function step(dt) {
      state.dt = dt;
      state.time += dt;
      state.frame += 1;
      if (opts.update) opts.update(dt, state);
      render();
    }

    var loop = makeLoop(stage, cv, animate, step, render);

    function resize() {
      var size = computeSize(stage, opts);
      cv.style.height = size.h + 'px';
      cv.width = Math.round(size.w * size.dpr);
      cv.height = Math.round(size.h * size.dpr);
      state.width = size.w;
      state.height = size.h;
      state.dpr = size.dpr;
      if (opts.onResize) opts.onResize(state);
      loop.render();
    }

    attachInput(cv, opts, state, loop);
    document.addEventListener('gdd:theme', function () {
      state.colors = colors(cv);
      loop.render();
    });
    resize();
    watchSize(stage, resize);
    loop.sync();

    return {
      canvas: cv, ctx: ctx, state: state,
      redraw: loop.render, play: loop.play, pause: loop.pause
    };
  }

  function shader(target, options) {
    var cv = resolve(target);
    if (!cv || cv.tagName !== 'CANVAS') throw new Error('DemoKit.shader: no canvas found for ' + target);
    var opts = options || {};
    var animate = opts.animate !== false;
    var stage = ensureStage(cv);
    var state = newState(cv);
    var values = {};
    var locations = {};
    describe(cv, opts);

    Object.keys(opts.uniforms || {}).forEach(function (name) { values[name] = opts.uniforms[name]; });

    var gl = null;
    try {
      gl = cv.getContext('webgl', { antialias: false }) || cv.getContext('experimental-webgl');
    } catch (e) { gl = null; }

    var program = null;
    var inert = { canvas: cv, gl: null, state: state, set: function (name, value) { values[name] = value; },
      redraw: function () {}, play: function () {}, pause: function () {} };

    if (!gl) {
      cv.style.height = computeSize(stage, opts).h + 'px';
      showError(stage, 'This demo needs WebGL, which is not available in this browser.', 'no-webgl');
      return inert;
    }

    function compile(type, source) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        var log = gl.getShaderInfoLog(sh) || 'unknown error';
        gl.deleteShader(sh);
        throw new Error(log);
      }
      return sh;
    }

    try {
      var source = String(opts.fragment || '');
      if (!/\bprecision\s+(lowp|mediump|highp)\s+float\b/.test(source)) {
        source = 'precision mediump float;\n' + source;
      }
      var vs = compile(gl.VERTEX_SHADER, 'attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }');
      var fs = compile(gl.FRAGMENT_SHADER, source);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'link failed');
      }
    } catch (error) {
      cv.style.height = computeSize(stage, opts).h + 'px';
      showError(stage, 'Shader failed to compile: ' + error.message);
      if (window.console && console.error) console.error('DemoKit shader error:', error.message);
      return inert;
    }

    gl.useProgram(program);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    function location(name) {
      if (!(name in locations)) locations[name] = gl.getUniformLocation(program, name);
      return locations[name];
    }
    function send(name, value) {
      var loc = location(name);
      if (loc === null) return;
      if (typeof value === 'function') value = value(state);
      if (typeof value === 'boolean') value = value ? 1 : 0;
      if (typeof value === 'number') gl.uniform1f(loc, value);
      else if (value && value.length === 2) gl.uniform2f(loc, value[0], value[1]);
      else if (value && value.length === 3) gl.uniform3f(loc, value[0], value[1], value[2]);
      else if (value && value.length === 4) gl.uniform4f(loc, value[0], value[1], value[2], value[3]);
    }

    function render() {
      gl.viewport(0, 0, cv.width, cv.height);
      gl.useProgram(program);
      send('u_resolution', [cv.width, cv.height]);
      send('u_time', state.time);
      send('u_mouse', [state.pointer.x * state.dpr, (state.height - state.pointer.y) * state.dpr]);
      Object.keys(values).forEach(function (name) { send(name, values[name]); });
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function step(dt) {
      state.dt = dt;
      state.time += dt;
      state.frame += 1;
      if (opts.update) opts.update(dt, state);
      render();
    }

    var loop = makeLoop(stage, cv, animate, step, render);

    function resize() {
      var size = computeSize(stage, opts);
      cv.style.height = size.h + 'px';
      cv.width = Math.round(size.w * size.dpr);
      cv.height = Math.round(size.h * size.dpr);
      state.width = size.w;
      state.height = size.h;
      state.dpr = size.dpr;
      if (opts.onResize) opts.onResize(state);
      loop.render();
    }

    attachInput(cv, opts, state, loop);
    document.addEventListener('gdd:theme', function () {
      state.colors = colors(cv);
      loop.render();
    });
    resize();
    watchSize(stage, resize);
    loop.sync();

    return {
      canvas: cv, gl: gl, state: state,
      set: function (name, value) {
        values[name] = value;
        if (!loop.isRunning()) loop.render();
      },
      redraw: loop.render, play: loop.play, pause: loop.pause
    };
  }

  var controlCount = 0;

  function controls(target) {
    var figure = resolve(target);
    if (!figure) throw new Error('DemoKit.controls: no element found for ' + target);
    var panel = figure.querySelector('.demo-controls');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'demo-controls';
      var caption = figure.querySelector('figcaption');
      if (caption) figure.insertBefore(panel, caption);
      else figure.appendChild(panel);
    }

    function make(tag, className, text) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    return {
      el: panel,

      slider: function (o) {
        var decimals = (String(o.step === undefined ? 1 : o.step).split('.')[1] || '').length;
        var format = o.format || function (v) { return v.toFixed(decimals) + (o.unit || ''); };
        var wrap = make('label', 'control');
        var head = make('span', 'control-head');
        var out = make('output');
        head.appendChild(make('span', 'control-name', o.label));
        head.appendChild(out);
        var input = make('input');
        input.type = 'range';
        input.min = o.min;
        input.max = o.max;
        input.step = o.step === undefined ? 1 : o.step;
        input.value = o.value;
        wrap.appendChild(head);
        wrap.appendChild(input);
        panel.appendChild(wrap);
        function show() { out.textContent = format(Number(input.value)); }
        input.addEventListener('input', function () {
          show();
          if (o.onInput) o.onInput(Number(input.value));
        });
        show();
        return {
          el: input,
          get value() { return Number(input.value); },
          set: function (v) { input.value = v; show(); }
        };
      },

      toggle: function (o) {
        var wrap = make('label', 'control is-toggle');
        var input = make('input');
        input.type = 'checkbox';
        input.checked = !!o.value;
        wrap.appendChild(input);
        wrap.appendChild(make('span', 'control-name', o.label));
        panel.appendChild(wrap);
        input.addEventListener('change', function () {
          if (o.onChange) o.onChange(input.checked);
        });
        return {
          el: input,
          get value() { return input.checked; },
          set: function (v) { input.checked = !!v; }
        };
      },

      select: function (o) {
        var wrap = make('label', 'control');
        wrap.appendChild(make('span', 'control-name', o.label));
        var input = make('select');
        (o.options || []).forEach(function (option) {
          var item = make('option');
          if (typeof option === 'string') { item.value = option; item.textContent = option; }
          else { item.value = option.value; item.textContent = option.label; }
          input.appendChild(item);
        });
        if (o.value !== undefined) input.value = o.value;
        wrap.appendChild(input);
        panel.appendChild(wrap);
        input.addEventListener('change', function () {
          if (o.onChange) o.onChange(input.value);
        });
        return {
          el: input,
          get value() { return input.value; },
          set: function (v) { input.value = v; }
        };
      },

      button: function (o) {
        var wrap = make('div', 'control');
        var input = make('button', 'btn', o.label);
        input.type = 'button';
        input.addEventListener('click', function () { if (o.onClick) o.onClick(); });
        wrap.appendChild(input);
        panel.appendChild(wrap);
        return { el: input };
      },

      readout: function (o) {
        controlCount += 1;
        var wrap = make('div', 'control is-readout');
        wrap.appendChild(make('span', 'control-name', o.label));
        var value = make('span', 'readout-value', o.value === undefined ? '' : String(o.value));
        value.setAttribute('aria-live', 'off');
        wrap.appendChild(value);
        panel.appendChild(wrap);
        return {
          el: value,
          set: function (text) {
            var next = String(text);
            if (value.textContent !== next) value.textContent = next;
          }
        };
      }
    };
  }

  function rng(seed) {
    var a = (seed === undefined ? 1 : seed) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  window.DemoKit = {
    canvas: canvas,
    shader: shader,
    controls: controls,
    colors: colors,
    rng: rng,
    clamp: function (x, min, max) { return Math.min(Math.max(x, min), max); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    testMode: TEST
  };
})();
