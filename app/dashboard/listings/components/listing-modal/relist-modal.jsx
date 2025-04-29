"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Mock data for a single item with detailed market and listing data
const mockStockXData = {
    productDetails: {
        name: "Nike Air Jordan 4 Retro Thunder (2023)",
        styleId: "DH6927-017",
        sku: "AJ4-THD-23",
        colorway: "Black/Tour Yellow",
        retailPrice: "$215",
        releaseDate: "2023-05-13",
        condition: "New",
        size: "US 11",
        image: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg",
    },
    marketData: {
        lastSale: "$268",
        highestBid: "$260",
        lowestAsk: "$275",
        averageSale: "$270",
        salesLast72Hrs: 57,
        volatility: "+3.5%",
        priceRange: {
            "30days": {
                low: "$240",
                high: "$290",
            },
            "90days": {
                low: "$210",
                high: "$310",
            },
        },
    },
    listingData: {
        status: "ACTIVE",
        listingId: "98e2e748-8000-45bf-a624-5531d6a68318",
        askPrice: "$259",
        listedOn: "2023-11-09",
        expiresOn: "2024-02-09",
        fees: {
            transactionFee: "$25.90",
            paymentProcessingFee: "$5.18",
            estimatedPayout: "$227.92",
        },
    },
};

// Mock data for Goat platform
const mockGoatData = {
    productDetails: {
        name: "Nike Air Jordan 4 Retro Thunder (2023)",
        styleId: "DH6927-017",
        sku: "AJ4-THD-23",
        colorway: "Black/Tour Yellow",
        retailPrice: "$215",
        releaseDate: "2023-05-13",
        condition: "New",
        size: "US 11",
        image: "https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg",
    },
    marketData: {
        lastSale: "$265",
        highestBid: "$258",
        lowestAsk: "$272",
        averageSale: "$268",
        salesLast72Hrs: 43,
        volatility: "+2.8%",
        priceRange: {
            "30days": {
                low: "$245",
                high: "$285",
            },
            "90days": {
                low: "$220",
                high: "$305",
            },
        },
    },
    listingData: {
        status: "ACTIVE",
        listingId: "76e1c548-9000-32ab-c913-6421a5b54219",
        askPrice: "$262",
        listedOn: "2023-11-08",
        expiresOn: "2024-02-08",
        fees: {
            transactionFee: "$26.20",
            paymentProcessingFee: "$5.24",
            estimatedPayout: "$230.56",
        },
    },
};

export function RelistModal({ isOpen, onClose, product }) {
    const [activeTab, setActiveTab] = useState("stockx");

    // Use product data if available, otherwise use mock data
    const stockxData = mockStockXData;
    const goatData = mockGoatData;

    const renderSingleItem = (data, platform) => {
        return (
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-1/3">
                        <img
                            src={data.productDetails.image}
                            alt={data.productDetails.name}
                            className="w-full rounded-lg object-cover shadow-md"
                        />
                    </div>
                    <div className="w-2/3 space-y-2">
                        <h3 className="text-lg font-semibold">
                            {data.productDetails.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                                Style: {data.productDetails.styleId}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Size: {data.productDetails.size}
                            </p>
                        </div>
                        <Badge
                            variant={
                                data.listingData.status === "ACTIVE"
                                    ? "success"
                                    : "destructive"
                            }
                            className="capitalize mt-1"
                        >
                            {data.listingData.status.toLowerCase()}
                        </Badge>
                        <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                                Retail Price: {data.productDetails.retailPrice}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Release Date: {data.productDetails.releaseDate}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-4">
                        <h4 className="font-medium">Market Data</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Last Sale:
                                </span>
                                <span className="font-medium">
                                    {data.marketData.lastSale}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Highest Bid:
                                </span>
                                <span className="font-medium">
                                    {data.marketData.highestBid}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Lowest Ask:
                                </span>
                                <span className="font-medium">
                                    {data.marketData.lowestAsk}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Sales (72h):
                                </span>
                                <span className="font-medium">
                                    {data.marketData.salesLast72Hrs}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Volatility:
                                </span>
                                <span className="font-medium text-green-600">
                                    {data.marketData.volatility}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium">Your Listing</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Ask Price:
                                </span>
                                <span className="font-medium">
                                    {data.listingData.askPrice}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Listed On:
                                </span>
                                <span className="font-medium">
                                    {data.listingData.listedOn}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Expires On:
                                </span>
                                <span className="font-medium">
                                    {data.listingData.expiresOn}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Est. Payout:
                                </span>
                                <span className="font-medium text-green-600">
                                    {data.listingData.fees.estimatedPayout}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Total Fees:
                                </span>
                                <span className="font-medium text-red-600">
                                    {`$${(
                                        parseFloat(
                                            data.listingData.fees.transactionFee.replace(
                                                "$",
                                                ""
                                            )
                                        ) +
                                        parseFloat(
                                            data.listingData.fees.paymentProcessingFee.replace(
                                                "$",
                                                ""
                                            )
                                        )
                                    ).toFixed(2)}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-none shadow-md transition-all duration-300">
                        List on {platform}
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[650px] max-h-[85vh] flex flex-col">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>Relist Options</DialogTitle>
                </DialogHeader>

                <Tabs
                    defaultValue="stockx"
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stockx">
                            StockX Listings
                        </TabsTrigger>
                        <TabsTrigger value="goat">Goat Listings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stockx" className="mt-4">
                        <ScrollArea className="max-h-[60vh] pr-4 overflow-y-auto">
                            {renderSingleItem(stockxData, "StockX")}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="goat" className="mt-4">
                        <ScrollArea className="max-h-[60vh] pr-4 overflow-y-auto">
                            {renderSingleItem(goatData, "GOAT")}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
