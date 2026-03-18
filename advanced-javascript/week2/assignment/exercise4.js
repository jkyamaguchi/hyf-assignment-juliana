import { teas } from "../../data/teas.js";
import fs from "fs";

// Write a function that:
// Reads this file using a callback
// Uses reduce to calculate net change per tea
// Combines with original tea data to show new stock levels
// Logs a report

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    let updates;
    try {
      updates = JSON.parse(data);
    } catch (e) {
      callback(new Error("Invalid JSON in updates file"), null);
      return;
    }
    // Calculate net change per teaId
    const netChange = updates.reduce((acc, { teaId, change }) => {
      acc[teaId] = (acc[teaId] || 0) + change;
      return acc;
    }, {});
    // Build report with new stock
    const report = teas.map((tea) => ({
      id: tea.id,
      name: tea.name,
      oldStock: tea.stockCount,
      netChange: netChange[tea.id] || 0,
      newStock: tea.stockCount + (netChange[tea.id] || 0),
    }));
    callback(null, report);
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log("Inventory Report:");
  report
    .filter((item) => item.netChange !== 0)
    .forEach((item) => {
      const sign = item.netChange > 0 ? "+" : "";
      const negative = item.newStock < 0 ? " (NEGATIVE!)" : "";
      console.log(
        `- ${item.name}: was ${item.oldStock}, change ${sign}${item.netChange}, now ${item.newStock}${negative}`,
      );
    });
});
