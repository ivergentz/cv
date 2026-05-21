import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { fgFor, mutedFor, hairlineFor } from '../styles/theme';

/**
 * SectionFrame — the colour engine for the page.
 *
 * Wraps a section in a full-width coloured band (cream / white / lime),
 * sets the appropriate ink + muted colours via CSS variables, and draws
 * an animated hairline at the top of the section that adapts to the
 * background colour.
 *
 * Usage:
 *   <SectionFrame bg="lime" id="kontakt">
 *     <SectionInner>...content...</SectionInner>
 *   </SectionFrame>
 *
 * The wrapper is full-bleed so the colour reaches the viewport edges.
 * Content stays constrained inside SectionInner.
 */

const Band = styled.section`
  /* Full-width colour band */
  position: relative;
  background: ${({ $bg, theme }) =>
    $bg === 'lime' ? theme.colors.bgLime :
    $bg === 'white' ? theme.colors.bgWhite :
    theme.colors.bgCream};

  /* Local colour tokens — children can use these via CSS variables */
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

  /* If this is the hero (first section, denser top padding) */
  ${({ $hero, theme }) => $hero && `
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
  const stroke = bg === 'lime'
    ? 'rgba(10,10,10,0.25)'
    : bg === 'white'
      ? 'rgba(20,20,20,0.10)'
      : 'rgba(20,20,20,0.16)';

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
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
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

export default function SectionFrame({ bg = 'cream', hero = false, hideHairline = false, children, ...rest }) {
  return (
    <Band $bg={bg} {...rest}>
      {!hideHairline && <Hairline bg={bg} />}
      <Inner $hero={hero}>{children}</Inner>
    </Band>
  );
}
