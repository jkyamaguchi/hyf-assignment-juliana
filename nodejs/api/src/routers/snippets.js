import express from "express";
import db from "../../../data/database.js";
import z from "zod";

const snippetCreateSchema = z.object({
  user_id: z.string().trim().min(1, "user_id is required"),
  title: z.string().trim().min(1, "title is required"),
  contents: z.string().trim().min(1, "contents is required"),
  is_private: z.boolean().optional(),
});

const snippetUpdateSchema = snippetCreateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

const router = express.Router();

const ALLOWED_SORT_COLUMNS = ["id", "title", "user_id", "contents"];
const ALLOWED_SORT_DIRECTIONS = ["ASC", "DESC"];

function formatValidationIssues(issues) {
  return issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

function logServerError(context, req, err) {
  console.error("[snippets-router] request failed", {
    context,
    method: req.method,
    path: req.originalUrl,
    params: req.params,
    query: req.query,
    bodyKeys: Object.keys(req.body ?? {}),
    error: {
      name: err?.name,
      code: err?.code,
      message: err?.message,
      stack: err?.stack,
    },
  });
}

function sendValidationError(res, message, details) {
  return res.status(400).json({
    error: message,
    details,
  });
}

function parseNumericId(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function getIdFromParams(req, res) {
  const id = parseNumericId(req.params.id);
  if (id === null) {
    sendValidationError(res, "Invalid id parameter", [
      "id must be a positive integer",
    ]);
    return null;
  }

  return id;
}

function isDatabaseIssue(err) {
  if (!err) {
    return false;
  }

  if (typeof err.code === "string") {
    if (
      ["SQLITE_ERROR", "SQLITE_CANTOPEN", "ECONNREFUSED", "ETIMEDOUT"].includes(
        err.code,
      )
    ) {
      return true;
    }
  }

  if (typeof err.message === "string") {
    const message = err.message.toLowerCase();
    return (
      message.includes("no such table") ||
      message.includes("database is locked") ||
      message.includes("failed to connect")
    );
  }

  return false;
}

function handleServerError(req, res, err, context) {
  logServerError(context, req, err);

  if (isDatabaseIssue(err)) {
    return res.status(500).json({ error: "A database error occurred" });
  }

  return res.status(500).json({ error: "An unexpected server error occurred" });
}

function applyTagFilter(query, tag) {
  if (typeof tag !== "string" || tag.trim().length === 0) {
    return query;
  }

  const normalizedTag = tag.trim().toLowerCase();

  return query
    .join("snippet_tags", "snippets.id", "snippet_tags.snippet_id")
    .join("tags", "snippet_tags.tag_id", "tags.id")
    .whereRaw("LOWER(tags.name) = ?", [normalizedTag]);
}

function parseSortOptions(queryParams) {
  const rawSort = (queryParams.sort ?? "id").toString().trim();
  const [column, sortDirection] = rawSort.split(/\s+/);
  const direction = (sortDirection ?? queryParams.direction ?? "ASC")
    .toString()
    .toUpperCase();

  if (!ALLOWED_SORT_COLUMNS.includes(column)) {
    return {
      error: "Invalid sort column",
      details: [`sort must be one of: ${ALLOWED_SORT_COLUMNS.join(", ")}`],
    };
  }

  if (!ALLOWED_SORT_DIRECTIONS.includes(direction)) {
    return {
      error: "Invalid sort direction",
      details: ["direction must be ASC or DESC"],
    };
  }

  return { column, direction: direction.toLowerCase() };
}

function applyPublicFilter(query) {
  return query.where((builder) => {
    builder.where("snippets.is_private", 0).orWhereNull("snippets.is_private");
  });
}

// GET /api/snippets
// Supports optional ?tag=<name>, ?sort=<column>, ?direction=ASC|DESC
router.get("/", async (req, res) => {
  try {
    let query = db("snippets").select("snippets.*");
    query = applyTagFilter(query, req.query.tag);

    const sortOptions = parseSortOptions(req.query);
    if (sortOptions.error) {
      return sendValidationError(res, sortOptions.error, sortOptions.details);
    }

    query = query.orderBy(
      `snippets.${sortOptions.column}`,
      sortOptions.direction,
    );

    const data = await query;
    return res.status(200).json({ data });
  } catch (err) {
    return handleServerError(req, res, err, "list snippets");
  }
});

// GET /api/snippets/public-feed
// Dedicated endpoint for only non-private snippets and supports optional tag/sort filters.
router.get("/public-feed", async (req, res) => {
  try {
    let query = db("snippets").select("snippets.*");
    query = applyPublicFilter(query);
    query = applyTagFilter(query, req.query.tag);

    const sortOptions = parseSortOptions(req.query);
    if (sortOptions.error) {
      return sendValidationError(res, sortOptions.error, sortOptions.details);
    }

    query = query.orderBy(
      `snippets.${sortOptions.column}`,
      sortOptions.direction,
    );

    const data = await query;
    return res.status(200).json({ data });
  } catch (err) {
    return handleServerError(req, res, err, "public feed");
  }
});

// GET /api/snippets/:id
router.get("/:id", async (req, res) => {
  try {
    const id = getIdFromParams(req, res);
    if (id === null) {
      return;
    }

    const snippet = await db("snippets").where({ id }).first();
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    return res.status(200).json(snippet);
  } catch (err) {
    return handleServerError(req, res, err, "get snippet by id");
  }
});

// POST /api/snippets
router.post("/", async (req, res) => {
  try {
    const { error, data, success } = snippetCreateSchema.safeParse(req.body);
    if (!success) {
      return sendValidationError(
        res,
        "Invalid request body",
        formatValidationIssues(error.issues),
      );
    }

    const { user_id, title, contents, is_private } = data;

    const [id] = await db("snippets").insert({
      user_id,
      title,
      contents,
      is_private,
    });
    const created = await db("snippets").where({ id }).first();

    if (!created) {
      return res
        .status(500)
        .json({ error: "Snippet could not be retrieved after creation" });
    }

    return res.status(201).json(created);
  } catch (err) {
    return handleServerError(req, res, err, "create snippet");
  }
});

// PUT /api/snippets/:id -> test in POSTMAN (PUT)
router.put("/:id", async (req, res) => {
  try {
    const id = getIdFromParams(req, res);
    if (id === null) {
      return;
    }

    const { error, data, success } = snippetUpdateSchema.safeParse(req.body);
    if (!success) {
      return sendValidationError(
        res,
        "Invalid request body",
        formatValidationIssues(error.issues),
      );
    }

    const existing = await db("snippets").where({ id }).first();
    if (!existing) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    await db("snippets").where({ id }).update(data);
    const updated = await db("snippets").where({ id }).first();

    if (!updated) {
      return res
        .status(500)
        .json({ error: "Snippet could not be retrieved after update" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return handleServerError(req, res, err, "update snippet");
  }
});

// DELETE /api/snippets/:id -> test in POSTMAN (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const id = getIdFromParams(req, res);
    if (id === null) {
      return;
    }

    const deleted = await db("snippets").where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    return res.status(200).json({ message: "Snippet deleted" });
  } catch (err) {
    return handleServerError(req, res, err, "delete snippet");
  }
});

router.use((err, req, res, _next) => {
  return handleServerError(req, res, err, "unhandled router error");
});

export default router;
