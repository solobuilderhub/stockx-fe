// @/api/platform/caterer-api.js
import { BaseApi } from "../api-factory";
import { handleApiRequest } from "../api-handler";

/**
 * Caterer API with specialized methods for caterer management
 */
class CatererApi extends BaseApi {
  constructor(config = {}) {
    super('caterers', config);
  }

  async getMyCatererProfile({ token }) {
    return this.request("GET", `/caterers/me`, {
      token,
    });
  }

  /**
   * Get nearby caterers based on location coordinates
   * @param {Object} params - The parameters 
   * @param {string} params.token - Auth token
   * @param {Object} params.params - Query parameters including latitude, longitude, radius
   */
  async getNearby({ params = {} } = {}) {
    const processedParams = this.prepareParams(params);
    const queryString = this.createQueryString(processedParams);
    
    return handleApiRequest("GET", `/caterers/nearby?${queryString}`, {
    });
  }

  /**
   * Upload profile photo for a caterer
   * @param {Object} params - The parameters
   * @param {string} params.token - Auth token
   * @param {string} params.catererId - Caterer ID
   * @param {File} params.file - The image file to upload
   */
  async uploadProfilePhoto({ token, catererId, file } = {}) {
    if (!catererId) {
      throw new Error("Caterer ID is required");
    }
    
    if (!file) {
      throw new Error("File is required");
    }

    const formData = new FormData();
    formData.append("file", file);

    return handleApiRequest("POST", `/caterers/${catererId}/profile-photo`, {
      token,
      body: formData,
    });
  }

  /**
   * Delete profile photo for a caterer
   * @param {Object} params - The parameters
   * @param {string} params.token - Auth token
   * @param {string} params.catererId - Caterer ID
   */
  async deleteProfilePhoto({ token, catererId } = {}) {
    if (!catererId) {
      throw new Error("Caterer ID is required");
    }

    return handleApiRequest("DELETE", `/caterers/${catererId}/profile-photo`, {
      token,
    });
  }

  /**
   * Upload cover photo for a caterer
   * @param {Object} params - The parameters
   * @param {string} params.token - Auth token
   * @param {string} params.catererId - Caterer ID
   * @param {File} params.file - The image file to upload
   */
  async uploadCoverPhoto({ token, catererId, file } = {}) {
    if (!catererId) {
      throw new Error("Caterer ID is required");
    }
    
    if (!file) {
      throw new Error("File is required");
    }

    const formData = new FormData();
    formData.append("file", file);

    return handleApiRequest("POST", `/caterers/${catererId}/cover-photo`, {
      token,
      body: formData,
    });
  }

  /**
   * Delete cover photo for a caterer
   * @param {Object} params - The parameters
   * @param {string} params.token - Auth token
   * @param {string} params.catererId - Caterer ID
   */
  async deleteCoverPhoto({ token, catererId } = {}) {
    if (!catererId) {
      throw new Error("Caterer ID is required");
    }

    return handleApiRequest("DELETE", `/caterers/${catererId}/cover-photo`, {
      token,
    });
  }
}

// Create and export a singleton instance of the CatererApi
const catererApi = new CatererApi();

export default catererApi;