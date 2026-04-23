import { teas } from "../../data/teas.js";
import { TeaShop } from "../TeaShop.js";

// Build a TeaShop class that orchestrates all the other classes together.

const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  { teaName: "Peppermint", grams: 50 },
]);
console.log(order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());