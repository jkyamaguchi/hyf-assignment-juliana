import { teas } from "../../data/teas.js";

// Get Japanese teas sorted by price (lowest first).
// Hint: .sort((a, b) => a.pricePerGram - b.pricePerGram)

const fromJapanSortedByPrice = teas.filter(function (tea) {
  return tea.origin === "Japan";
}).sort((a, b) => a.pricePerGram - b.pricePerGram);

console.log(fromJapanSortedByPrice);