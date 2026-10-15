import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MaskText — words rise out of an invisible baseline mask, one after another.
 * Works with natural line wrapping (each word has its own mask).
 *
 *   <MaskText text="Was ich selbst baue." />
 *   <MaskText lines={['Ich bringe KI', 'vom Prototyp']} accentLine={1} animateOnMount />
 */

const Word = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  /* room for descenders and italic overhang */
  padding: 0 0.04em 0.14em 0;
  margin-bottom: -0.14em;
`;

const Inner = styled(motion.span)`
  display: inline-block;
  will-change: transform;
`;

const Line = styled.span`
  display: block;
`;

const ease = [0.22, 1, 0.36, 1];

export default function MaskText({
  text,
  lines,
  accentLine = -1,
  accentClass = 'accent',
  animateOnMount = false,
  delay = 0,
  stagger = 0.045,
}) {
  const reduce = useReducedMotion();
  const rows = lines || [text];

  let index = 0;
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  const content = rows.map((row, r) => {
    const words = String(row).split(' ');
    const rendered = words.map((w, i) => {
      const d = delay + index * stagger;
      index += 1;
      if (reduce) {
        return (
          <React.Fragment key={i}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={i}>
          <Word>
            <Inner
              variants={{
                hidden: { y: '105%' },
                show: { y: '0%', transition: { duration: 1, ease, delay: d } },
              }}
            >
              {w}
            </Inner>
          </Word>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
    const cls = r === accentLine ? accentClass : undefined;
    return lines ? (
      <Line key={r} className={cls}>
        {rendered}
      </Line>
    ) : (
      <React.Fragment key={r}>{rendered}</React.Fragment>
    );
  });

  if (reduce) return <>{content}</>;
  return (
    <motion.span style={{ display: lines ? 'block' : 'inline' }} {...trigger}>
      {content}
    </motion.span>
  );
}
