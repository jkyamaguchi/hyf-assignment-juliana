const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch a tea, then fetch its inventory status. Log both pieces of information.

fetch(`${API_BASE}/teas/1`)
  .then((response) => response.json())
  .then((tea) => {
    console.log("Tea:", tea.name);
    // Return a new fetch to chain it
    return fetch(`${API_BASE}/inventory/${tea.id}`);
  })
  .then((response) => response.json())
  .then((inventory) => {
    // Find this tea's stock in the inventory
    // Log the stock count
    console.log(inventory);
  })
  .catch((error) => console.error("Error:", error.message));