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

- `assets/styling-portrait.webp` + `assets/styling-mask.png` — ritratto della
  sezione “Styling Suite”, con maschera a pixel applicata via CSS `mask-image`.

### Da sostituire

Le polaroid della sezione “AI products” sono ancora placeholder a gradiente:
vanno sostituite con gli export reali da Figma (`.ph-a` … `.ph-e` in
`styles.css`).

Il font di riferimento è **Poppins** (caricato da Google Fonts).
