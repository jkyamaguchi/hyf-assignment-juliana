import { teas } from "../../data/teas.js";

function searchTeas(teas, query) {
  // Return teas where the name contains the query (case-insensitive)
    const filteredTeas = teas.filter((tea) =>
    tea.name.toLowerCase().includes(query),
  );
  // Return just the names, sorted alphabetically
  // After the map, a and b are already strings, not objects.
  return filteredTeas.map((tea) => tea.name).sort((a, b) => a.localeCompare(b));
}

console.log(searchTeas(teas, "earl"));
console.log(searchTeas(teas, "dragon"));
console.log(searchTeas(teas, "ch"));
