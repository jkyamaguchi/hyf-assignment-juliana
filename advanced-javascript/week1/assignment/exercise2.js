import { teas } from "../../data/teas.js";

function inventoryReport(teas) {
  let inStock = 0;
  let outOfStock = 0;
  let totalInventoryValue = 0;
  let totalPrice = 0;
  teas.forEach((tea) => {
    if (tea.inStock) {
      inStock++;
    } else {
      outOfStock++;
    }
    totalInventoryValue += tea.pricePerGram * tea.stockCount;
    totalPrice += tea.pricePerGram;
  });
  return {
    totalTeas: teas.length,
    inStock: inStock,
    outOfStock: outOfStock,
    totalInventoryValue: totalInventoryValue,
    averagePrice: teas.length ? totalPrice / teas.length : 0,
  };
}

console.log(inventoryReport(teas));
