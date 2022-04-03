import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useReceipt } from '../ReceiptContext';

import Translation from '../../common/Translation';
import { printExpiringStudents } from '../../../helpers/printPDF';
import { years } from '../../../commondata';

import './print-expiring-receipts-form.css';

const PrintExpiringReceiptsForm = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { currentReceipts } = useReceipt();

  return (
    <div className="print-receipt-form">
      <Form.Label>
        <Translation value="common.year" />
      </Form.Label>
      <Form.Control
        as="select"
        defaultValue={selectedYear}
        onChange={({ target }) => {
          setSelectedYear(parseInt(target.value, 10));
        }}
      >
        {years.map((year) => (
          <option key={`select_${year.id}`} value={year.id}>
            {year.year}
          </option>
        ))}
      </Form.Control>

      <Button variant="success" onClick={() => printExpiringStudents(currentReceipts, selectedYear)}>
        <span role="img" aria-label="print-selected">
          🖨️ <Translation value="buttons.student.printExpiringStudents" />
        </span>
      </Button>
    </div>
  );
};

export default PrintExpiringReceiptsForm;
