import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { TaskController } from "../tasks/task.controller";

const taskController = new TaskController();

const router = Router();

router.use(authenticate);

router.get("/tasks", taskController.getAllTasks);
router.get("/task/:id", taskController.getTaskById);
router.post("/task", taskController.create);
router.put("/task/:id", taskController.update);
router.delete("/task/:id", taskController.delete);

export default router;
