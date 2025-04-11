/**
 * Map configuration constants 
 * Used across map components and hooks for consistent defaults
 */

// Default location (Toronto, where our business is based)
export const DEFAULT_LOCATION = {
  latitude: 43.6532,
  longitude: -79.3832,
  name: "Toronto, ON",
  coordinates: [43.6532, -79.3832], // Format used by some components
};

// Default map settings
export const DEFAULT_MAP_SETTINGS = {
  zoom: 13,
  deliveryRadius: 20, // km
};

// Geolocation options
export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000, 
  maximumAge: 0,
};

// API settings
export const API_SETTINGS = {
  nominatimUserAgent: "HalaEatsApp/1.0",
  geocodingEndpoint: "https://nominatim.openstreetmap.org/reverse",
  searchEndpoint: "https://nominatim.openstreetmap.org/search",
  searchResultLimit: 5,
  searchDebounceMs: 300,
}; 