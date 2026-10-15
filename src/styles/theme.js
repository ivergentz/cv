/**
 * Design tokens — v3 "Editorial"
 *
 * Newspaper/magazine logic: near-white paper, black ink, one loud accent
 * (ultramarine) used as a colour field, not as decoration.
 *
 * Type:
 *   display — Bodoni Moda (headlines, numbers)
 *   serif   — Newsreader (body copy, leads, captions)
 *   sans    — IBM Plex Sans (navigation, labels, buttons)
 *   mono    — IBM Plex Mono (dates, times)
 *
 * Contrast on paper: ink 19:1 · inkSoft 10.1:1 · inkMute 5.4:1 · accent 8:1
 * White on accent 8.5:1.
 */

const paper = '#F7F7F4';
const paperAlt = '#EEEEE9';
const card = '#FFFFFF';
const ink = '#0D0D0D';
const inkSoft = '#3D3D3D';
const inkMute = '#666660';
const accent = '#2230D6';
const accentOnInk = '#A7ACFF';

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
    onAccent: '#FFFFFF',
    onAccentMute: '#C9CCFF',
    line: 'rgba(13,13,13,0.14)',
    lineStrong: 'rgba(13,13,13,0.4)',
    lineOnInk: 'rgba(247,247,244,0.18)',
    inkMuteOnInk: '#A3A39D',

    /* Legacy aliases (Impressum, Datenschutz, older components) */
    bg: paper,
    bgElevated: paperAlt,
    bgFade: paperAlt,
    fg: ink,
    fgMuted: inkSoft,
    fgDim: inkMute,
    muted: inkSoft,
    hairline: 'rgba(13,13,13,0.14)',
    hairlineDim: 'rgba(13,13,13,0.08)',
    hairlineStrong: 'rgba(13,13,13,0.4)',
    crimson: accent,
    crimsonDeep: '#18229E',
    lime: accent,
  },
  fonts: {
    display: "'Bodoni Moda', 'Didot', 'Bodoni 72', Georgia, serif",
    serif: "'Newsreader', 'Iowan Old Style', Georgia, serif",
    sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  },
  sizes: {
    maxWidth: '1360px',
    narrowWidth: '760px',
  },
  gutter: 'clamp(18px, 4vw, 56px)',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  breakpoints: {
    mobile: '620px',
    tablet: '900px',
    desktop: '1180px',
  },
};

/* Section colour fields used by SectionFrame */
export function bgFor(key) {
  switch (key) {
    case 'ink':
      return ink;
    case 'accent':
      return accent;
    case 'alt':
      return paperAlt;
    default:
      return paper;
  }
}

export function fgFor(key) {
  return key === 'ink' || key === 'accent' ? '#FFFFFF' : ink;
}

export function mutedFor(key) {
  if (key === 'ink') return '#A3A39D';
  if (key === 'accent') return '#C9CCFF';
  return inkSoft;
}

export function hairlineFor(key) {
  if (key === 'ink') return 'rgba(247,247,244,0.18)';
  if (key === 'accent') return 'rgba(255,255,255,0.28)';
  return 'rgba(13,13,13,0.14)';
}

export function accentFor(key) {
  if (key === 'ink') return accentOnInk;
  if (key === 'accent') return '#FFFFFF';
  return accent;
}
