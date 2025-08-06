import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { AuthController } from "../users/auth.controller";

const authController = new AuthController();
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/profile", authenticate, authController.getProfile);

export default router;
