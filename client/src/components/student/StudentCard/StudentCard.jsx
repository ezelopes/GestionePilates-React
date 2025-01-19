import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStudent } from '../StudentContext';
import UpdateRegistrationDateModal from '../UpdateRegistrationDateModal';
import UpdateStudentModal from '../UpdateStudentModal';
import DeleteStudentModal from '../DeleteStudentModal';

import Translation from '../../common/Translation';
import { useToggle } from '../../common/useToggle';

import './student-card.css';
import PrintRegistrationFormModal from '../PrintRegistrationFormModal';

const StudentCard = () => {
  const history = useHistory();

  const { studentInfo, setStudentInfo } = useStudent();

  const [showPrintRegistrationFormModal, toggleShowPrintRegistrationFormModal] = useToggle();

  const [showUpdateStudentModal, toggleShowUpdateStudentModal] = useToggle();

  const [showRegistrationDateModal, toggleShowRegistrationDateModal] = useToggle();

  const [showDeleteStudentModal, toggleShowDeleteStudentModal] = useToggle();

  const onStudentUpdate = (newStudentInfo) => {
    setStudentInfo(newStudentInfo);
  };

  const onRegistrationDateUpdate = async (newStudentRegistrationDate) => {
    setStudentInfo((currentStudentInfo) => ({ ...currentStudentInfo, RegistrationDate: newStudentRegistrationDate }));
  };

  return (
    <div className="student-name-title">
      <div>
        {studentInfo.Name} {studentInfo.Surname}
      </div>

      <div className="buttons-container student-card-button">
        <Button onClick={toggleShowPrintRegistrationFormModal}>
          <span role="img" aria-label="module">
            🖨️ <Translation value="buttons.student.printRegistrationForm" />
          </span>
        </Button>

        <Button variant="warning" onClick={toggleShowUpdateStudentModal}>
          <span role="img" aria-label="update">
            🔄 <Translation value="buttons.student.updateStudent" />
          </span>
        </Button>

        <Button variant="warning" onClick={toggleShowRegistrationDateModal}>
          <span role="img" aria-label="update">
            🔄 <Translation value="buttons.student.updateRegistrationDate" />
          </span>
        </Button>

        <Button variant="danger" onClick={toggleShowDeleteStudentModal}>
          <span role="img" aria-label="bin">
            🗑️ <Translation value="buttons.student.deleteStudent" />
          </span>
        </Button>
      </div>

      <PrintRegistrationFormModal isOpen={showPrintRegistrationFormModal} onClose={toggleShowPrintRegistrationFormModal} />

      <UpdateStudentModal
        defaultValues={studentInfo}
        isOpen={showUpdateStudentModal}
        onClose={toggleShowUpdateStudentModal}
        onUpdate={onStudentUpdate}
      />

      <UpdateRegistrationDateModal
        id={studentInfo.StudentID}
        defaultValue={studentInfo?.RegistrationDate}
        isOpen={showRegistrationDateModal}
        onClose={toggleShowRegistrationDateModal}
        onUpdate={onRegistrationDateUpdate}
      />

      <DeleteStudentModal
        id={studentInfo.StudentID}
        isOpen={showDeleteStudentModal}
        onClose={toggleShowDeleteStudentModal}
        onDelete={() => history.push('/students')}
      />
    </div>
  );
};

export default StudentCard;
