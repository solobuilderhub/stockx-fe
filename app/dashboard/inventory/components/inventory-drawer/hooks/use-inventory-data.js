"use client";

import { useToast } from "@/app/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sampleInventoryItems } from "../InventoryData";

// Fetch all inventory items
export function useInventory() {
    return useQuery({
        queryKey: ["inventory"],
        queryFn: () => {
            // Return the static inventory data
            return sampleInventoryItems;
        },
        initialData: sampleInventoryItems,
    });
}

// Fetch a single inventory item by ID
export function useInventoryItem(itemId) {
    return useQuery({
        queryKey: ["inventory", itemId],
        queryFn: () => {
            // Find the item by ID
            const item = sampleInventoryItems.find(
                (item) => item.id === itemId
            );
            return item || null;
        },
        initialData: () =>
            sampleInventoryItems.find((item) => item.id === itemId),
    });
}

// Update inventory quantity
export function useUpdateInventoryQuantity() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ itemId, variantId, newQuantity }) => {
            // In a real app, this would be an API call
            // For static data, we'll simulate success
            return Promise.resolve({ success: true });
        },
        onSuccess: (data, variables) => {
            const { itemId, variantId, newQuantity } = variables;

            toast({
                title: "Quantity updated",
                description: `Inventory quantity updated to ${newQuantity}`,
            });

            // Invalidate related queries to trigger refetch
            queryClient.invalidateQueries({ queryKey: ["inventory"] });
            queryClient.invalidateQueries({ queryKey: ["inventory", itemId] });
        },
    });
}
