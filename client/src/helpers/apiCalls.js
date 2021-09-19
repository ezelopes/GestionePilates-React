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

  const responseParsed = await response.json();

  if (response.status === 200) {
    newReceipt.ReceiptID = responseParsed.ReceiptID
    return { status: response.status, message: responseParsed.message, receipt: newReceipt }
  }
  
  return { status: response.status, message: responseParsed.message }
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

  if (response.status === 200) {
    const studentsListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    
    for (let i = 0; i < studentsListCached.length; i++) {
      if(updatedStudent.StudentID === studentsListCached[i].StudentID) {
        studentsListCached[i] = updatedStudent;
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentsListCached));
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

  return { status: response.status, message: responseParsed.message }
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

  const responseParsed = await response.json();

  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    let updatedStudent = null

    for (let i = 0; i < studentListCached.length; i++) {
      if (StudentID === studentListCached[i].StudentID) {
        studentListCached[i].RegistrationDate = RegistrationDate || null;
        updatedStudent = studentListCached[i]
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));
    return { status: response.status, message: responseParsed.message, updatedStudent }
  }
  return { status: response.status, message: responseParsed.message }
}

const updateReceipt = async (updatedReceipt) => {
  const response = await fetch('/api/receipt/updateReceipt', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedReceipt)
  });
  const responseParsed = await response.json();
  
  return { status: response.status, message: responseParsed.message, receipt: updatedReceipt }
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

const deleteReceipt = async (ReceiptID) => {
  const response = await fetch('/api/receipt/deleteReceipt', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ReceiptID })
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message }
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

  return { status: response.status, message: responseParsed.message }
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