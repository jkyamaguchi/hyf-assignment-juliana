import { login } from "./exercise16.js";

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
const EMAIL = "6cc2i7n7br@sharebot.net";
const PASSWORD = "@S)8+64QzQK+l5";
const DEFAULT_ORDER_ITEMS = [{ teaId: 9, grams: 25 }]; // teaId with stockCount > 0

// Use the token from Exercise 16 to fetch orders

function getErrorMessage(errorData, fallbackMessage) {
  return errorData?.detail || errorData?.message || fallbackMessage;
}

function getAuthHeaders(token, includeJsonContentType = false) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (includeJsonContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

async function requestJson(url, options, fallbackErrorMessage) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(getErrorMessage(errorData, fallbackErrorMessage));
  }

  return response.json();
}

async function createOrder(token, items = DEFAULT_ORDER_ITEMS) {
  return requestJson(
    `${API_BASE}/orders`,
    {
      method: "POST",
      headers: getAuthHeaders(token, true),
      body: JSON.stringify({ items }),
    },
    "Failed to create order",
  );
}

async function getOrders(token) {
  return requestJson(
    `${API_BASE}/orders`,
    {
      headers: getAuthHeaders(token),
    },
    "Failed to fetch orders",
  );
}

function formatOrderInline(order) {
  const itemsInline = order.items
    .map((item) => `${item.teaName} (${item.grams}g)`)
    .join(", ");

  return `- #${order.id} | ${order.status} | total: ${order.total} | items: ${itemsInline}`;
}

function printOrders(orders) {
  if (!orders.length) {
    console.log("This account has no orders yet.");
    return;
  }

  console.log("Orders:");
  orders.forEach((order) => console.log(formatOrderInline(order)));
}

async function run() {
  const token = await login(EMAIL, PASSWORD);
  const createdOrder = await createOrder(token);
  console.log("Created order:", createdOrder);

  const orders = await getOrders(token);
  printOrders(orders);
}

async function main() {
  try {
    await run();
  } catch (err) {
    console.error(err.message);
  }
}

main();
