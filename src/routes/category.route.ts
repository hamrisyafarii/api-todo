import { Router } from "express";
import { CategoryController } from "../category/category.controller";

const categoryController = new CategoryController();
const router = Router();

router.get("/category", categoryController.getCategories);
router.post("/category", categoryController.create);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

export default router;
