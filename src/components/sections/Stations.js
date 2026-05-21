import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Stations — career timeline on Lime background.
 *
 * A vertical timeline strip on the left draws itself in as the section
 * enters view (SVG pathLength animation). Each station enters with a
 * staggered side-slide tied to its position in viewport, with stations
 * alternating left/right entry to create visual rhythm.
 *
 * On mobile, the timeline strip moves to the very left edge with a tight
 * gutter and entries stack as a single column.
 */

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 24px;
  color: var(--ink);
`;

const Intro = styled.p`
  max-width: 60ch;
  color: var(--ink);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 80px;
`;

/* The timeline container is a positioning context for the SVG line + items */
const TimelineWrap = styled.div`
  position: relative;
  padding-left: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 28px;
  }
`;

/* SVG with the self-drawing vertical line */
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

const Item = styled(motion.div)`
  display: grid;
  grid-template-columns: 180px 1fr 1fr;
  gap: 32px;
  padding: 26px 0;
  border-bottom: 1px solid var(--hairline);
  align-items: baseline;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 22px 0;
  }
`;

/* The node — small square that lands on the timeline */
const Node = styled.span`
  position: absolute;
  left: -55px;
  top: 32px;
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.highlightInk};
  border: 2px solid ${({ theme }) => theme.colors.lime};
  border-radius: 2px;
  box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.lime};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: -22px;
    top: 28px;
    width: 10px;
    height: 10px;
  }
`;

const Year = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12.5px;
  letter-spacing: 0.05em;
  color: var(--ink);
  font-weight: 500;
`;

const Role = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(20px, 2.4vw, 28px);
  letter-spacing: -0.01em;
  color: var(--ink);
`;

const Company = styled.span`
  font-size: 14.5px;
  color: var(--muted);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: right;
  }
`;

const CVLinkWrap = styled.div`
  margin-top: 56px;
`;

const CVLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.05em;
  background: ${({ theme }) => theme.colors.highlightInk};
  color: ${({ theme }) => theme.colors.highlightFg};
  padding: 12px 18px;
  border-radius: 2px;
  transition: transform 200ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  .arrow { transition: transform 200ms ease; }
  &:hover .arrow { transform: translateX(3px); }

  @media (prefers-reduced-motion: reduce) {
    &:hover { transform: none; }
    &:hover .arrow { transform: none; }
  }
`;

const ease = [0.2, 0.7, 0.2, 1];

export default function Stations() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);

  /* Drive the timeline line drawing from the section's scroll progress */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  /* The line fills as scroll progresses 0.1 → 0.85 */
  const lineLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <SectionFrame bg="lime" id="stationen" aria-labelledby="stations-heading">
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
            x1="6"
            y1="0"
            x2="6"
            y2="100%"
            stroke="#0A0A0A"
            strokeWidth="2"
            style={reduce ? undefined : { pathLength: lineLength }}
            initial={reduce ? undefined : { pathLength: 0 }}
          />
        </TimelineSVG>

        {t.stations.items.map((item, i) => {
          const fromLeft = i % 2 === 0;
          return (
            <Item
              key={i}
              initial={reduce ? false : { opacity: 0, x: fromLeft ? -32 : 32 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.6, ease, delay: 0.04 }}
            >
              <Node aria-hidden="true" />
              <Year>{item.year}</Year>
              <Role>{item.role}</Role>
              <Company>{item.company}</Company>
            </Item>
          );
        })}
      </TimelineWrap>

      <CVLinkWrap>
        <CVLink to="/cv">
          {t.stations.cv} <span className="arrow">→</span>
        </CVLink>
      </CVLinkWrap>
    </SectionFrame>
  );
}
