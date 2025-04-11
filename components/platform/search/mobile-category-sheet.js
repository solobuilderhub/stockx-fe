"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRightIcon, 
  ArrowLeftIcon,
  HomeIcon
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";

export const MobileCategorySheet = ({ 
  isOpen, 
  onOpenChange, 
  categories, 
  currentCategory 
}) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Function to get URL slug for a category
  const getCategorySlug = (category) => {
    return `/categories/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const navigateTo = (category, parentItems = null) => {
    setActiveCategory(category);
    
    if (parentItems === null) {
      // Top level category
      setBreadcrumbs([category]);
    } else {
      // Subcategory
      setBreadcrumbs([...breadcrumbs, category]);
    }
  };

  const navigateBack = () => {
    if (breadcrumbs.length > 1) {
      const newBreadcrumbs = [...breadcrumbs];
      newBreadcrumbs.pop();
      setBreadcrumbs(newBreadcrumbs);
      setActiveCategory(newBreadcrumbs[newBreadcrumbs.length - 1]);
    } else {
      setBreadcrumbs([]);
      setActiveCategory(null);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state when sheet closes
    setTimeout(() => {
      setBreadcrumbs([]);
      setActiveCategory(null);
    }, 300);
  };

  const renderCategories = () => {
    if (breadcrumbs.length === 0) {
      // Top level categories
      return (
        <div className="space-y-1 p-2">
          <Link
            href="/products"
            className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md w-full text-left
              ${!currentCategory ? 'bg-retro-primary text-retro-primary-foreground' : 'hover:bg-retro-primary/10'}`}
            onClick={handleClose}
          >
            <HomeIcon size={16} />
            All Products
          </Link>
          
          {categories.map((category) => (
            <div key={category._id} className="w-full">
              {category.items && category.items.length > 0 ? (
                <button
                  onClick={() => navigateTo(category)}
                  className="flex justify-between items-center px-3 py-3 text-sm font-medium rounded-md hover:bg-retro-primary/10 w-full text-left"
                >
                  {category.name}
                  <ChevronRightIcon size={16} />
                </button>
              ) : (
                <Link
                  href={getCategorySlug(category)}
                  className={`block px-3 py-3 text-sm font-medium rounded-md w-full text-left hover:bg-retro-primary/10
                    ${currentCategory === category._id ? 'bg-retro-primary/20' : ''}`}
                  onClick={handleClose}
                >
                  {category.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      // Subcategories
      const currentActiveCategory = breadcrumbs[breadcrumbs.length - 1];
      
      return (
        <div className="space-y-1 p-2">
          <button
            onClick={navigateBack}
            className="flex items-center px-3 py-3 text-sm font-medium rounded-md hover:bg-retro-primary/10 w-full text-left mb-2 -ml-1"
          >
            <ArrowLeftIcon size={16} className="mr-2" />
            Back
          </button>
          
          <Link
            href={getCategorySlug(currentActiveCategory)}
            className="block px-3 py-3 text-sm font-medium rounded-md bg-retro-primary/10 w-full text-left mb-2"
            onClick={handleClose}
          >
            All {currentActiveCategory.name}
          </Link>
          
          {currentActiveCategory.items && currentActiveCategory.items.map((subCategory) => (
            <div key={subCategory._id} className="w-full">
              {subCategory.items && subCategory.items.length > 0 ? (
                <button
                  onClick={() => navigateTo(subCategory, currentActiveCategory.items)}
                  className="flex justify-between items-center px-3 py-3 text-sm font-medium rounded-md hover:bg-retro-primary/10 w-full text-left"
                >
                  {subCategory.name}
                  <ChevronRightIcon size={16} />
                </button>
              ) : (
                <Link
                  href={getCategorySlug(subCategory)}
                  className="block px-3 py-3 text-sm font-medium rounded-md hover:bg-retro-primary/10 w-full text-left"
                  onClick={handleClose}
                >
                  {subCategory.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[85%] max-w-sm p-0">
        <SheetHeader className="p-4 border-b border-retro-border">
          <SheetTitle className="text-left retro-heading">
            {breadcrumbs.length > 0 
              ? breadcrumbs[breadcrumbs.length - 1].name 
              : "Categories"}
          </SheetTitle>
          {breadcrumbs.length > 0 && (
            <SheetDescription className="text-left text-xs truncate">
              {breadcrumbs.map((item, index) => (
                <span key={item._id}>
                  {index > 0 && " > "}
                  {item.name}
                </span>
              ))}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-5rem)] pb-8">
          {renderCategories()}
        </div>
      </SheetContent>
    </Sheet>
  );
};