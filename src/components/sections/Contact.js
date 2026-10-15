import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

const EMAIL = 'iverbohnes@gmail.com';

const Body = styled.p`
  margin-top: clamp(24px, 3vw, 36px);
  max-width: 40ch;
  font-size: clamp(20px, 1.8vw, 24px);
  line-height: 1.42;
  color: var(--muted);
`;

const MailRow = styled.div`
  margin-top: clamp(40px, 5vw, 64px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
`;

const Mail = styled.a`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(30px, 6.4vw, 104px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.colors.paper};
  overflow-wrap: anywhere;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.accentOnInk};
    transform: scaleX(0.14);
    transform-origin: left center;
    transition: transform 700ms ${({ theme }) => theme.ease};
  }
  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;

const Copy = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border: 1.5px solid ${({ theme }) => theme.colors.paper};
  background: transparent;
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  min-width: 108px;
  justify-content: center;
  transition: border-color 200ms ease, background 200ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Meta = styled.dl`
  margin: clamp(56px, 7vw, 96px) 0 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  padding-top: 28px;
  border-top: 1px solid var(--line);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  dd {
    margin: 0;
    font-size: 19px;
  }
  a {
    border-bottom: 1px solid rgba(247, 247, 244, 0.4);
    transition: border-color 200ms ease;
  }
  a:hover {
    border-color: ${({ theme }) => theme.colors.paper};
  }
`;

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <SectionFrame bg="ink" id="kontakt" aria-labelledby="contact-heading">
      <SectionHead index="06" label={c.label} title={c.title} aside="Hamburg" id="contact-heading" />
      <Reveal delay={0.15}>
        <Body>{c.body}</Body>
      </Reveal>
      <Reveal delay={0.25}>
        <MailRow>
          <Mail href={`mailto:${EMAIL}`}>{EMAIL}</Mail>
          <Copy type="button" onClick={onCopy} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'y' : 'n'}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {copied ? `✓ ${c.copied}` : c.copy}
              </motion.span>
            </AnimatePresence>
          </Copy>
        </MailRow>
      </Reveal>
      <Meta>
        <div>
          <dt>{c.locLabel}</dt>
          <dd>{c.locValue}</dd>
        </div>
        <div>
          <dt>{c.netLabel}</dt>
          <dd>
            <a href="https://www.linkedin.com/in/iver-gentz-11b0a2171/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </dd>
        </div>
        <div>
          <dt>{c.cvLabel}</dt>
          <dd>
            <RouterLink to="/cv">{c.cvValue}</RouterLink>
          </dd>
        </div>
      </Meta>
    </SectionFrame>
  );
}
