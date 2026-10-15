import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Products — an index of condensed caps names.
 * Desktop (fine pointer): hovering a row shows the product (desktop + phone
 * screenshot) following the cursor on a soft spring.
 * Touch / small screens: the same composite sits inside the row.
 */

const ease = [0.22, 1, 0.36, 1];
const src = (shot, kind) => `${process.env.PUBLIC_URL}/images/products/${shot}-${kind}.jpg`;

const List = styled.ol`
  margin-top: clamp(48px, 6vw, 88px);
  border-top: 3px solid ${({ theme }) => theme.colors.ink};
`;

const Row = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

const RowLink = styled.a`
  display: grid;
  grid-template-columns: 64px minmax(0, 6fr) minmax(0, 5fr) 110px;
  gap: 24px;
  align-items: baseline;
  padding: clamp(22px, 3vw, 34px) 0;
  transition: padding 500ms ${({ theme }) => theme.ease}, background 400ms ease;

  @media (hover: hover) and (min-width: 901px) {
    &:hover {
      padding-left: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Num = styled.span`
  font-family: ${({ theme }) => theme.fonts.italic};
  font-style: italic;
  font-size: 30px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NameCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Name = styled.h3`
  font-size: clamp(44px, 5.6vw, 96px);
  line-height: 0.9;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  transition: color 300ms ease;

  ${RowLink}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
  .amp {
    font-family: ${({ theme }) => theme.fonts.italic};
    font-style: italic;
    font-weight: 400;
    text-transform: none;
    font-size: 0.8em;
    color: ${({ theme }) => theme.colors.accent};
    margin: 0 0.04em;
  }
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};

  i {
    width: 9px;
    height: 9px;
    background: ${({ $live, theme }) => ($live ? theme.colors.accent : 'transparent')};
    border: 1.5px solid ${({ theme }) => theme.colors.accent};
  }
`;

const Text = styled.div`
  p.one {
    font-size: 21px;
    line-height: 1.38;
    color: ${({ theme }) => theme.colors.ink};
    max-width: 34ch;
  }
  p.detail {
    margin-top: 10px;
    font-size: 17px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 46ch;
    hyphens: auto;
  }
  p.stack {
    margin-top: 14px;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkMute};
  }
`;

const Go = styled.span`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;

  .domain {
    display: none;
  }
  svg {
    transition: transform 400ms ${({ theme }) => theme.ease};
  }
  ${RowLink}:hover & svg {
    transform: translate(3px, -3px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-self: start;
    margin-top: 6px;
    .label {
      display: none;
    }
    .domain {
      display: inline;
    }
  }
`;

/* Composite: desktop screenshot with the phone screenshot overlapping */
const Composite = styled.div`
  position: relative;
  padding: 0 7% 9% 0;

  .desk {
    position: relative;
    aspect-ratio: 2 / 1;
    overflow: hidden;
    border: 1.5px solid ${({ theme }) => theme.colors.ink};
    background: #fff;
    box-shadow: 10px 10px 0 ${({ theme }) => theme.colors.accent};
  }
  .desk img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .phone {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 23%;
    aspect-ratio: 9 / 19;
    overflow: hidden;
    border: 3px solid ${({ theme }) => theme.colors.ink};
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.45);
  }
  .phone img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`;

const InlineShot = styled.div`
  display: none;
  margin: 8px 0 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}), (hover: none) {
    display: block;
  }
`;

const Floating = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  width: clamp(380px, 34vw, 540px);
  pointer-events: none;

  @media (hover: none), (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const More = styled.div`
  margin-top: clamp(40px, 5vw, 64px);
  display: grid;
  gap: 14px;

  .label {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px clamp(24px, 4vw, 64px);
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: 1fr;
    }
  }
  li {
    font-size: 17px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 52ch;
  }
  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.ink};
    margin-right: 8px;
  }
  a {
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 11L11 2M11 2H4M11 2v7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function displayName(name) {
  if (name.includes('&')) {
    const [a, b] = name.split('&');
    return (
      <>
        {a}
        <span className="amp">&amp;</span>
        {b}
      </>
    );
  }
  return name;
}

function Shot({ shot }) {
  return (
    <Composite>
      <div className="desk">
        <img src={src(shot, 'desktop')} alt="" loading="lazy" />
      </div>
      <div className="phone">
        <img src={src(shot, 'mobile')} alt="" loading="lazy" />
      </div>
    </Composite>
  );
}

export default function Products() {
  const { t } = useLanguage();
  const p = t.products;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const onMove = (e) => {
    const w = Math.min(540, Math.max(380, window.innerWidth * 0.34));
    const h = w * 0.62;
    const nx = e.clientX + 36 + w > window.innerWidth - 16 ? e.clientX - w - 36 : e.clientX + 36;
    const ny = Math.min(Math.max(e.clientY - h / 2, 80), window.innerHeight - h - 24);
    x.set(nx);
    y.set(ny);
  };

  const activeItem = p.items.find((i) => i.key === active);

  return (
    <SectionFrame id="produkte" aria-labelledby="products-heading">
      <SectionHead index="03" label={p.label} title={p.title} intro={p.intro} id="products-heading" />

      <List onMouseMove={reduce ? undefined : onMove} onMouseLeave={() => setActive(null)}>
        {p.items.map((item, i) => (
          <Reveal as="li" key={item.key} delay={i * 0.08}>
            <Row>
              <RowLink
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(item.key)}
                onFocus={() => setActive(null)}
              >
                <Num>{String(i + 1).padStart(2, '0')}</Num>
                <NameCol>
                  <Name>{displayName(item.name)}</Name>
                  <Status $live={item.status === 'live'}>
                    <i aria-hidden="true" />
                    {p.status[item.status]}
                  </Status>
                </NameCol>
                <Text>
                  <InlineShot>
                    <Shot shot={item.shot} />
                  </InlineShot>
                  <p className="one">{item.one}</p>
                  <p className="detail">{item.detail}</p>
                  <p className="stack">{item.stack}</p>
                </Text>
                <Go>
                  <span className="label">{p.visit}</span>
                  <span className="domain">{item.domain}</span>
                  <ArrowUpRight />
                </Go>
              </RowLink>
            </Row>
          </Reveal>
        ))}
      </List>

      {!reduce && (
        <AnimatePresence>
          {activeItem && (
            <Floating
              key="float"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease }}
              aria-hidden="true"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeItem.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Shot shot={activeItem.shot} />
                </motion.div>
              </AnimatePresence>
            </Floating>
          )}
        </AnimatePresence>
      )}

      <Reveal>
        <More>
          <span className="label">{p.more.label}</span>
          <ul>
            {p.more.items.map((m) => (
              <li key={m.name}>
                <strong>
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noopener noreferrer">
                      {m.name}
                    </a>
                  ) : (
                    m.name
                  )}
                </strong>
                {m.text}
              </li>
            ))}
          </ul>
        </More>
      </Reveal>
    </SectionFrame>
  );
}
