import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import MaskText from './MaskText';
import Reveal from './Reveal';

/**
 * SectionHead — centred editorial heading:
 *
 *            Nº 02 · AUSGEWÄHLTES PROJEKT        (small, crimson)
 *        KI FÜR 800 EINGÄNGE am TAG.             (condensed caps, words rise)
 *                    ——                          (crimson dash, draws in)
 *          short standfirst in the book serif
 */

const Wrap = styled.header`
  text-align: center;
  display: grid;
  justify-items: center;
`;

const Kicker = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: clamp(14px, 2vw, 22px);

  .no {
    font-family: ${({ theme }) => theme.fonts.italic};
    font-style: italic;
    font-weight: 400;
    font-size: 17px;
    letter-spacing: 0;
    text-transform: none;
    margin-right: 10px;
  }
`;

const Title = styled.h2`
  font-size: clamp(44px, 7.4vw, 118px);
  line-height: 0.95;
  letter-spacing: -0.005em;
  color: var(--ink);
  max-width: 15ch;
  text-wrap: balance;

  .it {
    font-size: 0.86em;
  }
`;

const Dash = styled(motion.span)`
  display: block;
  width: 44px;
  height: 3px;
  margin-top: clamp(18px, 2.4vw, 28px);
  background: var(--accent);
`;

const Intro = styled.p`
  margin-top: clamp(16px, 2vw, 24px);
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(18px, 1.5vw, 21px);
  line-height: 1.5;
  color: var(--muted);
  max-width: 46ch;
`;

export default function SectionHead({ index, label, title, intro, id }) {
  const reduce = useReducedMotion();
  return (
    <Wrap>
      <Reveal>
        <Kicker>
          <span className="no">Nº {index}</span>
          {label}
        </Kicker>
      </Reveal>
      <Title id={id}>
        <MaskText text={title} />
      </Title>
      <Dash
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
      {intro && (
        <Reveal delay={0.25}>
          <Intro>{intro}</Intro>
        </Reveal>
      )}
    </Wrap>
  );
}
