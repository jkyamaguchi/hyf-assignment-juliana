const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Try fetching a tea that doesn't exist (ID 999). Handle the error with .catch().

fetch(`${API_BASE}/teas/999`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((tea) => {
    console.log(tea.name);
  })
  .catch((error) => {
    console.error("Tea not found:", error.message);
  });