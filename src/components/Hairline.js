import React from 'react';
import styled, { useTheme } from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated section divider.
 * Replaces the static `border-top` between sections with an SVG stroke
 * that draws itself from left to right when the section enters viewport.
 *
 * Respects prefers-reduced-motion: falls back to a static line.
 *
 * Usage:
 *   <Section>
 *     <Hairline />
 *     ...rest of section content
 *   </Section>
 *
 * The component is absolutely positioned at the top of its parent,
 * so the parent must have `position: relative`.
 */

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  pointer-events: none;
  overflow: hidden;
`;

const Svg = styled(motion.svg)`
  width: 100%;
  height: 1px;
  display: block;
`;

export default function Hairline({ strong = false }) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const color = strong ? theme.colors.hairlineStrong : theme.colors.hairline;

  if (reduce) {
    return (
      <Wrap aria-hidden="true">
        <Svg as="svg" viewBox="0 0 100 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </Svg>
      </Wrap>
    );
  }

  return (
    <Wrap aria-hidden="true">
      <Svg viewBox="0 0 100 1" preserveAspectRatio="none">
        <motion.line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke={color}
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
      </Svg>
    </Wrap>
  );
}
