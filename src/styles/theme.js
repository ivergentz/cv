export const theme = {
  colors: {
    /* Base palette */
    bg: '#FAFAF8',          // legacy default body
    fg: '#141414',
    muted: '#6B6B66',
    hairline: '#E5E4DE',
    hairlineStrong: '#D6D4CC',
    accent: '#8B2E2A',      // legacy oxblood, kept for backwards compat in places
    shotBg: '#EEEDE8',
    shotLabel: '#8A8781',

    /* === Lime statement palette === */
    lime: '#C8FF1A',           // primary lime (Hero, Stations, Contact bg)
    limeDeep: '#A8DD00',       // darker lime for hover/strokes
    limeShadow: '#1F2A05',     // text on lime, slight green-shifted black

    /* === Section backgrounds === */
    bgCream: '#F1ECE0',
    bgWhite: '#FAFAF8',
    bgLime:  '#C8FF1A',

    /* === Highlight blocks (used for italic phrases on Lime) === */
    highlightInk: '#0A0A0A',
    highlightFg:  '#C8FF1A',
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
 * Helper: get foreground colour appropriate to a given section bg.
 * Cream/White → dark ink; Lime → lime-shadow ink.
 */
export function fgFor(bgKey) {
  if (bgKey === 'lime') return '#0A0A0A';
  return '#141414';
}

/**
 * Helper: get muted colour appropriate to a given section bg.
 */
export function mutedFor(bgKey) {
  if (bgKey === 'lime') return '#2B3309';
  return '#6B6B66';
}

/**
 * Helper: get hairline colour appropriate to a given section bg.
 */
export function hairlineFor(bgKey) {
  if (bgKey === 'lime') return 'rgba(10,10,10,0.18)';
  if (bgKey === 'white') return '#E5E4DE';
  return '#D6D4CC';
}
