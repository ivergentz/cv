import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Products — an index list instead of a carousel.
 * Desktop (fine pointer): hovering a row shows a screenshot that follows the
 * cursor with a soft spring. Touch / small screens: screenshot sits in the row.
 */

const ease = [0.22, 1, 0.36, 1];

const List = styled.ol`
  margin-top: clamp(48px, 6vw, 88px);
  border-top: 1px solid ${({ theme }) => theme.colors.ink};
  position: relative;
`;

const Row = styled.li`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

const RowLink = styled.a`
  display: grid;
  grid-template-columns: 56px minmax(0, 4fr) minmax(0, 5fr) 120px;
  gap: 24px;
  align-items: baseline;
  padding: clamp(24px, 3vw, 36px) 0;
  color: inherit;
  transition: padding 500ms ${({ theme }) => theme.ease};

  @media (hover: hover) and (min-width: 861px) {
    &:hover {
      padding-left: 16px;
      padding-right: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Num = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.inkMute};

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
  font-size: clamp(34px, 4.2vw, 60px);
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.ink};
  transition: color 300ms ease;

  ${RowLink}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
  .amp {
    font-style: italic;
  }
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.inkSoft};

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $live, theme }) => ($live ? '#2F7D4F' : 'transparent')};
    border: 1.5px solid ${({ $live, theme }) => ($live ? '#2F7D4F' : theme.colors.accent)};
  }
`;

const Text = styled.div`
  p.one {
    font-size: 17px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.ink};
    max-width: 46ch;
  }
  p.detail {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 52ch;
  }
  p.stack {
    margin-top: 14px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.inkMute};
  }
`;

const Go = styled.span`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
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

const InlineShot = styled.div`
  display: none;
  margin: 6px 0 18px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.paperAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}), (hover: none) {
    display: block;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(28px, 3vw, 40px);
  letter-spacing: -0.02em;
  text-align: center;

  small {
    display: block;
    margin-top: 8px;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 13px;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.inkMuteOnInk};
  }
`;

const Floating = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  width: clamp(320px, 30vw, 440px);
  aspect-ratio: 16 / 10;
  pointer-events: none;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(26, 24, 20, 0.35), 0 0 0 1px rgba(26, 24, 20, 0.08);
  background: ${({ theme }) => theme.colors.paperAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  @media (hover: none), (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const More = styled.div`
  margin-top: clamp(40px, 5vw, 64px);
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  .label {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkMute};
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
    font-size: 15px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.inkSoft};
    max-width: 52ch;
  }
  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ink};
    margin-right: 6px;
  }
  a {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lineStrong};
    transition: border-color 200ms ease;
  }
  a:hover {
    border-color: ${({ theme }) => theme.colors.ink};
  }
`;

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M2 11L11 2M11 2H4M11 2v7" stroke="currentColor" strokeWidth="1.4" />
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

export default function Products() {
  const { t } = useLanguage();
  const p = t.products;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });
  const listRef = useRef(null);

  const onMove = (e) => {
    const w = Math.min(440, Math.max(320, window.innerWidth * 0.3));
    const h = w * 0.625;
    const nx = e.clientX + 32 + w > window.innerWidth - 16 ? e.clientX - w - 32 : e.clientX + 32;
    const ny = Math.min(Math.max(e.clientY - h / 2, 80), window.innerHeight - h - 16);
    x.set(nx);
    y.set(ny);
  };

  const activeItem = p.items.find((i) => i.key === active);

  return (
    <SectionFrame id="produkte" aria-labelledby="products-heading">
      <SectionHead index="03" label={p.label} title={p.title} intro={p.intro} id="products-heading" />

      <List ref={listRef} onMouseMove={reduce ? undefined : onMove} onMouseLeave={() => setActive(null)}>
        {p.items.map((item, i) => (
          <Reveal as="li" key={item.key} delay={i * 0.08} style={{ listStyle: 'none' }}>
            <Row as="div">
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
                    {item.img ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${item.img}`}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <Placeholder>
                        <div>
                          {item.name}
                          <small>{p.placeholder}</small>
                        </div>
                      </Placeholder>
                    )}
                  </InlineShot>
                  <p className="one" style={{ marginTop: 0 }}>
                    {item.one}
                  </p>
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
                  style={{ position: 'absolute', inset: 0 }}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {activeItem.img ? (
                    <img src={`${process.env.PUBLIC_URL}/images/${activeItem.img}`} alt="" />
                  ) : (
                    <Placeholder>
                      <div>
                        {activeItem.name}
                        <small>{p.placeholder}</small>
                      </div>
                    </Placeholder>
                  )}
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
