import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

const Section = styled.section`
  padding: clamp(120px, 20vh, 220px) ${({ theme }) => theme.gutter} clamp(110px, 18vh, 200px);
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
`;

const H1 = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(56px, 8.4vw, 132px);
  line-height: 0.96;
  letter-spacing: -0.025em;
  max-width: 14ch;
  font-weight: 400;
  margin: 0;

  /* Two display lines */
  .line {
    display: block;
    will-change: transform, opacity;
  }

  .em {
    font-style: italic;
  }

  /* Subtle hover (kept from original) */
  transition: letter-spacing 400ms ease;
  &:hover { letter-spacing: -0.022em; }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Sub = styled(motion.p)`
  margin-top: 32px;
  max-width: 55ch;
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.fg};
`;

const Status = styled(motion.div)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  .sep {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

/* Easing curve consistent with the rest of the site */
const ease = [0.2, 0.7, 0.2, 1];

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);

  /**
   * Scroll-driven stagger:
   *   - First line (h1a) drifts from a slight horizontal offset to 0
   *   - Italic second line (h1b) has a longer travel distance to mimic
   *     OPPO's "physics-like pull toward center" – but translated into
   *     editorial typography motion.
   *   - We tie the transforms to the section's own scroll progress so the
   *     effect resolves naturally as the viewport moves past the hero.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Line A: starts slightly left, settles
  const xA = useTransform(scrollYProgress, [0, 0.25], [-24, 0]);
  // Line B (italic): starts further right, settles. Longer travel = "the move"
  const xB = useTransform(scrollYProgress, [0, 0.35], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.4, 1]);

  // Initial entrance animation (page-load), separate from scroll-driven motion
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  // Reduced motion: render plain, no transforms
  if (reduce) {
    return (
      <Section ref={ref} aria-labelledby="hero-heading">
        <H1 id="hero-heading">
          <span className="line">{t.hero.h1a}</span>{' '}
          <span className="line em">{t.hero.h1b}</span>
        </H1>
        <Sub>{t.hero.sub}</Sub>
        <Status>
          <span>{t.hero.loc}</span>
          <span className="sep" aria-hidden="true" />
          <span>{t.hero.avail}</span>
        </Status>
      </Section>
    );
  }

  return (
    <Section ref={ref} aria-labelledby="hero-heading">
      <motion.div initial="hidden" animate="visible" variants={container}>
        <H1 id="hero-heading">
          <motion.span
            className="line"
            variants={item}
            style={{ x: xA, opacity, display: 'inline-block' }}
          >
            {t.hero.h1a}
          </motion.span>{' '}
          <motion.span
            className="line em"
            variants={item}
            style={{ x: xB, opacity, display: 'inline-block' }}
          >
            {t.hero.h1b}
          </motion.span>
        </H1>

        <Sub variants={item}>{t.hero.sub}</Sub>

        <Status variants={item}>
          <span>{t.hero.loc}</span>
          <span className="sep" aria-hidden="true" />
          <span>{t.hero.avail}</span>
        </Status>
      </motion.div>
    </Section>
  );
}
