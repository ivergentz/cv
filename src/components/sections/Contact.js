import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SectionFrame from '../SectionFrame';
import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n/LanguageContext';

const EMAIL = 'iverbohnes@gmail.com';

const Center = styled.div`
  text-align: center;
  display: grid;
  justify-items: center;
`;

const Body = styled.p`
  margin-top: clamp(20px, 2.5vw, 32px);
  max-width: 44ch;
  font-size: clamp(19px, 1.6vw, 22px);
  line-height: 1.48;
  color: var(--muted);
`;

const Mail = styled.a`
  position: relative;
  display: inline-block;
  margin-top: clamp(32px, 4vw, 56px);
  font-family: ${({ theme }) => theme.fonts.italic};
  font-style: italic;
  font-size: clamp(30px, 6vw, 96px);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--ink);
  overflow-wrap: anywhere;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.02em;
    height: 4px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(0.12);
    transform-origin: center;
    transition: transform 700ms ${({ theme }) => theme.ease};
  }
  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;

const Copy = styled.button`
  margin-top: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  height: 46px;
  padding: 0 20px;
  border: 0;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: background 220ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Meta = styled.dl`
  margin: clamp(56px, 7vw, 96px) 0 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 3px solid var(--ink);
  text-align: center;

  > div {
    padding: 22px 16px 4px;
  }
  > div + div {
    border-left: 1px solid var(--line);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    > div + div {
      border-left: 0;
      border-top: 1px solid var(--line);
    }
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
  }
  dd {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  a {
    background-image: linear-gradient(currentColor, currentColor);
    background-size: 100% 2px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: color 200ms ease;
  }
  a:hover {
    color: var(--accent);
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
    <SectionFrame id="kontakt" aria-labelledby="contact-heading">
      <SectionHead index="06" label={c.label} title={c.title} id="contact-heading" />
      <Center>
        <Reveal delay={0.15}>
          <Body>{c.body}</Body>
        </Reveal>
        <Reveal delay={0.25}>
          <Mail href={`mailto:${EMAIL}`}>{EMAIL}</Mail>
        </Reveal>
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
      </Center>
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
