import { useState } from 'react';

import { getTranslation } from './helpers';

const useTranslation = () => {
  const [language, setLanguage] = useState('it');

  const translate = (value) => getTranslation(value, language) ?? value;

  return {
    // Language,
    // fallbackLanguage,
    // setFallbackLanguage,
    setLanguage,
    translate,
  };
};

export default useTranslation;
