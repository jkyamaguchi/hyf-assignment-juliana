import { teas } from "../../data/teas.js";

// Get all teas from Japan.

const fromJapan = teas.filter(function (tea) {
  return tea.origin === "Japan";
});

console.log(fromJapan);
console.log(`Total of organics teas from Japan: ${fromJapan.length}`);
