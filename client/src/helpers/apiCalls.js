import { receiptType } from '../commondata/commondata'

import 'react-toastify/dist/ReactToastify.css';

const createStudent = async (newStudent) => {
  const response = await fetch('/api/student/createStudent', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStudent)
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    const { StudentID } = responseParsed;

    newStudent.StudentID = StudentID;
    
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    studentListCached.push(newStudent);
    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));
  }

  return { status: response.status, message: responseParsed.message }
};

const createReceipt = async (newReceipt) => {
  const response = await fetch('/api/receipt/createReceipt', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newReceipt)
  });

  // TODO: Double Check this if statement
  if (newReceipt.ReceiptType === receiptType[1].type) {
    delete newReceipt.CourseStartDate;
    delete newReceipt.CourseEndDate;
  }

  const responseParsed = await response.json();
  
  return { status: response.status, message: responseParsed.message }
  // if (response.status === 200) {
  //   alert(responseParsed.message);
  //   window.location.reload();
  // }
};

const createTeacher = async (newTeacher) => {
  const response = await fetch('/api/teacher/createTeacher', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTeacher)
  });
  
  const responseParsed = await response.json();
  return { status: response.status, message: responseParsed.message }
};

const updateStudent = async (updatedStudent) => {
  const response = await fetch('/api/student/updateStudent', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedStudent)
  });
  
  const responseParsed = await response.json();

  // update session storage
  if (response.status === 200) {
    const studentsListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    
    for (let i = 0; i < studentsListCached.length; i++) {
      if(updatedStudent.StudentID === studentsListCached[i].StudentID) {
        studentsListCached[i] = updatedStudent;
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentsListCached));

    // TODO: UPDATE HERE
    // window.location.assign(`/paginaallieve/${updatedStudent.TaxCode}`)
  }

  return { status: response.status, message: responseParsed.message }
}

const updateTeacher = async (updatedTeacherInfo) => {
  const response = await fetch('/api/teacher/updateTeacher', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTeacherInfo)
  });
  const responseParsed = await response.json();
  // TODO: UPDATE HERE
  // window.reload()

  return { status: response.status, message: responseParsed.message }
}

// TODO: UPDATE HERE
const updateRegistrationDate = async (StudentID, RegistrationDate) => {
  const response = await fetch('/api/student/updateRegistrationDate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ StudentID, RegistrationDate })
  });

  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    
    for (let i = 0; i < studentListCached.length; i++) {
      if(StudentID === studentListCached[i].StudentID) {
        studentListCached[i].RegistrationDate = RegistrationDate || null;
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));

    const responseParsed = await response.json();
    alert(responseParsed.message);
    return window.location.reload();
  }
  return alert('Error');
}

// TODO: UPDATE HERE
const updateReceipt = async (updatedReceipt) => {
  const response = await fetch('/api/receipt/updateReceipt', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ReceiptID: updatedReceipt.ReceiptID,
      ReceiptNumber: updatedReceipt.ReceiptNumber,
      ReceiptType: updatedReceipt.ReceiptType,
      ReceiptDate: updatedReceipt.ReceiptDate,
      CourseStartDate: updatedReceipt.CourseStartDate,
      CourseEndDate: updatedReceipt.CourseEndDate,
      AmountPaid: updatedReceipt.AmountPaid,
      PaymentMethod: updatedReceipt.PaymentMethod,
    })
  });
  const responseParsed = await response.json();
  
  return { status: response.status, message: responseParsed.message }
  // alert(responseParsed.message);
  // window.location.reload();
}

// TODO: UPDATE HERE
const deleteStudent = async (StudentID) => {
  const response = await fetch('/api/student/deleteStudent', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ StudentID })
  });

  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));

    const removeIndex = studentListCached.findIndex(student => student.StudentID === StudentID);
    studentListCached.splice(removeIndex, 1);

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));
  }

  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.assign('/paginaallieve');
}

// TODO: UPDATE HERE
const deleteReceipt = async (ReceiptID) => {
  const response = await fetch('/api/receipt/deleteReceipt', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ReceiptID
    })
  });
  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message }
  // alert(responseParsed.message);
  // window.location.reload();
}

// TODO: UPDATE HERE
const deleteTeacher = async (TeacherID) => {
  const response = await fetch('/api/teacher/deleteTeacher', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      TeacherID
    })
  });
  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.reload();
}

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
  deleteTeacher,
};