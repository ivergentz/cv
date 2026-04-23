import React from 'react';
import styled from 'styled-components';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

const Section = styled.section`
  padding: clamp(120px, 20vh, 220px) ${({ theme }) => theme.gutter} clamp(110px, 18vh, 200px);
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(56px, 8.4vw, 132px);
  line-height: 0.96;
  letter-spacing: -0.025em;
  max-width: 14ch;
  font-weight: 400;
  transition: letter-spacing 400ms ease;

  &:hover {
    letter-spacing: -0.022em;
  }

  .em {
    font-style: italic;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Sub = styled.p`
  margin-top: 32px;
  max-width: 55ch;
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.fg};
`;

const Status = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  .sep {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export default function Hero() {
  const { t } = useLanguage();
  return (
    <Section aria-labelledby="hero-heading">
      <Reveal>
        <H1 id="hero-heading">
          {t.hero.h1a} <span className="em">{t.hero.h1b}</span>
        </H1>
      </Reveal>
      <Reveal>
        <Sub>{t.hero.sub}</Sub>
      </Reveal>
      <Reveal>
        <Status>
          <span>{t.hero.loc}</span>
          <span className="sep" aria-hidden="true"></span>
          <span>{t.hero.avail}</span>
        </Status>
      </Reveal>
    </Section>
  );
}
