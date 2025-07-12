import prisma from "../config/prisma";

export class CategoryRepository {
  async findAllCategory() {
    return prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async create(name: string) {
    return prisma.category.create({
      data: { name },
    });
  }

  async update(id: number, name: string) {
    return prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
