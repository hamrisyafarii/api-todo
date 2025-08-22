import { CategoryRepository } from "./category.repository";

const categoryRepository = new CategoryRepository();

export class CategoryServices {
  async getAllCategory(userId: string) {
    return categoryRepository.findAllCategory(userId);
  }

  async getCategoryById(id: string) {
    return categoryRepository.findById(id);
  }

  async createCategory(name: string, userId: string) {
    const existingName = await categoryRepository.findByName(name, userId);
    if (existingName) {
      throw new Error(
        "Kategori sudah digunakan, harap menggunakan nama lain !"
      );
    }

    return await categoryRepository.create(name, userId);
  }

  async updateCategory(id: string, name: string) {
    return categoryRepository.update(id, name);
  }

  async deleteCategory(id: string) {
    return categoryRepository.delete(id);
  }
}
