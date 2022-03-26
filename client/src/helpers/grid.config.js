const gridOptionsDefaultMembershipFee = {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    cellStyle: { fontSize: '1.5em' },
    flex: 10,
  },
};

const gridOptionsDefaultReceipt = {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    cellStyle: { fontSize: '1.5em' },
    flex: 10,
  },
  rowSelection: 'single',
};

const gridOptionsDefaultStudentReceipts = {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    cellStyle: { fontSize: '1.5em' },
  },
};

const gridOptionsDefaultStudents = {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    cellStyle: { fontSize: '1.5em' },
  },
  rowSelection: 'single',
};

export {
  gridOptionsDefaultMembershipFee,
  gridOptionsDefaultReceipt,
  gridOptionsDefaultStudentReceipts,
  gridOptionsDefaultStudents,
};
