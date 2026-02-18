const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// Write some code here
console.log("names before removal");
console.log(names);

function removeName(nameToRemove) {
  const index = names.indexOf(nameToRemove);
  if (index > -1) {
    // only splice array when item is found
    names.splice(index, 1); // 2nd parameter means remove one item only
  }
}

removeName(nameToRemove);
// Code done
console.log("names after removal");
console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'Katrine', 'Tala']
