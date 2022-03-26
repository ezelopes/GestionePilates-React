import { useMemo, useState } from 'react';

import { getTranslation, replaceTranslation } from './helpers';

const useTranslation = (value, replace) => {
  const [language, setLanguage] = useState('it');

  const translation = useMemo(() => {
    const string = getTranslation(value, language);

    return string;
  }, [value, language]);

  if (!translation) {
    return null;
  }

  return {
    // Language,
    // fallbackLanguage,
    // setFallbackLanguage,
    setLanguage,
    translation: replace ? replaceTranslation(translation, replace) : translation,
  };
};

export default useTranslation;
