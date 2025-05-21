
// Mock API client utility for handling API requests
// In a real app, this would connect to actual API endpoints

/**
 * Mock API response delay to simulate network requests
 */
export const mockApiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Error class for API errors
 */
export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Mock API client methods to simulate API calls
 */
export const apiClient = {
  /**
   * Mock GET request
   */
  async get(endpoint, mockData, errorChance = 0) {
    await mockApiDelay();
    
    // Simulate random errors with errorChance probability
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to fetch data', 500);
    }
    
    return {
      data: mockData,
      success: true,
    };
  },
  
  /**
   * Mock POST request
   */
  async post(endpoint, data, mockResponse, errorChance = 0) {
    await mockApiDelay();
    
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to create data', 500);
    }
    
    return {
      data: mockResponse,
      success: true,
    };
  },
  
  /**
   * Mock PUT request
   */
  async put(endpoint, data, mockResponse, errorChance = 0) {
    await mockApiDelay();
    
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to update data', 500);
    }
    
    return {
      data: mockResponse,
      success: true,
    };
  },
  
  /**
   * Mock DELETE request
   */
  async delete(endpoint, mockResponse, errorChance = 0) {
    await mockApiDelay();
    
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to delete data', 500);
    }
    
    return {
      data: mockResponse,
      success: true,
    };
  }
};
