import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { cvContent } from '../i18n/cv';

/**
 * CV — a printed sheet on the paper background, set like the website:
 * Bodoni headlines, Newsreader text, Plex Sans labels, ultramarine accent.
 * Same structure as the PDF export (CVPdfDocument).
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
  max-width: 980px;
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
  font-family: ${({ theme }) => theme.fonts.sans};

  @media print {
    display: none;
  }
`;

const Back = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};

  svg {
    transition: transform 300ms ${({ theme }) => theme.ease};
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
  padding: 0 16px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  border: 1.5px solid ${({ theme }) => theme.colors.ink};
  background: transparent;
  color: ${({ theme }) => theme.colors.ink};
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.paper};
  }
  &.solid {
    background: ${({ theme }) => theme.colors.ink};
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
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-top: 6px solid ${({ theme }) => theme.colors.ink};
  box-shadow: 10px 10px 0 ${({ theme }) => theme.colors.accent};
  padding: clamp(28px, 6vw, 72px) clamp(20px, 6vw, 72px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    box-shadow: 6px 6px 0 ${({ theme }) => theme.colors.accent};
  }

  @media print {
    box-shadow: none;
    border: 0;
    padding: 0;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 132px;
  gap: 32px;
  align-items: end;
  padding-bottom: 24px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.ink};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr) 84px;
    gap: 16px;
    align-items: start;
  }
`;

const Name = styled.h1`
  font-size: clamp(48px, 8vw, 92px);
  line-height: 0.9;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};

  .b {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Former = styled.p`
  margin-top: 10px;
  font-family: ${({ theme }) => theme.fonts.italic};
  font-style: italic;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.inkMute};
`;

const Role = styled.p`
  margin-top: 14px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.accent};
`;

const Contact = styled.ul`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.inkSoft};

  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 2px;
  }
`;

const Photo = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.paperAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
  }
`;

const Section = styled(motion.section)`
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 24px;
  padding: 26px 0;
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
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  padding-top: 5px;

  small {
    display: block;
    margin-top: 8px;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-size: 14.5px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    color: ${({ theme }) => theme.colors.inkMute};
    line-height: 1.4;
  }
`;

const Lead = styled.p`
  font-size: clamp(19px, 2vw, 22px);
  line-height: 1.42;
  color: ${({ theme }) => theme.colors.ink};
  max-width: 58ch;
`;

const Comp = styled.dl`
  margin: 0;
  display: grid;
  gap: 14px;

  dt {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-size: 17px;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 3px;
  }
  dd {
    margin: 0;
    font-size: 16.5px;
    line-height: 1.5;
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
    font-size: 23px;
    line-height: 1.1;
    letter-spacing: 0.01em;
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
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkSoft};

  .status {
    display: inline-block;
    margin-left: 12px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Bullets = styled.ul`
  margin-top: 8px;
  display: grid;
  gap: 4px;

  li {
    position: relative;
    padding-left: 18px;
    font-size: 16.5px;
    line-height: 1.48;
    color: ${({ theme }) => theme.colors.inkSoft};
  }
  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 7px;
    height: 7px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Langs = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 24px;
  font-size: 17px;

  span {
    font-style: italic;
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
              <Name>
                Iver <span className="b">Bohnes</span>
              </Name>
              <Former>{cv.formerName}</Former>
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
                    <h3 style={{ fontSize: 21 }}>{e.title}</h3>
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
