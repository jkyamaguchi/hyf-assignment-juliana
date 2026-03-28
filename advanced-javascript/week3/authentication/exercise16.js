import { pathToFileURL } from "node:url";

const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// The /orders endpoint requires authentication. First sign up, then log in:

//  POST to /auth/signup with your email and a password to create an account
//  POST to /auth/login with the same email and password to get a token

// Step 1: Sign up (only needed once)
async function signup(email, password) {
  // POST to ${API_BASE}/auth/signup
  // Body: { email, password }
  // Return: data.token
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data.token;
}

// Step 2: Log in
async function login(email, password) {
  // POST to ${API_BASE}/auth/login
  // Body: { email, password }
  // Return: data.token
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data.token;
}

// Sign up first, then log in (use dummy credentials!)
const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  await signup("6cc2i7n7br@sharebot.net", "@S)8+64QzQK+l5");
  login("6cc2i7n7br@sharebot.net", "@S)8+64QzQK+l5")
    .then((token) => console.log("Got token:", token))
    .catch((err) => console.error(err.message));
}

export { API_BASE };
export { signup };
export { login };
