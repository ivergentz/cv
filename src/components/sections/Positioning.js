import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import MaskText from '../MaskText';
import { useLanguage } from '../../i18n/LanguageContext';

/** Profil — pull quote + justified two-column body with a drop cap. */

const Rule = styled(motion.div)`
  height: 3px;
  background: var(--ink);
  transform-origin: left center;
`;

const Folio = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 16px;
  padding-top: 12px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  .no {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 0;
    text-transform: none;
    color: var(--accent);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 64px 1fr;
  }
`;

const Grid = styled.div`
  margin-top: clamp(32px, 5vw, 72px);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(36px, 5vw, 72px);
`;

const Quote = styled.blockquote`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(40px, 6.6vw, 108px);
  line-height: 0.98;
  letter-spacing: -0.035em;
  color: var(--ink);
  max-width: 18ch;
  position: relative;
  padding-left: 0.5em;

  .mark {
    position: absolute;
    left: -0.04em;
    top: -0.08em;
    font-size: 1em;
    line-height: 1;
    color: var(--accent);
    font-style: normal;
  }
`;

const Body = styled.div`
  column-count: 2;
  column-gap: clamp(28px, 4vw, 64px);
  column-rule: 1px solid var(--line);
  padding-top: 20px;
  border-top: 1px solid var(--line);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    column-count: 1;
  }

  p {
    font-size: 19px;
    line-height: 1.55;
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
    font-size: 4.4em;
    line-height: 0.8;
    padding: 0.06em 0.08em 0 0;
    color: var(--accent);
  }
`;

export default function Positioning() {
  const { t, lang } = useLanguage();
  const p = t.profile;
  const reduce = useReducedMotion();
  return (
    <SectionFrame id="profil" aria-labelledby="profile-heading">
      <Rule
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <Folio>
        <span className="no">Nº 01</span>
        <span id="profile-heading">{p.label}</span>
      </Folio>
      <Grid>
        <Quote>
          <span className="mark" aria-hidden="true">
            {lang === 'de' ? '„' : '“'}
          </span>
          <MaskText text={`${p.lead}${lang === 'de' ? '“' : '”'}`} />
        </Quote>
        <Reveal delay={0.2}>
          <Body>
            {p.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Body>
        </Reveal>
      </Grid>
    </SectionFrame>
  );
}
