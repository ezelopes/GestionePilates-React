import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import Translation from '../common/Translation/Translation';
import { printStudentsWithExpiringGreenPass, printStudentsBasedOnRegistrationDate } from '../../helpers/printPDF';

import { months, years } from '../../commondata';

const PrintStudentsForm = ({ students }) => {
  const [selectedMonth, setselectedMonth] = useState(months[0].id);
  const [selectedYearGreenPass, setSelectedYearGreenPass] = useState(years[0].id);

  return (
    <div className="form-wrapper">
      <Form.Group>
        <Form.Text as="h5">
          <Translation value="common.printStudentsFormTitle" />
        </Form.Text>
      </Form.Group>
      <div className="green-pass-form">
        <Form.Group>
          <Form.Label>
            <Translation value="common.month" />
          </Form.Label>
          <Form.Control
            as="select"
            onChange={({ target }) => {
              setselectedMonth(parseInt(target.value, 10));
            }}
          >
            {months.map((month) => (
              <option key={`select_${month.id}`} value={month.id}>
                {month.month}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <Translation value="common.year" />
          </Form.Label>
          <Form.Control
            as="select"
            onChange={({ target }) => {
              setSelectedYearGreenPass(parseInt(target.value, 10));
            }}
          >
            {years.map((year) => (
              <option key={`select_${year.id}`} value={year.id}>
                {year.year}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          variant="success"
          onClick={() => printStudentsWithExpiringGreenPass(students, selectedMonth, selectedYearGreenPass)}
          style={{ marginTop: '1em' }}
        >
          🖨️ <Translation value="buttons.student.printExpiringGreenPass" />
        </Button>
        <Button
          variant="success"
          onClick={() => printStudentsBasedOnRegistrationDate(students, selectedMonth, selectedYearGreenPass)}
          style={{ marginTop: '1em' }}
        >
          🖨️ <Translation value="buttons.student.printExpiringRegistrationDate" />
        </Button>
      </div>
    </div>
  );
};

PrintStudentsForm.propTypes = {
  students: PropTypes.array.isRequired,
};

export default PrintStudentsForm;
