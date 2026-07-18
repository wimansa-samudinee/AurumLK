import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  const { status, businessId, customerId } = req.query;
  const where: any = {};

  if (status) where.status = String(status);
  if (businessId) where.businessId = String(businessId);
  if (customerId) where.customerId = String(customerId);

  if (req.userRole === "CUSTOMER") {
    where.customerId = req.userId;
  }

  if (req.userRole === "BUSINESS") {
    where.businessId = req.userId;
  }

  const inquiries = await prisma.inquiry.findMany({
    where,
    include: {
      customer: { select: { id: true, name: true, email: true } },
      business: { select: { id: true, name: true, businessName: true, email: true } },
      offer: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json(inquiries);
});

router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  const { subject, message, offerId } = req.body;

  if (req.userRole !== "CUSTOMER") {
    return res.status(403).json({ error: "Only customers can submit inquiries." });
  }

  if (!subject || !message || !offerId) {
    return res.status(400).json({ error: "Subject, message and offerId are required." });
  }

  const offer = await prisma.offer.findUnique({ where: { id: offerId } });
  if (!offer) {
    return res.status(404).json({ error: "Offer not found." });
  }

  const business = offer.businessId ? await prisma.user.findUnique({ where: { id: offer.businessId } }) : null;
  const inquiry = await prisma.inquiry.create({
    data: {
      subject,
      message,
      customerId: req.userId!,
      businessId: business?.id,
      offerId,
    },
  });

  return res.status(201).json(inquiry);
});

router.put("/:id", authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { status, message } = req.body;

  const existing = await prisma.inquiry.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Inquiry not found." });
  }

  if (req.userRole === "CUSTOMER" && existing.customerId !== req.userId) {
    return res.status(403).json({ error: "Customers may only update their own inquiries." });
  }

  if (req.userRole === "BUSINESS" && existing.businessId !== req.userId) {
    return res.status(403).json({ error: "Businesses may only update inquiries addressed to them." });
  }

  const updateData: any = {};
  if (status) updateData.status = status;
  if (message) updateData.message = message;

  const inquiry = await prisma.inquiry.update({ where: { id }, data: updateData });
  return res.json(inquiry);
});

export default router;
