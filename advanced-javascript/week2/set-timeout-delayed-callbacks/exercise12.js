// What order will these console.logs appear? 
// Write your prediction first, then run the code to check.

console.log("1. Starting");

setTimeout(function () {
  console.log("2. Timeout done");
}, 1000);

console.log("3. Continuing");