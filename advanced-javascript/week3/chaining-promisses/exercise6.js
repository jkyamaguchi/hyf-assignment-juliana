const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch all teas, filter to only Japanese teas, then for each one log its name and price. All using .then() chains.

fetch(`${API_BASE}/teas?origin=Japan`)
  .then((response) => response.json())
  .then((teas) => {
    teas.forEach((element) => {
      console.log(`${element.name} - ${element.pricePerGram} DKK/g`);
    });
  })
  .catch((error) => console.error(error));
