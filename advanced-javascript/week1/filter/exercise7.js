import { teas } from "../../data/teas.js";

// Get all organic teas.

function getOrganic(tea) {
  return tea.organic;
}

const organics = teas.filter(getOrganic);
console.log(organics);
console.log(`Total of organics teas: ${organics.length}`);
