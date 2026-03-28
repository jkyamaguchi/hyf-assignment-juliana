const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Rewrite Exercise 5 using async/await - fetch a tea, then fetch its inventory.

async function getTeaWithStock(id) {
  try {
    const teaResponse = await fetch(`${API_BASE}/teas/${id}`);
    const tea = await teaResponse.json();
    console.log("Tea:", tea.name);

    const inventoryResponse = await fetch(`${API_BASE}/inventory/${tea.id}`);
    const inventory = await inventoryResponse.json();
    console.log("Inventory:", inventory);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getTeaWithStock(1);