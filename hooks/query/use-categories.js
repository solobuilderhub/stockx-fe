// hooks/use-categories.js
"use client";

import { categoriesApi } from "@/api/platform/category-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


// Query keys for better cache management
export const CATEGORIES_KEYS = {
  all: ['categories'],
  detail: (id) => [...CATEGORIES_KEYS.all, id],
  params: (params) => [...CATEGORIES_KEYS.all, 'params', JSON.stringify(params)]
};

/**
 * Hook for fetching multiple categories with optional filtering
 */
export function useCategories(params = {}) {
  const queryClient = useQueryClient();
  const queryKey = CATEGORIES_KEYS.params(params);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => categoriesApi.getAll({ params }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Format the response
  const categories = data?.docs || data || [];
  const pagination = data?.totalDocs 
    ? {
        totalDocs: data.totalDocs,
        totalPages: data.totalPages || 1,
        currentPage: data.page || 1,
        limit: data.limit || 10,
        hasNextPage: data.hasNextPage || false,
        hasPrevPage: data.hasPrevPage || false,
      }
    : null;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: ({ token, data }) => categoriesApi.create({ token, data }),
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEYS.all });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create category");
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ token, id, data }) => categoriesApi.update({ token, id, data }),
    onSuccess: (_, { id }) => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEYS.detail(id) });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEYS.all });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category");
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: ({ token, id }) => categoriesApi.delete({ token, id }),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEYS.all });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category");
    }
  });

  return {
    categories,
    pagination,
    isLoading,
    error,
    refetch,
    
    // Mutations
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    
    // Status flags
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending, 
    isDeleting: deleteMutation.isPending,
  };
}

/**
 * Hook for fetching a single category by ID
 */
export function useCategoryDetail(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: CATEGORIES_KEYS.detail(id),
    queryFn: () => categoriesApi.getById({ id }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    category: data,
    isLoading,
    error
  };
}