import { teas } from "../../data/teas.js";

function lowStockAlert(teas) {
  // Return array of objects with name and stockCount
  // Only teas with stockCount lower than 50, sorted by stockCount (lowest first)
  const result = teas
    .filter((tea) => tea.stockCount < 50)
    .map((tea) => ({ name: tea.name, stockCount: tea.stockCount }))
    .sort((a, b) => a.stockCount - b.stockCount);
  return result;
  
}

console.log(lowStockAlert(teas));