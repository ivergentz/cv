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
  max-width: 52ch;
  font-size: 18px;
  line-height: 1.6;
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
  font-size: clamp(30px, 5.2vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.paper};
  overflow-wrap: anywhere;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.02em;
    height: 2px;
    background: ${({ theme }) => theme.colors.accentOnInk};
    transform: scaleX(0.18);
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
  height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(244, 241, 234, 0.3);
  background: transparent;
  color: ${({ theme }) => theme.colors.paper};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  min-width: 108px;
  justify-content: center;
  transition: border-color 200ms ease, background 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.paper};
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
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  dd {
    margin: 0;
    font-size: 16px;
  }
  a {
    border-bottom: 1px solid rgba(244, 241, 234, 0.3);
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
      <SectionHead index="06" label={c.label} title={c.title} id="contact-heading" onInk />
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
