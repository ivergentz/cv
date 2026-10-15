import { createGlobalStyle, css } from 'styled-components';

/* Self-hosted fonts (public/fonts) — no third-party requests. */
const face = (family, file, weight, style = 'normal') => css`
  @font-face {
    font-family: '${family}';
    src: url('/fonts/${file}.woff2') format('woff2');
    font-weight: ${weight};
    font-style: ${style};
    font-display: swap;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${face('Bodoni Moda', 'bodoni-400', 400)}
  ${face('Bodoni Moda', 'bodoni-400-italic', 400, 'italic')}
  ${face('Bodoni Moda', 'bodoni-500', 500)}
  ${face('Newsreader', 'newsreader-400', 400)}
  ${face('Newsreader', 'newsreader-400-italic', 400, 'italic')}
  ${face('Newsreader', 'newsreader-500', 500)}
  ${face('IBM Plex Sans', 'plex-sans-400', 400)}
  ${face('IBM Plex Sans', 'plex-sans-500', 500)}
  ${face('IBM Plex Sans', 'plex-sans-600', 600)}
  ${face('IBM Plex Mono', 'plex-mono-400', 400)}

  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.paper};
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 64px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    font-size: 19px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'kern' 1, 'liga' 1, 'onum' 1;
    overflow-x: clip;
  }

  @media (max-width: 620px) {
    body { font-size: 18px; }
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }

  a { color: inherit; text-decoration: none; }

  h1, h2, h3, h4 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 400;
    letter-spacing: -0.02em;
    font-feature-settings: 'kern' 1, 'liga' 1, 'lnum' 1;
  }

  p { margin: 0; }
  ul, ol { list-style: none; padding: 0; margin: 0; }
  img { max-width: 100%; display: block; }
  button { font: inherit; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  .tnum { font-variant-numeric: tabular-nums lining-nums; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
