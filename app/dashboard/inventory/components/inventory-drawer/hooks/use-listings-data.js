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
export const useCreateListing = (platform, token) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingData) => {
            if (!token) {
                throw new Error("Authentication token is required");
            }

            let apiUrl, requestBody;

            if (platform === "stockx") {
                apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/stockx/listings/`;
                requestBody = {
                    amount: listingData.amount,
                    variantId: listingData.variantId,
                    currencyCode: listingData.currencyCode,
                    active: listingData.active,
                };
            } else if (platform === "goat") {
                apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/goat/listings/`;
                requestBody = {
                    catalogId: listingData.catalogId,
                    priceCents: listingData.priceCents,
                    condition: listingData.condition,
                    packagingCondition: listingData.packagingCondition,
                    size: listingData.size,
                    sizeUnit: listingData.sizeUnit,
                    activate: listingData.activate,
                };
            } else {
                throw new Error(`Unsupported platform: ${platform}`);
            }

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message || `Failed to create ${platform} listing`
                );
            }

            const data = await response.json();

            // Check if the response indicates success
            if (data.status !== "success") {
                // Extract error message from the response or use a default message
                const errorMessage =
                    data.message ||
                    data.error ||
                    data.data?.error ||
                    `Failed to create ${platform} listing: Operation was not successful`;
                throw new Error(errorMessage);
            }

            // Additional check for data.success if it exists
            if (data.data && data.data.success === false) {
                const errorMessage =
                    data.data.error ||
                    data.data.message ||
                    `Failed to create ${platform} listing: Operation failed`;
                throw new Error(errorMessage);
            }

            return data;
        },
        onMutate: async (newListing) => {
            return { previousListing: null };
        },
        onSuccess: (data, variables, context) => {
            // Invalidate and refetch relevant queries on success
            if (platform === "stockx") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.stockx(),
                });
            } else if (platform === "goat") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.goat(),
                });
            }
        },
        onError: (error, variables, context) => {
            console.error(`Failed to create ${platform} listing:`, error);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch after error or success to ensure cache is up to date
            if (platform === "stockx") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.stockx(),
                });
            } else if (platform === "goat") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.goat(),
                });
            }
        },
    });
};

/**
 * Hook to update an existing listing
 */
export const useUpdateListing = (platform, token) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingData) => {
            if (!token) {
                throw new Error("Authentication token is required");
            }

            if (!listingData.id && !listingData.listingId) {
                throw new Error("Listing ID is required for updates");
            }

            const listingId = listingData.id || listingData.listingId;
            let apiUrl, requestBody;

            if (platform === "stockx") {
                apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/stockx/listings/${listingId}`;
                requestBody = {
                    amount: listingData.amount,
                    currencyCode: listingData.currencyCode,
                };
            } else if (platform === "goat") {
                apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/goat/listings/${listingId}`;
                requestBody = {
                    price_cents: listingData.priceCents,
                    size: listingData.size,
                    size_unit: listingData.sizeUnit,
                };
            } else {
                throw new Error(`Unsupported platform: ${platform}`);
            }

            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message || `Failed to update ${platform} listing`
                );
            }

            const data = await response.json();

            // Check if the response indicates success
            if (data.status !== "success") {
                // Extract error message from the response or use a default message
                const errorMessage =
                    data.message ||
                    data.error ||
                    data.data?.error ||
                    `Failed to update ${platform} listing: Operation was not successful`;
                throw new Error(errorMessage);
            }

            // Additional check for data.success if it exists
            if (data.data && data.data.success === false) {
                const errorMessage =
                    data.data.error ||
                    data.data.message ||
                    `Failed to update ${platform} listing: Operation failed`;
                throw new Error(errorMessage);
            }

            return data;
        },
        onMutate: async (updatedListing) => {
            return { previousListing: null };
        },
        onSuccess: (data, variables, context) => {
            // Invalidate and refetch relevant queries on success
            if (platform === "stockx") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.stockx(),
                });
            } else if (platform === "goat") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.goat(),
                });
            }
        },
        onError: (error, variables, context) => {
            console.error(`Failed to update ${platform} listing:`, error);
        },
        onSettled: (data, error, variables, context) => {
            // Always refetch after error or success to ensure cache is up to date
            if (platform === "stockx") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.stockx(),
                });
            } else if (platform === "goat") {
                queryClient.invalidateQueries({
                    queryKey: listingsKeys.goat(),
                });
            }
        },
    });
};
