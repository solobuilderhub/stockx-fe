// app/profile/my-orders/components/orders-ui.jsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderSection from "@/components/custom/dashboard/header-section";
import { Package } from "lucide-react";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import { OrderDetailsSheet } from "./order-details-sheet";
import { InventoryContent } from "./InventoryContent";

export function InventoryUi({ token, initialPage = 1, initialStatus = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get("page")) || initialPage;
  const status = searchParams.get("status") || initialStatus;

  // State for order details sheet
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
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

      <ErrorBoundaryWrapper>
        <InventoryContent 
          token={token}
          initialPage={currentPage}
          initialStatus={status}
          handleViewDetails={handleViewDetails}
          handlePageChange={handlePageChange}
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