import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

dotenv.config();

const router = Router();
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required in environment variables.");
}

router.post("/register", async (req, res) => {
  const { name, email, password, role = "CUSTOMER", businessName, licenseNumber } = req.body;

  if (role === "ADMIN") {
    return res.status(400).json({ error: "Cannot register as an administrator." });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email already registered." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const approved = role === "BUSINESS" ? false : true;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      businessName: role === "BUSINESS" ? businessName : null,
      licenseNumber: role === "BUSINESS" ? licenseNumber : null,
      approved,
    },
  });

  const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "30d" });
  return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, approved: user.approved } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "30d" });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, approved: user.approved } });
});

router.get("/me", authenticateToken, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      businessName: true,
      licenseNumber: true,
      approved: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Ensure center exists for approved business users
  if (user.role === "BUSINESS" && user.approved && user.businessName) {
    const existingCenter = await prisma.center.findFirst({
      where: { name: { equals: user.businessName, mode: "insensitive" } }
    });
    if (!existingCenter) {
      await prisma.center.create({
        data: {
          name: user.businessName,
          description: "Details coming soon.",
          address: "No address provided.",
          city: "Colombo",
          phone: "000-0000000",
        }
      });
    }
  }

  return res.json(user);
});

export default router;
