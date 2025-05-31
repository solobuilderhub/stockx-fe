"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query keys for React Query
export const listingsKeys = {
    all: ["listings"],
    stockx: () => [...listingsKeys.all, "stockx"],
    stockxByVariant: (variantId) => [
        ...listingsKeys.stockx(),
        "variant",
        variantId,
    ],
    goat: () => [...listingsKeys.all, "goat"],
    goatBySize: (size, styleId) => [
        ...listingsKeys.goat(),
        "variant",
        size,
        styleId,
    ],
};

/**
 * Hook to fetch StockX listings for a variant
 */
export const useStockXListings = (variantId, token) => {
    return useQuery({
        queryKey: listingsKeys.stockxByVariant(variantId || ""),
        queryFn: async () => {
            if (!variantId || !token) return [];

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/stockx/listings?variantIds=${variantId}&fromDate=2025-01-01`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch StockX listings");
            }

            const data = await response.json();
            return data?.data?.listings || [];
        },
        enabled: !!variantId && !!token,
    });
};

/**
 * Hook to fetch GOAT listings by size and styleId
 */
export const useGoatListings = (size, styleId, token) => {
    return useQuery({
        queryKey: listingsKeys.goatBySize(size || "", styleId || ""),
        queryFn: async () => {
            if (!size || !styleId || !token) return [];

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/goat/listings?searchTerm=${styleId}&size=${size}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch GOAT listings");
            }

            const data = await response.json();
            return data?.data?.listings || [];
        },
        enabled: !!size && !!styleId && !!token,
    });
};

/**
 * Hook to create a new listing with optimistic updates
 */
export const useCreateListing = (platform) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingData) => {
            // TODO: Replace with real API call
            return { success: true };
        },
        onMutate: async (newListing) => {
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
