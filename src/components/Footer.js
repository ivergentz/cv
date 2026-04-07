import React from 'react';
import styled from 'styled-components';

const FooterEl = styled.footer`
  background: ${({ theme }) => theme.black};
  border-top: 0.5px solid ${({ theme }) => theme.gray600}22;
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    padding: 28px 24px;
    text-align: center;
  }
`;

const Name = styled.span`
  font-family: ${({ theme }) => theme.fontSlab};
  font-size: 13px;
  color: ${({ theme }) => theme.gray600};
  letter-spacing: -0.01em;
`;

const Links = styled.div`
  display: flex;
  gap: 24px;
`;

const FootLink = styled.a`
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray600};
  transition: color 0.2s;

  &:hover { color: ${({ theme }) => theme.white}; }
`;

export default function Footer() {
  return (
    <FooterEl>
      <Name>Iver Gentz — Hamburg</Name>
      <Links>
        <FootLink href="https://github.com/sarahiver" target="_blank" rel="noopener noreferrer">GitHub</FootLink>
        <FootLink href="https://rankbrief.com" target="_blank" rel="noopener noreferrer">RankBrief</FootLink>
        <FootLink href="https://sarahiver.com" target="_blank" rel="noopener noreferrer">S&I. Wedding</FootLink>
        <FootLink href="mailto:ivergentz@gmail.com">E-Mail</FootLink>
      </Links>
    </FooterEl>
  );
}
