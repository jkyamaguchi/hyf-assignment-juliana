class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    // Only allow adding items when status is "pending"
    // Throw error otherwise
    if (this.status !== "pending") {
      throw new Error("Cannot add items to a confirmed order");
    }
    this.items.push(orderItem);
  }

  confirm() {
    // Change status to "confirmed" (only from "pending")
    if (this.status == "pending") {
      this.status = "confirmed";
    }
  }

  ship() {
    // Change status to "shipped" (only from "confirmed")
    if (this.status == "confirmed") {
      this.status = "shipped";
    }
  }

  deliver() {
    // Change status to "delivered" (only from "shipped")
    if (this.status == "shipped") {
      this.status = "delivered";
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.lineTotal(), 0);
  }

  getSummary() {
    const itemLabel = this.items.length === 1 ? "item" : "items";
    const header = `Order (${this.status}) - ${this.items.length} ${itemLabel}`;
    const itemLines = this.items.map((item) => `- ${item.describe()}`);
    const totalLine = `Total: ${this.getTotal().toFixed(2)} DKK`;

    return [header, ...itemLines, totalLine].join("\n");
  }
}

export { Order };
