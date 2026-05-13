import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import db from "../../../data/database.js";
import z from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(1, "password is required"),
});

const registerSchema = z.object({
  first_name: z.string().trim().min(1, "first_name is required"),
  last_name: z.string().trim().min(1, "last_name is required"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(1, "password is required"),
});

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "development-secret-change-me";

function createAuthToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );
}

function createTokenExpiryTimestamp() {
  return new Date(Date.now() + 60 * 60 * 1000).toISOString();
}

function formatValidationIssues(issues) {
  return issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

function logServerError(context, req, err) {
  console.error("[auth-router] request failed", {
    context,
    method: req.method,
    path: req.originalUrl,
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

function handleServerError(req, res, err, context) {
  logServerError(context, req, err);
  return res.status(500).json({ error: "An unexpected server error occurred" });
}

async function authenticateByEmailAndPassword(email, password) {
  const user = await db("users")
    .where("email", email)
    .select("id", "email", "first_name", "last_name", "password_hash")
    .first();

  if (!user || typeof user.password_hash !== "string") {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return null;
  }

  const { password_hash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { error, data, success } = loginSchema.safeParse(req.body);
    if (!success) {
      return sendValidationError(
        res,
        "Invalid request body",
        formatValidationIssues(error.issues),
      );
    }

    const { email, password } = data;

    const authenticatedUser = await authenticateByEmailAndPassword(
      email,
      password,
    );
    if (authenticatedUser) {
      const { id, email: userEmail, first_name, last_name } = authenticatedUser;
      const token = createAuthToken({
        id,
        email: userEmail,
        first_name,
        last_name,
      });

      return res.status(200).json({
        msg: "Login successful",
        token,
        user: { id, email: userEmail, first_name, last_name },
      });
    } else {
      return res.status(401).json({ error: "Wrong email or password" });
    }
  } catch (err) {
    return handleServerError(req, res, err, "login");
  }
});

// POST /api/auth/login-token
router.post("/login-token", async (req, res) => {
  try {
    const { error, data, success } = loginSchema.safeParse(req.body);
    if (!success) {
      return sendValidationError(
        res,
        "Invalid request body",
        formatValidationIssues(error.issues),
      );
    }

    const { email, password } = data;
    const authenticatedUser = await authenticateByEmailAndPassword(
      email,
      password,
    );

    if (!authenticatedUser) {
      return res.status(401).json({ error: "Wrong email or password" });
    }

    const token = randomBytes(48).toString("hex");
    const expires_at = createTokenExpiryTimestamp();

    await db("tokens").insert({
      user_id: authenticatedUser.id,
      token,
      expires_at,
    });

    return res.status(200).json({ token });
  } catch (err) {
    return handleServerError(req, res, err, "login-token");
  }
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { error, data, success } = registerSchema.safeParse(req.body);
    if (!success) {
      return sendValidationError(
        res,
        "Invalid request body",
        formatValidationIssues(error.issues),
      );
    }

    const { first_name, last_name, email, password } = data;

    const existingUsers = await db("users").where("email", email);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [id] = await db("users").insert({
      first_name,
      last_name,
      email,
      password_hash,
    });

    const createdUser = await db("users")
      .where({ id })
      .select("id", "email", "first_name", "last_name")
      .first();

    if (!createdUser) {
      return res
        .status(500)
        .json({ error: "User could not be retrieved after creation" });
    }

    const token = createAuthToken(createdUser);

    return res.status(201).json({
      msg: "User created",
      token,
      user: createdUser,
    });
  } catch (err) {
    return handleServerError(req, res, err, "register");
  }
});

// POST /api/auth/logout-token
router.post("/logout-token", async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1] ?? req.body?.token;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const deleted = await db("tokens").where({ token }).delete();

    if (deleted === 0) {
      return res.status(404).json({ error: "Token not found" });
    }

    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    return handleServerError(req, res, err, "logout-token");
  }
});

router.use((err, req, res, _next) => {
  return handleServerError(req, res, err, "unhandled router error");
});

export default router;
