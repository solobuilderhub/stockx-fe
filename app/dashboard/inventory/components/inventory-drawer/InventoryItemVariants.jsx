"use client";

import { useToast } from "@/app/hooks/use-toast";
import { Accordion } from "@/components/ui/accordion";
import { useState } from "react";
import { VariantAccordionItem } from "./VariantAccordionItem";
import { VariantListingsDialog } from "./VariantListingsDialog";

export function InventoryItemVariants({
    variations,
    handleListItem,
    styleId,
    itemId = "1",
}) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [showListingsDialog, setShowListingsDialog] = useState(false);
    const { toast } = useToast();

    // Function to handle viewing listings for a variant
    const handleViewListings = (variant) => {
        setSelectedVariant(variant);
        setShowListingsDialog(true);
    };

    // Function to handle quantity updates
    const handleQuantityChange = (variantId, newQuantity) => {
        // In a real app, this would update the backend via our hooks
        // The actual API call is now handled in the InventoryQuantityControl component
        console.log(
            `Updated quantity for variant ${variantId} to ${newQuantity}`
        );

        // For backward compatibility, still show a toast notification
        toast({
            title: "Quantity updated",
            description: `Inventory quantity for Size ${
                variations?.find((v) => v.variantId === variantId)?.size || ""
            } has been updated to ${newQuantity}`,
        });
    };

    return (
        <div className="space-y-4">
            <div className="mb-6 bg-card p-4 rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold text-foreground mb-2">
                    Available Variants
                </h3>
                <p className="text-sm text-muted-foreground">
                    {variations?.length || 0} size variants available. Click on
                    a variant to see detailed information.
                </p>
            </div>

            {variations && variations.length > 0 ? (
                <div className="space-y-3">
                    <Accordion type="single" collapsible className="space-y-3">
                        {variations.map((variant) => (
                            <VariantAccordionItem
                                key={variant.variantId}
                                variant={variant}
                                onListItem={handleListItem}
                                onViewListings={handleViewListings}
                                onQuantityChange={handleQuantityChange}
                                itemId={itemId}
                            />
                        ))}
                    </Accordion>
                </div>
            ) : (
                <div className="text-center py-6 border rounded-md">
                    <p className="text-muted-foreground">
                        No variant information available
                    </p>
                </div>
            )}

            {/* Variant Listings Dialog */}
            {selectedVariant && (
                <VariantListingsDialog
                    open={showListingsDialog}
                    onOpenChange={(open) => setShowListingsDialog(open)}
                    variant={selectedVariant}
                    styleId={styleId}
                />
            )}
        </div>
    );
}
