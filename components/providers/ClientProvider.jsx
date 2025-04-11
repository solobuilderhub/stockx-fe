"use client";

import { LocationProvider } from "@/contexts/LocationContext";
import { MapProvider } from "../map/MapContext";
import { CategoriesProvider } from "./contexts/categories-context";

export function ClientProviders({ children, categories }) {
  return (
    <MapProvider>
      <LocationProvider>
        <CategoriesProvider initialCategories={categories || []}>
          {children}
        </CategoriesProvider>
      </LocationProvider>
    </MapProvider>
  );
}
