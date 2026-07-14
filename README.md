# Codever — Landing page

Landing page statica realizzata a partire dal frame **Desktop** del file Figma
“Codever 2026” (node `208-15341`).

## Struttura

- `index.html` — markup di tutte le sezioni (hero, statement, servizi, AI products, Styling Suite, contatti, footer a mosaico)
- `styles.css` — stile: palette scura viola, griglia pixel di fondo, card, animazioni di reveal
- `main.js` — generazione deterministica dei mosaici pixel, celle luminose sulla griglia, scroll reveal

## Come vederla

È un sito statico senza build step: basta aprire `index.html` nel browser,
oppure servirla con un qualsiasi static server:

```bash
npx serve .
# oppure
python3 -m http.server 8000
```

## Asset

- `assets/styling-portrait.webp` — ritratto della sezione “Styling Suite”
- `assets/product-*.{png,webp}` — foto prodotto della sezione “AI products”
- `assets/styling-mask.png` — maschera a pixel applicata a tutte le foto via
  CSS `mask-image` (inlinata come data URI in `styles.css`, variabile
  `--pixel-mask`, perché le mask da URL esterno sono bloccate dal CORS quando
  la pagina è aperta via `file://`)

Il font di riferimento è **Poppins** (caricato da Google Fonts).
