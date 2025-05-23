"use client";
// import HeaderSection from "@/components/custom/dashboard/header-section";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import { Plus, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useInventory } from "./inventory-drawer/hooks/use-inventory-data";
import { InventoryDetailSheet } from "./inventory-drawer/InventoryDetailSheet";
import { InventoryEmptyState } from "./inventory-drawer/InventoryEmptyState";
import { InventoryTableHeader } from "./inventory-drawer/InventoryTableHeader";
import { InventoryTableRow } from "./inventory-drawer/InventoryTableRow";
import { OrderDetailsSheet } from "./order-details-sheet";

export function InventoryUi({
    token,
    initialPage = 1,
    initialStatus = "",
    initialLimit = 10,
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || initialPage;
    const status = searchParams.get("status") || initialStatus;

    // State for order details sheet
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // State for inventory detail sheet
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use our custom hook to fetch inventory data
    const { data: inventoryItems, isLoading: isLoadingInventory } =
        useInventory();

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

    const handleViewItem = (item) => {
        setSelectedItem(item);
        setIsDetailSheetOpen(true);
    };

    const handleRefreshInventory = () => {
        setIsLoading(true);

        // Simulate refreshing data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    if (isLoadingInventory) {
        return (
            <div className="flex justify-center items-center h-64">
                <RefreshCw className="mr-2 h-6 w-6 animate-spin" />
                <span>Loading inventory...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* <HeaderSection
                icon={Package}
                title="Inventory"
                description="View and manage your inventory"
            /> */}

            <ErrorBoundaryWrapper>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Inventory</h2>
                        <p className="text-muted-foreground">
                            {inventoryItems.length} items in your inventory
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefreshInventory}
                            disabled={isLoading}
                        >
                            <RefreshCw
                                className={`mr-2 h-4 w-4 ${
                                    isLoading ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </Button>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                        </Button>
                    </div>
                </div>

                {inventoryItems && inventoryItems.length > 0 ? (
                    <div className="border rounded-md">
                        <Table>
                            <InventoryTableHeader />
                            <TableBody>
                                {inventoryItems.map((item) => (
                                    <InventoryTableRow
                                        key={item.id}
                                        item={item}
                                        onViewItem={handleViewItem}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <InventoryEmptyState />
                )}
            </ErrorBoundaryWrapper>

            {/* Order Details Sheet */}
            <OrderDetailsSheet
                order={selectedOrder}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />
            <InventoryDetailSheet
                open={isDetailSheetOpen}
                onOpenChange={setIsDetailSheetOpen}
                item={selectedItem}
            />
        </div>
    );
}
