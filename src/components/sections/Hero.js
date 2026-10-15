import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MaskText from '../MaskText';
import CountUp from '../CountUp';
import { useLanguage } from '../../i18n/LanguageContext';

const ease = [0.22, 1, 0.36, 1];

const Section = styled.section`
  background: ${({ theme }) => theme.colors.paper};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(40px, 7vw, 96px) ${({ theme }) => theme.gutter} 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(260px, 26vw, 360px);
  gap: clamp(32px, 6vw, 96px);
  align-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.inkSoft};
  margin-bottom: clamp(24px, 3vw, 36px);

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const H1 = styled.h1`
  font-size: clamp(44px, 6.6vw, 100px);
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.ink};

  @media (min-width: 861px) {
    > span > span {
      white-space: nowrap;
    }
  }

  .accent {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
    letter-spacing: -0.02em;
  }
`;

const Sub = styled(motion.p)`
  margin-top: clamp(28px, 3.5vw, 44px);
  max-width: 54ch;
  font-size: clamp(17px, 1.35vw, 19px);
  line-height: 1.62;
  color: ${({ theme }) => theme.colors.inkSoft};
`;

const Actions = styled(motion.div)`
  margin-top: clamp(28px, 3.5vw, 40px);
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
`;

const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 24px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-size: 15px;
  font-weight: 500;
  transition: background 240ms ease;

  svg {
    transition: transform 400ms ${({ theme }) => theme.ease};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
  &:hover svg {
    transform: translateY(3px);
  }
`;

const Secondary = styled(RouterLink)`
  position: relative;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  padding: 6px 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 1px;
    background: currentColor;
    transform-origin: left center;
    transition: transform 420ms ${({ theme }) => theme.ease};
  }
  &:hover::after {
    transform: scaleX(0.35);
  }
`;

const Figure = styled.figure`
  margin: 0;
  width: 100%;
  justify-self: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-self: stretch;
    max-width: 520px;
  }
`;

const Frame = styled(motion.div)`
  position: relative;
  aspect-ratio: 4 / 5;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 5 / 4;
  }
  overflow: hidden;
  background: ${({ theme }) => theme.colors.paperAlt};
  border-radius: 2px;
`;

const Img = styled(motion.img)`
  position: absolute;
  inset: -6% 0;
  width: 100%;
  height: 112%;
  object-fit: cover;
  object-position: 50% 22%;
  filter: grayscale(0.15) contrast(1.02);
`;

const Caption = styled(motion.figcaption)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.inkMute};

  .time {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    margin-right: 8px;
    vertical-align: 1px;
  }
`;

const Facts = styled.dl`
  margin: clamp(64px, 9vw, 128px) 0 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Fact = styled(motion.div)`
  padding: 24px 24px 28px 0;
  border-right: 1px solid ${({ theme }) => theme.colors.line};
  padding-left: 24px;

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px 16px 22px 0;
    &:nth-child(2n) {
      border-right: 0;
      padding-left: 16px;
    }
    &:nth-child(2n + 1) {
      padding-left: 0;
    }
    &:nth-child(n + 3) {
      border-top: 1px solid ${({ theme }) => theme.colors.line};
    }
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(36px, 4vw, 56px);
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 10px;
  }
  dd {
    margin: 0;
    font-size: 14px;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 22ch;
  }
`;

function useHamburgTime(lang) {
  const fmt = () =>
    new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return time;
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1v12M7 13l-5-5M7 13l5-5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const reduce = useReducedMotion();
  const time = useHamburgTime(lang);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <Section ref={ref} aria-labelledby="hero-heading">
      <Inner>
        <Grid>
          <div>
            <Eyebrow {...fade(0.1)}>{h.eyebrow}</Eyebrow>
            <H1 id="hero-heading">
              <MaskText lines={h.h1} accentLine={h.h1Accent} animateOnMount delay={0.2} stagger={0.06} />
            </H1>
            <Sub {...fade(0.75)}>{h.sub}</Sub>
            <Actions {...fade(0.9)}>
              <Primary href="#projekt">
                {h.ctaPrimary} <Arrow />
              </Primary>
              <Secondary to="/cv">{h.ctaSecondary}</Secondary>
            </Actions>
          </div>

          <Figure>
            <Frame
              initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={reduce ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.3, ease, delay: 0.35 }}
            >
              <Img
                src={`${process.env.PUBLIC_URL}/images/portrait-web.jpg`}
                alt={h.portraitAlt}
                width="900"
                height="1199"
                style={reduce ? undefined : { y: imgY }}
                initial={reduce ? false : { scale: 1.12 }}
                animate={reduce ? undefined : { scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.35 }}
              />
            </Frame>
            <Caption {...fade(1.2)}>
              <span>
                <span className="dot" aria-hidden="true" />
                {h.place}
              </span>
              <span>
                {h.localTime} <span className="time">{time}</span>
              </span>
            </Caption>
          </Figure>
        </Grid>

        <Facts>
          {t.facts.map((f, i) => (
            <Fact
              key={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 * i }}
            >
              <dt>
                <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} locale={lang === 'de' ? 'de-DE' : 'en-GB'} />
              </dt>
              <dd>{f.label}</dd>
            </Fact>
          ))}
        </Facts>
      </Inner>
    </Section>
  );
}
