# Assignment: Part A – Demonstrate and fix SQL injection

## The problem:

```js
router.get("/", async (req, res) => {
  let query = db.select("*").from("snippets");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable!
    }
  }
  ...
});
```

## Why it is vulnerable

`orderByRaw()` inserts the value directly into the SQL query **without any sanitization or parameterization**. Whatever string the user sends as `?sort=...` ends up literally inside the generated SQL.

---

## Suspicious sort values to test in Postman

### 1. Normal use (baseline)

```
GET /api/snippets?sort=title
```

Generated SQL:

```sql
SELECT * FROM snippets ORDER BY title
```

---

### 2. Constant expression — ordering bypassed

```
GET /api/snippets?sort=1=1
```

Generated SQL:

```sql
SELECT * FROM snippets ORDER BY 1=1
```

`1=1` evaluates to a constant (0 or 1 in SQLite), so all rows have the same sort key and are returned in an arbitrary order. The intended ordering is silently bypassed. This shows the input reaches the SQL engine unmodified — a clear sign the injection point is open.

---

### 3. Intentionally broken SQL (causes a 500 error)

```
GET /api/snippets?sort=(SELECT
```

Generated SQL:

```sql
SELECT * FROM snippets ORDER BY (SELECT
```

SQLite rejects this with a syntax error because the subquery is never closed. The server returns HTTP 500. Error messages can reveal database internals to an attacker.

---

### 4. Comment injection to truncate the query

```
GET /api/snippets?sort=title--
```

Generated SQL:

```sql
SELECT * FROM snippets ORDER BY title--
```

Everything after `--` is a SQL comment. While harmless here, in more complex queries this technique can be used to comment out WHERE clauses or other conditions (e.g. authentication checks).

---

## How to fix it

**Whitelist** the allowed column names and directions instead of passing user input directly to `orderByRaw`:

```js
const ALLOWED_SORT_COLUMNS = ["id", "title", "user_id", "contents"];
const ALLOWED_SORT_DIRECTIONS = ["ASC", "DESC"];

router.get("/", async (req, res) => {
  let query = db("snippets").select("*");

  if ("sort" in req.query || "direction" in req.query) {
    const orderBy = (req.query.sort ?? "id").toString();
    const direction = (req.query.direction ?? "ASC").toString().toUpperCase();

    if (!ALLOWED_SORT_COLUMNS.includes(orderBy)) {
      return res.status(400).json({ error: "Invalid sort column" });
    }

    if (!ALLOWED_SORT_DIRECTIONS.includes(direction)) {
      return res
        .status(400)
        .json({ error: "Invalid sort direction. Use ASC or DESC." });
    }

    query = query.orderBy(orderBy, direction.toLowerCase());
  }

  const data = await query;
  res.json({ data });
});
```

Key changes:

- `orderBy()` instead of `orderByRaw()` — Knex handles escaping
- Only columns in the whitelist are accepted
- Only `ASC` or `DESC` are accepted as sort directions
- Any other value is rejected with HTTP 400
