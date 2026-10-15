import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import CountUp from '../CountUp';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * CaseStudy — the VBG inbound-AI project on an ink band.
 * The flow diagram draws itself on scroll; small packets travel along the
 * connectors to show the pipeline is running, the dashed loop shows how
 * manual corrections feed back.
 */

const ease = [0.22, 1, 0.36, 1];

const Meta = styled.p`
  margin-top: 28px;
  font-size: 14px;
  color: var(--muted);

  strong {
    color: var(--ink);
    font-weight: 500;
  }
`;

const IntroText = styled.p`
  margin-top: clamp(40px, 5vw, 64px);
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 2.2vw, 30px);
  line-height: 1.35;
  letter-spacing: -0.01em;
  max-width: 34ch;
  color: var(--ink);
`;

/* ---------- Flow diagram ---------- */

const travel = keyframes`
  0%   { left: 0%;   opacity: 0; }
  12%  { opacity: 1; }
  88%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
`;

const travelY = keyframes`
  0%   { top: 0%;   opacity: 0; }
  12%  { opacity: 1; }
  88%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const FlowWrap = styled.div`
  position: relative;
  margin-top: clamp(48px, 6vw, 80px);
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
  border: 1px solid rgba(244, 241, 234, 0.34);
  border-radius: 999px;
  padding: 14px 18px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.paper};
  background: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;

  &.end {
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.paper};
  }

  .n {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 11.5px;
    opacity: 0.6;
    margin-right: 8px;
  }
`;

const Conn = styled.div`
  position: relative;
  height: 1px;
  margin: 0 6px;

  .line {
    position: absolute;
    inset: 0;
    background: rgba(244, 241, 234, 0.4);
    transform-origin: left center;
  }
  .packet {
    position: absolute;
    top: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accentOnInk};
    animation: ${travel} 2.6s linear infinite;
    animation-delay: ${({ $d }) => $d}s;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 1px;
    height: 28px;
    margin: 6px 0 6px 28px;

    .line {
      transform-origin: center top;
    }
    .packet {
      top: 0;
      left: -2px;
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
  margin: 10px 28px 0;
  border: 1px dashed rgba(244, 241, 234, 0.35);
  border-top: 0;
  border-radius: 0 0 18px 18px;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 0;
    width: 9px;
    height: 9px;
    border-left: 1px solid rgba(244, 241, 234, 0.6);
    border-top: 1px solid rgba(244, 241, 234, 0.6);
    transform: rotate(45deg);
  }

  span {
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    padding: 0 12px;
    background: ${({ theme }) => theme.colors.ink};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.inkMuteOnInk};
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LoopMobile = styled.p`
  display: none;
  margin-top: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.inkMuteOnInk};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

/* ---------- Steps ---------- */

const Steps = styled.ol`
  margin-top: clamp(56px, 7vw, 96px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(24px, 3.5vw, 56px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.li`
  border-top: 1px solid var(--line);
  padding-top: 20px;

  .num {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: 17px;
    color: ${({ theme }) => theme.colors.accentOnInk};
  }
  h3 {
    margin: 10px 0 10px;
    font-size: clamp(24px, 2.2vw, 30px);
    line-height: 1.15;
    color: var(--ink);
  }
  p {
    font-size: 16px;
    line-height: 1.62;
    color: var(--muted);
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
  padding: 28px 24px 30px;
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
    font-size: clamp(44px, 5vw, 72px);
    line-height: 1;
    letter-spacing: -0.025em;
    color: var(--ink);
    margin-bottom: 10px;
  }
  dd {
    margin: 0;
    font-size: 15px;
    color: var(--muted);
  }
`;

const Note = styled.p`
  margin-top: 18px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.inkMuteOnInk};
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
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.35 }}
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
            transition={{ duration: 0.6, ease, delay: 0.45 + i * 0.35 }}
            style={{ originX: 0, originY: 0 }}
          />
          <span className="packet" />
        </Conn>
      );
    }
  });

  return (
    <SectionFrame bg="ink" id="projekt" aria-labelledby="case-heading">
      <SectionHead index="02" label={c.label} title={c.title} id="case-heading" onInk />
      <Reveal delay={0.1}>
        <Meta>
          <strong>{c.org}</strong>
        </Meta>
      </Reveal>
      <Reveal delay={0.15}>
        <IntroText>{c.intro}</IntroText>
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
            <span>↺ {c.flowLoop}</span>
          </Loop>
        </Flow>
        <LoopMobile>↺ {c.flowLoop}</LoopMobile>
      </FlowWrap>

      <Steps>
        {c.steps.map((s, i) => (
          <Reveal as="li" key={i} delay={i * 0.12}>
            <Step as="div">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
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
