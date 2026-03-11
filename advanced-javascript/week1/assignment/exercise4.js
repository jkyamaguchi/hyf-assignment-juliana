import { teas } from "../../data/teas.js";

function teasByOrigin(teas) {
  // Return object where keys are origins and values are arrays of tea names
  return teas.reduce((origin, tea) => {
    (origin[tea.origin] = origin[tea.origin] || []).push(tea.name);
    return origin;
  }, {});
}

console.log(teasByOrigin(teas));
