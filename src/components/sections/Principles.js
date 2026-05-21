import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Principles section — four cards on cream with:
 *   - Drawn-in SVG underline per roman numeral (pathLength animation)
 *   - Staggered card reveal as they enter viewport
 *   - Hover lift with lime accent edge
 *
 * Each card has a colored top hairline that grows in width on hover.
 */

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 80px;
  color: var(--ink);

  .ital {
    font-style: italic;
    background: ${({ theme }) => theme.colors.lime};
    color: ${({ theme }) => theme.colors.highlightInk};
    padding: 0 0.18em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  display: grid;
  gap: 14px;
  padding: 32px 28px 30px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid var(--hairline);
  border-radius: 4px;
  cursor: default;
  overflow: hidden;
  isolation: isolate;
  transition: border-color 280ms ease, background 280ms ease;

  /* The growing top edge (lime accent) */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    height: 3px;
    width: 36px;
    background: ${({ theme }) => theme.colors.highlightInk};
    transition: width 380ms cubic-bezier(0.2, 0.7, 0.2, 1);
    z-index: 1;
  }

  &:hover::before {
    width: 100%;
    background: ${({ theme }) => theme.colors.highlightInk};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.highlightInk};
    background: ${({ theme }) => theme.colors.lime};
  }
`;

const RomanWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Roman = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.highlightInk};
  letter-spacing: 0.02em;
  position: relative;
  padding-bottom: 2px;
`;

const RomanUnderline = styled.svg`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 4px;
  overflow: visible;
`;

const PName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.2;
  letter-spacing: -0.015em;
  max-width: 22ch;
  color: var(--ink);
`;

const Body = styled.p`
  font-size: 15.5px;
  line-height: 1.65;
  max-width: 40ch;
  color: var(--ink);
  margin: 0;
`;

const romans = ['i', 'ii', 'iii', 'iv'];

const ease = [0.2, 0.7, 0.2, 1];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const underlineVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.8, ease, delay: 0.3 },
  },
};

export default function Principles() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <SectionFrame bg="cream" id="prinzipien" aria-labelledby="principles-heading">
      <Reveal>
        <Num>{t.sectionNum.principles}</Num>
      </Reveal>
      <Reveal>
        <H2 id="principles-heading">
          {t.principles.title1} <span className="ital">{t.principles.title2}</span>
        </H2>
      </Reveal>

      <motion.div
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        variants={container}
      >
        <Grid>
          {t.principles.items.map((item, i) => (
            <Card key={i} variants={reduce ? undefined : cardVariants}>
              <RomanWrap>
                <Roman>
                  {romans[i]}.
                  <RomanUnderline
                    aria-hidden="true"
                    viewBox="0 0 30 4"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 0 2 L 30 2"
                      stroke="#0A0A0A"
                      strokeWidth="1.5"
                      fill="none"
                      variants={reduce ? undefined : underlineVariants}
                      initial={reduce ? false : { pathLength: 0 }}
                    />
                  </RomanUnderline>
                </Roman>
              </RomanWrap>
              <PName>{item.h}</PName>
              <Body>{item.b}</Body>
            </Card>
          ))}
        </Grid>
      </motion.div>
    </SectionFrame>
  );
}
