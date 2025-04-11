import { handleApiRequest } from "../api-handler";

const ENDPOINT = "/cart";

export const cartApi = {
  getCart: async (token) => {
    return handleApiRequest("GET", ENDPOINT, { token }, false);
  },

  addToCart: ({token, dishId, quantity, catererId}) => {
    const data = {
      dishId,
      quantity,
      catererId,
    }
    return handleApiRequest("POST", `${ENDPOINT}/add-item`, { token, body: data });
  },

  updateCartItem: (token, itemId, quantity, catererId) => {
    return handleApiRequest("PATCH", `${ENDPOINT}/update-item`, {
      token,
      body: { itemId, quantity, catererId },
    });
  },

  removeCartItem: (token, itemId, catererId) => {
    return handleApiRequest("DELETE", `${ENDPOINT}/remove-item`, { token, body: { itemId, catererId } });
  },

  clearCart: (token, catererId) => {
    return handleApiRequest("DELETE", `${ENDPOINT}/delete`, { token, body: { catererId } });
  },
};