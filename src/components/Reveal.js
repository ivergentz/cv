import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal — fade + short rise when the element enters the viewport.
 * Plays once. Respects prefers-reduced-motion.
 */
const ease = [0.22, 1, 0.36, 1];

export default function Reveal({ children, as = 'div', delay = 0, y = 18, className, style }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  );
}
