import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useStudent } from '../StudentContext';
import { printRegistrationForm } from '../../../helpers/printPDF';
import Translation from '../../common/Translation';
import UpdateRegistrationDateModal from '../UpdateRegistrationDateModal';
import UpdateStudentModal from '../UpdateStudentModal';
import DeleteStudentModal from '../DeleteStudentModal';

import { updateRegistrationDate } from '../../../helpers/apiCalls';

import toastConfig from '../../../commondata/toast.config';

import './student-card.css';
import { useToggle } from '../../common/useToggle';

const StudentCard = () => {
  const history = useHistory();
  const { studentInfo, setStudentInfo, newRegistrationDate } = useStudent();

  const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
  const [showRegistrationDateModal, setShowRegistrationDateModal] = useState(false);

  const [showDeleteStudentModal, toggleShowDeleteStudentModal] = useToggle();

  const handleRegistrationDateUpdate = async () => {
    const response = await updateRegistrationDate(studentInfo.StudentID, newRegistrationDate);

    if (response.status === 200) {
      setStudentInfo(response.updatedStudent);

      // RefetchStudent();

      toast.success(response.message, toastConfig);
    } else {
      toast.error(response.message, toastConfig);
    }
    setShowRegistrationDateModal(false);
  };

  return (
    <div className="student-name-title">
      <div>
        {studentInfo.Name} {studentInfo.Surname}
      </div>

      <div className="buttons-container student-card-button">
        <Button onClick={() => printRegistrationForm(studentInfo)}>
          <span role="img" aria-label="module">
            🖨️ <Translation value="buttons.student.printRegistrationForm" />
          </span>
        </Button>

        <Button variant="warning" onClick={() => setShowUpdateStudentModal(true)}>
          <span role="img" aria-label="update">
            🔄 <Translation value="buttons.student.updateStudent" />
          </span>
        </Button>

        <Button variant="warning" onClick={() => setShowRegistrationDateModal(true)}>
          <span role="img" aria-label="update">
            🔄 <Translation value="buttons.student.updateRegistrationDate" />
          </span>
        </Button>

        <Button variant="danger" onClick={() => toggleShowDeleteStudentModal()}>
          <span role="img" aria-label="bin">
            🗑️ <Translation value="buttons.student.deleteStudent" />
          </span>
        </Button>
      </div>

      <UpdateStudentModal isOpen={showUpdateStudentModal} closeModal={() => setShowUpdateStudentModal(false)} />

      <UpdateRegistrationDateModal
        isOpen={showRegistrationDateModal}
        closeModal={() => setShowRegistrationDateModal(false)}
        handleRegistrationDateUpdate={handleRegistrationDateUpdate}
      />

      <DeleteStudentModal
        id={studentInfo.StudentID}
        isOpen={showDeleteStudentModal}
        onClose={() => toggleShowDeleteStudentModal()}
        onDeleteCallback={() => history.push('/students')}
      />
    </div>
  );
};

export default StudentCard;
