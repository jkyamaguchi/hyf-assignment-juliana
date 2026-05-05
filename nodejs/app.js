import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import snippetsRouter from "./api/src/routers/snippets.js";
import tagsRouter from "./api/src/routers/tags.js";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openapiPath = path.join(__dirname, "api", "openapi.yaml");
const openapiDocument = YAML.parse(fs.readFileSync(openapiPath, "utf8"));

// Support parsing JSON requests
app.use(express.json());

app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.get("/docs/openapi.yaml", (req, res) => {
  res.sendFile(openapiPath);
});

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
