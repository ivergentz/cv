import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedLink } from '../components/Link';

const Wrap = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 80px ${({ theme }) => theme.gutter} 120px;
`;

const Back = styled(AnimatedLink)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.05em;
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
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 11.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 12px;
    font-weight: 500;
  }

  p {
    font-size: 15.5px;
    line-height: 1.7;
  }
`;

export default function Impressum() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'de' ? 'Impressum — Iver Gentz' : 'Imprint — Iver Gentz';
  }, [lang]);

  return (
    <Wrap>
      <Back as={RouterLink} to="/">
        ← {t.labelForward}
      </Back>
      <H1>{lang === 'de' ? 'Impressum' : 'Imprint'}</H1>

      <Block>
        <h2>
          {lang === 'de'
            ? 'Angaben gemäß § 5 DDG'
            : 'Information according to § 5 DDG'}
        </h2>
        <p>
          Iver Gentz
          <br />
          Große Freiheit 82
          <br />
          22767 Hamburg
          <br />
          {lang === 'de' ? 'Deutschland' : 'Germany'}
        </p>
      </Block>

      <Block>
        <h2>{lang === 'de' ? 'Kontakt' : 'Contact'}</h2>
        <p>
          {lang === 'de' ? 'Telefon' : 'Phone'}: +49 176 66631237
          <br />
          E-Mail:{' '}
          <AnimatedLink href="mailto:ivergentz@gmail.com">
            ivergentz@gmail.com
          </AnimatedLink>
        </p>
      </Block>

      <Block>
        <h2>
          {lang === 'de'
            ? 'Umsatzsteuer'
            : 'VAT'}
        </h2>
        <p>
          {lang === 'de'
            ? 'Es wird keine Umsatzsteuer gemäß § 19 UStG (Kleinunternehmerregelung) ausgewiesen.'
            : 'No VAT is charged under the small business regulation of § 19 UStG.'}
        </p>
      </Block>

      <Block>
        <h2>
          {lang === 'de'
            ? 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV'
            : 'Responsible for content according to § 18 (2) MStV'}
        </h2>
        <p>
          Iver Gentz
          <br />
          Große Freiheit 82, 22767 Hamburg
        </p>
      </Block>

      <Block>
        <h2>
          {lang === 'de'
            ? 'Haftung für Inhalte'
            : 'Liability for content'}
        </h2>
        <p>
          {lang === 'de'
            ? 'Als Diensteanbieter bin ich gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
            : 'As a service provider, I am responsible for my own content on these pages in accordance with § 7 (1) DDG. However, according to §§ 8 to 10 DDG, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.'}
        </p>
      </Block>

      <Block>
        <h2>
          {lang === 'de'
            ? 'Haftung für Links'
            : 'Liability for links'}
        </h2>
        <p>
          {lang === 'de'
            ? 'Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
            : 'This website contains links to external third-party websites whose content I have no influence over. Therefore, I cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages.'}
        </p>
      </Block>

      <Block>
        <h2>{lang === 'de' ? 'Urheberrecht' : 'Copyright'}</h2>
        <p>
          {lang === 'de'
            ? 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
            : 'The content and works on these pages created by the site operator are subject to German copyright law. Duplication, processing, distribution and any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.'}
        </p>
      </Block>
    </Wrap>
  );
}
