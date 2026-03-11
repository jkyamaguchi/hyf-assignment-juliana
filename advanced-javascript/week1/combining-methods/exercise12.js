import { teas } from "../../data/teas.js";

// Get display prices (format: "Sencha - 12 DKK/100g") for organic teas only.

function getPricePerGram(tea) {
  return tea.pricePerGram * 100;
}

function getTeaNamePrice(tea) {
  console.log(`${tea.name} - ${getPricePerGram(tea)} DKK/100g`);
}

const organicPrices = teas.filter(function(tea){
    if (tea.organic){
        return tea;
    }
}).map(getTeaNamePrice);
