import { teas } from "../../data/teas.js";

// ex. 2
// Create an order processing system with simulated delays.

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = [];
    for (const item of order.items) {
      const teaExists = teas.some((tea) => tea.id === item.teaId);
      if (!teaExists) {
        errors.push(`Tea id ${item.teaId} does not exist.`);
      }
    }
    callback({ valid: errors.length === 0, errors });
  }, 200);
}

// Test validateOrder
validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

function calculateTotal(order, callback) {
  setTimeout(() => {
    let total = 0;
    for (const item of order.items) {
      const tea = teas.find((t) => t.id === item.teaId);
      total += tea.pricePerGram * item.grams;
    }
    callback({ orderId: order.id, total });
  }, 300);
}


// Test calculateTotal
calculateTotal(order, (result) => {
  console.log("Total calculation:", result);
});

function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = [];
    for (const item of order.items) {
      const tea = teas.find((t) => t.id === item.teaId);
      if (!tea.inStock || tea.stockCount < item.grams) {
        shortages.push(
          `Not enough stock for ${tea.name} (id ${tea.id}). Requested: ${item.grams}g, Available: ${tea.stockCount}g.`
        );
      }
    }
    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages,
    });
  }, 400);
}

// Test checkStock
checkStock(order, (result) => {
  console.log("Stock check:", result);
});

// ex. 3

// Using the functions from Exercise 2, process an order through all three steps in sequence:
// First validate
// If valid, calculate total
// If total calculated, check stock
// Log final result
// This requires "callback nesting" - calling the next function inside the previous callback.

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");
      checkStock(order, (stockResult) => {
        console.log("Stock check result:", stockResult);
      });
    });
  });
}

processOrder(order);