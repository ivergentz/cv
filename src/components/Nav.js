import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: ${({ $scrolled, theme }) => ($scrolled ? 'rgba(244,241,234,0.86)' : theme.colors.paper)};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(140%) blur(14px)' : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(140%) blur(14px)' : 'none')};
  transition: background 300ms ease;

  @media print {
    display: none;
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  height: 64px;
  padding: 0 ${({ theme }) => theme.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const Brand = styled(RouterLink)`
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 21px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;

  .role {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 13px;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.colors.inkMute};
    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: none;
    }
  }
`;

const Right = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.4vw, 32px);
`;

const Links = styled.ul`
  display: flex;
  gap: clamp(16px, 2.2vw, 28px);
  font-size: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.inkSoft};
  transition: color 200ms ease;
  padding: 6px 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 380ms ${({ theme }) => theme.ease};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left center;
  }
`;

const CvLink = styled(RouterLink)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.paper};
  background: ${({ theme }) => theme.colors.ink};
  padding: 8px 14px;
  border-radius: 999px;
  transition: background 220ms ease;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Lang = styled.button`
  display: inline-flex;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  background: none;
  border: 0;
  padding: 6px 2px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.inkMute};

  span {
    transition: color 200ms ease;
  }
  span.on {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:hover span {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Progress = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.ink};
  transform-origin: left center;
`;

const Base = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.line};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 300ms ease;
`;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onBrand = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const href = (hash) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
    <Bar $scrolled={scrolled}>
      <Inner>
        <Brand to="/" onClick={onBrand} aria-label="Iver Bohnes — Start">
          Iver Bohnes <span className="role">AI Product Manager</span>
        </Brand>
        <Right aria-label={lang === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
          <Links>
            <li>
              <NavLink href={href('projekt')}>{t.nav.work}</NavLink>
            </li>
            <li>
              <NavLink href={href('produkte')}>{t.nav.products}</NavLink>
            </li>
            <li>
              <NavLink href={href('stationen')}>{t.nav.experience}</NavLink>
            </li>
            <li>
              <NavLink href={href('kontakt')}>{t.nav.contact}</NavLink>
            </li>
          </Links>
          <Lang type="button" onClick={toggleLang} aria-label={t.nav.lang}>
            <span className={lang === 'de' ? 'on' : ''}>DE</span>
            <span aria-hidden="true">/</span>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </Lang>
          {pathname !== '/cv' && <CvLink to="/cv">{t.nav.cv}</CvLink>}
        </Right>
      </Inner>
      <Base $show={scrolled} />
      {isHome && !reduce && <Progress style={{ scaleX: progress }} aria-hidden="true" />}
    </Bar>
  );
}
