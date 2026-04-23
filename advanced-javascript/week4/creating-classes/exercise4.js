import { Tea } from "../Tea.js";

// Add validation to your constructor. Throw an error if:
//  name is empty or missing
//  pricePerGram is negative
//  type is not one of: "green", "black", "herbal", "oolong", "white"

// Should work:
const valid = new Tea("Sencha", "green", "Japan", 0.12, true);

// Should throw:
// const noName = new Tea("", "green", "Japan", 0.12, true);
// Error: "Name is required"

// const badPrice = new Tea("Sencha", "green", "Japan", -1, true);
// Error: "Price must be positive"

const badType = new Tea("Sencha", "purple", "Japan", 0.12, true);
// Error: "Invalid type: purple"
