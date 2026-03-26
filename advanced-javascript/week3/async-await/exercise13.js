const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create an async function that:
//     Fetches all teas
//     Filters to organic teas
//     Gets inventory for each
//     Returns only those with stock > 100

async function fetchAllTeas() {
  const response = await fetch(`${API_BASE}/teas`);
  return response.json();
}

function filterOrganicTeas(teas) {
  return teas.filter((tea) => tea.organic === true);
}

async function fetchTeaInventory(teaId) {
  const response = await fetch(`${API_BASE}/inventory/${teaId}`);
  return response.json();
}

async function addStockToTea(tea) {
  const inventory = await fetchTeaInventory(tea.id);
  return {
    ...tea,
    stockCount: inventory.stockCount,
  };
}

function filterWellStockedTeas(teas) {
  return teas.filter((tea) => tea.stockCount > 100);
}

async function getWellStockedOrganicTeas() {
  try {
    const teas = await fetchAllTeas();
    const organicTeas = filterOrganicTeas(teas);
    const teasWithStock = await Promise.all(organicTeas.map(addStockToTea));
    return filterWellStockedTeas(teasWithStock);
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

getWellStockedOrganicTeas().then((teas) => {
  console.log("Well-stocked organic teas:", teas);
});
