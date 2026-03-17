import { teas } from "../../data/teas.js";

// Get all teas with caffeineLevel equal to "high".

const highCaffeinLevelTeas = teas.filter(function (tea) {
  return tea.caffeineLevel === "high";
});

console.log(highCaffeinLevelTeas);
console.log(`Total high caffein levels: ${highCaffeinLevelTeas.length}`);
