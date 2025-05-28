"use client";

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Info, TrendingDown, TrendingUp, Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";
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
    const { data: session } = useSession();
    const [stockXMarketData, setStockXMarketData] = useState(null);
    const [goatMarketData, setGoatMarketData] = useState(null);
    const token = useToken();
    console.log("token", token);
    // Important: Ensure we have a unique identifier for the accordion item
    const accordionValue =
        variant._id || variant.variantId || `variant-${Math.random()}`;

    // View market data handler
    const handleViewMarketData = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                // Prepare headers with authentication if available
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };

                const stockXResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/stockx/market/${variant?.variant?.stockx?.productId}/${variant?.variant?.stockx?.variantId}`,
                    { headers },
                    { cache: "force-cache" },
                    { next: { revalidate: 86400 } }
                );

                if (stockXResponse.ok) {
                    const stockXData = await stockXResponse.json();
                    setStockXMarketData(stockXData?.data?.marketData);
                } else {
                    console.error(
                        "StockX API error:",
                        stockXResponse.status,
                        stockXResponse.statusText
                    );
                }

                const goatResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/goat/market/${variant?.variant?.goat?.catalog_id}/?size=${variant?.variant?.stockx?.variantValue}`,
                    { headers },
                    { cache: "force-cache" },
                    { next: { revalidate: 86400 } }
                );

                if (goatResponse.ok) {
                    const goatData = await goatResponse.json();
                    setGoatMarketData(goatData?.data?.data?.variants[0]);
                } else {
                    console.error(
                        "GOAT API error:",
                        goatResponse.status,
                        goatResponse.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching market data:", error);
            }
        };

        // Only fetch if we have the required variant data
        if (
            variant?.variant?.stockx?.productId &&
            variant?.variant?.stockx?.variantId
        ) {
            fetchMarketData();
        }
    }, [variant._id, session?.accessToken]);

    console.log("stockXMarketData", stockXMarketData);
    console.log("goatMarketData", goatMarketData);

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
                    {/* Details Section */}
                    <h3 className="text-sm font-medium mb-3">Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="border rounded-md p-3 bg-secondary/10">
                                    <span className="text-muted-foreground text-xs block mb-1">
                                        Date Added
                                    </span>
                                    <span className="text-sm font-medium">
                                        {variant.inventory_added_at
                                            ? new Date(
                                                  variant.inventory_added_at
                                              ).toLocaleDateString("en-GB")
                                            : "N/A"}
                                    </span>
                                </div>
                                <div className="border rounded-md p-3 bg-secondary/10">
                                    <span className="text-muted-foreground text-xs block mb-1">
                                        Retail Price
                                    </span>
                                    <span className="text-sm font-medium">
                                        ${variant.retail_price || "N/A"}
                                    </span>
                                </div>
                                <div className="border rounded-md p-3 bg-secondary/10">
                                    <span className="text-muted-foreground text-xs block mb-1">
                                        Wholesale Price
                                    </span>
                                    <span className="text-sm font-medium">
                                        $
                                        {variant.retail_price
                                            ? (
                                                  variant.retail_price * 0.55
                                              ).toFixed(2)
                                            : "N/A"}
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
                                            {variant.location[0] || "N/A"}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="justify-center"
                                        >
                                            {variant.location[1] || "N/A"}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="justify-center"
                                        >
                                            {variant.location[2] || "N/A"}
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
                                                    "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">
                                                GOAT
                                            </span>
                                            <span className="text-sm font-medium">
                                                {variant.totalSoldGoat || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Section */}
                    <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
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
                                            Lowest Ask Amount
                                        </div>
                                        <TrendingDown className="h-3 w-3 text-green-400" />
                                    </div>
                                    <div className="mt-1 text-lg font-bold text-green-300">
                                        {stockXMarketData?.lowestAskAmount
                                            ? `$${stockXMarketData.lowestAskAmount}`
                                            : "N/A"}
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 rounded-lg p-2 border border-blue-800/30">
                                    <div className="flex items-center gap-1">
                                        <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                                            Highest Bid Amount
                                        </div>
                                        <TrendingUp className="h-3 w-3 text-blue-400" />
                                    </div>
                                    <div className="mt-1 text-lg font-bold text-blue-300">
                                        {stockXMarketData?.highestBidAmount
                                            ? `$${stockXMarketData.highestBidAmount}`
                                            : "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-800/30 mt-2">
                                <div className="flex items-center gap-1">
                                    <div className="text-purple-400 text-xs font-medium uppercase tracking-wider">
                                        Flex Lowest Ask Amount
                                    </div>
                                    <Info className="h-3 w-3 text-purple-400" />
                                </div>
                                <div className="mt-1 text-lg font-bold text-purple-300">
                                    {stockXMarketData?.flexLowestAskAmount
                                        ? `$${stockXMarketData.flexLowestAskAmount}`
                                        : "N/A"}
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 w-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20 mt-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onListItem("stockx", variant.variantId);
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
                                            Lowest Listing Price Cents
                                        </div>
                                        <TrendingDown className="h-3 w-3 text-green-400" />
                                    </div>
                                    <div className="mt-1 text-lg font-bold text-green-300">
                                        {goatMarketData?.availability
                                            ?.lowest_listing_price_cents
                                            ? `$${(
                                                  goatMarketData.availability
                                                      .lowest_listing_price_cents /
                                                  100
                                              ).toFixed(0)}`
                                            : "N/A"}
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 rounded-lg p-2 border border-blue-800/30">
                                    <div className="flex items-center gap-1">
                                        <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                                            Highest Offer Price Cents
                                        </div>
                                        <TrendingUp className="h-3 w-3 text-blue-400" />
                                    </div>
                                    <div className="mt-1 text-lg font-bold text-blue-300">
                                        {goatMarketData?.availability
                                            ?.highest_offer_price_cents
                                            ? `$${(
                                                  goatMarketData.availability
                                                      .highest_offer_price_cents /
                                                  100
                                              ).toFixed(0)}`
                                            : "N/A"}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-900/20 rounded-lg p-2 border border-purple-800/30 mt-2">
                                <div className="flex items-center gap-1">
                                    <div className="text-purple-400 text-xs font-medium uppercase tracking-wider">
                                        Last Sold Listing Price Cents
                                    </div>
                                    <Info className="h-3 w-3 text-purple-400" />
                                </div>
                                <div className="mt-1 text-lg font-bold text-purple-300">
                                    {goatMarketData?.availability
                                        ?.last_sold_listing_price_cents
                                        ? `$${(
                                              goatMarketData.availability
                                                  .last_sold_listing_price_cents /
                                              100
                                          ).toFixed(0)}`
                                        : "N/A"}
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 w-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-primary/20 mt-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onListItem("goat", variant.variantId);
                                }}
                            >
                                <Truck size={14} />
                                List on GOAT
                            </Button>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
