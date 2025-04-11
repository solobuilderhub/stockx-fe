// @/api/platform/category-api.js
import { BaseApi } from "../api-factory";
import { handleApiRequest } from "../api-handler";

/**
 * Categories API with specialized methods for category management
 */
class CategoriesApi extends BaseApi {
  constructor(config = {}) {
    super('categories', config);
  }
  
  /**
   * Get root categories
   */
  async getRootCategories({ token = null, options = {} } = {}) {
    const requestOptions = {
      cache: 'force-cache',
      ...options
    };
    
    if (token) {
      requestOptions.token = token;
    }
    
    return handleApiRequest("GET", "/categories/root", requestOptions);
  }
  
  /**
   * Get subcategories for a specific category
   */
  async getSubcategories({ token = null, categoryId, options = {} } = {}) {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    
    const requestOptions = {
      cache: 'force-cache',
      ...options
    };
    
    if (token) {
      requestOptions.token = token;
    }
    
    return handleApiRequest("GET", `/api/categories/${categoryId}/subcategories`, requestOptions);
  }
}

// Create and export a singleton instance of the CategoriesApi
export const categoriesApi = new CategoriesApi();