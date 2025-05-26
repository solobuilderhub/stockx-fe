"use client";

import { useQuery } from "@tanstack/react-query";
import dummyInventoryData from "../components/dummy-inventory-item.json";

// Query function for fetching inventory data
const fetchInventory = async ({
    page,
    limit = 50,
    searchQuery,
    filters,
    token,
}) => {
    try {
        // If no API URL is configured or no token, throw error to use dummy data
        if (!process.env.NEXT_PUBLIC_API_URL || !token) {
            throw new Error("API configuration missing or token not available");
        }

        // Build query parameters
        const queryParams = new URLSearchParams({
            page,
            limit,
        });

        // Add search query if provided
        if (searchQuery) {
            queryParams.append("search", searchQuery);
        }

        // Add additional filters if provided
        if (filters) {
            // Add ID range filters if provided
            if (filters.idFrom) {
                queryParams.append("idFrom", filters.idFrom);
            }

            if (filters.idTo) {
                queryParams.append("idTo", filters.idTo);
            }

            // Add date range filters if provided
            if (filters.dateFrom) {
                queryParams.append("dateFrom", filters.dateFrom);
            }

            if (filters.dateTo) {
                queryParams.append("dateTo", filters.dateTo);
            }
        }

        // Fetch data from API
        const apiUrl = `${
            process.env.NEXT_PUBLIC_API_URL
        }/product?${queryParams.toString()}`;

        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // Use Next.js cache options
            cache: "no-store", // Don't cache data - always fetch fresh data
        });

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(
                responseData.message || "Failed to fetch inventory data"
            );
        }

        return {
            ...responseData,
            usingDummyData: false,
        };
    } catch (error) {
        console.error("Error fetching inventory data:", error);

        // Return dummy data in a format similar to the API response
        return {
            success: true,
            docs: dummyInventoryData,
            totalDocs: dummyInventoryData.length,
            limit: limit,
            page: page,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: page > 1,
            usingDummyData: true,
        };
    }
};

export function useInventoryData({
    page = 1,
    limit = 50,
    searchQuery = "",
    filters = null,
    token,
}) {
    const {
        data: queryData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["inventory", { page, limit, searchQuery, filters }],
        queryFn: () =>
            fetchInventory({ page, limit, searchQuery, filters, token }),
        enabled: true, // Always run query, will fall back to dummy data if needed
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
        retry: false, // Don't retry on failure - just show dummy data
    });

    // Extract pagination data from the response format
    const pagination = queryData
        ? {
              totalDocs: queryData.totalDocs || 0,
              limit: queryData.limit || limit,
              currentPage: queryData.page || page,
              totalPages: queryData.totalPages || 0,
              hasNextPage: queryData.hasNextPage || false,
              hasPrevPage: queryData.hasPrevPage || false,
          }
        : {
              totalDocs: 0,
              limit: limit,
              currentPage: page,
              totalPages: 0,
              hasNextPage: false,
              hasPrevPage: false,
          };

    return {
        inventory: queryData?.docs || [],
        pagination,
        isLoading,
        error: error?.message,
        usingDummyData: queryData?.usingDummyData || false,
    };
}
