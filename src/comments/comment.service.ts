import { CommentRepository } from "./comment.repository";

const commentRepo = new CommentRepository();

export class CommentService {
  async getCommentsByTask(taskId: string) {
    return commentRepo.getAll(taskId);
  }

  async createComment(taskId: string, content: string) {
    return commentRepo.create(taskId, content);
  }

  async deleteComment(commentId: string) {
    return commentRepo.delete(commentId);
  }
}
