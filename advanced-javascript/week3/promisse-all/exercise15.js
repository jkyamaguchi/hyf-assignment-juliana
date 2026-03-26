const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a function that fetches ALL teas and ALL inventory data in parallel,
// then combines them into a single report.

async function getFullInventoryReport() {
  // Fetch both endpoints in parallel
  const [teas, inventory] = await Promise.all([
    fetch(`${API_BASE}/teas`).then((res) => res.json()),
    fetch(`${API_BASE}/inventory`).then((res) => res.json()),
  ]);

  // Combine: for each tea, add its stock count
  // Return array of { name, origin, stock }
  return teas.map((tea) => {
    const inventoryItem = inventory.find((item) => item.teaId === tea.id);
    return {
      name: tea.name,
      origin: tea.origin,
      stock: inventoryItem ? inventoryItem.stockCount : 0,
    };
  });
}

getFullInventoryReport().then((report) => {
  console.log("Inventory Report:");
  report.forEach((item) => {
    console.log(`- ${item.name} (${item.origin}): ${item.stock} in stock`);
  });
});