/**
 * How to run:
 * Open the terminal
 * - Enter the directory of this script (main.js)
 * - Type nodemon main.js (instead of node main.js)
 * Nodemon restart the server automatically after any changes in the script
 */

// Reading from a file .txt
const filesystem = require("fs/promises"); //require = import a package

async function getFile(request, response) {
  const fileContent = await filesystem.readFile("./text.txt", "utf-8");
  //   console.log("Content of the file:");
  //   console.log(fileContent);
  response.send(fileContent);
}

// Creating a webserver
const express = require("express");
const bodyParser = require("body-parser");
const knex = require("../script/db.js");
const { ROUTES } = require("../script/routes.js");

const app = express();
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log("server is ready");
});

//http://localhost:3000/
app.get(ROUTES.ROOT, (request, response) => {
  // Listen to the root of the server
  console.log("received a request");
  response.send("response from server");
});

//http://localhost:3000/hello
app.get(ROUTES.HELLO, (request, response) => {
  //listen to the root of the server
  const username = request.query.name;
  //http://localhost:3000/hello?name=pass
  if (username === "pass") {
    response.send(`this is from my hello routes ${username}`);
  } else {
    response.send(`you cannot access this`);
  }
});

//http://localhost:3000/file
app.get(ROUTES.FILE, async function (request, response) {
  const fileContent = await filesystem.readFile("../text.txt", "utf-8");
  response.send(fileContent);
});

//http://localhost:3000/create -> test in POSTMAN (POST)
app.post(ROUTES.CREATE, (request, response) => {
  //express ignore the body for default
  console.log(request.body);
  response.send("this is from a post request");
});

//http://localhost:3000/users -> test in POSTMAN (GET)
// app.get("/users", async (req, res) => {
//     const result = await knex.raw("SELECT * FROM user");
//     res.send(result);
// });

//http://localhost:3000/users -> Parameterize SQL
app.get(ROUTES.USERS, async (req, res) => {
  try {
    const users = await knex("user").select("*");
    res.json({ users });
  } catch (err) {
    console.error("Failed to fetch users", err);
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

//http://localhost:3000/create_user -> test in POSTMAN (POST)
//In POSTMAN, insert a JSON in the body tab 
app.post(ROUTES.CREATE_USER, async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  //await knex.raw(`insert into users (name,password) values('${name}', '${password}')`)
  await knex("user").insert({ name, email });
  res.send("user created");
});

/**
 * Return HTML content for users_count
 */
const path = require("path");
// Serve static assets like CSS/JS referenced by the HTML templates
app.use(express.static(path.join(__dirname, "..")));

// Separate html from JavaScript via templates
// Templates paths to access the html files
const TEMPLATE_DIR = path.join(__dirname, "..", "html");
const TEMPLATES = {
  USERS_COUNT: path.join(TEMPLATE_DIR, "users_count.html"),
  ERROR: path.join(TEMPLATE_DIR, "error.html"),
  USER_ROW: path.join(TEMPLATE_DIR, "user_row.html"),
};

// Template html cache to display users in a table
let userRowTemplatePromise;

async function getUserRowTemplate() {
  if (!userRowTemplatePromise) {
    userRowTemplatePromise = filesystem.readFile(TEMPLATES.USER_ROW, "utf-8");
  }
  return userRowTemplatePromise;
}

async function renderUserRows(users = []) {
  if (!users.length) {
    return '<tr><td colspan="2">No users found</td></tr>';
  }

  const rowTemplate = await getUserRowTemplate();
  return users
    .map((u) =>
      rowTemplate
        .replace("{{NAME}}", u.name ?? "")
        .replace("{{EMAIL}}", u.email ?? "")
    )
    .join("\n");
}

// Render the html replacing the {{PLACEHOLDER}} by key-value
async function renderTemplate(templatePath, replacements = {}) {
  // Read the HTML file from disk
  const template = await filesystem.readFile(templatePath, "utf-8");

  // Start with the original template content
  let html = template;

  // Loop through each placeholder key-value pair
  for (const [key, value] of Object.entries(replacements)) {
    // Replace {{KEY}} with the actual value
    html = html.replace(`{{${key}}}`, String(value));
  }

  // Return the final rendered HTML
  return html;
}

async function getUserCount() {
  const [{ count }] = await knex("user").count({ count: "*" });
  return Number(count);
}

async function getUsers() {
  return knex("user").select("name", "email");
}

//http://localhost:3000/users_count
app.get(ROUTES.USERS_COUNT, async (req, res) => {
  try {
    const [count, users] = await Promise.all([getUserCount(), getUsers()]);
    const usersRows = await renderUserRows(users || []);

    const html = await renderTemplate(TEMPLATES.USERS_COUNT, {
      COUNT: Number.isNaN(count) ? "N/A" : count,
      USERS_ROWS: usersRows,
    });

    res.status(200).send(html);
  } catch (err) {
    console.error("Failed to fetch users", err);
    try {
      const errorHtml = await renderTemplate(TEMPLATES.ERROR, {
        MESSAGE: "Unable to fetch users.",
      });
      res.status(500).send(errorHtml);
    } catch (readErr) {
      res.status(500).send("Unable to fetch users.");
    }
  }
});
