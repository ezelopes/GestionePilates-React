import React, { useState, useRef, useEffect } from 'react';
import ReceiptsList from '../components/Receipts/ReceiptsList';
import MembershipFeeList from '../components/Receipts/MembershipFeesList';

import orderReceiptsBasedOnReceiptNumber from '../helpers/orderReceiptsBasedOnReceiptNumber';
import { getAllReceipts } from '../helpers/apiCalls';

import { receiptType } from '../commondata/commondata';

const ReceiptsPage = () => {
  const [allReceipts, setAllReceipts] = useState([]);
  const [currentReceipts, setCurrentReceipts] = useState([]);

  const [allMembershipFees, setAllMembershipFees] = useState([]);
  const [currentMembershipFees, setCurrentMembershipFees] = useState([]);

  const [selectedReceiptType, setSelectedReceiptType] = useState(receiptType[0].type);

  const buttonReceiptType = useRef();
  const buttonReceiptWithMembershipFeeType = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const { receipts } = await getAllReceipts();

      const orderedReceipts = orderReceiptsBasedOnReceiptNumber(receipts);

      const receiptsWithMembershipFee = orderedReceipts.filter(
        ({ IncludeMembershipFee, ReceiptType }) => IncludeMembershipFee || ReceiptType === receiptType[1].type
      );

      setAllReceipts(orderedReceipts);
      setCurrentReceipts(orderedReceipts);

      setAllMembershipFees(receiptsWithMembershipFee);
      setCurrentMembershipFees(receiptsWithMembershipFee);
    };
    fetchData();
  }, []);

  const onToggleChanged = (receiptTypeSelected) => {
    if (receiptTypeSelected === 'receipt') {
      setCurrentReceipts(allReceipts);
      setSelectedReceiptType(receiptType[0].type);
      buttonReceiptType.current.className = 'toggle-option toggle-option-active';
      buttonReceiptWithMembershipFeeType.current.className = 'toggle-option';
    } else {
      setCurrentMembershipFees(allMembershipFees);
      setSelectedReceiptType(receiptType[1].type);
      buttonReceiptType.current.className = 'toggle-option';
      buttonReceiptWithMembershipFeeType.current.className = 'toggle-option toggle-option-active';
    }
  };

  return (
    <div className="page-body">
      <div className="toggle">
        <button
          ref={buttonReceiptType}
          type="button"
          className="toggle-option toggle-option-active"
          name="receipt"
          onClick={({ target }) => onToggleChanged(target.name)}
        >
          Ricevute
        </button>

        <button
          ref={buttonReceiptWithMembershipFeeType}
          type="button"
          className="toggle-option"
          name="receiptsWithMembershipFee"
          onClick={({ target }) => onToggleChanged(target.name)}
        >
          Quote Associative
        </button>
      </div>

      {selectedReceiptType === receiptType[0].type ? (
        <ReceiptsList allReceipts={allReceipts} currentReceipts={currentReceipts} setCurrentReceipts={setCurrentReceipts} />
      ) : (
        <MembershipFeeList
          allMembershipFees={allMembershipFees}
          currentMembershipFees={currentMembershipFees}
          setCurrentMembershipFees={setCurrentMembershipFees}
        />
      )}
    </div>
  );
};

export default ReceiptsPage;
