import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import CountUp from '../CountUp';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * CaseStudy — the VBG inbound-AI project, set on an ultramarine field.
 * The flow diagram draws itself on scroll; packets travel along the
 * connectors; the dashed loop shows corrections feeding back.
 */

const ease = [0.22, 1, 0.36, 1];

const Standfirst = styled.div`
  margin-top: clamp(36px, 5vw, 64px);
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(24px, 4vw, 64px);
  padding-top: 18px;
  border-top: 1px solid var(--line);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .org {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--muted);
  }
  p {
    font-size: clamp(22px, 2.3vw, 32px);
    line-height: 1.32;
    color: var(--ink);
    max-width: 36ch;
  }
`;

/* ---------- Flow diagram ---------- */

const travel = keyframes`
  0%   { left: 0%;   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
`;

const travelY = keyframes`
  0%   { top: 0%;   opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const FlowWrap = styled.div`
  margin-top: clamp(48px, 6vw, 88px);
`;

const Flow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(24px, 1fr) auto minmax(24px, 1fr) auto minmax(24px, 1fr) auto;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    justify-items: start;
  }
`;

const Node = styled(motion.div)`
  position: relative;
  z-index: 1;
  border: 1.5px solid #fff;
  padding: 14px 20px 13px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(20px, 1.9vw, 26px);
  line-height: 1;
  color: #fff;
  background: var(--field);
  white-space: nowrap;

  &.end {
    background: #fff;
    color: ${({ theme }) => theme.colors.accent};
  }

  .n {
    position: absolute;
    top: -9px;
    left: 10px;
    padding: 0 6px;
    background: inherit;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 11px;
    line-height: 16px;
  }
`;

const Conn = styled.div`
  position: relative;
  height: 1.5px;

  .line {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.55);
  }
  .packet {
    position: absolute;
    top: -2.5px;
    width: 6px;
    height: 6px;
    background: #fff;
    animation: ${travel} 2.6s linear infinite;
    animation-delay: ${({ $d }) => $d}s;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 1.5px;
    height: 30px;
    margin: 4px 0 4px 32px;

    .packet {
      top: 0;
      left: -2.5px;
      animation-name: ${travelY};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .packet {
      display: none;
    }
  }
`;

const Loop = styled(motion.div)`
  position: relative;
  grid-row: 2;
  grid-column: 3 / 8;
  height: 44px;
  margin: 10px 32px 0;
  border: 1.5px dashed rgba(255, 255, 255, 0.5);
  border-top: 0;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 9px;
    height: 9px;
    border-left: 1.5px solid #fff;
    border-top: 1.5px solid #fff;
    transform: rotate(45deg);
  }

  span {
    position: absolute;
    left: 50%;
    bottom: -12px;
    transform: translateX(-50%);
    padding: 0 12px;
    background: var(--field);
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-size: 16px;
    color: var(--muted);
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LoopMobile = styled.p`
  display: none;
  margin-top: 16px;
  font-style: italic;
  font-size: 16px;
  color: var(--muted);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

/* ---------- Steps ---------- */

const Steps = styled.ol`
  margin-top: clamp(64px, 8vw, 112px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 3px solid #fff;

  > li + li > div {
    border-left: 1px solid var(--line);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    > li + li > div {
      border-left: 0;
      border-top: 1px solid var(--line);
    }
  }
`;

const Step = styled.div`
  height: 100%;
  padding: 20px clamp(18px, 2.2vw, 32px) 8px;

  li:first-child > & {
    padding-left: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px 0 24px;
  }

  .num {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: 44px;
    line-height: 1;
    color: #fff;
  }
  h3 {
    margin: 12px 0 10px;
    font-size: clamp(26px, 2.4vw, 34px);
    line-height: 1.05;
    color: #fff;
  }
  p {
    font-size: 17.5px;
    line-height: 1.5;
    color: var(--muted);
    hyphens: auto;
  }
`;

/* ---------- Results ---------- */

const Results = styled.dl`
  margin: clamp(56px, 7vw, 96px) 0 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Result = styled.div`
  padding: 24px clamp(18px, 2.2vw, 32px) 26px;
  border-left: 1px solid var(--line);

  &:first-child {
    border-left: 0;
    padding-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-left: 0;
    padding-left: 0;
    & + & {
      border-top: 1px solid var(--line);
    }
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(64px, 8vw, 128px);
    line-height: 0.9;
    letter-spacing: -0.04em;
    color: #fff;
  }
  dd {
    margin: 12px 0 0;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 14px;
    color: var(--muted);
  }
`;

const Note = styled.p`
  margin-top: 16px;
  font-style: italic;
  font-size: 15px;
  color: var(--muted);
`;

export default function CaseStudy() {
  const { t, lang } = useLanguage();
  const c = t.caseStudy;
  const reduce = useReducedMotion();

  const flowItems = [];
  c.flow.forEach((label, i) => {
    flowItems.push(
      <Node
        role="listitem"
        key={`n${i}`}
        className={i === c.flow.length - 1 ? 'end' : undefined}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.35 }}
      >
        <span className="n">{String(i + 1).padStart(2, '0')}</span>
        {label}
      </Node>
    );
    if (i < c.flow.length - 1) {
      flowItems.push(
        <Conn key={`c${i}`} $d={i * 0.65} aria-hidden="true">
          <motion.span
            className="line"
            initial={reduce ? false : { scale: 0 }}
            whileInView={reduce ? undefined : { scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.35 }}
            style={{ originX: 0, originY: 0 }}
          />
          <span className="packet" />
        </Conn>
      );
    }
  });

  return (
    <SectionFrame bg="accent" id="projekt" aria-labelledby="case-heading">
      <SectionHead index="02" label={c.label} title={c.title} aside="VBG · 2025 —" id="case-heading" />

      <Reveal delay={0.1}>
        <Standfirst>
          <span className="org">{c.org}</span>
          <p>{c.intro}</p>
        </Standfirst>
      </Reveal>

      <FlowWrap>
        <Flow role="list" aria-label={c.flow.join(' → ')}>
          {flowItems}
          <Loop
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.8 }}
            aria-hidden="true"
          >
            <span>{c.flowLoop}</span>
          </Loop>
        </Flow>
        <LoopMobile>↺ {c.flowLoop}</LoopMobile>
      </FlowWrap>

      <Steps>
        {c.steps.map((s, i) => (
          <Reveal as="li" key={i} delay={i * 0.12}>
            <Step>
              <span className="num">{['I', 'II', 'III'][i]}</span>
              <h3>{s.h}</h3>
              <p>{s.b}</p>
            </Step>
          </Reveal>
        ))}
      </Steps>

      <Results>
        {c.results.map((r, i) => (
          <Result key={i}>
            <dt>
              <CountUp
                value={r.value}
                prefix={r.prefix}
                suffix={r.suffix}
                display={r.display}
                locale={lang === 'de' ? 'de-DE' : 'en-GB'}
              />
            </dt>
            <dd>{r.label}</dd>
          </Result>
        ))}
      </Results>
      <Note>{c.note}</Note>
    </SectionFrame>
  );
}
