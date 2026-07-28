import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest, verifyBusinessCenterAccess } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const { type, city, minRate, maxRate, active, businessId, centerId } = req.query;
  const filters: any = {};

  if (type) filters.type = { equals: String(type), mode: "insensitive" };
  if (city) filters.center = { city: { equals: String(city), mode: "insensitive" } };
  if (minRate) filters.rate = { gte: Number(minRate) };
  if (maxRate) filters.rate = { lte: Number(maxRate) };
  if (active !== undefined) filters.active = active === "true";
  if (businessId) filters.businessId = String(businessId);
  if (centerId) filters.centerId = String(centerId);

  const offers = await prisma.offer.findMany({
    where: filters,
    include: {
      center: true,
      business: {
        select: { id: true, name: true, businessName: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json(offers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const offer = await prisma.offer.findUnique({
    where: { id },
    include: {
      center: true,
      business: {
        select: { id: true, name: true, businessName: true, email: true },
      },
    },
  });

  if (!offer) {
    return res.status(404).json({ error: "Offer not found." });
  }

  return res.json(offer);
});

router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  const { title, type, rate, maxAmount, tenure, description, centerId, active = true } = req.body;

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can create offers." });
  }

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const center = await prisma.center.findUnique({ where: { id: centerId } });
  if (!center) {
    return res.status(400).json({ error: "Center not found." });
  }

  if (req.userRole === "BUSINESS") {
    const hasAccess = await verifyBusinessCenterAccess(req.userId!, centerId);
    if (!hasAccess) {
      return res.status(403).json({ error: "Unauthorized. You cannot create an offer for this center." });
    }
  }

  const offer = await prisma.offer.create({
    data: {
      title,
      type,
      rate: Number(rate),
      maxAmount: Number(maxAmount),
      tenure,
      description,
      centerId,
      active,
      businessId: req.userRole === "BUSINESS" ? req.userId : undefined,
    },
  });

  return res.status(201).json(offer);
});

router.put("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { title, type, rate, maxAmount, tenure, description, centerId, active } = req.body;

  const existing = await prisma.offer.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Offer not found." });
  }

  if (req.userRole === "BUSINESS" && existing.businessId !== req.userId) {
    return res.status(403).json({ error: "Business may only update its own offers." });
  }

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can update offers." });
  }

  if (req.userRole === "BUSINESS" && centerId && centerId !== existing.centerId) {
    const hasAccess = await verifyBusinessCenterAccess(req.userId!, centerId);
    if (!hasAccess) {
      return res.status(403).json({ error: "Unauthorized. You cannot move this offer to this center." });
    }
  }

  const updateData: any = {};
  if (title) updateData.title = title;
  if (type) updateData.type = type;
  if (rate !== undefined) updateData.rate = Number(rate);
  if (maxAmount !== undefined) updateData.maxAmount = Number(maxAmount);
  if (tenure) updateData.tenure = tenure;
  if (description) updateData.description = description;
  if (centerId) updateData.centerId = centerId;
  if (active !== undefined) updateData.active = active;

  const offer = await prisma.offer.update({
    where: { id },
    data: updateData,
  });

  return res.json(offer);
});

router.delete("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;

  const existing = await prisma.offer.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Offer not found." });
  }

  if (req.userRole === "BUSINESS" && existing.businessId !== req.userId) {
    return res.status(403).json({ error: "Business may only delete its own offers." });
  }

  if (req.userRole !== "BUSINESS" && req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only businesses or admins can delete offers." });
  }

  await prisma.offer.delete({ where: { id } });
  return res.json({ message: "Offer deleted successfully." });
});

export default router;
