"use client";

import { DataTable } from "@/components/custom/ui/data-table";
import { useInventoryData } from "../hooks/useInventoryData";
import { inventoryColumns } from "./inventory-columns";

export function InventoryTable({
    searchQuery,
    filters,
    currentPage = 1,
    itemsPerPage = 50,
    onPageChange,
    handleViewDetails,
    token,
}) {
    const { inventory, pagination, isLoading, error } = useInventoryData({
        page: currentPage,
        limit: itemsPerPage,
        searchQuery,
        filters,
        token,
    });

    const handlePageChangeInternal = (page) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

    if (error) {
        return (
            <div className="text-destructive p-4 text-center">
                Error loading inventory data: {error}
            </div>
        );
    }

    return (
        <DataTable
            columns={inventoryColumns()}
            data={inventory || []}
            isLoading={isLoading}
            pagination={{
                totalDocs: pagination?.totalDocs || 0,
                limit: pagination?.limit || itemsPerPage,
                currentPage: pagination?.currentPage || 1,
                totalPages: pagination?.totalPages || 1,
                hasNextPage: pagination?.hasNextPage || false,
                hasPrevPage: pagination?.hasPrevPage || false,
                onPageChange: handlePageChangeInternal,
            }}
        />
    );
}
