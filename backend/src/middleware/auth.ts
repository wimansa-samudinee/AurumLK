import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

const jwtSecret = process.env.JWT_SECRET ?? "";

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required in environment variables.");
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ error: "Authentication token required." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as { userId: string; role: string };
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userRole !== role) {
      return res.status(403).json({ error: "Insufficient permissions." });
    }
    next();
  };
}
