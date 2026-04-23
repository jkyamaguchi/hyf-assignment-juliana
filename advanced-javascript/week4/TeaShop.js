import { Tea } from "./Tea.js";
import { TeaCatalog } from "./TeaCatalog.js";
import { Inventory } from "./Inventory.js";
import { Customer } from "./Customer.js";
import { Order } from "./Order.js";
import { OrderItem } from "./OrderItem.js";

class TeaShop {
  constructor(teaData) {
    // Create a TeaCatalog from the data
    const teaInstances = this.buildTeaInstances(teaData);
    this.catalog = new TeaCatalog(teaInstances);

    // Create an Inventory from the data
    this.inventory = new Inventory();
    this.seedInventory(teaInstances, teaData);

    // Store customers as an empty array
    this.customers = [];
  }

  registerCustomer(name, email) {
    // Create and return a new Customer
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    // items is array of { teaName, grams }
    // 1. Find each tea in the catalog
    // 2. Check stock in inventory
    // 3. Create OrderItems and an Order
    // 4. Sell from inventory
    // 5. Place order on the customer
    // 6. Return the order
    const checkedItems = this.checkStockInventory(items);
    const order = this.buildOrder(checkedItems);
    this.sellFromInventory(checkedItems);
    return this.placeCustomerOrder(customer, order);
  }

  buildTeaInstances(teaData) {
    return teaData.map((tea) => Tea.fromObject(tea));
  }

  seedInventory(teaInstances, teaData) {
    teaInstances.forEach((tea) => {
      const data = teaData.find((item) => item.name === tea.name);
      this.inventory.add(tea, data.stockCount);
    });
  }

  findTeaByName(teaName) {
    return this.catalog.teas.find((catalogTea) => catalogTea.name === teaName);
  }

  checkStockInventory(items) {
    return items.map(({ teaName, grams }) => {
      const tea = this.findTeaByName(teaName);
      if (!tea) {
        throw new Error(`Tea not found: ${teaName}`);
      }

      const stock = this.inventory.getStock(teaName);
      if (stock === undefined) {
        throw new Error(`Tea not found: ${teaName}`);
      }
      if (stock < grams) {
        throw new Error(
          `Not enough stock for ${teaName} (have ${stock}, need ${grams})`,
        );
      }

      return { tea, teaName, grams };
    });
  }

  buildOrder(checkedItems) {
    const order = new Order();
    checkedItems.forEach(({ tea, grams }) => {
      order.addItem(new OrderItem(tea, grams));
    });
    return order;
  }

  sellFromInventory(checkedItems) {
    checkedItems.forEach(({ teaName, grams }) => {
      this.inventory.sell(teaName, grams);
    });
  }

  placeCustomerOrder(customer, order) {
    return customer.placeOrder(order);
  }

  getReport() {
    // Return a shop report:
    // - Total customers
    // - Total orders
    // - Total revenue
    // - Low stock items
    const totalOrders = this.customers.reduce(
      (sum, customer) => sum + customer.orders.length,
      0,
    );
    const totalRevenue = this.customers.reduce(
      (sum, customer) => sum + customer.totalSpent(),
      0,
    );
    const lowStock = this.inventory
      .getLowStock(50)
      .map((item) => `  - ${item.tea.name}: ${item.stockCount}g`)
      .join("\n");

    return [
      `=== Shop Report ===`,
      `Total customers: ${this.customers.length}`,
      `Total orders: ${totalOrders}`,
      `Total revenue: ${totalRevenue.toFixed(2)} DKK`,
      `Low stock (< 50g):`,
      lowStock || "  (none)",
    ].join("\n");
  }
}

export { TeaShop };
