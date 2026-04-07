import React from 'react';
import styled from 'styled-components';
import { useInView } from '../hooks/useInView';

const Section = styled.section`
  background: ${({ theme }) => theme.black};
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.gray600}22;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.black};
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: background 0.3s;
  cursor: default;

  &:hover {
    background: #161617;
  }
`;

const CardDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color || '#888'};
  margin-bottom: 4px;
`;

const CardName = styled.h3`
  font-family: ${({ theme }) => theme.fontSlab};
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.white};
  letter-spacing: -0.02em;
  line-height: 1;
`;

const CardUrl = styled.a`
  font-size: 10px;
  color: ${({ theme }) => theme.gray400};
  font-weight: 300;
  letter-spacing: 0.04em;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.white};
  }
`;

const CardDesc = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.gray400};
  line-height: 1.6;
  font-weight: 300;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 9px;
  color: ${({ theme }) => theme.gray600};
  border: 0.5px solid ${({ theme }) => theme.gray600}55;
  padding: 3px 9px;
  letter-spacing: 0.04em;
`;

const projects = [
  {
    name: 'RankBrief',
    url: 'https://rankbrief.com',
    color: '#c8a96e',
    desc: 'B2B SaaS für automatisierte monatliche SEO-Reports. Stripe-Monetarisierung, pg_cron-Automation, 8 Edge Functions, vollständig deployed.',
    tags: ['React', 'Supabase', 'Stripe', 'GSC API', 'Edge Functions'],
  },
  {
    name: 'S&I. Wedding',
    url: 'https://sarahiver.com',
    color: '#8fa8c8',
    desc: 'Premium Wedding-Website-Platform. Multi-Tenant-Architektur, 7 Design-Themes, RSVP-System, SuperAdmin-Dashboard.',
    tags: ['React', 'Supabase', 'Cloudinary', 'Brevo', 'Stripe'],
  },
  {
    name: 'Werkruf',
    url: 'https://werkruf.com',
    color: '#7aac8a',
    desc: 'Local SEO SaaS für deutsche KMUs. KI-gestützte Google Business Profile Optimierung für Handwerk, Gastro und Beauty.',
    tags: ['React', 'Claude API', 'Google Places', 'Stripe', 'Supabase'],
  },
];

export default function Projects() {
  const ref = useInView();

  return (
    <Section id="projekte" ref={ref}>
      <SectionLabel className="fly-up">Eigene Produkte</SectionLabel>
      <Grid>
        {projects.map((p, i) => (
          <Card key={p.name} className={`fly-up delay-${i + 1}`}>
            <CardDot color={p.color} />
            <CardName>{p.name}</CardName>
            <CardUrl href={p.url} target="_blank" rel="noopener noreferrer">
              {p.url.replace('https://', '')} ↗
            </CardUrl>
            <CardDesc>{p.desc}</CardDesc>
            <TagRow>
              {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </TagRow>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
