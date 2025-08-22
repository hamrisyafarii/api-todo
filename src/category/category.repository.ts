import prisma from "../config/prisma";

export class CategoryRepository {
  async findAllCategory(userId: string) {
    return prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        tasks: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string, userId: string) {
    return prisma.category.findFirst({
      where: { name: name.toLowerCase(), userId },
    });
  }

  async create(name: string, userId: string) {
    return prisma.category.create({
      data: { name, userId },
    });
  }

  async update(id: string, name: string) {
    return prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
