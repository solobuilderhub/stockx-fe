// app/profile/my-orders/components/orders-ui.jsx
"use client";
// import HeaderSection from "@/components/custom/dashboard/header-section";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { InventoryContent } from "./InventoryContent";
import { OrderDetailsSheet } from "./order-details-sheet";

export function InventoryUi({
    token,
    initialPage = 1,
    initialStatus = "",
    initialLimit = 50,
}) {
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
        router.push(`/dashboard/inventory?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsSheetOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* <HeaderSection
                icon={Package}
                title="Inventory"
                description="View and manage your inventory"
            /> */}

            <ErrorBoundaryWrapper>
                <InventoryContent
                    token={token}
                    initialPage={currentPage}
                    initialLimit={initialLimit}
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
