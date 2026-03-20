import { teas } from "../../data/teas.js";

// Use reduce to group tea names by their origin country.

const groupedByOrigin = teas.reduce((countries, tea) => {
//   if (!countries[tea.origin]) {
//     countries[tea.origin] = [];
//   }
//   countries[tea.origin].push(tea.name);
(countries[tea.origin] ||= []).push(tea.name);
  return countries;
}, {});
console.log(groupedByOrigin);
// Expected: { Japan: ["Sencha", "Matcha", ...], China: [...], ... }
