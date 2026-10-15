/**
 * Design tokens — v2 "Editorial"
 *
 * Warm paper, near-black ink, one restrained accent (vermilion).
 * Typography: Newsreader (display, self-hosted) + IBM Plex Sans (text).
 * IBM Plex Mono is reserved for numbers that should align (years, times).
 *
 * All text colours meet WCAG AA on `paper`:
 *   ink 15.7:1 · inkSoft 7.8:1 · inkMute 4.8:1 · accent 5.3:1
 *
 * Legacy keys (bg, fg, fgMuted, crimson, …) are kept as aliases so that
 * Impressum/Datenschutz and any older component keep rendering.
 */

const paper = '#F4F1EA';
const paperAlt = '#ECE7DD';
const card = '#FBFAF7';
const ink = '#1A1814';
const inkSoft = '#4F4A42';
const inkMute = '#6F695E';
const accent = '#B5361F';
const accentOnInk = '#E8775F';

export const theme = {
  colors: {
    paper,
    paperAlt,
    card,
    ink,
    inkSoft,
    inkMute,
    accent,
    accentOnInk,
    line: 'rgba(26,24,20,0.12)',
    lineStrong: 'rgba(26,24,20,0.28)',
    lineOnInk: 'rgba(244,241,234,0.16)',
    inkMuteOnInk: '#A9A398',

    /* Legacy aliases */
    bg: paper,
    bgElevated: paperAlt,
    bgFade: paperAlt,
    fg: ink,
    fgMuted: inkSoft,
    fgDim: inkMute,
    muted: inkSoft,
    hairline: 'rgba(26,24,20,0.12)',
    hairlineDim: 'rgba(26,24,20,0.07)',
    hairlineStrong: 'rgba(26,24,20,0.28)',
    crimson: accent,
    crimsonDeep: '#962C18',
    accentLegacy: accent,
    lime: accent,
  },
  fonts: {
    display: "'Newsreader', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
    sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  },
  sizes: {
    maxWidth: '1240px',
    narrowWidth: '760px',
  },
  gutter: 'clamp(20px, 5vw, 72px)',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  breakpoints: {
    mobile: '620px',
    tablet: '860px',
    desktop: '1100px',
  },
};

/* Section background helpers (used by SectionFrame) */
export function bgFor(key) {
  switch (key) {
    case 'ink':
      return ink;
    case 'alt':
    case 'elevated':
    case 'fade':
      return paperAlt;
    default:
      return paper;
  }
}

export function fgFor(key) {
  return key === 'ink' ? paper : ink;
}

export function mutedFor(key) {
  return key === 'ink' ? '#A9A398' : inkSoft;
}

export function hairlineFor(key) {
  return key === 'ink' ? 'rgba(244,241,234,0.16)' : 'rgba(26,24,20,0.12)';
}
