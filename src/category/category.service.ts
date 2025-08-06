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
    return categoryRepository.create(name);
  }

  async updateCategory(id: string, name: string) {
    return categoryRepository.update(id, name);
  }

  async deleteCategory(id: string) {
    return categoryRepository.delete(id);
  }
}
