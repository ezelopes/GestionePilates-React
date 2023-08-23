import React from 'react';
import PropTypes from 'prop-types';

import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { isFunction } from 'is-what';
import { Form } from 'react-bootstrap';

const ControlledFormCreatableSelectField = ({ name, rules, defaultValue, onChange, label, options, ...props }) => {
  const { control } = useFormContext();

  const defaultValuesComputed = defaultValue.map((value) => ({ value, label: value }));

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValuesComputed}
      render={({ field: { onChange: renderOnChange, ...renderFieldProps } }) => (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Select
            {...props}
            {...renderFieldProps}
            isMulti
            options={options}
            onChange={(selectedOption) => {
              renderOnChange(selectedOption);

              if (isFunction(onChange)) {
                onChange(selectedOption.map(({ value }) => value));
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
   * Optional default values of multiple items.
   */
  defaultValue: PropTypes.array,
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
