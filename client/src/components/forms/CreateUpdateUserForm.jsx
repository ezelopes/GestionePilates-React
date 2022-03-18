import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';

import Divider from '../common/Divider';
import Translation from '../common/Translation/Translation';
import { getTranslation } from '../common/Translation/helpers';

import toastConfig from '../../helpers/toast.config';

import { userType, ages, disciplines, schools, courses } from '../../commondata';

const isStudent = (type) => type === userType[0].user;

const isUnderAge = (age) => age === ages[1].age;

const TAX_CODE_REGEX = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;

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
            <Form.Label>
              <Translation value="form.age" />
            </Form.Label>
            <Form.Control as="select" defaultValue={personInfo?.IsAdult} {...register('IsAdult')}>
              {ages.map((age) => (
                <option key={`select_${age.id}`} value={age.age}>
                  {age.age}
                </option>
              ))}
            </Form.Control>
          </>
        )}

        <Form.Label>
          <Translation value="form.taxCode" />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.taxCode')}
          defaultValue={personInfo?.TaxCode}
          {...register('TaxCode', { required: true, pattern: { value: TAX_CODE_REGEX } })}
        />
        <div style={{ display: 'none' }}>
          <ErrorMessage
            errors={errors}
            name="TaxCode"
            render={() => {
              if (errors?.TaxCode?.type === 'required') {
                return toast.error(getTranslation('toast.error.emptyTaxCode'), toastConfig);
              }
              if (errors?.TaxCode?.type === 'pattern') {
                return toast.error(getTranslation('toast.error.taxCodeIncorrectFormat'), toastConfig);
              }
              return null;
            }}
          />
        </div>

        <Form.Label>
          {isStudent(personType) ? <Translation value="form.studentName" /> : <Translation value="form.teacherName" />}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.name')}
          defaultValue={personInfo?.Name}
          {...register('Name')}
        />

        <Form.Label>
          {isStudent(personType) ? <Translation value="form.studentSurname" /> : <Translation value="form.teacherSurname" />}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.surname')}
          defaultValue={personInfo?.Surname}
          {...register('Surname')}
        />

        {!isStudent(personType) && <Divider half />}
        <Divider />

        <Form.Label>
          <Translation value="form.city" />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.city')}
          defaultValue={personInfo?.City}
          {...register('City')}
        />

        <Form.Label>
          <Translation value="form.address" />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.address')}
          defaultValue={personInfo?.Address}
          {...register('Address')}
        />

        <Form.Label>
          <Translation value="form.phone" />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.phone')}
          defaultValue={personInfo?.MobilePhone}
          {...register('MobilePhone')}
        />

        <Form.Label>
          <Translation value="form.email" />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.email')}
          defaultValue={personInfo?.Email}
          {...register('Email')}
        />

        <Form.Label>
          <Translation value="form.placeOfBirth" />
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={getTranslation('placeholder.placeOfBirth')}
          defaultValue={personInfo?.BirthPlace}
          {...register('BirthPlace')}
        />

        <Form.Label>
          <Translation value="form.dateOfBirth" />
        </Form.Label>
        <input type="date" defaultValue={personInfo ? personInfo.DOB : null} {...register('DOB')} />

        <Divider />

        <Form.Label>
          <Translation value="form.discipline" />
        </Form.Label>
        <Form.Control as="select" defaultValue={personInfo?.Discipline} {...register('Discipline')}>
          {disciplines.map((discipline) => (
            <option key={`select_${discipline.id}`} value={discipline.discipline}>
              {discipline.discipline}
            </option>
          ))}
        </Form.Control>

        <Form.Label>
          <Translation value="form.course" />
        </Form.Label>
        <Form.Control as="select" defaultValue={personInfo?.Course} {...register('Course')}>
          {courses.map((course) => (
            <option key={`select_${course.id}`} value={course.course}>
              {course.course}
            </option>
          ))}
        </Form.Control>

        <Form.Label>
          <Translation value="form.school" />
        </Form.Label>
        <Form.Control as="select" defaultValue={personInfo?.School} {...register('School')}>
          {schools.map((school) => (
            <option key={`select_${school.id}`} value={school.school}>
              {school.school}
            </option>
          ))}
        </Form.Control>

        <Form.Label>
          <Translation value="form.registrationDate" />
        </Form.Label>
        <input type="date" defaultValue={personInfo?.RegistrationDate} {...register('RegistrationDate')} />

        <Divider />

        <Form.Label>
          <Translation value="form.certificateExpirationDate" />
        </Form.Label>
        <input type="date" defaultValue={personInfo?.CertificateExpirationDate} {...register('CertificateExpirationDate')} />

        <Form.Label>
          <Translation value="form.greenPassExpirationDate" />
        </Form.Label>
        <input type="date" defaultValue={personInfo?.GreenPassExpirationDate} {...register('GreenPassExpirationDate')} />

        {isStudent(personType) && isUnderAge(newIsAdult) && (
          <>
            <Divider />

            <Form.Label>
              <Translation value="form.parentTaxCode" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={getTranslation('placeholder.parentTaxCode')}
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
                    return toast.error(getTranslation('toast.error.parentTaxCodeIncorrectFormat'), toastConfig);
                  }
                  return null;
                }}
              />
            </div>

            <Form.Label>
              <Translation value="form.parentName" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={getTranslation('placeholder.parentName')}
              defaultValue={personInfo?.ParentName}
              {...register('ParentName')}
            />

            <Form.Label>
              <Translation value="form.parentSurname" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={getTranslation('placeholder.parentSurname')}
              defaultValue={personInfo?.ParentSurname}
              {...register('ParentSurname')}
            />
          </>
        )}
      </div>

      <div className="subscription-form-buttons">
        <Button type="submit" variant="success">
          {isForCreating && isStudent(personType) && <Translation value="buttons.student.createStudent" />}
          {!isForCreating && isStudent(personType) && <Translation value="buttons.student.updateStudent" />}
          {isForCreating && !isStudent(personType) && <Translation value="buttons.teacher.createTeacher" />}
          {!isForCreating && !isStudent(personType) && <Translation value="buttons.teacher.updateTeacher" />}
        </Button>
        {isForCreating && (
          <Button variant="secondary" onClick={() => reset()}>
            <Translation value="buttons.resetForm" />
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
