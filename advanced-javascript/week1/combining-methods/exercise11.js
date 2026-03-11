import { teas } from "../../data/teas.js";

// Get the names of all green teas.
// filter to green type, then map to names

const greenTeas = teas
  .filter(function (tea) {
    if (tea.type === "green") {
      return tea;
    }
  })
  .map(function (tea) {
    return tea.name;
  });

console.log(greenTeas);
