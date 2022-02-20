import React, { useState, useEffect } from 'react'
import ReceiptsList from '../components/Receipts/ReceiptsList'
import MembershipFeeList from '../components/Receipts/MembershipFeesList'

import orderReceiptsBasedOnReceiptNumber from '../helpers/orderReceiptsBasedOnReceiptNumber'
import { getAllReceipts } from '../helpers/apiCalls'

import { receiptType } from '../commondata'
import Toggle from '../components/common/Toggle'
import { ReceiptProvider } from '../components/Receipts/ReceiptContext'

const ReceiptsPage = () => {
  const [allReceipts, setAllReceipts] = useState([])
  const [currentReceipts, setCurrentReceipts] = useState([])

  const [allMembershipFees, setAllMembershipFees] = useState([])
  const [currentMembershipFees, setCurrentMembershipFees] = useState([])

  const [selectedReceiptType, setSelectedReceiptType] = useState(receiptType[0].type)

  useEffect(() => {
    const fetchData = async () => {
      const { receipts } = await getAllReceipts()

      const orderedReceipts = orderReceiptsBasedOnReceiptNumber(receipts)

      const receiptsWithMembershipFee = orderedReceipts.filter(
        ({ IncludeMembershipFee, ReceiptType }) => IncludeMembershipFee || ReceiptType === receiptType[1].type
      )

      setAllReceipts(orderedReceipts)
      setCurrentReceipts(orderedReceipts)

      setAllMembershipFees(receiptsWithMembershipFee)
      setCurrentMembershipFees(receiptsWithMembershipFee)
    }
    fetchData()
  }, [])

  const onToggleChanged = (receiptTypeSelected) => {
    // Reset state
    if (receiptTypeSelected === 'receipt') {
      setCurrentReceipts(allReceipts)
      setSelectedReceiptType(receiptType[0].type)
    } else {
      setCurrentMembershipFees(allMembershipFees)
      setSelectedReceiptType(receiptType[1].type)
    }
  }

  return (
    <div className="page-body">
      <ReceiptProvider
        allReceipts={allReceipts}
        currentReceipts={currentReceipts}
        setCurrentReceipts={setCurrentReceipts}
        allMembershipFees={allMembershipFees}
        currentMembershipFees={currentMembershipFees}
        setCurrentMembershipFees={setCurrentMembershipFees}
      >
        <Toggle
          optionOne={{ title: 'Ricevute', name: 'receipt' }}
          optionTwo={{ title: 'Quote Associative', name: 'receiptsWithMembershipFee' }}
          callback={onToggleChanged}
        />

        {selectedReceiptType === receiptType[0].type ? <ReceiptsList /> : <MembershipFeeList />}
      </ReceiptProvider>
    </div>
  )
}

export default ReceiptsPage
