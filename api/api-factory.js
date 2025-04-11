// @/api/api-factory.js
import { handleApiRequest } from "./api-handler";

/**
 * Base API class that provides standardized CRUD operations
 * and utilities for API requests
 */
export class BaseApi {
  constructor(entity, config = {}) {
    this.entity = entity;
    this.config = {
      basePath: '',
      defaultParams: {
        limit: 10,
        page: 1,
        ...(config.defaultParams || {})
      },
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      ...config,
    };
    
    this.baseUrl = `${this.config.basePath}/${this.entity}`;
  }
  
  /**
   * Creates query string from parameters, handling complex objects and arrays
   */
  createQueryString(customParams = {}) {
    const params = {
      ...this.config.defaultParams,
      ...customParams,
    };

    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(','));
      }
      else if (value !== null && typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value));
      }
      else {
        searchParams.append(key, value.toString());
      }
    });
    
    return searchParams.toString();
  }
  
  /**
   * Prepares filter parameters for the base service
   */
  prepareParams(params = {}) {
    const result = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (key === 'filter' && typeof value === 'object') {
          result.filter = value;
        } else if (key === 'sort' && typeof value === 'object') {
          const sortArray = Object.entries(value).map(([field, order]) => 
            order === -1 || order === '-1' ? `-${field}` : field
          );
          result.sort = sortArray.join(',');
        } else {
          result[key] = value;
        }
      }
    });

    return result;
  }
  
  /**
   * Get all records with pagination and filtering
   */
  async getAll({ token = null, params = {}, options = {} } = {}) {
    const processedParams = this.prepareParams(params);
    const queryString = this.createQueryString(processedParams);
    
    const requestOptions = {
      cache: this.config.cache,
      limit: 30,
      ...options
    };
  
    if (token) {
      requestOptions.token = token;
    }
  
    return handleApiRequest("GET", `${this.baseUrl}?${queryString}`, requestOptions);
  }

  /**
   * Get a single record by ID
   */
  async getById({ token = null, id, options = {} } = {}) {
    if (!id) {
      throw new Error("ID is required");
    }
  
    const requestOptions = {
      cache: this.config.cache,
      ...options
    };
  
    if (token) {
      requestOptions.token = token;
    }
  
    return handleApiRequest("GET", `${this.baseUrl}/${id}`, requestOptions);
  }

  /**
   * Create a new record
   */
  async create({ token, data, options = {} } = {}) {
    return handleApiRequest("POST", this.baseUrl, {
      token,
      body: data,
      ...options
    });
  }

  /**
   * Update an existing record
   */
  async update({ token, id, data, options = {} } = {}) {
    return handleApiRequest("PATCH", `${this.baseUrl}/${id}`, {
      token,
      body: data,
      ...options
    });
  }

  /**
   * Delete a record
   */
  async delete({ token, id, options = {} } = {}) {
    return handleApiRequest("DELETE", `${this.baseUrl}/${id}`, {
      token,
      ...options
    });
  }

  /**
   * Find records by a specific field
   */
  async findBy({ token = null, field, value, params = {}, options = {} } = {}) {
    if (!field || value === undefined) {
      throw new Error("Field and value are required");
    }
    
    const queryParams = {
      ...params,
      filter: {
        ...(params.filter || {}),
        [field]: value
      }
    };
    
    const processedParams = this.prepareParams(queryParams);
    const queryString = this.createQueryString(processedParams);
    
    const requestOptions = {
      cache: this.config.cache,
      ...options
    };
  
    if (token) {
      requestOptions.token = token;
    }
  
    return handleApiRequest("GET", `${this.baseUrl}?${queryString}`, requestOptions);
  }
  
  /**
   * Make a custom API request
   */
  async request(method, endpoint, { token, data, params, options = {} } = {}) {
    let url = endpoint;
    
    if (params) {
      const processedParams = this.prepareParams(params);
      const queryString = this.createQueryString(processedParams);
      url = `${endpoint}?${queryString}`;
    }
    
    return handleApiRequest(method, url, {
      token,
      body: data,
      cache: this.config.cache,
      ...options
    });
  }
}

/**
 * Factory function to create a new BaseApi instance
 */
export const createCrudApi = (entity, config = {}) => {
  return new BaseApi(entity, config);
};