import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { bgFor, fgFor, mutedFor, hairlineFor } from '../styles/theme';

/**
 * SectionFrame — full-bleed section band for the dark Blueprint design.
 *
 * Backgrounds in dark mode are subtle elevation changes rather than
 * colour changes. The lime band is reserved for the Contact CTA finale.
 *
 *   bg="dark"     → #0A0A0A (default)
 *   bg="elevated" → #121212 (slight elevation)
 *   bg="fade"     → #1A1A18 (soft fade tone between sections)
 *   bg="lime"     → #C8FF1A (CTA finale only)
 *
 * The animated hairline at top adapts colour to the section bg.
 */

const Band = styled.section`
  position: relative;
  background: ${({ $bg }) => bgFor($bg)};
  --ink: ${({ $bg }) => fgFor($bg)};
  --muted: ${({ $bg }) => mutedFor($bg)};
  --hairline: ${({ $bg }) => hairlineFor($bg)};
  color: var(--ink);
`;

const Inner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter};

  ${({ $hero }) => $hero && `
    padding-top: clamp(120px, 20vh, 220px);
    padding-bottom: clamp(110px, 18vh, 200px);
  `}
`;

const HairlineWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  pointer-events: none;
  overflow: hidden;
`;

function Hairline({ bg }) {
  const reduce = useReducedMotion();
  const stroke = bg === 'lime' ? 'rgba(10,10,10,0.30)' : 'rgba(200,255,26,0.35)';

  if (reduce) {
    return (
      <HairlineWrap aria-hidden="true">
        <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke={stroke} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </HairlineWrap>
    );
  }

  return (
    <HairlineWrap aria-hidden="true">
      <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none" style={{ display: 'block' }}>
        <motion.line
          x1="0" y1="0.5" x2="100" y2="0.5"
          stroke={stroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          transition={{
            pathLength: { duration: 1.2, ease: [0.2, 0.7, 0.2, 1] },
            opacity: { duration: 0.3, ease: 'easeOut' },
          }}
        />
      </svg>
    </HairlineWrap>
  );
}

export default function SectionFrame({ bg = 'dark', hero = false, hideHairline = false, children, ...rest }) {
  return (
    <Band $bg={bg} {...rest}>
      {!hideHairline && <Hairline bg={bg} />}
      <Inner $hero={hero}>{children}</Inner>
    </Band>
  );
}
