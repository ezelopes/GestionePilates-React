import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const ReceiptContext = createContext(null);

const useReceipt = () => useContext(ReceiptContext);

const ReceiptProvider = ({ children, ...props }) => <ReceiptContext.Provider value={props}>{children}</ReceiptContext.Provider>;

ReceiptProvider.propTypes = {
  allReceipts: PropTypes.array.isRequired,
  currentReceipts: PropTypes.array.isRequired,
  setCurrentReceipts: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { ReceiptProvider, useReceipt };
