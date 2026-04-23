import { teas } from "../../data/teas.js";

import { TeaCatalog } from "../TeaCatalog.js";
import { Tea } from "../Tea.js";
import { Order } from "../Order.js"
import { OrderItem } from "../OrderItem.js"
import { Customer } from "../Customer.js";

// 1. Create a TeaCatalog from the tea data
const catalog = new TeaCatalog(
  teas.map((t) => new Tea(t.name, t.type, t.origin, t.pricePerGram, t.organic)),
);

// 2. Find all Japanese teas
const japaneseTeas = catalog.search("").filter((t) => t.origin === "Japan");

// 3. Create an order with 100g of each Japanese tea
const order = new Order();
japaneseTeas.forEach((tea) => {
  order.addItem(new OrderItem(tea, 100));
});

// 4. Create a customer and place the order
const customer = new Customer("Tea Lover", "lover@tea.com");
customer.placeOrder(order);

// 5. Log the summary
console.log(`${customer.name} ordered ${order.items.length} Japanese teas`);
console.log(`Total: ${customer.totalSpent().toFixed(2)} DKK`);