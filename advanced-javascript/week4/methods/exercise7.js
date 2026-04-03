import { Tea } from "../Tea.js";
import { OrderItem } from "../OrderItem.js";

// Create an OrderItem class that takes a Tea instance and a number of grams. 
// Add a lineTotal() method.
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const item = new OrderItem(sencha, 200);

console.log(item.tea.name); // "Sencha"
console.log(item.grams); // 200
console.log(item.lineTotal()); // 24
