"use client";

import { useToast } from "@/app/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { InventoryDetailTabs } from "./InventoryDetailTabs";
import { InventoryItemSummary } from "./InventoryItemSummary";
import { ListingForm } from "./ListingForm";

export function InventoryDetailSheet({ open, onOpenChange, item }) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("details");
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [isListingFormOpen, setIsListingFormOpen] = useState(false);
    const [selectedVariantForListing, setSelectedVariantForListing] =
        useState(null);

    // Mock listing form state
    const [listingFormData, setListingFormData] = useState({
        price: "",
        condition: "CONDITION_NEW",
        packagingCondition: "PACKAGING_CONDITION_GOOD_CONDITION",
        activate: true,
    });

    if (!item) return null;

    const handleListItem = (platform, variantId) => {
        setSelectedPlatform(platform);
        setSelectedVariantForListing(variantId || null);
        setIsListingFormOpen(true);

        // Reset form data
        setListingFormData({
            price: "",
            condition: "CONDITION_NEW",
            packagingCondition: "PACKAGING_CONDITION_GOOD_CONDITION",
            activate: true,
        });
    };

    const handleSubmitListing = () => {
        toast({
            title: "Listing submitted",
            description: `Successfully listed on ${selectedPlatform?.toUpperCase()} for $${
                listingFormData.price
            }`,
        });
        setIsListingFormOpen(false);
    };

    // Get selected variant data
    const getSelectedVariantData = () => {
        if (!selectedVariantForListing || !item.variations) return null;
        return item.variations.find(
            (variant) => variant.variantId === selectedVariantForListing
        );
    };

    const selectedVariant = getSelectedVariantData();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-4xl overflow-y-hidden">
                <SheetHeader className="border-b pb-4">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-bold">
                            Inventory Details
                        </SheetTitle>
                        <SheetClose className="p-2 rounded-full hover:bg-secondary">
                            {/* <X size={20} /> */}
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="py-6 overflow-y-auto px-10">
                    {isListingFormOpen ? (
                        <ListingForm
                            selectedPlatform={selectedPlatform}
                            item={item}
                            selectedVariant={selectedVariant}
                            listingFormData={listingFormData}
                            setListingFormData={setListingFormData}
                            onBack={() => setIsListingFormOpen(false)}
                            onSubmit={handleSubmitListing}
                        />
                    ) : (
                        <>
                            <InventoryItemSummary item={item} />

                            <InventoryDetailTabs
                                item={item}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleListItem={handleListItem}
                            />
                        </>
                    )}
                </div>

                <SheetFooter className="border-t pt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="w-fit mx-auto"
                    >
                        Close
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
