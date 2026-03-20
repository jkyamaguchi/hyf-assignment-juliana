import { teas } from "../../data/teas.js";

// Calculate the total inventory value: the sum of pricePerGram * stockCount for each tea.

const inventoryValue = teas.reduce((totalInventory, tea) => {
    return totalInventory + (tea.pricePerGram * tea.stockCount);
}, 0);
console.log(inventoryValue);