import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import CV from './pages/CV';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Bei Hash-Links nicht zum Top springen — den Hash-Anker anscrollen
    if (hash) {
      const id = hash.replace('#', '');
      // Kurz warten, bis Section im DOM ist
      const scrollToAnchor = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      };
      // requestAnimationFrame + kleines timeout stellt sicher, dass DOM bereit ist
      requestAnimationFrame(() => {
        setTimeout(scrollToAnchor, 50);
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

function TitleSync() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      document.title =
        lang === 'de'
          ? 'Iver Gentz — Product Builder mit Architekturverständnis'
          : "Iver Gentz — Product Builder with an Architect's Eye";
    }
  }, [lang, pathname]);

  return null;
}

function Shell() {
  return (
    <>
      <ScrollToTop />
      <TitleSync />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LanguageProvider>
        <Shell />
      </LanguageProvider>
    </ThemeProvider>
  );
}
