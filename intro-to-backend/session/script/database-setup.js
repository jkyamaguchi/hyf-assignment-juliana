const knexLibrary = require("knex");
const path = require("path");

// Use the database file in the session root folder
const dbFile = path.join(__dirname, "..", "test.sqlite3");

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true, // Suppress SQLite warnings
});

module.exports = knex;
