/* ROCAD Consulting — homepage behavior
   1. Inline line-icon set (Lucide-style paths from the design system's Icon.jsx)
   2. Reveal-on-scroll for the Invisible Business Model trays */

(function () {
  'use strict';

  /* ---------- 1. Icons ---------- */
  var PATHS = {
    users: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2 M11 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    link: 'M10 13a5 5 0 0 0 7.07 0l1.42-1.42a5 5 0 0 0-7.07-7.07L10 6.05 M14 11a5 5 0 0 0-7.07 0L5.5 12.42a5 5 0 0 0 7.07 7.07L14 17.95',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2',
    alert: 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z M12 9v4 M12 17h.01',
    dollar: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    check: 'M20 6 9 17l-5-5',
    x: 'M18 6 6 18 M6 6l12 12',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.35-4.35',
    bot: 'M12 8V4H8 M20 12v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4Z M2 14h2 M20 14h2 M9 14v1 M15 14v1',
    plug: 'M12 22v-5 M9 8V2 M15 8V2 M18 8v3a6 6 0 0 1-12 0V8Z',
    database: 'M12 3c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3Z M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6 M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6',
    cloud: 'M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6-1.9A5 5 0 0 0 6.5 19h11Z',
    mail: 'M4 4h16v16H4Z M4 6l8 7 8-7',
    trending: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    workflow: 'M4 4h6v6H4Z M14 14h6v6h-6Z M10 7h4a4 4 0 0 1 4 4v3',
    layers: 'M12 2 2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5',
    arrowRight: 'M5 12h14 M12 5l7 7-7 7',
    message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
    cpu: 'M9 2v2 M15 2v2 M9 20v2 M15 20v2 M2 9h2 M2 15h2 M20 9h2 M20 15h2 M6 6h12v12H6Z'
  };

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function iconSvg(name, size) {
    var d = PATHS[name];
    if (!d) return null;
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    d.split(' M').forEach(function (seg, i) {
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', i === 0 ? seg : 'M' + seg);
      svg.appendChild(path);
    });
    return svg;
  }

  document.querySelectorAll('[data-icon]').forEach(function (el) {
    var svg = iconSvg(el.getAttribute('data-icon'), el.getAttribute('data-size') || 20);
    if (svg) el.replaceWith(svg);
  });

  /* ---------- 2. Nav: translucent blur once the page scrolls ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Scroll reveals (single + staggered groups) ---------- */
  document.querySelectorAll('[data-reveal-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--d', (i * 90) + 'ms');
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function (el) {
    observer.observe(el);
  });
})();
