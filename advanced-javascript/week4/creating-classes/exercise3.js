import { teas } from "../../data/teas.js";
import { Tea } from "../Tea.js";

// Create the Tea instances using .map() and your class
const teaInstances = teas.map(
  (t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic),
);

console.log(teaInstances.length); // 20
console.log(teaInstances[0].name); // "Sencha"
