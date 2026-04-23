import { teas } from "../../data/teas.js";
import { Tea } from "../Tea.js";

// Extend your Tea class to also accept pricePerGram and organic (boolean). 
// Create an instance from the first tea in the data array.

const firstTea = teas[0];
const tea = new Tea(
  firstTea.name,
  firstTea.type,
  firstTea.origin,
  firstTea.pricePerGram,
  firstTea.organic,
);
console.log(tea);
