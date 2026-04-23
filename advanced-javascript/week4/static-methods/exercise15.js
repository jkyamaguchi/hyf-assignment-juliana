import { teas } from "../../data/teas.js";
import { Tea } from "../Tea.js";

// Convert all plain objects to Tea instances in one line:
const teaInstances = teas.map(Tea.fromObject);

console.log(teaInstances[0].describe());
// "Sencha (green) from Japan - 12.00 DKK/100g"
console.log(teaInstances[0].priceFor(100));
// 12