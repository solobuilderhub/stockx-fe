"use client";

import { CategoriesContext } from "@/components/providers/contexts/categories-context";
import { useLocation } from "@/contexts/LocationContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { use } from "react";

const CategoryScroll = ({ className, onlyIcons = false }) => {
  const { selectedCuisine, setSelectedCuisine, selectedLocation, searchQuery } = useLocation();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { categories } = use(CategoriesContext);
  const cuisines = [{ name: "All", icon: "🍽️" }, ...categories ];

  
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
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto  py-2">
          <div className="flex justify-between space-x-6">
            {cuisines.map((cuisine, index) => (
              <button
                key={cuisine._id || index}
                onClick={() => handleCuisineSelect(cuisine)}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-md whitespace-nowrap transition-colors",
                  onlyIcons ? "min-w-[60px]" : "",
                  selectedCuisine === cuisine
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <span className="text-2xl mb-1">{cuisine.icon}</span>
                {!onlyIcons && (
                  <span className="text-xs font-medium">{cuisine.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryScroll; 