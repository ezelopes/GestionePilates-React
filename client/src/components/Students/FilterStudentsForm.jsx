import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import Translation from '../common/Translation/Translation';
import { getTranslation } from '../common/Translation/helpers';

import { ages } from '../../commondata';

const dropdownAges = [null, ages[0].age, ages[1].age];

const FilterStudentsForm = ({ filterColumn, clearColumns }) => {
  const filterNameRef = useRef();
  const filterSurnameRef = useRef();
  const filterCityRef = useRef();
  const filterAgeRef = useRef();

  const clearFilters = () => {
    filterNameRef.current.value = null;
    filterSurnameRef.current.value = null;
    filterCityRef.current.value = null;
    filterAgeRef.current.value = null;

    clearColumns(['Name', 'Surname', 'City', 'IsAdult']);
  };

  return (
    <div className="filter-form">
      <Form.Group>
        <Form.Label>
          <Translation value="form.studentName" />
        </Form.Label>
        <Form.Control
          ref={filterNameRef}
          type="text"
          placeholder={getTranslation('placeholder.name')}
          onChange={(e) => {
            filterColumn('Name', e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          <Translation value="form.studentSurname" />
        </Form.Label>
        <Form.Control
          ref={filterSurnameRef}
          type="text"
          placeholder={getTranslation('placeholder.surname')}
          onChange={(e) => {
            filterColumn('Surname', e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          <Translation value="form.city" />
        </Form.Label>
        <Form.Control
          ref={filterCityRef}
          type="text"
          placeholder={getTranslation('placeholder.city')}
          onChange={(e) => {
            filterColumn('City', e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          <Translation value="form.age" />
        </Form.Label>
        <Form.Control
          ref={filterAgeRef}
          as="select"
          onChange={({ target }) => {
            filterColumn('IsAdult', target.value);
          }}
        >
          {dropdownAges.map((age) => (
            <option key={`select_${age}`} value={age}>
              {age}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="danger" onClick={clearFilters} style={{ marginTop: '1em' }}>
        <Translation value="buttons.removeFilters" />
      </Button>
    </div>
  );
};

FilterStudentsForm.propTypes = {
  filterColumn: PropTypes.func.isRequired,
  clearColumns: PropTypes.func.isRequired,
};

export default FilterStudentsForm;
