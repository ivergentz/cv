import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { cvContent } from '../i18n/cv';
import { AnimatedLink } from '../components/Link';

/* @react-pdf/renderer is imported dynamically to keep initial bundle small.
   See handleDownload below. */

const Page = styled.main`
  background: ${({ theme }) => theme.colors.bgCream};
  min-height: 100vh;
`;

const Wrap = styled.div`
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
  border-bottom: 1px solid rgba(10,10,10,0.10);
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

const ToolbarButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
  background: transparent;
  color: ${({ theme }) => theme.colors.fg};
  border: 1px solid rgba(10,10,10,0.20);
  border-radius: 2px;
  padding: 8px 14px;
  cursor: pointer;
  transition: border-color 200ms, background 200ms, color 200ms;

  &:hover {
    border-color: ${({ theme }) => theme.colors.highlightInk};
    background: ${({ theme }) => theme.colors.lime};
  }

  &:disabled {
    opacity: 0.5;
    cursor: progress;
  }
`;

const DownloadButton = styled(ToolbarButton)`
  background: ${({ theme }) => theme.colors.highlightInk};
  color: ${({ theme }) => theme.colors.lime};
  border-color: ${({ theme }) => theme.colors.highlightInk};

  &:hover {
    background: ${({ theme }) => theme.colors.lime};
    color: ${({ theme }) => theme.colors.highlightInk};
  }
`;

/* ---------- DOC ---------- */

const Doc = styled.article`
  background: ${({ theme }) => theme.colors.bgCream};

  @media print {
    background: #F1ECE0 !important;
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
  border-bottom: 1px solid rgba(10,10,10,0.10);
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
  letter-spacing: -0.005em;
  margin-bottom: 20px;

  span.hl {
    background: ${({ theme }) => theme.colors.lime};
    color: ${({ theme }) => theme.colors.highlightInk};
    padding: 0 0.18em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
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

  .sep { color: ${({ theme }) => theme.colors.highlightInk}; }
`;

const Photo = styled.div`
  width: 120px;
  height: 150px;
  background: ${({ theme }) => theme.colors.shotBg};
  border: 1px solid rgba(10,10,10,0.16);
  overflow: hidden;
  justify-self: end;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
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
  max-width: 62ch;
  margin-bottom: 36px;
`;

const Section = styled.section`
  margin-bottom: 36px;
  page-break-inside: avoid;
`;

const SectionLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.highlightInk};
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  margin-bottom: 18px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  margin-bottom: 18px;
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
    color: ${({ theme }) => theme.colors.highlightInk};
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
  color: ${({ theme }) => theme.colors.highlightInk};
  background: ${({ theme }) => theme.colors.lime};
  display: inline-block;
  padding: 2px 6px;
  border-radius: 2px;
  margin-bottom: 8px;
`;

const EduTitle = styled(Title)`
  font-size: 16px;
`;

const EduSchool = styled(Company)`
  font-size: 12px;
  margin-bottom: 0;
`;

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
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    document.title =
      lang === 'de' ? 'Lebenslauf — Iver Gentz' : 'CV — Iver Gentz';
  }, [lang]);

  const handlePrint = () => {
    window.print();
  };

  /**
   * Generate PDF on demand using @react-pdf/renderer.
   * Code-split via dynamic import so the heavy renderer only loads when used.
   */
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const [{ pdf }, { default: CVPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../components/CVPdfDocument'),
      ]);
      const blob = await pdf(<CVPdfDocument cv={cv} lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv-iver-gentz-${lang}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert(lang === 'de'
        ? 'PDF-Generierung fehlgeschlagen. Bitte versuche die Drucken-Funktion.'
        : 'PDF generation failed. Please try the Print function.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Page>
      <Wrap>
        <Toolbar>
          <ToolbarLeft as={RouterLink} to="/#stationen">
            ← {cv.labels.back}
          </ToolbarLeft>
          <ToolbarRight>
            <ToolbarButton type="button" onClick={handlePrint}>
              {cv.labels.print}
            </ToolbarButton>
            <DownloadButton type="button" onClick={handleDownload} disabled={downloading}>
              {downloading
                ? (lang === 'de' ? 'Generiere...' : 'Generating...')
                : `${cv.labels.download} ↓`}
            </DownloadButton>
          </ToolbarRight>
        </Toolbar>

        <PrintStyles />
        <Doc>
          <Header>
            <HeaderLeft>
              <Name>Iver Gentz</Name>
              <Role>
                <span className="hl">{cv.role}</span>
              </Role>
              <Meta>
                <span>Hamburg, Deutschland</span>
                <span className="sep">·</span>
                <span>hallo@ivergentz.de</span>
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
      </Wrap>
    </Page>
  );
}
