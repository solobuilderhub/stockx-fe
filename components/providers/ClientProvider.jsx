"use client";
import { CategoriesProvider } from "./contexts/categories-context";

export function ClientProviders({ children, categories }) {
  return (


        <CategoriesProvider initialCategories={categories || []}>
          {children}
        </CategoriesProvider>


  );
}
