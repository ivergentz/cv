import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

/**
 * CVPdfDocument — A4 export in the same design as the website and /cv:
 * Oswald (display) + Bodoni Moda italic (accents) + Newsreader (text) +
 * IBM Plex Sans (labels), crimson accent, label column
 * on the left, content on the right. Fonts are the self-hosted TTF files
 * from /public/fonts, which react-pdf can embed.
 *
 * Target layout: two pages.
 *   1 — Header, Profile, Core skills, Experience
 *   2 — Own products, Education, Languages
 */

const origin = typeof window !== 'undefined' ? window.location.origin : '';
const font = (file) => `${origin}/fonts/${file}.ttf`;

Font.register({
  family: 'Oswald',
  fonts: [
    { src: font('oswald-500'), fontWeight: 500 },
    { src: font('oswald-600'), fontWeight: 600 },
    { src: font('oswald-700'), fontWeight: 700 },
  ],
});
Font.register({
  family: 'Bodoni',
  fonts: [
    { src: font('bodoni-400') },
    { src: font('bodoni-400-italic'), fontStyle: 'italic' },
  ],
});
Font.register({
  family: 'Newsreader',
  fonts: [
    { src: font('newsreader-400') },
    { src: font('newsreader-400-italic'), fontStyle: 'italic' },
    { src: font('newsreader-500'), fontWeight: 500 },
  ],
});
Font.register({
  family: 'Plex',
  fonts: [
    { src: font('plex-sans-400') },
    { src: font('plex-sans-500'), fontWeight: 500 },
    { src: font('plex-sans-600'), fontWeight: 600 },
  ],
});
Font.register({ family: 'PlexMono', src: font('plex-mono-400') });

/* Keep German compounds intact — no automatic English hyphenation. */
Font.registerHyphenationCallback((word) => [word]);

const INK = '#111111';
const SOFT = '#3B3B3B';
const MUTE = '#66665F';
const ACCENT = '#C8102E';
const LINE = '#DADAD6';

const LABEL_W = 108;

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: 34,
    paddingBottom: 46,
    paddingHorizontal: 46,
    fontFamily: 'Newsreader',
    fontSize: 9.8,
    lineHeight: 1.4,
    color: SOFT,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 14,
    borderBottomWidth: 2.5,
    borderBottomColor: INK,
  },
  headerText: { flex: 1, paddingRight: 20 },
  nameRow: { flexDirection: 'row' },
  name: { fontFamily: 'Oswald', fontWeight: 700, fontSize: 40, color: INK, lineHeight: 1.05 },
  nameB: { fontFamily: 'Oswald', fontWeight: 700, fontSize: 40, color: ACCENT, lineHeight: 1.05 },
  former: { fontFamily: 'Bodoni', fontStyle: 'italic', fontSize: 11.5, color: MUTE, marginTop: 7 },
  role: {
    fontFamily: 'Oswald',
    fontWeight: 600,
    fontSize: 11.5,
    letterSpacing: 0.6,
    color: ACCENT,
    marginTop: 6,
  },
  contact: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 9, fontFamily: 'Plex', fontSize: 8.2, color: SOFT },
  dot: { color: MUTE, marginHorizontal: 5 },
  photo: { width: 70, height: 87.5, objectFit: 'cover', borderRadius: 1.5 },

  /* Section grid */
  section: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: LINE,
  },
  sectionLast: { borderBottomWidth: 0 },
  label: {
    width: LABEL_W,
    paddingRight: 12,
    fontFamily: 'Plex',
    fontWeight: 600,
    fontSize: 7.2,
    letterSpacing: 1.1,
    color: ACCENT,
    paddingTop: 3,
  },
  labelNote: {
    fontFamily: 'Bodoni',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 8.6,
    letterSpacing: 0,
    color: MUTE,
    marginTop: 4,
    lineHeight: 1.4,
  },
  content: { flex: 1 },

  lead: { fontFamily: 'Newsreader', fontSize: 11.4, lineHeight: 1.36, color: INK },

  compRow: { marginBottom: 6 },
  compLabel: { fontFamily: 'Oswald', fontWeight: 600, fontSize: 9.6, letterSpacing: 0.3, lineHeight: 1.3, color: INK, marginBottom: 1 },
  compItems: { fontSize: 9.3, color: SOFT, lineHeight: 1.36 },

  entry: { marginBottom: 7 },
  entryHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  title: { fontFamily: 'Oswald', fontWeight: 600, fontSize: 11.8, lineHeight: 1.25, color: INK, flex: 1, paddingRight: 10, letterSpacing: 0.2 },
  period: { fontFamily: 'PlexMono', fontSize: 7.8, color: MUTE },
  sub: { fontFamily: 'Plex', fontWeight: 600, fontSize: 7.2, letterSpacing: 0.8, color: SOFT, marginTop: 2 },
  status: { fontFamily: 'Plex', fontSize: 7.2, fontWeight: 600, letterSpacing: 0.8, color: ACCENT },

  bullets: { marginTop: 3 },
  bullet: { flexDirection: 'row', marginBottom: 2 },
  bulletMark: { width: 10, paddingTop: 4.4 },
  bulletLine: { width: 3.6, height: 3.6, backgroundColor: ACCENT },
  bulletText: { flex: 1, fontSize: 9.3, lineHeight: 1.34, color: SOFT },

  langs: { flexDirection: 'row', flexWrap: 'wrap' },
  lang: { width: '50%', flexDirection: 'row', marginBottom: 3 },
  langName: { fontSize: 10, color: INK, marginRight: 6 },
  langLevel: { fontSize: 10, fontStyle: 'italic', color: MUTE },

  footer: {
    position: 'absolute',
    left: 46,
    right: 46,
    bottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Plex',
    fontSize: 7.2,
    color: MUTE,
  },
});

function Section({ label, note, last, children, keep }) {
  return (
    <View style={[s.section, last ? s.sectionLast : null]} wrap={!keep}>
      <View style={s.label}>
        <Text>{label.toUpperCase()}</Text>
        {note ? <Text style={s.labelNote}>{note}</Text> : null}
      </View>
      <View style={s.content}>{children}</View>
    </View>
  );
}

function Bullets({ items }) {
  return (
    <View style={s.bullets}>
      {items.map((b, i) => (
        <View key={i} style={s.bullet}>
          <View style={s.bulletMark}>
            <View style={s.bulletLine} />
          </View>
          <Text style={s.bulletText}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

export default function CVPdfDocument({ cv, lang }) {
  const L = cv.labels;
  const c = cv.contact;
  return (
    <Document
      title={lang === 'de' ? 'Lebenslauf — Iver Bohnes' : 'CV — Iver Bohnes'}
      author="Iver Bohnes"
      subject={cv.role}
      language={lang}
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.headerText}>
            <View style={s.nameRow}>
              <Text style={s.name}>IVER </Text>
              <Text style={s.nameB}>BOHNES</Text>
            </View>
            <Text style={s.former}>{cv.formerName}</Text>
            <Text style={s.role}>{cv.role}</Text>
            <View style={s.contact}>
              <Text>{c.location}</Text>
              <Text style={s.dot}>·</Text>
              <Text>{c.email}</Text>
              <Text style={s.dot}>·</Text>
              <Text>{c.phone}</Text>
              <Text style={s.dot}>·</Text>
              <Text>{c.web}</Text>
            </View>
          </View>
          <Image style={s.photo} src={`${origin}/images/portrait-cv.jpg`} />
        </View>

        <Section label={L.profile}>
          <Text style={s.lead}>{cv.tagline}</Text>
        </Section>

        <Section label={L.competencies}>
          {cv.competencies.map((k) => (
            <View key={k.label} style={s.compRow}>
              <Text style={s.compLabel}>{k.label.toUpperCase()}</Text>
              <Text style={s.compItems}>{k.items}</Text>
            </View>
          ))}
        </Section>

        <Section label={L.experience}>
          {cv.experience.map((e) => (
            <View key={e.period} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <Text style={s.title}>{e.title.toUpperCase()}</Text>
                <Text style={s.period}>{e.period}</Text>
              </View>
              <Text style={s.sub}>{e.company.toUpperCase()}</Text>
              <Bullets items={e.bullets} />
            </View>
          ))}
        </Section>

        <Section label={L.products} note={L.productsNote}>
          {cv.products.map((p) => (
            <View key={p.name} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <Text style={s.title}>{p.name.toUpperCase()}</Text>
                <Text style={s.status}>{p.status.toUpperCase()}</Text>
              </View>
              <Text style={s.sub}>{p.url.toUpperCase()}</Text>
              <Bullets items={p.bullets} />
            </View>
          ))}
        </Section>

        <Section label={L.education}>
          {cv.education.map((e) => (
            <View key={e.title} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <Text style={[s.title, { fontSize: 10.8 }]}>{e.title.toUpperCase()}</Text>
                <Text style={s.period}>{e.period}</Text>
              </View>
              <Text style={s.sub}>{e.school.toUpperCase()}</Text>
            </View>
          ))}
        </Section>

        <Section label={L.languages} last keep>
          <View style={s.langs}>
            {cv.languages.map((l) => (
              <View key={l.name} style={s.lang}>
                <Text style={s.langName}>{l.name}</Text>
                <Text style={s.langLevel}>{l.level}</Text>
              </View>
            ))}
          </View>
        </Section>

        <View style={s.footer} fixed>
          <Text>Iver Bohnes ({cv.formerName}) — {lang === 'de' ? 'Lebenslauf' : 'Curriculum vitae'}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
