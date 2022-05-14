import React, { useEffect, useState } from 'react';
import StudentCountChart from '../components/charts/StudentCountChart';
import { getAllStudents, getAllReceipts } from '../helpers/apiCalls';
import { isMembershipFee } from '../commondata';

import IncomePerCourseChart from '../components/charts/IncomePerCourseChart';
import ExpiringStudentsList from '../components/charts/ExpiringStudentsList';

import '../styles/home-page.css';

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

  return (
    <div className="homepage">
      <StudentCountChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
      <IncomePerCourseChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
      <ExpiringStudentsList students={students} />
    </div>
  );
};

export default HomePage;
