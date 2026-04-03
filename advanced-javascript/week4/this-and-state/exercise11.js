import { Tea } from "../Tea.js";
import { Order } from "../Order.js";
import { OrderItem } from "../OrderItem.js";

// Add a getTotal() method to your Order class that uses .reduce() to sum all item totals:

const order = new Order();
order.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
order.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);

console.log(order.getTotal()); // 34.5  (12 + 22.5)

// Also add a getSummary() method that returns a formatted order summary:
console.log(order.getSummary());
// Order (pending) - 2 items
// - 100g Sencha - 12.00 DKK
// - 50g Matcha - 22.50 DKK
// Total: 34.50 DKK