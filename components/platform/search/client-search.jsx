"use client";

import { SearchSection } from "./search-section";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientSearch({currentCategory}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';
  
  const handleSearch = (searchValue) => {
    // Create URL with search parameter
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }
    
    // Update the URL with search parameter
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    console.log("category", category);
    router.push(`/products?categories=${category.slug}`);
  };
  
  return (
    <div className="mx-auto py-8 relative z-[40]">
      <SearchSection 
        defaultValue={query}
        onSearch={handleSearch}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}