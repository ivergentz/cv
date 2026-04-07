import React, { useState } from 'react';
import styled from 'styled-components';
import { useInView } from '../hooks/useInView';

const Section = styled.section`
  background: #0a0a0b;
  padding: 100px 40px;
  border-top: 0.5px solid ${({ theme }) => theme.gray600}33;

  @media (max-width: 600px) {
    padding: 70px 24px;
  }
`;

const SectionLabel = styled.div`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray400};
  font-weight: 700;
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  gap: 16px;

  &::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: ${({ theme }) => theme.gray600}44;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 0 24px;
  padding: 20px 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.gray600}22;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0f0f10;
    padding-left: 8px;
    padding-right: 8px;
    margin: 0 -8px;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr auto;
    gap: 8px;
  }
`;

const Period = styled.span`
  font-size: 10px;
  font-weight: 300;
  color: ${({ theme }) => theme.gray600};
  padding-top: 3px;
  line-height: 1.5;

  @media (max-width: 700px) {
    display: none;
  }
`;

const JobInfo = styled.div``;

const JobTitle = styled.h4`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.white};
  margin-bottom: 3px;
  line-height: 1.2;
`;

const JobMeta = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.gray600};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 300;
`;

const KPI = styled.span`
  font-family: ${({ theme }) => theme.fontSlab};
  font-size: 26px;
  font-weight: 800;
  color: ${({ theme }) => theme.gray600}55;
  letter-spacing: -0.03em;
  line-height: 1;
  align-self: center;
  transition: color 0.3s;

  ${Row}:hover & {
    color: ${({ theme }) => theme.gray400};
  }
`;

const Detail = styled.div`
  grid-column: 1 / -1;
  overflow: hidden;
  max-height: ${({ $open }) => $open ? '200px' : '0'};
  transition: max-height 0.4s ease;
`;

const DetailInner = styled.div`
  padding: 12px 0 8px 184px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 700px) {
    padding-left: 0;
  }
`;

const Bullet = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.gray400};
  font-weight: 300;
  font-style: italic;
  padding-left: 12px;
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.gray600};
    font-style: normal;
  }
`;

const jobs = [
  {
    period: '01/2025 – Heute',
    title: 'Fachreferent / Kommunikationsmanager',
    company: 'VBG Hamburg',
    kpi: '−20%',
    bullets: [
      'Reduzierung der Warteschlangen-Aufleger um 20%',
      'Auslesequote eingehender Mails +13% durch KI-gestützte Verschlagwortung',
    ],
  },
  {
    period: '05 – 07/2024',
    title: 'Produktmanager (IT)',
    company: 'Sema Systems',
    kpi: null,
    bullets: ['Einvernehmliche Auflösung des Vertrages während der Probezeit.'],
  },
  {
    period: '03/2023 – 03/2024',
    title: 'Produktmanager Global (IT)',
    company: 'Robert Bosch GmbH',
    kpi: '+11,5%',
    bullets: [
      'Steigerung Conversions um 11,5%',
      'Erschließung von fünf neuen globalen Märkten',
    ],
  },
  {
    period: '06/2022 – 01/2023',
    title: 'Product Owner & Projektmanager',
    company: 'Emmora GmbH',
    kpi: '+14%',
    bullets: [
      'Umsatzsteigerung um 10% durch neue Geschäftsfelder',
      'Relaunch Website & Funnel: Conversions +14%',
    ],
  },
  {
    period: '01/2021 – 06/2022',
    title: 'Marketing und IT',
    company: 'Selbstständig',
    kpi: null,
    bullets: ['Beratung, Kampagnenplanung, kleinere Webprojekte.'],
  },
  {
    period: '09/2017 – 06/2020',
    title: 'Marketing & Sales',
    company: 'Salzburg Flughafen GmbH',
    kpi: '+25%',
    bullets: [
      'Markenbekanntheit um 25% gesteigert',
      'Effizientere Mitarbeitergewinnung für das Saisongeschäft',
    ],
  },
];

export default function Experience() {
  const [open, setOpen] = useState(null);
  const ref = useInView();

  return (
    <Section id="erfahrung" ref={ref}>
      <SectionLabel className="fly-up">Berufserfahrung</SectionLabel>
      <List>
        {jobs.map((job, i) => (
          <React.Fragment key={i}>
            <Row
              className={`fly-up delay-${Math.min(i + 1, 6)}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <Period>{job.period}</Period>
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                <JobMeta>
                  {job.company}
                  <span style={{ opacity: 0.3, margin: '0 8px' }}>·</span>
                  <span style={{ opacity: 0.5 }}>{job.period}</span>
                </JobMeta>
              </JobInfo>
              {job.kpi && <KPI>{job.kpi}</KPI>}
            </Row>
            <Detail $open={open === i}>
              <DetailInner>
                {job.bullets.map((b, j) => <Bullet key={j}>{b}</Bullet>)}
              </DetailInner>
            </Detail>
          </React.Fragment>
        ))}
      </List>
    </Section>
  );
}
