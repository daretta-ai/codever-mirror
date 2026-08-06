# Codever — Sito con CMS Wagtail

Il sito di **codever.it**: la landing page (frame **Desktop** del file Figma
“Codever 2026”, node `208-15341`) servita da [Wagtail](https://wagtail.org/),
così testi, immagini e sezioni sono modificabili dall'interfaccia di
amministrazione senza toccare il codice.

## Struttura

- `codever/` — progetto Django (settings `dev`/`production`, urls, template base)
- `home/` — app con il modello `HomePage` e il template della landing
  - ogni sezione (hero, statement, servizi, AI products, Styling Suite,
    chiusura/contatti) è un gruppo di campi editabili
  - card servizi, foto prodotto e blocchi contatto sono elementi riordinabili
- `search/` — ricerca di base fornita dallo scaffold Wagtail
- `static/` — asset della landing originale: `styles.css`, `main.js`, `assets/`
- `home/migrations/0004_populate_homepage.py` — popola la homepage con i
  contenuti attuali e importa le immagini nella libreria media di Wagtail

## Avvio in locale

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python manage.py migrate          # crea il DB e popola la homepage
python manage.py createsuperuser  # utente per l'admin
python manage.py runserver
```

- Sito: <http://127.0.0.1:8000/>
- Admin CMS: <http://127.0.0.1:8000/admin/>

I contenuti si modificano da **Pagine → Home** nell'admin. Le immagini
caricate dagli editor finiscono in `media/` (ignorata da git).

## Produzione

- Settings: `codever.settings.production` (`DJANGO_SETTINGS_MODULE`), con
  `SECRET_KEY` e `ALLOWED_HOSTS` da definire (ad es. in
  `codever/settings/local.py` o variabili d'ambiente)
- `WAGTAILADMIN_BASE_URL` è configurabile via variabile d'ambiente
  (default `https://codever.it`)
- `python manage.py collectstatic` raccoglie gli asset in `staticfiles/`
- È incluso un `Dockerfile` pronto all'uso (gunicorn + SQLite; per un
  deployment reale valuta PostgreSQL e uno storage persistente per `media/`)

## Note sul design

- `main.js` — generazione deterministica dei mosaici pixel, celle luminose
  sulla griglia, scroll reveal, glow che segue il cursore
- `styles.css` — palette scura viola, griglia pixel di fondo, card,
  animazioni di reveal
- `static/assets/styling-mask.png` — maschera a pixel applicata alle foto via
  CSS `mask-image` (inlinata come data URI in `styles.css`, variabile
  `--pixel-mask`)
- Il font di riferimento è **Poppins** (caricato da Google Fonts)
- Il corsivo dei rich text (`<i>`/`<em>`) è evidenziato in viola dal CSS
