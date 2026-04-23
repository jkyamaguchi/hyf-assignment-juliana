class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    this.orders.push(order);
    order.confirm();
    return order;
  }

  totalSpent() {
    return this.orders.reduce((sum, order) => sum + order.getTotal(), 0);
  }

  getOrderHistory() {
    const orderLabel = this.orders.length === 1 ? "order" : "orders";
    const lines = [
      `${this.name} (${this.email}) - ${this.orders.length} ${orderLabel}`,
      "",
    ];

    this.orders.forEach((order, index) => {
      const itemLabel = order.items.length === 1 ? "item" : "items";
      lines.push(
        `Order ${index + 1} (${order.status}) - ${order.items.length} ${itemLabel}`,
      );

      order.items.forEach((item) => {
        lines.push(`  ${item.describe()}`);
      });

      lines.push(`Total: ${order.getTotal().toFixed(2)} DKK`);
      lines.push("");
    });

    lines.push(`Lifetime total: ${this.totalSpent().toFixed(2)} DKK`);
    return lines.join("\n");
  }
}

export { Customer };
