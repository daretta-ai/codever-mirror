import path from 'path'
import { fileURLToPath } from 'url'

import type { Payload } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/* Cartella con gli asset originali della landing, usati come contenuto iniziale */
const ASSETS = path.resolve(dirname, '../public/assets')

async function uploadAsset(payload: Payload, file: string, alt: string): Promise<number> {
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.join(ASSETS, file),
  })
  return doc.id as number
}

/*
 * Popola il global "landing" con i contenuti della landing statica originale.
 * Viene eseguito a ogni init di Payload ma non fa nulla se i contenuti esistono già.
 */
export async function seed(payload: Payload): Promise<void> {
  const landing = await payload.findGlobal({ slug: 'landing', depth: 0 })
  if (landing?.heroTitleStrong) return

  payload.logger.info('Seeding landing page content…')

  const iconAnalysis = await uploadAsset(payload, 'icon-analysis.png', 'Icona analisi tecnica')
  const iconDevelopment = await uploadAsset(payload, 'icon-development.png', 'Icona sviluppo software')
  const iconIntegration = await uploadAsset(payload, 'icon-integration.png', 'Icona integrazione AI')

  const productOutfit = await uploadAsset(payload, 'product-outfit.png', 'Total look on a mannequin')
  const productKnit = await uploadAsset(payload, 'product-knit.webp', 'Turtleneck knit top')
  const productTrousers = await uploadAsset(payload, 'product-trousers.webp', 'Tailored trousers')
  const productJacket = await uploadAsset(payload, 'product-jacket.webp', 'Leather bomber jacket look')
  const productLoafer = await uploadAsset(payload, 'product-loafer.webp', 'Leather loafer')

  const portrait = await uploadAsset(
    payload,
    'styling-portrait.webp',
    'Fashion portrait generated with the Styling Suite',
  )

  await payload.updateGlobal({
    slug: 'landing',
    data: {
      seoTitle: 'Codever — Is not only magic. It’s engineering.',
      seoDescription:
        'Codever designs and governs complex digital systems, where AI meets engineering discipline and long-term reliability.',

      navLinks: [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Products', href: '#products' },
      ],
      headerCtaLabel: 'Contact us',

      heroBadge: 'Welcome',
      heroTitleStrong: 'Is not only magic.',
      heroTitleSoft: 'It’s engineering.',
      heroSubtitle: 'We design AI-enabled systems that stay controllable,\nstable and scalable over time.',
      heroCtaLabel: 'Explore our systems',
      heroCtaHref: '#services',

      statementBefore: 'Codever designs and governs',
      statementEmphasis: 'complex digital systems',
      statementAfter: ', where AI meets engineering discipline and long‑term reliability.',
      glowNote:
        'We help companies evolve critical platforms, data flows and digital products by integrating AI in a controlled, deliberate way.\nNo shortcuts, no black boxes. Every architectural choice is made to ensure stability, scalability and full technical governance over time.',

      servicesTitleStrong: 'Engineering excellence',
      servicesTitleSoft: 'behind the products',
      servicesIntro:
        'I nostri prodotti nascono da competenze ingegneristiche\nprofonde e da un approccio strutturato alla complessità.',
      serviceCards: [
        {
          title: 'Analisi tecnica\ne architetturale',
          icon: iconAnalysis,
          footer: 'Backend · data architecture · cloud · sistemi legacy · evoluzione controllata',
        },
        {
          title: 'Sviluppo software\navanzato',
          icon: iconDevelopment,
          footer: 'Frontend (Vue, React) · sistemi modulari · qualità del codice · scalabilità',
        },
        {
          title: 'Integrazione AI\nin sistemi esistenti',
          icon: iconIntegration,
          footer: 'AI nei workflow · RAG · automazione controllata · sistemi enterprise',
        },
      ],

      productsTitleStrong: 'AI products,',
      productsTitleSoft: 'built for real systems',
      productsIntro:
        'Prodotti e piattaforme progettati per integrarsi in ecosistemi\ncomplessi, rimanendo governabili nel tempo.',
      productShots: [
        { image: productOutfit },
        { image: productKnit },
        { image: productTrousers },
        { image: productJacket },
        { image: productLoafer },
      ],

      stylingTitleStrong1: 'Styling Suite On',
      stylingTitleStrong2: '& Generative AI',
      stylingTitleSoft: 'for Fashion',
      stylingSub:
        'Esperienze AI avanzate pensate per ambienti retail reali, dove performance, qualità visiva e integrazione contano più dell’effetto wow.',
      stylingFocusTitle: 'Focus',
      stylingFocusItems: [
        { item: 'Virtual Try‑On' },
        { item: 'Generazione controllata di asset' },
        { item: 'Integrazione con sistemi retail esistenti' },
      ],
      stylingPortrait: portrait,

      closingHeading: 'Engineering\ncomplex systems\nwith',
      closingEmphasis: 'controlled\ninnovation',
      infoCompanyTitle: 'Codever',
      infoCompanyText: 'Software Engineering & AI Integration',
      infoFocusTitle: 'Focus',
      infoFocusText: 'Complex systems · Architecture · AI governance',
      infoLetsTalkTitle: 'Let’s talk',
      contactLead: 'Talk to our technical team',
      contactEmail: 'hello@codever.it',
      linkedinUrl: 'https://www.linkedin.com/company/codever',
      linkedinLabel: 'LinkedIn',
    },
  })

  payload.logger.info('Landing page content seeded.')
}
