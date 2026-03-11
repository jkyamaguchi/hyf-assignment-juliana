import { teas } from "../../data/teas.js";

function inventoryReport(teas) {
  return {
    totalTeas: teas.length,
    inStock: teas.filter((tea) => tea.inStock).length,
    outOfStock: teas.filter((tea) => !tea.inStock).length,
    totalInventoryValue: teas.map((tea) => tea.pricePerGram * tea.stockCount).reduce((totalInventoryValue, price) => totalInventoryValue + price, 0),
    averagePrice: teas.map((tea) => tea.pricePerGram).reduce((sum, price) => sum + price, 0) / teas.length
  };
}

console.log(inventoryReport(teas));