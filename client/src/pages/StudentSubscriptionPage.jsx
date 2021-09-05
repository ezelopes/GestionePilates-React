import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { createStudent } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';

import formatDate from '../helpers/formatDateForInputDate';
import commondata from '../commondata/commondata'


const StudentSubscriptionPage = () => {
  const today = formatDate(new Date(), true);

  const { ages, disciplines, courses, schools } = commondata;

  const studentInfoDefault = { 
    IsAdult: ages[0].age,
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
    RegistrationDate: today,
    CertificateExpirationDate: today,
    DOB: today,
    GreenPassExpirationDate: today,
    ParentTaxCode: '',
    ParentName: '',
    ParentSurname: ''
  }

  const [newIsAdult, setNewIsAdult] = useState(ages[0].age);
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
  const [newParentTaxCode, setNewParentTaxCode] = useState('');
  const [newParentName, setNewParentName] = useState('');
  const [newParentSurname, setNewParentSurname] = useState('');

  const resetForm = () => {
    setNewIsAdult(ages[0].age)
    setNewTaxCode('')
    setNewName('')
    setNewSurname('')
    setNewCity('')
    setNewAddress('')
    setNewMobilePhone('')
    setNewEmail('')
    setNewBirthPlace('')
    setNewDiscipline(disciplines[0].discipline)
    setNewCourse(courses[0].course)
    setNewSchool(schools[0].school)
    setNewRegistrationDate(today)
    setNewCertificateExpirationDate(today)
    setNewDOB(today)
    setNewGreenPassExpirationDate(today)
    setNewParentTaxCode('')
    setNewParentName('')
    setNewParentSurname('')
  }

  return (
    <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
      <div className="form-wrapper" style={{ width: '60vw', marginLeft: '20vw' }}>
        <div className="user-form">
          <CreateUpdateUserForm
            personInfo={studentInfoDefault}
            personType={'Student'}
            newIsAdult={newIsAdult}
            setNewIsAdult={setNewIsAdult}
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
            setNewParentTaxCode={setNewParentTaxCode}
            setNewParentName={setNewParentName}
            setNewParentSurname={setNewParentSurname}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', gap: '2em'}}>
          <Button variant="success" onClick={() => {
            const newStudent = { 
              IsAdult: newIsAdult,
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
              GreenPassExpirationDate: newGreenPassExpirationDate,
              ParentTaxCode: newParentTaxCode,
              ParentName: newParentName,
              ParentSurname: newParentSurname 
            };
            createStudent(newStudent);
            // resetForm();
          }}>
            Crea Allieva
          </Button>
          <Button variant="secondary" id="buttonResetForm" onClick={resetForm}>
            Reset Form
          </Button>
        </div>

      </div>
    </div>
  );
}

export default StudentSubscriptionPage;
