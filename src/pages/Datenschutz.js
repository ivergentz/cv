import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedLink } from '../components/Link';

const Wrap = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(48px, 8vw, 96px) ${({ theme }) => theme.gutter} 120px;
`;

const Back = styled(AnimatedLink)`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 48px;
  display: inline-block;
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(40px, 5vw, 64px);
  letter-spacing: -0.025em;
  margin-bottom: 48px;
`;

const Block = styled.section`
  margin-bottom: 40px;

  h2 {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 12px;
    font-weight: 500;
  }

  p {
    font-size: 15.5px;
    line-height: 1.7;
    margin-bottom: 8px;
  }
`;

export default function Datenschutz() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'de' ? 'Datenschutz — Iver Bohnes' : 'Privacy — Iver Bohnes';
  }, [lang]);

  if (lang === 'en') return <EN t={t} />;
  return <DE t={t} />;
}

function DE({ t }) {
  return (
    <Wrap>
      <Back as={RouterLink} to="/">
        ← {t.labelForward}
      </Back>
      <H1>Datenschutzerklärung</H1>

      <Block>
        <h2>1. Verantwortlicher</h2>
        <p>
          Iver Bohnes
          <br />
          Große Freiheit 82, 22767 Hamburg
          <br />
          E-Mail:{' '}
          <AnimatedLink href="mailto:iverbohnes@gmail.com">
            iverbohnes@gmail.com
          </AnimatedLink>
        </p>
      </Block>

      <Block>
        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Der Schutz Ihrer persönlichen Daten ist mir ein wichtiges Anliegen. Ich
          behandle Ihre personenbezogenen Daten vertraulich und entsprechend der
          gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          Diese Website wurde als persönliche Portfolio-Seite konzipiert und
          verarbeitet nur die unbedingt notwendigen Daten.
        </p>
      </Block>

      <Block>
        <h2>3. Hosting</h2>
        <p>
          Diese Website wird über einen externen Dienstleister gehostet
          (voraussichtlich Vercel Inc. oder Netlify Inc., USA). Beim Aufruf der
          Website werden durch den Hoster technisch notwendige Server-Log-Daten
          verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
          aufgerufene Seite, Referrer-URL, verwendeter Browser und Betriebssystem.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an einer stabilen und sicheren Bereitstellung der Website). Mit dem
          Hoster besteht ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28
          DSGVO. Bei US-Dienstleistern erfolgt die Datenübermittlung auf
          Grundlage des EU-US Data Privacy Framework und/oder der
          EU-Standardvertragsklauseln.
        </p>
      </Block>

      <Block>
        <h2>4. Schriftarten</h2>
        <p>
          Die verwendeten Schriftarten (Newsreader, IBM Plex) werden lokal von
          diesem Server ausgeliefert. Es findet keine Verbindung zu Servern
          Dritter wie Google Fonts statt; Ihre IP-Adresse wird dabei nicht an
          Dritte übermittelt.
        </p>
      </Block>

      <Block>
        <h2>5. Kontaktaufnahme</h2>
        <p>
          Wenn Sie mich per E-Mail kontaktieren, werden die von Ihnen
          übermittelten Daten (E-Mail-Adresse, Inhalt der Nachricht) zum Zwecke
          der Bearbeitung Ihrer Anfrage gespeichert. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit.
          f DSGVO (berechtigtes Interesse an der Beantwortung der Anfrage).
        </p>
      </Block>

      <Block>
        <h2>6. Keine Cookies, kein Analyse-Dienst</h2>
        <p>
          Diese Website setzt keine Cookies und nutzt weder Google Analytics noch
          einen anderen Analyse-Dienst.
        </p>
        <p>
          Einzige Ausnahme: Ich verschicke Bewerbungen mit einem persönlichen Link
          (z. B. iverbohnes.de/firmenname). Wird eine Seite über einen solchen
          Link aufgerufen, speichere ich das Kürzel, den Zeitpunkt, die
          aufgerufenen Unterseiten, die Verweildauer und die Geräteart (Desktop
          oder Mobil). IP-Adressen und Cookies werden dafür nicht verwendet; ein
          Rückschluss auf einzelne Personen ist nicht beabsichtigt. Zweck ist zu
          erfahren, ob meine Bewerbung angesehen wurde. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden auf Servern meiner
          Hosting-Dienstleister (Vercel Inc., Supabase Inc.) gespeichert und
          spätestens nach Abschluss des Bewerbungsverfahrens gelöscht.
        </p>
      </Block>

      <Block>
        <h2>7. Externe Links</h2>
        <p>
          Diese Website enthält Links zu externen Websites (rankbrief.com,
          sarahiver.com, werkruf.com, lais-ottensen.de, linkedin.com). Für den
          Datenschutz dieser externen Seiten ist jeweils deren Betreiber
          verantwortlich.
        </p>
      </Block>

      <Block>
        <h2>8. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16
          DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art.
          18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art.
          21 DSGVO). Zudem können Sie sich bei einer Datenschutz-Aufsichtsbehörde
          beschweren, in Hamburg beim Hamburgischen Beauftragten für Datenschutz
          und Informationsfreiheit.
        </p>
      </Block>

      <Block>
        <h2>9. SSL/TLS-Verschlüsselung</h2>
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung.
          Eine verschlüsselte Verbindung erkennen Sie an dem „https://&ldquo; in der
          Adresszeile Ihres Browsers.
        </p>
      </Block>

      <Block>
        <h2>10. Aktualität</h2>
        <p>Stand dieser Datenschutzerklärung: Oktober 2026.</p>
      </Block>
    </Wrap>
  );
}

function EN({ t }) {
  return (
    <Wrap>
      <Back as={RouterLink} to="/">
        ← {t.labelForward}
      </Back>
      <H1>Privacy Policy</H1>

      <Block>
        <h2>1. Data controller</h2>
        <p>
          Iver Bohnes
          <br />
          Große Freiheit 82, 22767 Hamburg, Germany
          <br />
          Email:{' '}
          <AnimatedLink href="mailto:iverbohnes@gmail.com">
            iverbohnes@gmail.com
          </AnimatedLink>
        </p>
      </Block>

      <Block>
        <h2>2. General information</h2>
        <p>
          The protection of your personal data is important to me. I treat your
          personal data confidentially and in accordance with the statutory data
          protection regulations and this privacy policy. This website is a
          personal portfolio and only processes the data strictly necessary for
          its operation.
        </p>
      </Block>

      <Block>
        <h2>3. Hosting</h2>
        <p>
          This website is hosted by an external provider (likely Vercel Inc. or
          Netlify Inc., USA). When you access the website, the provider
          processes technically necessary server log data, including IP address,
          date and time of access, page requested, referrer URL, browser and
          operating system. Legal basis is Art. 6 (1) lit. f GDPR (legitimate
          interest in stable and secure delivery). A data processing agreement
          (DPA) under Art. 28 GDPR exists with the provider. Transfers to US
          providers are based on the EU-US Data Privacy Framework and/or EU
          Standard Contractual Clauses.
        </p>
      </Block>

      <Block>
        <h2>4. Fonts</h2>
        <p>
          The fonts used on this site (Newsreader, IBM Plex) are served locally
          from this server. No connection is made to third-party servers such
          as Google Fonts, and your IP address is not passed on to third parties.
        </p>
      </Block>

      <Block>
        <h2>5. Email contact</h2>
        <p>
          If you contact me by email, the data you transmit (email address,
          message content) is stored to process your request. Legal basis is
          Art. 6 (1) lit. b GDPR (pre-contractual measures) or Art. 6 (1) lit. f
          GDPR (legitimate interest in replying to requests).
        </p>
      </Block>

      <Block>
        <h2>6. No cookies, no analytics service</h2>
        <p>
          This website sets no cookies and uses neither Google Analytics nor any
          other analytics service.
        </p>
        <p>
          One exception: I send applications with a personal link (e.g.
          iverbohnes.de/companyname). When the site is opened via such a link, I
          store the code, the time, the pages viewed, the time spent and the
          device type (desktop or mobile). No IP addresses or cookies are used,
          and identifying individual people is not intended. The purpose is to
          learn whether my application was viewed. Legal basis: Art. 6(1)(f)
          GDPR. The data is stored with my hosting providers (Vercel Inc.,
          Supabase Inc.) and deleted once the application process has ended at
          the latest.
        </p>
      </Block>

      <Block>
        <h2>7. External links</h2>
        <p>
          This website contains links to external sites (rankbrief.com,
          sarahiver.com, werkruf.com, lais-ottensen.de, linkedin.com). The
          respective operator is responsible for the privacy of those sites.
        </p>
      </Block>

      <Block>
        <h2>8. Your rights</h2>
        <p>
          You have the right of access (Art. 15 GDPR), rectification (Art. 16
          GDPR), erasure (Art. 17 GDPR), restriction (Art. 18 GDPR), data
          portability (Art. 20 GDPR) and objection (Art. 21 GDPR). You may also
          lodge a complaint with a data protection supervisory authority — in
          Hamburg with the Hamburg Commissioner for Data Protection and Freedom
          of Information.
        </p>
      </Block>

      <Block>
        <h2>9. SSL/TLS encryption</h2>
        <p>
          This site uses SSL/TLS encryption for security. You can recognize an
          encrypted connection by the &ldquo;https://&rdquo; in your browser&rsquo;s address bar.
        </p>
      </Block>

      <Block>
        <h2>10. Last updated</h2>
        <p>October 2026.</p>
      </Block>
    </Wrap>
  );
}
