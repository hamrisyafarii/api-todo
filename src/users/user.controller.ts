import { Request, Response } from "express";
import { UserService } from "./user.service";
import { CreateUserSchema } from "../validators/user.schema";
import { AuthRequest } from "../middlewares/user.middleware";
import { errorResponse, successResponse, exclude } from "../utils";

const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, "Validasi gagal", 400, result.error.errors);
  }

  const { name, email, password } = result.data;

  try {
    const user = await userService.userRegister(name, email, password);
    const safeUser = exclude(user, ["password"]);

    return successResponse(res, "User berhasil register", safeUser, 201);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await userService.userLogin(email, password);
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getUserProfile(req.user!.id);

    return successResponse(res, "User profile fetched", user);
  } catch (err: any) {
    return errorResponse(res, err.message, 404);
  }
};
