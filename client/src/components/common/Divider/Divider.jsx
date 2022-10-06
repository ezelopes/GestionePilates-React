import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component used to add empty spaces to grids with four columns.
 */
const Divider = ({ half = false }) => (
  <>
    <div style={{ marginTop: '1em' }} />
    <div style={{ marginTop: '1em' }} />
    {!half && (
      <>
        <div />
        <div />
      </>
    )}
  </>
);

Divider.propTypes = {
  half: PropTypes.bool,
};

Divider.defaultProps = {
  half: false,
};

export default Divider;
