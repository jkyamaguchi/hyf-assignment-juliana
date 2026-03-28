import { pathToFileURL } from "node:url";

import { fetchAllTeas } from "./exercise1.js";

// Create a function that calculates the total for an order

export async function calculateOrderTotal(items, providedTeas) {
  // items is an array of { teaId, grams }
  // 1. Fetch all teas from API
  const teas = providedTeas || (await fetchAllTeas());

  // 2. For each item, find the tea and calculate price
  const totalPrice = items.reduce((sum, item) => {
    const tea = teas.find((t) => t.id === item.teaId);

    if (!tea) {
      throw new Error(`Tea with id ${item.teaId} not found`);
    }

    return sum + tea.pricePerGram * item.grams;
  }, 0);

  // 3. Return total price
  return totalPrice;
}

const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  calculateOrderTotal(order)
    .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
    .catch((err) => console.error("Error:", err.message));
}
