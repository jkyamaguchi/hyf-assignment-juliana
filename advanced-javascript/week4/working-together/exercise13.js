import { Customer } from "../Customer.js";
import { Order } from "../Order.js"
import { OrderItem } from "../OrderItem.js"
import { Tea } from "../Tea.js";

const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);
customer.placeOrder(order2);

console.log(customer.orders.length); // 2
console.log(customer.totalSpent()); // 34.5