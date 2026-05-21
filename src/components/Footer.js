import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedLink } from './Link';

const Band = styled.footer`
  background: ${({ theme }) => theme.colors.bgLime};
  color: ${({ theme }) => theme.colors.highlightInk};

  @media print {
    display: none;
  }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 40px ${({ theme }) => theme.gutter} 60px;
  border-top: 1px solid rgba(10, 10, 10, 0.16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Footer() {
  const { t } = useLanguage();
  return (
    <Band>
      <Inner>
        <span>© 2026 Iver Gentz</span>
        <Links>
          <AnimatedLink as={RouterLink} to="/impressum">
            {t.footer.imprint}
          </AnimatedLink>
          <AnimatedLink as={RouterLink} to="/datenschutz">
            {t.footer.privacy}
          </AnimatedLink>
        </Links>
      </Inner>
    </Band>
  );
}
