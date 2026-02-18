const dogYearFuture = 2027;
const dogYearOfBirth = 2020;
const shouldShowResultInDogYears = false;

function calculateAge(dogYearOfBirth, dogYearFuture) {
  if (shouldShowResultInDogYears) {
    return dogYearFuture - dogYearOfBirth;
  } else {
    return (dogYearFuture - dogYearOfBirth) * 7;
  }
}

const dogYear = calculateAge(dogYearOfBirth, dogYearFuture);

function showConsoleMessage() {
  if (shouldShowResultInDogYears) {
    console.log(
      `Your dog will be ${dogYear} dog years old in ${dogYearFuture}.`
    );
  } else {
    console.log(
      `Your dog will be ${dogYear} human years old in ${dogYearFuture}.`
    );
  }
}

showConsoleMessage();
