require("dotenv").config();
const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/test-db", async (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM "user"');
    res.json({
      message: "Fetched users from database!",
      users: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: "Connection error: " + err.message });
  } finally {
    await client.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
