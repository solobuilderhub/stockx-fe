// components/custom/ui/retro-list.jsx
"use client";

import { Card } from "@/components/ui/card";
import { CustomPagination, PaginationInfo } from "@/components/custom/ui/custom-pagination";
import { Skeleton } from "@/components/ui/skeleton";


export function RetroList({ 
  items = [],
  isLoading = false,
  renderItem,
  renderSkeleton,
  renderEmpty,
  pagination,
  gridCols = "md:grid-cols-2 lg:grid-cols-3",
}) {
  const {
    totalDocs = 0,
    limit = 10,
    currentPage = 1,
    totalPages = 1,
    hasNextPage = false,
    hasPrevPage = false,
    onPageChange = () => {}
  } = pagination ?? {};

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => renderSkeleton(i))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return renderEmpty();
  }

  return (
    <div className="space-y-6">
      {/* Card grid layout */}
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {items.map(item => renderItem(item))}
      </div>

      {/* Pagination Section */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <PaginationInfo
            totalDocs={totalDocs}
            currentPage={currentPage}
            itemsPerPage={limit}
          />

          <div className="flex items-center space-x-6">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable empty state
export function RetroEmptyState({ title, message }) {
  return (
    <Card className="retro-card retro-card-plain p-6 text-center">
      <div className="py-8">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </Card>
  );
}

// Reusable skeleton
export function RetroItemSkeleton({ id }) {
    return (
      <Card key={id} className="retro-card retro-card-plain overflow-hidden">
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </Card>
    );
  }

// Reusable RetroCard
export function RetroCard({ children, onClick, variant = "primary", className = "" }) {
  const variantClasses = {
    primary: "retro-card retro-card-primary",
    secondary: "retro-card retro-card-secondary",
    accent: "retro-card retro-card-accent",
    tertiary: "retro-card retro-card-tertiary",
    plain: "retro-card retro-card-plain"
  };

  return (
    <Card 
      className={`${variantClasses[variant]} overflow-hidden transition-all hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}