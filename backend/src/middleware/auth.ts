import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../prisma.js";

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

export async function verifyBusinessCenterAccess(userId: string, centerId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "BUSINESS" || !user.businessName) {
    return false;
  }
  const center = await prisma.center.findUnique({ where: { id: centerId } });
  if (!center) {
    return false;
  }
  return center.name.toLowerCase() === user.businessName.toLowerCase();
}

