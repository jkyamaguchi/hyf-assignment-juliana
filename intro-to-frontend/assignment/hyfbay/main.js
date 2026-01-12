console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// Get the container where the list will be added
const container = document.getElementById("list-container");

const list = document.createElement("ul");

// Create a simple header row for the list
const header = document.createElement("div");
header.className = "list-header";

const headerTitle = document.createElement("span");
headerTitle.className = "product-title";
headerTitle.textContent = "Title";

const headerPrice = document.createElement("span");
headerPrice.className = "product-price";
headerPrice.textContent = "Price";

const headerRating = document.createElement("span");
headerRating.className = "product-rating";
headerRating.textContent = "Rating";

header.appendChild(headerTitle);
header.appendChild(headerPrice);
header.appendChild(headerRating);

function getProduct(object) {
  const product = {
    productName: object.name,
    price: object.price,
    rating: object.rating,
  };
  return product;
}

// Render products as a simple list
function renderProducts(products) {
  container.appendChild(header);

  products.forEach((product) => {
    const li = document.createElement("li");
    const item = getProduct(product);

    // Title
    const title = document.createElement("span");
    title.className = "product-title";
    title.textContent = item.productName;

    // Price
    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = `$${item.price}`;

    // Rating
    const rating = document.createElement("span");
    rating.className = "product-rating";
    rating.textContent = "★".repeat(Math.round(item.rating));

    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(rating);

    list.appendChild(li);
  });

  container.appendChild(list);
}

renderProducts(products);
