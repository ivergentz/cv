import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Pinned Products Story with rotating section backgrounds.
 *
 * On desktop, the section is ~320vh tall. A sticky viewport pins the
 * screenshot stack on the right and the layered text cards on the left.
 * As scroll progresses, the active product changes — and so does the
 * background colour of the entire section interior, cycling through:
 *
 *   Product 1 (RankBrief)      → CREAM
 *   Product 2 (S&I. Wedding)   → WHITE
 *   Product 3 (WERKRUF)        → LIME
 *
 * The background uses Framer Motion's `useTransform` to interpolate
 * between fixed hex values, with sharp handoffs around the 33% and 66%
 * thresholds for clean visual phase changes.
 *
 * On mobile, pinning is disabled and the cards stack vertically. The
 * three coloured backgrounds become three stacked coloured cards.
 *
 * Reduced motion: all bg cycling disabled, single cream background,
 * standard stacked layout.
 */

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 40px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: end;
  margin-bottom: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  color: var(--ink);

  .ital {
    font-style: italic;
    color: var(--muted);
  }
`;

const Intro = styled.p`
  max-width: 48ch;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
`;

/* === Story wrapper with the scroll-driven bg === */

const StoryOuter = styled(motion.div)`
  position: relative;
  margin: 0 calc(-1 * ${({ theme }) => theme.gutter});
  padding: 0 ${({ theme }) => theme.gutter};
  /* full-bleed within the SectionFrame inner */

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 320vh;
  }
`;

const Sticky = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 60px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: sticky;
    top: 0;
    min-height: 100vh;
    grid-template-columns: 5fr 6fr;
    gap: 60px;
    align-items: center;
    padding: 80px 0;
  }
`;

const LeftCol = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-rows: 1fr;
    position: relative;
    height: calc(100vh - 160px);
  }
`;

const RightCol = styled.div`
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: calc(100vh - 160px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TextCard = styled(motion.article)`
  display: grid;
  gap: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-row: 1;
    grid-column: 1;
    align-self: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 48px 0;
    border-top: 1px solid var(--hairline);
    &:first-of-type { border-top: 0; }
  }
`;

const ProductName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 4.4vw, 56px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: var(--ink);
  margin: 0;

  .amp { font-style: italic; }
`;

const Badge = styled.span`
  display: inline-block;
  align-self: flex-start;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.highlightInk};
  color: ${({ theme }) => theme.colors.highlightFg};
  padding: 4px 10px;
  border-radius: 2px;
`;

const URL = styled(AnimatedLink)`
  color: var(--ink);
  font-size: 14px;
`;

const OneLiner = styled.p`
  font-size: 15px;
  line-height: 1.55;
  color: var(--muted);
  margin: 0;
`;

const Blocks = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 8px;
`;

const Block = styled.div``;

const Label = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.highlightInk};
  background: ${({ theme }) => theme.colors.lime};
  padding: 2px 6px;
  border-radius: 2px;
  margin-bottom: 6px;
`;

const Text = styled.p`
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--ink);
  margin: 0;
`;

const StackLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.highlightInk};
  background: ${({ theme }) => theme.colors.lime};
  padding: 2px 6px;
  border-radius: 2px;
  margin-top: 12px;
  align-self: flex-start;
  display: inline-block;
  width: fit-content;
`;

const Stack = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink);
  white-space: pre-line;
`;

const ShotFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
`;

const ShotLayer = styled(motion.figure)`
  position: absolute;
  inset: 0;
  margin: 0;
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(10,10,10,0.18);
  border-radius: 4px;
  overflow: hidden;
  will-change: opacity, transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: ${(props) => (props.$contain ? 'contain' : 'cover')};
    object-position: ${(props) => (props.$contain ? 'center center' : 'top center')};
    filter: contrast(0.97);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;
    inset: auto;
    margin-top: 32px;
  }
`;

const Caption = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ease = [0.2, 0.7, 0.2, 1];

/* Fixed bg colours for the three product slots */
const BG_CREAM = '#F1ECE0';
const BG_WHITE = '#FAFAF8';
const BG_LIME  = '#C8FF1A';

export default function Products() {
  const { t } = useLanguage();
  const L = t.products.labels;
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  /* Background colour cycles through cream → white → lime */
  const bg = useTransform(
    scrollYProgress,
    [0, 0.30, 0.38, 0.63, 0.71, 1],
    [BG_CREAM, BG_CREAM, BG_WHITE, BG_WHITE, BG_LIME, BG_LIME]
  );

  /* Opacity curves for products (and texts) */
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.30, 0.38], [1, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.30, 0.38, 0.63, 0.71], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.63, 0.71, 1.0, 1.0], [0, 1, 1, 1]);

  /* Subtle scale breath */
  const scale1 = useTransform(scrollYProgress, [0.0, 0.30], [1.02, 1]);
  const scale2 = useTransform(scrollYProgress, [0.30, 0.63], [1.02, 1]);
  const scale3 = useTransform(scrollYProgress, [0.63, 1.0], [1.02, 1]);

  const captionX = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const products = [
    {
      key: 'rb',
      name: 'RankBrief',
      url: 'https://rankbrief.com',
      urlLabel: 'rankbrief.com ↗',
      img: 'rankbrief.png',
      alt: t.shot.rb,
      contain: false,
      stack: 'React · Supabase · Stripe\nGoogle Search Console API\nClaude API',
      data: t.products.rb,
      opacity: opacity1,
      scale: scale1,
    },
    {
      key: 'si',
      name: (
        <>
          S<span className="amp">&amp;</span>I. Wedding
        </>
      ),
      url: 'https://sarahiver.com',
      urlLabel: 'sarahiver.com ↗',
      img: 'sarahiver.png',
      alt: t.shot.si,
      contain: true,
      stack: 'React · Supabase\nCloudinary · Brevo',
      data: t.products.si,
      opacity: opacity2,
      scale: scale2,
    },
    {
      key: 'wr',
      name: 'WERKRUF',
      url: 'https://werkruf.com',
      urlLabel: 'werkruf.com ↗',
      img: 'werkruf.png',
      alt: t.shot.wr,
      contain: false,
      stack:
        'React · Supabase · Stripe\nGoogle Places API\nGoogle Business Profile API\nCloudinary · Claude API',
      data: t.products.wr,
      opacity: opacity3,
      scale: scale3,
      badge: t.products.wr.badge,
    },
  ];

  return (
    <SectionFrame bg="cream" id="arbeit" aria-labelledby="products-heading">
      <Reveal>
        <Num>{t.sectionNum.products}</Num>
      </Reveal>
      <Head>
        <Reveal>
          <H2 id="products-heading">
            {t.products.title1} <span className="ital">{t.products.title2}</span>
          </H2>
        </Reveal>
        <Reveal>
          <Intro>{t.products.intro}</Intro>
        </Reveal>
      </Head>

      <StoryOuter
        ref={ref}
        style={reduce ? undefined : { background: bg }}
      >
        <Sticky>
          <LeftCol>
            {products.map((p) => (
              <TextCard
                key={p.key}
                style={reduce ? undefined : { opacity: p.opacity }}
                transition={{ duration: 0.4, ease }}
              >
                <ProductName>{p.name}</ProductName>
                {p.badge && <Badge>{p.badge}</Badge>}
                <URL href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.urlLabel}
                </URL>
                <OneLiner>{p.data.one}</OneLiner>

                <Blocks>
                  <Block><Label>{L.problem}</Label><Text>{p.data.problem}</Text></Block>
                  <Block><Label>{L.solution}</Label><Text>{p.data.solution}</Text></Block>
                  <Block><Label>{L.scope}</Label><Text>{p.data.scope}</Text></Block>
                  <Block><Label>{L.status}</Label><Text>{p.data.status}</Text></Block>
                </Blocks>

                <StackLabel>{L.stack}</StackLabel>
                <Stack>{p.stack}</Stack>
              </TextCard>
            ))}
          </LeftCol>

          <RightCol>
            <ShotFrame>
              {products.map((p) => (
                <ShotLayer
                  key={p.key}
                  $contain={p.contain}
                  style={reduce ? undefined : { opacity: p.opacity, scale: p.scale }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${p.img}`}
                    alt={p.alt}
                    loading="lazy"
                  />
                </ShotLayer>
              ))}
              {!reduce && (
                <Caption style={{ x: captionX }} aria-hidden="true">
                  <ScrollIndicator scrollYProgress={scrollYProgress} />
                </Caption>
              )}
            </ShotFrame>
          </RightCol>
        </Sticky>
      </StoryOuter>
    </SectionFrame>
  );
}

function ScrollIndicator({ scrollYProgress }) {
  const [n, setN] = React.useState(1);

  React.useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v < 0.33) setN(1);
      else if (v < 0.66) setN(2);
      else setN(3);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <span>
      {String(n).padStart(2, '0')} <span style={{ opacity: 0.4 }}>/ 03</span>
    </span>
  );
}
