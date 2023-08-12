import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import ReceiptsList from '../components/receipts/ReceiptsList';
import MembershipFeesList from '../components/receipts/MembershipFeesList';
import { isMembershipFee } from '../commondata';
import Toggle from '../components/common/Toggle';
import { getTranslation } from '../components/common/Translation/helpers';
import Translation from '../components/common/Translation';
import { withReactQuery } from '../components/common/withReactQuery/withReactQuery';
import { useToggle } from '../components/common/useToggle';

const ReceiptsPage = () => {
  const [allMembershipFees, setAllMembershipFees] = useState([]);

  const [isMembershipFeeSelected, toggleIsMembershipFeeSelected] = useToggle();

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
    },
  });

  const onToggleChanged = (receiptTypeSelected) => {
    // Don't do anything if toggle hasn't changed.
    if (
      (receiptTypeSelected === 'receipt' && !isMembershipFeeSelected) ||
      (receiptTypeSelected === 'receiptsWithMembershipFee' && isMembershipFeeSelected)
    ) {
      return;
    }

    toggleIsMembershipFeeSelected();
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

      {isMembershipFeeSelected ? (
        <MembershipFeesList receipts={allMembershipFees} />
      ) : (
        <ReceiptsList receipts={allReceipts} refetchReceipts={refetch} />
      )}
    </>
  );
};

export default withReactQuery(ReceiptsPage);
