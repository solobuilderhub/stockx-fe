"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryItemDetails } from "./InventoryItemDetails";
import { InventoryItemListings } from "./InventoryItemListings";
import { InventoryItemVariants } from "./InventoryItemVariants";

// Create dummy data for the inventory item
const dummyItem = {
    id: "123456",
    name: "Nike Air Jordan 1 Retro High OG",
    styleId: "555088-123",
    variations: [],
    stockx: {
        styleId: "555088-123",
        productId: "738394-281",
    },
    goat: {
        sku: "AJ1-RHO-123",
        catalog_id: "72839",
    },
    productAttributes: {
        colorway: "University Blue/White-Black",
        releaseDate: "2023-04-15",
    },
    itemDetails: [
        {
            _id: "var1",
            variantId: "var1",
            variant: {
                stockx: {
                    variantValue: "US 8",
                },
            },
            quantity: 2,
            dateAdded: "2023-05-10",
            retailPrice: 170,
            wholesalePrice: 120,
            warehouseLocation1: "A12",
            warehouseLocation2: "B5",
            warehouseLocation3: "C3",
            totalSoldStockX: 1,
            totalSoldGoat: 2,
        },
        {
            _id: "var2",
            variantId: "var2",
            variant: {
                stockx: {
                    variantValue: "US 9",
                },
            },
            quantity: 3,
            dateAdded: "2023-05-11",
            retailPrice: 170,
            wholesalePrice: 120,
            warehouseLocation1: "A13",
            warehouseLocation2: "B6",
            warehouseLocation3: "C4",
            totalSoldStockX: 2,
            totalSoldGoat: 1,
        },
        {
            _id: "var3",
            variantId: "var3",
            variant: {
                stockx: {
                    variantValue: "US 10",
                },
            },
            quantity: 1,
            dateAdded: "2023-05-12",
            retailPrice: 170,
            wholesalePrice: 120,
            warehouseLocation1: "A14",
            warehouseLocation2: "B7",
            warehouseLocation3: "C5",
            totalSoldStockX: 3,
            totalSoldGoat: 2,
        },
    ],
};

export function InventoryDetailTabs({
    item = dummyItem,
    activeTab = "variants",
    setActiveTab = () => {},
    handleListItem = () => {},
}) {
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid grid-cols-3 mb-6 bg-secondary/10 w-full py-1">
                <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                    Details
                </TabsTrigger>
                <TabsTrigger
                    value="variants"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                    Variants
                </TabsTrigger>
                <TabsTrigger
                    value="listings"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                    Listings
                </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
                <InventoryItemDetails item={item} />
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
                <InventoryItemVariants
                    variations={item.variations}
                    handleListItem={handleListItem}
                    styleId={item.styleId}
                    itemId={item.id}
                    item={item}
                />
            </TabsContent>

            <TabsContent value="listings" className="space-y-4">
                <InventoryItemListings
                    styleId={item.styleId}
                    name={item.name}
                />
            </TabsContent>
        </Tabs>
    );
}
