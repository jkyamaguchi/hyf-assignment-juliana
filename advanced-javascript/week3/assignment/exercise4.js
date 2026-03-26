import { pathToFileURL } from "node:url";

import { API_BASE } from "./exercise1.js";

// Create a function that checks if all items in an order are in stock

export async function checkOrderStock(items) {
  // items is an array of { teaId, grams }
  // 1. Fetch inventory from API
  const response = await fetch(`${API_BASE}/inventory`);
  const inventory = await response.json();

  // 2. Check if each item has enough stock
  const shortages = items
    .map((item) => {
      const inventoryItem = inventory.find((inv) => inv.teaId === item.teaId);

      if (!inventoryItem) {
        return {
          teaId: item.teaId,
          name: `Tea ${item.teaId} not found`,
          needed: item.grams,
          available: 0,
        };
      }

      if (inventoryItem.stockCount < item.grams) {
        return {
          teaId: item.teaId,
          name: inventoryItem.teaName,
          needed: item.grams,
          available: inventoryItem.stockCount,
        };
      }

      return null;
    })
    .filter(Boolean);

  // 3. Return { inStock: boolean, shortages: [...] }
  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

const largeOrder = [
  { teaId: 9, grams: 100 },
  { teaId: 10, grams: 500 }, // might be out of stock
  { teaId: 11, grams: 9999 }, // definitely out of stock
];

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  checkOrderStock(largeOrder).then((result) => {
    if (result.inStock) {
      console.log("All items in stock!");
    } else {
      console.log("Shortages:");
      result.shortages.forEach((s) => {
        console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
      });
    }
  });
}
