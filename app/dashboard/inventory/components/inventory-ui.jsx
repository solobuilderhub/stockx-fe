"use client";
// import HeaderSection from "@/components/custom/dashboard/header-section";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { InventoryDetailSheet } from "./inventory-drawer/InventoryDetailSheet";
import { InventoryContent } from "./InventoryContent";

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

    // State for inventory detail sheet
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`/dashboard/inventory?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleViewItem = async (item) => {
        const itemDetails = await getSingleItemDetails(item._id);
        if (itemDetails.success && itemDetails.docs?.length > 0) {
            setSelectedItem({ ...item, itemDetails: itemDetails.docs });
        } else {
            setSelectedItem(item);
        }
        setIsDetailSheetOpen(true);
    };

    const getSingleItemDetails = async (id) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/inventory?product=${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                cache: "force-cache",
            }
        );
        const data = await response.json();
        return data;
    };

    const handleRefreshInventory = () => {
        setIsLoading(true);

        // Invalidate React Query cache to force a refetch
        // This would typically be done via queryClient.invalidateQueries(['inventory'])
        // But for simplicity, we'll just refresh the page
        router.refresh();

        toast.success("Refreshing inventory data", {
            description: "Fetching the latest inventory data from the server",
        });

        // Simulate refreshing data
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

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
                            Manage your product inventory
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

                <InventoryContent
                    token={token}
                    initialPage={currentPage}
                    initialLimit={initialLimit}
                    handleViewDetails={handleViewItem}
                    handlePageChange={handlePageChange}
                />
            </ErrorBoundaryWrapper>

            <InventoryDetailSheet
                open={isDetailSheetOpen}
                onOpenChange={setIsDetailSheetOpen}
                item={selectedItem}
            />
        </div>
    );
}
