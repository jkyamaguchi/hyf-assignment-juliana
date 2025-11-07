function calculateAge(yearOfBirth, yearFuture) {
  return yearFuture - yearOfBirth;
}

const yearOfBirth = 1983;
const yearFuture = 2050;

const age = calculateAge(yearOfBirth, yearFuture);

console.log(`You will be ${age} years old in ${yearFuture}.`);
