import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedLink } from './Link';

const Wrap = styled.footer`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 40px ${({ theme }) => theme.gutter} 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
`;

export default function Footer() {
  const { t } = useLanguage();
  return (
    <Wrap>
      <span>© 2026 Iver Gentz</span>
      <Links>
        <AnimatedLink as={RouterLink} to="/impressum">
          {t.footer.imprint}
        </AnimatedLink>
        <AnimatedLink as={RouterLink} to="/datenschutz">
          {t.footer.privacy}
        </AnimatedLink>
      </Links>
    </Wrap>
  );
}
