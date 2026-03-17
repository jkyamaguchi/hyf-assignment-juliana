import { teas } from "../../data/teas.js";

// Use reduce to calculate the total stockCount across all teas.

const totalStock = teas.reduce((sum, tea) => {
  return sum + tea.stockCount
}, 0);

console.log(totalStock); // sum of all stockCount values