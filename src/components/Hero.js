import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Section = styled.section`
  background: ${({ theme }) => theme.black};
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: stretch;
  overflow: hidden;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const TextBlock = styled.div`
  padding: 120px 40px 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  @media (max-width: 600px) {
    padding: 100px 24px 60px 24px;
  }
`;

const Eyebrow = styled.span`
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray400};
  font-weight: 300;
  animation: ${fadeUp} 0.8s ease 0.1s both;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fontSans};
  line-height: 0.95;
  animation: ${fadeUp} 0.8s ease 0.25s both;
`;

const NameLight = styled.span`
  display: block;
  font-weight: 100;
  font-size: clamp(52px, 8vw, 80px);
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.white};
`;

const NameBold = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fontSlab};
  font-weight: 800;
  font-size: clamp(64px, 10vw, 100px);
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.white};
`;

const Summary = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.gray400};
  line-height: 1.7;
  font-weight: 300;
  max-width: 480px;
  border-left: 2px solid ${({ theme }) => theme.gray600};
  padding-left: 16px;
  animation: ${fadeUp} 0.8s ease 0.45s both;
`;

const CTARow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.8s ease 0.6s both;
`;

const BtnPrimary = styled.a`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 14px 28px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: inline-block;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.black};
  }
`;

const BtnOutline = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.gray400};
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 14px 24px;
  border: 0.5px solid ${({ theme }) => theme.gray600};
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  font-family: ${({ theme }) => theme.fontSans};

  &:hover {
    color: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.white};
  }
`;

const PhotoWrap = styled.div`
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1.2s ease 0.3s both;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 100%;
    background: linear-gradient(to right, ${({ theme }) => theme.black}, transparent);
    pointer-events: none;
  }

  @media (max-width: 860px) {
    height: 360px;
    &::after {
      width: 100%;
      height: 80px;
      top: auto;
      bottom: 0;
      background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.black});
    }
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  filter: grayscale(20%) contrast(1.05);
`;

const MetaBar = styled.div`
  display: flex;
  gap: 0;
  border-top: 0.5px solid ${({ theme }) => theme.gray600}44;
  padding-top: 20px;
  animation: ${fadeUp} 0.8s ease 0.7s both;
`;

const MetaItem = styled.div`
  padding-right: 28px;
  margin-right: 28px;
  border-right: 0.5px solid ${({ theme }) => theme.gray600}44;

  &:last-child {
    border-right: none;
    margin-right: 0;
    padding-right: 0;
  }
`;

const MetaLabel = styled.span`
  display: block;
  font-size: 7.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray600};
  font-weight: 300;
  margin-bottom: 3px;
`;

const MetaValue = styled.span`
  display: block;
  font-size: 11px;
  color: ${({ theme }) => theme.gray400};
  font-weight: 300;
`;

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section>
      <TextBlock>
        <Eyebrow>Lebenslauf — Projekt · Produkt · Marketing</Eyebrow>
        <Name>
          <NameLight>Iver</NameLight>
          <NameBold>Gentz</NameBold>
        </Name>
        <Summary>
          10 Jahre Erfahrung in Produktentwicklung, Projektmanagement und Growth —
          vom globalen Bosch-Portfolio bis zum eigenen SaaS.
        </Summary>
        <MetaBar>
          <MetaItem>
            <MetaLabel>Standort</MetaLabel>
            <MetaValue>Hamburg</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Verfügbar</MetaLabel>
            <MetaValue>Hybrid</MetaValue>
          </MetaItem>
          <MetaItem>
            <MetaLabel>Erfahrung</MetaLabel>
            <MetaValue>10 Jahre</MetaValue>
          </MetaItem>
        </MetaBar>
        <CTARow>
          <BtnPrimary href="/cv_gentz.pdf" download="CV_Iver_Gentz.pdf">
            CV herunterladen
          </BtnPrimary>
          <BtnOutline onClick={scrollToContact}>
            Kontakt aufnehmen
          </BtnOutline>
        </CTARow>
      </TextBlock>

      <PhotoWrap>
        <Photo src="/portrait.jpg" alt="Iver Gentz" />
      </PhotoWrap>
    </Section>
  );
}
