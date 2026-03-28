const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch all teas from the API and log how many there are.

fetch(`${API_BASE}/teas`)
  .then((response) => {
    return (teas = response.json());
    // response.json() also returns a Promise
    // that's why you need a second .then() to get the actual data.
  })
  .then((teas) => {
    console.log("Found " + teas.length);
  });
