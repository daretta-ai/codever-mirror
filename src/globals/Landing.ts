import type { GlobalConfig } from 'payload'

/*
 * Tutti i contenuti della landing page, sezione per sezione.
 * I campi textarea vengono resi con un <br /> per ogni a-capo,
 * così l'editor controlla le interruzioni di riga del design.
 */
export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Landing page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            { name: 'seoTitle', type: 'text', label: 'Titolo pagina' },
            { name: 'seoDescription', type: 'textarea', label: 'Meta description' },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              label: 'Voci di navigazione',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            { name: 'headerCtaLabel', type: 'text', label: 'Etichetta bottone contatti' },
          ],
        },
        {
          label: 'Hero',
          fields: [
            { name: 'heroBadge', type: 'text', label: 'Badge' },
            { name: 'heroTitleStrong', type: 'text', label: 'Titolo (riga in evidenza)' },
            { name: 'heroTitleSoft', type: 'text', label: 'Titolo (riga attenuata)' },
            { name: 'heroSubtitle', type: 'textarea', label: 'Sottotitolo' },
            { name: 'heroCtaLabel', type: 'text', label: 'Etichetta CTA' },
            { name: 'heroCtaHref', type: 'text', label: 'Link CTA' },
          ],
        },
        {
          label: 'Statement',
          fields: [
            { name: 'statementBefore', type: 'text', label: 'Testo prima dell’enfasi' },
            { name: 'statementEmphasis', type: 'text', label: 'Testo enfatizzato (corsivo)' },
            { name: 'statementAfter', type: 'text', label: 'Testo dopo l’enfasi' },
            { name: 'glowNote', type: 'textarea', label: 'Paragrafo con bagliore' },
          ],
        },
        {
          label: 'Servizi',
          fields: [
            { name: 'servicesTitleStrong', type: 'text', label: 'Titolo (riga in evidenza)' },
            { name: 'servicesTitleSoft', type: 'text', label: 'Titolo (riga attenuata)' },
            { name: 'servicesIntro', type: 'textarea', label: 'Introduzione' },
            {
              name: 'serviceCards',
              type: 'array',
              label: 'Card servizi',
              fields: [
                { name: 'title', type: 'textarea', label: 'Titolo', required: true },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icona',
                },
                { name: 'footer', type: 'textarea', label: 'Riga a piè di card' },
              ],
            },
          ],
        },
        {
          label: 'AI products',
          fields: [
            { name: 'productsTitleStrong', type: 'text', label: 'Titolo (riga in evidenza)' },
            { name: 'productsTitleSoft', type: 'text', label: 'Titolo (riga attenuata)' },
            { name: 'productsIntro', type: 'textarea', label: 'Introduzione' },
            {
              name: 'productShots',
              type: 'array',
              label: 'Foto prodotto fluttuanti',
              maxRows: 5,
              admin: {
                description:
                  'Massimo 5 foto: la posizione sulla pagina segue l’ordine dell’elenco.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Styling Suite',
          fields: [
            { name: 'stylingTitleStrong1', type: 'text', label: 'Titolo riga 1 (in evidenza)' },
            { name: 'stylingTitleStrong2', type: 'text', label: 'Titolo riga 2 (in evidenza)' },
            { name: 'stylingTitleSoft', type: 'text', label: 'Titolo riga 3 (attenuata)' },
            { name: 'stylingSub', type: 'textarea', label: 'Sottotitolo' },
            { name: 'stylingFocusTitle', type: 'text', label: 'Titolo blocco focus' },
            {
              name: 'stylingFocusItems',
              type: 'array',
              label: 'Voci focus',
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'stylingPortrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Ritratto',
            },
          ],
        },
        {
          label: 'Chiusura e contatti',
          fields: [
            {
              name: 'closingHeading',
              type: 'textarea',
              label: 'Titolo di chiusura (prima dell’enfasi)',
            },
            {
              name: 'closingEmphasis',
              type: 'textarea',
              label: 'Parte enfatizzata (corsivo, chiude con un punto)',
            },
            { name: 'infoCompanyTitle', type: 'text', label: 'Blocco 1 — titolo' },
            { name: 'infoCompanyText', type: 'text', label: 'Blocco 1 — testo' },
            { name: 'infoFocusTitle', type: 'text', label: 'Blocco 2 — titolo' },
            { name: 'infoFocusText', type: 'text', label: 'Blocco 2 — testo' },
            { name: 'infoLetsTalkTitle', type: 'text', label: 'Blocco 3 — titolo' },
            { name: 'contactLead', type: 'text', label: 'Testo di contatto' },
            { name: 'contactEmail', type: 'email', label: 'Email' },
            { name: 'linkedinUrl', type: 'text', label: 'URL LinkedIn' },
            { name: 'linkedinLabel', type: 'text', label: 'Etichetta LinkedIn' },
          ],
        },
      ],
    },
  ],
}
