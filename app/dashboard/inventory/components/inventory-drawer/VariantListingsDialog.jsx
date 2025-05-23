"use client";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { GoatListings } from "./GoatListings";
import { useGoatListings, useStockXListings } from "./hooks/use-listings-data";
import { StockXListings } from "./StockXListings";
// Removed: import { Variant } from '@/components/inventory-drawer/types';

// Removed TypeScript interface

// Mock StockX listing data
const mockStockXListings = [
    {
        amount: "150",
        ask: {
            askId: "ask123",
            askCreatedAt: new Date().toISOString(),
            askUpdatedAt: new Date().toISOString(),
            askExpiresAt: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
        },
        order: null,
        product: {
            productId: "prod123",
            productName: "Nike Dunk Low",
            styleId: "DD1391-100",
        },
        variant: {
            variantId: "var123",
            variantName: "US 9",
            variantValue: "9",
        },
        currencyCode: "USD",
        listingId: "list123",
        status: "ACTIVE",
        inventoryType: "standard",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authenticationDetails: null,
        batch: {
            batchId: "batch123",
            taskId: "task123",
        },
        initiatedShipments: null,
    },
];

// Mock GOAT listing data
const mockGoatListings = [
    {
        amount: "150",
        order: null,
        product: {
            productId: "prod123",
            productName: "Nike Dunk Low",
            styleId: "DD1391-100",
        },
        variant: {
            variantId: "var123",
            variantName: "US 9",
            variantValue: "9",
        },
        currencyCode: "USD",
        listingId: "list123",
        status: "ACTIVE",
        inventoryType: "standard",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function VariantListingsDialog({
    open,
    onOpenChange,
    variant,
    styleId,
}) {
    const [activeTab, setActiveTab] = useState("stockx");

    // Use our custom hooks to fetch listings
    const { data: stockXListings, isLoading: isLoadingStockX } =
        useStockXListings(variant?.variantId);
    const { data: goatListings, isLoading: isLoadingGoat } = useGoatListings(
        variant?.size
    );

    // Function to get StockX listings or fallback to mock data
    const getStockXListings = () => {
        return stockXListings || mockStockXListings;
    };

    // Function to get GOAT listings or fallback to mock data
    const getGoatListings = () => {
        return goatListings || mockGoatListings;
    };

    if (!variant) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Listings for Size {variant.size}
                        <Badge variant="outline" className="ml-2">
                            Style ID: {styleId}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stockx">StockX</TabsTrigger>
                        <TabsTrigger value="goat">GOAT</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stockx" className="mt-4">
                        <StockXListings
                            listings={getStockXListings()}
                            isLoading={isLoadingStockX}
                            lastUpdated={new Date().toISOString()}
                            filterByVariantId={variant.variantId}
                        />
                    </TabsContent>

                    <TabsContent value="goat" className="mt-4">
                        <GoatListings
                            listings={getGoatListings()}
                            isLoading={isLoadingGoat}
                            lastUpdated={new Date().toISOString()}
                            filterByVariantId={variant.variantId}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
