import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Marquee — a slow running line between heavy rules, like a newspaper
 * ticker set in display italic. Pauses on hover; static with reduced motion.
 */

const run = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Band = styled.div`
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  overflow: hidden;
  padding: clamp(14px, 1.8vw, 22px) 0;
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${run} 48s linear infinite;

  ${Band}:hover & {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(26px, 3.4vw, 48px);
  letter-spacing: -0.02em;
  line-height: 1.1;

  &::after {
    content: '';
    display: inline-block;
    width: 0.32em;
    height: 0.32em;
    margin: 0 0.7em;
    background: ${({ theme }) => theme.colors.accentOnInk};
    transform: rotate(45deg);
  }
`;

export default function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];
  return (
    <Band aria-hidden="true">
      <Track>
        {[...items, ...items].map((w, i) => (
          <Item key={i}>{w}</Item>
        ))}
      </Track>
    </Band>
  );
}
