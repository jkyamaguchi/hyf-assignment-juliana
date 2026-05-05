# Node.js API (HYF Assignment)

This folder contains a small Node.js + Express API backed by SQLite.

## What is in this folder

- app.js: main server entrypoint
- api/src/routers/snippets.js: snippets endpoints and request validation with Zod
- api/src/routers/tags.js: tags endpoints
- data/database.js: Knex database connection setup
- hyf_node.sqlite3: SQLite database file
- package.json: scripts and dependencies

## Tech stack

- Node.js (ES modules)
- Express
- Knex
- SQLite
- Zod (request body validation)
- OpenAPI 3.0 (YAML spec)
- Swagger UI (interactive API docs)

## Install dependencies

From this folder, run:

```bash
npm install
```

If you only need to install Zod (for example, if it is missing), run:

```bash
npm install zod
```

If Swagger/OpenAPI packages are missing, run:

```bash
npm install swagger-ui-express yaml
```

To install only Swagger UI middleware, run:

```bash
npm install swagger-ui-express
```

## Start the server

### Development mode (auto-restart on file changes)

```bash
npm run dev
```

This runs:

```bash
node --watch app.js
```

### Normal mode

```bash
node app.js
```

When the server starts successfully, you should see:

Listening on port 3000

You can change the port by setting the PORT environment variable.

## Base URL

- http://localhost:3000

## OpenAPI and Swagger docs

The API specification is stored in:

- api/openapi.yaml

After starting the server, open:

- Swagger UI: http://localhost:3000/docs
- Raw OpenAPI YAML: http://localhost:3000/docs/openapi.yaml

If you do not see the docs route, restart the server.

## Available routes

- GET /api/snippets
- GET /api/snippets/:id
- POST /api/snippets
- PUT /api/snippets/:id
- DELETE /api/snippets/:id
- GET /api/tags
- GET /api/tags/:id
- POST /api/tags
- PUT /api/tags/:id
- DELETE /api/tags/:id
- GET /docs
- GET /docs/openapi.yaml

## GET /api/snippets — query parameters

The `GET /api/snippets` endpoint supports optional filtering and sorting via query parameters:

| Parameter   | Description                                      | Example           |
| ----------- | ------------------------------------------------ | ----------------- |
| `tag`       | Filter snippets by tag name                      | `?tag=javascript` |
| `sort`      | Column to sort by                                | `?sort=title`     |
| `direction` | Sort direction: `ASC` or `DESC` (default: `ASC`) | `?direction=DESC` |

You can combine them:

```
GET /api/snippets?tag=javascript&sort=title&direction=ASC
```

### Tag filtering

When `?tag=` is provided, the query joins through the `snippet_tags` junction table:

```
snippets → snippet_tags → tags
```

Only snippets associated with that tag name are returned. The tag value is passed as a parameterized binding — not interpolated into raw SQL — so it is safe from SQL injection.

### Sorting

Sorting is protected by a whitelist. Only these column names are accepted:

- `id`, `title`, `user_id`, `contents`

Only `ASC` and `DESC` are accepted as directions. Any other value returns HTTP 400.

The sort also supports a single-param shorthand:

```
GET /api/snippets?sort=title DESC
```

Which is equivalent to:

```
GET /api/snippets?sort=title&direction=DESC
```

## What is Zod?

Zod is a TypeScript-first schema validation library that also works very well in JavaScript projects.

In this project, Zod is used to validate incoming JSON request bodies before writing to the database.

Why this helps:

- Prevents invalid data from being saved
- Returns clear validation errors to the client
- Keeps route handlers cleaner and safer

## How Zod is used in this project

In api/src/routers/snippets.js:

- snippetCreateSchema validates POST /api/snippets body
- snippetUpdateSchema validates PUT /api/snippets/:id body
- safeParse(req.body) is used to validate input
- if validation fails, API returns HTTP 400 with structured error details

Current create schema fields (all strings are trimmed):

- user_id: string, required, non-empty
- title: string, required, non-empty
- contents: string, required, non-empty
- is_private: boolean, optional

### Validation and Error Handling

The snippets endpoints enforce strict validation:

**Request body validation (POST, PUT):**

- Required fields must be present and non-empty (after trimming whitespace)
- Invalid input returns HTTP 400 with detailed field-level error messages
- Update requests (PUT) must provide at least one field to update

**Path parameters (:id):**

- Must be a positive integer
- Invalid id returns HTTP 400 with clear error message

**Query parameters (GET):**

- sort column must be one of: id, title, user_id, contents
- direction must be ASC or DESC
- Invalid sort/direction returns HTTP 400

**Success responses:**

- GET, POST, PUT return HTTP 200 (or 201 for creation)
- DELETE returns HTTP 200 with confirmation message

**Client error responses (HTTP 400, 404):**

- 400: Invalid input (malformed request body, invalid id, invalid sort options)
- 404: Resource not found (snippet doesn't exist)

**Server error responses (HTTP 500):**

- Database errors (missing table, connection issues) return safe error message
- Unexpected errors return safe error message
- No internal details (SQL, stack traces) are sent to the client

**Server-side logging:**

- All errors are logged with context: method, path, params, query, body keys, error details
- Logs help debug issues without exposing internals to clients

## Example request bodies

Create snippet (POST /api/snippets):

```json
{
  "user_id": "1",
  "title": "My first snippet",
  "contents": "console.log('hello world')",
  "is_private": false
}
```

All fields except `is_private` are required. Strings are trimmed and must be non-empty.

Update snippet (PUT /api/snippets/:id):

```json
{
  "title": "Updated title",
  "contents": "Updated contents"
}
```

At least one field must be provided. Strings are trimmed and must be non-empty.

## HTTP Status Codes and Error Response Format

All endpoints follow standard HTTP status codes:

| Status | Meaning                    | Example                                        |
| ------ | -------------------------- | ---------------------------------------------- |
| 200    | Success (GET, PUT, DELETE) | Snippet retrieved/updated/deleted              |
| 201    | Created (POST)             | Snippet created successfully                   |
| 400    | Bad Request                | Invalid body, invalid id, invalid sort options |
| 404    | Not Found                  | Snippet id doesn't exist                       |
| 500    | Server Error               | Database connection issues, unexpected errors  |

Error response format (400 and 404):

```json
{
  "error": "Invalid request body",
  "details": [
    {
      "path": "title",
      "message": "title is required"
    }
  ]
}
```

Server error response format (500):

```json
{
  "error": "A database error occurred"
}
```

Server errors never expose internal details (SQL, stack traces). All errors are logged server-side with full context for debugging.

## Knex and the `db` import

`data/database.js` creates a Knex instance (named `knexInstance` internally) and exports it as the default export:

```js
// data/database.js
const knexInstance = knex({ client: "sqlite3", ... });
export default knexInstance;
```

In route files it is imported under the alias `db`:

```js
import db from "../../../data/database.js";
```

`db` and `knexInstance` are the same object — the name is just an import alias. Both styles produce identical queries:

```js
db("snippets").select("*"); // same result
knexInstance.select("*").from("snippets"); // same result
```

## Notes

- Make sure requests are sent as JSON (Content-Type: application/json)
- Use Postman to test endpoints
- If npm install fails, confirm Node.js and npm are installed and up to date
