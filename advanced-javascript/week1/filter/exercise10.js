import { teas } from "../../data/teas.js";

// Get all teas that are both in stock AND organic.

function getInStock(tea){
 return tea.inStock;
}

function getOrganic(tea) {
  return tea.organic; 
}

const inStockAndOrganicTeas = teas.filter(getInStock).filter(getOrganic);

console.log(inStockAndOrganicTeas);
console.log(`Total teas with high stock and organic: ${inStockAndOrganicTeas.length}`);