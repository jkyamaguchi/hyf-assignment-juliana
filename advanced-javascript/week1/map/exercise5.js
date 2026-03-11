import { teas } from "../../data/teas.js";

// Create an array of prices in DKK for 100 grams (multiply pricePerGram by 100).

function getPricePerGram(tea) {
  return Math.round(tea.pricePerGram * 100);
}

const teasPrices = teas.map(getPricePerGram);
console.log(teasPrices);