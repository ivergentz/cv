import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MaskText — words rise out of an invisible baseline mask, one after another.
 * Works with natural line wrapping (each word has its own mask).
 *
 * Inline markup inside the text:
 *   *words*  → italic serif accent  (class "it")
 *   ^words^  → crimson accent        (class "acc")
 *
 *   <MaskText text="Was ich *selbst* baue." />
 *   <MaskText lines={['Ich bringe KI', '*vom* Prototyp', '^in den Betrieb.^']} animateOnMount />
 */

const Word = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding: 0.04em 0.05em 0.12em 0;
  margin: -0.04em 0 -0.12em;
`;

const Inner = styled(motion.span)`
  display: inline-block;
  will-change: transform;
`;

const Line = styled.span`
  display: block;
`;

const ease = [0.22, 1, 0.36, 1];

function tokenize(row) {
  let it = false;
  let acc = false;
  return String(row)
    .split(' ')
    .filter(Boolean)
    .map((raw) => {
      let w = raw;
      const startIt = w.startsWith('*');
      const startAcc = w.startsWith('^');
      if (startIt) {
        it = true;
        w = w.slice(1);
      }
      if (startAcc) {
        acc = true;
        w = w.slice(1);
      }
      const cls = [it ? 'it' : '', acc ? 'acc' : ''].filter(Boolean).join(' ');
      const endIt = w.endsWith('*') || /\*[.,!?:;]$/.test(w);
      const endAcc = w.endsWith('^') || /\^[.,!?:;]$/.test(w);
      w = w.replace(/[*^]/g, '');
      if (endIt) it = false;
      if (endAcc) acc = false;
      return { w, cls };
    });
}

export default function MaskText({ text, lines, animateOnMount = false, delay = 0, stagger = 0.045 }) {
  const reduce = useReducedMotion();
  const rows = lines || [text];

  let index = 0;
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  const content = rows.map((row, r) => {
    const words = tokenize(row);
    const rendered = words.map(({ w, cls }, i) => {
      const d = delay + index * stagger;
      index += 1;
      const space = i < words.length - 1 ? ' ' : '';
      if (reduce) {
        return (
          <React.Fragment key={i}>
            <span className={cls || undefined}>{w}</span>
            {space}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={i}>
          <Word className={cls || undefined}>
            <Inner
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 1, ease, delay: d } },
              }}
            >
              {w}
            </Inner>
          </Word>
          {space}
        </React.Fragment>
      );
    });
    return lines ? <Line key={r}>{rendered}</Line> : <React.Fragment key={r}>{rendered}</React.Fragment>;
  });

  if (reduce) return <>{content}</>;
  return (
    <motion.span style={{ display: lines ? 'block' : 'inline' }} {...trigger}>
      {content}
    </motion.span>
  );
}
