const firstWords = [
  "Neon",
  "Cloud",
  "Quantum",
  "Rocket",
  "Pixel",
  "Echo",
  "Moon",
  "Nova",
  "Flux",
  "Binary",
];

const secondWords = [
  "Forge",
  "Labs",
  "Nest",
  "Pulse",
  "Verse",
  "Shift",
  "Works",
  "Bloom",
  "Spark",
  "Engine",
];

let startupName;

//Parameter range as the length of the array
function getRandomNumber(range){
  return Math.floor(Math.random() * range);
}

function generateStartupName() {
  const randomNumber1 = getRandomNumber(firstWords.length);
  const randomNumber2 = getRandomNumber(secondWords.length);;

  return firstWords[randomNumber1] + " " + secondWords[randomNumber2];
}

startupName = generateStartupName();

const startupNameLength = startupName.length;

console.log(
  `The startup name "${startupName}" contains ${startupNameLength} characters.`
);
