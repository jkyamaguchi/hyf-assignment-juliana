import { teas } from "../../data/teas.js";
import { Order } from "../Order.js";
import { Tea } from "../Tea.js";
import { OrderItem } from "../OrderItem.js";

// Build OrderItem and Order classes that work together.

const teaInstances = teas.map(Tea.fromObject);
const order = new Order();
order.addItem(new OrderItem(teaInstances[0], 200)); // Sencha
order.addItem(new OrderItem(teaInstances[7], 50)); // Matcha

console.log(order.getSummary());
console.log("Total:", order.getTotal().toFixed(2), "DKK");