import { Request, Response, NextFunction } from "express";
import { errorResponse, verifyToken } from "../utils";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; username: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return errorResponse(res, "Akses ditolak, tidak ada token");
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid token", 401);
  }
};
