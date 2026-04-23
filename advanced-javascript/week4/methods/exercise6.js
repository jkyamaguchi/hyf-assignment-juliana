import { Tea } from "../Tea.js";

// Add a describe() method that returns a formatted string

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(sencha.describe());
// "Sencha (green) from Japan - 12.00 DKK/100g"

const earlGrey = new Tea("Earl Grey", "black", "India", 0.08, false);
console.log(earlGrey.describe());
// "Earl Grey (black) from India - 8.00 DKK/100g"