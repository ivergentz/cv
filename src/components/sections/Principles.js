import React from 'react';
import styled from 'styled-components';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

const Grid = styled.ol`
  margin-top: clamp(48px, 6vw, 88px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: clamp(32px, 6vw, 112px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 8px;
  padding: 28px 0 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  .n {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.accent};
    padding-top: 4px;
  }
  h3 {
    font-size: clamp(24px, 2.4vw, 32px);
    line-height: 1.15;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 12px;
  }
  p {
    font-size: 16px;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 46ch;
  }
`;

export default function Principles() {
  const { t } = useLanguage();
  const p = t.principles;
  return (
    <SectionFrame id="arbeitsweise" aria-labelledby="principles-heading">
      <SectionHead index="05" label={p.label} title={p.title} id="principles-heading" />
      <Grid>
        {p.items.map((item, i) => (
          <Reveal as="li" key={i} delay={(i % 2) * 0.1}>
            <Item>
              <span className="n">{['i', 'ii', 'iii', 'iv'][i]}.</span>
              <div>
                <h3>{item.h}</h3>
                <p>{item.b}</p>
              </div>
            </Item>
          </Reveal>
        ))}
      </Grid>
    </SectionFrame>
  );
}
