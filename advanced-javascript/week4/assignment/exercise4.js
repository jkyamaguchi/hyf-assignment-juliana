import { teas } from "../../data/teas.js";
import { Tea } from "../Tea.js";
import { Customer } from "../Customer.js";
import { Order } from "../Order.js";
import { OrderItem } from "../OrderItem.js";

// Build a Customer class that tracks order history and spending.
// Return formatted string of all orders

const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");

// "Alex (alex@example.com) - 2 orders"
// ""
// "Order 1 (confirmed) - 1 item"
// "  100g Sencha - 12.00 DKK"
// "Total: 12.00 DKK"
// ""
// "Order 2 (confirmed) - 1 item"
// "  50g Matcha - 22.50 DKK"
// "Total: 22.50 DKK"
// ""
// "Lifetime total: 34.50 DKK"
