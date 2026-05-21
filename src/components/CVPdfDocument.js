import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';

/**
 * CVPdfDocument — A4 PDF that mirrors the on-screen CV in the Lime world.
 *
 * Design constraints:
 *   - @react-pdf/renderer uses its own layout engine (not the browser),
 *     so styles are inline only, no media queries, no clamp(), no shorthand.
 *   - We register web fonts but fall back to built-in Helvetica for safety
 *     since some PDF viewers don't ship serif fonts.
 *   - The accent system: lime-tinted section labels, dark ink for everything
 *     else. Hairlines for separation. No coloured backgrounds — keeps the
 *     PDF print-friendly and email-safe.
 */

const LIME = '#C8FF1A';
const INK = '#0A0A0A';
const FG = '#141414';
const MUTED = '#6B6B66';
const HAIRLINE = '#D6D4CC';
const CREAM = '#F1ECE0';

const styles = StyleSheet.create({
  page: {
    backgroundColor: CREAM,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: FG,
    lineHeight: 1.5,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    marginBottom: 18,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontFamily: 'Times-Roman',
    fontSize: 38,
    color: INK,
    marginBottom: 4,
  },
  role: {
    fontFamily: 'Times-Italic',
    fontSize: 14,
    color: FG,
    marginBottom: 12,
  },
  roleHl: {
    backgroundColor: LIME,
    color: INK,
    padding: 2,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 8.5,
    color: MUTED,
    fontFamily: 'Courier',
  },
  metaItem: {
    marginRight: 10,
  },
  metaSep: {
    color: INK,
    marginRight: 10,
  },
  photoBox: {
    width: 80,
    height: 100,
    borderWidth: 0.5,
    borderColor: HAIRLINE,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  /* Tagline */
  tagline: {
    fontFamily: 'Times-Italic',
    fontSize: 12,
    color: FG,
    marginBottom: 22,
    lineHeight: 1.4,
    maxWidth: 460,
  },

  /* Section */
  section: {
    marginBottom: 20,
  },
  sectionLabelWrap: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sectionLabel: {
    fontFamily: 'Courier-Bold',
    fontSize: 8,
    color: INK,
    backgroundColor: LIME,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    letterSpacing: 1.5,
  },

  /* Row */
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  period: {
    width: 100,
    fontFamily: 'Courier',
    fontSize: 8.5,
    color: MUTED,
    paddingTop: 1,
  },
  periodStatus: {
    color: MUTED,
    fontFamily: 'Courier',
    fontSize: 8,
    marginTop: 1,
  },
  body: {
    flex: 1,
  },
  title: {
    fontFamily: 'Times-Roman',
    fontSize: 13,
    color: FG,
    marginBottom: 1,
  },
  productName: {
    fontFamily: 'Times-Roman',
    fontSize: 15,
    color: INK,
    marginBottom: 2,
  },
  productUrlWrap: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  productUrl: {
    fontFamily: 'Courier',
    fontSize: 8,
    color: INK,
    backgroundColor: LIME,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  company: {
    fontSize: 9.5,
    color: MUTED,
    marginBottom: 5,
  },
  bulletList: {
    marginTop: 2,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletMark: {
    width: 10,
    color: INK,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: FG,
  },
  stack: {
    fontFamily: 'Courier',
    fontSize: 7.5,
    color: MUTED,
    marginTop: 4,
  },

  /* Education shows smaller title */
  eduTitle: {
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: FG,
  },
  eduSchool: {
    fontSize: 8.5,
    color: MUTED,
  },

  /* Skills grid (use absolute three-column layout) */
  skillsGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  skillCol: {
    flex: 1,
  },
  skillLabel: {
    fontFamily: 'Courier',
    fontSize: 7,
    color: MUTED,
    marginBottom: 2,
    letterSpacing: 1,
  },
  skillItems: {
    fontSize: 9,
    color: FG,
    lineHeight: 1.4,
  },

  /* Languages */
  langGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  langItem: {
    flex: 1,
    flexDirection: 'row',
  },
  langName: {
    fontSize: 10,
    color: FG,
    marginRight: 6,
  },
  langLevel: {
    fontSize: 9.5,
    color: MUTED,
  },
});

export default function CVPdfDocument({ cv, lang }) {
  return (
    <Document
      title={lang === 'de' ? 'Lebenslauf — Iver Gentz' : 'CV — Iver Gentz'}
      author="Iver Gentz"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>Iver Gentz</Text>
            <Text style={styles.role}>
              <Text style={styles.roleHl}>{cv.role}</Text>
            </Text>
            <View style={styles.meta}>
              <Text style={styles.metaItem}>Hamburg, Deutschland</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.metaItem}>hallo@ivergentz.de</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.metaItem}>+49 176 66631237</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.metaItem}>ivergentz.de</Text>
            </View>
          </View>
        </View>

        <Text style={styles.tagline}>{cv.tagline}</Text>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionLabelWrap}>
            <Text style={styles.sectionLabel}>{cv.labels.products.toUpperCase()}</Text>
          </View>
          {cv.products.map((p, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <View style={styles.period}>
                <Text>{p.period}</Text>
                <Text style={styles.periodStatus}>{p.status}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.productName}>{p.name}</Text>
                <View style={styles.productUrlWrap}>
                  <Text style={styles.productUrl}>{p.url}</Text>
                </View>
                <View style={styles.bulletList}>
                  {p.bullets.map((b, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletMark}>—</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.stack}>{p.stack}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section} break>
          <View style={styles.sectionLabelWrap}>
            <Text style={styles.sectionLabel}>{cv.labels.experience.toUpperCase()}</Text>
          </View>
          {cv.experience.map((e, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <View style={styles.period}>
                <Text>{e.period}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>{e.title}</Text>
                <Text style={styles.company}>{e.company}</Text>
                <View style={styles.bulletList}>
                  {e.bullets.map((b, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletMark}>—</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <View style={styles.sectionLabelWrap}>
            <Text style={styles.sectionLabel}>{cv.labels.education.toUpperCase()}</Text>
          </View>
          {cv.education.map((e, i) => (
            <View key={i} style={styles.row} wrap={false}>
              <View style={styles.period}>
                <Text>{e.period}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.eduTitle}>{e.title}</Text>
                <Text style={styles.eduSchool}>{e.school}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <View style={styles.sectionLabelWrap}>
            <Text style={styles.sectionLabel}>{cv.labels.skills.toUpperCase()}</Text>
          </View>
          <View style={styles.skillsGrid}>
            {cv.skills.map((s, i) => (
              <View key={i} style={styles.skillCol}>
                <Text style={styles.skillLabel}>{s.label}</Text>
                <Text style={styles.skillItems}>{s.items}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <View style={styles.sectionLabelWrap}>
            <Text style={styles.sectionLabel}>{cv.labels.languages.toUpperCase()}</Text>
          </View>
          <View style={styles.langGrid}>
            {cv.languages.map((l, i) => (
              <View key={i} style={styles.langItem}>
                <Text style={styles.langName}>{l.name}</Text>
                <Text style={styles.langLevel}>— {l.level}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
