import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700;800&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,300&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }) => theme.fontSans};
    background: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Fly-in animations */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes expandWidth {
    from { width: 0; }
    to   { width: 100%; }
  }

  .fly-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fly-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fly-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fly-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .fly-right {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fly-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .fade-in {
    opacity: 0;
    transition: opacity 0.8s ease;
  }

  .fade-in.visible {
    opacity: 1;
  }

  /* Stagger delays */
  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.2s; }
  .delay-3 { transition-delay: 0.3s; }
  .delay-4 { transition-delay: 0.4s; }
  .delay-5 { transition-delay: 0.5s; }
  .delay-6 { transition-delay: 0.6s; }
`;

export default GlobalStyle;
