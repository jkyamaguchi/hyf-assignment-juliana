import { pathToFileURL } from "node:url";

import { API_BASE } from "./exercise1.js";

// Create a function that gets full details for a tea, including its current stock

export async function getTeaDetails(id) {
  // Fetch tea and inventory in PARALLEL using Promise.all
  const [tea, inventory] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}`).then((res) => res.json()),
    fetch(`${API_BASE}/inventory/${id}`).then((res) => res.json()),
  ]);

  // Return combined object: { ...tea, stock: number }
  return {
    ...tea,
    stock: inventory.stockCount,
  };
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  // Test it:
  getTeaDetails(1).then((tea) => {
    console.log(`${tea.name} (${tea.origin})`);
    console.log(`Price: ${tea.pricePerGram} DKK/gram`);
    console.log(`Stock: ${tea.stock} grams`);
    console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
  });
}
