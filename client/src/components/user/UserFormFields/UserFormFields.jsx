import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { isFunction } from 'is-what';

import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';
import ControlledFormSelectField from '../../form/ControlledFormSelectField';
import { ages, courses, disciplines, isAdult, schools } from '../../../commondata';
import ControlledFormTextField from '../../form/ControlledFormTextField';
import ControlledFormDateField from '../../form/ControlledFormDateField';

const TAX_CODE_REGEX = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;

const UserFormFields = ({ idPrefix, defaultValues, isStudent = true, children }) => {
  const { watch } = useFormContext();

  const watchedIsAdult = watch('IsAdult') || defaultValues?.IsAdult;

  const form = (
    <>
      {isStudent && (
        <>
          <ControlledFormSelectField
            id={`${idPrefix}-age`}
            name="IsAdult"
            defaultValue={defaultValues?.IsAdult || ages[0].value}
            label={<Translation value="form.age" />}
            options={ages}
          />
        </>
      )}

      <ControlledFormTextField
        id={`${idPrefix}-tax-code`}
        name="TaxCode"
        defaultValue={defaultValues?.TaxCode || ''}
        // TODO: 'toast.error.taxCodeIncorrectFormat'
        rules={{ required: 'toast.error.emptyTaxCode', pattern: { value: TAX_CODE_REGEX } }}
        placeholder={getTranslation('placeholder.taxCode')}
        label={<Translation value="form.taxCode" />}
      />

      <ControlledFormTextField
        id={`${idPrefix}-name`}
        name="Name"
        defaultValue={defaultValues?.Name || ''}
        label={isStudent ? <Translation value="form.studentName" /> : <Translation value="form.teacherName" />}
        placeholder={getTranslation('placeholder.name')}
      />

      <ControlledFormTextField
        id={`${idPrefix}-name`}
        name="Surname"
        defaultValue={defaultValues?.Surname || ''}
        label={isStudent ? <Translation value="form.studentSurname" /> : <Translation value="form.teacherSurname" />}
        placeholder={getTranslation('placeholder.surname')}
      />

      <ControlledFormTextField
        id={`${idPrefix}-name`}
        name="City"
        defaultValue={defaultValues?.City || ''}
        label={<Translation value="form.city" />}
        placeholder={getTranslation('placeholder.city')}
      />

      <ControlledFormTextField
        id={`${idPrefix}-address`}
        name="Address"
        defaultValue={defaultValues?.City || ''}
        label={<Translation value="form.address" />}
        placeholder={getTranslation('placeholder.address')}
      />

      <ControlledFormTextField
        id={`${idPrefix}-phone`}
        name="Phone"
        defaultValue={defaultValues?.MobilePhone || ''}
        label={<Translation value="form.phone" />}
        placeholder={getTranslation('placeholder.phone')}
      />

      <ControlledFormTextField
        id={`${idPrefix}-email`}
        name="Email"
        defaultValue={defaultValues?.Email || ''}
        label={<Translation value="form.email" />}
        placeholder={getTranslation('placeholder.email')}
      />

      <ControlledFormTextField
        id={`${idPrefix}-birth-place`}
        name="BirthPlace"
        defaultValue={defaultValues?.Email || ''}
        label={<Translation value="form.placeOfBirth" />}
        placeholder={getTranslation('placeholder.placeOfBirth')}
      />

      <ControlledFormDateField
        id={`${idPrefix}-dob`}
        name="DOB"
        label={<Translation value="form.dateOfBirth" />}
        defaultValue={defaultValues?.DOB || ''}
      />

      <ControlledFormSelectField
        id={`${idPrefix}-discipline`}
        name="Discipline"
        label={<Translation value="form.discipline" />}
        defaultValue={defaultValues?.Discipline || disciplines[0].value} // || ''}
        options={disciplines}
      />

      {/* TODO: This will conditional based on selected Discipline */}
      <ControlledFormSelectField
        id={`${idPrefix}-course`}
        name="Course"
        label={<Translation value="form.course" />}
        defaultValue={defaultValues?.Course || null} // || ''}
        options={courses}
      />

      <ControlledFormSelectField
        id={`${idPrefix}-school`}
        name="School"
        label={<Translation value="form.school" />}
        defaultValue={defaultValues?.School || schools[0].value} // || ''}
        options={schools}
      />

      <ControlledFormDateField
        id={`${idPrefix}-registration-date`}
        name="RegistrationDate"
        label={<Translation value="form.registrationDate" />}
        defaultValue={defaultValues?.RegistrationDate || ''}
      />

      <ControlledFormDateField
        id={`${idPrefix}-certificate-expiration-date`}
        name="CertificateExpirationDate"
        label={<Translation value="form.certificateExpirationDate" />}
        defaultValue={defaultValues?.CertificateExpirationDate || ''}
      />

      {/* <ControlledFormDateField
        id={`${idPrefix}-green-pass-expiration-date`}
        name="GreenPassExpirationDate"
        label={<Translation value="form.greenPassExpirationDate" />}
        defaultValue={defaultValues?.GreenPassExpirationDate || ''}
      /> */}

      {isStudent && !isAdult(watchedIsAdult) && (
        <>
          <ControlledFormTextField
            id={`${idPrefix}-parent-tax-code`}
            name="ParentTaxCode"
            defaultValue={defaultValues?.ParentTaxCode || ''}
            // TODO: 'toast.error.taxCodeIncorrectFormat'
            rules={{ required: false, pattern: { value: TAX_CODE_REGEX } }}
            placeholder={getTranslation('placeholder.parentTaxCode')}
            label={<Translation value="form.parentTaxCode" />}
          />

          <ControlledFormTextField
            id={`${idPrefix}-parent-name`}
            name="ParentName"
            defaultValue={defaultValues?.ParentName || ''}
            label={<Translation value="form.parentName" />}
            placeholder={getTranslation('placeholder.parentName')}
          />

          <ControlledFormTextField
            id={`${idPrefix}-parent-surname`}
            name="ParentSurname"
            defaultValue={defaultValues?.ParentSurname || ''}
            label={<Translation value="form.parentSurname" />}
            placeholder={getTranslation('placeholder.parentSurname')}
          />
        </>
      )}
    </>
  );

  if (isFunction(children)) {
    return children({ form });
  }

  return form;
};

UserFormFields.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  defaultValues: PropTypes.shape({
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
  }).isRequired,
  isStudent: PropTypes.bool,
  children: PropTypes.oneOf([PropTypes.node, PropTypes.func]),
};

UserFormFields.defaultProps = {
  isStudent: false,
  children: undefined,
};

export default UserFormFields;
