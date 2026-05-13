import jwt from "jsonwebtoken";
import db from "../../../data/database.js";

const JWT_SECRET = process.env.JWT_SECRET || "development-secret-change-me";

function getBearerToken(req) {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader !== "string") {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

async function authenticateJwt(req, res, next) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({
        error: "Missing or invalid Authorization header. Use Bearer <token>",
      });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const userId = Number(payload?.sub);
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = await db("users")
      .where({ id: userId })
      .select("id", "email", "first_name", "last_name")
      .first();

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    return next();
  } catch (err) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    if (err?.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(500).json({ error: "Failed to authenticate token" });
  }
}

export default authenticateJwt;
