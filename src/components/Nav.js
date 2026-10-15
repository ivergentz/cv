import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};

  @media print {
    display: none;
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  height: 60px;
  padding: 0 ${({ theme }) => theme.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const BrandWrap = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 12px;
  white-space: nowrap;
`;

const Brand = styled(RouterLink)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  .b {
    color: ${({ theme }) => theme.colors.accentOnInk};
  }
`;

const Former = styled.button`
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.italic};
  font-style: italic;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.inkMuteOnInk};
  border-bottom: 1px dotted rgba(250, 250, 248, 0.35);
  transition: color 200ms ease, border-color 200ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.paper};
    border-color: ${({ theme }) => theme.colors.paper};
  }
  &:disabled {
    cursor: default;
    border-bottom: 0;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Right = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 28px);
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const Links = styled.ul`
  display: flex;
  gap: clamp(14px, 2vw, 26px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 6px 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accentOnInk};
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 420ms ${({ theme }) => theme.ease};
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left center;
  }
`;

const Lang = styled.button`
  display: inline-flex;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  background: none;
  border: 0;
  padding: 6px 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.inkMuteOnInk};

  .on {
    color: ${({ theme }) => theme.colors.paper};
  }
`;

const CvLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  background: ${({ theme }) => theme.colors.accent};
  transition: background 220ms ease, color 220ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Progress = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.accentOnInk};
  transform-origin: left center;
`;

export default function Nav() {
  const { lang, toggleLang, t } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const onBrand = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const href = (hash) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
    <Bar>
      <Inner>
        <BrandWrap>
          <Brand to="/" onClick={onBrand} aria-label="Iver Bohnes — Start">
            Iver <span className="b">Bohnes</span>
          </Brand>
          <Former
            type="button"
            disabled={!isHome}
            onClick={() => window.dispatchEvent(new Event('replay-name-intro'))}
            aria-label={t.intro.replay}
            title={isHome ? t.intro.replay : undefined}
          >
            {lang === 'de' ? 'geb. Gentz' : 'formerly Gentz'}
          </Former>
        </BrandWrap>
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
      {isHome && !reduce && <Progress style={{ scaleX: progress }} aria-hidden="true" />}
    </Bar>
  );
}
