import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createNewUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
