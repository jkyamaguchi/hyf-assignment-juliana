const class07Students = [];
const maxStudents = 6;
/**
 * Add the studentName to the class07Students array.
 * - There can be only 6 students in a class.
 * - The same person cannot be added to the class.
 * - The Queen should always get a space. Even if the class has been filled out.
 * - Not add empty string to a class.
 */

// Verify if studentName is not empty.
function isValidateStudent(studentName) {
  return studentName !== "" && studentName !== null;
}

function isStudentEnrolled(studentName, className) {
  return className.includes(studentName);
}

function getNumberOfStudents(className) {
  return className.length;
}

function isClassFilledOut(className) {
  return getNumberOfStudents(className) >= maxStudents;
}

function addStudentToClass(studentName, className) {
  if (isValidateStudent(studentName)) {
    if (!isStudentEnrolled(studentName, className)){
      if (!isClassFilledOut(className)) {
        className.push(studentName);
      }
      else{
        console.log(`No registration for ${studentName}. The class is filled out.`);  
      }
    } else {
      console.log(`The student ${studentName} was already enrolled to this class.`);
    }
  } else {
    console.log(`Student name is empty or not valid.`);
  }
}

// Considering there is only one queen.
function addTheQueen(queenName, className) {
  console.log(`Registering Queen ${queenName}.`);
  //If the class is full, remove the last student and add the queen.
  if (isClassFilledOut(className)) {
    className.pop();
  }
  addStudentToClass(queenName, className);
}

const students = [
  {
    name: "Maria",
    isQueen: false,
  },
  {
    name: "Helen",
    isQueen: false,
  },
  {
    name: "",
    isQueen: false,
  },
  {
    name: "Cecilia",
    isQueen: false,
  },
  {
    name: "Maria",
    isQueen: false,
  },
  {
    name: "Ana",
    isQueen: false,
  },
  {
    name: "Mariana",
    isQueen: false,
  },
  {
    name: "Tereza",
    isQueen: false,
  },
  {
    name: "Laura",
    isQueen: false,
  },
  {
    name: "Kimie",
    isQueen: true,
  },
];

for (student of students) {
  if (!student.isQueen) {
    addStudentToClass(student.name, class07Students);
  } else {
    addTheQueen(student.name, class07Students);
  }
  console.log(`Class: `, class07Students);
}
