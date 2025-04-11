"use client";

import { MapPin, ChevronDown } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LocationSelector = ({ className }) => {
  const { selectedLocation, openLocationModal } = useLocation();

  // Display location text with loading state handling
  const getDisplayLocation = () => {
    if (!selectedLocation) return "Select location";
    
    // If we have a selected location with a name, use it
    if (selectedLocation.name) return selectedLocation.name;
    
    // Fall back to display name from coordinates
    if (selectedLocation.coordinates) {
      return "Selected location";
    }
    
    return "Select location";
  };

  const handleLocationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLocationModal();
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center h-10 gap-1 rounded-full hover:bg-gray-100 transition-colors", 
        className
      )}
      onClick={handleLocationClick}
    >
      <span className="font-semibold text-black text-sm mr-1">Deliver to</span>
      <MapPin className="h-4 w-4 text-primary" />
      <span className="truncate max-w-32 text-sm font-medium">
        {getDisplayLocation()}
      </span>
      <ChevronDown className="h-3 w-3 text-gray-500" />
    </Button>
  );
};

export default LocationSelector; 