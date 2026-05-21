import React from 'react';
import styled from 'styled-components';
import Reveal from '../Reveal';
import SectionFrame from '../SectionFrame';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Contact — Tri-Color, reduced layout.
 *
 * v1.3.2: Ticker and CTA finale panel removed per request.
 * Only the upper block remains: H2, big mail link, meta grid.
 */

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.crimson};
  margin-bottom: 28px;
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 40px;
  max-width: 18ch;
  color: ${({ theme }) => theme.colors.fg};

  .ital {
    font-style: italic;
    background: ${({ theme }) => theme.colors.crimson};
    color: #FFFFFF;
    padding: 0 0.16em 0.04em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`;

const Mail = styled(AnimatedLink)`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(28px, 3.8vw, 48px);
  letter-spacing: -0.02em;
  margin-bottom: 56px;
  color: ${({ theme }) => theme.colors.fg};
`;

const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Cell = styled.div`
  display: grid;
  gap: 6px;
`;

const MLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.fgDim};
`;

const MValue = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.fg};
`;

export default function Contact() {
  const { t } = useLanguage();

  return (
    <SectionFrame bg="dark" id="kontakt" aria-labelledby="contact-heading">
      <Reveal>
        <Num>{t.sectionNum.contact}</Num>
      </Reveal>
      <Reveal>
        <H2 id="contact-heading">
          {t.contact.h1} <span className="ital">{t.contact.h2}</span> {t.contact.h3}
        </H2>
      </Reveal>
      <Reveal>
        <Mail href="mailto:hallo@ivergentz.de" $always>
          hallo@ivergentz.de
        </Mail>
      </Reveal>
      <Meta>
        <Cell>
          <MLabel>{t.contact.locLabel}</MLabel>
          <MValue>{t.contact.locValue}</MValue>
        </Cell>
        <Cell>
          <MLabel>{t.contact.netLabel}</MLabel>
          <AnimatedLink
            href="https://www.linkedin.com/in/iver-gentz-11b0a2171/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </AnimatedLink>
        </Cell>
        <Cell>
          <MLabel>{t.contact.availLabel}</MLabel>
          <MValue>{t.contact.availValue}</MValue>
        </Cell>
      </Meta>
    </SectionFrame>
  );
}
