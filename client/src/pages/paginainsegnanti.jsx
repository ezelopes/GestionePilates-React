import React, { useState, useEffect } from 'react';
import { Row,  Spinner } from 'react-bootstrap';

import TeacherDisplayer from '../components/teacher_displayer'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


const InsegnantiPage = () => {
  const [teachersList, setTeachersList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/insegnante/getInsegnanti');
      const body = await result.json();
      setTeachersList(body);
      setLoading(false);
    };
    fetchData();
  }, []);


  return (
    <>
    { loading
      ? <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> 
      : <>
          <div className="page-body">
            <Row>
            { teachersList.length === 0 
              ? <h2 className='center'> <div> Non ci sono insegnanti </div> </h2>  
              : teachersList.map((currentTeacher) => {
                return (
                    <div key={currentTeacher.CodiceFiscale} style={{ width: '30%', fontSize: '14px', marginRight: '2.5em', marginTop: '1.5em' }}>
                      <TeacherDisplayer currentTeacher={currentTeacher} />
                    </div>
                  )
                })
            }
            </Row>
          </div>
      </>
      }
    </>
  );
}

export default InsegnantiPage;
