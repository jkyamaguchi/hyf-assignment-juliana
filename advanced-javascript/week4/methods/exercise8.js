import { teas } from "../../data/teas.js";
import { Tea } from "../Tea.js";
import { OrderItem } from "../OrderItem.js";

// Add a describe() method to OrderItem that returns a formatted line
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const item = new OrderItem(sencha, 200);
console.log(item.describe());
// "200g Sencha - 24.00 DKK"

// Function to transform a tea object into a Tea instance and log it
function createTea(teaObj) {
  const tea = new Tea(
    teaObj.name,
    teaObj.type,
    teaObj.origin,
    teaObj.pricePerGram,
    teaObj.organic,
  );
  return tea;
}

const tea0 = createTea(teas[0]);
const tea1 = createTea(teas[1]);
const tea7 = createTea(teas[7]);


const items = [
  new OrderItem(tea0, 100),
  new OrderItem(tea1, 200),
  new OrderItem(tea7, 50),
];

items.map((item) => item.describe()).forEach((line) => console.log(line));
// "100g Sencha - 12.00 DKK"
// "200g Earl Grey - 16.00 DKK"
// "50g Matcha - 22.50 DKK"
