import { teas } from "../../data/teas.js";

function searchTeas(teas, query) {
  // Return teas where the name contains the query (case-insensitive)
  const query_normalized = query.toLowerCase();
  const filteredTeas = teas.filter((tea) =>
    tea.name.toLowerCase().includes(query_normalized)
  );
  // Return just the names, sorted alphabetically
  return filteredTeas.map((tea) => tea.name).sort((a, b) => a.name - b.name);;
}

console.log(searchTeas(teas, "earl"));
console.log(searchTeas(teas, "dragon"));
console.log(searchTeas(teas, "ch"));