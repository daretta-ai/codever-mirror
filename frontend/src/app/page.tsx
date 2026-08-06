import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

import React, { Fragment } from 'react'

import { fetchLanding, img } from '@/lib/cms'

import { Effects } from './Effects'

/* La pagina è resa a ogni richiesta, così le modifiche fatte nel CMS sono subito visibili */
export const dynamic = 'force-dynamic'

/* Converte gli a-capo dei campi textarea in <br /> */
const nl = (text?: string | null) => {
  const lines = (text ?? '').split('\n')
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ))
}

export async function generateMetadata(): Promise<Metadata> {
  const landing = await fetchLanding()
  return {
    title: landing.seoTitle,
    description: landing.seoDescription,
  }
}

/* Ritardi di reveal delle 5 foto prodotto, come nella landing originale */
const SHOT_DELAYS: (string | null)[] = [null, '.15s', '.05s', '.2s', '.1s']

export default async function Page() {
  const landing = await fetchLanding()
  const portrait = img(landing.stylingPortrait)

  return (
    <>
      <Effects />

      {/* Glow che segue il cursore (parte dall'angolo in alto a sinistra della hero) */}
      <div className="cursor-glow" aria-hidden="true" />

      {/* ========== Header ========== */}
      <header className="site-header">
        <a className="logo" href="#top">
          &lt;codever&gt;
        </a>
        <nav className="main-nav" aria-label="Main">
          {landing.navLinks?.map((link) => (
            <a key={link.id ?? link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-outline" href="#contact">
          {landing.headerCtaLabel}
        </a>
      </header>

      <main id="top">
        {/* ========== Hero ========== */}
        <section className="hero" id="about">
          <div className="grid-cells" data-cells="hero" aria-hidden="true" />

          <div className="hero-inner reveal">
            <span className="badge">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4L6 0z" fill="currentColor" />
              </svg>
              {landing.heroBadge}
            </span>
            <h1>
              <span className="line-strong">{landing.heroTitleStrong}</span>
              <span className="line-soft">{landing.heroTitleSoft}</span>
            </h1>
            <p className="hero-sub">{nl(landing.heroSubtitle)}</p>
            <a className="btn btn-primary" href={landing.heroCtaHref ?? '#services'}>
              {landing.heroCtaLabel}&nbsp;&nbsp;↓
            </a>
          </div>
        </section>

        {/* ========== Statement ========== */}
        <section className="statement">
          <p className="reveal">
            {landing.statementBefore} <em>{landing.statementEmphasis}</em>
            {landing.statementAfter}
          </p>
        </section>

        {/* ========== Paragrafo con bagliore ========== */}
        <section className="glow-note">
          <div className="glow-band" aria-hidden="true" />
          <p className="reveal">{nl(landing.glowNote)}</p>
        </section>

        {/* ========== Servizi / Card ========== */}
        <section className="services" id="services">
          <div className="section-head reveal">
            <h2>
              <span className="line-strong">{landing.servicesTitleStrong}</span>
              <span className="line-soft">{landing.servicesTitleSoft}</span>
            </h2>
            <p>{nl(landing.servicesIntro)}</p>
          </div>

          <div className="card-row">
            {landing.serviceCards?.map((card, i) => {
              const icon = img(card.icon)
              return (
                <article
                  key={card.id ?? i}
                  className="service-card reveal"
                  style={i > 0 ? ({ '--reveal-delay': `.${i}s` } as CSSProperties) : undefined}
                >
                  <h3>{nl(card.title)}</h3>
                  <div className="card-icon" aria-hidden="true">
                    {icon && <img src={icon.src} alt="" />}
                  </div>
                  <p className="card-foot">{card.footer}</p>
                </article>
              )
            })}
          </div>
        </section>

        {/* ========== AI products ========== */}
        <section className="products" id="products">
          <div className="grid-cells" data-cells="products" aria-hidden="true" />

          {/* Foto prodotto fluttuanti, mascherate con il bordo a pixel */}
          {landing.productShots?.map((shot, i) => {
            const image = img(shot.image)
            if (!image) return null
            const delay = SHOT_DELAYS[i]
            return (
              <figure
                key={shot.id ?? i}
                className={`product-card p${i + 1} reveal`}
                style={delay ? ({ '--reveal-delay': delay } as CSSProperties) : undefined}
              >
                <img src={image.src} alt={image.alt} />
              </figure>
            )
          })}

          <div className="section-head reveal">
            <h2>
              <span className="line-strong">{landing.productsTitleStrong}</span>
              <span className="line-soft">{landing.productsTitleSoft}</span>
            </h2>
            <p>{nl(landing.productsIntro)}</p>
          </div>
        </section>

        {/* ========== Styling Suite ========== */}
        <section className="styling">
          <div className="styling-copy reveal">
            <h2>
              <span className="line-strong">{landing.stylingTitleStrong1}</span>
              <span className="line-strong">{landing.stylingTitleStrong2}</span>
              <span className="line-soft">{landing.stylingTitleSoft}</span>
            </h2>
            <p className="styling-sub">{landing.stylingSub}</p>
            <p className="styling-focus">
              <strong>{landing.stylingFocusTitle}</strong>
              <br />
              {landing.stylingFocusItems?.map((focus, i) => (
                <Fragment key={focus.id ?? i}>
                  {focus.item}
                  <br />
                </Fragment>
              ))}
            </p>

            {/* Diagramma della pipeline */}
            <div className="pipeline" aria-label="Pipeline Styling Suite">
              <svg viewBox="0 0 460 120" fill="none">
                <path d="M10 60H450" stroke="#4A4160" strokeWidth="1" strokeDasharray="3 4" />
                <g className="node">
                  <circle cx="40" cy="60" r="16" stroke="#8E86A3" />
                  <path d="M33 57h4l2-3h2l2 3h4v9H33v-9zm7 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#B9AED6" />
                  <text x="40" y="96">Input foto</text>
                </g>
                <g className="node">
                  <circle cx="145" cy="60" r="16" stroke="#8E86A3" />
                  <rect x="138" y="53" width="14" height="14" rx="2" stroke="#B9AED6" />
                  <path d="M138 58h14M145 53v14" stroke="#B9AED6" />
                  <text x="145" y="34">Segmentazione</text>
                </g>
                <g className="node">
                  <circle cx="250" cy="60" r="16" stroke="#8E86A3" />
                  <path d="M250 51a4 4 0 110 8 4 4 0 010-8zm-7 17c1-4 3.5-6 7-6s6 2 7 6" stroke="#B9AED6" />
                  <text x="250" y="96">Try‑On</text>
                </g>
                <g className="node">
                  <circle cx="355" cy="60" r="16" stroke="#8E86A3" />
                  <path d="M355 51l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="#B9AED6" />
                  <text x="355" y="34">Generazione</text>
                </g>
                <g className="node">
                  <circle cx="430" cy="60" r="16" stroke="#8E86A3" />
                  <path d="M424 60h12m0 0l-4-4m4 4l-4 4" stroke="#B9AED6" />
                  <text x="430" y="96">Output</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="styling-visual reveal" style={{ '--reveal-delay': '.15s' } as CSSProperties}>
            {portrait && <img className="portrait" src={portrait.src} alt={portrait.alt} />}
          </div>
        </section>

        {/* ========== CTA finale ========== */}
        <section className="closing" id="contact">
          <div className="closing-grid">
            <h2 className="reveal">
              {nl(landing.closingHeading)}{' '}
              <em>{nl(landing.closingEmphasis)}</em>.
            </h2>

            <div className="closing-info reveal" style={{ '--reveal-delay': '.1s' } as CSSProperties}>
              <div className="info-block">
                <h4>{landing.infoCompanyTitle}</h4>
                <p>{landing.infoCompanyText}</p>
              </div>
              <div className="info-block">
                <h4>{landing.infoFocusTitle}</h4>
                <p>{landing.infoFocusText}</p>
              </div>
              <div className="info-block lets-talk">
                <h4>{landing.infoLetsTalkTitle}</h4>
                <a
                  className="arrow-btn"
                  href={`mailto:${landing.contactEmail}`}
                  aria-label={`Write to ${landing.contactEmail}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </div>
              <div className="info-block contact-block">
                <p>
                  {landing.contactLead}
                  <br />
                  <a href={`mailto:${landing.contactEmail}`}>{landing.contactEmail}</a>
                  <br />
                  <a href={landing.linkedinUrl ?? '#'} target="_blank" rel="noopener">
                    {landing.linkedinLabel}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========== Footer a mosaico pixel ========== */}
      <footer className="site-footer">
        <div className="mosaic mosaic-footer" data-mosaic="violet" aria-hidden="true" />
        <div className="footer-bar">
          <span className="logo">&lt;codever&gt;</span>
        </div>
      </footer>
    </>
  )
}
