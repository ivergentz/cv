import React from 'react';
import styled from 'styled-components';
import SectionFrame from '../SectionFrame';
import Reveal from '../Reveal';
import MaskText from '../MaskText';
import { useLanguage } from '../../i18n/LanguageContext';

/** Profil — one strong sentence, two short paragraphs. */

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
  gap: clamp(24px, 5vw, 80px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Label = styled.p`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  padding-top: 14px;

  .idx {
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: 17px;
    letter-spacing: 0;
    text-transform: none;
    color: ${({ theme }) => theme.colors.accent};
    margin-right: 12px;
  }
`;

const Lead = styled.h2`
  font-size: clamp(32px, 4.2vw, 58px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  max-width: 20ch;
  text-wrap: balance;
  color: var(--ink);
`;

const Cols = styled.div`
  margin-top: clamp(32px, 4vw, 56px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3.5vw, 56px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }

  p {
    font-size: 17px;
    line-height: 1.68;
    color: var(--muted);
    max-width: 50ch;
  }
`;

export default function Positioning() {
  const { t } = useLanguage();
  const p = t.profile;
  return (
    <SectionFrame bg="alt" id="profil" aria-labelledby="profile-heading">
      <Grid>
        <Label>
          <span className="idx" aria-hidden="true">
            (01)
          </span>
          {p.label}
        </Label>
        <div>
          <Lead id="profile-heading">
            <MaskText text={p.lead} />
          </Lead>
          <Cols>
            {p.body.map((para, i) => (
              <Reveal key={i} delay={0.15 + i * 0.12}>
                <p>{para}</p>
              </Reveal>
            ))}
          </Cols>
        </div>
      </Grid>
    </SectionFrame>
  );
}
