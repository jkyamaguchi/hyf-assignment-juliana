import { teas } from "../../data/teas.js";

// Count how many teas are organic. Use a variable outside the forEach to track the count.

let count=0;

function countOrganic(tea) {
  if (tea.organic){
    count++;
  }
}

teas.forEach(countOrganic);
console.log(`Quantity of organic teas: ${count}`);