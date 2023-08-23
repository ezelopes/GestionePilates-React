import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Alert, Spinner } from 'react-bootstrap';

import TeacherCard from '../components/teacher/TeacherCard';
import Translation from '../components/common/Translation';
import { withReactQuery } from '../components/common/withReactQuery';

import endpoints from '../commondata/endpoints.config';

import '../styles/teachers-page.css';

const TeachersPage = () => {
  const [teachersList, setTeachersList] = useState();

  const removeTeacherByIdFromList = (id) => {
    const updatedTeachersList = teachersList.filter((current) => current.TeacherID !== id);

    setTeachersList(updatedTeachersList);
  };

  const { isLoading, isError } = useQuery(['teachers'], async () => (await axios.get(endpoints.teacher.getMultiple)).data, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      setTeachersList(data);
    },
  });

  if (isLoading) {
    return <Spinner animation="border" role="status" className="spinner" />;
  }

  if (isError) {
    return (
      <Alert variant="danger">
        <Translation value="common.requestFailed" />
      </Alert>
    );
  }

  if (teachersList?.length === 0) {
    return (
      <Alert variant="warning">
        <Translation value="common.teachersNotFound" />
      </Alert>
    );
  }

  return (
    <div className="teachers-container">
      {teachersList?.map((currentTeacher) => (
        <TeacherCard
          key={currentTeacher.TaxCode}
          teacherInitialInfo={currentTeacher}
          removeTeacherByIdFromList={removeTeacherByIdFromList}
        />
      ))}
    </div>
  );
};

export default withReactQuery(TeachersPage);
