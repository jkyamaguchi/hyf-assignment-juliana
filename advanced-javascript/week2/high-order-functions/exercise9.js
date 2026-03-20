import { teas } from "../../data/teas.js";

// Create your own myForEach(array, callback) function
// that works like the built-in forEach.

function myForEach(array, callback) {
  // loop through array
  // call callback for each item
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

// Test it:
myForEach(teas, function (tea) {
  console.log(tea.name);
});
