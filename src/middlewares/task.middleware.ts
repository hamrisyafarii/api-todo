import { NextFunction, Response, Request } from "express";
import { errorResponse } from "../utils";

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const errors = result.error.errors.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return errorResponse(res, "Validasi error", errors);
      }
      req.body = result.data;
      next();
    } catch (error: any) {
      return errorResponse(res, "Invalid req data", error);
    }
  };
};
