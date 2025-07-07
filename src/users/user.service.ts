import { UserRepository } from "./user.respository";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const userRepository = new UserRepository();

export class UserService {
  async userRegister(name: string, email: string, password: string) {
    const findEmail = await userRepository.findByEmail(email);
    if (findEmail) throw new Error("Email sudah digunakan");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.createNewUser({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async userLogin(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Email tidak ditemukan");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Password Salah");

    const token = generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async getUserProfile(userId: number) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...safeUser } = user;
    return safeUser;
  }
}
