/*
 * Client HTTP verso il CMS headless (Payload).
 * I tipi rispecchiano il global "landing" definito in cms/src/globals/Landing.ts.
 */

export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

export interface Media {
  id: number
  url?: string | null
  alt?: string | null
}

type Upload = Media | number | null | undefined

export interface Landing {
  seoTitle?: string | null
  seoDescription?: string | null

  navLinks?: { id?: string | null; label: string; href: string }[] | null
  headerCtaLabel?: string | null

  heroBadge?: string | null
  heroTitleStrong?: string | null
  heroTitleSoft?: string | null
  heroSubtitle?: string | null
  heroCtaLabel?: string | null
  heroCtaHref?: string | null

  statementBefore?: string | null
  statementEmphasis?: string | null
  statementAfter?: string | null
  glowNote?: string | null

  servicesTitleStrong?: string | null
  servicesTitleSoft?: string | null
  servicesIntro?: string | null
  serviceCards?:
    | { id?: string | null; title: string; icon?: Upload; footer?: string | null }[]
    | null

  productsTitleStrong?: string | null
  productsTitleSoft?: string | null
  productsIntro?: string | null
  productShots?: { id?: string | null; image: Media | number }[] | null

  stylingTitleStrong1?: string | null
  stylingTitleStrong2?: string | null
  stylingTitleSoft?: string | null
  stylingSub?: string | null
  stylingFocusTitle?: string | null
  stylingFocusItems?: { id?: string | null; item: string }[] | null
  stylingPortrait?: Upload

  closingHeading?: string | null
  closingEmphasis?: string | null
  infoCompanyTitle?: string | null
  infoCompanyText?: string | null
  infoFocusTitle?: string | null
  infoFocusText?: string | null
  infoLetsTalkTitle?: string | null
  contactLead?: string | null
  contactEmail?: string | null
  linkedinUrl?: string | null
  linkedinLabel?: string | null
}

export async function fetchLanding(): Promise<Landing> {
  const res = await fetch(`${CMS_URL}/api/globals/landing?depth=1`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`Errore dal CMS: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

/* Estrae src (assoluto verso il CMS) e alt da un campo upload popolato a depth >= 1 */
export function img(media: Upload | Media | number): { src: string; alt: string } | null {
  if (!media || typeof media !== 'object' || !media.url) return null
  return {
    src: new URL(media.url, CMS_URL).href,
    alt: media.alt ?? '',
  }
}
