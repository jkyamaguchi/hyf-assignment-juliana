import { teas } from "../../data/teas.js";

// Create your own myMap(array, callback) function that works like the built-in map.

function myMap(array, callback) {
  const result = [];
  // loop through array
  // call callback for each item
  // push the return value to result
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }

  return result;
}

// Test it:
const names = myMap(teas, function (tea) {
  return tea.name;
});
console.log(names); // ["Sencha", "Earl Grey", ...]
