import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Stations — dark timeline.
 *
 * Vertical lime line draws itself in. Each station enters with a slide
 * from left and a thin lime underline that fills from 0% to 100% width
 * as the entry comes into view — the "fills with colour left-to-right"
 * effect from the Blueprint concept.
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

const ItemWrap = styled(motion.div)`
  position: relative;
  padding: 28px 0 14px;
`;

const Node = styled.span`
  position: absolute;
  left: -55px;
  top: 36px;
  width: 12px;
  height: 12px;
  background: ${({ theme }) => theme.colors.lime};
  border-radius: 1px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: -23px;
    top: 32px;
    width: 8px;
    height: 8px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr 1fr;
  gap: 32px;
  align-items: baseline;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4px;
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

const Underfill = styled.div`
  position: relative;
  margin-top: 14px;
  height: 1px;
  background: ${({ theme }) => theme.colors.hairlineDim};

  .fill {
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.lime};
    transform-origin: left center;
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

export default function Stations() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);

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
          <ItemWrap
            key={i}
            initial={reduce ? false : { opacity: 0, x: -32 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.6, ease }}
          >
            <Node aria-hidden="true" />
            <Row>
              <Year>{item.year}</Year>
              <Role>{item.role}</Role>
              <Company>{item.company}</Company>
            </Row>
            <Underfill aria-hidden="true">
              <motion.div
                className="fill"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
              />
            </Underfill>
          </ItemWrap>
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
