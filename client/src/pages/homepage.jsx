import React, { useEffect, useState } from 'react';
import StudentCountChart from '../components/charts/StudentCountChart';
import { getAllStudents, getAllReceipts } from '../helpers/apiCalls';
import { isMembershipFee } from '../commondata';

import '../styles/home-page.css';
import IncomePerCourseChart from '../components/charts/IncomePerCourseChart';
import { isDateBetweenTwoDates } from '../helpers/dates';

const HomePage = () => {
  const [receiptsWithStudentInfo, setReceiptsWithStudentInfo] = useState([]);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { receipts } = await getAllReceipts();

      const { allStudents } = await getAllStudents();

      setStudents(allStudents);

      const filteredReceipts = receipts.filter(({ ReceiptType }) => !isMembershipFee(ReceiptType));

      setReceiptsWithStudentInfo(filteredReceipts);
    };

    fetchData();
  }, []);

  const today = new Date();

  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

  // GET ALL STUDENTS WHOSE CERITFICATE IS ABOUT TO EXPIRE. USE STUDENT LIST INSTEAD OF RECEIPT LIST TO AVOID DUPLICATES.
  const expiringStudents = students
    .flatMap((student) => {
      if (isDateBetweenTwoDates(today, nextMonth, new Date(student.CertificateExpirationDate))) {
        return student;
      }

      return null;
    })
    .filter((student) => !!student);

  return (
    <div className="homepage">
      <StudentCountChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
      <IncomePerCourseChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
      {/* TODO: EXPORT AND STYLE IT - ADD SELECTION FOR MONTH? */}
      <div className="container-fluid" style={{ width: 'fit-content' }}>
        <h3>Allieve con certificato in scadenza</h3> <br />
        {expiringStudents.map((student) => (
          <p key={student.TaxCode}>
            {student.Name} {student.Surname}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
