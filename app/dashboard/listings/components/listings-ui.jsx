// app/profile/my-orders/components/orders-ui.jsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/custom/ui/data-table";
import { columns } from "./columns";
import { useListings } from "../hooks/useListings";
import HeaderSection from "@/components/custom/dashboard/header-section";
import { Tag, Filter, Search, Plus } from "lucide-react";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { OrderDetailsSheet } from "./order-details-sheet";
import { ListingTabs } from "./ListingTabs";

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
    router.push(`/dashboard/listings?${params.toString()}`, { scroll: false });
  };

  const handleStatusFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.set("page", "1");
    router.push(`/dashboard/listings?${params.toString()}`, { scroll: false });
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
                <SelectItem value="positive">Positive Spread</SelectItem>
                <SelectItem value="negative">Negative Spread</SelectItem>
                <SelectItem value="zero">Zero Spread</SelectItem>
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
            
            <Button className="gap-1.5 bg-green-600 hover:bg-green-700">
              <Plus size={16} />
              List Items
            </Button>
          </div>
        </div>

        <ListingTabs activeTab={viewMode} onChange={setViewMode} />

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
      </div>

      {/* Listing Details Sheet */}
      <OrderDetailsSheet 
        order={selectedListing}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}