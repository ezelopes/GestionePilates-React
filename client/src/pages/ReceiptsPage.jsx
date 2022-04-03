import React, { useState, useEffect } from 'react';
import ReceiptsList from '../components/receipts/ReceiptsList';
import MembershipFeesList from '../components/receipts/MembershipFeesList';

import orderReceiptsBasedOnReceiptNumber from '../helpers/orderReceiptsBasedOnReceiptNumber';
import { getAllReceipts } from '../helpers/apiCalls';

import { isMembershipFee } from '../commondata';
import Toggle from '../components/common/Toggle';
import { ReceiptProvider } from '../components/receipts/ReceiptContext';
import { getTranslation } from '../components/common/Translation/helpers';

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
    <>
      <Toggle
        optionOne={{ title: getTranslation('common.receipts'), name: 'receipt' }}
        optionTwo={{ title: getTranslation('common.membershipFee'), name: 'receiptsWithMembershipFee' }}
        callback={onToggleChanged}
      />

      <ReceiptProvider
        allReceipts={allReceipts}
        allMembershipFees={allMembershipFees}
        currentReceipts={currentReceipts}
        setCurrentReceipts={setCurrentReceipts}
      >
        {isMembershipFeeSelected ? <MembershipFeesList /> : <ReceiptsList />}
      </ReceiptProvider>
    </>
  );
};

export default ReceiptsPage;
