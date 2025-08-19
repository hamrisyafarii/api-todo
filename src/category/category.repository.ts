import prisma from "../config/prisma";

export class CategoryRepository {
  async findAllCategory() {
    return prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return prisma.category.findUnique({
      where: { name },
    });
  }

  async create(name: string) {
    return prisma.category.create({
      data: { name },
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
