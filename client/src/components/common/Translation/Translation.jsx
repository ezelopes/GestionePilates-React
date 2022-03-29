import React from 'react';
import PropTypes from 'prop-types';

import useTranslation from './useTranslation';

const HTML_TRANSLATION_REGEX = /[&#<>]/;

const Literal = ({ children }) => {
  if (HTML_TRANSLATION_REGEX.test(children)) {
    // eslint-disable-next-line react/no-danger
    return <span style={{ display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: children }} />;
  }

  return children;
};

Literal.propTypes = {
  /**
   * Anything to render which may or may not be a string containing HTML.
   */
  children: PropTypes.node.isRequired,
};

const Translation = ({ value, replace }) => {
  const { translation } = useTranslation(value, replace);

  return <Literal>{translation}</Literal>;
};

Translation.propTypes = {
  value: PropTypes.string.isRequired,
  replace: PropTypes.object,
};

Translation.defaultProps = {
  replace: {},
};

export default Translation;
