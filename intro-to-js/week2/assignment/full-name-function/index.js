/**
 * List of contacts, where the formal name works for both man and women.
 */
const contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    useFormalName: true,
    formalName: "Lord",
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    useFormalName: true,
    formalName: "Lord",
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    useFormalName: false,
    formalName: "Lord",
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    useFormalName: true,
    formalName: "Lord",
  },
  {
    firstName: "",
    lastName: "",
    useFormalName: true,
    formalName: "Lord",
  },
  {
    firstName: "Maria",
    lastName: "Antonieta",
    useFormalName: true,
    formalName: "Madam",
  },
  {
    firstName: "Jesper",
    lastName: "Jespersen",
    useFormalName: true,
    formalName: "",
  },  
];

/**
 * If useFormalName is not given as an argument, shows only first and last name.
 */
function getFullName(firstName, lastName, useFormalName, formalName) {
  if (formalName !== "" && formalName !== null && useFormalName) {
    return `${formalName} ${firstName} ${lastName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
}

function existEmptyName(firstName, lastName) {
  if (firstName === "" || lastName === "") {
    return true;
  } else {
    return false;
  }
}

for (let contact of contacts) {
  if (existEmptyName(contact.firstName, contact.lastName)) {
    console.log("First name and last name should be informed.");
  } else {
    let fullName = getFullName(
      contact.firstName,
      contact.lastName,
      contact.useFormalName,
      contact.formalName
    );
    console.log("Full name: ", fullName);
  }
}
