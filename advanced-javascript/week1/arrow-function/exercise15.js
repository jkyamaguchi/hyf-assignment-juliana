import { teas } from "../../data/teas.js";

// Rewrite exercises 4-6 using arrow functions with implicit return (no curly braces).

// ex. 4
// Create an array containing just the tea names.
const teasNames = teas.map((tea) => tea.name);
console.log(teasNames);

// ex. 5
// Create an array of prices in DKK for 100 grams (multiply pricePerGram by 100).
const teasPrices = teas.map((tea) => Math.round(tea.pricePerGram * 100));
console.log(teasPrices);

// ex. 6
// Create an array of display strings in the format: "Sencha - 12 DKK/100g"
teas.map((tea) => console.log(`${tea.name} - ${tea.pricePerGram * 100} DKK/100g`));

