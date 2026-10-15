import React from 'react';
import styled from 'styled-components';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/** Profil — centred headline, then justified two-column body with a drop cap. */

const Body = styled.div`
  margin: clamp(40px, 5vw, 64px) auto 0;
  max-width: 1080px;
  column-count: 2;
  column-gap: clamp(28px, 4vw, 64px);
  column-rule: 1px solid var(--line);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    column-count: 1;
  }

  p {
    font-size: 19px;
    line-height: 1.58;
    color: var(--ink);
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
  }
  p + p {
    text-indent: 1.4em;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    p {
      text-align: left;
    }
  }
  p:first-child::first-letter {
    float: left;
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    font-size: 4.6em;
    line-height: 0.82;
    padding: 0.04em 0.1em 0 0;
    color: var(--accent);
  }
`;

export default function Positioning() {
  const { t } = useLanguage();
  const p = t.profile;
  return (
    <SectionFrame id="profil" aria-labelledby="profile-heading">
      <SectionHead index="01" label={p.label} title={p.lead} id="profile-heading" />
      <Reveal delay={0.15}>
        <Body>
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Body>
      </Reveal>
    </SectionFrame>
  );
}
