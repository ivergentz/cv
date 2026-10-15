import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MaskText from '../MaskText';
import CountUp from '../CountUp';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Hero — black field, condensed caps headline, black-and-white portrait
 * bleeding off the right edge. Below: a white "in numbers" band set like a
 * countdown (big condensed figures, tiny labels, crimson dash).
 */

const ease = [0.22, 1, 0.36, 1];

const Dark = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  overflow: hidden;
`;

const Grid = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(40px, 5vw, 72px) ${({ theme }) => theme.gutter} clamp(48px, 6vw, 88px);
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: end;
  min-height: min(calc(100vh - 60px), 960px);
  min-height: min(calc(100svh - 60px), 960px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    min-height: 0;
    padding-top: 24px;
    gap: 32px;
  }
`;

const TextCol = styled.div`
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 0;
`;

const Kicker = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accentOnInk};
  margin-bottom: clamp(20px, 3vw, 32px);

  &::before {
    content: '';
    width: 28px;
    height: 2px;
    background: currentColor;
  }
`;

const H1 = styled.h1`
  --accent: ${({ theme }) => theme.colors.accentOnInk};
  font-size: clamp(48px, 6.4vw, 120px);
  line-height: 0.92;

  @supports (font-size: 1cqi) {
    font-size: clamp(44px, 14cqi, 132px);
  }
  font-weight: 600;
  color: ${({ theme }) => theme.colors.paper};

  @media (min-width: 901px) {
    > span > span {
      white-space: nowrap;
    }
  }

  .it {
    font-size: 0.82em;
    color: ${({ theme }) => theme.colors.paper};
  }
`;

const Lead = styled(motion.p)`
  margin-top: clamp(24px, 3vw, 36px);
  max-width: 48ch;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(18px, 1.5vw, 21px);
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuteOnInk};
`;

const Actions = styled(motion.div)`
  margin-top: clamp(24px, 3vw, 36px);
  display: flex;
  flex-wrap: wrap;
  gap: 14px 26px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: background 240ms ease, color 240ms ease;

  svg {
    transition: transform 400ms ${({ theme }) => theme.ease};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
  }
  &:hover svg {
    transform: translateY(3px);
  }
`;

const Secondary = styled(RouterLink)`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 6px 0;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 100% 2px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 420ms ${({ theme }) => theme.ease};

  &:hover {
    background-size: 30% 2px;
  }
`;

const Name = styled(motion.p)`
  margin-top: clamp(32px, 4vw, 56px);
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.lineOnInk};
  font-family: ${({ theme }) => theme.fonts.italic};
  font-style: italic;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.inkMuteOnInk};

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.paper};
    margin-right: 8px;
  }
`;

const Figure = styled.figure`
  margin: 0;
  width: 100%;
  /* keep the 4:5 photo inside the first screen */
  max-width: min(100%, calc((100svh - 60px - 200px) * 0.8));
  justify-self: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: -1;
    max-width: none;
    justify-self: stretch;
  }
`;

const PhotoCol = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: #1c1c1c;
  aspect-ratio: 4 / 5;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: 5 / 4;
  }
`;

const Photo = styled(motion.img)`
  position: absolute;
  inset: -6% 0;
  width: 100%;
  height: 112%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: grayscale(1) contrast(1.12) brightness(0.92);
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(17, 17, 17, 0.35) 0%, rgba(17, 17, 17, 0) 35%);
  pointer-events: none;
`;

const PhotoMeta = styled(motion.figcaption)`
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.lineOnInk};
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.paper};

  .time {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: 400;
    letter-spacing: 0;
    margin-left: 6px;
  }
`;

/* ---------- Numbers band ---------- */

const Light = styled.section`
  background: ${({ theme }) => theme.colors.paper};
  padding: clamp(56px, 8vw, 104px) ${({ theme }) => theme.gutter};
  text-align: center;
`;

const Small = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const Big = styled.h2`
  margin-top: 8px;
  font-size: clamp(28px, 3vw, 40px);
`;

const Numbers = styled.dl`
  margin: clamp(24px, 3vw, 36px) auto 0;
  max-width: 980px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 32px;
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    font-size: clamp(56px, 7vw, 104px);
    line-height: 0.95;
    color: ${({ theme }) => theme.colors.ink};
  }
  dd {
    margin: 10px auto 0;
    max-width: 20ch;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.inkMute};
  }
`;

const Dash = styled(motion.span)`
  display: block;
  width: 44px;
  height: 3px;
  margin: clamp(28px, 3.5vw, 40px) auto 0;
  background: ${({ theme }) => theme.colors.accent};
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
    <path d="M7 1v12M7 13l-5-5M7 13l5-5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const reduce = useReducedMotion();
  const time = useHamburgTime(lang);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);

  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <>
      <Dark ref={ref} aria-labelledby="hero-heading">
        <Grid>
          <TextCol>
            <Kicker {...fade(0.1)}>{h.eyebrow}</Kicker>
            <H1 id="hero-heading">
              <MaskText lines={h.h1} animateOnMount delay={0.2} stagger={0.07} />
            </H1>
            <Lead {...fade(0.9)}>{h.sub}</Lead>
            <Actions {...fade(1.05)}>
              <Primary href="#projekt">
                {h.read} <Arrow />
              </Primary>
              <Secondary to="/cv">{h.ctaSecondary}</Secondary>
            </Actions>
            <Name {...fade(1.2)}>
              <strong>Iver Bohnes</strong>
              {h.nameLine}
            </Name>
          </TextCol>

          <Figure>
            <PhotoCol
              initial={reduce ? false : { clipPath: 'inset(0% 0% 0% 100%)' }}
              animate={reduce ? undefined : { clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            >
              <Photo
                src={`${process.env.PUBLIC_URL}/images/portrait-web.jpg`}
                alt={h.portraitAlt}
                width="900"
                height="1199"
                style={reduce ? undefined : { y: imgY }}
                initial={reduce ? false : { scale: 1.18 }}
                animate={reduce ? undefined : { scale: 1 }}
                transition={{ duration: 2, ease, delay: 0.15 }}
              />
              <Shade />
            </PhotoCol>
            <PhotoMeta {...fade(1.3)}>
              <span>{h.place}</span>
              <span>
                {h.localTime}
                <span className="time">{time}</span>
              </span>
            </PhotoMeta>
          </Figure>
        </Grid>
      </Dark>

      <Light aria-label={lang === 'de' ? 'In Zahlen' : 'In numbers'}>
        <Small>{lang === 'de' ? 'Kurz gesagt' : 'In short'}</Small>
        <Big>{lang === 'de' ? 'In Zahlen' : 'In numbers'}</Big>
        <Numbers>
          {t.facts.map((f, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.08 * i }}
            >
              <dt>
                <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} locale={lang === 'de' ? 'de-DE' : 'en-GB'} />
              </dt>
              <dd>{f.label}</dd>
            </motion.div>
          ))}
        </Numbers>
        <Dash
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        />
      </Light>
    </>
  );
}
