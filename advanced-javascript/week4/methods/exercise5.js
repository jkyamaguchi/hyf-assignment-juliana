import { Tea } from "../Tea.js";

// Add a priceFor(grams) method to your Tea class
// that returns the price for a given weight.
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(sencha.priceFor(100)); // 12
console.log(sencha.priceFor(50)); // 6
