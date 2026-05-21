export const theme = {
  colors: {
    /* === Dark Mode Base === */
    bg: '#0A0A0A',                 // primary dark base
    bgElevated: '#121212',          // raised surfaces (cards, panels)
    bgFade: '#1A1A18',              // softer dark tone for fade transitions
    fg: '#F5F5F0',                  // primary text on dark
    fgMuted: 'rgba(245,245,240,0.6)',
    fgDim: 'rgba(245,245,240,0.4)',

    /* === Hairlines on dark === */
    hairline: 'rgba(200,255,26,0.18)',     // lime-tinted hairlines
    hairlineDim: 'rgba(245,245,240,0.08)', // neutral hairlines
    hairlineStrong: 'rgba(200,255,26,0.4)',

    /* === Lime accent — dosed === */
    lime: '#C8FF1A',
    limeDim: 'rgba(200,255,26,0.5)',
    limeDeep: '#A8DD00',
    limeShadow: '#0A0A0A',          // ink on lime

    /* === Legacy tokens — kept for backwards compat in unmigrated files === */
    muted: 'rgba(245,245,240,0.6)',
    accent: '#C8FF1A',
    shotBg: '#121212',
    shotLabel: 'rgba(245,245,240,0.4)',
    bgCream: '#1A1A18',             // legacy alias → dark fade tone
    bgWhite: '#0A0A0A',             // legacy alias → primary dark
    bgLime: '#C8FF1A',
    highlightInk: '#0A0A0A',
    highlightFg: '#C8FF1A',
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
 * In dark mode, sections use subtle elevation rather than colour changes.
 * The lime "section" is reserved for the Contact CTA finale.
 */
export function bgFor(key) {
  switch (key) {
    case 'lime': return '#C8FF1A';
    case 'elevated': return '#121212';
    case 'fade': return '#1A1A18';
    default: return '#0A0A0A';
  }
}

export function fgFor(bgKey) {
  return bgKey === 'lime' ? '#0A0A0A' : '#F5F5F0';
}

export function mutedFor(bgKey) {
  return bgKey === 'lime' ? '#2B3309' : 'rgba(245,245,240,0.6)';
}

export function hairlineFor(bgKey) {
  if (bgKey === 'lime') return 'rgba(10,10,10,0.18)';
  return 'rgba(200,255,26,0.18)';
}
