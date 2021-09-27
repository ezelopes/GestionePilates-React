import React, { useState, useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';

import TeacherDisplayer from '../components/Teacher/TeacherDisplayer';
import { getAllTeachers } from '../helpers/apiCalls';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

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

  return (
    <>
      {loading ? (
        <div className="spinnerWrapper">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="page-body">
            <Row>
              {teachersList.length === 0 ? (
                <h2 className="center">
                  {' '}
                  <div> Non ci sono insegnanti </div>{' '}
                </h2>
              ) : (
                teachersList.map((currentTeacher) => (
                  <div key={currentTeacher.TaxCode} className="teacher-card-wrapper">
                    <TeacherDisplayer
                      teacherInitialInfo={currentTeacher}
                      teachersList={teachersList}
                      setTeachersList={setTeachersList}
                    />
                  </div>
                ))
              )}
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default TeachersPage;
