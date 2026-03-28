import { pathToFileURL } from "node:url";

export const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a function that searches for teas by name

export async function fetchAllTeas() {
  const response = await fetch(`${API_BASE}/teas`);
  return response.json();
}

export async function searchTeas(query) {
  // 1. Fetch all teas from the API
  const teas = await fetchAllTeas();

  // 2. Filter to teas where name includes query (case-insensitive)
  const matches = teas.filter((tea) =>
    tea.name.toLowerCase().includes(query.toLowerCase()),
  );

  // 3. Return array of matching tea objects
  return matches;
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  // Test it:
  searchTeas("pearl").then((teas) => {
    console.log("Search results for 'pearl':");
    teas.forEach((tea) => console.log(`- ${tea.name}`));
  });
}
