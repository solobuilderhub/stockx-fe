"use client";

import { CategoriesContext } from "@/components/providers/contexts/categories-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { use } from "react";

const CategoryScroll = ({ className, onlyIcons = false }) => {

  const router = useRouter();
  const isMobile = useIsMobile();


  
  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    
    // Build search params
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (cuisine !== 'All') params.set("cuisines", cuisine._id);
    
    // Add location parameters from global state
    if (selectedLocation?.coordinates) {
      params.set("latitude", selectedLocation.coordinates[0].toString());
      params.set("longitude", selectedLocation.coordinates[1].toString());
      if (selectedLocation.radius) {
        params.set("radius", selectedLocation.radius.toString());
      }
    }
    
    router.push(`/caterers?${params.toString()}`);
  };

  return (
    <div className={cn(
      "w-full",
      isMobile ? "mt-4 mb-4" : "mb-4",
      className
    )}>
     Demo cuisines
    </div>
  );
};

export default CategoryScroll; 