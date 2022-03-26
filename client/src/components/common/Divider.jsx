import React from 'react';
import PropTypes from 'prop-types';

// TODO: FIND A BETTER WAY FOR THIS

const Divider = ({ half = false, single = false, double = false }) => {
  if (single) {
    return <div style={{ marginTop: '1em' }} />;
  }

  if (double) {
    return <div style={{ marginTop: '2em' }} />;
  }

  return (
    <>
      <div style={{ marginTop: '1em' }} />
      <div style={{ marginTop: '1em' }} />
      {!half ? (
        <>
          <div style={{ marginTop: '1em' }} />
          <div style={{ marginTop: '1em' }} />
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

Divider.propTypes = {
  half: PropTypes.bool,
  single: PropTypes.bool,
  double: PropTypes.bool,
};

Divider.defaultProps = {
  half: false,
  single: false,
  double: false,
};

export default Divider;
