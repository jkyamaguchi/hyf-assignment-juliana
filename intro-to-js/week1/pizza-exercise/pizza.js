console.log("I love pizza");

const favoritePizza = "Margherita";
const pricePizza = 100;

console.log(
  `New pizza order: ${favoritePizza}. The price of the pizza is: $${pricePizza}`
);

let amountPizza = 2;
let isFamilySize = true;

let totalPrice = isFamilySize
  ? amountPizza * pricePizza * 2
  : amountPizza * pricePizza;

let message = `New pizza order: ${amountPizza} ${favoritePizza}. Family or not? ${isFamilySize}. Total cost for the order is: $${totalPrice}`;

console.log(message);
