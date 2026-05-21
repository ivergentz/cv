import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * BlueprintGrid — architectural blueprint backdrop.
 * Default color updated to crimson tint at low opacity for the white world.
 * All animation is `transform: scaleX/scaleY` + `opacity` — GPU only.
 */

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Line = styled(motion.div)`
  position: absolute;
  background: ${({ $color }) => $color};
  will-change: transform, opacity;
`;

const HLine = styled(Line)`
  left: 0;
  right: 0;
  height: 1px;
  transform-origin: center;
`;

const VLine = styled(Line)`
  top: 0;
  bottom: 0;
  width: 1px;
  transform-origin: center;
`;

const CenterCross = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.5;
  will-change: opacity;

  &::before, &::after {
    content: '';
    position: absolute;
    background: ${({ $color }) => $color};
  }
  &::before { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }
  &::after  { left: 50%; top: 0; bottom: 0; width: 1px;  transform: translateX(-50%); }
`;

const ease = [0.2, 0.7, 0.2, 1];

export default function BlueprintGrid({
  density = 12,
  lineColor = 'rgba(220, 20, 60, 0.10)',
  duration = 1.4,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const hLines = Array.from({ length: density - 1 }, (_, i) => ((i + 1) / density) * 100);
  const vLines = Array.from({ length: density - 1 }, (_, i) => ((i + 1) / density) * 100);

  const delayFor = (pct) => {
    const distance = Math.abs(pct - 50) / 50;
    return distance * 0.6;
  };

  if (reduce) {
    return (
      <Wrap ref={ref} aria-hidden="true">
        {hLines.map((y, i) => (<HLine key={`h-${i}`} $color={lineColor} style={{ top: `${y}%` }} />))}
        {vLines.map((x, i) => (<VLine key={`v-${i}`} $color={lineColor} style={{ left: `${x}%` }} />))}
        <CenterCross $color={lineColor} />
      </Wrap>
    );
  }

  return (
    <Wrap ref={ref} aria-hidden="true">
      {hLines.map((y, i) => (
        <HLine
          key={`h-${i}`}
          $color={lineColor}
          style={{ top: `${y}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            scaleX: { duration, ease, delay: delayFor(y) },
            opacity: { duration: 0.4, ease: 'easeOut', delay: delayFor(y) },
          }}
        />
      ))}
      {vLines.map((x, i) => (
        <VLine
          key={`v-${i}`}
          $color={lineColor}
          style={{ left: `${x}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            scaleY: { duration, ease, delay: delayFor(x) + 0.2 },
            opacity: { duration: 0.4, ease: 'easeOut', delay: delayFor(x) + 0.2 },
          }}
        />
      ))}
      <CenterCross
        $color={lineColor}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.4, delay: duration * 0.7, ease }}
      />
    </Wrap>
  );
}
