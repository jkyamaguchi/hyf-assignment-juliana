import { Order } from "./Order.js";

class ExpressOrder extends Order {
  constructor(expressFee = 25) {
    // Call super(), store express fee (default 25 DKK)
    super();
    this.expressFee = expressFee;
  }

  getTotal() {
    // Override: add express fee to parent's total
    return super.getTotal() + this.expressFee;
  }

  getSummary() {
    // Override: include express fee line in summary
    const lines = super.getSummary().split("\n");
    lines.splice(-1, 0, `Express fee: ${this.expressFee.toFixed(2)} DKK`);
    lines[lines.length - 1] = `Total: ${this.getTotal().toFixed(2)} DKK`;
    return lines.join("\n");
  }
}

export { ExpressOrder };