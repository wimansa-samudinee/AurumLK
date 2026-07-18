import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  if (req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only admins can view all users." });
  }

  const users = await prisma.user.findMany({
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
    orderBy: { createdAt: "desc" },
  });

  return res.json(users);
});

router.get("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
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

  if (req.userRole !== "ADMIN" && req.userId !== id) {
    return res.status(403).json({ error: "Unauthorized." });
  }

  return res.json(user);
});

router.put("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, email, approved } = req.body;

  if (req.userRole !== "ADMIN" && req.userId !== id) {
    return res.status(403).json({ error: "Unauthorized." });
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (approved !== undefined && req.userRole === "ADMIN") updateData.approved = approved;

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
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

  return res.json(user);
});

export default router;
