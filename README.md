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

## Asset da sostituire

Le fotografie del design (polaroid nella sezione “AI products” e il ritratto
nella sezione “Styling Suite”) non sono esportabili dallo screenshot: al loro
posto ci sono placeholder a gradiente. Vanno sostituite con gli export reali
da Figma:

- `.ph-a` … `.ph-e` in `styles.css` → immagini delle polaroid
- `.portrait` in `styles.css` → ritratto fashion (sezione Styling Suite)

Il font di riferimento è **Poppins** (caricato da Google Fonts).
