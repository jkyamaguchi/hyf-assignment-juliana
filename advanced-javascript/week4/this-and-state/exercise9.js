import { Tea } from "../Tea.js";
import { Inventory } from "../Inventory.js";

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const stock = new Inventory(sencha, 150);

console.log(stock.stockCount); // 150
stock.sell(50);
console.log(stock.stockCount); // 100
stock.restock(200);
console.log(stock.stockCount); // 300

stock.sell(500); // Error: "Not enough stock for Sencha (have 300, need 500)"
