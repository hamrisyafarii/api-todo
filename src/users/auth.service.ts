import { UserRepository } from "./user.respository";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { Prisma } from "@prisma/client";

type loginSchema = {
  username: string;
  password: string;
};

const userRepository = new UserRepository();

export class AuthService {
  async userRegister(data: Prisma.UserCreateInput) {
    const existsUsername = await userRepository.findByUsername(data.username);
    if (existsUsername) {
      throw new Error(
        "Username Sudah digunakan, mohon menggunakan username yang lain !"
      );
    }

    const findEmail = await userRepository.findByEmail(data.email);
    if (findEmail)
      throw new Error(
        "Email sudah digunakan, mohon untuk menggunakan email yang lain !"
      );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await userRepository.createNewUser({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  async userLogin(data: loginSchema) {
    const user = await userRepository.findByUsername(data.username);
    if (!user) {
      throw new Error("Invalid Username or password");
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid Username or password");

    const token = generateToken({ id: user.id, email: user.email });

    const { password, ...UserWithoutPassword } = user;

    return { user: UserWithoutPassword, token };
  }

  async getUserProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
