import { API_BASE } from "./exercise1.js";
import { pathToFileURL } from "url";

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;

// Helper: parse error response from API
async function getErrorMessage(response) {
  const error = await response.json().catch(() => ({}));
  return error.detail || error.message || response.statusText;
}

// Helper: sign up (only needed once)
async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(`Signup failed: ${response.status} ${message}`);
  }
  return response.json();
}

// Helper: login and get token
async function getAuthToken() {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "yourname@example.com",
      password: "mypassword",
    }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(`Login failed: ${response.status} ${message}`);
  }
  const data = await response.json();
  return data.token;
}

// Create a new order (POST /orders)
export async function createOrder(items) {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(`Create order failed: ${response.status} ${message}`);
  }
  return response.json();
}

// Get all orders (GET /orders)
export async function getMyOrders() {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(`Get orders failed: ${response.status} ${message}`);
  }
  return response.json();
}

// Test (sign up first, then create and list orders):
if (isDirectRun) {
  signup("yourname@example.com", "mypassword")
    .catch(() => {}) // ignore if already signed up
    .then(() => createOrder([{ teaId: 11, grams: 50 }]))
    .then((order) => console.log("Created order:", order.id))
    .then(() => getMyOrders())
    .then((orders) => console.log("All orders:", orders.length))
    .catch((err) => console.error("Error:", err.message));
}
