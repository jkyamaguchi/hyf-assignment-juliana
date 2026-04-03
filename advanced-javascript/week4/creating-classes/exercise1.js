import { Tea } from "../Tea.js";

// Create a Tea class with a constructor that accepts 
// name, type, and origin. Create two instances and log them.

const sencha = new Tea("Sencha", "green", "Japan");
const earlGrey = new Tea("Earl Grey", "black", "India");

console.log(sencha.name); // "Sencha"
console.log(sencha.type); // "green"
console.log(earlGrey.origin); // "India"