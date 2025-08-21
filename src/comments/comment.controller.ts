import { Request, Response } from "express";
import { CommentService } from "./comment.service";
import { successResponse } from "../utils";
import { commentDataSchema } from "../validators/comment.schema";

const service = new CommentService();

export class CommentController {
  async getByTaskId(req: Request, res: Response) {
    const taskId = req.params.id;

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid taskId" });
    }
    const data = await service.getCommentsByTask(taskId);
    return successResponse(res, "Fetching all comment Success", data, 200);
  }

  async create(req: Request, res: Response) {
    const parsed = commentDataSchema.safeParse(req.body);

    if (!parsed) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment data",
      });
    }

    const data = await service.createComment(parsed.data!);

    return successResponse(res, "Comment terkirim", data, 201);
  }

  async delete(req: Request, res: Response) {
    const commentId = req.params.id;
    await service.deleteComment(commentId);
    res.json({ success: true, message: "Comment deleted" });
  }
}
