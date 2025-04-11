import { BaseApi } from "../api-factory";
import { handleApiRequest } from "../api-handler";

/**
 * API class for dish-related operations
 */
class DishApiClass extends BaseApi {
  constructor() {
    super("dishes");
  }

  /**
   * Get the seller's dishes with pagination, search, and filtering
   */
  async getMyDishs({ token,  options = {} }) {
 
    // Use BaseApi's prepareParams to handle the parameters
    const processedParams = this.prepareParams({
      page: 1,
      limit: 50,
    });

    // Use BaseApi's createQueryString to generate the query string
    const queryString = this.createQueryString(processedParams);

    return handleApiRequest("GET", `/dishes/my-dishes?${queryString}`, {
      token,
      ...options,
    });
  }

  async getDishByCaterer({ catererId, options = {} }) {
    const params = {
      page: 1,
      limit: 50,
    } 

    const queryString = this.createQueryString(params);

    return handleApiRequest("GET", `/dishes/by-caterer/${catererId}?${queryString}`, {
      ...options,
    });
  }


  /**
   * Upload dish image
   */
  async uploadImage({
    token,
    id,
    file,
    description = "",
    metadata = {},
  } = {}) {
    if (!file) {
      throw new Error("File is required");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("metadata", JSON.stringify(metadata));

    return handleApiRequest("POST", `/dishes/${id}/images`, {
      token,
      body: formData,
    });
  }



  /**
   * Delete media
   */
  async deleteImage({ token, dishId, imageId }) {
    if (!dishId || !imageId) {
      throw new Error("Dish ID and Image ID are required");
    }

    return handleApiRequest(
      "DELETE",
      `/dishes/${dishId}/images/${imageId}`,
      { token }
    );
  }
}

// Create and export a singleton instance of the API class
export const DishApi = new DishApiClass();