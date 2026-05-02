import express from "express";
import db from "../../../data/database.js";

const router = express.Router();

// GET /api/snippets
router.get("/", async (request, response) => {
  const snippets = await db("snippets").select("*");
  response.json(snippets);
});

// GET /api/snippets/:id
router.get("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const snippet = await db("snippets").where({ id }).first();
  if (!snippet) {
    return response.status(404).json({ error: "Snippet not found" });
  }
  response.json(snippet);
});

// POST /api/snippets
router.post("/", async (request, response) => {
  const { user_id, title, contents, is_private } = request.body;
  if (!user_id || !title || !contents) {
    return response
      .status(400)
      .json({ error: "user_id, title, and contents are required" });
  }
  const [id] = await db("snippets").insert({
    user_id,
    title,
    contents,
    is_private,
  });
  const snippet = await db("snippets").where({ id }).first();
  response.status(201).json(snippet);
});

// PUT /api/snippets/:id -> test in POSTMAN (PUT)
router.put("/:id", async (request, response) => {
  console.log(request.body);
  const id = Number(request.params.id);
  const { user_id, title, contents, is_private } = request.body;
  const updated = await db("snippets")
    .where({ id })
    .update({ user_id, title, contents, is_private });
  if (!updated) {
    return response.status(404).json({ error: "Snippet not found" });
  }
  const snippet = await db("snippets").where({ id }).first();
  response.json(snippet);
});

// DELETE /api/snippets/:id -> test in POSTMAN (DELETE)
router.delete("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const deleted = await db("snippets").where({ id }).del();
  if (!deleted) {
    return response.status(404).json({ error: "Snippet not found" });
  }
  response.json({ message: "Snippet deleted" });
});

export default router;
