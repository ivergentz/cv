import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Products — Pinned Scroll Story in the dark Blueprint design.
 *
 * Three products crossfade through a sticky viewport. Left side shows
 * product metadata + hard metrics in mono-styled boxes. Right side shows
 * a mock-browser-chrome wrapper around each product screenshot.
 *
 * Background subtly cycles between dark and elevated tones to suggest
 * phase change without leaving the dark mode.
 */

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lime};
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
  color: ${({ theme }) => theme.colors.fg};

  .ital {
    font-style: italic;
    color: ${({ theme }) => theme.colors.fgDim};
  }
`;

const Intro = styled.p`
  max-width: 48ch;
  color: ${({ theme }) => theme.colors.fgMuted};
  font-size: 16px;
  line-height: 1.6;
`;

const StoryOuter = styled(motion.div)`
  position: relative;
  margin: 0 calc(-1 * ${({ theme }) => theme.gutter});
  padding: 0 ${({ theme }) => theme.gutter};

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
    border-top: 1px solid ${({ theme }) => theme.colors.hairlineDim};
    &:first-of-type { border-top: 0; }
  }
`;

const SlotMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  color: ${({ theme }) => theme.colors.lime};
  margin-bottom: 2px;
`;

const ProductName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 4.4vw, 56px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.fg};
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
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.limeShadow};
  padding: 3px 10px;
  border-radius: 2px;
`;

const URL = styled(AnimatedLink)`
  color: ${({ theme }) => theme.colors.fgDim};
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 0.04em;
`;

const OneLiner = styled.p`
  font-size: 15.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.fgMuted};
  margin: 6px 0 0;
`;

/* === Hard metrics row === */
const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 16px;
  padding: 18px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  margin: 8px 0;
`;

const MetricLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lime};
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(24px, 2.8vw, 34px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.fg};

  .unit {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.fgDim};
    margin-left: 4px;
  }
`;

const Detail = styled.div`
  display: grid;
  gap: 8px;
`;

const DetailLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.fgDim};
`;

const DetailText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.fgMuted};
  margin: 0;
`;

const Stack = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.fgMuted};
  white-space: pre-line;
  margin-top: 6px;
`;

/* === Mock browser frame around screenshot === */
const BrowserFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: 4px;
  overflow: hidden;
`;

const Chrome = styled.div`
  height: 28px;
  background: ${({ theme }) => theme.colors.bgFade};
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairlineDim};
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(245,245,240,0.18);
  }

  .url {
    margin-left: 12px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 10px;
    color: ${({ theme }) => theme.colors.fgDim};
    letter-spacing: 0.03em;
  }
`;

const ShotStack = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 28px);
`;

const ShotLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  will-change: opacity, transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: contrast(0.95) brightness(0.95);
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
  color: ${({ theme }) => theme.colors.lime};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ease = [0.2, 0.7, 0.2, 1];

export default function Products() {
  const { t } = useLanguage();
  const L = t.products.labels;
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  /* Subtle bg variation within dark mode */
  const bg = useTransform(
    scrollYProgress,
    [0, 0.30, 0.38, 0.63, 0.71, 1],
    ['#0A0A0A', '#0A0A0A', '#121212', '#121212', '#0A0A0A', '#0A0A0A']
  );

  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.30, 0.38], [1, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.30, 0.38, 0.63, 0.71], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.63, 0.71, 1.0, 1.0], [0, 1, 1, 1]);

  const scale1 = useTransform(scrollYProgress, [0.0, 0.30], [1.02, 1]);
  const scale2 = useTransform(scrollYProgress, [0.30, 0.63], [1.02, 1]);
  const scale3 = useTransform(scrollYProgress, [0.63, 1.0], [1.02, 1]);

  const products = [
    {
      key: 'rb',
      slot: '01 / 03',
      name: 'RankBrief',
      url: 'https://rankbrief.com',
      urlLabel: 'rankbrief.com ↗',
      domain: 'rankbrief.com/dashboard',
      img: 'rankbrief.png',
      alt: t.shot.rb,
      stack: 'React · Supabase · Stripe\nGoogle Search Console API\nClaude API',
      data: t.products.rb,
      opacity: opacity1,
      scale: scale1,
    },
    {
      key: 'si',
      slot: '02 / 03',
      name: (<>S<span className="amp">&amp;</span>I. Wedding</>),
      url: 'https://sarahiver.com',
      urlLabel: 'sarahiver.com ↗',
      domain: 'sarahiver.com',
      img: 'sarahiver.png',
      alt: t.shot.si,
      stack: 'React · Supabase\nCloudinary · Brevo',
      data: t.products.si,
      opacity: opacity2,
      scale: scale2,
    },
    {
      key: 'wr',
      slot: '03 / 03',
      name: 'WERKRUF',
      url: 'https://werkruf.com',
      urlLabel: 'werkruf.com ↗',
      domain: 'werkruf.com',
      img: 'werkruf.png',
      alt: t.shot.wr,
      stack: 'React · Supabase · Stripe\nGoogle Places API\nGoogle Business Profile API\nCloudinary · Claude API',
      data: t.products.wr,
      opacity: opacity3,
      scale: scale3,
      badge: t.products.wr.badge,
    },
  ];

  return (
    <SectionFrame bg="dark" id="arbeit" aria-labelledby="products-heading">
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
                <SlotMeta>/ {p.slot}</SlotMeta>
                <ProductName>{p.name}</ProductName>
                {p.badge && <Badge>{p.badge}</Badge>}
                <URL href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.urlLabel}
                </URL>
                <OneLiner>{p.data.one}</OneLiner>

                {p.data.metrics && p.data.metrics.length > 0 && (
                  <Metrics>
                    {p.data.metrics.map((m, i) => (
                      <div key={i}>
                        <MetricLabel>{m.label}</MetricLabel>
                        <MetricValue>
                          {m.value}
                          {m.unit && <span className="unit">{m.unit}</span>}
                        </MetricValue>
                      </div>
                    ))}
                  </Metrics>
                )}

                <Detail>
                  <div>
                    <DetailLabel>{L.problem}</DetailLabel>
                    <DetailText>{p.data.problem}</DetailText>
                  </div>
                  <div>
                    <DetailLabel>{L.scope}</DetailLabel>
                    <DetailText>{p.data.scope}</DetailText>
                  </div>
                </Detail>

                <DetailLabel style={{ marginTop: 8 }}>{L.stack}</DetailLabel>
                <Stack>{p.stack}</Stack>
              </TextCard>
            ))}
          </LeftCol>

          <RightCol>
            <BrowserFrame>
              <Chrome>
                <span className="dot" /><span className="dot" /><span className="dot" />
                {products.map((p) => (
                  <motion.span
                    key={p.key}
                    className="url"
                    style={reduce ? undefined : { opacity: p.opacity, position: 'absolute', left: 56 }}
                  >
                    {p.domain}
                  </motion.span>
                ))}
              </Chrome>
              <ShotStack>
                {products.map((p) => (
                  <ShotLayer
                    key={p.key}
                    style={reduce ? undefined : { opacity: p.opacity, scale: p.scale }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${p.img}`}
                      alt={p.alt}
                      loading="lazy"
                    />
                  </ShotLayer>
                ))}
              </ShotStack>
              {!reduce && (
                <Caption aria-hidden="true">
                  <ScrollIndicator scrollYProgress={scrollYProgress} />
                </Caption>
              )}
            </BrowserFrame>
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
