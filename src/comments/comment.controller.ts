import { Request, Response } from "express";
import { CommentService } from "./comment.service";

const service = new CommentService();

export class CommentController {
  async getByTaskId(req: Request, res: Response) {
    const taskId = req.params.taskId;

    if (taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid taskId" });
    }
    const data = await service.getCommentsByTask(taskId);
    res.json({ success: true, message: "Comments fetched", data });
  }

  async create(req: Request, res: Response) {
    const taskId = req.body.taskId;
    const content = req.body.content;
    const data = await service.createComment(taskId, content);
    res.status(201).json({ success: true, message: "Comment created", data });
  }

  async delete(req: Request, res: Response) {
    const commentId = req.params.commentId;
    await service.deleteComment(commentId);
    res.json({ success: true, message: "Comment deleted" });
  }
}
