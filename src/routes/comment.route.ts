import { Router } from "express";
import { CommentController } from "../comments/comment.controller";

const commentController = new CommentController();
const router = Router();

router.get("/comment/task/:taskId", commentController.getByTaskId);
router.post("/comment", commentController.create);
router.delete("/comment/:commentId", commentController.delete);

export default router;
