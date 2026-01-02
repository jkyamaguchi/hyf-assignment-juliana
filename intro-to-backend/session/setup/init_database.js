/**
 * Run this if database is empty.
 */
const knex = require("../script/db.js");

async function setupDatabase() {
  try {
    // Check if the user table exists
    const hasTable = await knex.schema.hasTable("user");

    if (!hasTable) {
      console.log("Creating 'user' table...");
      await knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.timestamps(true, true);
      });
      console.log("✓ 'user' table created successfully!");
    } else {
      console.log("'user' table already exists.");
    }

    // Optional: Insert sample data
    const count = await knex("user").count("* as count").first();
    if (count.count === 0) {
      console.log("Inserting sample users...");
      await knex("user").insert([
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        { name: "Charlie", email: "charlie@example.com" },
      ]);
      console.log("✓ Sample users inserted!");
    }

    console.log("\nDatabase setup complete!");
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await knex.destroy();
  }
}

setupDatabase();
