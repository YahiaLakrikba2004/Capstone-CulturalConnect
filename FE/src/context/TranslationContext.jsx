import React, { createContext, useContext, useState } from 'react';
import { translations } from '../translation'; // Assicurati che questo import sia corretto

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translate = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result[k] === undefined) return key; // Ritorna la chiave se non trovato
      result = result[k];
    }
    return result;
  };

  return (
    <TranslationContext.Provider value={{ translate, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
