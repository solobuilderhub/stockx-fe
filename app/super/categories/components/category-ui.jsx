// app/categories/components/category-ui.jsx
"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, FolderTree } from "lucide-react";
import { DataTable } from "@/components/custom/ui/data-table";
import { columns } from "./columns";
import { useCategories } from "@/hooks/query/use-categories";
import CategoryForm from "./category-form";
import HeaderSection from "@/components/custom/dashboard/header-section";
import ErrorBoundaryWrapper from "@/components/custom/error/error-boundary-wrapper";

export function CategoryUI({ token }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const currentPage = Number(searchParams.get("page")) || 1;

  const { 
    categories, 
    pagination, 
    isLoading, 
    deleteCategory 
  } = useCategories({
    page: currentPage,
    search: searchParams.get("search") || "",
    token
  });

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1 when searching
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory({ token, id });
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  if (showForm) {
    return (
      <div className="container mx-auto">
        <CategoryForm
          category={selectedCategory}
          onSuccess={handleFormClose}
          onCancel={handleFormClose}
          token={token}
          allCategories={categories}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <HeaderSection
        title="Categories"
        description="Manage your content categories"
        icon={FolderTree}
        actions={[
          {
            text: "Add Category",
            icon: Plus,
            onClick: () => setShowForm(true),
          },
        ]}
      />

      <ErrorBoundaryWrapper>
        <div className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <DataTable
              columns={columns(handleEdit, handleDelete)}
              data={categories}
              isLoading={isLoading}
              pagination={pagination ? {
                totalDocs: pagination.totalDocs,
                limit: pagination.limit,
                currentPage: pagination.currentPage,
                totalPages: pagination.totalPages,
                hasNextPage: pagination.hasNextPage,
                hasPrevPage: pagination.hasPrevPage,
                onPageChange: handlePageChange,
              } : undefined}
            />
          </div>
        </div>
      </ErrorBoundaryWrapper>
    </div>
  );
}