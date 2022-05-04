import React, { useEffect, useState } from 'react';
import StudentCountChart from '../components/charts/StudentCountChart';
import { getAllReceipts } from '../helpers/apiCalls';
import { isMembershipFee } from '../commondata';

import '../styles/home-page.css';

const HomePage = () => {
  const [receiptsWithStudentInfo, setReceiptsWithStudentInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { receipts } = await getAllReceipts();

      const filteredReceipts = receipts.filter(({ ReceiptType }) => !isMembershipFee(ReceiptType));

      setReceiptsWithStudentInfo(filteredReceipts);
    };

    fetchData();
  }, []);

  return (
    <div>
      <StudentCountChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
    </div>
  );
};

export default HomePage;
