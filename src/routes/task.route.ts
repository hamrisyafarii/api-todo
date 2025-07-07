import { Router } from "express";
import { authenticate } from "../middlewares/user.middleware";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  toggleFavorite,
  toggleArchive,
  getSubtasks,
  createSubtask,
  addComment,
  getComments,
} from "../tasks/task.controller";

const router = Router();

router.use(authenticate);

router.post("/task", createTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

// New Featur
router.patch("/task/:id/favorite", toggleFavorite);

router.patch("/task/:id/archive", toggleArchive);

router.post("/task/:parentId/subtask", createSubtask);
router.get("/task/:parentId/subtasks", getSubtasks);

router.post("/task/:taskId/comments", addComment);
router.get("/task/:taskId/comments", getComments);

export default router;
