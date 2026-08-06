'use client'

/* Porta la logica di legacy-static/main.js: mosaici pixel deterministici,
   celle luminose sulla griglia, glow che segue il cursore e scroll reveal. */

import { useEffect } from 'react'

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const PALETTES: Record<string, string[]> = {
  violet: ['#6c4fd8', '#8a70e8', '#4a3596', '#2a2145', '#b9a6f0', '#7b5ce5'],
}

export function Effects() {
  useEffect(() => {
    /* ---- Mosaici pixel ---- */
    document.querySelectorAll<HTMLElement>('[data-mosaic]').forEach((el) => {
      if (el.childElementCount > 0) return
      const palette = PALETTES[el.dataset.mosaic ?? ''] || PALETTES.violet
      const cols = 24
      const rows = 5
      const rand = mulberry32(42)
      const frag = document.createDocumentFragment()
      for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement('span')
        const r = rand()
        /* circa metà delle celle restano vuote (trasparenti) */
        if (r > 0.48) {
          cell.style.background = palette[Math.floor(rand() * palette.length)]
          if (rand() > 0.75) cell.style.opacity = '0.55'
        }
        frag.appendChild(cell)
      }
      el.appendChild(frag)
    })

    /* ---- Celle illuminate sulla griglia di sfondo ---- */
    document.querySelectorAll<HTMLElement>('[data-cells]').forEach((el) => {
      if (el.childElementCount > 0) return
      const rand = mulberry32(el.dataset.cells === 'hero' ? 11 : 23)
      const frag = document.createDocumentFragment()
      for (let i = 0; i < 14; i++) {
        const cell = document.createElement('span')
        const col = Math.floor(rand() * 24)
        const row = Math.floor(rand() * 12)
        cell.style.left = `calc(var(--cell) * ${col})`
        cell.style.top = `calc(var(--cell) * ${row})`
        cell.style.opacity = String(0.35 + rand() * 0.65)
        frag.appendChild(cell)
      }
      el.appendChild(frag)
    })

    /* ---- Glow che segue il cursore ---- */
    const glow = document.querySelector<HTMLElement>('.cursor-glow')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let onMove: ((e: MouseEvent) => void) | null = null
    let raf: number | null = null

    if (glow && !reducedMotion.matches) {
      let targetX = 180
      let targetY = 60 /* coincide con il punto di partenza nel CSS */
      let x = targetX
      let y = targetY

      const tick = () => {
        x += (targetX - x) * 0.08
        y += (targetY - y) * 0.08
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
        if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
          raf = requestAnimationFrame(tick)
        } else {
          raf = null
        }
      }

      onMove = (e: MouseEvent) => {
        targetX = e.clientX
        targetY = e.clientY
        if (raf === null) raf = requestAnimationFrame(tick)
      }
      window.addEventListener('mousemove', onMove, { passive: true })
    }

    /* ---- Scroll reveal ---- */
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')
    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              io?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15 },
      )
      revealEls.forEach((el) => io?.observe(el))
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'))
    }

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove)
      if (raf !== null) cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [])

  return null
}
