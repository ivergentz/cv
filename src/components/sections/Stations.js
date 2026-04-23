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
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;
  margin-bottom: 24px;
`;

const Intro = styled.p`
  max-width: 60ch;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 60px;
`;

const List = styled.ul`
  display: grid;
  gap: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 180px 1fr 1fr;
  gap: 32px;
  padding: 22px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  align-items: baseline;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 20px 0;
  }
`;

const Year = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12.5px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.muted};
`;

const Role = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 22px;
  letter-spacing: -0.01em;
`;

const Company = styled.span`
  font-size: 14.5px;
  color: ${({ theme }) => theme.colors.muted};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: right;
  }
`;

const CVLink = styled(AnimatedLink)`
  display: inline-block;
  margin-top: 40px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.fg};
`;

export default function Stations() {
  const { t } = useLanguage();
  return (
    <Section id="stationen" aria-labelledby="stations-heading">
      <Reveal>
        <Num>{t.sectionNum.stations}</Num>
      </Reveal>
      <Reveal>
        <H2 id="stations-heading">{t.stations.title}</H2>
      </Reveal>
      <Reveal>
        <Intro>{t.stations.intro}</Intro>
      </Reveal>
      <List>
        {t.stations.items.map((item, i) => (
          <Item key={i}>
            <Year>{item.year}</Year>
            <Role>{item.role}</Role>
            <Company>{item.company}</Company>
          </Item>
        ))}
      </List>
      <CVLink
        href={`${process.env.PUBLIC_URL}/documents/cv-iver-gentz.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.stations.cv}
      </CVLink>
    </Section>
  );
}
