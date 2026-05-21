import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedLink } from './Link';

const Band = styled.footer`
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  color: ${({ theme }) => theme.colors.fgMuted};

  @media print { display: none; }
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 28px ${({ theme }) => theme.gutter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
        <span>© 2026 IVER GENTZ · BUILT IN HAMBURG</span>
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
