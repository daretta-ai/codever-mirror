/* Codever landing — mosaics, lit grid cells, scroll reveal */

(function () {
  "use strict";

  /* Deterministic PRNG so mosaics render identically on every load */
  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const PALETTES = {
    violet: ["#6c4fd8", "#8a70e8", "#4a3596", "#2a2145", "#b9a6f0", "#7b5ce5"],
  };

  /* ---- Pixel mosaics ---- */
  document.querySelectorAll("[data-mosaic]").forEach(function (el) {
    const palette = PALETTES[el.dataset.mosaic] || PALETTES.violet;
    const cols = 24;
    const rows = 5;
    const rand = mulberry32(42);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement("span");
      const r = rand();
      /* roughly half the cells stay empty (transparent) */
      if (r > 0.48) {
        cell.style.background = palette[Math.floor(rand() * palette.length)];
        if (rand() > 0.75) cell.style.opacity = "0.55";
      }
      frag.appendChild(cell);
    }
    el.appendChild(frag);
  });

  /* ---- Softly lit cells on the background grid ---- */
  document.querySelectorAll("[data-cells]").forEach(function (el) {
    const rand = mulberry32(el.dataset.cells === "hero" ? 11 : 23);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 14; i++) {
      const cell = document.createElement("span");
      const col = Math.floor(rand() * 24);
      const row = Math.floor(rand() * 12);
      cell.style.left = "calc(var(--cell) * " + col + ")";
      cell.style.top = "calc(var(--cell) * " + row + ")";
      cell.style.opacity = String(0.35 + rand() * 0.65);
      frag.appendChild(cell);
    }
    el.appendChild(frag);
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
