import { teas } from "../../data/teas.js";

// Log each tea in the format: "Sencha (Japan)"

function getTeaNameOrigin(tea) {
  console.log(`${tea.name} (${tea.origin})`);
}

teas.forEach(getTeaNameOrigin);