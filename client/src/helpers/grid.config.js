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

const gridOptionsDefaultReceipts = {
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

const gridOptionsFilteredReceipts = {
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

export {
  gridOptionsDefaultMembershipFee,
  gridOptionsDefaultReceipts,
  gridOptionsDefaultStudentReceipts,
  gridOptionsDefaultStudents,
  gridOptionsFilteredReceipts,
};
