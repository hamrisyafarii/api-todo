import { CommentDataSchema } from "../validators/comment.schema";
import { CommentRepository } from "./comment.repository";

const commentRepo = new CommentRepository();

export class CommentService {
  async getCommentsByTask(taskId: string) {
    return commentRepo.getAll(taskId);
  }

  async createComment(data: CommentDataSchema) {
    return commentRepo.create(data);
  }

  async deleteComment(id: string) {
    return commentRepo.delete(id);
  }
}
