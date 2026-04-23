import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';

const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 82%, transparent);
  border-bottom: 1px solid ${(props) => (props.$scrolled ? props.theme.colors.hairline : 'transparent')};
  transition:
    border-color 300ms ease,
    background 300ms ease;

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
  color: ${({ theme }) => theme.colors.muted};

  a {
    letter-spacing: 0.01em;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.fg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LangToggle = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 2px;
  padding: 6px 10px;
  cursor: pointer;
  transition:
    color 200ms,
    border-color 200ms;
  letter-spacing: 0.05em;

  &:hover {
    color: ${({ theme }) => theme.colors.fg};
    border-color: ${({ theme }) => theme.colors.fg};
  }

  span {
    opacity: 0.4;
    transition: opacity 300ms ease;
  }
  span.active {
    opacity: 1;
    color: ${({ theme }) => theme.colors.fg};
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

  return (
    <NavBar $scrolled={scrolled}>
      <Inner>
        <Brand to="/" aria-label="Iver Gentz — Startseite">
          Iver Gentz
        </Brand>

        <NavRight aria-label="Hauptnavigation">
          {isHome && (
            <NavLinks>
              <li>
                <a href="#arbeit">{t.nav.work}</a>
              </li>
              <li>
                <a href="#stationen">{t.nav.experience}</a>
              </li>
              <li>
                <a href="#prinzipien">{t.nav.principles}</a>
              </li>
              <li>
                <a href="#kontakt">{t.nav.contact}</a>
              </li>
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
