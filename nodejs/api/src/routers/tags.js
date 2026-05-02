import express from "express";
import db from "../../../data/database.js";

const router = express.Router();

// GET /api/tags
router.get("/", async (request, response) => {
  const tags = await db("tags").select("*");
  response.json(tags);
});

// GET /api/tags/:id
router.get("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const tag = await db("tags").where({ id }).first();
  if (!tag) {
    return response.status(404).json({ error: "Tag not found" });
  }
  response.json(tag);
});

// POST /api/tags
router.post("/", async (request, response) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ error: "name is required" });
  }
  const [id] = await db("tags").insert({ name });
  const tag = await db("tags").where({ id }).first();
  response.status(201).json(tag);
});

// PUT /api/tags/:id
router.put("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const { name } = request.body;
  const updated = await db("tags").where({ id }).update({ name });
  if (!updated) {
    return response.status(404).json({ error: "Tag not found" });
  }
  const tag = await db("tags").where({ id }).first();
  response.json(tag);
});

// DELETE /api/tags/:id
router.delete("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const deleted = await db("tags").where({ id }).del();
  if (!deleted) {
    return response.status(404).json({ error: "Tag not found" });
  }
  response.json({ message: "Tag deleted" });
});

export default router;
