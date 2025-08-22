import { Router } from "express";
import { CategoryController } from "../category/category.controller";
import { authenticate } from "../middlewares/auth.middleware";

const categoryController = new CategoryController();
const router = Router();

router.use(authenticate);

router.get("/category", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.post("/category", categoryController.create);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

export default router;
