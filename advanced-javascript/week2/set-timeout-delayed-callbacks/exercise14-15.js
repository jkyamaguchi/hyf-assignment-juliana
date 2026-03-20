import { teas } from "../../data/teas.js";
// Create a function findTeaById(id, callback) that simulates a database lookup with a 500ms delay.

function findTeaById(id, callback) {
  setTimeout(() => {
    const tea = teas.find((t) => t.id === id);
    callback(tea);
  }, 500);
}

// Test it:
console.log("Looking up tea...");
findTeaById(3, function (tea) {
  console.log("Found:", tea.name);
});
console.log("Request sent, waiting...");

// Expected output order:
// "Looking up tea..."
// "Request sent, waiting..."
// (after 500ms) "Found: Dragon Well"


// ex. 15
findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(5, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(10, function (tea) {
  console.log("Got:", tea.name);
});
console.log("All requests sent!");

// "All requests sent!" appears first, 
// then all three results appear together after 500ms.
// This is how backends handle multiple requests efficiently.