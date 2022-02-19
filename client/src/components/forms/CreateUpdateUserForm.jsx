import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import Divider from '../common/Divider';

import toastConfig from '../../helpers/toast.config';

import { userType, ages, disciplines, schools, courses } from '../../commondata';

const isStudent = (type) => type === userType[0].user;

const isUnderAge = (age) => age === ages[1].age;

const CreateUpdateUserForm = ({
  personInfo,
  personType,
  callback,
  isForCreating,
  setUserInfo = () => {},
  handleModal = () => {},
}) => {
  const [newIsAdult, setNewIsAdult] = useState(personInfo?.IsAdult || ages[0].age);

  const defaultValues = {};

  if (isStudent(personType)) {
    defaultValues.StudentID = personInfo?.StudentID;
  } else {
    defaultValues.TeacherID = personInfo?.TeacherID;
  }

  if (newIsAdult === ages[0].age && isStudent(personType)) {
    defaultValues.ParentTaxCode = null;
    defaultValues.ParentName = null;
    defaultValues.ParentSurname = null;
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    const response = await callback(data);

    if (response.status === 200) {
      if (!isForCreating) {
        handleModal(false);
      }
      setUserInfo(data);

      reset();
      return toast.success(response.message, toastConfig);
    }

    return toast.error(response.message, toastConfig);
  };

  watch((data) => {
    setNewIsAdult(data.IsAdult);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="user-form">
        {isStudent(personType) && (
          <>
            <Form.Label> Età </Form.Label>
            <Form.Control as="select" defaultValue={personInfo?.IsAdult} {...register('IsAdult')}>
              {ages.map((age) => (
                <option key={`select_${age.id}`} value={age.age}>
                  {age.age}
                </option>
              ))}
            </Form.Control>
          </>
        )}

        <Form.Label> Codice Fiscale </Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci Codice Fiscale..."
          defaultValue={personInfo?.TaxCode}
          {...register('TaxCode', { required: true, pattern: { value: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i } })}
        />
        <div style={{ display: 'none' }}>
          <ErrorMessage
            errors={errors}
            name="TaxCode"
            render={() => {
              if (errors?.TaxCode?.type === 'required') {
                return toast.error('Codice Fiscale non puo essere vuoto', toastConfig);
              }
              if (errors?.TaxCode?.type === 'pattern') {
                return toast.error('Assicurati che il codice fiscale sia nel formato corretto!', toastConfig);
              }
              return null;
            }}
          />
        </div>

        <Form.Label> Nome {isStudent(personType) ? 'Allieva' : 'Insegnante'} </Form.Label>
        <Form.Control type="text" placeholder="Inserisci Nome..." defaultValue={personInfo?.Name} {...register('Name')} />

        <Form.Label> Cognome {isStudent(personType) ? 'Allieva' : 'Insegnante'} </Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci Cognome..."
          defaultValue={personInfo?.Surname}
          {...register('Surname')}
        />

        {!isStudent(personType) && <Divider half />}
        <Divider />

        <Form.Label> Citta </Form.Label>
        <Form.Control type="text" placeholder="Inserisci Citta..." defaultValue={personInfo?.City} {...register('City')} />

        <Form.Label> Indirizzo </Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci Indirizzo..."
          defaultValue={personInfo?.Address}
          {...register('Address')}
        />

        <Form.Label> Cellulare </Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci Cellulare..."
          defaultValue={personInfo?.MobilePhone}
          {...register('MobilePhone')}
        />

        <Form.Label> Email </Form.Label>
        <Form.Control type="text" placeholder="Inserisci Email..." defaultValue={personInfo?.Email} {...register('Email')} />

        <Form.Label> Luogo Nascita </Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci Luogo Nascita..."
          defaultValue={personInfo?.BirthPlace}
          {...register('BirthPlace')}
        />

        <Form.Label> Data Nascita </Form.Label>
        <input type="date" defaultValue={personInfo ? personInfo.DOB : null} {...register('DOB')} />

        <Divider />

        <Form.Label> Disciplina </Form.Label>
        <Form.Control as="select" defaultValue={personInfo?.Discipline} {...register('Discipline')}>
          {disciplines.map((discipline) => (
            <option key={`select_${discipline.id}`} value={discipline.discipline}>
              {discipline.discipline}
            </option>
          ))}
        </Form.Control>

        <Form.Label> Corso </Form.Label>
        <Form.Control as="select" defaultValue={personInfo?.Course} {...register('Course')}>
          {courses.map((course) => (
            <option key={`select_${course.id}`} value={course.course}>
              {course.course}
            </option>
          ))}
        </Form.Control>

        <Form.Label> Scuola </Form.Label>
        <Form.Control as="select" defaultValue={personInfo?.School} {...register('School')}>
          {schools.map((school) => (
            <option key={`select_${school.id}`} value={school.school}>
              {school.school}
            </option>
          ))}
        </Form.Control>

        <Form.Label> Data Iscrizione </Form.Label>
        <input type="date" defaultValue={personInfo?.RegistrationDate} {...register('RegistrationDate')} />

        <Divider />

        <Form.Label> Data Scadenza Certificato </Form.Label>
        <input type="date" defaultValue={personInfo?.CertificateExpirationDate} {...register('CertificateExpirationDate')} />

        <Form.Label> Data Scadenza Green Pass </Form.Label>
        <input type="date" defaultValue={personInfo?.GreenPassExpirationDate} {...register('GreenPassExpirationDate')} />

        {isStudent(personType) && isUnderAge(newIsAdult) && (
          <>
            <Divider />

            <Form.Label> Codice Fiscale Genitore </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Codice Fiscale Genitore..."
              defaultValue={personInfo?.ParentTaxCode}
              {...register('ParentTaxCode', {
                required: false,
                pattern: { value: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i },
              })}
            />
            <div style={{ display: 'none' }}>
              <ErrorMessage
                errors={errors}
                name="ParentTaxCode"
                render={() => {
                  if (errors?.ParentTaxCode?.type === 'pattern') {
                    return toast.error('Assicurati che il codice fiscale del genitore sia nel formato corretto!', toastConfig);
                  }
                  return null;
                }}
              />
            </div>

            <Form.Label> Nome Genitore </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Nome Genitore..."
              defaultValue={personInfo?.ParentName}
              {...register('ParentName')}
            />

            <Form.Label> Cognome Genitore </Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci Cognome Genitore..."
              defaultValue={personInfo?.ParentSurname}
              {...register('ParentSurname')}
            />
          </>
        )}
      </div>

      <div className="subscription-form-buttons">
        <Button type="submit" variant="success">
          {isForCreating ? 'Crea' : 'Aggiorna'} {isStudent(personType) ? 'Allieva' : 'Insegnante'}
        </Button>
        {isForCreating && (
          <Button variant="secondary" onClick={() => reset()}>
            Reset Form
          </Button>
        )}
      </div>
    </form>
  );
};

CreateUpdateUserForm.propTypes = {
  personInfo: PropTypes.shape({
    IsAdult: PropTypes.string,
    StudentID: PropTypes.number,
    TeacherID: PropTypes.number,
    TaxCode: PropTypes.string,
    Name: PropTypes.string,
    Surname: PropTypes.string,
    City: PropTypes.string,
    Address: PropTypes.string,
    MobilePhone: PropTypes.string,
    Email: PropTypes.string,
    BirthPlace: PropTypes.string,
    Discipline: PropTypes.string,
    Course: PropTypes.string,
    School: PropTypes.string,
    DOB: PropTypes.string,
    RegistrationDate: PropTypes.string,
    CertificateExpirationDate: PropTypes.string,
    GreenPassExpirationDate: PropTypes.string,
    ParentTaxCode: PropTypes.string,
    ParentName: PropTypes.string,
    ParentSurname: PropTypes.string,
  }),
  personType: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  isForCreating: PropTypes.bool,
  setUserInfo: PropTypes.func,
  handleModal: PropTypes.func,
};

CreateUpdateUserForm.defaultProps = {
  personInfo: {},
  isForCreating: false,
  setUserInfo: () => {},
  handleModal: () => {},
};

export default CreateUpdateUserForm;
