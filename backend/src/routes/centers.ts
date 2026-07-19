import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const centers = await prisma.center.findMany({
    include: {
      offers: true,
      branches: true,
    },
    orderBy: { name: "asc" },
  });

  return res.json(centers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const center = await prisma.center.findUnique({
    where: { id },
    include: {
      offers: true,
      branches: true,
    },
  });

  if (!center) {
    return res.status(404).json({ error: "Center not found." });
  }

  return res.json(center);
});

router.put("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, description, address, city, phone, rating } = req.body;

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can update centers." });
  }

  const existing = await prisma.center.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Center not found." });
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (address !== undefined) updateData.address = address;
  if (city !== undefined) updateData.city = city;
  if (phone !== undefined) updateData.phone = phone;
  if (rating !== undefined) updateData.rating = Number(rating);

  const center = await prisma.center.update({
    where: { id },
    data: updateData,
  });

  return res.json(center);
});

export default router;
