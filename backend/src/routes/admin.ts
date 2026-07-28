import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

router.get("/business-approvals", authenticateToken, async (req: AuthRequest, res) => {
  if (req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only admins can view approval requests." });
  }

  const requests = await prisma.user.findMany({
    where: { role: "BUSINESS", approved: false },
    select: {
      id: true,
      name: true,
      email: true,
      businessName: true,
      licenseNumber: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return res.json(requests);
});

router.post("/business-approvals/:id/approve", authenticateToken, async (req: AuthRequest, res) => {
  if (req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only admins can approve businesses." });
  }

  const { id } = req.params;
  const business = await prisma.user.findUnique({ where: { id } });

  if (!business || business.role !== "BUSINESS") {
    return res.status(404).json({ error: "Business account not found." });
  }

  const updated = await prisma.user.update({ where: { id }, data: { approved: true } });

  // Create a default center for the approved business if it doesn't exist
  if (business.businessName) {
    const existingCenter = await prisma.center.findFirst({
      where: { name: { equals: business.businessName, mode: "insensitive" } }
    });
    if (!existingCenter) {
      await prisma.center.create({
        data: {
          name: business.businessName,
          description: "Details coming soon.",
          address: "No address provided.",
          city: "Colombo",
          phone: "000-0000000",
        }
      });
    }
  }

  return res.json(updated);
});

router.post("/business-approvals/:id/reject", authenticateToken, async (req: AuthRequest, res) => {
  if (req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Only admins can reject businesses." });
  }

  const { id } = req.params;
  const business = await prisma.user.findUnique({ where: { id } });

  if (!business || business.role !== "BUSINESS") {
    return res.status(404).json({ error: "Business account not found." });
  }

  const rejected = await prisma.user.delete({ where: { id } });
  return res.json({ message: "Business application rejected and removed.", business: rejected });
});

export default router;
