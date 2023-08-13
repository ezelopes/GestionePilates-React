import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';

import { Form } from 'react-bootstrap';
import { isFunction } from 'is-what';

/**
 * Controlled form text field.
 */
const ControlledFormTextField = ({ name, rules, defaultValue, onChange, label, errors, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange: renderOnChange, ...renderFieldProps } }) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            {...renderFieldProps}
            {...props}
            type="text"
            defaultValue={defaultValue}
            onChange={(e) => {
              renderOnChange(e);

              if (isFunction(onChange)) {
                onChange();
              }
            }}
          />
          {errors[name]?.message && <Form.Text className="text-danger font-weight-bold">{errors[name]?.message}</Form.Text>}
        </Form.Group>
      )}
    />
  );
};

ControlledFormTextField.propTypes = {
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Optional on change callback. If passed, the on change callback will receive the current
   * field state and form state.
   */
  onChange: PropTypes.func,
  /**
   * Optional label for the form field.
   */
  label: PropTypes.node,
  /**
   * Optional label for the form field.
   */
  errors: PropTypes.object,
};

ControlledFormTextField.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  onChange: undefined,
  label: undefined,
  errors: undefined,
};

export default ControlledFormTextField;
