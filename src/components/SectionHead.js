import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import MaskText from './MaskText';
import Reveal from './Reveal';

/**
 * SectionHead — the shared heading pattern:
 *   (02)  Label ──────────────── (rule draws in)
 *   Big serif title, words rising out of a mask
 *   Optional intro paragraph, right column on desktop
 */

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: clamp(28px, 4vw, 48px);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
`;

const Index = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 17px;
  letter-spacing: 0;
  text-transform: none;
  color: ${({ $onInk, theme }) => ($onInk ? theme.colors.accentOnInk : theme.colors.accent)};
`;

const Rule = styled(motion.span)`
  flex: 1;
  height: 1px;
  background: var(--line);
  transform-origin: left center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
  gap: clamp(24px, 5vw, 80px);
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Title = styled.h2`
  font-size: clamp(38px, 5.4vw, 76px);
  line-height: 1.02;
  letter-spacing: -0.022em;
  color: var(--ink);
  max-width: 18ch;
  text-wrap: balance;
`;

const Intro = styled.p`
  color: var(--muted);
  font-size: 17px;
  line-height: 1.6;
  max-width: 44ch;
`;

export default function SectionHead({ index, label, title, intro, id, onInk = false }) {
  const reduce = useReducedMotion();
  return (
    <header>
      <Top>
        <Index $onInk={onInk} aria-hidden="true">
          ({index})
        </Index>
        <span>{label}</span>
        <Rule
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </Top>
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
