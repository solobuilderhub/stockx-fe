// app/profile/my-orders/components/orders-ui.jsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/custom/ui/data-table";
import { columns } from "./columns";
import { useSellerOrders } from "@/hooks/query/use-orders";
import HeaderSection from "@/components/custom/dashboard/header-section";
import { Package } from "lucide-react";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderDetailsSheet } from "./order-details-sheet";

export function OrdersUI({ token, initialPage = 1, initialStatus = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get("page")) || initialPage;
  const status = searchParams.get("status") || initialStatus;

  // State for order details sheet
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { orders, pagination, isLoading, error } = useSellerOrders({
    token,
    params: {
      page: currentPage,
      limit: 10,
      status: status === "all" ? "" : status,
    },
  });

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/profile/my-orders?${params.toString()}`, { scroll: false });
  };

  const handleStatusFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.set("page", "1");
    router.push(`/profile/my-orders?${params.toString()}`, { scroll: false });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <HeaderSection 
        icon={Package} 
        title="My Orders" 
        description="View and manage your order history"
      />

      <div className="flex justify-end mb-4">
        <Select defaultValue={status || "all"} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ErrorBoundaryWrapper>
        <DataTable
          columns={columns(token, handleViewDetails)}
          data={orders || []}
          isLoading={isLoading}
          pagination={{
            totalDocs: pagination?.totalDocs || 0,
            limit: pagination?.limit || 10,
            currentPage: pagination?.currentPage || 1,
            totalPages: pagination?.totalPages || 1,
            hasNextPage: pagination?.hasNextPage || false,
            hasPrevPage: pagination?.hasPrevPage || false,
            onPageChange: handlePageChange,
          }}
        />
      </ErrorBoundaryWrapper>

      {/* Order Details Sheet */}
      <OrderDetailsSheet 
        order={selectedOrder}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}