import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Footer — on the home page a black sign-off: the name set huge, the old
 * name behind it as a ghost outline. Elsewhere a
 * compact bar.
 */

const Band = styled.footer`
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.inkMuteOnInk};

  @media print {
    display: none;
  }
`;

const Sign = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: clamp(64px, 9vw, 128px) ${({ theme }) => theme.gutter} clamp(24px, 3vw, 40px);
  text-align: center;
  overflow: hidden;
`;

const Ghost = styled.div`
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(120px, 26vw, 400px);
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1px rgba(250, 250, 248, 0.16);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
`;

const Name = styled.p`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(56px, 11vw, 168px);
  line-height: 0.88;
  color: ${({ theme }) => theme.colors.paper};

  span {
    display: block;
  }
  .b {
    color: ${({ theme }) => theme.colors.accentOnInk};
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 22px ${({ theme }) => theme.gutter} 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 32px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  line-height: 1.55;
  border-top: 1px solid ${({ theme }) => theme.colors.lineOnInk};

  .left {
    display: grid;
    gap: 2px;
  }
  nav {
    display: flex;
    gap: 24px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-weight: 600;
    font-size: 11.5px;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.paper};
  }
`;

export default function Footer() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const home = pathname === '/';
  return (
    <Band>
      {home && (
        <Sign aria-hidden="true">
          <Ghost>
            Gentz
          </Ghost>
          <Name>
            <span>Iver</span>
            <span className="b">Bohnes</span>
          </Name>
        </Sign>
      )}
      <Inner>
        <div className="left">
          <span>
            © {new Date().getFullYear()} Iver Bohnes · {t.footer.note}
          </span>
          <span>{t.footer.domain}</span>
        </div>
        <nav aria-label="Rechtliches">
          <RouterLink to="/impressum">{t.footer.imprint}</RouterLink>
          <RouterLink to="/datenschutz">{t.footer.privacy}</RouterLink>
        </nav>
      </Inner>
    </Band>
  );
}
