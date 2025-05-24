"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../utils/apiClient";

// Mock StockX listing data
const mockStockXListings = [
    {
        amount: "148",
        ask: {
            askId: "14632361809866143310",
            askCreatedAt: "2025-04-10T19:30:56.000Z",
            askUpdatedAt: "2025-04-10T19:30:56.000Z",
            askExpiresAt: "2026-04-10T19:30:46.000Z",
        },
        order: null,
        product: {
            productId: "3414f48d-e8bf-463f-9e6b-9d8520a202b9",
            productName: 'Timberland 6" Boot Black Nubuck Premium',
            styleId: "TB00073-009",
        },
        variant: {
            variantId: "7f70b1d5-f9a2-4eff-af46-b19c3a68af5e",
            variantName: "Timberland-6-Black-Nubuck:9",
            variantValue: "9",
        },
        currencyCode: "USD",
        listingId: "f9c5e3f5-0762-4a9d-aebb-e74a2cdca53d",
        status: "ACTIVE",
        inventoryType: "STANDARD",
        createdAt: "2025-04-10T19:30:55.251Z",
        updatedAt: "2025-04-10T19:31:00.225Z",
        authenticationDetails: null,
        batch: {
            batchId: "52591f34-524e-42b1-a571-133ad0f6574e",
            taskId: "c34445fb-9730-4ce1-b7b6-20439351cc50",
        },
        initiatedShipments: null,
    },
    {
        amount: "155",
        ask: {
            askId: "14632361809866143311",
            askCreatedAt: "2025-04-12T14:20:16.000Z",
            askUpdatedAt: "2025-04-12T14:20:16.000Z",
            askExpiresAt: "2026-04-12T14:20:16.000Z",
        },
        order: null,
        product: {
            productId: "3414f48d-e8bf-463f-9e6b-9d8520a202b9",
            productName: 'Timberland 6" Boot Black Nubuck Premium',
            styleId: "TB00073-009",
        },
        variant: {
            variantId: "8f70b1d5-f9a2-4eff-af46-b19c3a68af5e",
            variantName: "Timberland-6-Black-Nubuck:10",
            variantValue: "10",
        },
        currencyCode: "USD",
        listingId: "g9c5e3f5-0762-4a9d-aebb-e74a2cdca53d",
        status: "ACTIVE",
        inventoryType: "STANDARD",
        createdAt: "2025-04-12T14:20:16.251Z",
        updatedAt: "2025-04-12T14:20:20.225Z",
        authenticationDetails: null,
        batch: {
            batchId: "52591f34-524e-42b1-a571-133ad0f6574e",
            taskId: "c34445fb-9730-4ce1-b7b6-20439351cc50",
        },
        initiatedShipments: null,
    },
    {
        amount: "162",
        ask: {
            askId: "14632361809866143312",
            askCreatedAt: "2025-04-14T10:15:30.000Z",
            askUpdatedAt: "2025-04-14T10:15:30.000Z",
            askExpiresAt: "2026-04-14T10:15:30.000Z",
        },
        order: null,
        product: {
            productId: "3414f48d-e8bf-463f-9e6b-9d8520a202b9",
            productName: 'Timberland 6" Boot Black Nubuck Premium',
            styleId: "TB00073-009",
        },
        variant: {
            variantId: "9f70b1d5-f9a2-4eff-af46-b19c3a68af5e",
            variantName: "Timberland-6-Black-Nubuck:11",
            variantValue: "11",
        },
        currencyCode: "USD",
        listingId: "h9c5e3f5-0762-4a9d-aebb-e74a2cdca53d",
        status: "PENDING",
        inventoryType: "STANDARD",
        createdAt: "2025-04-14T10:15:30.251Z",
        updatedAt: "2025-04-14T10:15:35.225Z",
        authenticationDetails: null,
        batch: {
            batchId: "52591f34-524e-42b1-a571-133ad0f6574e",
            taskId: "c34445fb-9730-4ce1-b7b6-20439351cc50",
        },
        initiatedShipments: null,
    },
];

// Mock GOAT listing data
const mockGoatListings = [
    {
        amount: "140",
        order: null,
        product: {
            productId: "air-jordan-13-retro-wheat-2023-414571-171",
            productName: "Air Jordan 13 Retro Wheat (2023)",
            styleId: "414571-171",
        },
        variant: {
            variantId: "size-9-us-men",
            variantName: "US 9 Men",
            variantValue: "9",
        },
        currencyCode: "USD",
        listingId: "019553af-bc11-7893-9b5b-591785703a49",
        status: "ACTIVE",
        inventoryType: "STANDARD",
        createdAt: "2025-03-01T21:49:40.323Z",
        updatedAt: "2025-04-05T02:29:48.904Z",
    },
    {
        amount: "150",
        order: null,
        product: {
            productId: "air-jordan-13-retro-wheat-2023-414571-171",
            productName: "Air Jordan 13 Retro Wheat (2023)",
            styleId: "414571-171",
        },
        variant: {
            variantId: "size-10-us-men",
            variantName: "US 10 Men",
            variantValue: "10",
        },
        currencyCode: "USD",
        listingId: "119553af-bc11-7893-9b5b-591785703b50",
        status: "ACTIVE",
        inventoryType: "STANDARD",
        createdAt: "2025-03-05T10:23:15.323Z",
        updatedAt: "2025-04-07T08:15:22.904Z",
    },
    {
        amount: "155",
        order: {
            id: "ord-123456",
            status: "SHIPPED",
            created_at: "2025-03-12T14:35:22.323Z",
            updated_at: "2025-03-15T09:12:48.904Z",
            tracking: {
                carrier: "FedEx",
                tracking_number: "FDX123456789",
                tracking_url:
                    "https://www.fedex.com/track?tracknum=FDX123456789",
            },
            payout: {
                amount_cents: 13500,
                currency: "USD",
            },
        },
        product: {
            productId: "air-jordan-13-retro-wheat-2023-414571-171",
            productName: "Air Jordan 13 Retro Wheat (2023)",
            styleId: "414571-171",
        },
        variant: {
            variantId: "size-11-us-men",
            variantName: "US 11 Men",
            variantValue: "11",
        },
        currencyCode: "USD",
        listingId: "219553af-bc11-7893-9b5b-591785703b51",
        status: "SOLD",
        inventoryType: "STANDARD",
        createdAt: "2025-03-10T16:45:30.323Z",
        updatedAt: "2025-03-15T09:12:48.904Z",
    },
];

// Query keys for React Query
export const listingsKeys = {
    all: ["listings"],
    stockx: () => [...listingsKeys.all, "stockx"],
    stockxByVariant: (variantId) => [...listingsKeys.stockx(), variantId],
    goat: () => [...listingsKeys.all, "goat"],
    goatBySize: (size) => [...listingsKeys.goat(), size],
};

/**
 * Hook to fetch StockX listings for a variant
 */
export const useStockXListings = (variantId) => {
    return useQuery({
        queryKey: listingsKeys.stockxByVariant(variantId || ""),
        queryFn: async () => {
            if (!variantId) return [];

            // In a real app, we would fetch data from an API
            const response = await apiClient.get(
                "/api/stockx/listings",
                mockStockXListings
            );
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
        queryKey: listingsKeys.goatBySize(size || ""),
        queryFn: async () => {
            if (!size) return [];

            const response = await apiClient.get(
                "/api/goat/listings",
                mockGoatListings
            );
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
                platform === "stockx"
                    ? mockStockXListings[0]
                    : mockGoatListings[0]
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
            if (platform === "stockx") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.stockx(),
                });
            } else {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.goat(),
                });
            }
        },
    });
};
