import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Hero — Lime statement section.
 *
 * Lime full-bleed background. The italic phrase of the H1 is wrapped in
 * a black highlight block (white-on-black inverted). Subtle scroll-driven
 * stagger on the two H1 lines, plus a page-load reveal sequence.
 *
 * Respects prefers-reduced-motion fully.
 */

const H1 = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(56px, 8.4vw, 132px);
  line-height: 0.98;
  letter-spacing: -0.025em;
  max-width: 14ch;
  font-weight: 400;
  margin: 0;
  color: var(--ink);

  .line {
    display: inline-block;
    will-change: transform, opacity;
  }

  .em {
    font-style: italic;
    background: ${({ theme }) => theme.colors.highlightInk};
    color: ${({ theme }) => theme.colors.highlightFg};
    padding: 0 0.18em 0.05em;
    /* Slight inward pull so the highlight tracks the text shape */
    margin: 0 -0.05em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  transition: letter-spacing 400ms ease;
  &:hover { letter-spacing: -0.022em; }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Sub = styled(motion.p)`
  margin-top: 36px;
  max-width: 55ch;
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.55;
  font-weight: 500;
  color: var(--ink);
`;

const Status = styled(motion.div)`
  margin-top: 44px;
  display: inline-flex;
  align-items: center;
  gap: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.highlightInk};
  color: ${({ theme }) => theme.colors.highlightFg};
  padding: 8px 14px;
  border-radius: 2px;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.highlightFg};
    margin: 0 12px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }

  @media (prefers-reduced-motion: reduce) {
    .dot { animation: none; }
  }
`;

const ease = [0.2, 0.7, 0.2, 1];

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const xA = useTransform(scrollYProgress, [0, 0.25], [-24, 0]);
  const xB = useTransform(scrollYProgress, [0, 0.35], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.4, 1]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <SectionFrame bg="lime" hero hideHairline aria-labelledby="hero-heading">
      <div ref={ref}>
        {reduce ? (
          <>
            <H1 id="hero-heading">
              <span className="line">{t.hero.h1a}</span>{' '}
              <span className="line em">{t.hero.h1b}</span>
            </H1>
            <Sub>{t.hero.sub}</Sub>
            <Status>
              <span>{t.hero.loc}</span>
              <span className="dot" aria-hidden="true" />
              <span>{t.hero.avail}</span>
            </Status>
          </>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={container}>
            <H1 id="hero-heading">
              <motion.span
                className="line"
                variants={item}
                style={{ x: xA, opacity }}
              >
                {t.hero.h1a}
              </motion.span>{' '}
              <motion.span
                className="line em"
                variants={item}
                style={{ x: xB, opacity }}
              >
                {t.hero.h1b}
              </motion.span>
            </H1>
            <Sub variants={item}>{t.hero.sub}</Sub>
            <Status variants={item}>
              <span>{t.hero.loc}</span>
              <span className="dot" aria-hidden="true" />
              <span>{t.hero.avail}</span>
            </Status>
          </motion.div>
        )}
      </div>
    </SectionFrame>
  );
}
