import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Contact — the finale.
 *
 * Three layers:
 *   1. Dark Contact section with H2 + email + meta
 *   2. Lime ticker band (animated infinite scroll)
 *   3. Lime CTA panel with "Book a conversation" button
 *
 * The ticker is built with two duplicated strings sliding seamlessly
 * with CSS keyframes. Slow speed (40s per loop) keeps it editorial,
 * not advertorial.
 */

const Outer = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter} clamp(60px, 8vw, 100px);
`;

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
  margin-bottom: 40px;
  max-width: 18ch;
  color: ${({ theme }) => theme.colors.fg};

  .ital {
    font-style: italic;
    color: ${({ theme }) => theme.colors.lime};
  }
`;

const Mail = styled(AnimatedLink)`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(28px, 3.8vw, 48px);
  letter-spacing: -0.02em;
  margin-bottom: 56px;
  color: ${({ theme }) => theme.colors.fg};
`;

const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Cell = styled.div`
  display: grid;
  gap: 6px;
`;

const MLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.fgDim};
`;

const MValue = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.fg};
`;

/* === Ticker === */
const TickerBand = styled.div`
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.limeShadow};
  padding: 18px 0;
  overflow: hidden;
  position: relative;
  border-top: 1px solid rgba(10,10,10,0.18);
  border-bottom: 1px solid rgba(10,10,10,0.18);
`;

const TickerTrack = styled(motion.div)`
  display: flex;
  white-space: nowrap;
  gap: 60px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(20px, 2.4vw, 32px);
  letter-spacing: -0.01em;
  will-change: transform;
`;

const TickerItem = styled.span`
  flex-shrink: 0;
`;

/* === CTA Panel === */
const CTAPanel = styled.div`
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.limeShadow};
  padding: clamp(48px, 7vw, 80px) ${({ theme }) => theme.gutter};
  text-align: center;
`;

const CTAInner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.limeShadow};
  color: ${({ theme }) => theme.colors.lime};
  padding: 18px 32px;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 28px;
  border: 1px solid ${({ theme }) => theme.colors.limeShadow};
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.colors.limeShadow};
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover { transform: none; }
  }
`;

const CTAMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.limeShadow};
  opacity: 0.55;
  margin-top: 22px;
`;

export default function Contact() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  /* Build ticker items — repeat enough to fill any viewport */
  const tickerText = t.contact.ticker;
  const tickerItems = Array.from({ length: 8 }, (_, i) => (
    <TickerItem key={i}>{tickerText}</TickerItem>
  ));

  return (
    <Outer id="kontakt" aria-labelledby="contact-heading">
      <Inner>
        <Reveal>
          <Num>{t.sectionNum.contact}</Num>
        </Reveal>
        <Reveal>
          <H2 id="contact-heading">
            {t.contact.h1} <span className="ital">{t.contact.h2}</span> {t.contact.h3}
          </H2>
        </Reveal>
        <Reveal>
          <Mail href="mailto:hallo@ivergentz.de" $always>
            hallo@ivergentz.de
          </Mail>
        </Reveal>
        <Meta>
          <Cell>
            <MLabel>{t.contact.locLabel}</MLabel>
            <MValue>{t.contact.locValue}</MValue>
          </Cell>
          <Cell>
            <MLabel>{t.contact.netLabel}</MLabel>
            <AnimatedLink
              href="https://www.linkedin.com/in/iver-gentz-11b0a2171/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              LinkedIn ↗
            </AnimatedLink>
          </Cell>
          <Cell>
            <MLabel>{t.contact.availLabel}</MLabel>
            <MValue>{t.contact.availValue}</MValue>
          </Cell>
        </Meta>
      </Inner>

      {/* Ticker */}
      <TickerBand aria-hidden="true">
        <TickerTrack
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={reduce ? undefined : {
            duration: 40,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {tickerItems}
        </TickerTrack>
      </TickerBand>

      {/* Big CTA */}
      <CTAPanel>
        <CTAInner>
          <H2 as="div" style={{ color: '#0A0A0A', marginBottom: 0, maxWidth: 'unset' }}>
            {t.contact.h1} <span style={{ fontStyle: 'italic' }}>{t.contact.h2}</span>
          </H2>
          <CTAMeta>
            HALLO@IVERGENTZ.DE  ·  +49 176 66631237
          </CTAMeta>
          <CTAButton href="mailto:hallo@ivergentz.de">
            {t.contact.cta}
          </CTAButton>
        </CTAInner>
      </CTAPanel>
    </Outer>
  );
}
