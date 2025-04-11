"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const CategoryList = ({ categories, currentCategory, onCategoryChange }) => {
  const [showMore, setShowMore] = useState(false);
  const visibleCount = 6; // Number of categories to show before "More"


  const renderCategoryDropdown = (category) => {
    if (!category.items || category.items.length === 0) {
      return (
        <div 
          onClick={() => onCategoryChange(category)}
          className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-full transition-all 
            ${currentCategory === category._id ? 'bg-retro-primary text-retro-primary-foreground' : 'hover:bg-retro-primary/10'}`}
        >
          {category.name}
        </div>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-full transition-all 
              ${currentCategory === category._id ? 'bg-retro-primary text-retro-primary-foreground' : 'hover:bg-retro-primary/10'}`}
          >
            {category.name}
            <ChevronDownIcon size={16} className="ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 p-2 retro-card retro-card-primary animate-scale-in"
        >
          <DropdownMenuItem asChild>
            <div 
              onClick={() => onCategoryChange(category)}
              className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-primary/10 w-full cursor-pointer"
            >
              All {category.name}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 border-retro-border" />
          <DropdownMenuGroup>
            {category.items.map((subCategory) => {
              if (!subCategory.items || subCategory.items.length === 0) {
                return (
                  <DropdownMenuItem key={subCategory._id} asChild>
                    <div 
                      onClick={() => onCategoryChange(subCategory)}
                      className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-primary/10 w-full cursor-pointer"
                    >
                      {subCategory.name}
                    </div>
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuSub key={subCategory._id}>
                  <DropdownMenuSubTrigger className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-primary/10 cursor-pointer">
                    {subCategory.name}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-56 p-2 retro-card retro-card-secondary animate-scale-in">
                    <DropdownMenuItem asChild>
                      <div 
                        onClick={() => onCategoryChange(subCategory)}
                        className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-secondary/10 w-full cursor-pointer"
                      >
                        All {subCategory.name}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 border-retro-border" />
                    {subCategory.items.map((nestedCategory) => (
                      <DropdownMenuItem key={nestedCategory._id} asChild>
                        <div 
                          onClick={() => onCategoryChange(nestedCategory)}
                          className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-secondary/10 w-full cursor-pointer"
                        >
                          {nestedCategory.name}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="relative">
      <nav className="flex items-center space-x-1 overflow-x-auto pb-2 hide-scrollbar">
        <Link 
          href="/products" 
          className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all 
            ${!currentCategory ? 'bg-retro-primary text-retro-primary-foreground' : 'hover:bg-retro-primary/10'}`}
        >
          All
        </Link>
        
        {categories.slice(0, showMore ? categories.length : visibleCount).map((category) => (
          <div key={category._id} className="relative">
            {renderCategoryDropdown(category)}
          </div>
        ))}
        
        {categories.length > visibleCount && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center px-4 py-2.5 text-sm font-medium rounded-full transition-all hover:bg-retro-accent/10">
                {showMore ? "Less" : "More"}
                <ChevronDownIcon size={16} className={`ml-1 transition-transform ${showMore ? 'rotate-180' : ''}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 p-2 retro-card retro-card-accent animate-scale-in"
            >
              <DropdownMenuItem asChild>
                <button 
                  onClick={() => setShowMore(!showMore)} 
                  className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-accent/10 w-full cursor-pointer"
                >
                  {showMore ? "Show less categories" : "Show all categories"}
                </button>
              </DropdownMenuItem>
              {!showMore && (
                <>
                  <DropdownMenuSeparator className="my-1 border-retro-border" />
                  <DropdownMenuGroup>
                    {categories.slice(visibleCount).map((category) => (
                      <DropdownMenuItem key={category._id} asChild>
                        <div 
                          onClick={() => onCategoryChange(category)}
                          className="px-3 py-2 text-sm rounded-md font-medium hover:bg-retro-accent/10 w-full cursor-pointer"
                        >
                          {category.name}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </div>
  );
};