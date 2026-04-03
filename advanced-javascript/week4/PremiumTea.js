import { Tea } from "./Tea.js";

class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    // Call parent constructor with super()
    super(name, type, origin, pricePerGram, organic);
    // Store grade ("A", "B", or "C")
    this.grade = grade;
  }

  priceFor(grams) {
    // A = 50% markup, B = 25% markup, C = 10% markup
    const markups = { A: 1.5, B: 1.25, C: 1.1 };

    // Use super.priceFor(grams) to get the base price
    const basePrice = super.priceFor(grams);
    return basePrice * markups[this.grade];
  }

  describe() {
    // Override to include grade
    // "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"
    return `${this.name} [Grade ${this.grade}] (${this.type}) from ${this.origin} - ${this.priceFor(100).toFixed(2)} DKK/100g`;
  }

  static fromTea(tea, grade) {
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade,
    );
  }
}

export { PremiumTea };
