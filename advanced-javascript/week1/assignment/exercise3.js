import { teas } from "../../data/teas.js";

function lowStockAlert(teas) {
  // Return array of objects with name and stockCount
  // sorted by stockCount (lowest first)
  const result = teas
    .map((tea) => ({ name: tea.name, stockCount: tea.stockCount }))
    .sort((a, b) => a.stockCount - b.stockCount);
  return result;
  
}

console.log(lowStockAlert(teas));