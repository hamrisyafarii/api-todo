import prisma from "../config/prisma";
import { CommentDataSchema } from "../validators/comment.schema";

export class CommentRepository {
  async getAll(taskId: string) {
    return prisma.comment.findMany({
      where: {
        taskId,
      },
      include: {
        task: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: CommentDataSchema) {
    return prisma.comment.create({
      data: {
        content: data.content,
        taskId: data.taskId,
      },
      include: {
        task: { select: { id: true } },
      },
    });
  }

  async delete(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}
