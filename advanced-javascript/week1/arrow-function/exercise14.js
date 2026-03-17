import { teas } from "../../data/teas.js";

// Rewrite exercises 1-3 using arrow functions.

// ex. 1
// Log each tea's name to the console.
teas.map((tea) => console.log(tea.name));

// ex. 2
// Log each tea in the format: "Sencha (Japan)"
teas.map((tea) => console.log(`${tea.name} (${tea.origin})`));

// ex.3
// Count how many teas are organic.
console.log(teas.filter((tea) => tea.organic).length);
