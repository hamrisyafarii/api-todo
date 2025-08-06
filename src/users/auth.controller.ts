import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "../utils";
import { AuthService } from "./auth.service";

const userService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await userService.userRegister(req.body);

      return successResponse(res, "Berhasil membuat akun baru", result, 201);
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await userService.userLogin(req.body);

      return successResponse(res, "Kamu berhasil login", result, 200);
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const user = await userService.getUserProfile(userId);

      return successResponse(res, "Berhasil mengambil data user", user, 200);
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }
}
