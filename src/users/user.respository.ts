import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    if (!id) throw new Error("User ID is required");
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async createNewUser(userData: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: userData,
    });
  }
}
