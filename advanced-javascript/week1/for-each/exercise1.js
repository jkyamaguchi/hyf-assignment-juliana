import { teas } from "../../data/teas.js";

// Log each tea's name to the console.

function getTeaName(tea) {
  console.log(tea.name);
}

teas.forEach(getTeaName);
