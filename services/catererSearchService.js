import { mockCaterers } from '@/data/mockData';
import { DEFAULT_MAP_SETTINGS } from "@/constants/map-config";


    // export interface SearchParams {
    //   query?: string;
    //   cuisine?: string;
    //   deliveryOnly?: boolean;
    //   location?: LatLngTuple;
    //   radius?: number;
    // }

// Helper function to calculate distance between two coordinates
function calculateDistance(point1, point2) {
  const R = 6371; // Earth's radius in km
  const dLat = (point2[0] - point1[0]) * Math.PI / 180;
  const dLng = (point2[1] - point1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1[0] * Math.PI / 180) * Math.cos(point2[0] * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const searchCaterers = (params) => {
  let results = [...mockCaterers] 
  
  // Filter by search query
  if (params.query && params.query.trim() !== '') {
    const query = params.query.toLowerCase();
    results = results.filter(caterer => {
      return caterer.name.toLowerCase().includes(query) || 
             caterer.description.toLowerCase().includes(query) ||
             caterer.cuisine.some(cuisine => cuisine.toLowerCase().includes(query));
    });
  }
  
  // Filter by cuisine
  if (params.cuisine && params.cuisine.trim() !== '') {
    const cuisine = params.cuisine.toLowerCase();
    results = results.filter(caterer => {
      return caterer.cuisine.some(type => type.toLowerCase() === cuisine);
    });
  }
  
  // Filter by location and radius
  if (params.location && params.radius) {
    results = results.filter(caterer => {
      if (!caterer.location) return false;
      
      // Parse location string into coordinates or use mock coordinates
      const catererCoords = [
        // Default to some coordinates if we can't parse the location
        37.7749, -122.4194 // Default San Francisco coordinates
      ];
      
      const distance = calculateDistance(
        params.location,
        catererCoords
      );
      
      // Store distance for sorting
      caterer.distance = distance;
      
      return distance <= (params.radius || DEFAULT_MAP_SETTINGS.deliveryRadius);
    });
    
    // Sort by distance
    results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }
  
  // Filter for delivery only
  if (params.deliveryOnly) {
    results = results.filter(caterer => caterer.canDeliver !== false); // Default to true if not specified
  }
  
  return results;
};
