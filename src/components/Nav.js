import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Nav — sits on top of multi-coloured page (cream / white / lime).
 *
 * Approach: keep nav itself transparent until scrolled, so it visually
 * inherits the section colour behind it. Once scrolled, add a subtle
 * frosted-glass effect with a soft hairline below.
 */

const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: saturate(160%) blur(10px);
  -webkit-backdrop-filter: saturate(160%) blur(10px);
  background: ${(props) =>
    props.$scrolled
      ? 'rgba(241, 236, 224, 0.82)'
      : 'transparent'};
  border-bottom: 1px solid ${(props) => (props.$scrolled ? 'rgba(10,10,10,0.10)' : 'transparent')};
  transition: background 300ms ease, border-color 300ms ease;

  @media print {
    display: none;
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 18px ${({ theme }) => theme.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const Brand = styled(RouterLink)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.highlightInk};
`;

const NavRight = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 22px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.highlightInk};

  a {
    letter-spacing: 0.01em;
    opacity: 0.7;
    transition: opacity 200ms ease;
  }
  a:hover {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LangToggle = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.highlightInk};
  background: transparent;
  border: 1px solid rgba(10,10,10,0.30);
  border-radius: 2px;
  padding: 6px 10px;
  cursor: pointer;
  transition: color 200ms, border-color 200ms, background 200ms;
  letter-spacing: 0.05em;

  &:hover {
    border-color: ${({ theme }) => theme.colors.highlightInk};
    background: ${({ theme }) => theme.colors.lime};
  }

  span {
    opacity: 0.4;
    transition: opacity 300ms ease;
  }
  span.active {
    opacity: 1;
  }

  .sep {
    opacity: 0.3;
    margin: 0 4px;
  }
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
          Iver Gentz
        </Brand>

        <NavRight aria-label="Hauptnavigation">
          {isHome && (
            <NavLinks>
              <li><a href="#arbeit">{t.nav.work}</a></li>
              <li><a href="#stationen">{t.nav.experience}</a></li>
              <li><a href="#prinzipien">{t.nav.principles}</a></li>
              <li><a href="#kontakt">{t.nav.contact}</a></li>
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
