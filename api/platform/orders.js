// @/api/platform/orders.js
import { BaseApi } from "../api-factory";

// Define order status enum for reference
export const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

/**
 * Orders API class with specialized methods for orders management
 */
class OrdersApiClass extends BaseApi {
  constructor() {
    super('orders', {
      cache: 'no-store',
      defaultParams: {
        limit: 10,
        page: 1
      }
    });
    
    this.OrderStatus = OrderStatus;
  }
  
  /**
   * Create a new order from the user's cart
   */
  async createOrder({ token, data, options = {} }) {
    return this.create({ token, data, options });
  }
  
  /**
   * Get admin orders with pagination and filtering
   */
  async getAdminOrders({ token, params = {}, options = {} }) {
    const processedParams = this.prepareParams(params);
    const queryString = this.createQueryString(processedParams);
    
    return this.request('GET', `/orders/admin`, {
      token,
      params,
      options: { cache: 'no-store', ...options }
    });
  }
  
  /**
   * Get seller orders with pagination and filtering
   */
  async getSellerOrders({ token, params = {}, options = {} }) {
    const processedParams = this.prepareParams(params);
    const queryString = this.createQueryString(processedParams);
    
    return this.request('GET', `/orders/seller`, {
      token,
      params,
      options: { cache: 'no-store', ...options }
    });
  }
  
  /**
   * Cancel an order
   */
  async cancelOrder({ token, id, reason, options = {} }) {
    if (!id) {
      throw new Error("Order ID is required");
    }
    
    return this.request('POST', `/orders/${id}/cancel`, {
      token,
      data: { reason },
      options: { cache: 'no-store', ...options }
    });
  }
}

// Create and export singleton instance
export const OrdersApi = new OrdersApiClass();

export default OrdersApi;