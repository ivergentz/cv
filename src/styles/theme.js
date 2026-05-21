/**
 * Tri-Color palette: White / Crimson / Black.
 *
 * Background: pure white. Accent: crimson (#DC143C) — used for italic
 * highlights, status badges, section markers, CTA buttons. Black: used
 * structurally for the H1, body text, nav hairlines under scroll, and
 * for the "highlight block" treatment on the italic phrase.
 *
 * Legacy keys (lime, bg, fg, etc.) are kept as aliases so any section
 * that still imports the old token names continues to render correctly.
 * The semantic role of each key has been remapped — `accent` is now
 * crimson, `lime` is also crimson (for backwards-compat in old files).
 */

export const theme = {
  colors: {
    /* === Base palette === */
    bg: '#FFFFFF',                 // primary white base
    bgElevated: '#F8F6F1',         // slight warmth for elevated surfaces
    bgFade: '#FAF8F3',             // soft transition tone
    fg: '#0A0A0A',                 // primary body text
    fgMuted: 'rgba(10,10,10,0.62)',
    fgDim: 'rgba(10,10,10,0.42)',

    /* === Hairlines on light === */
    hairline: 'rgba(10,10,10,0.10)',
    hairlineDim: 'rgba(10,10,10,0.06)',
    hairlineStrong: 'rgba(10,10,10,0.22)',

    /* === Crimson accent === */
    crimson: '#DC143C',
    crimsonDeep: '#B5102F',
    crimsonShadow: '#FFFFFF',      // text on crimson

    /* === Highlight block === */
    highlightInk: '#0A0A0A',       // for the black highlight pill (used on italic phrase)
    highlightFg: '#FFFFFF',        // white text on black pill

    /* === Legacy aliases — remapped to crimson === */
    /* These keep older sections functional without rewriting their imports. */
    muted: 'rgba(10,10,10,0.62)',
    accent: '#DC143C',
    lime: '#DC143C',               // alias → crimson
    limeDim: 'rgba(220,20,60,0.5)',
    limeDeep: '#B5102F',
    limeShadow: '#FFFFFF',
    shotBg: '#F8F6F1',
    shotLabel: 'rgba(10,10,10,0.42)',
    bgCream: '#F8F6F1',
    bgWhite: '#FFFFFF',
    bgLime: '#DC143C',
  },
  fonts: {
    display: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  },
  sizes: {
    maxWidth: '1200px',
    narrowWidth: '780px',
  },
  gutter: 'clamp(24px, 5vw, 80px)',
  breakpoints: {
    mobile: '620px',
    tablet: '820px',
    desktop: '1024px',
  },
};

/**
 * Per-section background palette.
 *   dark     → pure white (#FFFFFF) — primary background
 *   elevated → soft off-white (#F8F6F1) — slight variation for clients
 *   fade     → near-white transition tone
 *   lime     → crimson (legacy alias, finale sections that wanted accent bg)
 */
export function bgFor(key) {
  switch (key) {
    case 'lime': return '#DC143C';
    case 'elevated': return '#F8F6F1';
    case 'fade': return '#FAF8F3';
    default: return '#FFFFFF';
  }
}

export function fgFor(bgKey) {
  return bgKey === 'lime' ? '#FFFFFF' : '#0A0A0A';
}

export function mutedFor(bgKey) {
  return bgKey === 'lime' ? 'rgba(255,255,255,0.75)' : 'rgba(10,10,10,0.62)';
}

export function hairlineFor(bgKey) {
  if (bgKey === 'lime') return 'rgba(255,255,255,0.25)';
  return 'rgba(10,10,10,0.10)';
}
