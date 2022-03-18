import React from 'react';
import PropTypes from 'prop-types';

import useTranslation from './useTranslation';

const Translation = ({ value }) => {
  const { translate } = useTranslation();

  return <div style={{ display: 'inline-block' }}>{translate(value)}</div>;
};

Translation.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Translation;
