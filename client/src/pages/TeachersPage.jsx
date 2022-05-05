import React, { useState, useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';

import TeacherCard from '../components/teacher/TeacherCard';
import Translation from '../components/common/Translation';

import { getAllTeachers } from '../helpers/apiCalls';

import '../styles/teachers-page.css';

const TeachersPage = () => {
  const [teachersList, setTeachersList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { teachers } = await getAllTeachers();
      setTeachersList(teachers);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner animation="border" role="status" className="spinner" />;
  }

  return (
    <>
      {teachersList?.length === 0 ? (
        <Row>
          <h2 className="center">
            <Translation value="common.teachersNotFound" />
          </h2>
        </Row>
      ) : (
        <div className="teachers-container">
          {teachersList?.map((currentTeacher) => (
            <TeacherCard
              teacherInitialInfo={currentTeacher}
              teachersList={teachersList}
              setTeachersList={setTeachersList}
              key={currentTeacher.TaxCode}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TeachersPage;
