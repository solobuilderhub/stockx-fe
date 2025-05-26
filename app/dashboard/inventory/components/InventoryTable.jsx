"use client";

import { DataTable } from "@/components/custom/ui/data-table";
import { AlertCircle, RefreshCw } from "lucide-react";
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
    const { inventory, pagination, isLoading, error, usingDummyData } =
        useInventoryData({
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <RefreshCw className="mr-2 h-6 w-6 animate-spin" />
                <span>Loading inventory data...</span>
            </div>
        );
    }

    return (
        <div>
            {usingDummyData && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-2 text-amber-700">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <p className="text-sm">
                        Unable to connect to the server. Displaying sample
                        inventory data.
                    </p>
                </div>
            )}

            {error && !usingDummyData && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <p className="text-sm">
                        Error loading inventory data: {error}
                    </p>
                </div>
            )}

            {(!inventory || inventory.length === 0) && !isLoading && !error ? (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">
                        No inventory items found
                    </p>
                </div>
            ) : (
                <DataTable
                    columns={inventoryColumns(handleViewDetails)}
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
            )}
        </div>
    );
}
