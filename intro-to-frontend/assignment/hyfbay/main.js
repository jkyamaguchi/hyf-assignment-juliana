console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// Get the container where the table will be added
const container = document.getElementById("list-container");

// Create a table element
const table = document.createElement("table");

// Create table header
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");

const headers = ["Product Name", "Price", "Rating"];
headers.forEach((headerText) => {
  const th = document.createElement("th");
  th.textContent = headerText;
  headerRow.appendChild(th);
});

thead.appendChild(headerRow);
table.appendChild(thead);

// Create table body
const tbody = document.createElement("tbody");
table.appendChild(tbody);

function getProduct(object) {
  const product = {
    productName: object.name,
    price: object.price,
    rating: object.rating,
  };
  return product;
}

// This should create the table with rows for individual products
function renderProducts(products) {
  products.forEach((product) => {
    const tr = document.createElement("tr"); // Create a new table row
    const item = getProduct(product);

    // Create table cells for each property
    const tdName = document.createElement("td");
    tdName.textContent = item.productName;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `$${item.price}`;

    const tdRating = document.createElement("td");
    // Convert rating number to stars
    const stars = "★".repeat(Math.round(item.rating));
    tdRating.textContent = stars;

    // Append cells to row
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdRating);

    tbody.appendChild(tr); // Append the row to the table body
  });
  // Append the table to the container
  container.appendChild(table);
}

renderProducts(products);
