import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.fg};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: 400;
    font-size: 17px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.fg};
    color: ${({ theme }) => theme.colors.bg};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    max-width: 100%;
    display: block;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;
