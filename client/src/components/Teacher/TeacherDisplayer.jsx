import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import CreateUpdateUserForm from '../forms/CreateUpdateUserForm';
import { TeacherProvider } from './TeacherContext';

import { updateTeacher, deleteTeacher } from '../../helpers/apiCalls';
import { printTeacherRegistrationForm } from '../../helpers/printPDF';
import toastConfig from '../../helpers/toast.config';

import Translation from '../common/Translation/Translation';
import { userType } from '../../commondata';

const TeacherDisplayer = ({ teacherInitialInfo, teachersList, setTeachersList }) => {
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
    <TeacherProvider teacherInfo={teacherInfo}>
      <Card>
        <Card.Body>
          <Card.Title>
            <b>
              {teacherInfo.Name} {teacherInfo.Surname}
            </b>
          </Card.Title>
          <Card.Text>
            <b>
              <Translation value="form.taxCode" />
              :&nbsp;
            </b>
            {teacherInfo.TaxCode}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.cityAndAddress" />
              :&nbsp;
            </b>
            {teacherInfo.City} - {teacherInfo.Address}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.phone" />
              :&nbsp;
            </b>
            {teacherInfo.MobilePhone}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.email" />
              :&nbsp;
            </b>
            {teacherInfo.Email}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.placeAndDOB" />
              :&nbsp;
            </b>
            {teacherInfo.BirthPlace} -{teacherInfo.DOB !== null ? new Date(teacherInfo.DOB).toLocaleDateString() : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.registrationDate" />
              :&nbsp;
            </b>
            {teacherInfo.RegistrationDate !== null ? new Date(teacherInfo.RegistrationDate).toLocaleDateString() : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.school" />
              :&nbsp;
            </b>
            {teacherInfo.School}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.discipline" />
              :&nbsp;
            </b>
            {teacherInfo.Discipline}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.course" />
              :&nbsp;
            </b>
            {teacherInfo.Course}
          </Card.Text>
          <Card.Text>
            <b>
              <Translation value="form.certificateExpirationDate" />
              :&nbsp;
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
              :&nbsp;
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

      <Modal
        show={showUpdateTeacherModal}
        onHide={() => setShowUpdateTeacherModal(false)}
        dialogClassName="update-teacher-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.updateTeacherHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="update-student-teacher-modal-body">
          <CreateUpdateUserForm
            personInfo={teacherInfo}
            personType={userType[1].user}
            callback={updateTeacher}
            handleModal={setShowUpdateTeacherModal}
            setUserInfo={setTeacherInfo}
          />
        </Modal.Body>
        <Modal.Footer />
      </Modal>

      <Modal show={showDeleteTeacherModal} onHide={() => setShowDeleteTeacherModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.deleteTeacherHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-student-teacher-modal-body">
          Sei sicura di voler eliminare {teacherInfo.Name} {teacherInfo.Surname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleTeacherDeletion}>
            <Translation value="buttons.teacher.deleteTeacher" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteTeacherModal(false);
            }}
          >
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </TeacherProvider>
  );
};

TeacherDisplayer.propTypes = {
  teacherInitialInfo: PropTypes.object.isRequired,
  teachersList: PropTypes.array.isRequired,
  setTeachersList: PropTypes.func.isRequired,
};

export default TeacherDisplayer;
