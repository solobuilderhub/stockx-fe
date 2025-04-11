// components/custom/custom-pagination.jsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

function CustomPagination({ currentPage, onPageChange, totalPages, hasPrevPage, hasNextPage }) {
  // Convert currentPage to number to ensure proper comparison
  const currentPageNum = Number(currentPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPageNum - delta);
      i <= Math.min(totalPages - 1, currentPageNum + delta);
      i++
    ) {
      range.push(i);
    }

    // Handle first page
    if (currentPageNum - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    // Handle last page
    if (currentPageNum + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      if (!range.includes(totalPages)) {
        rangeWithDots.push(totalPages);
      }
    }

    return [...new Set(rangeWithDots)]; // Remove any duplicates
  };

  return (
    <Pagination >
      <PaginationContent>
      
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPageNum - 1)}
              className={cn(
                "cursor-pointer",
                !hasPrevPage && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
   

        {getPageNumbers().map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === "..." ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <PaginationLink
                className="cursor-pointer"
                onClick={() =>
                  typeof pageNum === "number" && onPageChange(pageNum)
                }
                isActive={Number(currentPageNum) === Number(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}


          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPageNum + 1)}
              className={cn(
                "cursor-pointer",
                !hasNextPage && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
     
      </PaginationContent>
    </Pagination>
  );
}

const PaginationInfo = ({ currentPage, totalDocs, itemsPerPage = 10 }) => {
  if (totalDocs === 0) {
    return (
      <div className="flex-1 text-sm text-muted-foreground">
        <p>No entries</p>
      </div>
    );
  }

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalDocs);

  return (
    <div className="flex-1 text-sm text-muted-foreground">
      <p>
        Showing{" "}
        <span className="font-medium text-foreground">{startEntry}</span>{" "}
        to{" "}
        <span className="font-medium text-foreground">{endEntry}</span>{" "}
        of{" "}
        <span className="font-medium text-foreground">{totalDocs}</span>{" "}
        results
      </p>
    </div>
  );
};


export {CustomPagination, PaginationInfo};
