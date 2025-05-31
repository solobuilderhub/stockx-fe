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
import { useToken } from "../../context/TokenContext";
import { InventoryQuantityControl } from "./InventoryQuantityControl";
import {
    useGoatMarketData,
    useStockXMarketData,
} from "./hooks/use-market-data";

export function VariantAccordionItem({
    variant,
    onListItem,
    onViewListings,
    onQuantityChange,
    itemId = "1",
    stockXMarketData, // Keep for backward compatibility but don't use
    goatMarketData, // Keep for backward compatibility but don't use
    setStockXMarketData, // Keep for backward compatibility but don't use
    setGoatMarketData, // Keep for backward compatibility but don't use
}) {
    const { data: session } = useSession();
    const token = useToken();

    // Important: Ensure we have a unique identifier for the accordion item
    const accordionValue =
        variant._id || variant.variantId || `variant-${Math.random()}`;

    // Use the market data hooks - each variant will have its own data
    const { data: stockXData, isLoading: isLoadingStockX } =
        useStockXMarketData(
            variant?.variant?.stockx?.productId,
            variant?.variant?.stockx?.variantId,
            token
        );

    const { data: goatData, isLoading: isLoadingGoat } = useGoatMarketData(
        variant?.variant?.goat?.catalog_id,
        variant?.variant?.stockx?.variantValue,
        token
    );

    // Use the data directly from hooks instead of parent state
    const currentStockXMarketData = stockXData;
    const currentGoatMarketData = goatData;

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
                            {variant.variant?.stockx?.variantValue
                                ? variant.variant.stockx.variantValue
                                : variant.variant?.general?.size
                                ? `${variant.variant.general.size} ${
                                      variant.variant.general.size_unit || ""
                                  }`
                                : "Unknown"}
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
                                        Release Date
                                    </span>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        {variant.product?.productAttributes
                                            ?.releaseDate
                                            ? new Date(
                                                  variant.product?.productAttributes?.releaseDate
                                              ).toLocaleDateString("en-GB")
                                            : "N/A"}
                                    </div>
                                </div>
                            </div>
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
                                {isLoadingStockX && (
                                    <div className="ml-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </div>
                                )}
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
                                        {currentStockXMarketData?.lowestAskAmount
                                            ? `$${currentStockXMarketData.lowestAskAmount}`
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
                                        {currentStockXMarketData?.highestBidAmount
                                            ? `$${currentStockXMarketData.highestBidAmount}`
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
                                    {currentStockXMarketData?.flexLowestAskAmount
                                        ? `$${currentStockXMarketData.flexLowestAskAmount}`
                                        : "N/A"}
                                </div>
                            </div>
                            {/* <Button
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
                            </Button> */}
                        </div>

                        {/* GOAT Market Data Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-neutral-800 rounded-lg p-3 border border-neutral-700 mb-3">
                            <div className="flex items-center mb-2">
                                <div className="bg-white rounded-md p-1">
                                    <h3 className="text-sm font-bold text-black tracking-tight">
                                        GOAT
                                    </h3>
                                </div>
                                {isLoadingGoat && (
                                    <div className="ml-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-green-900/20 rounded-lg p-2 border border-green-800/30">
                                    <div className="flex items-center gap-1">
                                        <div className="text-green-400 text-xs font-medium uppercase tracking-wider">
                                            Lowest Listing Price
                                        </div>
                                        <TrendingDown className="h-3 w-3 text-green-400" />
                                    </div>
                                    <div className="mt-1 text-lg font-bold text-green-300">
                                        {currentGoatMarketData?.availability
                                            ?.lowest_listing_price_cents &&
                                        currentGoatMarketData.availability
                                            .lowest_listing_price_cents != 0
                                            ? `$${(
                                                  currentGoatMarketData
                                                      .availability
                                                      .lowest_listing_price_cents /
                                                  100
                                              ).toFixed(0)}`
                                            : "N/A"}
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 rounded-lg p-2 border border-blue-800/30">
                                    <div className="flex items-center gap-1">
                                        <div className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                                            Highest Offer Price
                                        </div>
                                        <TrendingUp className="h-3 w-3 text-blue-400" />
                                    </div>
                                    <div className="mt-1 text-lg font-bold text-blue-300">
                                        {currentGoatMarketData?.availability
                                            ?.highest_offer_price_cents &&
                                        currentGoatMarketData.availability
                                            .highest_offer_price_cents != 0
                                            ? `$${(
                                                  currentGoatMarketData
                                                      .availability
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
                                        Last Sold Listing Price
                                    </div>
                                    <Info className="h-3 w-3 text-purple-400" />
                                </div>
                                <div className="mt-1 text-lg font-bold text-purple-300">
                                    {currentGoatMarketData?.availability
                                        ?.last_sold_listing_price_cents &&
                                    currentGoatMarketData.availability
                                        .last_sold_listing_price_cents != 0
                                        ? `$${(
                                              currentGoatMarketData.availability
                                                  .last_sold_listing_price_cents /
                                              100
                                          ).toFixed(0)}`
                                        : "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
