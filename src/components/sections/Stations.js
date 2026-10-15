import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import { useLanguage } from '../../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1];

const Timeline = styled.div`
  position: relative;
  margin-top: clamp(48px, 6vw, 88px);
  padding-left: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: 22px;
  }
`;

const Track = styled.div`
  position: absolute;
  left: 3px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: ${({ theme }) => theme.colors.line};
`;

const Fill = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.accent};
  transform-origin: top center;
`;

const Row = styled(motion.li)`
  position: relative;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) minmax(0, 220px);
  gap: 24px;
  align-items: baseline;
  padding: 26px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  &:first-child {
    padding-top: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -32px;
    top: 36px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.paperAlt};
    border: 1px solid ${({ theme }) => theme.colors.inkMute};
    transition: background 300ms ease, border-color 300ms ease;
  }
  &:first-child::before {
    top: 10px;
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &:hover::before {
    background: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.ink};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &::before {
      left: -22px;
      top: 31px;
    }
  }
`;

const Year = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.inkMute};
`;

const Role = styled.div`
  h3 {
    font-size: clamp(22px, 2.3vw, 30px);
    line-height: 1.18;
    letter-spacing: -0.012em;
    color: ${({ theme }) => theme.colors.ink};
  }
  p {
    margin-top: 6px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
`;

const Company = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    order: -1;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
`;

const CvLink = styled(RouterLink)`
  margin-top: clamp(40px, 5vw, 56px);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 24px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.ink};
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  transition: background 240ms ease, color 240ms ease;

  svg {
    transition: transform 400ms ${({ theme }) => theme.ease};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.paper};
  }
  &:hover svg {
    transform: translateX(4px);
  }
`;

export default function Stations() {
  const { t } = useLanguage();
  const s = t.stations;
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionFrame bg="alt" id="stationen" aria-labelledby="stations-heading">
      <SectionHead index="04" label={s.label} title={s.title} intro={s.intro} id="stations-heading" />

      <Timeline ref={ref}>
        <Track aria-hidden="true">{!reduce && <Fill style={{ scaleY }} />}</Track>
        <ol>
          {s.items.map((item, i) => (
            <Row
              key={i}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease }}
            >
              <Year>{item.year}</Year>
              <Role>
                <h3>{item.role}</h3>
                <p>{item.note}</p>
              </Role>
              <Company>{item.company}</Company>
            </Row>
          ))}
        </ol>
      </Timeline>

      <CvLink to="/cv">
        {s.cv}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 7h12M13 7L8 2M13 7l-5 5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </CvLink>
    </SectionFrame>
  );
}
