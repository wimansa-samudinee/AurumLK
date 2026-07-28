import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest, verifyBusinessCenterAccess } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const branches = await prisma.branch.findMany({
    include: { center: true },
    orderBy: { name: "asc" },
  });
  return res.json(branches);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const branch = await prisma.branch.findUnique({
    where: { id },
    include: { center: true },
  });

  if (!branch) {
    return res.status(404).json({ error: "Branch not found." });
  }

  return res.json(branch);
});

router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  const { name, address, city, phone, openingHours, centerId } = req.body;

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can create branches." });
  }

  if (!name || !address || !city || !phone || !openingHours || !centerId) {
    return res.status(400).json({ error: "All branch fields are required." });
  }

  const center = await prisma.center.findUnique({ where: { id: centerId } });
  if (!center) {
    return res.status(400).json({ error: "Center not found." });
  }

  if (req.userRole === "BUSINESS") {
    const hasAccess = await verifyBusinessCenterAccess(req.userId!, centerId);
    if (!hasAccess) {
      return res.status(403).json({ error: "Unauthorized. You cannot create a branch for this center." });
    }
  }

  const branch = await prisma.branch.create({
    data: { name, address, city, phone, openingHours, centerId },
  });

  return res.status(201).json(branch);
});

router.put("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, address, city, phone, openingHours, centerId } = req.body;

  const existing = await prisma.branch.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Branch not found." });
  }

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can update branches." });
  }

  if (req.userRole === "BUSINESS") {
    const hasAccessToExisting = await verifyBusinessCenterAccess(req.userId!, existing.centerId);
    if (!hasAccessToExisting) {
      return res.status(403).json({ error: "Unauthorized. You do not own this branch." });
    }
    if (centerId && centerId !== existing.centerId) {
      const hasAccessToNew = await verifyBusinessCenterAccess(req.userId!, centerId);
      if (!hasAccessToNew) {
        return res.status(403).json({ error: "Unauthorized. You cannot move this branch to this center." });
      }
    }
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (address) updateData.address = address;
  if (city) updateData.city = city;
  if (phone) updateData.phone = phone;
  if (openingHours) updateData.openingHours = openingHours;
  if (centerId) updateData.centerId = centerId;

  const branch = await prisma.branch.update({ where: { id }, data: updateData });
  return res.json(branch);
});

router.delete("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can delete branches." });
  }

  const existing = await prisma.branch.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Branch not found." });
  }

  if (req.userRole === "BUSINESS") {
    const hasAccess = await verifyBusinessCenterAccess(req.userId!, existing.centerId);
    if (!hasAccess) {
      return res.status(403).json({ error: "Unauthorized. You do not own this branch." });
    }
  }

  await prisma.branch.delete({ where: { id } });
  return res.json({ message: "Branch deleted successfully." });
});

export default router;
