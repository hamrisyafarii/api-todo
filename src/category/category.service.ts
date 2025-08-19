import { CategoryRepository } from "./category.repository";

const categoryRepository = new CategoryRepository();

export class CategoryServices {
  async getAllCategory() {
    return categoryRepository.findAllCategory();
  }

  async getCategoryById(id: string) {
    return categoryRepository.findById(id);
  }

  async createCategory(name: string) {
    const existingName = await categoryRepository.findByName(name);
    if (existingName) {
      throw new Error(
        "Kategori sudah digunakan, harap menggunakan nama lain !"
      );
    }

    return await categoryRepository.create(name);
  }

  async updateCategory(id: string, name: string) {
    return categoryRepository.update(id, name);
  }

  async deleteCategory(id: string) {
    return categoryRepository.delete(id);
  }
}
