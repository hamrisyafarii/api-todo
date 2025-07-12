import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/user.middleware";
import { TaskService } from "./task.service";
import { CreateTaskSchema, UpdateTaskSchema } from "../validators/task.schema";
import { successResponse, errorResponse } from "../utils/responeHandler";
import { CreateSubtaskSchema } from "../validators/subtask.schema";

const taskService = new TaskService();

export const createTask = async (req: AuthRequest, res: Response) => {
  const result = CreateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return errorResponse(res, "Validasi gagal", 400, result.error.errors);
  }

  try {
    const task = await taskService.createTask({
      ...result.data,
      userId: req.user!.id,
    });
    return successResponse(res, "Task berhasil dibuat", task, 201);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await taskService.getFilteredTasks(req.user!.id, req.query);
    return successResponse(res, "Tasks fetched", tasks);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const result = UpdateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return errorResponse(res, "Validasi gagal", 400, result.error.errors);
  }

  try {
    const task = await taskService.updateTask(
      Number(req.params.id),
      result.data
    );
    return successResponse(res, "Task berhasil diupdate", task);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    return successResponse(res, "Task berhasil dihapus", null);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

// New Feature
export const toggleFavorite = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const { isFavorite } = req.body;

  if (typeof isFavorite !== "boolean") {
    return errorResponse(res, "Field 'isFavorite' harus berupa boolean", 400);
  }

  try {
    const task = await taskService.toggleFavorite(taskId, isFavorite);
    return successResponse(res, "Berhasil mengubah status favorit task", task);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const toggleArchive = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const { isArchived } = req.body;

  if (typeof isArchived !== "boolean") {
    return errorResponse(res, "Field 'isArchived' harus berupa boolean", 400);
  }

  try {
    const task = await taskService.toggleArchive(taskId, isArchived);
    return successResponse(res, "Berhasil mengubah status arsip task", task);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const createSubtask = async (req: AuthRequest, res: Response) => {
  const result = CreateSubtaskSchema.safeParse(req.body);
  if (!result.success) {
    return errorResponse(res, "Validasi gagal", 400, result.error.errors);
  }

  try {
    const subtask = await taskService.createSubtask({
      ...result.data,
      parentTaskId: Number(req.params.parentId),
      userId: req.user!.id,
    });

    return successResponse(res, "Subtask created", subtask, 201);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const getSubtasks = async (req: Request, res: Response) => {
  const parentTaskId = Number(req.params.parentId);

  try {
    const subtasks = await taskService.getSubtasks(parentTaskId);
    return successResponse(res, "Subtasks fetched", subtasks);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const addComment = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  const taskId = Number(req.params.taskId);

  if (!content || content.trim() === "") {
    return errorResponse(res, "Komentar tidak boleh kosong", 400);
  }

  try {
    const comment = await taskService.addComment(taskId, content);
    return successResponse(res, "Komentar ditambahkan", comment, 201);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};

export const getComments = async (req: AuthRequest, res: Response) => {
  const taskId = Number(req.params.taskId);

  try {
    const comments = await taskService.getComments(taskId);
    return successResponse(res, "Daftar komentar ditemukan", comments);
  } catch (err: any) {
    return errorResponse(res, err.message);
  }
};
