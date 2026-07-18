import { Router } from "express";
import prisma from "../prisma.js";

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

export default router;
