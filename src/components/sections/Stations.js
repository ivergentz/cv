import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Stations — career timeline with mouse-glow rows.
 *
 * Each row tracks the mouse position via CSS variables (--mx, --my) and
 * uses a `radial-gradient` to render a soft lime spotlight that follows
 * the cursor. The bottom separator of the row animates as a left-to-right
 * lime sweep on hover.
 *
 * Performance:
 *   - Mouse spotlight uses background-position offset (compositor-friendly)
 *   - Separator sweep is a 200%-wide gradient shifted via background-position
 *   - No layout properties animated
 *   - Mouse handler throttled via rAF
 *
 * Vertical timeline line stays from v1.3 — draws itself in on scroll.
 */

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lime};
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.fg};
`;

const Intro = styled.p`
  max-width: 60ch;
  color: ${({ theme }) => theme.colors.fgMuted};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 80px;
`;

const TimelineWrap = styled.div`
  position: relative;
  padding-left: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 28px;
  }
`;

const TimelineSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 12px;
  width: 12px;
  height: 100%;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: 4px;
  }
`;

/* === Glowing row === */

const Row = styled(motion.div)`
  position: relative;
  padding: 28px 0 28px;
  --mx: 50%;
  --my: 50%;

  /* The spotlight layer — radial gradient that follows the mouse.
     Uses transform: translateZ(0) to force GPU compositing without
     animating layout properties. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle 260px at var(--mx) var(--my),
      rgba(200, 255, 26, 0.10) 0%,
      rgba(200, 255, 26, 0.04) 30%,
      transparent 70%
    );
    opacity: 0;
    pointer-events: none;
    transition: opacity 280ms ease;
    transform: translateZ(0);
    will-change: opacity;
    z-index: 0;
  }

  &:hover::before { opacity: 1; }

  @media (prefers-reduced-motion: reduce) {
    &::before { display: none; }
  }
`;

const RowInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 140px 1fr 1fr;
  gap: 32px;
  align-items: baseline;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const Node = styled.span`
  position: absolute;
  left: -55px;
  top: 38px;
  width: 12px;
  height: 12px;
  background: ${({ theme }) => theme.colors.lime};
  border-radius: 1px;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: -23px;
    top: 32px;
    width: 8px;
    height: 8px;
  }
`;

const Year = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.lime};
`;

const Role = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(20px, 2.4vw, 28px);
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.fg};
`;

const Company = styled.span`
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.fgMuted};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: right;
  }
`;

/* The separator below each row — sweeps left to right on hover.
   200%-wide gradient + background-position-x shift = sweep, no width animation. */
const Separator = styled.div`
  position: relative;
  height: 1px;
  margin-top: 18px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.lime} 0%,
    ${({ theme }) => theme.colors.lime} 50%,
    ${({ theme }) => theme.colors.hairlineDim} 50%,
    ${({ theme }) => theme.colors.hairlineDim} 100%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
  will-change: background-position;

  ${Row}:hover & {
    background-position: 0 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    background: ${({ theme }) => theme.colors.hairlineDim};
  }
`;

const CVLinkWrap = styled.div`
  margin-top: 64px;
`;

const CVLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.limeShadow};
  padding: 14px 22px;
  border-radius: 2px;
  will-change: transform;
  transition: transform 200ms ease;

  &:hover { transform: translateY(-2px); }
  .arrow { transition: transform 200ms ease; }
  &:hover .arrow { transform: translateX(3px); }

  @media (prefers-reduced-motion: reduce) {
    &:hover { transform: none; }
    &:hover .arrow { transform: none; }
  }
`;

const ease = [0.2, 0.7, 0.2, 1];

/**
 * Custom hook: track the mouse inside an element and write its position
 * to CSS variables on a target ref, throttled to one update per animation
 * frame. CSS variables are GPU-cheap and don't trigger layout.
 */
function useMouseTracking(reduce) {
  const rafRef = useRef(0);
  const pendingRef = useRef(null);

  const flush = useCallback(() => {
    rafRef.current = 0;
    const job = pendingRef.current;
    if (!job) return;
    const { el, x, y } = job;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    pendingRef.current = null;
  }, []);

  const onMove = useCallback((e) => {
    if (reduce) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    pendingRef.current = {
      el,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!rafRef.current) {
      rafRef.current = window.requestAnimationFrame(flush);
    }
  }, [reduce, flush]);

  return onMove;
}

export default function Stations() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const onMove = useMouseTracking(reduce);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <SectionFrame bg="dark" id="stationen" aria-labelledby="stations-heading">
      <Reveal>
        <Num>{t.sectionNum.stations}</Num>
      </Reveal>
      <Reveal>
        <H2 id="stations-heading">{t.stations.title}</H2>
      </Reveal>
      <Reveal>
        <Intro>{t.stations.intro}</Intro>
      </Reveal>

      <TimelineWrap ref={ref}>
        <TimelineSVG aria-hidden="true" preserveAspectRatio="none">
          <motion.line
            x1="6" y1="0" x2="6" y2="100%"
            stroke="#C8FF1A"
            strokeWidth="1.5"
            style={reduce ? undefined : { pathLength: lineLength }}
            initial={reduce ? undefined : { pathLength: 0 }}
          />
        </TimelineSVG>

        {t.stations.items.map((item, i) => (
          <Row
            key={i}
            onMouseMove={onMove}
            initial={reduce ? false : { opacity: 0, x: -32 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.6, ease }}
          >
            <Node aria-hidden="true" />
            <RowInner>
              <Year>{item.year}</Year>
              <Role>{item.role}</Role>
              <Company>{item.company}</Company>
            </RowInner>
            <Separator aria-hidden="true" />
          </Row>
        ))}
      </TimelineWrap>

      <CVLinkWrap>
        <CVLink to="/cv">
          {t.stations.cv} <span className="arrow">→</span>
        </CVLink>
      </CVLinkWrap>
    </SectionFrame>
  );
}
