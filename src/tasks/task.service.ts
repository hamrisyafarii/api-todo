import { Priority, Status } from "@prisma/client";
import { TaskRepository } from "./task.repository";

const taskRepo = new TaskRepository();

export class TaskService {
  createTask(data: any) {
    return taskRepo.create(data);
  }

  getUserTasks(userId: number) {
    return taskRepo.findAllByUser(userId);
  }

  updateTask(id: number, data: any) {
    return taskRepo.update(id, data);
  }

  deleteTask(id: number) {
    return taskRepo.delete(id);
  }

  getTaskById(id: number) {
    return taskRepo.findById(id);
  }

  //   New featur
  toggleFavorite(id: number, isFavorite: boolean) {
    return taskRepo.toggleFavorite(id, isFavorite);
  }

  toggleArchive(id: number, isArchived: boolean) {
    return taskRepo.toggleArchive(id, isArchived);
  }

  async createSubtask(data: {
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    deadline?: string;
    parentTaskId: number;
    userId: number;
  }) {
    return taskRepo.createSubtask(data);
  }

  getSubtasks(parentTaskId: number) {
    return taskRepo.getSubtasks(parentTaskId);
  }

  async addComment(taskId: number, content: string) {
    return taskRepo.addCommentToTask(taskId, content);
  }

  async getComments(taskId: number) {
    return taskRepo.getCommentsByTask(taskId);
  }

  async getFilteredTasks(userId: number, query: any) {
    return taskRepo.getFilteredTasks(userId, query);
  }
}
