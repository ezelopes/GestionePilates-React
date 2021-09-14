import { toast } from 'react-toastify';
import { receiptType } from '../commondata/commondata'
import toastConfig from '../helpers/toast.config';

import 'react-toastify/dist/ReactToastify.css';

const createStudent = async (newStudent) => {
  console.log(newStudent);
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  const response = await fetch('/api/student/createStudent', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStudent)
  });

  if (response.status === 200) {
    const responseParsed = await response.json();
    const StudentID = responseParsed.StudentID;
    newStudent.StudentID = StudentID;
    
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    studentListCached.push(newStudent);
    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));
    
    alert('Allieva Creata Correttamente');
  }
  // resetForm();
};

const createReceipt = async (newReceipt) => {
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  if (!newReceipt.ReceiptNumber || newReceipt.ReceiptNumber === '') return toast.error('Numero Ricevuta non puo essere vuoto', toastConfig);

  const response = await fetch('/api/receipt/createReceipt', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newReceipt)
  });

  if (newReceipt.ReceiptType === receiptType[1].type) {
    delete newReceipt.CourseStartDate;
    delete newReceipt.CourseEndDate;
  }

  if (response.status === 200) {
    const responseParsed = await response.json();
    alert(responseParsed.message);
    window.location.reload();
  }
};

const createTeacher = async (newTeacher) => {
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  const response = await fetch('/api/teacher/createTeacher', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTeacher)
  });

  if (response.status === 200) {
    const responseParsed = await response.json();
    
    alert('Insegnante Creata Correttamente');
  }
  // resetForm();
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
  
  // update session storage
  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    
    for (let i = 0; i < studentListCached.length; i++) {
      if(updatedStudent.StudentID === studentListCached[i].StudentID) {
        studentListCached[i] = updatedStudent;
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));

    window.location.assign(`/paginaallieve/${updatedStudent.TaxCode}`)
    const responseParsed = await response.json();
    alert(responseParsed.message);
  }
  
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
  alert(responseParsed.message);
  window.location.reload();
  return;
}

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
  alert(responseParsed.message);
  window.location.reload();
}

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
  alert(responseParsed.message);
  window.location.reload();
}

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