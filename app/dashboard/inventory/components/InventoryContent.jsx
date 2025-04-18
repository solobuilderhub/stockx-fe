"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from 'lucide-react';
import { InventoryTable } from './InventoryTable';
import { MasterInventoryUpload } from './MasterInventoryUpload';
import { FilterModal } from './FilterModal';

export function InventoryContent({ 
  token, 
  initialPage = 1, 
  handleViewDetails,
  handlePageChange
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

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
  
        <MasterInventoryUpload />
        
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Standard Listings</h2>
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
                  placeholder="Search listings by name or style ID" 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <InventoryTable 
            searchQuery={searchQuery} 
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
