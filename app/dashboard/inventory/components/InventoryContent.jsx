"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterModal } from "./FilterModal";
import { InventoryTable } from "./InventoryTable";
// import { MasterInventoryUpload } from "./MasterInventoryUpload";

export function InventoryContent({
    token,
    initialPage = 1,
    handleViewDetails,
    handlePageChange,
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState(null);
    const [currentPage, setCurrentPage] = useState(initialPage);

    // Debounce search query with 300ms delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const handleApplyFilters = (filters) => {
        setAppliedFilters(filters);
    };

    const handleLocalPageChange = (page) => {
        setCurrentPage(page);
        if (handlePageChange) {
            handlePageChange(page);
        }
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* <MasterInventoryUpload /> */}

                <div className="bg-card rounded-xl p-6 shadow-sm">
                    <div className="lg:flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold mb-6 lg:mb-0">
                            Standard Listings
                        </h2>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                                onClick={() => setIsFilterOpen(true)}
                            >
                                <Filter size={16} />
                                Filter
                            </Button>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search by name or sku"
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <InventoryTable
                        searchQuery={debouncedSearchQuery}
                        filters={appliedFilters}
                        currentPage={currentPage}
                        onPageChange={handleLocalPageChange}
                        handleViewDetails={handleViewDetails}
                        token={token}
                    />
                </div>
            </div>

            <FilterModal
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
}
