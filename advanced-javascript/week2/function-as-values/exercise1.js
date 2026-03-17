import { teas } from "../../data/teas.js";

// Create a function that logs a tea's name and origin in the format "Sencha (Japan)"

const logTea = function (tea) {
  console.log(`${tea.name} (${tea.origin})`);
};

logTea(teas[0]); // should log: "Sencha (Japan)"