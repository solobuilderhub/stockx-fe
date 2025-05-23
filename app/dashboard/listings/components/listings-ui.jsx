// app/profile/my-orders/components/orders-ui.jsx
"use client";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import { DataTable } from "@/components/custom/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useListings } from "../hooks/useListings";
import { ListingTabs } from "./ListingTabs";
import { columns } from "./columns";
import { BulkListingModal } from "./listing-modal/bulk-listing-modal";
import { RelistModal } from "./listing-modal/relist-modal";
import { OrderDetailsSheet } from "./order-details-sheet";

export function ListingsUI({ token, initialPage = 1, initialStatus = "" }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || initialPage;
    const status = searchParams.get("status") || initialStatus;

    // State for listing details sheet
    const [selectedListing, setSelectedListing] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("simple");

    // State for relist modal
    const [isRelistModalOpen, setIsRelistModalOpen] = useState(false);
    const [selectedRelistItem, setSelectedRelistItem] = useState(null);

    // State for bulk listing modal
    const [isBulkListingModalOpen, setIsBulkListingModalOpen] = useState(false);

    // Advanced filters
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sortBy, setSortBy] = useState("newest");
    const [filterSpread, setFilterSpread] = useState("all");

    const { orders, pagination, isLoading, error } = useListings({
        token,
        params: {
            page: currentPage,
            limit: 10,
            status: status === "all" ? "" : status,
            search: searchQuery,
            sortBy: sortBy,
            spreadFilter: filterSpread === "all" ? "" : filterSpread,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
        },
    });

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`/dashboard/listings?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleStatusFilter = (value) => {
        const params = new URLSearchParams(searchParams);
        if (value === "all") {
            params.delete("status");
        } else {
            params.set("status", value);
        }
        params.set("page", "1");
        router.push(`/dashboard/listings?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // Debounce could be implemented here for better performance
    };

    const handleSpreadFilter = (value) => {
        setFilterSpread(value);
    };

    const handleViewDetails = (listing) => {
        setSelectedListing(listing);
        setIsSheetOpen(true);
    };

    const handleRelistClick = (listing) => {
        setSelectedRelistItem(listing);
        setIsRelistModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">All Listings</h2>
                    <div className="flex items-center gap-3">
                        <Select
                            value={filterSpread}
                            onValueChange={handleSpreadFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by spread" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Spreads</SelectItem>
                                <SelectItem value="positive">
                                    Positive Spread
                                </SelectItem>
                                <SelectItem value="negative">
                                    Negative Spread
                                </SelectItem>
                                <SelectItem value="zero">
                                    Zero Spread
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={status || "all"}
                            onValueChange={handleStatusFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search listings by name or style ID"
                                className="pl-9"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>

                        <Button
                            className="gap-1.5 bg-green-600 hover:bg-green-700"
                            onClick={() => setIsBulkListingModalOpen(true)}
                        >
                            <Plus size={16} />
                            Bulk List Items
                        </Button>
                    </div>
                </div>

                <ListingTabs activeTab={viewMode} onChange={setViewMode} />

                <ErrorBoundaryWrapper>
                    <DataTable
                        className="overflow-x-auto"
                        columns={columns(
                            token,
                            handleViewDetails,
                            handleRelistClick
                        )}
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
            </div>

            {/* Listing Details Sheet */}
            <OrderDetailsSheet
                order={selectedListing}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />

            {/* Relist Modal */}
            <RelistModal
                isOpen={isRelistModalOpen}
                onClose={() => setIsRelistModalOpen(false)}
                product={selectedRelistItem}
            />

            {/* Bulk Listing Modal */}
            <BulkListingModal
                isOpen={isBulkListingModalOpen}
                onClose={() => setIsBulkListingModalOpen(false)}
            />
        </div>
    );
}
