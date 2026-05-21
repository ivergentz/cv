import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';

const NavBar = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: saturate(160%) blur(12px);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
  background: ${(props) =>
    props.$scrolled ? 'rgba(255,255,255,0.82)' : 'transparent'};
  border-bottom: 1px solid ${(props) => (props.$scrolled ? 'rgba(10,10,10,0.10)' : 'transparent')};
  transition: background 300ms ease, border-color 300ms ease;
  /* Ensure nav stays a known height so sticky offsets work correctly */
  width: 100%;

  @media print { display: none; }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 16px ${({ theme }) => theme.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const Brand = styled(RouterLink)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.crimson};
  text-transform: uppercase;

  .bracket { opacity: 0.55; color: ${({ theme }) => theme.colors.fg}; }
`;

const NavRight = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 22px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.fgMuted};

  a { transition: color 200ms ease; }
  a:hover { color: ${({ theme }) => theme.colors.crimson}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LangToggle = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.crimson};
  background: transparent;
  border: 1px solid rgba(220,20,60,0.45);
  border-radius: 2px;
  padding: 5px 9px;
  cursor: pointer;
  transition: color 200ms, border-color 200ms, background 200ms;
  letter-spacing: 0.08em;

  &:hover {
    background: ${({ theme }) => theme.colors.crimson};
    color: #FFFFFF;
  }

  span {
    opacity: 0.4;
    transition: opacity 300ms ease;
  }
  span.active { opacity: 1; }
  .sep { opacity: 0.3; margin: 0 4px; }
  &:hover span { opacity: 1; }
`;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavBar $scrolled={scrolled}>
      <Inner>
        <Brand to="/" aria-label="Iver Gentz — Startseite" onClick={handleBrandClick}>
          <span className="bracket">[</span>IG<span className="bracket">]</span>&nbsp;&nbsp;IVER GENTZ
        </Brand>

        <NavRight aria-label="Hauptnavigation">
          {isHome && (
            <NavLinks>
              <li><a href="#arbeit">01 / {t.nav.work}</a></li>
              <li><a href="#stationen">02 / {t.nav.experience}</a></li>
              <li><a href="#prinzipien">03 / {t.nav.principles}</a></li>
              <li><a href="#kontakt">04 / {t.nav.contact}</a></li>
            </NavLinks>
          )}

          <LangToggle
            onClick={toggleLang}
            type="button"
            aria-label={`Sprache wechseln, aktuell ${lang === 'de' ? 'Deutsch' : 'Englisch'}`}
          >
            <span className={lang === 'de' ? 'active' : ''}>DE</span>
            <span className="sep">/</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </LangToggle>
        </NavRight>
      </Inner>
    </NavBar>
  );
}
