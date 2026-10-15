import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import { useLanguage } from '../../i18n/LanguageContext';

/** Stationen — set like a newspaper table: Jahr · Position · Haus. */

const ease = [0.22, 1, 0.36, 1];

const Table = styled.div`
  margin-top: clamp(48px, 6vw, 88px);
`;

const HeadRow = styled.div`
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) minmax(0, 260px);
  gap: 24px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  span:last-child {
    text-align: right;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Row = styled(motion.li)`
  position: relative;
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) minmax(0, 260px);
  gap: 24px;
  align-items: baseline;
  padding: 24px 0 26px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -1px;
    height: 3px;
    width: 100%;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 600ms ${({ theme }) => theme.ease};
  }
  &:hover::before {
    transform: scaleX(1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4px;
    &:first-child {
      border-top: 3px solid ${({ theme }) => theme.colors.ink};
    }
  }
`;

const Year = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.inkMute};
`;

const Role = styled.div`
  h3 {
    font-size: clamp(26px, 2.8vw, 40px);
    line-height: 1.05;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.colors.ink};
  }
  p {
    margin-top: 8px;
    font-style: italic;
    font-size: 17.5px;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
`;

const House = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: right;
  color: ${({ theme }) => theme.colors.ink};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    order: -1;
  }
`;

const CvLink = styled(RouterLink)`
  margin-top: clamp(36px, 5vw, 56px);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 50px;
  padding: 0 22px;
  border: 1.5px solid ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
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
  const { t, lang } = useLanguage();
  const s = t.stations;
  const reduce = useReducedMotion();
  const head = lang === 'de' ? ['Jahr', 'Position', 'Haus'] : ['Year', 'Position', 'Company'];

  return (
    <SectionFrame id="stationen" aria-labelledby="stations-heading">
      <SectionHead index="04" label={s.label} title={s.title} intro={s.intro} aside="2017 — 2026" id="stations-heading" />

      <Table>
        <HeadRow aria-hidden="true">
          {head.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </HeadRow>
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
              <House>{item.company}</House>
            </Row>
          ))}
        </ol>
      </Table>

      <CvLink to="/cv">
        {s.cv}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 7h12M13 7L8 2M13 7l-5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </CvLink>
    </SectionFrame>
  );
}
