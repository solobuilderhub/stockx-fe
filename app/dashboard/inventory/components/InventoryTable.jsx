"use client"

import React from 'react';
import { DataTable } from "@/components/custom/ui/data-table";
import { inventoryColumns } from './inventory-columns';
import { useInventoryData } from '../hooks/useInventoryData';

export function InventoryTable({ 
  searchQuery, 
  filters, 
  currentPage = 1, 
  onPageChange, 
  handleViewDetails,
  token
}) {
  const [itemsPerPage] = React.useState(10);

  const { inventory, pagination, isLoading, error } = useInventoryData({
    page: currentPage,
    limit: itemsPerPage,
    searchQuery,
    filters
  });

  const handlePageChangeInternal = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  if (error) {
    return <div className="text-destructive p-4 text-center">Error loading inventory data: {error}</div>;
  }

  return (
    <DataTable
      columns={inventoryColumns()}
      data={inventory || []}
      isLoading={isLoading}
      pagination={{
        totalDocs: pagination?.totalDocs || 0,
        limit: pagination?.limit || 10,
        currentPage: pagination?.currentPage || 1,
        totalPages: pagination?.totalPages || 1,
        hasNextPage: pagination?.hasNextPage || false,
        hasPrevPage: pagination?.hasPrevPage || false,
        onPageChange: handlePageChangeInternal,
      }}
    />
  );
}
