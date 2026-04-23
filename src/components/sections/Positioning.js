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

const Inner = styled.div`
  max-width: 62ch;
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 40px;
`;

const Body = styled.p`
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.fg};

  em {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: 1.08em;
  }
`;

export default function Positioning() {
  const { t } = useLanguage();
  return (
    <Section id="positionierung" aria-labelledby="pos-heading">
      <Inner>
        <Reveal>
          <Num id="pos-heading">{t.sectionNum.positioning}</Num>
        </Reveal>
        <Reveal>
          <Body>
            {/* Render with em-tags around product names */}
            {renderPositioning(t.positioning.body)}
          </Body>
        </Reveal>
      </Inner>
    </Section>
  );
}

function renderPositioning(text) {
  // highlight RankBrief and S&I. Wedding
  const parts = text
    .replace(/RankBrief/g, '§§RankBrief§§')
    .replace(/S&I\. Wedding/g, '§§S&I. Wedding§§')
    .split(/(§§.*?§§)/);

  return parts.map((part, i) => {
    if (part.startsWith('§§') && part.endsWith('§§')) {
      return <em key={i}>{part.slice(2, -2)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
