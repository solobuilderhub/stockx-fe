"use client";

import { use, useState, useRef, useEffect } from "react";
import { CategoriesContext } from "@/components/providers/contexts/categories-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon, MenuIcon, SearchIcon, SparklesIcon } from "lucide-react";
import { CategoryList } from "./category-list";
import { MobileCategorySheet } from "./mobile-category-sheet";
import { PromotedProducts } from "./promoted-products";
import { useIsMobile } from "@/hooks/use-mobile";

const promotedProducts = [
  { id: 1, name: "Digital Planner", slug: "digital-planner" },
  { id: 2, name: "Creator Bundle", slug: "creator-bundle" },
  { id: 3, name: "UI Kit Pro", slug: "ui-kit-pro" },
];

export const SearchSection = ({
  defaultValue = "",
  onSearch = () => {},
  currentCategory = null,
  onCategoryChange = () => {},
}) => {
  const { categories } = use(CategoriesContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const searchRef = useRef(null);
  const isMobile = useIsMobile();

  console.log("currentCategory", currentCategory);

  console.log("categories", categories);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    onSearch(searchValue);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Search Bar with Mobile Toggle */}
      <div className="flex gap-3 items-center w-full">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="retro-button-icon"
            onClick={() => setIsSheetOpen(true)}
            aria-label="Categories menu"
          >
            <FilterIcon size={20} />
          </Button>
        )}

        <div className="w-full relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative flex items-center">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
                <SearchIcon size={14} />
              </div>

              <Input
                name="search"
                type="text"
                defaultValue={defaultValue}
                placeholder="Search products..."
                className="w-full pl-14 pr-24 h-11 retro-input"
                aria-label="Search products"
                onFocus={() => setShowSuggestions(true)}
                style={{ paddingLeft: "3.5rem" }} 
              />

              <Button
                type="submit"
                className="absolute right-1.5 h-8 min-w-16 font-medium text-sm bg-retro-primary text-retro-primary-foreground border-retro-primary hover:bg-retro-primary/90"
                aria-label="Search"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Simplified dropdown with proper positioning */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 w-full bg-background rounded-md border-2 border-retro-border shadow-md p-3 animate-scale-in">
              <PromotedProducts
                products={promotedProducts}
                onSelect={() => setShowSuggestions(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Categories - Desktop */}
      {!isMobile && (
        <CategoryList
          categories={categories}
          currentCategory={currentCategory}
          onCategoryChange={onCategoryChange}
        />
      )}

      {/* Mobile Category Sheet - Only render when mobile and isSheetOpen is true */}
      {isMobile && (
        <MobileCategorySheet
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          categories={categories}
          currentCategory={currentCategory}
        />
      )}
    </div>
  );
};