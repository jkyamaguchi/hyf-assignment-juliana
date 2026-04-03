import { Order } from "../Order.js";
import { Tea } from "../Tea.js";
import { OrderItem } from "../OrderItem.js";

const order = new Order();
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
order.addItem(new OrderItem(sencha, 100));
console.log(order.status); // "pending"

order.confirm();
console.log(order.status); // "confirmed"

// order.addItem(new OrderItem(sencha, 50));
// Error: "Cannot add items to a confirmed order"

order.ship();
order.deliver();
console.log(order.status); // "delivered"
