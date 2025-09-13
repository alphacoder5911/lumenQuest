import express from "express";
import { register, login, logout, verifyToken } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validateRegistration, validateLogin } from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", authMiddleware(), logout);
router.get("/verify", authMiddleware(), verifyToken);

export default router;