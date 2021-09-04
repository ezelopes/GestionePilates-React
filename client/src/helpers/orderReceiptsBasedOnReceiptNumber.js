const orderReceiptsBasedOnReceiptNumber = (receipts) => {
    const orderedReceipts = receipts.sort((a, b) => {
    if (a.NumeroRicevuta == '') return -1

    const receiptA = a.NumeroRicevuta.split('/');
    const receiptB = b.NumeroRicevuta.split('/');

    const receiptNumberA = parseInt(receiptA[0]) || 0
    const receiptNumberB = parseInt(receiptB[0]) || 0

    const receiptYearA = parseInt(receiptA[1]) || 0
    const receiptYearB = parseInt(receiptB[1]) || 0

    return receiptYearA - receiptYearB || receiptNumberA - receiptNumberB
    })

    return orderedReceipts
}

module.exports = orderReceiptsBasedOnReceiptNumber;
