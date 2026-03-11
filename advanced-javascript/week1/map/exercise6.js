import { teas } from "../../data/teas.js";

// Create an array of display strings in the format: "Sencha - 12 DKK/100g"

function getPricePerGram(tea) {
  return tea.pricePerGram * 100;
}

teas.map(function (tea) {
  console.log(`${tea.name} - ${getPricePerGram(tea)} DKK/100g`);
});
