const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Rewrite Exercise 1 using async/await

async function countTeas() {
  try {
    const response = await fetch(`${API_BASE}/teas`);
    const teas = await response.json();
    console.log("Found " + teas.length);
  } catch (error) {
    console.error(error.message);
  }
}

countTeas();
