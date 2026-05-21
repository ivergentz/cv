import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Hairline from '../Hairline';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Pinned Products Scroll-Story.
 *
 * Behavior on desktop (≥ tablet breakpoint):
 *   - Section becomes ~300vh tall.
 *   - Inside a sticky 100vh viewport, the right column shows screenshots
 *     that crossfade based on scroll progress (rankbrief → sarahiver → werkruf).
 *   - The left column scrolls naturally with three product text blocks
 *     spaced to align with the crossfade thresholds.
 *
 * Behavior on mobile (< tablet breakpoint):
 *   - Pinning is disabled; layout collapses to the same vertical stack
 *     as the original Products component to keep the page readable.
 *
 * Reduced motion:
 *   - No pinning, no transforms, all screenshots visible in a regular stack.
 */

const Outer = styled.section`
  position: relative;
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter} 0;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
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

  .ital {
    font-style: italic;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Intro = styled.p`
  max-width: 48ch;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  line-height: 1.6;
`;

/* === The pinned story container === */

const Story = styled.div`
  /* On desktop, the outer story is tall — three viewport heights of scroll
     drive three crossfades. On mobile, height collapses to auto. */
  position: relative;
  padding-bottom: clamp(80px, 11vw, 160px);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 320vh;
  }
`;

const Sticky = styled.div`
  /* On desktop, this becomes the sticky viewport.
     On mobile, it falls back to normal flow. */
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

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
  /* On desktop, this column lets the three text blocks scroll through. */
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

/* === Text card (one per product) ===
   On desktop, all three cards stack at the same position and individual
   opacity is driven by scroll progress so only one is "active" at a time.
   On mobile, they flow naturally one after another. */

const TextCard = styled(motion.article)`
  display: grid;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-row: 1;
    grid-column: 1;
    align-self: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 48px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.hairlineStrong};

    &:first-of-type { border-top: 0; }
  }
`;

const ProductName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 4.4vw, 56px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 400;
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
  color: ${({ theme }) => theme.colors.muted};
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 2px;
`;

const URL = styled(AnimatedLink)`
  color: ${(props) => (props.$muted ? props.theme.colors.muted : props.theme.colors.fg)};
  font-size: 14px;
`;

const OneLiner = styled.p`
  font-size: 15px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`;

const Blocks = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 8px;
`;

const Block = styled.div``;

const Label = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 6px;
`;

const Text = styled.p`
  font-size: 15.5px;
  line-height: 1.6;
  margin: 0;
`;

const StackLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 12px;
`;

const Stack = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.fg};
`;

/* === Screenshot stack === */

const ShotLayer = styled(motion.figure)`
  position: absolute;
  inset: 0;
  margin: 0;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.shotBg};
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 4px;
  overflow: hidden;
  will-change: opacity, transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: ${(props) => (props.$contain ? 'contain' : 'cover')};
    object-position: ${(props) => (props.$contain ? 'center center' : 'top center')};
    filter: grayscale(0.35) sepia(0.08) contrast(0.96) brightness(0.98);
  }

  /* On mobile, all shots render inline (no absolute stacking) */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;
    inset: auto;
    margin-top: 32px;
  }
`;

const ShotFrame = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 10;
  }
`;

/* === Caption that follows the active product === */

const Caption = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ease = [0.2, 0.7, 0.2, 1];

export default function PinnedProducts() {
  const { t } = useLanguage();
  const L = t.products.labels;
  const reduce = useReducedMotion();
  const ref = useRef(null);

  /**
   * Map scroll progress (0 → 1 over the height of the Story container)
   * to opacity values for three layered screenshots and three text cards.
   *
   * Thresholds:
   *   0.00 – 0.33  → product 1 active
   *   0.33 – 0.66  → product 2 active
   *   0.66 – 1.00  → product 3 active
   *
   * Each transition uses a short crossfade window of ~0.08 around the
   * threshold so handoff feels deliberate, not abrupt.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Opacity curves for the three screenshots (and texts)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.30, 0.38], [1, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.30, 0.38, 0.63, 0.71], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.63, 0.71, 1.0, 1.0], [0, 1, 1, 1]);

  // Subtle scale "breath" so screenshots feel alive when active
  const scale1 = useTransform(scrollYProgress, [0.0, 0.30], [1.02, 1]);
  const scale2 = useTransform(scrollYProgress, [0.30, 0.63], [1.02, 1]);
  const scale3 = useTransform(scrollYProgress, [0.63, 1.0], [1.02, 1]);

  // Caption x-shift (mono caption beneath the screenshot drifts slightly)
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
    <Outer id="arbeit" aria-labelledby="products-heading" ref={ref}>
      <Hairline />
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

      <Story>
        <Sticky>
          {/* === LEFT: Stacked text cards, opacity-driven on desktop === */}
          <LeftCol>
            {products.map((p) => (
              <TextCard
                key={p.key}
                style={reduce ? undefined : { opacity: p.opacity }}
                transition={{ duration: 0.4, ease }}
              >
                <ProductName>{p.name}</ProductName>
                {p.badge && <Badge>{p.badge}</Badge>}
                <URL
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  $muted={!!p.badge}
                >
                  {p.urlLabel}
                </URL>
                <OneLiner>{p.data.one}</OneLiner>

                <Blocks>
                  <Block>
                    <Label>{L.problem}</Label>
                    <Text>{p.data.problem}</Text>
                  </Block>
                  <Block>
                    <Label>{L.solution}</Label>
                    <Text>{p.data.solution}</Text>
                  </Block>
                  <Block>
                    <Label>{L.scope}</Label>
                    <Text>{p.data.scope}</Text>
                  </Block>
                  <Block>
                    <Label>{L.status}</Label>
                    <Text>{p.data.status}</Text>
                  </Block>
                </Blocks>

                <StackLabel>{L.stack}</StackLabel>
                <Stack style={{ whiteSpace: 'pre-line' }}>{p.stack}</Stack>
              </TextCard>
            ))}
          </LeftCol>

          {/* === RIGHT: Layered screenshots, opacity-driven crossfade === */}
          <RightCol>
            <ShotFrame>
              {products.map((p) => (
                <ShotLayer
                  key={p.key}
                  $contain={p.contain}
                  style={
                    reduce
                      ? undefined
                      : { opacity: p.opacity, scale: p.scale }
                  }
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
      </Story>
    </Outer>
  );
}

/**
 * Scroll progress indicator: "01 / 03", "02 / 03", "03 / 03"
 * Updates based on the same scroll progress so the caption stays in sync
 * with the active screenshot.
 */
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
