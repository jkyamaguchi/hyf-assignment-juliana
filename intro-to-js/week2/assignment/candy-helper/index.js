const candyTypes = [
  {
    type: "Sweet",
    price: 0.5,
  },
  {
    type: "Chocolate",
    price: 0.7,
  },
  {
    type: "Toffee",
    price: 1.1,
  },
  {
    type: "Chewing-gum",
    price: 0.03,
  },
];

const boughtCandyPrices = [];
const amountToSpend = (Math.random() * 100).toFixed(2);

function addCandy(candyType, weight) {
  const found = candyTypes.find((element) => element.type == candyType);
  const value = weight * found.price;
  boughtCandyPrices.push(value);
  console.log(boughtCandyPrices);
}

function canBuyMoreCandy() {
  let totalPrice = 0;
  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalPrice += boughtCandyPrices[i];
  }
  console.log("Should pay:", totalPrice);
  if (totalPrice < amountToSpend) {
    console.log("You can buy more, so please do!");
    return true;
  } else {
    console.log("Enough candy for you! Returning the last candy...");
    boughtCandyPrices.pop();
    return false;
  }
}

// Weight in grams
const candyBag = [
  {
    type: "Sweet",
    weight: 20,
  },
  {
    type: "Chocolate",
    weight: 50,
  },
  {
    type: "Toffee",
    weight: 30,
  },
  {
    type: "Chewing-gum",
    weight: 20,
  },
  {
    type: "Sweet",
    weight: 30,
  },
  {
    type: "Chocolate",
    weight: 90,
  },
  {
    type: "Toffee",
    weight: 50,
  },
  {
    type: "Chewing-gum",
    weight: 30,
  },
];

function calculateTotalPrice() {
  let total = 0;
  for (let i = 0; i < boughtCandyPrices.length; i++) {
    total += boughtCandyPrices[i];
  }
  return total;
}

function buyCandies() {
  console.log("My budget:", amountToSpend);
  let i = 0;
  do {
    addCandy(candyBag[i].type, candyBag[i].weight);
    i++;
  } while (canBuyMoreCandy());
  console.log("Total price: ", calculateTotalPrice());
}

buyCandies();
