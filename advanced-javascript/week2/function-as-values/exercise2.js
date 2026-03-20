// Create a function called functionRunner 
// that takes a function as a parameter and calls it.

function functionRunner(fn) {
  // call the function that was passed in
  fn();
}

// Test it:
functionRunner(function () {
  console.log("I was called!");
});

// Also test with a function variable:
const sayHello = function () {
  console.log("Hello!");
};
functionRunner(sayHello);

// This is the core of callbacks: passing a function to another function that calls it.