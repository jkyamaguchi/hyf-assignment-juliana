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
}

export { Customer };
