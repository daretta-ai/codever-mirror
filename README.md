# Codever — CMS headless + frontend

Il sito di **codever.it** diviso in due progetti indipendenti:

| Progetto | Cartella | Porta (dev) | Descrizione |
|---|---|---|---|
| **CMS** | [`cms/`](cms/) | 3000 | Payload CMS 3 headless: pannello admin su `/admin`, REST API su `/api/*`, GraphQL su `/api/graphql`. Nessun frontend. |
| **Frontend** | [`frontend/`](frontend/) | 3001 | La landing page (frame Desktop del file Figma “Codever 2026”, node `208-15341`) come app Next.js autonoma, che legge i contenuti dal CMS via HTTP. |

I due progetti hanno dipendenze, build e deploy separati: comunicano solo
tramite l'API REST del CMS.

## Avvio in locale

Prima il CMS:

```bash
cd cms
cp .env.example .env        # poi personalizza PAYLOAD_SECRET
npm install
npm run dev                 # http://localhost:3000/admin
```

Al primo avvio Payload crea lo schema (in dev) e un **seed automatico** popola
il global "Landing page" con i contenuti originali (testi + immagini nella
collezione Media). Alla prima visita di `/admin` viene chiesto di creare
l'utente amministratore.

Poi il frontend, in un altro terminale:

```bash
cd frontend
cp .env.example .env        # NEXT_PUBLIC_CMS_URL, default http://localhost:3000
npm install
npm run dev                 # http://localhost:3001
```

## CMS (`cms/`)

- **Stack**: Payload CMS 3 su Next.js 15, database SQLite
  (`@payloadcms/db-sqlite`; si passa a Postgres/MongoDB cambiando adapter in
  `src/payload.config.ts`).
- **Contenuti**: global **"Landing page"** (`src/globals/Landing.ts`) con una
  tab per sezione (SEO, Header, Hero, Statement, Servizi, AI products,
  Styling Suite, Chiusura e contatti); collezione **Media** per le immagini;
  collezione **Users** per gli utenti admin.
- **API**: `GET /api/globals/landing?depth=1` restituisce tutti i contenuti
  con i media popolati; i file sono serviti da `/api/media/file/<nome>`.
- **CORS/CSRF**: gli origin del frontend si configurano con la variabile
  `FRONTEND_URL` (lista separata da virgola).
- **Produzione**: lo schema non viene creato automaticamente, servono le
  migration:

  ```bash
  npm run build && npm run migrate && npm start
  ```

- Comandi utili: `npm run generate:types`, `npm run generate:importmap`,
  `npm run migrate:create`, `npm run migrate`.

## Frontend (`frontend/`)

- **Stack**: Next.js 15 (App Router), zero dipendenze da Payload.
- `src/lib/cms.ts` — client HTTP tipizzato verso il CMS (`fetchLanding()`,
  helper `img()` che rende assoluti gli URL dei media).
- `src/app/page.tsx` — la landing, resa server-side a ogni richiesta: le
  modifiche fatte nel CMS sono subito visibili.
- `src/app/Effects.tsx` — gli effetti originali (mosaici pixel
  deterministici, celle luminose, glow che segue il cursore, scroll reveal).
- `src/app/styles.css` — il foglio di stile originale, invariato.
- Configurazione: `NEXT_PUBLIC_CMS_URL` (URL pubblico del CMS).
- Produzione: `npm run build && npm start`.

## Altro

- `legacy-static/` — la landing statica originale, tenuta come riferimento.
- Il font di riferimento è **Poppins** (caricato da Google Fonts).
