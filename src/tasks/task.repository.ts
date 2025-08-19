import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { CreateTaskScehma, UpdateTaskSchema } from "../validators/task.schema";

export class TaskRepository {
  async createNewTask(data: CreateTaskScehma & { userId: string }) {
    return await prisma.task.create({
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : null,
      },
      include: {
        category: { select: { name: true } },
        user: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async findAllTask(query: {
    search?: string;
    sort?: string;
    order?: string;
    page?: string;
    limit?: string;
  }) {
    const {
      search,
      sort = "createdAt",
      order = "desc",
      page = "1",
      limit = "10",
    } = query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              category: {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            },
          ],
        }
      : undefined;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: {
          [sort]: order,
        },
        skip,
        take: parseInt(limit),
        include: {
          category: { select: { name: true } },
          user: { select: { id: true, username: true } },
        },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      total,
      page: pageNum,
      lastPage: Math.ceil(total / limitNum),
    };
  }

  async findById(id: string) {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  async updateDataTask(id: string, data: UpdateTaskSchema) {
    return await prisma.task.update({
      where: { id },
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : null,
      },
      include: {
        category: { select: { name: true } },
        user: { select: { id: true, username: true, email: true } },
      },
    });
  }

  async deleteDataTask(id: string) {
    return await prisma.task.delete({
      where: { id },
    });
  }

  async toggleFavorite(id: string, isFavorite: boolean) {
    return prisma.task.update({
      where: { id },
      data: { isFavorite },
    });
  }
}
