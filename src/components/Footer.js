import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';

const Band = styled.footer`
  background: ${({ $ink, $alt, theme }) =>
    $ink ? theme.colors.ink : $alt ? theme.colors.paperAlt : theme.colors.paper};
  color: ${({ $ink, theme }) => ($ink ? theme.colors.inkMuteOnInk : theme.colors.inkMute)};
  border-top: 1px solid ${({ $ink, theme }) => ($ink ? theme.colors.lineOnInk : theme.colors.line)};

  @media print {
    display: none;
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 28px ${({ theme }) => theme.gutter} 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 32px;
  font-size: 13px;
  line-height: 1.5;

  .left {
    display: grid;
    gap: 2px;
  }
  nav {
    display: flex;
    gap: 24px;
  }
  a {
    color: inherit;
    transition: color 200ms ease;
  }
  a:hover {
    color: ${({ $ink, theme }) => ($ink ? theme.colors.paper : theme.colors.ink)};
  }
`;

export default function Footer() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const ink = pathname === '/';
  return (
    <Band $ink={ink} $alt={pathname === '/cv'}>
      <Inner $ink={ink}>
        <div className="left">
          <span>© {new Date().getFullYear()} Iver Bohnes · {t.footer.note}</span>
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
