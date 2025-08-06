import { Request, Response } from "express";
import { CategoryServices } from "./category.service";
import { errorResponse, successResponse } from "../utils";

const categoryServices = new CategoryServices();

export class CategoryController {
  async getCategories(_req: Request, res: Response) {
    try {
      const categories = await categoryServices.getAllCategory();

      return successResponse(
        res,
        "Berhasil mengambil data kategori",
        categories,
        200
      );
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      throw new Error("Kateogri wajin di isi");
    }

    try {
      const created = await categoryServices.createCategory(name);

      return successResponse(
        res,
        "Berhasil menambahkan kateogri",
        created,
        201
      );
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { name } = req.body;
    try {
      const updated = await categoryServices.updateCategory(id, name);

      return successResponse(res, "Berhasil memperbaru category", updated, 200);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await categoryServices.deleteCategory(id);

      return successResponse(res, "Berhasil menghapus kategori");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
