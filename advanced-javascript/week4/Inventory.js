class Inventory {
  constructor(tea, stockCount) {
    this.tea = tea;
    this.stockCount = stockCount;
  }

  add(tea, stockCount) {
    // Add a tea to inventory
    this.tea = tea;
    this.stockCount = stockCount;
  }

  sell(grams) {
    // Throw an error if not enough stock
    if (grams > this.stockCount)
      throw new Error(
        `Not enough stock for ${this.tea.name} (have ${this.stockCount}, need ${grams})`,
      );
    // Subtract grams from stockCount
    this.stockCount -= grams;
  }

  restock(grams) {
    // Add grams to stockCount
    this.stockCount += grams;
  }

  getStock(teaName) {
    // Return current stock count for a tea
    return teaName.stockCount;
  }

  getLowStock(threshold) {
    // Return array of { tea, stockCount } where stock < threshold
    // Use .filter()
    return [{ tea: this.tea, stockCount: this.stockCount }].filter(
      (item) => item.stockCount < threshold,
    );
  }

  getTotalValue() {
    // Sum of (pricePerGram * stockCount) for all items
    // Use .reduce()
    return [{ tea: this.tea, stockCount: this.stockCount }].reduce(
      (sum, item) => sum + item.tea.pricePerGram * item.stockCount,
      0,
    );
  }
}

export { Inventory };
