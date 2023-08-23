import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { isFunction } from 'is-what';
import { Form } from 'react-bootstrap';

const ControlledFormCreatableSelectField = ({ name, rules, defaultValue, onChange, label, options, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange: renderOnChange, ...renderFieldProps } }) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <CreatableSelect
            {...renderFieldProps}
            {...props}
            options={options}
            value={{ value, label: value }}
            onChange={(selectedOption) => {
              renderOnChange(selectedOption?.value || null);

              if (isFunction(onChange)) {
                onChange(selectedOption?.value || null);
              }
            }}
          />
        </Form.Group>
      )}
    />
  );
};

ControlledFormCreatableSelectField.propTypes = {
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
  defaultValue: PropTypes.string,
  /**
   * Optional on change callback. If passed, the on change callback will receive the current
   * field state and form state.
   */
  onChange: PropTypes.func,
  /**
   * Dropdown options.
   */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Optional label for the form field.
   */
  label: PropTypes.node,
};

ControlledFormCreatableSelectField.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  onChange: undefined,
  label: undefined,
};

export default ControlledFormCreatableSelectField;
