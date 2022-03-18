import * as translations from '../../../translations';

const getTranslation = (value, language = 'it') => {
  const keys = value.split('.');

  return keys.reduce((obj, key) => obj?.[key], translations[language]);
};

// eslint-disable-next-line import/prefer-default-export
export { getTranslation };
