const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch the inventory endpoint and log which teas are low on stock (less than 50).

fetch(`${API_BASE}/inventory`)
  .then((response) => {
    return (teas = response.json());
  })
  .then((teas) => {
    const lowStock = teas.filter((tea) => tea.stockCount < 50);
    console.log("Low stock:")
    lowStock.forEach((element) => {
      console.log(`${element.teaName}: ${element.stockCount}` );
    });
  });
