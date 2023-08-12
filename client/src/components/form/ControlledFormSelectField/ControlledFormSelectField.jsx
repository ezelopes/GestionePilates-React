import React from 'react';
import PropTypes, { object } from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';

import { Form } from 'react-bootstrap';
import { isFunction } from 'is-what';

/**
 * Controlled form select field.
 */
const ControlledFormSelectField = ({ name, rules, defaultValue, onChange, label, options, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      // DefaultValue={defaultValue === undefined ? null : defaultValue}
      rules={rules}
      render={({ field: { onChange: renderOnChange, ...renderFieldProps } }) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            {...renderFieldProps}
            {...props}
            as="select"
            defaultValue={defaultValue}
            onChange={(e) => {
              renderOnChange(e);

              if (isFunction(onChange)) {
                onChange();
              }
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      )}
    />
  );
};

ControlledFormSelectField.propTypes = {
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
   * Dropdown options.
   */
  options: PropTypes.arrayOf(object).isRequired,
  /**
   * Optional label for the form field.
   */
  label: PropTypes.node,
};

ControlledFormSelectField.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  onChange: undefined,
  label: undefined,
};

export default ControlledFormSelectField;
