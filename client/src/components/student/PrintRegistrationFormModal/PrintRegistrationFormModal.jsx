import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'react-bootstrap';

import { useStudent } from '../StudentContext';

import Translation from '../../common/Translation';

import {
  printDanceRegistrationFormOsio,
  printDanceRegistrationFormStezzano,
  printFitnessRegistrationForm,
} from '../../../helpers/printPDF';

const PrintRegistrationFormModal = ({ isOpen, onClose }) => {
  const { studentInfo } = useStudent();

  return (
    <Modal show={isOpen} onHide={onClose} dialogClassName="update-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.printRegistrationFormHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="buttons-container mt-0 justify-content-center">
        <Button
          onClick={() => {
            printFitnessRegistrationForm(studentInfo);

            onClose();
          }}
        >
          <span role="img" aria-label="module">
            🖨️ <Translation value="buttons.student.printFitnessRegistrationForm" />
          </span>
        </Button>

        <Button
          onClick={() => {
            printDanceRegistrationFormOsio(studentInfo);

            onClose();
          }}
        >
          <span role="img" aria-label="module">
            🖨️ <Translation value="buttons.student.printDanceRegistrationFormOsio" />
          </span>
        </Button>

        <Button
          onClick={() => {
            printDanceRegistrationFormStezzano(studentInfo);

            onClose();
          }}
        >
          <span role="img" aria-label="module">
            🖨️ <Translation value="buttons.student.printDanceRegistrationFormStezzano" />
          </span>
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PrintRegistrationFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PrintRegistrationFormModal;
