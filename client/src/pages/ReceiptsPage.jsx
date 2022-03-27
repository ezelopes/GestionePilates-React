import React, { useState, useEffect } from 'react';
import ReceiptsList from '../components/Receipts/ReceiptsList';
import MembershipFeeList from '../components/Receipts/MembershipFeesList';

import orderReceiptsBasedOnReceiptNumber from '../helpers/orderReceiptsBasedOnReceiptNumber';
import { getAllReceipts } from '../helpers/apiCalls';

import { isMembershipFee } from '../commondata';
import Toggle from '../components/common/Toggle';
import { ReceiptProvider } from '../components/Receipts/ReceiptContext';

const ReceiptsPage = () => {
  const [allReceipts, setAllReceipts] = useState([]);
  const [currentReceipts, setCurrentReceipts] = useState([]);

  const [allMembershipFees, setAllMembershipFees] = useState([]);

  const [isMembershipFeeSelected, setIsMembershipFeeSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { receipts } = await getAllReceipts();

      const orderedReceipts = orderReceiptsBasedOnReceiptNumber(receipts);

      const receiptsWithMembershipFee = orderedReceipts.filter(
        ({ IncludeMembershipFee, ReceiptType }) => IncludeMembershipFee || isMembershipFee(ReceiptType)
      );

      setAllReceipts(orderedReceipts);
      setAllMembershipFees(receiptsWithMembershipFee);

      setCurrentReceipts(orderedReceipts);
    };
    fetchData();
  }, []);

  const onToggleChanged = (receiptTypeSelected) => {
    // Reset state
    setCurrentReceipts(receiptTypeSelected === 'receipt' ? allReceipts : allMembershipFees);

    setIsMembershipFeeSelected(receiptTypeSelected !== 'receipt');
  };

  return (
    <div className="page-body">
      <Toggle
        optionOne={{ title: 'Ricevute', name: 'receipt' }}
        optionTwo={{ title: 'Quote Associative', name: 'receiptsWithMembershipFee' }}
        callback={onToggleChanged}
      />

      <ReceiptProvider
        allReceipts={allReceipts}
        allMembershipFees={allMembershipFees}
        currentReceipts={currentReceipts}
        setCurrentReceipts={setCurrentReceipts}
      >
        {isMembershipFeeSelected ? <MembershipFeeList /> : <ReceiptsList />}
      </ReceiptProvider>
    </div>
  );
};

export default ReceiptsPage;
