# Codever — sito con Payload CMS

Il sito di **codever.it**: la landing page (frame **Desktop** del file Figma
“Codever 2026”, node `208-15341`) portata dentro un'app **Next.js 15** con
**Payload CMS 3** come CMS. Tutti i testi e le immagini della pagina si
modificano dal pannello admin, senza toccare il codice.

## Stack

- **Next.js 15** (App Router) — rendering del sito
- **Payload CMS 3** — admin su `/admin`, REST API su `/api/*`
- **SQLite** (`@payloadcms/db-sqlite`) — database a file locale, zero configurazione
  (si passa a Postgres/MongoDB cambiando l'adapter in `src/payload.config.ts`)

## Avvio

```bash
cp .env.example .env      # poi personalizza PAYLOAD_SECRET
npm install
npm run dev               # http://localhost:3000  (admin: /admin)
```

Al primo avvio Payload crea lo schema (in dev) e un **seed automatico** popola
la landing con i contenuti originali (testi + immagini caricate nella
collezione Media). Alla prima visita di `/admin` viene chiesto di creare
l'utente amministratore.

### Produzione

In produzione lo schema non viene creato automaticamente: vanno eseguite le
migration prima dell'avvio.

```bash
npm run build
npm run migrate
npm start
```

## Struttura dei contenuti

- **Global “Landing page”** (`src/globals/Landing.ts`) — tutte le sezioni in tab:
  SEO, Header, Hero, Statement, Servizi (card ripetibili), AI products
  (foto fluttuanti, max 5, posizionate secondo l'ordine), Styling Suite,
  Chiusura e contatti.
- **Collezione Media** — immagini caricate dall'editor (icone, foto prodotto, ritratto).
- **Collezione Users** — utenti dell'admin.

Il seed iniziale è in `src/seed.ts` (eseguito da `onInit`, idempotente).

## Struttura del codice

- `src/app/(frontend)/` — la landing: `page.tsx` legge il global `landing` via
  Local API e rende le sezioni; `Effects.tsx` replica gli effetti originali
  (mosaici pixel deterministici, celle luminose, glow che segue il cursore,
  scroll reveal); `styles.css` è il foglio di stile originale, invariato.
- `src/app/(payload)/` — route dell'admin e delle API generate da Payload.
- `src/migrations/` — migration del database per la produzione.
- `legacy-static/` — la landing statica originale, tenuta come riferimento.
- `public/assets/` — asset originali, usati come sorgente del seed.

## Comandi utili

```bash
npm run generate:types      # rigenera src/payload-types.ts dopo modifiche allo schema
npm run generate:importmap  # rigenera l'import map dell'admin
npm run migrate:create      # crea una migration dopo modifiche allo schema
npm run migrate             # applica le migration
```

Il font di riferimento è **Poppins** (caricato da Google Fonts).
