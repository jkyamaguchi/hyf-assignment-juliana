import { teas } from "../../data/teas.js";

// Use reduce to calculate the total stock for each caffeine level

function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    acc[tea.caffeineLevel] = (acc[tea.caffeineLevel] || 0) + tea.stockCount;
    return acc;
  }, {});
}

console.log(stockByCaffeine(teas));
// { high: 745, medium: 450, low: 190, none: 635 }