import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { cvContent } from '../i18n/cv';

/**
 * CV — rendered as a paper sheet on the warm background.
 * Same grid as the PDF export (CVPdfDocument): label column + content.
 * Print: the sheet becomes the page (A4), toolbar and chrome disappear.
 */

const ease = [0.22, 1, 0.36, 1];

const Page = styled.main`
  background: ${({ theme }) => theme.colors.paperAlt};
  min-height: 100vh;
  padding: clamp(20px, 4vw, 48px) 0 clamp(56px, 8vw, 112px);

  @media print {
    background: #fff;
    padding: 0;
  }
`;

const Wrap = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.gutter};

  @media print {
    max-width: none;
    padding: 0;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;

  @media print {
    display: none;
  }
`;

const Back = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inkSoft};
  transition: color 200ms ease;

  svg {
    transition: transform 300ms ${({ theme }) => theme.ease};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:hover svg {
    transform: translateX(-3px);
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  background: transparent;
  color: ${({ theme }) => theme.colors.ink};
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.ink};
  }
  &.solid {
    background: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.paper};
  }
  &.solid:hover {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
`;

const Sheet = styled(motion.article)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(26, 24, 20, 0.04), 0 24px 60px -32px rgba(26, 24, 20, 0.28);
  padding: clamp(28px, 6vw, 72px) clamp(20px, 6vw, 80px);

  @media print {
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    background: #fff;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 128px;
  gap: 32px;
  align-items: end;
  padding-bottom: 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ink};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr) 88px;
    gap: 16px;
    align-items: start;
  }
`;

const Name = styled.h1`
  font-size: clamp(40px, 6vw, 64px);
  line-height: 1;
  letter-spacing: -0.028em;
  color: ${({ theme }) => theme.colors.ink};
`;

const Role = styled.p`
  margin-top: 10px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(19px, 2.2vw, 24px);
  color: ${({ theme }) => theme.colors.accent};
`;

const Contact = styled.ul`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.inkSoft};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 2px;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Photo = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.paperAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 22%;
  }
`;

const Section = styled(motion.section)`
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr);
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  break-inside: avoid-page;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const Label = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  padding-top: 3px;

  small {
    display: block;
    margin-top: 6px;
    font-size: 12.5px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    color: ${({ theme }) => theme.colors.inkMute};
    line-height: 1.45;
  }
`;

const Lead = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(18px, 1.9vw, 21px);
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.ink};
  max-width: 60ch;
`;

const Comp = styled.dl`
  margin: 0;
  display: grid;
  gap: 14px;

  dt {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 2px;
  }
  dd {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
`;

const Entry = styled.div`
  & + & {
    margin-top: 22px;
  }
  break-inside: avoid;
`;

const EntryHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 2px;
  }

  h3 {
    font-size: 20px;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.ink};
  }
  .period {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.inkMute};
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      order: -1;
    }
  }
`;

const Sub = styled.p`
  margin-top: 2px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inkSoft};

  .status {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Bullets = styled.ul`
  margin-top: 8px;
  display: grid;
  gap: 5px;

  li {
    position: relative;
    padding-left: 16px;
    font-size: 14.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 6px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Langs = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 24px;
  font-size: 14.5px;

  span {
    color: ${({ theme }) => theme.colors.inkMute};
    margin-left: 8px;
  }
`;

const PrintStyles = styled.div`
  @media print {
    @page {
      size: A4;
      margin: 14mm 15mm;
    }
  }
`;

export default function CV() {
  const { lang } = useLanguage();
  const cv = cvContent[lang];
  const reduce = useReducedMotion();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = lang === 'de' ? 'Lebenslauf — Iver Bohnes' : 'CV — Iver Bohnes';
  }, [lang]);

  const onDownload = async () => {
    try {
      setBusy(true);
      const [{ pdf }, { default: CVPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../components/CVPdfDocument'),
      ]);
      const blob = await pdf(<CVPdfDocument cv={cv} lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = lang === 'de' ? 'Lebenslauf-Iver-Bohnes.pdf' : 'CV-Iver-Bohnes.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('PDF generation failed:', err);
      alert(cv.labels.error);
    } finally {
      setBusy(false);
    }
  };

  const sec = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease, delay: 0.25 + i * 0.08 },
        };

  return (
    <Page>
      <PrintStyles />
      <Wrap>
        <Toolbar>
          <Back to="/">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M13 7H1M1 7l5-5M1 7l5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {cv.labels.back}
          </Back>
          <Buttons>
            <Btn type="button" onClick={() => window.print()}>
              {cv.labels.print}
            </Btn>
            <Btn type="button" className="solid" onClick={onDownload} disabled={busy}>
              {busy ? cv.labels.generating : cv.labels.download}
            </Btn>
          </Buttons>
        </Toolbar>

        <Sheet
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <Header>
            <div>
              <Name>Iver Bohnes</Name>
              <Role>{cv.role}</Role>
              <Contact>
                <li>{cv.contact.location}</li>
                <li>
                  <a href={`mailto:${cv.contact.email}`}>{cv.contact.email}</a>
                </li>
                <li>
                  <a href={`tel:${cv.contact.phone.replace(/\s/g, '')}`}>{cv.contact.phone}</a>
                </li>
                <li>
                  <a href={`https://${cv.contact.web}`}>{cv.contact.web}</a>
                </li>
              </Contact>
            </div>
            <Photo>
              <img src={`${process.env.PUBLIC_URL}/images/portrait-cv.jpg`} alt="Iver Bohnes" />
            </Photo>
          </Header>

          <Section {...sec(0)}>
            <Label>{cv.labels.profile}</Label>
            <Lead>{cv.tagline}</Lead>
          </Section>

          <Section {...sec(1)}>
            <Label>{cv.labels.competencies}</Label>
            <Comp>
              {cv.competencies.map((c) => (
                <div key={c.label}>
                  <dt>{c.label}</dt>
                  <dd>{c.items}</dd>
                </div>
              ))}
            </Comp>
          </Section>

          <Section {...sec(2)}>
            <Label>{cv.labels.experience}</Label>
            <div>
              {cv.experience.map((e) => (
                <Entry key={e.period}>
                  <EntryHead>
                    <h3>{e.title}</h3>
                    <span className="period">{e.period}</span>
                  </EntryHead>
                  <Sub>{e.company}</Sub>
                  <Bullets>
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </Bullets>
                </Entry>
              ))}
            </div>
          </Section>

          <Section {...sec(3)}>
            <Label>
              {cv.labels.products}
              <small>{cv.labels.productsNote}</small>
            </Label>
            <div>
              {cv.products.map((p) => (
                <Entry key={p.name}>
                  <EntryHead>
                    <h3>{p.name}</h3>
                  </EntryHead>
                  <Sub>
                    {p.url}
                    <span className="status">{p.status}</span>
                  </Sub>
                  <Bullets>
                    {p.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </Bullets>
                </Entry>
              ))}
            </div>
          </Section>

          <Section {...sec(4)}>
            <Label>{cv.labels.education}</Label>
            <div>
              {cv.education.map((e) => (
                <Entry key={e.title}>
                  <EntryHead>
                    <h3 style={{ fontSize: 18 }}>{e.title}</h3>
                    <span className="period">{e.period}</span>
                  </EntryHead>
                  <Sub>{e.school}</Sub>
                </Entry>
              ))}
            </div>
          </Section>

          <Section {...sec(5)}>
            <Label>{cv.labels.languages}</Label>
            <Langs>
              {cv.languages.map((l) => (
                <li key={l.name}>
                  {l.name}
                  <span>{l.level}</span>
                </li>
              ))}
            </Langs>
          </Section>
        </Sheet>
      </Wrap>
    </Page>
  );
}
