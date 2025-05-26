"use client";

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Info, TrendingDown, TrendingUp, Truck } from "lucide-react";
import { useState } from "react";
import { InventoryQuantityControl } from "./InventoryQuantityControl";
// Removed: import { Variant } from '@/components/inventory-drawer/types';

// Removed TypeScript interface

export function VariantAccordionItem({
    variant,
    onListItem,
    onViewListings,
    onQuantityChange,
    itemId = "1",
}) {
    const [activeTab, setActiveTab] = useState("details");

    // Important: Ensure we have a unique identifier for the accordion item
    const accordionValue =
        variant._id || variant.variantId || `variant-${Math.random()}`;

    // View market data handler
    const handleViewMarketData = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab("actions");
    };

    // Handle view listings with proper stopPropagation
    const handleViewListings = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onViewListings(variant);
    };

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Static dummy market data
    const dummyStockXData = {
        lowestAskAmount: "$220",
        highestBidAmount: "$185",
        lastSoldAmount: "$210",
    };

    const dummyGoatData = {
        lowestListingPrice: "$225",
        highestOfferPrice: "$180",
        lastSoldPrice: "$210",
    };

    return (
        <AccordionItem
            value={accordionValue}
            className="border rounded-lg mb-2 overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
        >
            <AccordionTrigger className="px-4 py-3 hover:bg-secondary/5 [&[data-state=open]]:bg-secondary/10">
                <div className="flex items-center justify-between w-full px-2">
                    <div className="flex items-center gap-3">
                        <Badge
                            variant="outline"
                            className="bg-secondary/30 text-foreground border-secondary"
                        >
                            Size:{" "}
                            {variant.variant?.stockx?.variantValue || "Unknown"}
                        </Badge>

                        <div
                            className="ml-2"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <InventoryQuantityControl
                                initialQuantity={variant?.quantity || 1}
                                variantId={variant.variantId}
                                onQuantityChange={onQuantityChange}
                                itemId={itemId}
                                variant={variant}
                            />
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-2"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20"
                            onClick={handleViewListings}
                        >
                            <Eye size={14} />
                            Listings
                        </Button>
                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="border-t bg-background/50">
                <div className="p-4">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="w-full grid grid-cols-2 bg-secondary/10 mb-3">
                            <TabsTrigger
                                value="details"
                                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                            >
                                Details
                            </TabsTrigger>
                            <TabsTrigger
                                value="actions"
                                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                            >
                                Quick Actions
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="pt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="border rounded-md p-3 bg-secondary/10">
                                            <span className="text-muted-foreground text-xs block mb-1">
                                                Date Added
                                            </span>
                                            <span className="text-sm font-medium">
                                                {formatDate(variant.dateAdded)}
                                            </span>
                                        </div>
                                        <div className="border rounded-md p-3 bg-secondary/10">
                                            <span className="text-muted-foreground text-xs block mb-1">
                                                Retail Price
                                            </span>
                                            <span className="text-sm font-medium">
                                                ${variant.retailPrice || "N/A"}
                                            </span>
                                        </div>
                                        <div className="border rounded-md p-3 bg-secondary/10">
                                            <span className="text-muted-foreground text-xs block mb-1">
                                                Wholesale Price
                                            </span>
                                            <span className="text-sm font-medium">
                                                $
                                                {variant.wholesalePrice ||
                                                    "N/A"}
                                            </span>
                                        </div>
                                        <div className="border rounded-md p-3 bg-secondary/10">
                                            <span className="text-muted-foreground text-xs block mb-1">
                                                Quantity
                                            </span>
                                            <span className="text-sm font-medium">
                                                {variant.quantity || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="border rounded-md p-3 bg-secondary/10">
                                            <span className="text-muted-foreground text-xs block mb-1">
                                                Warehouse Locations
                                            </span>
                                            <div className="grid grid-cols-3 gap-1 mt-1">
                                                <Badge
                                                    variant="outline"
                                                    className="justify-center"
                                                >
                                                    {variant.warehouseLocation1 ||
                                                        "N/A"}
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="justify-center"
                                                >
                                                    {variant.warehouseLocation2 ||
                                                        "N/A"}
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="justify-center"
                                                >
                                                    {variant.warehouseLocation3 ||
                                                        "N/A"}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="border rounded-md p-3 bg-secondary/10">
                                            <span className="text-muted-foreground text-xs block mb-1">
                                                Total Sold
                                            </span>
                                            <div className="grid grid-cols-2 gap-2 mt-1">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-muted-foreground">
                                                        StockX
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {variant.totalSoldStockX ||
                                                            0}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-muted-foreground">
                                                        GOAT
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        {variant.totalSoldGoat ||
                                                            0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="actions" className="pt-2">
                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                <div className="border rounded-md p-3 bg-secondary/10">
                                    <span className="text-muted-foreground block mb-1">
                                        StockX:
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="bg-secondary/20"
                                    >
                                        0 active
                                    </Badge>
                                </div>
                                <div className="border rounded-md p-3 bg-secondary/10">
                                    <span className="text-muted-foreground block mb-1">
                                        GOAT:
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="bg-secondary/20"
                                    >
                                        0 active
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* StockX Market Data Card */}
                                <div className="bg-gradient-to-br from-gray-900 to-neutral-800 rounded-lg p-3 border border-neutral-700 mb-3">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-white rounded-md p-1">
                                            <h3 className="text-sm font-bold text-black tracking-tight">
                                                StockX
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-green-900/20 rounded-lg p-2 border border-green-800/30">
                                            <div className="flex items-center gap-1">
                                                <div className="text-green-400 text-xs font-medium uppercase tracking-wider">
                                                    Lowest Price
                                                </div>
                                                <TrendingDown className="h-3 w-3 text-green-400" />
                                            </div>
                                            <div className="mt-1 text-lg font-bold text-green-300">
                                                {
                                                    dummyStockXData.lowestAskAmount
                                                }
                                            </div>
                                        </div>

                                        <div className="bg-blue-900/20 rounded-lg p-2 border border-blue-800/30">
                                            <div className="flex items-center gap-1">
                                                <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                                                    Highest Offer
                                                </div>
                                                <TrendingUp className="h-3 w-3 text-blue-400" />
                                            </div>
                                            <div className="mt-1 text-lg font-bold text-blue-300">
                                                {
                                                    dummyStockXData.highestBidAmount
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-800/30 mt-2">
                                        <div className="flex items-center gap-1">
                                            <div className="text-purple-400 text-xs font-medium uppercase tracking-wider">
                                                Last Sold
                                            </div>
                                            <Info className="h-3 w-3 text-purple-400" />
                                        </div>
                                        <div className="mt-1 text-lg font-bold text-purple-300">
                                            {dummyStockXData.lastSoldAmount}
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5 w-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20 mt-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onListItem(
                                                "stockx",
                                                variant.variantId
                                            );
                                        }}
                                    >
                                        <Truck size={14} />
                                        List on StockX
                                    </Button>
                                </div>

                                {/* GOAT Market Data Card */}
                                <div className="bg-gradient-to-br from-gray-900 to-neutral-800 rounded-lg p-3 border border-neutral-700 mb-3">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-white rounded-md p-1">
                                            <h3 className="text-sm font-bold text-black tracking-tight">
                                                GOAT
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-green-900/20 rounded-lg p-2 border border-green-800/30">
                                            <div className="flex items-center gap-1">
                                                <div className="text-green-400 text-xs font-medium uppercase tracking-wider">
                                                    Lowest Price
                                                </div>
                                                <TrendingDown className="h-3 w-3 text-green-400" />
                                            </div>
                                            <div className="mt-1 text-lg font-bold text-green-300">
                                                {
                                                    dummyGoatData.lowestListingPrice
                                                }
                                            </div>
                                        </div>

                                        <div className="bg-blue-900/20 rounded-lg p-2 border border-blue-800/30">
                                            <div className="flex items-center gap-1">
                                                <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                                                    Highest Offer
                                                </div>
                                                <TrendingUp className="h-3 w-3 text-blue-400" />
                                            </div>
                                            <div className="mt-1 text-lg font-bold text-blue-300">
                                                {
                                                    dummyGoatData.highestOfferPrice
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-800/30 mt-2">
                                        <div className="flex items-center gap-1">
                                            <div className="text-purple-400 text-xs font-medium uppercase tracking-wider">
                                                Last Sold
                                            </div>
                                            <Info className="h-3 w-3 text-purple-400" />
                                        </div>
                                        <div className="mt-1 text-lg font-bold text-purple-300">
                                            {dummyGoatData.lastSoldPrice}
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5 w-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20 mt-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onListItem(
                                                "goat",
                                                variant.variantId
                                            );
                                        }}
                                    >
                                        <Truck size={14} />
                                        List on GOAT
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
