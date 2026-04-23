import { Tea } from "./Tea.js";

class OrderItem {
  constructor(tea, grams) {
    if (!(tea instanceof Tea)) {
      throw new Error("tea must be a Tea instance");
    }
    if (typeof grams !== "number" || grams <= 0) {
      throw new Error("grams must be a positive number");
    }
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }

  describe() {
    return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
  }
}

export { OrderItem };
