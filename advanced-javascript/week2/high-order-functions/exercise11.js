import { teas } from "../../data/teas.js";

// Create your own myFilter(array, callback) function that works like the built-in filter.

function myFilter(array, callback) {
  const filter = [];
  for (let i = 0; i < array.length; i++) {
    const result = callback(array[i]); 
    if (result){
        filter.push(result);
    }
  }
  return filter;
}

// Test it:
const organic = myFilter(teas, function (tea) {
  return tea.organic;
});
console.log(organic.length); // number of organic teas