import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import Divider from './Divider';
import { useStudent } from './StudentContext';
import { useTeacher } from './TeacherContext';

import toastConfig from '../helpers/toast.config';
import 'react-toastify/dist/ReactToastify.css';

import { ages, disciplines, schools, courses } from '../commondata/commondata'

const CreateUpdateUserForm = ({ 
  personInfo,
  personType,
  callback,
  isForCreating,
  setUserInfo = () => {},
  handleModal = () => {}
}) => {
  // const { setUserInfo } = personType === 'Student' ? useStudent() : useTeacher()

  const [newIsAdult, setNewIsAdult] = useState(personInfo?.IsAdult || ages[0].age)

  const defaultValues = {}

  personType === 'Student' 
    ? defaultValues['StudentID'] = personInfo?.StudentID
    : defaultValues['TeacherID'] = personInfo?.TeacherID

  if (newIsAdult === ages[0].age && personType === 'Student') {
    defaultValues['ParentTaxCode'] = null
    defaultValues['ParentName'] = null
    defaultValues['ParentSurname'] = null
  }
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues })

  const onSubmit = async (data) => {
    const response = await callback(data)

    if (response.status === 200) {
      if (!isForCreating) handleModal(false)
      setUserInfo(data)

      reset()
      return toast.success(response.message, toastConfig)
    }

    return toast.error(response.message, toastConfig)
  }

  watch((data) => { setNewIsAdult(data.IsAdult) })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='user-form'>
        {personType === 'Student' && (
          <> 
            <Form.Label> Età </Form.Label>
            <Form.Control as='select' defaultValue={personInfo?.IsAdult} {...register('IsAdult')}>
              {ages.map(age =>  <option key={`select_${age.id}`} value={age.age}> {age.age} </option>)}
            </Form.Control>
          </>
        )}

        <Form.Label> Codice Fiscale </Form.Label>
        <Form.Control
          type='text'
          placeholder='Inserisci Codice Fiscale...'
          defaultValue={personInfo?.TaxCode}
          {...register('TaxCode', { required: true, pattern: { value: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i } })}
        />
        <div style={{ display: 'none' }}> 
          <ErrorMessage
              errors={errors}
              name='TaxCode'
              render={() => {
                if (errors?.TaxCode?.type === "required") return toast.error('Codice Fiscale non puo essere vuoto', toastConfig)
                else if (errors?.TaxCode?.type === "pattern") return toast.error('Assicurati che il codice fiscale sia nel formato corretto!', toastConfig)
              }}
          />
        </div>

        <Form.Label> Nome {personType === 'Student' ? 'Allieva' : 'Insegnante' } </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Nome...' defaultValue={personInfo?.Name} {...register('Name')} />

        <Form.Label> Cognome {personType === 'Student' ? 'Allieva' : 'Insegnante' } </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Cognome...' defaultValue={personInfo?.Surname} {...register('Surname')} />
        
        {personType === 'Teacher' && <Divider half={true} /> }
        <Divider />
        
        <Form.Label> Citta </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Citta...' defaultValue={personInfo?.City} {...register('City')} />

        <Form.Label> Indirizzo </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Indirizzo...' defaultValue={personInfo?.Address} {...register('Address')} />

        <Form.Label> Cellulare </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Cellulare...' defaultValue={personInfo?.MobilePhone} {...register('MobilePhone')} />

        <Form.Label> Email </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Email...' defaultValue={personInfo?.Email} {...register('Email')} />

        <Form.Label> Luogo Nascita </Form.Label>
        <Form.Control type='text' placeholder='Inserisci Luogo Nascita...' defaultValue={personInfo?.BirthPlace} {...register('BirthPlace')} />

        <Form.Label> Data Nascita </Form.Label>
        <input type='date' defaultValue={ personInfo ? personInfo.DOB : null } {...register('DOB')} />

        <Divider />

        <Form.Label> Disciplina </Form.Label>
        <Form.Control as='select' defaultValue={personInfo?.Discipline} {...register('Discipline')} >
          {disciplines.map(discipline =>  <option key={`select_${discipline.id}`} value={discipline.discipline}> {discipline.discipline} </option>)}
        </Form.Control>

        <Form.Label> Corso </Form.Label>
        <Form.Control as='select' defaultValue={personInfo?.Course} {...register('Course')} >
          {courses.map(course =>  <option key={`select_${course.id}`} value={course.course}> {course.course} </option>)}
        </Form.Control>

        <Form.Label> Scuola </Form.Label>
        <Form.Control as='select' defaultValue={personInfo?.School} {...register('School')} >
          {schools.map(school =>  <option key={`select_${school.id}`} value={school.school}> {school.school} </option>)}
        </Form.Control>

        <Form.Label> Data Iscrizione </Form.Label>
        <input type='date' defaultValue={ personInfo?.RegistrationDate } {...register('RegistrationDate')} />

        <Divider />

        <Form.Label> Data Scadenza Certificato </Form.Label>
        <input type='date' defaultValue={ personInfo?.CertificateExpirationDate } {...register('CertificateExpirationDate')} />
        
        <Form.Label> Data Scadenza Green Pass </Form.Label>
        <input type='date' defaultValue={ personInfo?.GreenPassExpirationDate } {...register('GreenPassExpirationDate')} />

        {personType === 'Student' && newIsAdult === 'Minorenne' && 
            <>
              <Divider />

              <Form.Label> Codice Fiscale Genitore </Form.Label>
              <Form.Control type='text' placeholder='Inserisci Codice Fiscale Genitore...' defaultValue={personInfo?.ParentTaxCode} {...register('ParentTaxCode', { required: false, pattern: { value: /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i } } )} />
              <div style={{ display: 'none' }}> 
                <ErrorMessage
                    errors={errors}
                    name='ParentTaxCode'
                    render={() => {
                      if (errors?.ParentTaxCode?.type === "pattern") return toast.error('Assicurati che il codice fiscale del genitore sia nel formato corretto!', toastConfig)
                    }}
                />
              </div>

              <Form.Label> Nome Genitore </Form.Label>
              <Form.Control type='text' placeholder='Inserisci Nome Genitore...' defaultValue={personInfo?.ParentName} {...register('ParentName')} />
        
              <Form.Label> Cognome Genitore </Form.Label>
              <Form.Control type='text' placeholder='Inserisci Cognome Genitore...' defaultValue={personInfo?.ParentSurname} {...register('ParentSurname')} /> 
            </>
        }
      </div>

      <div className='subscription-form-buttons'>
        <Button type='submit' variant='success'>
          {isForCreating ? 'Crea' : 'Aggiorna'} {personType === 'Student' ? 'Allieva' : 'Insegnante' }
        </Button>
        {isForCreating && (
          <Button variant='secondary' onClick={() => reset()}>
            Reset Form
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreateUpdateUserForm;