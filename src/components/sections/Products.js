import React from 'react';
import styled from 'styled-components';
import Reveal from '../Reveal';
import { AnimatedLink } from '../Link';
import { useLanguage } from '../../i18n/LanguageContext';

const Section = styled.section`
  padding: clamp(80px, 11vw, 160px) ${({ theme }) => theme.gutter};
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 40px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: end;
  margin-bottom: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }
`;

const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 84px);
  line-height: 1;
  letter-spacing: -0.028em;

  .ital {
    font-style: italic;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Intro = styled.p`
  max-width: 48ch;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  line-height: 1.6;
`;

const Product = styled.article`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 60px;
  padding: 60px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  transition: transform 200ms ease;

  &:hover { transform: translateY(-2px); }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 4.4vw, 56px);
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 400;

  .amp { font-style: italic; }
`;

const Badge = styled.span`
  display: inline-block;
  align-self: flex-start;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 2px;
`;

const URL = styled(AnimatedLink)`
  color: ${(props) => (props.$muted ? props.theme.colors.muted : props.theme.colors.fg)};
  font-size: 14px;
`;

const OneLiner = styled.p`
  font-size: 15px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.muted};
`;

const StackLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 12px;
`;

const Stack = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.fg};
`;

const Right = styled.div`
  display: grid;
  gap: 28px;
`;

const Block = styled.div``;

const Label = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 15.5px;
  line-height: 1.65;
`;

const Shot = styled.figure`
  grid-column: 1 / -1;
  margin: 48px 0 0;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.shotBg};
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 300ms ease;

  &:hover { border-color: #a8a59c; }

  img {
    width: 100%;
    height: 100%;
    object-fit: ${(props) => (props.$contain ? 'contain' : 'cover')};
    object-position: ${(props) => (props.$contain ? 'center center' : 'top center')};
    filter: grayscale(0.35) sepia(0.08) contrast(0.96) brightness(0.98);
    transition: filter 300ms ease;
  }

  &:hover img {
    filter: grayscale(0.2) sepia(0.05) contrast(1) brightness(1);
  }
`;

export default function Products() {
  const { t } = useLanguage();
  const L = t.products.labels;

  return (
    <Section id="arbeit" aria-labelledby="products-heading">
      <Reveal>
        <Num>{t.sectionNum.products}</Num>
      </Reveal>
      <Head>
        <Reveal>
          <H2 id="products-heading">
            {t.products.title1} <span className="ital">{t.products.title2}</span>
          </H2>
        </Reveal>
        <Reveal>
          <Intro>{t.products.intro}</Intro>
        </Reveal>
      </Head>

      <Product>
        <Left>
          <ProductName>RankBrief</ProductName>
          <URL href="https://rankbrief.com" target="_blank" rel="noopener noreferrer">
            rankbrief.com ↗
          </URL>
          <OneLiner>{t.products.rb.one}</OneLiner>
          <StackLabel>{L.stack}</StackLabel>
          <Stack>React · Supabase · Stripe<br/>Google Search Console API<br/>Claude API</Stack>
        </Left>
        <Right>
          <Block><Label>{L.problem}</Label><Text>{t.products.rb.problem}</Text></Block>
          <Block><Label>{L.solution}</Label><Text>{t.products.rb.solution}</Text></Block>
          <Block><Label>{L.scope}</Label><Text>{t.products.rb.scope}</Text></Block>
          <Block><Label>{L.status}</Label><Text>{t.products.rb.status}</Text></Block>
        </Right>
        <Shot>
          <img src={`${process.env.PUBLIC_URL}/images/rankbrief.png`} alt={t.shot.rb} />
        </Shot>
      </Product>

      <Product>
        <Left>
          <ProductName>S<span className="amp">&amp;</span>I. Wedding</ProductName>
          <URL href="https://sarahiver.com" target="_blank" rel="noopener noreferrer">
            sarahiver.com ↗
          </URL>
          <OneLiner>{t.products.si.one}</OneLiner>
          <StackLabel>{L.stack}</StackLabel>
          <Stack>React · Supabase<br/>Cloudinary · Brevo</Stack>
        </Left>
        <Right>
          <Block><Label>{L.problem}</Label><Text>{t.products.si.problem}</Text></Block>
          <Block><Label>{L.solution}</Label><Text>{t.products.si.solution}</Text></Block>
          <Block><Label>{L.scope}</Label><Text>{t.products.si.scope}</Text></Block>
          <Block><Label>{L.status}</Label><Text>{t.products.si.status}</Text></Block>
        </Right>
        <Shot $contain>
          <img src={`${process.env.PUBLIC_URL}/images/sarahiver.png`} alt={t.shot.si} />
        </Shot>
      </Product>

      <Product>
        <Left>
          <ProductName>WERKRUF</ProductName>
          <Badge>{t.products.wr.badge}</Badge>
          <URL href="https://werkruf.com" target="_blank" rel="noopener noreferrer" $muted>
            werkruf.com ↗
          </URL>
          <OneLiner>{t.products.wr.one}</OneLiner>
          <StackLabel>{L.stack}</StackLabel>
          <Stack>React · Supabase · Stripe<br/>Google Places API<br/>Google Business Profile API<br/>Cloudinary · Claude API</Stack>
        </Left>
        <Right>
          <Block><Label>{L.problem}</Label><Text>{t.products.wr.problem}</Text></Block>
          <Block><Label>{L.solution}</Label><Text>{t.products.wr.solution}</Text></Block>
          <Block><Label>{L.scope}</Label><Text>{t.products.wr.scope}</Text></Block>
          <Block><Label>{L.status}</Label><Text>{t.products.wr.status}</Text></Block>
        </Right>
        <Shot>
          <img src={`${process.env.PUBLIC_URL}/images/werkruf.png`} alt={t.shot.wr} />
        </Shot>
      </Product>
    </Section>
  );
}
