import { Priority, Prisma, Status } from "@prisma/client";
import prisma from "../config/prisma";

interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  deadline?: Date;
  isFavorite?: boolean;
  isArchived?: boolean;
  categoryId?: number;
  labelIds?: number[];
  userId: number;
}

export class TaskRepository {
  async create(taskData: CreateTaskInput) {
    const { categoryId, labelIds, userId, ...rest } = taskData;

    return prisma.task.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        labels: labelIds
          ? { connect: labelIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        category: true,
        labels: true,
      },
    });
  }

  async findAllByUser(userId: number) {
    return prisma.task.findMany({
      where: { userId },
      include: {
        category: true,
        labels: true,
      },
    });
  }

  async update(id: number, taskData: Partial<CreateTaskInput>) {
    const { categoryId, labelIds, ...rest } = taskData;

    const updateData: any = {
      ...rest,
      ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
      ...(labelIds ? { labels: { set: labelIds.map((id) => ({ id })) } } : {}),
    };

    return prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        labels: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.task.delete({ where: { id } });
  }

  async findById(id: number) {
    return prisma.task.findUnique({
      where: { id },
      include: { category: true, labels: true },
    });
  }

  //   New Featur
  async toggleFavorite(id: number, isFavorite: boolean) {
    return prisma.task.update({
      where: { id },
      data: { isFavorite },
    });
  }

  async toggleArchive(id: number, isArchived: boolean) {
    return prisma.task.update({
      where: { id },
      data: { isArchived },
    });
  }

  async createSubtask(data: {
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    deadline?: string;
    parentTaskId: number;
    userId: number;
  }) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
        parentTaskId: data.parentTaskId,
        userId: data.userId,
      },
    });
  }

  async getSubtasks(parentTaskId: number) {
    return prisma.task.findMany({
      where: { parentTaskId },
    });
  }

  async addCommentToTask(taskId: number, content: string) {
    return prisma.comment.create({
      data: {
        taskId,
        content,
      },
    });
  }

  async getCommentsByTask(taskId: number) {
    return prisma.comment.findMany({
      where: { taskId },
      orderBy: { createdAt: "asc" },
    });
  }

  async getFilteredTasks(userId: number, query: any) {
    const {
      status,
      priority,
      isFavorite,
      isArchived,
      categoryId,
      labelId,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    console.log("Filter params", { status, priority, sortBy, sortOrder });
    console.log("Query userId", userId);

    const where: Prisma.TaskWhereInput = {
      userId,
      ...(status && { status }),
      ...(priority && { priority: priority.toUpperCase() }),
      ...(isFavorite !== undefined && { isFavorite: isFavorite === "true" }),
      ...(isArchived !== undefined && { isArchived: isArchived === "true" }),
      ...(categoryId && { categoryId: Number(categoryId) }),
      ...(labelId && {
        labels: {
          some: {
            id: Number(labelId),
          },
        },
      }),
    };

    return prisma.task.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder === "asc" ? "asc" : "desc",
      },
      include: {
        category: true,
        labels: true,
      },
    });
  }
}
