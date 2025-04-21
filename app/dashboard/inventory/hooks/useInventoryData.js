"use client";

import { useQuery } from "@tanstack/react-query";

// Query function for fetching inventory data
const fetchInventory = async ({ page, limit, searchQuery, filters, token }) => {
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
        // Convert filters to API format if needed
        // This will depend on your specific filtering implementation
    }

    // Fetch data from API
    const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
    }/stockx/get-inventory-table-items?${queryParams.toString()}`;

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        // Use Next.js cache options
        cache: "no-store", // Don't cache data - always fetch fresh data
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.success) {
        throw new Error(
            responseData.message || "Failed to fetch inventory data"
        );
    }

    return responseData;
};

export function useInventoryData({
    page = 1,
    limit = 20,
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
        enabled: !!token, // Only run the query if we have a token
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    });

    // Map API response to match table format
    const mappedData =
        queryData?.data?.map((item) => ({
            id: item.id,
            image: item.image || "https://via.placeholder.com/150",
            name: item["product-name"] || "No Name",
            stockxSku: item["stockx-sku"] || "",
            goatSku: item["goat-sku"] || "",
            size: item.size || "N/A",
            quantity: item.quantity || 0,
            dateAdded: new Date(
                item["inventory-added-date"]
            ).toLocaleDateString("en-GB"), // dd/mm/yyyy
            warehouseLocation: item["location-1"] || "N/A",
            cost: "$0.00", // Default cost as specified
            retailPrice: item["retail-price"]
                ? `$${item["retail-price"].toFixed(2)}`
                : "$0.00",
        })) || [];

    // Extract pagination data
    const pagination = queryData?.pagination
        ? {
              totalDocs: queryData.pagination.totalItems,
              limit: queryData.pagination.itemsPerPage,
              currentPage: queryData.pagination.currentPage,
              totalPages: queryData.pagination.totalPages,
              hasNextPage: queryData.pagination.hasNextPage,
              hasPrevPage: queryData.pagination.hasPrevPage,
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
        inventory: mappedData,
        pagination,
        isLoading,
        error: error?.message,
    };
}
