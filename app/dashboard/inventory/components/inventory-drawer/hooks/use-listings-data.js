
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../utils/apiClient';

// Sample listings data
const mockStockXListings = [
  {
    amount: "150",
    ask: {
      askId: "ask123",
      askCreatedAt: new Date().toISOString(),
      askUpdatedAt: new Date().toISOString(),
      askExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    order: null,
    product: {
      productId: "prod123",
      productName: "Nike Dunk Low",
      styleId: "DD1391-100",
    },
    variant: {
      variantId: "var123",
      variantName: "US 9",
      variantValue: "9",
    },
    currencyCode: "USD",
    listingId: "list123",
    status: "ACTIVE",
    inventoryType: "standard",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authenticationDetails: null,
    batch: {
      batchId: "batch123",
      taskId: "task123",
    },
    initiatedShipments: null,
  }
];

const mockGoatListings = [
  {
    amount: "150",
    order: null,
    product: {
      productId: "prod123",
      productName: "Nike Dunk Low",
      styleId: "DD1391-100",
    },
    variant: {
      variantId: "var123",
      variantName: "US 9",
      variantValue: "9",
    },
    currencyCode: "USD",
    listingId: "list123",
    status: "ACTIVE",
    inventoryType: "standard",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Query keys for React Query
export const listingsKeys = {
  all: ['listings'],
  stockx: () => [...listingsKeys.all, 'stockx'],
  stockxByVariant: (variantId) => [...listingsKeys.stockx(), variantId],
  goat: () => [...listingsKeys.all, 'goat'],
  goatBySize: (size) => [...listingsKeys.goat(), size],
};

/**
 * Hook to fetch StockX listings for a variant
 */
export const useStockXListings = (variantId) => {
  return useQuery({
    queryKey: listingsKeys.stockxByVariant(variantId || ''),
    queryFn: async () => {
      if (!variantId) return [];
      
      // In a real app, we would fetch data from an API
      const response = await apiClient.get('/api/stockx/listings', mockStockXListings);
      return response.data;
    },
    enabled: !!variantId,
  });
};

/**
 * Hook to fetch GOAT listings by size
 */
export const useGoatListings = (size) => {
  return useQuery({
    queryKey: listingsKeys.goatBySize(size || ''),
    queryFn: async () => {
      if (!size) return [];
      
      const response = await apiClient.get('/api/goat/listings', mockGoatListings);
      return response.data;
    },
    enabled: !!size,
  });
};

/**
 * Hook to create a new listing with optimistic updates
 */
export const useCreateListing = (platform) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (listingData) => {
      const response = await apiClient.post(
        `/api/${platform}/listings`, 
        listingData,
        platform === 'stockx' ? mockStockXListings[0] : mockGoatListings[0]
      );
      return response.data;
    },
    onMutate: async (newListing) => {
      // For optimistic updates, we would:
      // 1. Cancel any outgoing refetches
      // 2. Snapshot the previous value
      // 3. Optimistically update the cache
      return { previousListing: null };
    },
    onSettled: (data, error, variables, context) => {
      // Always refetch after error or success to ensure cache is up to date
      if (platform === 'stockx') {
        queryClient.invalidateQueries({ queryKey: listingsKeys.stockx() });
      } else {
        queryClient.invalidateQueries({ queryKey: listingsKeys.goat() });
      }
    },
  });
};
