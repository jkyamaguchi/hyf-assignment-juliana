const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

//Create a wait(ms) function that returns a Promise which resolves after ms milliseconds.

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Test it:
console.log("Starting...");
wait(2000).then(() => console.log("2 seconds passed!"));
