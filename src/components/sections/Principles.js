import React from 'react';
import styled from 'styled-components';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

const Section = styled.section`
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter};
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 80px;

  .ital {
    font-style: italic;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 56px;
  }
`;

const Principle = styled.div`
  display: grid;
  gap: 12px;
`;

const Roman = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.02em;
`;

const PName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.2;
  letter-spacing: -0.015em;
  max-width: 22ch;
`;

const Body = styled.p`
  font-size: 15.5px;
  line-height: 1.65;
  max-width: 40ch;
  color: ${({ theme }) => theme.colors.fg};
`;

const romans = ['i.', 'ii.', 'iii.', 'iv.'];

export default function Principles() {
  const { t } = useLanguage();
  return (
    <Section id="prinzipien" aria-labelledby="principles-heading">
      <Reveal>
        <Num>{t.sectionNum.principles}</Num>
      </Reveal>
      <Reveal>
        <H2 id="principles-heading">
          {t.principles.title1} <span className="ital">{t.principles.title2}</span>
        </H2>
      </Reveal>
      <Grid>
        {t.principles.items.map((item, i) => (
          <Principle key={i}>
            <Roman>{romans[i]}</Roman>
            <PName>{item.h}</PName>
            <Body>{item.b}</Body>
          </Principle>
        ))}
      </Grid>
    </Section>
  );
}
