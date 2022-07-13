import produce from 'immer';

const STUDENT_LIST_KEY = 'studentsList';
const studentListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const createStudent = async (newStudent) => {
  const response = await fetch('/api/student/createStudent', {
    method: 'PUT',
    headers,
    body: JSON.stringify(newStudent),
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    const { StudentID } = responseParsed;

    const newStudentWithID = produce(newStudent, (draft) => {
      draft.StudentID = StudentID;
    });

    studentListCached.push(newStudentWithID);
    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
  }

  return { status: response.status, message: responseParsed.message };
};

const createReceipt = async (newReceipt) => {
  const response = await fetch('/api/receipt/createReceipt', {
    method: 'PUT',
    headers,
    body: JSON.stringify(newReceipt),
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    const receiptWithID = produce(newReceipt, (draft) => {
      draft.ReceiptID = responseParsed.ReceiptID;
    });

    return { status: response.status, message: responseParsed.message, receipt: receiptWithID };
  }

  return { status: response.status, message: responseParsed.message };
};

const createTeacher = async (newTeacher) => {
  const response = await fetch('/api/teacher/createTeacher', {
    method: 'PUT',
    headers,
    body: JSON.stringify(newTeacher),
  });

  const responseParsed = await response.json();
  return { status: response.status, message: responseParsed.message };
};

const updateStudent = async (updatedStudent) => {
  const response = await fetch('/api/student/updateStudent', {
    method: 'POST',
    headers,
    body: JSON.stringify(updatedStudent),
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    const studentsListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));

    for (let i = 0; i < studentsListCached.length; i += 1) {
      if (updatedStudent.StudentID === studentsListCached[i].StudentID) {
        studentsListCached[i] = updatedStudent;
        break;
      }
    }

    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentsListCached));
  }

  return { status: response.status, message: responseParsed.message };
};

const updateTeacher = async (updatedTeacherInfo) => {
  const response = await fetch('/api/teacher/updateTeacher', {
    method: 'POST',
    headers,
    body: JSON.stringify(updatedTeacherInfo),
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const updateRegistrationDate = async (StudentID, RegistrationDate) => {
  const response = await fetch('/api/student/updateRegistrationDate', {
    method: 'POST',
    headers,
    body: JSON.stringify({ StudentID, RegistrationDate }),
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    let updatedStudent = null;

    for (let i = 0; i < studentListCached.length; i += 1) {
      if (StudentID === studentListCached[i].StudentID) {
        studentListCached[i].RegistrationDate = RegistrationDate || null;
        updatedStudent = studentListCached[i];
        break;
      }
    }

    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
    return { status: response.status, message: responseParsed.message, updatedStudent };
  }
  return { status: response.status, message: responseParsed.message };
};

const updateReceipt = async (updatedReceipt) => {
  const response = await fetch('/api/receipt/updateReceipt', {
    method: 'POST',
    headers,
    body: JSON.stringify(updatedReceipt),
  });
  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message, receipt: updatedReceipt };
};

const deleteStudent = async (StudentID) => {
  const response = await fetch('/api/student/deleteStudent', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ StudentID }),
  });

  if (response.status === 200) {
    const removeIndex = studentListCached.findIndex((student) => student.StudentID === StudentID);
    studentListCached.splice(removeIndex, 1);

    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
  }

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const deleteReceipt = async (ReceiptID) => {
  const response = await fetch('/api/receipt/deleteReceipt', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ ReceiptID }),
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const deleteReceipts = async (ReceiptIDs) => {
  const response = await fetch('/api/receipt/deleteReceipts', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ ReceiptIDs }),
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const deleteTeacher = async (TeacherID) => {
  const response = await fetch('/api/teacher/deleteTeacher', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({
      TeacherID,
    }),
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const getAllStudents = async () => {
  const result = await fetch('/api/student/getStudents');
  const body = await result.json();

  sessionStorage.setItem('studentsList', JSON.stringify(body));

  return { allStudents: body };
};

const getAllTeachers = async () => {
  const result = await fetch('/api/teacher/getTeachers');
  const body = await result.json();

  return { teachers: body };
};

const getAllReceipts = async () => {
  const result = await fetch('/api/receipt/getAllReceipts');
  const body = await result.json();

  return { receipts: body };
};

const getStudentWithReceipts = async (TaxCode) => {
  const response = await fetch(`/api/student/getStudentWithReceipts/${TaxCode}`);
  const studentWithReceipts = await response.json();

  return { student: studentWithReceipts.student, receipts: studentWithReceipts.receipts };
};

export {
  createStudent,
  createReceipt,
  createTeacher,
  updateStudent,
  updateRegistrationDate,
  updateTeacher,
  updateReceipt,
  deleteStudent,
  deleteReceipt,
  deleteReceipts,
  deleteTeacher,
  getAllStudents,
  getAllTeachers,
  getAllReceipts,
  getStudentWithReceipts,
};
