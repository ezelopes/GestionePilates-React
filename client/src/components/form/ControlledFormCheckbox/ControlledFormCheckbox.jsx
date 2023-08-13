import React from 'react';
import PropTypes from 'prop-types';

import { isFunction } from 'is-what';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

const ControlledFormCheckbox = ({ name, rules = undefined, defaultValue = false, onChange = null, label, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange: renderOnChange, ...renderFieldProps } }) => (
        <Form.Check
          label={label}
          type="checkbox"
          checked={!!value}
          onChange={(e) => {
            renderOnChange(e.target.checked);

            if (isFunction(onChange)) {
              onChange();
            }
          }}
          {...props}
          {...renderFieldProps}
        />
      )}
    />
  );
};

ControlledFormCheckbox.propTypes = {
  /**
   * Input name.
   */
  name: PropTypes.string.isRequired,
  /**
   * Validation rules.
   */
  rules: PropTypes.object,
  /**
   * Optional default input value when it's `undefined` or `null`.
   */
  defaultValue: PropTypes.bool,
  /**
   * Optional on change callback. If passed, the on change callback will receive the current
   * field state and form state.
   */
  onChange: PropTypes.func,
  /**
   * Optional label for the form field.
   */
  label: PropTypes.node,
};

ControlledFormCheckbox.defaultProps = {
  rules: undefined,
  defaultValue: false,
  onChange: undefined,
  label: undefined,
};

export default ControlledFormCheckbox;
