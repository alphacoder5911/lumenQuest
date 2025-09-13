import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { runAlerts } from "./src/services/alertScheduler.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";



dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running with Supabase + Prisma 🚀" });
});

// 🔑 JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// 🔹 Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashedPassword, role },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.passwordHash || "");
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Middleware for auth
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};

// Register routes BEFORE starting server
app.use("/notifications", notificationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

// Run alerts every 24h + once at startup
setInterval(runAlerts, 24 * 60 * 60 * 1000);
runAlerts();