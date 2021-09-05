import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import formatDate from '../helpers/formatDateForInputDate';
import commondata from '../commondata/commondata'
import reverseDate from '../helpers/reverseDateForInputDate';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';

import { createTeacher } from '../helpers/apiCalls';

moment.locale('es');

const TeacherSubscriptionPage = () => {
  const today = formatDate(new Date(), true);

  const { disciplines, courses, schools } = commondata;

  const teacherInfoDefault = { 
    TaxCode: '',
    Name: '',
    Surname: '',
    City: '',
    Address: '',
    MobilePhone: '',
    Email: '',
    BirthPlace: '',
    Discipline: disciplines[0].discipline,
    Course: courses[0].course,
    School: schools[0].school,
    RegistrationDate: reverseDate(today),
    CertificateExpirationDate: reverseDate(today),
    DOB: reverseDate(today),
    GreenPassExpirationDate: reverseDate(today),
  }

  const [newTaxCode, setNewTaxCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newMobilePhone, setNewMobilePhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthPlace, setNewBirthPlace] = useState('');
  const [newDiscipline, setNewDiscipline] = useState(disciplines[0].discipline);
  const [newCourse, setNewCourse] = useState(courses[0].course);
  const [newSchool, setNewSchool] = useState(schools[0].school);
  const [newRegistrationDate, setNewRegistrationDate] = useState(today);
  const [newCertificateExpirationDate, setNewCertificateExpirationDate] = useState(today);
  const [newDOB, setNewDOB] = useState(today);
  const [newGreenPassExpirationDate, setNewGreenPassExpirationDate] = useState(today);

  const resetForm = () => {
    setNewTaxCode('');
    setNewName('');
    setNewSurname('');
    setNewCity('');
    setNewAddress('');
    setNewMobilePhone('');
    setNewEmail('');
    setNewBirthPlace('');
    setNewDiscipline(disciplines[0].discipline);
    setNewCourse(courses[0].course);
    setNewSchool(schools[0].school);
    setNewRegistrationDate(today);
    setNewCertificateExpirationDate(today);
    setNewDOB(today);
    setNewGreenPassExpirationDate(today);

    // Reset UI Values
  }

  return (
    <>
      <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
        <div className="form-wrapper" style={{ width: '60vw', marginLeft: '20vw' }}>
          <div className="user-form">
            <CreateUpdateUserForm
              personInfo={teacherInfoDefault}
              personType={'Teacher'}
              setNewTaxCode={setNewTaxCode}
              setNewName={setNewName}
              setNewSurname={setNewSurname}
              setNewCity={setNewCity}
              setNewAddress={setNewAddress}
              setNewMobilePhone={setNewMobilePhone}
              setNewEmail={setNewEmail}
              setNewBirthPlace={setNewBirthPlace}
              setNewDiscipline={setNewDiscipline}
              setNewCourse={setNewCourse}
              setNewSchool={setNewSchool}
              setNewRegistrationDate={setNewRegistrationDate}
              setNewCertificateExpirationDate={setNewCertificateExpirationDate}
              setNewDOB={setNewDOB}
              setNewGreenPassExpirationDate={setNewGreenPassExpirationDate}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', gap: '2em'}}>
            <Button variant="success" onClick={async () => {
                const newTeacher = {
                  TaxCode: newTaxCode,
                  Name: newName,
                  Surname: newSurname,
                  City: newCity,
                  Address: newAddress,
                  MobilePhone: newMobilePhone,
                  Email: newEmail,
                  BirthPlace: newBirthPlace,
                  Discipline: newDiscipline,
                  Course: newCourse,
                  School: newSchool,
                  RegistrationDate: newRegistrationDate,
                  CertificateExpirationDate: newCertificateExpirationDate,
                  DOB: newDOB,
                  GreenPassExpirationDate: newGreenPassExpirationDate
                };
                await createTeacher(newTeacher);
                window.location.reload()
            }}>
              Crea Insegnante
            </Button>
            <Button variant="secondary" id="buttonResetForm" onClick={() => window.location.reload()}>
              Reset Form
            </Button>  
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherSubscriptionPage;
