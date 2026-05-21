import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * Products — Horizontal force-scroll story driven by GSAP ScrollTrigger.
 *
 * Behaviour on desktop (≥ tablet breakpoint):
 *   - Section pins for the duration of a vertical scroll equivalent to
 *     N × viewport height (one per slide). Vertical scroll input is
 *     translated into horizontal track movement via `translateX`.
 *   - Three full-bleed slides (RankBrief, S&I. Wedding, WERKRUF) scroll
 *     left as the user scrolls down. Pin releases automatically.
 *
 * Behaviour on mobile (< tablet breakpoint):
 *   - Pinning is disabled. Slides stack vertically with normal scroll.
 *
 * Reduced motion:
 *   - Disable pinning + horizontal translation. Slides stack vertically.
 *
 * Performance:
 *   - Animates only `translateX` on the track (GPU)
 *   - Container uses `will-change: transform`
 *   - Strict-mode-safe cleanup via gsap.context().revert()
 */

/* === Layout containers === */

const Outer = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.bg};
`;

const Heading = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter} clamp(40px, 6vw, 80px);
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lime};
  margin-bottom: 28px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
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

/* === Horizontal scroll mechanics === */

const Pinner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  /* On mobile, drop the pin: container collapses to auto and slides stack */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: auto;
    overflow: visible;
  }
`;

const Track = styled.div`
  display: flex;
  height: 100%;
  will-change: transform;

  /* Mobile: vertical stack */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`;

const Slide = styled.div`
  flex: 0 0 100vw;
  height: 100vh;
  padding: 60px ${({ theme }) => theme.gutter};
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: 60px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: none;
    width: 100%;
    height: auto;
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 80px ${({ theme }) => theme.gutter};
    border-top: 1px solid ${({ theme }) => theme.colors.hairlineDim};

    &:first-child { border-top: 0; }
  }
`;

const SlideMax = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  width: 100%;
  display: contents;
`;

/* === Slide content — left text column === */

const TextCol = styled.div`
  display: grid;
  gap: 14px;
  align-content: center;
`;

const SlotMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  color: ${({ theme }) => theme.colors.lime};
`;

const ProductName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 4.4vw, 64px);
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
  font-size: 16px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.fgMuted};
  margin: 6px 0 0;
  max-width: 42ch;
`;

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

const DetailLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.fgDim};
  display: block;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const DetailText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.fgMuted};
  margin: 0;
`;

/* === Slide content — right mockup column === */

const MockupCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const BrowserFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
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

const Shot = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 28px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: contrast(0.95) brightness(0.95);
  }
`;

/* Slide-counter pinned to right side of viewport during scroll */
const Counter = styled.div`
  position: absolute;
  bottom: 40px;
  right: ${({ theme }) => theme.gutter};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lime};
  z-index: 5;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ProgressTrack = styled.div`
  position: absolute;
  bottom: 30px;
  left: ${({ theme }) => theme.gutter};
  right: ${({ theme }) => theme.gutter};
  height: 2px;
  background: ${({ theme }) => theme.colors.hairlineDim};
  z-index: 5;
  pointer-events: none;

  .fill {
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.lime};
    transform-origin: left center;
    will-change: transform;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export default function Products() {
  const { t } = useLanguage();
  const L = t.products.labels;

  const pinnerRef = useRef(null);
  const trackRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    /* Respect reduced motion: no pinning, no horizontal motion */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return undefined;

    /* Mobile guard: skip on narrow screens */
    const tabletMq = window.matchMedia('(max-width: 820px)');
    if (tabletMq.matches) return undefined;

    const pinner = pinnerRef.current;
    const track = trackRef.current;
    if (!pinner || !track) return undefined;

    /**
     * gsap.context() automatically tracks all ScrollTriggers and tweens
     * created inside it. When we call ctx.revert() in cleanup, everything
     * is removed cleanly — including the pin spacer ScrollTrigger creates.
     * This is the key to surviving React Strict Mode's double mount.
     */
    const ctx = gsap.context(() => {
      const slides = track.querySelectorAll('[data-slide]');
      const slideCount = slides.length;

      /* Travel distance = (N - 1) viewport widths */
      const distance = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinner,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            /* Update counter */
            const idx = Math.min(
              slideCount - 1,
              Math.floor(self.progress * slideCount + 0.0001)
            );
            if (counterRef.current) {
              counterRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(slideCount).padStart(2, '0')}`;
            }
            /* Update progress bar via transform (GPU) */
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, pinner);

    return () => ctx.revert();
  }, []);

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
      data: t.products.rb,
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
      data: t.products.si,
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
      data: t.products.wr,
      badge: t.products.wr.badge,
    },
  ];

  return (
    <Outer id="arbeit" aria-labelledby="products-heading">
      <Heading>
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
      </Heading>

      <Pinner ref={pinnerRef}>
        <Track ref={trackRef}>
          {products.map((p) => (
            <Slide key={p.key} data-slide>
              <SlideMax>
                <TextCol>
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

                  <div>
                    <DetailLabel>{L.scope}</DetailLabel>
                    <DetailText>{p.data.scope}</DetailText>
                  </div>
                </TextCol>

                <MockupCol>
                  <BrowserFrame>
                    <Chrome>
                      <span className="dot" /><span className="dot" /><span className="dot" />
                      <span className="url">{p.domain}</span>
                    </Chrome>
                    <Shot>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${p.img}`}
                        alt={p.alt}
                        loading="lazy"
                      />
                    </Shot>
                  </BrowserFrame>
                </MockupCol>
              </SlideMax>
            </Slide>
          ))}
        </Track>

        <Counter ref={counterRef} aria-hidden="true">01 / 03</Counter>
        <ProgressTrack aria-hidden="true">
          <div className="fill" ref={progressRef} style={{ transform: 'scaleX(0)' }} />
        </ProgressTrack>
      </Pinner>
    </Outer>
  );
}
