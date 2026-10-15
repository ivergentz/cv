/**
 * Design tokens — v4 "Editorial · Black / White / Crimson"
 *
 * Fashion-magazine logic: black and white bands, black-and-white photography,
 * one crimson accent. Condensed uppercase headlines, an italic serif for the
 * small connective words, a book serif for reading text.
 *
 * Type:
 *   display — Oswald (headlines, names, big numbers; uppercase)
 *   italic  — Bodoni Moda italic (accents: "&", "vom", roman numerals)
 *   serif   — Newsreader (body copy, leads, captions)
 *   sans    — IBM Plex Sans (navigation, labels, buttons)
 *   mono    — IBM Plex Mono (dates, times)
 *
 * Contrast (WCAG): ink on paper 18.9:1 · inkMute 5.5:1 ·
 * crimson on paper 5.6:1 · white on crimson 5.9:1 · crimsonOnInk on ink 5.2:1
 */

const paper = '#FAFAF8';
const grey = '#ECECEA';
const card = '#FFFFFF';
const ink = '#111111';
const inkSoft = '#3B3B3B';
const inkMute = '#66665F';
const accent = '#C8102E';
const accentOnInk = '#F0485F';

export const theme = {
  colors: {
    paper,
    paperAlt: grey,
    grey,
    card,
    ink,
    inkSoft,
    inkMute,
    accent,
    accentOnInk,
    line: 'rgba(17,17,17,0.14)',
    lineStrong: 'rgba(17,17,17,0.4)',
    lineOnInk: 'rgba(250,250,248,0.18)',
    inkMuteOnInk: '#A5A5A0',

    /* Legacy aliases (Impressum, Datenschutz) */
    bg: paper,
    bgElevated: grey,
    fg: ink,
    fgMuted: inkSoft,
    fgDim: inkMute,
    muted: inkSoft,
    hairline: 'rgba(17,17,17,0.14)',
    hairlineStrong: 'rgba(17,17,17,0.4)',
    crimson: accent,
  },
  fonts: {
    display: "'Oswald', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif",
    italic: "'Bodoni Moda', 'Didot', Georgia, serif",
    serif: "'Newsreader', 'Iowan Old Style', Georgia, serif",
    sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  },
  sizes: {
    maxWidth: '1320px',
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

/* Section colour fields used by SectionFrame: 'paper' | 'grey' | 'ink' */
export function bgFor(key) {
  if (key === 'ink') return ink;
  if (key === 'grey' || key === 'alt') return grey;
  return paper;
}

export function fgFor(key) {
  return key === 'ink' ? paper : ink;
}

export function mutedFor(key) {
  return key === 'ink' ? '#A5A5A0' : inkSoft;
}

export function hairlineFor(key) {
  return key === 'ink' ? 'rgba(250,250,248,0.18)' : 'rgba(17,17,17,0.14)';
}

export function accentFor(key) {
  return key === 'ink' ? accentOnInk : accent;
}
