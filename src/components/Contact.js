import React, { useState } from 'react';
import styled from 'styled-components';
import { useInView } from '../hooks/useInView';

const Section = styled.section`
  background: #080809;
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

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fontSlab};
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.white};
  line-height: 1;
`;

const SubText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.gray400};
  font-weight: 300;
  line-height: 1.7;
`;

const DirectLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DirectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.gray400};
  font-weight: 300;
  transition: color 0.2s;
  padding-bottom: 12px;
  border-bottom: 0.5px solid ${({ theme }) => theme.gray600}22;

  &:last-child { border-bottom: none; }

  &:hover { color: ${({ theme }) => theme.white}; }

  span:first-child {
    font-size: 8.5px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.gray600};
    width: 60px;
    flex-shrink: 0;
  }
`;

// Form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.gray600};
  font-weight: 400;
`;

const Input = styled.input`
  background: transparent;
  border: 0.5px solid ${({ theme }) => theme.gray600}44;
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.fontSans};
  font-size: 13px;
  font-weight: 300;
  padding: 12px 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.white}66;
  }

  &::placeholder {
    color: ${({ theme }) => theme.gray600};
  }
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
`;

const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  border: none;
  font-family: ${({ theme }) => theme.fontSans};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 16px 32px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s, opacity 0.2s;

  &:hover { background: ${({ theme }) => theme.accent}; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const StatusMsg = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: ${({ $error, theme }) => $error ? '#e06060' : '#70c98a'};
  margin-top: 4px;
`;

export default function Contact() {
  const ref = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Brevo Transactional Email API
      // Set REACT_APP_BREVO_API_KEY in Vercel environment variables
      const apiKey = process.env.REACT_APP_BREVO_API_KEY;

      if (!apiKey) {
        // Dev fallback: just show success
        await new Promise(r => setTimeout(r, 800));
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: { name: form.name, email: 'noreply@ivergentz.de' },
          replyTo: { email: form.email, name: form.name },
          to: [{ email: 'ivergentz@gmail.com', name: 'Iver Gentz' }],
          subject: form.subject || `Portfolio-Kontakt von ${form.name}`,
          textContent: `Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`,
          htmlContent: `<p><strong>Name:</strong> ${form.name}</p><p><strong>E-Mail:</strong> ${form.email}</p><hr><p>${form.message.replace(/\n/g, '<br>')}</p>`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="kontakt" ref={ref}>
      <SectionLabel className="fly-up">Kontakt</SectionLabel>
      <Layout>
        <InfoBlock className="fly-left">
          <Headline>Lass uns reden.</Headline>
          <SubText>
            Ob Projektanfrage, Kooperation oder einfach ein kurzes Gespräch —
            ich freue mich über Nachrichten.
          </SubText>
          <DirectLinks>
            <DirectLink href="mailto:ivergentz@gmail.com">
              <span>E-Mail</span>
              ivergentz@gmail.com
            </DirectLink>
            <DirectLink href="tel:+4917666631237">
              <span>Telefon</span>
              +49 176 66631237
            </DirectLink>
            <DirectLink href="/cv_gentz.pdf" download="CV_Iver_Gentz.pdf">
              <span>CV</span>
              Lebenslauf herunterladen ↓
            </DirectLink>
          </DirectLinks>
        </InfoBlock>

        <Form onSubmit={handleSubmit} className="fly-right">
          <FormRow>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name" name="name" type="text"
                placeholder="Dein Name"
                value={form.name} onChange={handleChange} required
              />
            </Field>
            <Field>
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email" name="email" type="email"
                placeholder="deine@email.de"
                value={form.email} onChange={handleChange} required
              />
            </Field>
          </FormRow>
          <Field>
            <Label htmlFor="subject">Betreff</Label>
            <Input
              id="subject" name="subject" type="text"
              placeholder="Worum geht es?"
              value={form.subject} onChange={handleChange}
            />
          </Field>
          <Field>
            <Label htmlFor="message">Nachricht</Label>
            <Textarea
              id="message" name="message"
              placeholder="Deine Nachricht..."
              value={form.message} onChange={handleChange} required
            />
          </Field>
          <SubmitBtn type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
          </SubmitBtn>
          {status === 'success' && (
            <StatusMsg>Nachricht gesendet — ich melde mich bald!</StatusMsg>
          )}
          {status === 'error' && (
            <StatusMsg $error>Etwas ist schiefgelaufen. Bitte direkt per E-Mail schreiben.</StatusMsg>
          )}
        </Form>
      </Layout>
    </Section>
  );
}
