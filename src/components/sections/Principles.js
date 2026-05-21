import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.crimson};
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 64px;
  color: ${({ theme }) => theme.colors.fg};

  .ital {
    font-style: italic;
    background: ${({ theme }) => theme.colors.crimson};
    color: #FFFFFF;
    padding: 0 0.16em 0.04em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  perspective: 1000px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const CardWrap = styled(motion.div)`
  position: relative;
  will-change: transform;
`;

const Card = styled(motion.div)`
  position: relative;
  display: grid;
  gap: 12px;
  padding: 32px 28px 30px;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: 4px;
  height: 100%;
  transform-style: preserve-3d;
  transition: border-color 280ms ease, background 280ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.crimson};
    background: #FFFFFF;
  }
`;

const RomanWrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Roman = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.crimson};
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
  color: ${({ theme }) => theme.colors.fg};
`;

const Body = styled.p`
  font-size: 14.5px;
  line-height: 1.65;
  max-width: 40ch;
  color: ${({ theme }) => theme.colors.fgMuted};
  margin: 0;
`;

const romans = ['i', 'ii', 'iii', 'iv'];
const ease = [0.2, 0.7, 0.2, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const underlineVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.8, ease, delay: 0.3 } },
};

function TiltCard({ children, reduce }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 120, damping: 18 });

  const handleMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    if (reduce) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <Card
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY }}
    >
      {children}
    </Card>
  );
}

export default function Principles() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <SectionFrame bg="dark" id="prinzipien" aria-labelledby="principles-heading">
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
            <CardWrap key={i} variants={reduce ? undefined : cardVariants}>
              <TiltCard reduce={reduce}>
                <RomanWrap>
                  <Roman>
                    {romans[i]}.
                    <RomanUnderline aria-hidden="true" viewBox="0 0 30 4" preserveAspectRatio="none">
                      <motion.path
                        d="M 0 2 L 30 2"
                        stroke="#DC143C"
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
              </TiltCard>
            </CardWrap>
          ))}
        </Grid>
      </motion.div>
    </SectionFrame>
  );
}
