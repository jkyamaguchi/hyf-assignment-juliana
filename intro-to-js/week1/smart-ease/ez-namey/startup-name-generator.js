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

function generateStartupName() {
  const randomNumber1 = Math.floor(Math.random() * 10);
  const randomNumber2 = Math.floor(Math.random() * 10);

  return firstWords[randomNumber1] + " " + secondWords[randomNumber2];
}

startupName = generateStartupName();

const startupNameLength = startupName.length;

console.log(
  `The startup name "${startupName}" contains ${startupNameLength} characters.`
);
