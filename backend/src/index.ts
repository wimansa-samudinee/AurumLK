import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import offerRoutes from "./routes/offers.js";
import centerRoutes from "./routes/centers.js";
import branchRoutes from "./routes/branches.js";
import inquiryRoutes from "./routes/inquiries.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_req, res) => {
  res.json({ status: "AurumLK backend is running." });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});

export default app;
