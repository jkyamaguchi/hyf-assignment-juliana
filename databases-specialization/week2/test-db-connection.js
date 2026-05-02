require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For Render and other managed DBs
  },
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
    return client.end();
  })
  .catch((err) => {
    console.error("Connection error:", err.stack);
  });
