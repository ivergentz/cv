import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Hero — Blueprint dark hero.
 *
 * Subtle lime grid in the background (SVG pattern, 18% opacity) gives a
 * blueprint/architectural feel without competing with the typography.
 * Coordinate markers in the corners (53.55°N 9.99°E and version stamp)
 * reinforce the "Architecture" theme.
 *
 * H1 stays large serif. The italic phrase is rendered in lime — no more
 * highlight block, that was too loud. Subtitle dimmed, status badge in
 * a dark pill with lime dot.
 */

const Wrap = styled.div`
  position: relative;
`;

const GridBg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.16;
`;

const Corner = styled.div`
  position: absolute;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9.5px;
  color: ${({ theme }) => theme.colors.lime};
  letter-spacing: 0.18em;
  opacity: 0.7;
  z-index: 2;

  &.tl { top: 24px; left: ${({ theme }) => theme.gutter}; }
  &.tr { top: 24px; right: ${({ theme }) => theme.gutter}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 9px;
    &.tl { top: 14px; }
    &.tr { top: 14px; }
  }
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
  color: ${({ theme }) => theme.colors.lime};
  margin-bottom: 28px;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.lime};
    margin: 0 12px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(200,255,26,0.6); }
    50%      { opacity: 0.5; box-shadow: 0 0 0 6px rgba(200,255,26,0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .dot { animation: none; }
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

  .line { display: inline-block; will-change: transform, opacity; }
  .em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.lime};
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
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;

  &.primary {
    background: ${({ theme }) => theme.colors.lime};
    color: ${({ theme }) => theme.colors.limeShadow};
    border: 1px solid ${({ theme }) => theme.colors.lime};
  }

  &.primary:hover {
    transform: translateY(-2px);
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.lime};
    border: 1px solid ${({ theme }) => theme.colors.lime};
  }

  &.secondary:hover {
    background: ${({ theme }) => theme.colors.lime};
    color: ${({ theme }) => theme.colors.limeShadow};
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

  const xA = useTransform(scrollYProgress, [0, 0.25], [-24, 0]);
  const xB = useTransform(scrollYProgress, [0, 0.35], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.4, 1]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  const dateStamp = `v.2026.${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  return (
    <SectionFrame bg="dark" hero hideHairline aria-labelledby="hero-heading">
      <Wrap ref={ref}>
        <GridBg aria-hidden="true">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#C8FF1A" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </GridBg>

        <Corner className="tl">[ 53.55°N · 9.99°E ]</Corner>
        <Corner className="tr">{dateStamp}</Corner>

        <Content>
          {reduce ? (
            <>
              <Status>
                <span>{t.hero.loc}</span>
                <span className="dot" aria-hidden="true" />
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
                <span className="dot" aria-hidden="true" />
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
