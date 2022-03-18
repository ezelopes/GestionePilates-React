// Import { useState } from 'react';
import * as translations from '../../../translations';

function getNestedTranslation(language, keys) {
  return keys.reduce((obj, key) => obj?.[key], translations[language]);
}

const useTranslation = () => {
  // Const [language, setLanguage] = useState('it');
  // const [fallbackLanguage, setFallbackLanguage] = useState('it');

  const language = 'it';
  const fallbackLanguage = 'it';

  const translate = (key) => {
    const keys = key.split('.');

    return getNestedTranslation(language, keys) ?? getNestedTranslation(fallbackLanguage, keys) ?? key;
  };

  return {
    // Language,
    // setLanguage,
    // fallbackLanguage,
    // setFallbackLanguage,
    translate,
  };
};

export default useTranslation;
