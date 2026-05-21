import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import BlueprintGrid from '../BlueprintGrid';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Hero — Tri-Color (White / Crimson / Black).
 *
 * v1.3.10 fixes:
 *   - Wrapper div around BlueprintGrid + Content now has overflow: hidden.
 *     Without it, the scroll-driven translateX(48px) on the .em span and
 *     the negative margins on the highlight block could push content past
 *     the right edge, causing horizontal page scroll.
 *   - xB translate distance reduced from 48px to 24px (symmetric with xA),
 *     halving the worst-case overflow.
 *   - Negative margin on .em removed — was -0.05em on both sides which
 *     pushed the crimson block 6.6px past the container edge at peak
 *     font-size. Block now sits cleanly within the line.
 */

const Wrap = styled.div`
  position: relative;
  /* Overflow guard: contains all scroll-driven transforms and the .em
     highlight block within the hero. Prevents horizontal page scroll. */
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Status = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.crimson};
  color: #FFFFFF;
  padding: 8px 14px;
  border-radius: 2px;
  margin-bottom: 32px;

  .dot-wrap {
    position: relative;
    width: 18px;
    height: 18px;
    margin: 0 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #FFFFFF;
    will-change: transform;
  }

  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #FFFFFF;
    opacity: 0.4;
    will-change: transform, opacity;
    animation: ringPulse 2s ease-out infinite;
    transform-origin: center;
  }

  @keyframes ringPulse {
    0%   { transform: scale(0.3); opacity: 0.6; }
    100% { transform: scale(1.6); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ring { animation: none; opacity: 0; }
  }
`;

const H1 = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(56px, 8.4vw, 132px);
  line-height: 0.98;
  letter-spacing: -0.028em;
  max-width: 14ch;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.colors.fg};
  hyphens: auto;
  -webkit-hyphens: auto;
  overflow-wrap: break-word;
  word-break: break-word;

  .line {
    display: inline-block;
    will-change: transform, opacity;
    max-width: 100%;
  }

  .em {
    font-style: italic;
    background: ${({ theme }) => theme.colors.crimson};
    color: #FFFFFF;
    padding: 0 0.16em 0.04em;
    /* No negative margin — was -0.05em which pushed block past container edge. */
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  transition: letter-spacing 400ms ease;
  &:hover { letter-spacing: -0.024em; }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Sub = styled(motion.p)`
  margin-top: 36px;
  max-width: 55ch;
  font-size: clamp(16px, 1.4vw, 19px);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.fgMuted};
`;

const Actions = styled(motion.div)`
  margin-top: 44px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const CTA = styled.a`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 14px 22px;
  border-radius: 2px;
  cursor: pointer;
  will-change: transform;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;

  &.primary {
    background: ${({ theme }) => theme.colors.fg};
    color: #FFFFFF;
    border: 1px solid ${({ theme }) => theme.colors.fg};
  }
  &.primary:hover {
    background: ${({ theme }) => theme.colors.crimson};
    border-color: ${({ theme }) => theme.colors.crimson};
    transform: translateY(-2px);
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.crimson};
    border: 1px solid ${({ theme }) => theme.colors.crimson};
  }
  &.secondary:hover {
    background: ${({ theme }) => theme.colors.crimson};
    color: #FFFFFF;
  }

  @media (prefers-reduced-motion: reduce) {
    &.primary:hover { transform: none; }
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

  /* Symmetric translate distances — xA goes -24→0, xB goes +24→0.
     Previously xB was +48 which could push wider lines past right edge. */
  const xA = useTransform(scrollYProgress, [0, 0.25], [-24, 0]);
  const xB = useTransform(scrollYProgress, [0, 0.35], [24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.7, 1]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <SectionFrame bg="dark" hero hideHairline aria-labelledby="hero-heading">
      <Wrap ref={ref}>
        <BlueprintGrid lineColor="rgba(220, 20, 60, 0.05)" />

        <Content>
          {reduce ? (
            <>
              <Status>
                <span>{t.hero.loc}</span>
                <span className="dot-wrap" aria-hidden="true">
                  <span className="ring" />
                  <span className="dot" />
                </span>
                <span>{t.hero.avail}</span>
              </Status>
              <H1 id="hero-heading">
                <span className="line">{t.hero.h1a}</span>{' '}
                <span className="line em">{t.hero.h1b}</span>
              </H1>
              <Sub>{t.hero.sub}</Sub>
              <Actions>
                <CTA as="a" href="#arbeit" className="primary">
                  {t.hero.cta?.primary ?? '↓ Projekte ansehen'}
                </CTA>
                <CTA as="a" href="#kontakt" className="secondary">
                  {t.hero.cta?.secondary ?? 'Gespräch vereinbaren'}
                </CTA>
              </Actions>
            </>
          ) : (
            <motion.div initial="hidden" animate="visible" variants={container}>
              <Status variants={item}>
                <span>{t.hero.loc}</span>
                <span className="dot-wrap" aria-hidden="true">
                  <span className="ring" />
                  <span className="dot" />
                </span>
                <span>{t.hero.avail}</span>
              </Status>
              <H1 id="hero-heading">
                <motion.span className="line" variants={item} style={{ x: xA, opacity }}>
                  {t.hero.h1a}
                </motion.span>{' '}
                <motion.span className="line em" variants={item} style={{ x: xB, opacity }}>
                  {t.hero.h1b}
                </motion.span>
              </H1>
              <Sub variants={item}>{t.hero.sub}</Sub>
              <Actions variants={item}>
                <CTA as="a" href="#arbeit" className="primary">
                  {t.hero.cta?.primary ?? '↓ Projekte ansehen'}
                </CTA>
                <CTA as="a" href="#kontakt" className="secondary">
                  {t.hero.cta?.secondary ?? 'Gespräch vereinbaren'}
                </CTA>
              </Actions>
            </motion.div>
          )}
        </Content>
      </Wrap>
    </SectionFrame>
  );
}
