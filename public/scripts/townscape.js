/*
 * Townscape: fills the free room of a section with small towns of buildings
 * from /images/buildings.svg. Every visit gets its own towns; on a resize
 * the same visit keeps the same dice, so the towns only move to fit.
 *
 * The layer, an element with data-townscape, goes inside the skewed block of
 * a section. That block clips it, so a building never shows outside its
 * section. Buildings stand beside the text, never over it and never above
 * it; only at the very bottom a few come in under it. Towards the sides of
 * the window and towards the bottom it gets busier, and the towns run on over
 * the sides and the lower edge of the section.
 */
(function () {
  var NAMESPACE = "http://www.w3.org/2000/svg";
  var XLINK = "http://www.w3.org/1999/xlink";

  // Sizes in em, as in styles/layout/buildings.css. The depth is how far the
  // foot of a building reaches back on the ground.
  var HOUSE = { width: 3, height: 10, depth: 1.3 };
  var HOUSES = ["house-01", "house-02", "house-03", "house-04", "house-05", "house-06", "house-07", "house-08", "house-09", "house-10", "house-11", "house-12"];
  // The odds say how often a kind is chosen: the large ones are rare.
  var LANDMARKS = [
    { ids: ["arch-01", "arch-02"], width: 5.8, height: 14.6, depth: 2.6, odds: 4 },
    { ids: ["arch-03", "arch-04"], width: 7.9, height: 13.6, depth: 2.4, odds: 4 },
    { ids: ["arch-05", "arch-06"], width: 16.6, height: 16.2, depth: 3.6, odds: 1.5 },
    { ids: ["arch-07", "arch-08"], width: 14.3, height: 20.3, depth: 7, odds: 1.5 },
    { ids: ["spike-01", "spike-02", "spike-03", "spike-04", "spike-05"], width: 8.1, height: 19.5, depth: 3.4, odds: 2.5 },
    { ids: ["tower-01"], width: 9, height: 25.5, depth: 3.2, odds: 1 },
    { ids: ["tower-02"], width: 12, height: 22, depth: 3.6, odds: 1 },
  ];

  // The ground is a grid of plots; every other row stands half a plot aside
  var PLOT = { width: 2.5, depth: 1.2, shake: 0.3 };

  // Small, fast and good enough: the same seed gives the same towns
  var dice = function (seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  var build = function (layer, seed) {
    var random = dice(seed);
    var between = function (low, high) { return low + random() * (high - low); };
    var pick = function (list) { return list[Math.floor(random() * list.length)]; };

    var block = layer.parentElement; // the skewed block
    var section = block.parentElement;
    var em = parseFloat(getComputedStyle(layer).fontSize);
    var frame = layer.getBoundingClientRect();
    var blockFrame = block.getBoundingClientRect();
    var page = document.documentElement.clientWidth;

    // All measures below are in em, from the top left corner of the layer
    var x = function (px) { return (px - frame.left) / em; };
    var y = function (px) { return (px - frame.top) / em; };

    // The slanted lower edge of the block. The block clips what is drawn in
    // it, so a town may run on over this edge and over the sides of the
    // window: it looks as if it goes on where it can't be seen.
    var matrix = getComputedStyle(block).transform.match(/matrix\(([^)]+)\)/);
    var slope = matrix ? parseFloat(matrix[1].split(",")[1]) : 0;
    var lowest = y(blockFrame.bottom);
    var rise = Math.abs(slope) * blockFrame.width / em;
    var bottomAt = function (at) {
      var along = (at - x(blockFrame.left)) / (blockFrame.width / em);
      return slope < 0 ? lowest - rise * along : lowest - rise * (1 - along);
    };

    // Not above the section, and not under the bar at the top of the page.
    // With data-townscape-top="open" the built-up sides do run on upward,
    // past the bar and off the top of the page: into its corners.
    var bar = document.querySelector("header.navbar");
    var top = y(Math.max(section.getBoundingClientRect().top, bar ? bar.getBoundingClientRect().bottom : 0)) + 1;
    var open = layer.dataset.townscapeTop === "open";
    // With data-townscape-density="0.3" there is only a sprinkling
    var density = parseFloat(layer.dataset.townscapeDensity || 1);
    var pageTop = y(-window.scrollY);
    // The upper edge of the block is slanted as well. Where it is in view,
    // a building stays below it: a roof that is cut off looks wrong.
    var highest = y(blockFrame.top);
    var topAt = function (at) {
      var along = (at - x(blockFrame.left)) / (blockFrame.width / em);
      return Math.max(top, (slope < 0 ? highest + rise * (1 - along) : highest + rise * along) + 1);
    };

    // The column of the text stays empty over its whole height. What is left
    // are two strips, each from the text to a side of the window.
    var gap = 2;
    var text = [Infinity, -Infinity];
    var textEnd = -Infinity;
    Array.prototype.forEach.call(section.children, function (child) {
      if (child === block || child.hasAttribute("data-townscape-ignore")) return;
      var rect = child.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      text = [Math.min(text[0], x(rect.left) - gap), Math.max(text[1], x(rect.right) + gap)];
      textEnd = Math.max(textEnd, y(rect.bottom) + gap);
    });
    var strips = [
      { from: x(0), to: Math.min(text[0], x(page)), edge: x(0), text: text[0] },
      { from: Math.max(text[1], x(0)), to: x(page), edge: x(page), text: text[1] },
    ].filter(function (strip) {
      strip.span = strip.to - strip.from;
      // A narrow strip, as on a small screen, is built on sparsely
      strip.room = Math.min(1, strip.span / 26);
      return strip.span > 1;
    });

    // How far a point is from the text, on the way to the side of the window:
    // 0 at the text, 1 at the side. Towards the side it gets busier.
    var outward = function (strip, at) {
      return Math.max(0, Math.min(1, Math.abs(at - strip.text) / strip.span));
    };

    // How far down a point on the ground is: 0 where the highest houses
    // stand, 1 at the lower edge. Towards the bottom it gets busier too.
    // It fills up fast at first and slower after: these are the values at
    // the top, a quarter, half and three quarters of the way, and the bottom.
    var FILL = [0.1, 0.45, 0.7, 0.85, 1];
    var downward = function (from, at, foot) {
      var down = Math.max(0, Math.min(1, (foot - from) / Math.max(bottomAt(at) - from, 1))) * (FILL.length - 1);
      var step = Math.min(Math.floor(down), FILL.length - 2);
      return FILL[step] + (FILL[step + 1] - FILL[step]) * (down - step);
    };

    // May a building stand with its foot at (left, foot)? Never in or over
    // the column of the text and never above the section; it may be cut off
    // by the side of the window or by the lower edge, if some of it shows.
    var fits = function (strip, left, foot, size) {
      var beside = strip.edge < strip.text ? left + size.width <= strip.to && left + size.width > strip.from + 0.8 : left >= strip.from && left < strip.to - 0.8;
      var under = open && size === HOUSE ? foot > pageTop + 1 : foot - size.height >= Math.max(topAt(left), topAt(left + size.width));
      return beside && under && foot - size.height * 0.75 < bottomAt(left + size.width / 2);
    };

    // A calm unevenness over the ground, so the edge of the built-up area is
    // ragged: a value between 0 and 1 that changes slowly from place to place
    var salt = Math.floor(random() * 65536);
    var grain = function (column, row) {
      var n = Math.imul(column * 374761393 + row * 668265263 + salt, 1274126177);
      return ((n ^ (n >>> 13)) >>> 0) / 4294967296;
    };
    var unevenness = function (left, foot) {
      var u = left / 7, v = foot / 3.5;
      var c = Math.floor(u), r = Math.floor(v);
      var s = u - c, t = v - r;
      s = s * s * (3 - 2 * s);
      t = t * t * (3 - 2 * t);
      return (grain(c, r) * (1 - s) + grain(c + 1, r) * s) * (1 - t) + (grain(c, r + 1) * (1 - s) + grain(c + 1, r + 1) * s) * t;
    };

    // The plot of the grid with the given number
    var plotAt = function (column, row) {
      return { column: column, row: row, left: (column + (row % 2 ? 0.5 : 0)) * PLOT.width, foot: row * PLOT.depth };
    };
    var taken = {};
    var key = function (plot) { return plot.column + "/" + plot.row; };
    var buildings = [];

    // Something larger than a house, with nothing built on the ground it
    // stands on. Gives back where it stands, or nothing if it has no place.
    var landmarks = [];
    var landmark = function (strip, middle, ground, widest) {
      // The larger buildings keep well away from each other
      var near = landmarks.some(function (other) { return Math.hypot(other.x - middle, (other.y - ground) * 2) < 24; });
      if (near) return null;
      var kinds = LANDMARKS.filter(function (kind) { return kind.width <= widest; });
      var turn = random() * kinds.reduce(function (sum, kind) { return sum + kind.odds; }, 0);
      var kind = kinds.find(function (candidate) { return (turn -= candidate.odds) < 0; });
      if (!kind) return null;
      var left = middle - kind.width / 2;
      var foot = ground + kind.depth / 2;
      if (!fits(strip, left, foot, kind)) return null;
      landmarks.push({ x: middle, y: ground });
      buildings.push({ id: pick(kind.ids), left: left, foot: foot, size: kind });
      for (var row = Math.floor((foot - kind.depth) / PLOT.depth); row <= Math.ceil(foot / PLOT.depth); row++) {
        for (var column = Math.floor(left / PLOT.width) - 1; column <= Math.ceil((left + kind.width) / PLOT.width); column++) {
          var plot = plotAt(column, row);
          if (plot.left + HOUSE.width > left + 0.4 && plot.left < left + kind.width - 0.4 && plot.foot > foot - kind.depth && plot.foot <= foot + 0.2) taken[key(plot)] = true;
        }
      }
      return { left: left, right: left + kind.width, foot: foot };
    };

    strips.forEach(function (strip) {
      var floor = Math.max(bottomAt(strip.from), bottomAt(strip.to));
      // The ground runs on a little below the lower edge
      var ground = [Math.min(topAt(strip.from), topAt(strip.to)) + HOUSE.height, floor + HOUSE.height * 0.7];
      if (ground[1] <= ground[0]) return;

      // Towns in the open ground between the text and the built-up side:
      // larger and more of them towards the side, hamlets near the text
      var towns = [];
      var fronts = [];
      var wanted = Math.round((strip.span * (ground[1] - ground[0])) / 150 * strip.room * density);
      for (var n = 0; n < wanted; n++) {
        for (var attempt = 0; attempt < 30; attempt++) {
          var middle = between(strip.from, strip.to);
          var height = between(ground[0], ground[1]);
          var out = outward(strip, middle);
          var low = downward(ground[0], middle, height);
          if (random() > (0.12 + 0.88 * out) * (0.12 + 0.88 * low)) continue;
          var size = random();
          var reach = (size < 0.15 ? between(8, 11) : size < 0.55 ? between(4.5, 7.5) : between(2, 4)) * (0.45 + 0.75 * out) * (0.6 + 0.5 * low);
          var town = { x: middle, y: height, reach: reach };
          // Near the text towns keep ground between them: next to each other
          // with room in between, or one well below the other. Towards the
          // side they may grow into each other.
          var apart = 1 - 0.7 * out * low;
          var crowded = towns.some(function (other) {
            var beside = Math.abs(other.x - town.x) > (other.reach + town.reach + HOUSE.width + 1) * apart;
            var below = Math.abs(other.y - town.y) > ((other.reach + town.reach) / 2 + HOUSE.height * 0.6) * apart;
            return !beside && !below;
          });
          if (crowded) continue;
          towns.push(town);
          // Some of the larger towns stand around something else
          if (town.reach > 5 && random() < 0.45) {
            var front = landmark(strip, town.x, town.y, town.reach * 2.2);
            if (front) fronts.push(front);
          }
          break;
        }
      }

      // Here and there something larger stands in the built-up side as well
      for (var extra = Math.round(strip.span * (ground[1] - ground[0]) / 700 * strip.room * density); extra > 0; extra--) {
        var spot = { x: strip.edge + (strip.text - strip.edge) * between(0, 0.3), y: between((ground[0] + ground[1]) / 2, ground[1]) };
        var stands = landmark(strip, spot.x, spot.y, 13);
        if (stands) fronts.push(stands);
      }

      // Houses, plot by plot
      var rows = [Math.floor((open ? pageTop : ground[0]) / PLOT.depth), Math.ceil(ground[1] / PLOT.depth)];
      var columns = [Math.floor(strip.from / PLOT.width) - 2, Math.ceil(strip.to / PLOT.width) + 1];
      for (var row = rows[0]; row <= rows[1]; row++) {
        for (var column = columns[0]; column <= columns[1]; column++) {
          var plot = plotAt(column, row);
          if (taken[key(plot)]) continue;
          var centre = plot.left + HOUSE.width / 2;
          var away = outward(strip, centre);

          // Built-up towards the side of the window and towards the bottom,
          // with a ragged edge: at the top only the very side has houses,
          // further down the houses come closer to the text
          var down = downward(ground[0], centre, plot.foot);
          var deep = down;
          var side = Math.max(0, Math.min(1, (away * (0.52 + 0.72 * deep) + (unevenness(plot.left, plot.foot) - 0.5) * 0.45 - 0.5) / 0.35));
          var chance = Math.pow(side, 1.4) * 0.97 * strip.room * (0.3 + 0.7 * deep);
          // A town: close together in the middle, thinning out towards its edge
          towns.forEach(function (town) {
            var from = Math.hypot(centre - town.x, (plot.foot - town.y) * 2) / town.reach;
            chance = Math.max(chance, from < 1 ? 1.05 - from * from * 0.75 : from < 1.5 ? 0.06 : 0);
          });
          // A house on its own, now and then; hardly any right beside the text
          chance = Math.max(chance, 0.012);
          if (away < 0.12) chance *= 0.5;
          // Up beside the bar only the built-up side goes on, and narrower:
          // it draws back into the corner
          if (open && plot.foot - HOUSE.height < top) {
            var corner = Math.max(0, Math.min(1, (away + (unevenness(plot.left, plot.foot) - 0.5) * 0.3 - 0.62 - (top - (plot.foot - HOUSE.height)) * 0.012) / 0.3));
            chance = Math.pow(corner, 1.4) * 0.22 * strip.room;
          }
          // Right in front of something larger it is quieter, so it shows
          var hidden = fronts.some(function (front) {
            return plot.foot > front.foot && plot.foot < front.foot + PLOT.depth * 4 && plot.left + HOUSE.width > front.left && plot.left < front.right;
          });
          if (hidden) chance *= 0.3;
          if (random() >= chance * density) continue;

          var place = { left: plot.left + between(-PLOT.shake, PLOT.shake), foot: plot.foot + between(-PLOT.shake, PLOT.shake) * 0.6 };
          if (!fits(strip, place.left, place.foot, HOUSE)) continue;
          taken[key(plot)] = true;
          buildings.push({ id: pick(HOUSES), left: place.left, foot: place.foot, size: HOUSE });
        }
      }
    });

    // At the very bottom the houses do come into the column of the text,
    // thinly: about one plot in five. They stand so low that their roofs
    // stay below the text, and the lower edge cuts them off.
    // With data-townscape-floor="0.9" that row is dense instead, and runs
    // over the whole width: a town along the bottom edge.
    var floorDensity = parseFloat(layer.dataset.townscapeFloor || 0);
    if (text[0] < text[1]) {
      var under = floorDensity ? [x(0), x(page)] : [Math.max(text[0], x(0)), Math.min(text[1], x(page))];
      var lowestFoot = Math.max(bottomAt(under[0]), bottomAt(under[1])) + HOUSE.height * 0.7;
      for (var row = Math.floor((textEnd + HOUSE.height) / PLOT.depth); row <= Math.ceil(lowestFoot / PLOT.depth); row++) {
        for (var column = Math.floor(under[0] / PLOT.width) - 2; column <= Math.ceil(under[1] / PLOT.width) + 1; column++) {
          var plot = plotAt(column, row);
          if (taken[key(plot)] || random() >= (floorDensity || 0.2)) continue;
          var left = plot.left + between(-PLOT.shake, PLOT.shake);
          var foot = plot.foot + between(-PLOT.shake, PLOT.shake) * 0.6;
          // Only where the strips beside the text don't build, with the roof
          // below the text and above the lower edge
          var inColumn = left + HOUSE.width > under[0] && left < under[1] && left > x(0) - HOUSE.width && left < x(page);
          if (!inColumn || foot - HOUSE.height < textEnd || foot - HOUSE.height * 0.75 >= bottomAt(left + HOUSE.width / 2)) continue;
          taken[key(plot)] = true;
          buildings.push({ id: pick(HOUSES), left: left, foot: foot, size: HOUSE });
        }
      }
    }

    // What stands further back is drawn first
    buildings.sort(function (a, b) { return a.foot - b.foot || a.left - b.left; });
    var drawing = document.createDocumentFragment();
    buildings.forEach(function (building) {
      var svg = document.createElementNS(NAMESPACE, "svg");
      svg.setAttribute("class", building.id);
      svg.setAttribute("focusable", "false");
      svg.style.left = building.left.toFixed(2) + "em";
      svg.style.top = (building.foot - building.size.height).toFixed(2) + "em";
      var use = document.createElementNS(NAMESPACE, "use");
      use.setAttributeNS(XLINK, "xlink:href", "/images/buildings.svg#" + building.id);
      svg.appendChild(use);
      drawing.appendChild(svg);
    });
    layer.replaceChildren(drawing);
  };

  var start = function () {
    var layers = Array.prototype.slice.call(document.querySelectorAll("[data-townscape]"));
    if (!layers.length) return;
    var seeds = layers.map(function () { return Math.floor(Math.random() * 4294967296); });
    var draw = function () {
      layers.forEach(function (layer, i) { build(layer, seeds[i]); });
    };
    draw();

    // Only another width changes the room; a phone that hides its address
    // bar while scrolling changes the height all the time
    var width = window.innerWidth;
    var waiting;
    window.addEventListener("resize", function () {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      clearTimeout(waiting);
      waiting = setTimeout(draw, 150);
    });
    // The text may get another size once the fonts are in
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
