import React, { useState, useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';

import TeacherDisplayer from '../components/Teacher/TeacherDisplayer';
import { getAllTeachers } from '../helpers/apiCalls';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Translation from '../components/common/Translation/Translation';

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
            <span className="sr-only" />
          </Spinner>
        </div>
      ) : (
        <>
          <div className="page-body">
            <Row>
              {teachersList.length === 0 ? (
                <h2 className="center">
                  <Translation value="common.teachersNotFound" />
                </h2>
              ) : (
                <div className="teachers-container">
                  {teachersList.map((currentTeacher) => (
                    <div key={currentTeacher.TaxCode} className="teacher-card-wrapper">
                      <TeacherDisplayer
                        teacherInitialInfo={currentTeacher}
                        teachersList={teachersList}
                        setTeachersList={setTeachersList}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default TeachersPage;
