const VALID_TEA_TYPES = ["green", "black", "herbal", "oolong", "white"];

function validateTeaType(type) {
  if (VALID_TEA_TYPES.includes(type)) {
    return type;
  } else {
    throw new Error(`Invalid type: ${type}.`);
  }
}

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) throw new Error("Name is required");
    const validatedType = validateTeaType(type);
    if (pricePerGram <= 0) throw new Error("Price must be positive");

    this.name = name;
    this.type = validatedType;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }

  describe() {
    const organicLabel = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin}${organicLabel} - ${(this.pricePerGram * 100).toFixed(2)} DKK/100g`;
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

export { Tea, VALID_TEA_TYPES };
