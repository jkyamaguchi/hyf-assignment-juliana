import { teas } from "../../data/teas.js";

// Create an array containing just the tea names.

function getTeaName(tea) {
  return tea.name;
}

const teasNames = teas.map(getTeaName);
console.log(teasNames);