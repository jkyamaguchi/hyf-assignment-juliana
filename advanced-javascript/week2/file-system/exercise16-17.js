import { teas } from "../../data/teas.js";
import fs from "fs";

// ex. 16
// Write code that reads the file and logs how many orders are there

// ex. 17
// For each order, look up the tea prices from the teas array
// Calculate the total value of each order (pricePerGram * grams)
// Log each order's total

function calculateOrderTotal(order, teas) {
  let total = 0;
  let count = 0;
  for (const item of order.items) {
    const tea = teas.find((t) => t.id === item.teaId);
    if (!tea) continue;
    total += tea.pricePerGram * item.grams;
    count++;
  }
  return { orderTotal: total, itemCount: count };
}

function logOrderTotals(orders, teas) {
  orders.forEach((order, index) => {
    const { orderTotal, itemCount } = calculateOrderTotal(order, teas);
    const formattedTotal = orderTotal.toFixed(2);
    console.log(
      `Order ${index + 1}: ${formattedTotal} DKK (${itemCount} item${itemCount !== 1 ? "s" : ""})`,
    );
  });
}

fs.readFile("./orders.json", { encoding: "utf8" }, function (error, data) {
  if (error) {
    console.error(error);
    return;
  }
  const orders = JSON.parse(data);
  console.log("Number of orders:", orders.length);
  logOrderTotals(orders, teas);
});
