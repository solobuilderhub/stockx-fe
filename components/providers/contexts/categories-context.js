// contexts/categories-context.js
"use client";

import { transformCategories } from "@/lib/helpers";
import { createContext } from "react";

export const CategoriesContext = createContext(null);



export function CategoriesProvider({ children, initialCategories }) {
  const value = {
    categories: transformCategories(initialCategories),
    rawCategories: initialCategories,
  };

  return (
    <CategoriesContext value={value}>
      {children}
    </CategoriesContext>
  );
}