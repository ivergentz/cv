import React from 'react';
import styled from 'styled-components';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/** Arbeitsweise — four newspaper columns separated by column rules. */

const Grid = styled.ol`
  margin-top: clamp(48px, 6vw, 88px);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 3px solid ${({ theme }) => theme.colors.ink};

  > li + li > div {
    border-left: 1px solid ${({ theme }) => theme.colors.line};
  }
  > li:first-child > div {
    padding-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > li:nth-child(3) > div {
      border-left: 0;
      padding-left: 0;
    }
    > li:nth-child(n + 3) > div {
      border-top: 1px solid ${({ theme }) => theme.colors.line};
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    > li + li > div {
      border-left: 0;
      border-top: 1px solid ${({ theme }) => theme.colors.line};
    }
  }
`;

const Item = styled.div`
  height: 100%;
  padding: 22px clamp(16px, 2vw, 28px) 28px;

  .n {
    display: block;
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: clamp(56px, 6vw, 88px);
    line-height: 0.9;
    color: ${({ theme }) => theme.colors.accent};
  }
  h3 {
    margin: 18px 0 12px;
    font-size: clamp(26px, 2.3vw, 34px);
    line-height: 1.02;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.colors.ink};
  }
  p {
    font-size: 17.5px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.inkSoft};
    hyphens: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 22px 0 26px;
  }
`;

export default function Principles() {
  const { t } = useLanguage();
  const p = t.principles;
  return (
    <SectionFrame bg="alt" id="arbeitsweise" aria-labelledby="principles-heading">
      <SectionHead index="05" label={p.label} title={p.title} id="principles-heading" />
      <Grid>
        {p.items.map((item, i) => (
          <Reveal as="li" key={i} delay={i * 0.08}>
            <Item>
              <span className="n" aria-hidden="true">
                {['i', 'ii', 'iii', 'iv'][i]}
              </span>
              <h3>{item.h}</h3>
              <p>{item.b}</p>
            </Item>
          </Reveal>
        ))}
      </Grid>
    </SectionFrame>
  );
}
