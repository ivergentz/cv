import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { dict } from './dict';

const LanguageContext = createContext({
  lang: 'de',
  t: dict.de,
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('de');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'de' ? 'en' : 'de'));
  }, []);

  const value = useMemo(
    () => ({
      lang,
      t: dict[lang],
      toggleLang,
    }),
    [lang, toggleLang]
  );

  // Set html lang attribute
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
