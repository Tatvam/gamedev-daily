/* Game Dev Daily — site shell.
   Loaded in <head> of every page. Applies the theme, then on DOM ready injects the header and
   footer, builds the lesson meta row from the page's <meta name="gdd:*"> tags, and wires up
   code tabs. Lessons never need to call anything in this file. */
(function () {
  'use strict';

  var TOPICS = {
    'pixel-art': 'Pixel Art',
    'game-physics': 'Game Physics',
    'game-engine': 'Game Engine',
    'game-history': 'History & Optimizations',
    'game-idea': 'Daily Game Idea',
    'game-math': 'Game Math',
    'shaders-graphics': 'Shaders & Graphics',
    'game-design': 'Design & Game Feel'
  };
  var ENGINES = {
    'agnostic': 'Any engine',
    'godot': 'Godot',
    'unity': 'Unity',
    'godot+unity': 'Godot + Unity'
  };

  // Site root, worked out from where this script was loaded from (…/assets/site.js).
  var script = document.currentScript;
  var root = script ? new URL('..', script.src).href : './';

  var root_el = document.documentElement;

  // Opened with #gdd-test (the validator does this), every script error is recorded on <html>
  // so that the check can read it back from the page.
  if (/(^|[#&])gdd-test\b/.test(window.location.hash)) {
    var recorded = [];
    var record = function (message) {
      recorded.push(String(message).replace(/\s+/g, ' ').slice(0, 300));
      root_el.setAttribute('data-gdd-errors', recorded.join(' || '));
    };
    window.addEventListener('error', function (event) {
      record((event.message || 'error') + (event.lineno ? ' (line ' + event.lineno + ')' : ''));
    });
    window.addEventListener('unhandledrejection', function (event) {
      record('unhandled promise rejection: ' + (event.reason && event.reason.message ? event.reason.message : event.reason));
    });
  }

  function storedTheme() {
    try { return localStorage.getItem('gdd-theme'); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try { localStorage.setItem('gdd-theme', value); } catch (e) { /* private mode: ignore */ }
  }
  function systemDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function currentTheme() {
    return root_el.getAttribute('data-theme') || (systemDark() ? 'dark' : 'light');
  }
  function announceTheme() {
    document.dispatchEvent(new CustomEvent('gdd:theme', { detail: { theme: currentTheme() } }));
  }

  var saved = storedTheme();
  if (saved === 'light' || saved === 'dark') root_el.setAttribute('data-theme', saved);

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { announceTheme(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === 'text') node.textContent = attrs[key];
        else if (key === 'class') node.className = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  function meta(name) {
    var tag = document.querySelector('meta[name="gdd:' + name + '"]');
    return tag ? tag.getAttribute('content') : '';
  }

  function formatDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return iso || '';
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Number(m[3]) + ' ' + months[Number(m[2]) - 1] + ' ' + m[1];
  }

  function buildHeader() {
    var mark = el('span', { 'class': 'brand-mark', 'aria-hidden': 'true' },
      [el('i'), el('i'), el('i'), el('i')]);
    var brand = el('a', { 'class': 'brand', href: root + 'index.html' },
      [mark, el('span', { text: 'Game Dev Daily' })]);

    var toggle = el('button', { 'class': 'theme-toggle', type: 'button' });
    function label() {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      toggle.textContent = next === 'dark' ? 'Dark' : 'Light';
      toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    }
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root_el.setAttribute('data-theme', next);
      storeTheme(next);
      label();
      announceTheme();
    });
    document.addEventListener('gdd:theme', label);
    label();

    var nav = el('nav', { 'class': 'site-nav', 'aria-label': 'Site' }, [
      el('a', { href: root + 'index.html#archive', text: 'All lessons' }),
      toggle
    ]);

    var header = el('header', { 'class': 'site-header' },
      [el('div', { 'class': 'site-header-inner' }, [brand, nav])]);
    document.body.insertBefore(header, document.body.firstChild);
  }

  function buildFooter() {
    var footer = el('footer', { 'class': 'site-footer' }, [
      el('span', { text: 'Game Dev Daily. Lessons are written by AI agents and may contain mistakes. ' }),
      el('a', { href: root + 'index.html', text: 'Back to all lessons' })
    ]);
    document.body.appendChild(footer);
  }

  function buildLessonHead() {
    var head = document.querySelector('.lesson-head');
    if (!head) return;
    var topic = meta('topic') || document.body.getAttribute('data-topic') || '';
    if (topic && !document.body.getAttribute('data-topic')) document.body.setAttribute('data-topic', topic);

    if (!head.querySelector('.topic-badge') && TOPICS[topic]) {
      head.insertBefore(
        el('a', { 'class': 'topic-badge', href: root + 'index.html?topic=' + topic + '#archive', text: TOPICS[topic] }),
        head.firstChild);
    }
    if (!head.querySelector('.lesson-meta')) {
      var items = [];
      var date = meta('date'), level = meta('level'), engine = meta('engine'), minutes = meta('minutes');
      if (date) items.push(formatDate(date));
      if (level) items.push(level.charAt(0).toUpperCase() + level.slice(1));
      if (engine) items.push(ENGINES[engine] || engine);
      if (minutes) items.push(minutes + ' min read');
      if (items.length) {
        head.appendChild(el('ul', { 'class': 'lesson-meta' },
          items.map(function (text) { return el('li', { text: text }); })));
      }
    }
  }

  function buildCodeTabs() {
    var groups = document.querySelectorAll('.code-tabs');
    Array.prototype.forEach.call(groups, function (group, groupIndex) {
      var panels = Array.prototype.filter.call(group.children, function (child) {
        return child.tagName === 'PRE' && child.hasAttribute('data-lang');
      });
      if (panels.length < 2) return;

      var list = el('div', { 'class': 'tab-list', role: 'tablist' });
      var tabs = panels.map(function (panel, i) {
        var id = 'code-' + groupIndex + '-' + i;
        panel.id = panel.id || id;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '0');
        var tab = el('button', {
          type: 'button', role: 'tab', 'aria-controls': panel.id, text: panel.getAttribute('data-lang')
        });
        list.appendChild(tab);
        return tab;
      });

      function select(index, focus) {
        tabs.forEach(function (tab, i) {
          var on = i === index;
          tab.setAttribute('aria-selected', on ? 'true' : 'false');
          tab.setAttribute('tabindex', on ? '0' : '-1');
          panels[i].hidden = !on;
        });
        if (focus) tabs[index].focus();
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(i, false); });
        tab.addEventListener('keydown', function (event) {
          if (event.key === 'ArrowRight') { select((i + 1) % tabs.length, true); event.preventDefault(); }
          if (event.key === 'ArrowLeft') { select((i + tabs.length - 1) % tabs.length, true); event.preventDefault(); }
        });
      });

      group.insertBefore(list, group.firstChild);
      group.classList.add('is-ready');
      select(0, false);
    });
  }

  function ready() {
    buildHeader();
    buildLessonHead();
    buildCodeTabs();
    buildFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();

  window.GDD = { root: root, topics: TOPICS, engines: ENGINES, formatDate: formatDate, theme: currentTheme };
})();
