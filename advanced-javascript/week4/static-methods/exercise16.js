import { teas } from "../../data/teas.js";

import { Tea } from "../Tea.js";


const teaInstances = teas.map(Tea.fromObject);

console.log(Tea.findCheapest(teaInstances).name);
// "English Breakfast"

console.log(Tea.findMostExpensive(teaInstances).name);
// "Gyokuro"

console.log(Tea.averagePrice(teaInstances).toFixed(2));
// "0.22"

