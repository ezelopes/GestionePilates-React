import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ optionOne, optionTwo, callback }) => {
  const optionOneButton = useRef();
  const optionTwoButton = useRef();

  return (
    <div className="toggle">
      <button
        ref={optionOneButton}
        type="button"
        className="toggle-option toggle-option-active"
        name={optionOne.name}
        onClick={({ target }) => {
          optionOneButton.current.className = 'toggle-option toggle-option-active';
          optionTwoButton.current.className = 'toggle-option';

          callback(target.name);
        }}
      >
        {optionOne.title}
      </button>

      <button
        ref={optionTwoButton}
        type="button"
        className="toggle-option"
        name={optionTwo.name}
        onClick={({ target }) => {
          optionOneButton.current.className = 'toggle-option';
          optionTwoButton.current.className = 'toggle-option toggle-option-active';

          callback(target.name);
        }}
      >
        {optionTwo.title}
      </button>
    </div>
  );
};

Toggle.propTypes = {
  optionOne: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  optionTwo: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Toggle;
