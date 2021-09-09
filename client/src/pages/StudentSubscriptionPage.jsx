import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { createStudent } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';

import { ages, disciplines, schools, courses } from '../commondata/commondata'


const StudentSubscriptionPage = () => {
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
    RegistrationDate: null,
    CertificateExpirationDate: null,
    DOB: null,
    GreenPassExpirationDate: null,
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
  const [newRegistrationDate, setNewRegistrationDate] = useState(null);
  const [newCertificateExpirationDate, setNewCertificateExpirationDate] = useState(null);
  const [newDOB, setNewDOB] = useState(null);
  const [newGreenPassExpirationDate, setNewGreenPassExpirationDate] = useState(null);
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
    setNewRegistrationDate(null)
    setNewCertificateExpirationDate(null)
    setNewDOB(null)
    setNewGreenPassExpirationDate(null)
    setNewParentTaxCode('')
    setNewParentName('')
    setNewParentSurname('')
  }

  return (
    <>
      <ToastContainer />
      <div className="form-wrapper subscription-form">
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
        <div className="subscription-form-buttons">
          <Button variant="success" onClick={async () => {
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
            await createStudent(newStudent);
            // resetForm();
          }}>
            Crea Allieva
          </Button>
          <Button variant="secondary" id="buttonResetForm" onClick={resetForm}>
            Reset Form
          </Button>
        </div>
      </div>
    </>
  );
}

export default StudentSubscriptionPage;
