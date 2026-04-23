import React from 'react';
import styled from 'styled-components';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

const Section = styled.section`
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter};
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(32px, 3.6vw, 48px);
  letter-spacing: -0.025em;
  margin-bottom: 40px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 40px;
  align-items: baseline;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const ClientName = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 24px;
  letter-spacing: -0.01em;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 15px;
  line-height: 1.6;
`;

const URL = styled(AnimatedLink)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
`;

export default function Clients() {
  const { t } = useLanguage();
  return (
    <Section aria-labelledby="clients-heading">
      <Reveal>
        <Num>{t.sectionNum.clients}</Num>
      </Reveal>
      <Reveal>
        <H2 id="clients-heading">{t.clients.title}</H2>
      </Reveal>
      <Row>
        <ClientName>Lais Ottensen</ClientName>
        <Desc>{t.clients.lais}</Desc>
        <URL href="https://lais-ottensen.de" target="_blank" rel="noopener noreferrer">
          lais-ottensen.de ↗
        </URL>
      </Row>
    </Section>
  );
}
