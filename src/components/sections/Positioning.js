import React from 'react';
import styled from 'styled-components';
import Reveal from '../Reveal';
import SectionFrame from '../SectionFrame';
import { useLanguage } from '../../i18n/LanguageContext';

const Inner = styled.div`
  max-width: 62ch;
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.crimson};
  margin-bottom: 40px;
`;

const Body = styled.p`
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.fg};

  em {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    color: ${({ theme }) => theme.colors.crimson};
  }
`;

export default function Positioning() {
  const { t } = useLanguage();
  return (
    <SectionFrame bg="fade" id="positionierung" aria-labelledby="pos-heading">
      <Inner>
        <Reveal>
          <Num id="pos-heading">{t.sectionNum.positioning}</Num>
        </Reveal>
        <Reveal>
          <Body>{renderPositioning(t.positioning.body)}</Body>
        </Reveal>
      </Inner>
    </SectionFrame>
  );
}

function renderPositioning(text) {
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
