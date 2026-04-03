class Inventory {
  constructor() {
    // Store a Map or object of tea ID -> { tea, stockCount }
    this.items = {};
  }

  add(tea, stockCount) {
    // Add a tea to inventory
    this.items[tea.name] = { tea, stockCount };
  }

  sell(teaName, grams) {
    // Throw an error if not enough stock
    const item = this.items[teaName];
    if (!item) {
      throw new Error(`Tea not found: ${teaName}`);
    }

    if (grams > item.stockCount)
      throw new Error(
        `Not enough stock for ${item.tea.name} (have ${item.stockCount}, need ${grams})`,
      );
    // Subtract grams from stockCount
    item.stockCount -= grams;
  }

  restock(teaName, grams) {
    // Add grams to stockCount
    const item = this.items[teaName];
    if (!item) {
      throw new Error(`Tea not found: ${teaName}`);
    }
    item.stockCount += grams;
  }

  getStock(teaName) {
    // Return current stock count for a tea
    return this.items[teaName]?.stockCount;
  }

  getLowStock(threshold) {
    // Return array of { tea, stockCount } where stock < threshold
    // Use .filter()
    return Object.values(this.items).filter(
      (item) => item.stockCount < threshold,
    );
  }

  getTotalValue() {
    // Sum of (pricePerGram * stockCount) for all items
    // Use .reduce()
    return Object.values(this.items).reduce(
      (sum, item) => sum + item.tea.pricePerGram * item.stockCount,
      0,
    );
  }
}

export { Inventory };
