import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { cvContent } from '../i18n/cv';
import { AnimatedLink } from '../components/Link';

const Page = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px ${({ theme }) => theme.gutter} 80px;

  @media print {
    padding: 0;
    max-width: 100%;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  flex-wrap: wrap;
  gap: 12px;

  @media print {
    display: none;
  }
`;

const ToolbarLeft = styled(AnimatedLink)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.muted};
`;

const ToolbarRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Button = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.fg};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 2px;
  padding: 8px 14px;
  cursor: pointer;
  transition: border-color 200ms, background 200ms;

  &:hover {
    border-color: ${({ theme }) => theme.colors.fg};
  }
`;

const DownloadLink = styled(AnimatedLink)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.fg};
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 2px;
  padding: 8px 14px;
  transition: border-color 200ms;

  &::after { display: none; }
  &:hover {
    border-color: ${({ theme }) => theme.colors.fg};
  }
`;

/* ---------- DOCUMENT AREA ---------- */

const Doc = styled.article`
  /* Screen: editorial block. Print: fills A4 naturally. */
  background: ${({ theme }) => theme.colors.bg};

  @media print {
    background: #FAFAF8 !important;
    color: #141414 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 32px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  margin-bottom: 28px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderLeft = styled.div``;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(44px, 6vw, 64px);
  line-height: 1;
  letter-spacing: -0.025em;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Role = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(18px, 2.4vw, 24px);
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: -0.005em;
  margin-bottom: 20px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  .sep { color: ${({ theme }) => theme.colors.accent}; }
`;

const Photo = styled.div`
  width: 120px;
  height: 150px;
  background: ${({ theme }) => theme.colors.shotBg};
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  overflow: hidden;
  justify-self: end;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    filter: grayscale(100%);
  }

  @media (max-width: 620px) {
    justify-self: start;
    width: 110px;
    height: 140px;
  }
`;

const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(16px, 1.9vw, 20px);
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.fg};
  max-width: 62ch;
  margin-bottom: 36px;
`;

/* ---------- SECTIONS ---------- */

const Section = styled.section`
  margin-bottom: 28px;
  page-break-inside: avoid;
`;

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 14px;
  padding-bottom: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  margin-bottom: 16px;
  page-break-inside: avoid;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const Period = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.muted};
  padding-top: 4px;
  line-height: 1.4;

  .status {
    display: block;
    color: ${({ theme }) => theme.colors.shotLabel};
    margin-top: 2px;
  }
`;

const Body = styled.div``;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.015em;
  margin-bottom: 2px;
`;

const Company = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 8px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Bullet = styled.li`
  position: relative;
  padding-left: 14px;
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 1.5;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Stack = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.shotLabel};
  margin-top: 6px;
`;

const ProductName = styled(Title)`
  font-size: 22px;
`;

const ProductUrl = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 8px;
`;

const EduTitle = styled(Title)`
  font-size: 16px;
`;

const EduSchool = styled(Company)`
  font-size: 12px;
  margin-bottom: 0;
`;

/* Print page break before Experience – forces 2-page layout */
const PageBreak = styled.div`
  @media print {
    page-break-before: always;
  }
`;

/* Skills Grid */
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 18px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const SkillCol = styled.div`
  .label {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 4px;
  }
  .items {
    font-size: 12.5px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.fg};
  }
`;

const LangGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }

  div strong {
    font-weight: 500;
    margin-right: 8px;
  }
  div span {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
  }
`;

/* ---------- PRINT GLOBAL ---------- */

const PrintStyles = styled.div`
  @media print {
    @page {
      size: A4;
      margin: 14mm 16mm;
    }
  }
`;

export default function CV() {
  const { lang } = useLanguage();
  const cv = cvContent[lang];

  useEffect(() => {
    document.title =
      lang === 'de' ? 'Lebenslauf — Iver Gentz' : 'CV — Iver Gentz';
  }, [lang]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Page>
      <Toolbar>
        <ToolbarLeft as={RouterLink} to="/#stationen">
          ← {cv.labels.back}
        </ToolbarLeft>
        <ToolbarRight>
          <Button type="button" onClick={handlePrint}>
            {cv.labels.print}
          </Button>
          <DownloadLink
            href={`${process.env.PUBLIC_URL}/documents/cv-iver-gentz.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cv.labels.download} ↓
          </DownloadLink>
        </ToolbarRight>
      </Toolbar>

      <PrintStyles />
      <Doc>
        <Header>
          <HeaderLeft>
            <Name>Iver Gentz</Name>
            <Role>{cv.role}</Role>
            <Meta>
              <span>Hamburg, Deutschland</span>
              <span className="sep">·</span>
              <span>ivergentz@gmail.com</span>
              <span className="sep">·</span>
              <span>+49 176 66631237</span>
              <span className="sep">·</span>
              <span>ivergentz.de</span>
            </Meta>
          </HeaderLeft>
          <Photo>
            <img src={`${process.env.PUBLIC_URL}/images/portrait.png`} alt="Iver Gentz" />
          </Photo>
        </Header>

        <Tagline>{cv.tagline}</Tagline>

        {/* ========== EIGENE PRODUKTE ========== */}
        <Section>
          <SectionLabel>{cv.labels.products}</SectionLabel>
          {cv.products.map((p, i) => (
            <Row key={i}>
              <Period>
                {p.period}
                <span className="status">{p.status}</span>
              </Period>
              <Body>
                <ProductName>{p.name}</ProductName>
                <ProductUrl>{p.url}</ProductUrl>
                <BulletList>
                  {p.bullets.map((b, j) => (
                    <Bullet key={j}>{b}</Bullet>
                  ))}
                </BulletList>
                <Stack>{p.stack}</Stack>
              </Body>
            </Row>
          ))}
        </Section>

        {/* Force page break before experience for print */}
        <PageBreak />

        {/* ========== BERUFSERFAHRUNG ========== */}
        <Section>
          <SectionLabel>{cv.labels.experience}</SectionLabel>
          {cv.experience.map((e, i) => (
            <Row key={i}>
              <Period>{e.period}</Period>
              <Body>
                <Title>{e.title}</Title>
                <Company>{e.company}</Company>
                <BulletList>
                  {e.bullets.map((b, j) => (
                    <Bullet key={j}>{b}</Bullet>
                  ))}
                </BulletList>
              </Body>
            </Row>
          ))}
        </Section>

        {/* ========== AUSBILDUNG ========== */}
        <Section>
          <SectionLabel>{cv.labels.education}</SectionLabel>
          {cv.education.map((e, i) => (
            <Row key={i}>
              <Period>{e.period}</Period>
              <Body>
                <EduTitle>{e.title}</EduTitle>
                <EduSchool>{e.school}</EduSchool>
              </Body>
            </Row>
          ))}
        </Section>

        {/* ========== FÄHIGKEITEN ========== */}
        <Section>
          <SectionLabel>{cv.labels.skills}</SectionLabel>
          <SkillsGrid>
            {cv.skills.map((s, i) => (
              <SkillCol key={i}>
                <div className="label">{s.label}</div>
                <div className="items">{s.items}</div>
              </SkillCol>
            ))}
          </SkillsGrid>
        </Section>

        {/* ========== SPRACHEN ========== */}
        <Section>
          <SectionLabel>{cv.labels.languages}</SectionLabel>
          <LangGrid>
            {cv.languages.map((l, i) => (
              <div key={i}>
                <strong>{l.name}</strong>
                <span>— {l.level}</span>
              </div>
            ))}
          </LangGrid>
        </Section>
      </Doc>
    </Page>
  );
}
