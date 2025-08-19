import { CreateTaskScehma, UpdateTaskSchema } from "../validators/task.schema";
import { TaskRepository } from "./task.repository";

const taskRepo = new TaskRepository();

export class TaskServices {
  async createTask(data: CreateTaskScehma, userId: string) {
    const task = await taskRepo.createNewTask({
      ...data,
      userId,
    });

    return task;
  }

  async getAllTasks(query: { search?: string; sort?: string; order?: string }) {
    return await taskRepo.findAllTask(query);
  }

  async getTaskId(id: string) {
    const taskId = await taskRepo.findById(id);
    if (!taskId) {
      throw new Error("Task tidak ditemukan");
    }
    return taskId;
  }

  async updateTask(id: string, data: UpdateTaskSchema) {
    const task = await taskRepo.updateDataTask(id, data);
    if (!task) {
      throw new Error("Task tidak ditemukan, tidak bisa update");
    }
    return task;
  }

  async deleteTask(id: string, userId: string) {
    const task = await taskRepo.deleteDataTask(id);

    if (!task) {
      throw new Error("Task tidak ditemukan, tidak bisa delete");
    }

    if (task.userId !== userId) {
      throw new Error("Tidak ada akses untuk menghapus task ini");
    }

    return task;
  }

  async toggleFavorite(id: string, isFavorite: boolean) {
    return taskRepo.toggleFavorite(id, isFavorite);
  }
}
