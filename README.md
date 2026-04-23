# Iver Gentz — Portfolio

Personal portfolio site. Built with Create React App, styled-components, and React Router.

## Stack

- **Create React App** (react-scripts 5)
- **React 18** + **React Router 6**
- **styled-components 6** (alle Styles im Code, keine CSS-Dateien)
- **Google Fonts** — Instrument Serif, Inter, JetBrains Mono
- **Kein Tracking**, keine Cookies

## Struktur

```
public/
├── index.html             SEO-Metas, Open Graph, robots, canonical
├── robots.txt             index, follow
├── sitemap.xml
├── manifest.json
├── images/                RankBrief, S&I. Wedding, WERKRUF, Portrait
└── documents/
    └── cv-iver-gentz.pdf

src/
├── App.js                 Routen + ThemeProvider + LanguageProvider
├── index.js
├── i18n/
│   ├── dict.js            DE/EN Texte
│   └── LanguageContext.js
├── styles/
│   ├── theme.js           Design-Tokens (Farben, Fonts, Breakpoints)
│   └── GlobalStyle.js
├── components/
│   ├── Nav.js
│   ├── Footer.js
│   ├── Link.js            Animated underline link
│   ├── Reveal.js          IntersectionObserver fade-in
│   └── sections/
│       ├── Hero.js
│       ├── Positioning.js
│       ├── Products.js
│       ├── Clients.js
│       ├── Stations.js
│       ├── Principles.js
│       └── Contact.js
└── pages/
    ├── Home.js            Alle Sections zusammen
    ├── Impressum.js
    └── Datenschutz.js
```

## Development

```bash
npm install
npm start
```

Lokale Entwicklung unter http://localhost:3000

## Build

```bash
npm run build
```

Produziert optimierte Dateien in `/build`.

## Deployment (Vercel)

1. Neues Projekt in Vercel anlegen, GitHub-Repo verbinden
2. Framework Preset: **Create React App** (wird automatisch erkannt)
3. Build Command: `npm run build` (Default)
4. Output Directory: `build` (Default)
5. Root Directory: `/`
6. Deploy

Die `vercel.json` kümmert sich um SPA-Rewrites und Security-Header. Impressum
und Datenschutz sind dadurch direkt per URL erreichbar.

## Domain

- Vorgesehen: **ivergentz.de**
- Canonical-URL in `public/index.html` und `public/sitemap.xml` ist darauf gesetzt.
- Wenn die Domain wechselt, diese beiden Stellen anpassen.

## Accessibility

- Semantisches HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- Richtige H1-H2-H3-Hierarchie (eine H1 auf Home, H2 pro Section, H3 pro Produkt/Prinzip)
- aria-labelledby für Section-Headlines
- Focus-visible Outlines
- `prefers-reduced-motion` wird respektiert
- Farbkontrast WCAG AA auf allen Texten

## Sprachen

DE (primär) / EN via Toggle oben rechts. Gespeichert im React-State (kein
localStorage, da Cookies/Storage bewusst nicht genutzt werden).

`<html lang>` wird auf die aktuelle Sprache gesetzt.

## SEO

- Title, Description, Open Graph, Twitter Cards in `public/index.html`
- Canonical URL
- Sitemap unter `/sitemap.xml`
- robots.txt: `index, follow`
- Keine noindex-Direktiven

## Anpassungen

- **CV austauschen:** `public/documents/cv-iver-gentz.pdf` ersetzen
- **Screenshots austauschen:** `public/images/rankbrief.png`, `sarahiver.png`,
  `werkruf.png` — gleiche Dateinamen, 16:10 optimal
- **Portrait austauschen:** `public/images/portrait.png` (wird nur als OG-Image genutzt)
- **Texte ändern:** `src/i18n/dict.js` — alle Strings zentral an einem Ort
- **Farben/Fonts:** `src/styles/theme.js`
```
