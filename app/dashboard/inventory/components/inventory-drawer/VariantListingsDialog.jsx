"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { GoatListings } from "./GoatListings";
import { StockXListings } from "./StockXListings";

export function VariantListingsDialog({
    open,
    onOpenChange,
    variant,
    styleId,
    item,
    stockXMarketData,
    goatMarketData,
}) {
    const [activeTab, setActiveTab] = useState("stockx");

    if (!variant) return null;

    // // Debug logging to see what data we have
    // console.log("VariantListingsDialog - variant:", variant);
    // console.log("VariantListingsDialog - styleId:", styleId);
    // console.log("VariantListingsDialog - stockXMarketData:", stockXMarketData);
    // console.log("VariantListingsDialog - goatMarketData:", goatMarketData);

    // Get the correct IDs for API calls
    const stockXVariantId =
        variant?.variant?.stockx?.variantId || stockXMarketData?.variantId;
    const goatSize =
        variant?.variant?.stockx?.variantValue ||
        variant?.size ||
        goatMarketData?.size;

    // console.log("Using stockXVariantId:", stockXVariantId);
    // console.log("Using goatSize:", goatSize);
    // console.log("Using styleId:", styleId);

    // Helper function to format StockX market data
    const renderStockXMarketData = () => {
        if (!stockXMarketData) return null;

        return (
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="text-lg">Market Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Highest Bid</p>
                            <p className="text-lg font-semibold text-green-600">
                                {stockXMarketData?.highestBidAmount
                                    ? `$${stockXMarketData.highestBidAmount}`
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Lowest Ask</p>
                            <p className="text-lg font-semibold text-red-600">
                                {stockXMarketData?.lowestAskAmount
                                    ? `$${stockXMarketData.lowestAskAmount}`
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Flex Lowest Ask
                            </p>
                            <p className="text-lg font-semibold text-blue-600">
                                {stockXMarketData?.flexLowestAskAmount
                                    ? `$${stockXMarketData.flexLowestAskAmount}`
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex flex-col gap-2">
                            <Badge variant="outline">
                                Currency: {stockXMarketData.currencyCode}
                            </Badge>
                            <Badge variant="outline">
                                Product ID: {stockXMarketData.productId}
                            </Badge>
                            <Badge variant="outline">
                                Variant ID: {stockXMarketData.variantId}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Helper function to format GOAT market data
    const renderGoatMarketData = () => {
        if (!goatMarketData) return null;

        const formatPrice = (cents) => {
            if (!cents || cents === "0") return "N/A";
            return `$${(parseInt(cents) / 100).toFixed(2)}`;
        };

        return (
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="text-lg">Market Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Lowest Listing
                            </p>
                            <p className="text-lg font-semibold text-red-600">
                                {goatMarketData?.availability
                                    ?.lowest_listing_price_cents &&
                                goatMarketData.availability
                                    .lowest_listing_price_cents != 0
                                    ? `$${(
                                          goatMarketData.availability
                                              .lowest_listing_price_cents / 100
                                      ).toFixed(0)}`
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Highest Offer
                            </p>
                            <p className="text-lg font-semibold text-green-600">
                                {goatMarketData?.availability
                                    ?.highest_offer_price_cents &&
                                goatMarketData.availability
                                    .highest_offer_price_cents != 0
                                    ? `$${(
                                          goatMarketData.availability
                                              .highest_offer_price_cents / 100
                                      ).toFixed(0)}`
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Last Sold</p>
                            <p className="text-lg font-semibold text-blue-600">
                                {goatMarketData?.availability
                                    ?.last_sold_listing_price_cents &&
                                goatMarketData.availability
                                    .last_sold_listing_price_cents != 0
                                    ? `$${(
                                          goatMarketData.availability
                                              .last_sold_listing_price_cents /
                                          100
                                      ).toFixed(0)}`
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Global Indicator
                            </p>
                            <p className="text-lg font-semibold text-purple-600">
                                {formatPrice(
                                    goatMarketData.availability
                                        ?.global_indicator_price_cents
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Size: {goatSize}</Badge>
                            <Badge variant="outline">
                                Product Condition:{" "}
                                {goatMarketData.product_condition?.replace(
                                    "PRODUCT_CONDITION_",
                                    ""
                                )}
                            </Badge>
                            <Badge variant="outline">
                                Packaging Condition:{" "}
                                {goatMarketData.packaging_condition?.replace(
                                    "PACKAGING_CONDITION_",
                                    ""
                                )}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            className="min-w-7xl max-h-[85vh] overflow-y-auto"
        >
            <DialogContent className="min-w-7xl max-h-[85vh] overflow-y-auto">
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
                        {renderStockXMarketData()}
                        <StockXListings
                            isLoading={false}
                            lastUpdated={new Date().toISOString()}
                            variantId={stockXVariantId}
                        />
                    </TabsContent>

                    <TabsContent value="goat" className="mt-4">
                        {renderGoatMarketData()}
                        <GoatListings
                            isLoading={false}
                            lastUpdated={new Date().toISOString()}
                            size={goatSize}
                            styleId={styleId}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
