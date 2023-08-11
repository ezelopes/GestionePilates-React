import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';

import { Form } from 'react-bootstrap';
import { isFunction } from 'is-what';

/**
 * Controlled form text field.
 */
const ControlledFormDateField = ({ name, rules, defaultValue, onChange, label, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue === undefined ? null : defaultValue}
      rules={rules}
      render={({ field: { onChange: renderOnChange, ...renderFieldProps } }) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            {...renderFieldProps}
            {...props}
            type="date"
            defaultValue={defaultValue}
            onChange={(e) => {
              renderOnChange(e);

              if (isFunction(onChange)) {
                onChange();
              }
            }}
          />
        </Form.Group>
      )}
    />
  );
};

ControlledFormDateField.propTypes = {
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
};

ControlledFormDateField.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  onChange: undefined,
  label: undefined,
};

export default ControlledFormDateField;
