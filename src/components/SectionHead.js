import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import MaskText from './MaskText';
import Reveal from './Reveal';

/**
 * SectionHead — newspaper running head + display headline.
 *
 *   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  (heavy rule, draws in)
 *   Nº 02     AUSGEWÄHLTES PROJEKT              aside
 *
 *   Huge Bodoni headline, words rising out of a mask
 *   (optional intro in a narrow column)
 */

const Rule = styled(motion.div)`
  height: 3px;
  background: var(--ink);
  transform-origin: left center;
`;

const Folio = styled.div`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: baseline;
  padding: 12px 0 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);

  .no {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 0;
    text-transform: none;
    color: var(--accent);
  }
  .aside {
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--muted);
    text-align: right;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 64px minmax(0, 1fr);
    .aside {
      display: none;
    }
  }
`;

const Grid = styled.div`
  margin-top: clamp(32px, 5vw, 72px);
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: clamp(24px, 4vw, 64px);
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Title = styled.h2`
  font-size: clamp(46px, 8.2vw, 132px);
  line-height: 0.94;
  letter-spacing: -0.035em;
  color: var(--ink);
  max-width: 16ch;

  em {
    font-style: italic;
    color: var(--accent);
  }
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 19px;
  line-height: 1.5;
  color: var(--muted);
  max-width: 36ch;
  padding-left: 18px;
  border-left: 1px solid var(--line);
`;

export default function SectionHead({ index, label, title, intro, aside, id }) {
  const reduce = useReducedMotion();
  return (
    <header>
      <Rule
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <Folio>
        <span className="no">Nº {index}</span>
        <span>{label}</span>
        {aside && <span className="aside">{aside}</span>}
      </Folio>
      <Grid>
        <Title id={id}>
          <MaskText text={title} />
        </Title>
        {intro && (
          <Reveal delay={0.25}>
            <Intro>{intro}</Intro>
          </Reveal>
        )}
      </Grid>
    </header>
  );
}
