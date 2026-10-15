import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MaskText from '../MaskText';
import CountUp from '../CountUp';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Hero — front page of a newspaper:
 * dateline between rules, a headline across the full measure,
 * then three columns separated by column rules: photo · lead · facts.
 */

const ease = [0.22, 1, 0.36, 1];

const Section = styled.section`
  background: ${({ theme }) => theme.colors.paper};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(20px, 3vw, 36px) ${({ theme }) => theme.gutter} clamp(56px, 8vw, 112px);
`;

const Dateline = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};

  .c {
    text-align: center;
  }
  .r {
    text-align: right;
  }
  .time {
    font-family: ${({ theme }) => theme.fonts.mono};
    letter-spacing: 0;
    margin-left: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    .c {
      display: none;
    }
  }
`;

const H1 = styled.h1`
  margin-top: clamp(28px, 4vw, 56px);
  font-size: clamp(50px, 10.4vw, 168px);
  line-height: 0.9;
  letter-spacing: -0.045em;
  color: ${({ theme }) => theme.colors.ink};

  .accent {
    font-style: italic;
    color: ${({ theme }) => theme.colors.accent};
    letter-spacing: -0.03em;
  }

  @media (min-width: 901px) {
    > span > span {
      white-space: nowrap;
    }
  }
`;

const Cols = styled.div`
  margin-top: clamp(40px, 5vw, 72px);
  padding-top: 18px;
  border-top: 3px solid ${({ theme }) => theme.colors.ink};
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 3fr);

  > * + * {
    border-left: 1px solid ${({ theme }) => theme.colors.line};
    padding-left: clamp(20px, 2.4vw, 36px);
  }
  > * {
    padding-right: clamp(20px, 2.4vw, 36px);
  }
  > *:last-child {
    padding-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    > * + * {
      border-left: 0;
      padding-left: 0;
      margin-top: 32px;
    }
    > * {
      padding-right: 0;
    }
  }
`;

const Figure = styled.figure`
  margin: 0;
`;

const Frame = styled(motion.div)`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.paperAlt};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 4 / 3;
  }
`;

const Img = styled(motion.img)`
  position: absolute;
  inset: -6% 0;
  width: 100%;
  height: 112%;
  object-fit: cover;
  object-position: 50% 22%;
  filter: grayscale(1) contrast(1.08) brightness(1.02);
  transition: filter 900ms ease;

  ${Frame}:hover & {
    filter: grayscale(0) contrast(1) brightness(1);
  }
`;

const Caption = styled(motion.figcaption)`
  margin-top: 12px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: 15px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.inkSoft};

  strong {
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Lead = styled(motion.div)`
  p {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: clamp(21px, 1.9vw, 26px);
    line-height: 1.42;
    color: ${({ theme }) => theme.colors.ink};
    hyphens: auto;
  }
  p::first-letter {
    float: left;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 4.1em;
    line-height: 0.82;
    padding: 0.06em 0.1em 0 0;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Actions = styled.div`
  margin-top: clamp(24px, 3vw, 36px);
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 50px;
  padding: 0 22px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
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
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  padding: 6px 0;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 100% 2px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 420ms ${({ theme }) => theme.ease}, color 200ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-size: 30% 2px;
  }
`;

const Facts = styled.dl`
  margin: 0;
  display: grid;
  gap: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    margin-top: 40px !important;
    padding-top: 16px;
    border-top: 3px solid ${({ theme }) => theme.colors.ink};
  }
`;

const Fact = styled(motion.div)`
  padding: 14px 0 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  &:first-child {
    border-top: 0;
    padding-top: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &:nth-child(2) {
      border-top: 0;
      padding-top: 0;
    }
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(44px, 4.4vw, 68px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.ink};
  }
  dd {
    margin: 6px 0 0;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 13px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.inkSoft};
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
    <path d="M7 1v12M7 13l-5-5M7 13l5-5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const reduce = useReducedMotion();
  const time = useHamburgTime(lang);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '7%']);

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
        <Dateline {...fade(0)}>
          <span>{h.eyebrow}</span>
          <span className="c">{h.dateline}</span>
          <span className="r">
            {h.localTime}
            <span className="time">{time}</span>
          </span>
        </Dateline>

        <H1 id="hero-heading">
          <MaskText lines={h.h1} accentLine={h.h1Accent} animateOnMount delay={0.15} stagger={0.07} />
        </H1>

        <Cols>
          <Figure>
            <Frame
              initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={reduce ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.3, ease, delay: 0.6 }}
            >
              <Img
                src={`${process.env.PUBLIC_URL}/images/portrait-web.jpg`}
                alt={h.portraitAlt}
                width="900"
                height="1199"
                style={reduce ? undefined : { y: imgY }}
                initial={reduce ? false : { scale: 1.14 }}
                animate={reduce ? undefined : { scale: 1 }}
                transition={{ duration: 1.9, ease, delay: 0.6 }}
              />
            </Frame>
            <Caption {...fade(1.1)}>
              <strong>{h.captionName}</strong> {h.captionNote}
            </Caption>
          </Figure>

          <Lead {...fade(0.9)}>
            <p>{h.sub}</p>
            <Actions>
              <Primary href="#projekt">
                {h.read} <Arrow />
              </Primary>
              <Secondary to="/cv">{h.ctaSecondary}</Secondary>
            </Actions>
          </Lead>

          <Facts>
            {t.facts.map((f, i) => (
              <Fact
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.1 + 0.1 * i }}
              >
                <dt>
                  <CountUp
                    value={f.value}
                    prefix={f.prefix}
                    suffix={f.suffix}
                    locale={lang === 'de' ? 'de-DE' : 'en-GB'}
                  />
                </dt>
                <dd>{f.label}</dd>
              </Fact>
            ))}
          </Facts>
        </Cols>
      </Inner>
    </Section>
  );
}
