import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import UpdateTeacherButton from './UpdateTeacherButton';
import DeleteTeacherButton from './DeleteTeacherButton';

import Translation from '../../common/Translation';

import { printTeacherRegistrationForm } from '../../../helpers/printPDF';

import './teacher-card.css';
import TeacherCardDetails from '../TeacherCardDetails/TeacherCardDetails';

const TeacherCard = ({ teacherInitialInfo, removeTeacherByIdFromList }) => {
  const [teacherInfo, setTeacherInfo] = useState(teacherInitialInfo);

  const onTeacherUpdate = (newTeacherInfo) => {
    setTeacherInfo(newTeacherInfo);
  };

  return (
    <>
      <Card className="teacher-card">
        <Card.Body>
          <TeacherCardDetails teacherInfo={teacherInfo} />

          <div className="buttons-container">
            <Button variant="success" onClick={() => printTeacherRegistrationForm(teacherInfo)}>
              <span role="img" aria-label="module">
                🖨️ <Translation value="buttons.teacher.printTeacherRegistrationForm" />
              </span>
            </Button>

            <UpdateTeacherButton defaultValues={teacherInfo} onUpdate={onTeacherUpdate} />

            <DeleteTeacherButton teacherInfo={teacherInfo} onDelete={removeTeacherByIdFromList} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

TeacherCard.propTypes = {
  teacherInitialInfo: PropTypes.object.isRequired,
  removeTeacherByIdFromList: PropTypes.func.isRequired,
};

export default TeacherCard;
