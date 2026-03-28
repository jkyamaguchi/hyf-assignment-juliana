import { fetchAllTeas } from "./exercise1.js";
import { calculateOrderTotal } from "./exercise3.js";
import { checkOrderStock } from "./exercise4.js";

// Combine everything into a complete order processing flow

export async function processOrder(items) {
  console.log("Processing order...\n");

  // Step 1: Validate items exist
  console.log("1. Validating items...");
  const teas = await fetchAllTeas();
  const teaIds = new Set(teas.map((tea) => tea.id));
  const unknownIds = [
    ...new Set(
      items.map((item) => item.teaId).filter((teaId) => !teaIds.has(teaId)),
    ),
  ];

  if (unknownIds.length > 0) {
    throw new Error(`Unknown teaId(s): ${unknownIds.join(", ")}`);
  }

  // Step 2: Check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    const details = stockResult.shortages
      .map((s) => `${s.name} (need ${s.needed}, have ${s.available})`)
      .join("; ");
    throw new Error(`Items out of stock: ${details}`);
  }

  // Step 3: Calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items, teas);

  // Step 4: Create order summary
  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });
