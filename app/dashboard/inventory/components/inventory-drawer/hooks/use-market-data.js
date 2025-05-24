"use client";

import { useQuery } from "@tanstack/react-query";

// Mock StockX market data
const mockStockXMarketData = {
    lowestAskAmount: "148.00",
    highestBidAmount: "135.00",
    lastSaleAmount: "142.00",
    lastSaleDate: "2025-04-15T12:34:56.000Z",
    averagePrice: "145.50",
    volatility: "3.5%",
    trends: {
        daily: "+2.1%",
        weekly: "-1.3%",
        monthly: "+4.2%",
    },
};

// Mock GOAT market data by size
const mockGoatMarketData = [
    {
        size: 9,
        availability: {
            lowest_listing_price_cents: "14000",
            highest_offer_price_cents: "13000",
            last_sold_listing_price_cents: "14200",
            last_sold_date: "2025-04-14T08:23:45.000Z",
        },
    },
    {
        size: 9.5,
        availability: {
            lowest_listing_price_cents: "14500",
            highest_offer_price_cents: "13500",
            last_sold_listing_price_cents: "14800",
            last_sold_date: "2025-04-13T16:12:35.000Z",
        },
    },
    {
        size: 10,
        availability: {
            lowest_listing_price_cents: "15000",
            highest_offer_price_cents: "14000",
            last_sold_listing_price_cents: "15200",
            last_sold_date: "2025-04-15T09:45:21.000Z",
        },
    },
    {
        size: 10.5,
        availability: {
            lowest_listing_price_cents: "15500",
            highest_offer_price_cents: "14500",
            last_sold_listing_price_cents: "15400",
            last_sold_date: "2025-04-12T11:32:18.000Z",
        },
    },
    {
        size: 11,
        availability: {
            lowest_listing_price_cents: "16000",
            highest_offer_price_cents: "15000",
            last_sold_listing_price_cents: "16200",
            last_sold_date: "2025-04-10T14:55:39.000Z",
        },
    },
];

// Query keys for React Query
export const marketDataKeys = {
    all: ["marketData"],
    stockx: () => [...marketDataKeys.all, "stockx"],
    stockxByVariant: (variantId) => [...marketDataKeys.stockx(), variantId],
    goat: () => [...marketDataKeys.all, "goat"],
    goatByVariant: (variantId) => [...marketDataKeys.goat(), variantId],
};

/**
 * Hook to fetch StockX market data for a variant
 */
export function useStockXMarketData(variant) {
    return useQuery({
        queryKey: ["stockx-market-data", variant?.variantId],
        queryFn: () => {
            // In a real app, you would fetch this data from an API
            // For now, return static mock data
            return mockStockXMarketData;
        },
        initialData: mockStockXMarketData,
    });
}

/**
 * Hook to fetch GOAT market data for a variant
 */
export function useGoatMarketData(variant) {
    return useQuery({
        queryKey: ["goat-market-data", variant?.size],
        queryFn: () => {
            // In a real app, you would fetch this data from an API
            // For now, return static mock data
            return mockGoatMarketData;
        },
        initialData: mockGoatMarketData,
    });
}
