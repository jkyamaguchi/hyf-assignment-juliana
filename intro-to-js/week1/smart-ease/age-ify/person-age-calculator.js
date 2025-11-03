let yearOfBirth;
let yearFuture;
let age;

function calculateAge(yearOfBirth, yearFuture) {
  return yearFuture - yearOfBirth;
}

yearOfBirth = 1983;
yearFuture = 2050;

age = calculateAge(yearOfBirth, yearFuture);

console.log(`You will be ${age} years old in ${yearFuture}.`);
