import prisma from "../config/prisma";

export class CommentRepository {
  async getAll(taskId: string) {
    return prisma.comment.findMany({
      where: {
        id: taskId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(taskId: string, content: string) {
    return prisma.comment.create({
      data: { taskId, content },
    });
  }

  async delete(commentId: string) {
    return prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
