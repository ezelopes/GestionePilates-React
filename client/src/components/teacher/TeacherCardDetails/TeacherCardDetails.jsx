import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Translation from '../../common/Translation';

const TeacherCardDetails = ({ teacherInfo }) => (
  <>
    <Card.Title>
      <b>
        {teacherInfo.Name} {teacherInfo.Surname}
      </b>
    </Card.Title>
    <Card.Text>
      <strong>
        <Translation value="form.taxCode" />
        :&nbsp;
      </strong>
      {teacherInfo.TaxCode}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.cityAndAddress" />
        :&nbsp;
      </strong>
      {teacherInfo.City} - {teacherInfo.Address}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.phone" />
        :&nbsp;
      </strong>
      {teacherInfo.MobilePhone}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.email" />
        :&nbsp;
      </strong>
      {teacherInfo.Email}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.placeAndDOB" />
        :&nbsp;
      </strong>
      {teacherInfo.BirthPlace} -&nbsp;
      {teacherInfo.DOB !== null ? (
        new Date(teacherInfo.DOB).toLocaleDateString()
      ) : (
        <i>
          <Translation value="common.undefined" />
        </i>
      )}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.school" />
        :&nbsp;
      </strong>
      {teacherInfo.School}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.discipline" />
        :&nbsp;
      </strong>
      {teacherInfo.Discipline}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.course" />
        :&nbsp;
      </strong>
      {teacherInfo.Course}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.registrationDate" />
        :&nbsp;
      </strong>
      {teacherInfo.RegistrationDate !== null ? (
        new Date(teacherInfo.RegistrationDate).toLocaleDateString()
      ) : (
        <i>
          <Translation value="common.undefined" />
        </i>
      )}
    </Card.Text>
    <Card.Text>
      <strong>
        <Translation value="form.certificateExpirationDate" />
        :&nbsp;
      </strong>
      {teacherInfo.CertificateExpirationDate !== null ? (
        new Date(teacherInfo.CertificateExpirationDate).toLocaleDateString()
      ) : (
        <i>
          <Translation value="common.undefined" />
        </i>
      )}
    </Card.Text>
  </>
);

TeacherCardDetails.propTypes = {
  teacherInfo: PropTypes.object.isRequired,
};

export default TeacherCardDetails;
