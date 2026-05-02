import knex from "knex";

const dbFile = `${import.meta.dirname}/hyf_node.sqlite3`;

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true,
});

export default knexInstance;
