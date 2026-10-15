import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * CountUp — counts from 0 to `value` once the number scrolls into view.
 * Uses tabular figures so the width does not jitter while counting.
 */
export default function CountUp({ value, prefix = '', suffix = '', display, duration = 1.6, locale = 'de-DE' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce || display) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, display]);

  return (
    <span ref={ref} className="tnum">
      {display || (
        <>
          {prefix}
          {n.toLocaleString(locale)}
          {suffix}
        </>
      )}
    </span>
  );
}
