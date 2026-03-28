const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch a single tea by ID and log its name and origin.

fetch(`${API_BASE}/teas/3`)
  .then((response) => {
    return (tea = response.json());
  })
  .then((tea) => {
    console.log(tea.name + " from " + tea.origin);
  });
