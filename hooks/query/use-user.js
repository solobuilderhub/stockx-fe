// hooks/use-user-search.js
"use client";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "@/api/user-data";

export function useUserSearch({ token }) {
  const searchUserMutation = useMutation({
    mutationFn: (email) => getUser(email),
    onError: (error) => {
      // Error is handled by the component
      console.error("User search error:", error);
    },
  });

  return {
    searchUser: searchUserMutation.mutate,
    user: searchUserMutation.data?.user,
    isSearching: searchUserMutation.isPending,
    error: searchUserMutation.error,
    reset: searchUserMutation.reset,
  };
}