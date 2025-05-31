"use client";

import { useQuery } from "@tanstack/react-query";

// Query keys for React Query
export const marketDataKeys = {
    all: ["marketData"],
    stockx: () => [...marketDataKeys.all, "stockx"],
    stockxByVariant: (productId, variantId) => [
        ...marketDataKeys.stockx(),
        "variant",
        productId,
        variantId,
    ],
    goat: () => [...marketDataKeys.all, "goat"],
    goatByVariant: (catalogId, size) => [
        ...marketDataKeys.goat(),
        "variant",
        catalogId,
        size,
    ],
};

/**
 * Hook to fetch StockX market data for a variant
 */
export function useStockXMarketData(productId, variantId, token) {
    const queryKey = marketDataKeys.stockxByVariant(productId, variantId);

    return useQuery({
        queryKey,
        queryFn: async () => {
            if (!productId || !variantId || !token) return null;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/stockx/market/${productId}/${variantId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch StockX market data");
            }

            const data = await response.json();
            return data?.data?.marketData || null;
        },
        enabled: !!productId && !!variantId && !!token,
        staleTime: 1000 * 60 * 60, // 1 hour
    });
}

/**
 * Hook to fetch GOAT market data for a variant
 */
export function useGoatMarketData(catalogId, size, token) {
    const queryKey = marketDataKeys.goatByVariant(catalogId, size);

    return useQuery({
        queryKey,
        queryFn: async () => {
            if (!catalogId || !size || !token) return null;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/goat/market/${catalogId}/?size=${size}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch GOAT market data");
            }

            const data = await response.json();
            return data?.data?.data?.variants[0] || null;
        },
        enabled: !!catalogId && !!size && !!token,
        staleTime: 1000 * 60 * 60, // 1 hour
    });
}
