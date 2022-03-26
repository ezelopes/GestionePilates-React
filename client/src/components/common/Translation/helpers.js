import * as translations from '../../../translations';

const getTranslation = (value, language = 'it') => {
  const keys = value.split('.');

  return keys.reduce((obj, key) => obj?.[key], translations[language]);
};

const replaceTranslation = (translation, replace) => {
  let newTranslation = translation;

  // Replace strings and numbers
  if (replace) {
    newTranslation = Object.entries(replace).reduce(
      (accumulator, [key, value]) => accumulator.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'i'), value),
      translation
    );
  }

  return newTranslation;
};

// eslint-disable-next-line import/prefer-default-export
export { getTranslation, replaceTranslation };
