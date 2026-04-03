// ex. 1
// Create a Tea class with a constructor that accepts
// name, type, and origin. Create two instances and log them.

// ex. 4
// Add validation to your constructor. Throw an error if:
//   name is empty or missing
//   pricePerGram is negative
//   type is not one of: "green", "black", "herbal",

function validateTeaType(type) {
  const validTypes = ["green", "black", "herbal", "oolong", "white"];
  if (validTypes.includes(type)) {
    return type;
  } else {
    throw new Error(`Invalid type: ${type}.`);
  }
}

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) throw new Error("Name is required");
    this.name = name;
    this.type = validateTeaType(type);
    this.origin = origin;
    if (pricePerGram <= 0) throw new Error("Price must be positive");
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }

  describe() {
    return `${this.name} (${this.type}) from ${this.origin} - ${(this.pricePerGram * 100).toFixed(2)} DKK/100g`;
  }

  static fromObject(obj) {
    // Create and return a new Tea from a plain object
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }

  static findCheapest(teas) {
    // Return the tea with the lowest pricePerGram
    return teas.reduce((cheapest, tea) =>
      tea.pricePerGram < cheapest.pricePerGram ? tea : cheapest,
    );
  }

  static findMostExpensive(teas) {
    // Return the tea with the highest pricePerGram
    return teas.reduce((mostExpensive, tea) =>
      tea.pricePerGram > mostExpensive.pricePerGram ? tea : mostExpensive,
    );
  }

  static averagePrice(teas) {
    // Return the average pricePerGram across all teas
    return teas.reduce((sum, tea) => sum + tea.pricePerGram, 0) / teas.length;
  }
}

export { Tea };
