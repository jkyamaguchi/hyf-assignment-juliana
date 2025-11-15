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
  if (!isValidateStudent(studentName)) {
    console.log(`Student name is empty or not valid.`);
    return;
  }

  // Anything past this point is a valid student, so you don't need to check again

  if (isStudentEnrolled(studentName, className)) {
    console.log(
      `The student ${studentName} was already enrolled to this class.`
    );
    return;
  }

  // Anything after here is an enrolled student.

  if (isClassFilledOut(className)) {
    // But is the Queen
    if (studentName.includes("Queen")) {
      console.log(`Registering ${studentName}.`);
      className.push(studentName);
      return;
    }

    console.log(`No registration for ${studentName}. The class is filled out.`);
    return;
  }

  // Anything after here is a valid registration.

  // Add the student if all the "checkpoints" are passed
  className.push(studentName);
}

// Instead of specifying who the queen is,
// we could have also done it based on name matching for example.
// But ... if a non-royal person is named with the same name of the queen?
// In order to unify the addStudent logic between plebe and queen,
// the treatment 'Queen' must be in the name.
const students = [
  {
    name: "Maria",
  },
  {
    name: "Helen",
  },
  {
    name: "",
  },
  {
    name: "Cecilia",
  },
  {
    name: "Maria",
  },
  {
    name: "Ana",
  },
  {
    name: "Mariana",
  },
  {
    name: "Tereza",
  },
  {
    name: "Laura",
  },
  {
    name: "Queen Kimie",
  },
];

for (student of students) {
  addStudentToClass(student.name, class07Students);
  console.log(`Class: `, class07Students);
}
