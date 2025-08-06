import { Response, Request } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TaskServices } from "./task.service";
import { errorResponse, successResponse } from "../utils";

const taskServices = new TaskServices();

export class TaskController {
  async create(req: AuthRequest, res: Response) {
    try {
      const task = await taskServices.createTask(req.body, req.user!.id);

      return successResponse(res, "Berhasil menambahkan task baru", task, 201);
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await taskServices.getAllTasks(req.query);

      return successResponse(
        res,
        "Berhasil mendapatkan semua data task",
        tasks,
        200
      );
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await taskServices.getTaskId(req.params.id);

      return successResponse(res, "Berhasil mandapatkan task by id", task, 200);
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const task = await taskServices.updateTask(req.params.id, req.body);

      return successResponse(res, "Berhasil update data task", task, 200);
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      await taskServices.deleteTask(req.params.id, req.user!.id);

      return successResponse(res, "Task berhasil di hapus");
    } catch (error) {
      return errorResponse(res, (error as Error).message, 500);
    }
  }
}
