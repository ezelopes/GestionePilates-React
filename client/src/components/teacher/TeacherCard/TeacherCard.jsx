import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { TeacherProvider } from '../TeacherContext';
import Translation from '../../common/Translation';

import { deleteTeacher } from '../../../helpers/apiCalls';
import { printTeacherRegistrationForm } from '../../../helpers/printPDF';
import toastConfig from '../../../commondata/toast.config';

import './teacher-card.css';
import UpdateTeacherModal from '../UpdateTeacherModal/UpdateTeacherModal';
import DeleteTeacherModal from '../DeleteTeacherModal';

const TeacherCard = ({ teacherInitialInfo, teachersList, setTeachersList }) => {
  const [teacherInfo, setTeacherInfo] = useState(teacherInitialInfo);
  const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
  const [showDeleteTeacherModal, setShowDeleteTeacherModal] = useState(false);

  const handleTeacherDeletion = async () => {
    const response = await deleteTeacher(teacherInfo.TeacherID);

    if (response.status === 200) {
      const updatedTeacherList = [...teachersList];
      const receiptIndex = teachersList.findIndex((teacher) => teacher.TeacherID === teacherInfo.TeacherID);

      updatedTeacherList.splice(receiptIndex, 1);

      toast.success(response.message, toastConfig);
      setTeachersList(updatedTeacherList);
    } else {
      toast.error(response.message, toastConfig);
    }

    setShowDeleteTeacherModal(false);
  };

  return (
    <TeacherProvider teacherInfo={teacherInfo} setTeacherInfo={setTeacherInfo}>
      <Card className="teacher-card">
        <Card.Body>
          <Card.Title>
            <b>
              {teacherInfo.Name} {teacherInfo.Surname}
            </b>
          </Card.Title>
          <Card.Text>
            <b>
              <Translation value="form.taxCode" />
            </b>
            {teacherInfo.TaxCode}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.cityAndAddress" />
            </b>
            {teacherInfo.City} - {teacherInfo.Address}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.phone" />
            </b>
            {teacherInfo.MobilePhone}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.email" />
            </b>
            {teacherInfo.Email}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.placeAndDOB" />
            </b>
            {teacherInfo.BirthPlace} -&nbsp;
            {teacherInfo.DOB !== null ? new Date(teacherInfo.DOB).toLocaleDateString() : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.registrationDate" />
            </b>
            {teacherInfo.RegistrationDate !== null ? new Date(teacherInfo.RegistrationDate).toLocaleDateString() : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.school" />
            </b>
            {teacherInfo.School}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.discipline" />
            </b>
            {teacherInfo.Discipline}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.course" />
            </b>
            {teacherInfo.Course}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.certificateExpirationDate" />
            </b>
            {teacherInfo.CertificateExpirationDate !== null ? (
              new Date(teacherInfo.CertificateExpirationDate).toLocaleDateString()
            ) : (
              <Translation value="common.undefined" />
            )}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.greenPassExpirationDate" />
            </b>
            {teacherInfo.GreenPassExpirationDate !== null ? (
              new Date(teacherInfo.GreenPassExpirationDate).toLocaleDateString()
            ) : (
              <Translation value="common.undefined" />
            )}
          </Card.Text>

          <div className="buttons-container">
            <Button variant="success" onClick={() => printTeacherRegistrationForm(teacherInfo)}>
              <span role="img" aria-label="module">
                🖨️ <Translation value="buttons.teacher.printTeacherRegistrationForm" />
              </span>
            </Button>
            <Button variant="primary" onClick={() => setShowUpdateTeacherModal(true)}>
              <span role="img" aria-label="update">
                🔄 <Translation value="buttons.teacher.updateTeacher" />
              </span>
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteTeacherModal(true)}>
              <span role="img" aria-label="bin">
                🗑️ <Translation value="buttons.teacher.deleteTeacher" />
              </span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <UpdateTeacherModal isOpen={showUpdateTeacherModal} closeModal={() => setShowUpdateTeacherModal(false)} />

      <DeleteTeacherModal
        isOpen={showDeleteTeacherModal}
        closeModal={() => setShowDeleteTeacherModal(false)}
        handleTeacherDeletion={handleTeacherDeletion}
      />
    </TeacherProvider>
  );
};

TeacherCard.propTypes = {
  teacherInitialInfo: PropTypes.object.isRequired,
  teachersList: PropTypes.array.isRequired,
  setTeachersList: PropTypes.func.isRequired,
};

export default TeacherCard;
