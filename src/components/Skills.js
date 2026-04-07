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
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 80px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Group = styled.div``;

const GroupTitle = styled.h4`
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray600};
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 0.5px solid ${({ theme }) => theme.gray600}33;
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.gray600}18;

  &:last-child { border-bottom: none; }
`;

const SkillName = styled.span`
  font-size: 13px;
  font-weight: ${({ $muted }) => $muted ? 300 : 400};
  color: ${({ $muted, theme }) => $muted ? theme.gray600 : theme.white};
`;

const SkillBar = styled.div`
  width: 80px;
  height: 2px;
  background: ${({ theme }) => theme.gray600}22;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: ${({ $muted, theme }) => $muted ? theme.gray600 + '66' : theme.white};
    transition: width 1.2s ease;
  }
`;

const skillGroups = [
  {
    title: 'Management & Leadership',
    skills: [
      { name: 'Projektmanagement', pct: 100 },
      { name: 'Teamlead', pct: 90 },
      { name: 'Agiles PM', pct: 90 },
      { name: 'Produktmanagement (IT)', pct: 80 },
      { name: 'Kommunikation', pct: 100 },
    ],
  },
  {
    title: 'Marketing & Growth',
    skills: [
      { name: 'Marketing-Strategie', pct: 85 },
      { name: 'SEO / Growth', pct: 75 },
      { name: 'Kampagnenplanung', pct: 80 },
      { name: 'Budget-Verantwortung', pct: 70 },
    ],
  },
  {
    title: 'Development',
    muted: true,
    skills: [
      { name: 'React', pct: 75 },
      { name: 'Supabase / PostgreSQL', pct: 70 },
      { name: 'Stripe / Payments', pct: 65 },
      { name: 'HTML / CSS', pct: 80 },
    ],
  },
  {
    title: 'Tools & Stack',
    muted: true,
    skills: [
      { name: 'Vercel / Deployment', pct: 70 },
      { name: 'Cloudinary', pct: 65 },
      { name: 'Brevo / E-Mail', pct: 65 },
      { name: 'Claude API / KI', pct: 60 },
    ],
  },
];

export default function Skills() {
  const ref = useInView();

  return (
    <Section id="skills" ref={ref}>
      <SectionLabel className="fly-up">Skills & Stack</SectionLabel>
      <Grid>
        {skillGroups.map((group, i) => (
          <Group key={group.title} className={`fly-up delay-${i + 1}`}>
            <GroupTitle>{group.title}</GroupTitle>
            <SkillList>
              {group.skills.map((skill) => (
                <SkillItem key={skill.name}>
                  <SkillName $muted={group.muted}>{skill.name}</SkillName>
                  <SkillBar $pct={skill.pct} $muted={group.muted} />
                </SkillItem>
              ))}
            </SkillList>
          </Group>
        ))}
      </Grid>
    </Section>
  );
}
