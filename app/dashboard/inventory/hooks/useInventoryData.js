"use client";

import { useQuery } from "@tanstack/react-query";

// Query function for fetching inventory data
const fetchInventory = async ({
    page,
    limit = 50,
    searchQuery,
    filters,
    token,
}) => {
    // Build query parameters
    const queryParams = new URLSearchParams({
        page,
        limit,
        populate: "product", // Always populate product data
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
    }/inventor?${queryParams.toString()}`;

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
        enabled: !!token, // Only run the query if we have a token
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    });

    // Map API response to match table format
    const mappedData =
        queryData?.docs?.map((item) => {
            // Get size from stockx or goat object
            const size =
                item.stockx?.size ||
                (item.goat?.size ? `US ${item.goat.size}` : "N/A");

            return {
                id: item.id,
                image: "", // Placeholder for image
                name: item.product?.title || "No Name",
                urlKey: item.product?.urlKey || "",
                stockxSku: item.stockx?.sku || "",
                goatSku: item.goat?.sku || "",
                size: size,
                quantity: item.quantity || 0,
                dateAdded: new Date(item.inventory_added_at).toLocaleDateString(
                    "en-GB"
                ), // dd/mm/yyyy
                warehouseLocation: item.location?.[0] || "N/A",
                brandWholesale: item.product?.brand || "N/A",
                retailPrice: item.retail_price
                    ? `$${item.retail_price.toFixed(2)}`
                    : "$0.00",
            };
        }) || [];

    // Extract pagination data from the new response format
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
        inventory: mappedData,
        pagination,
        isLoading,
        error: error?.message,
    };
}
