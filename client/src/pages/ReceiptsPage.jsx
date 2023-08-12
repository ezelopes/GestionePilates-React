import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import ReceiptsList from '../components/receipts/ReceiptsList';
import MembershipFeesList from '../components/receipts/MembershipFeesList';
import { isMembershipFee } from '../commondata';
import Toggle from '../components/common/Toggle';
import { ReceiptProvider } from '../components/receipts/ReceiptContext';
import { getTranslation } from '../components/common/Translation/helpers';
import Translation from '../components/common/Translation';
import { withReactQuery } from '../components/common/withReactQuery/withReactQuery';

const ReceiptsPage = () => {
  const [currentReceipts, setCurrentReceipts] = useState([]);

  const [allMembershipFees, setAllMembershipFees] = useState([]);

  const [isMembershipFeeSelected, setIsMembershipFeeSelected] = useState(false);

  const {
    data: allReceipts,
    isLoading,
    isError,
    refetch,
  } = useQuery(['receipts'], async () => (await axios.get('/api/receipt/getAllReceipts')).data, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (receipts) => {
      const receiptsWithMembershipFee = receipts.filter(
        ({ IncludeMembershipFee, ReceiptType }) => IncludeMembershipFee || isMembershipFee(ReceiptType)
      );

      setAllMembershipFees(receiptsWithMembershipFee);

      setCurrentReceipts(receipts);
    },
  });

  const onToggleChanged = (receiptTypeSelected) => {
    // Reset state
    setCurrentReceipts(receiptTypeSelected === 'receipt' ? allReceipts : allMembershipFees);

    setIsMembershipFeeSelected(receiptTypeSelected !== 'receipt');
  };

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
        refetchReceipts={refetch}
        isLoading={isLoading}
      >
        {isMembershipFeeSelected ? <MembershipFeesList /> : <ReceiptsList />}
      </ReceiptProvider>
    </>
  );
};

export default withReactQuery(ReceiptsPage);
