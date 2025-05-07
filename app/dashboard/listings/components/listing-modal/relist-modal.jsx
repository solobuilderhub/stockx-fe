"use client";

import { useListingBucket } from "@/app/context/listing-bucket-context";
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
import { toast } from "sonner";
import { CreateListingModal } from "./create-listing-modal";

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
    listingsData: {
        count: 3,
        listings: [
            {
                listingId: "98e2e748-8000-45bf-a624-5531d6a68318",
                status: "ACTIVE",
                amount: "259",
                currencyCode: "USD",
                createdAt: "2023-11-09T12:44:31.000Z",
                updatedAt: "2023-11-09T12:44:31.000Z",
                ask: {
                    askExpiresAt: "2024-02-09T12:44:31.000Z",
                },
                fees: {
                    transactionFee: "$25.90",
                    paymentProcessingFee: "$5.18",
                    estimatedPayout: "$227.92",
                },
            },
            {
                listingId: "76e5c748-9060-42bf-b624-5762d6a69428",
                status: "ACTIVE",
                amount: "265",
                currencyCode: "USD",
                createdAt: "2023-10-25T10:22:15.000Z",
                updatedAt: "2023-10-25T10:22:15.000Z",
                ask: {
                    askExpiresAt: "2024-01-25T10:22:15.000Z",
                },
                fees: {
                    transactionFee: "$26.50",
                    paymentProcessingFee: "$5.30",
                    estimatedPayout: "$233.20",
                },
            },
            {
                listingId: "34a7f842-7130-40af-c714-3351e4a59217",
                status: "EXPIRED",
                amount: "255",
                currencyCode: "USD",
                createdAt: "2023-08-17T15:36:42.000Z",
                updatedAt: "2023-08-17T15:36:42.000Z",
                ask: {
                    askExpiresAt: "2023-11-17T15:36:42.000Z",
                },
                fees: {
                    transactionFee: "$25.50",
                    paymentProcessingFee: "$5.10",
                    estimatedPayout: "$224.40",
                },
            },
        ],
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
    recentSales: [
        {
            purchased_at: "2025-05-07T06:05:55.579Z",
            price_cents: "7100",
            size: 10,
            consigned: false,
            catalog_id: "air-jordan-4-retro-thunder-2023",
        },
        {
            purchased_at: "2025-05-07T05:33:17.430Z",
            price_cents: "8300",
            size: 10.5,
            consigned: false,
            catalog_id: "air-jordan-4-retro-thunder-2023",
        },
        {
            purchased_at: "2025-05-07T04:47:33.117Z",
            price_cents: "8300",
            size: 6,
            consigned: false,
            catalog_id: "air-jordan-4-retro-thunder-2023",
        },
    ],
    listingsData: {
        count: 3,
        listings: [
            {
                listingId: "76e1c548-9000-32ab-c913-6421a5b54219",
                status: "ACTIVE",
                amount: "262",
                currencyCode: "USD",
                createdAt: "2023-11-08T09:18:45.000Z",
                updatedAt: "2023-11-08T09:18:45.000Z",
                ask: {
                    askExpiresAt: "2024-02-08T09:18:45.000Z",
                },
                fees: {
                    transactionFee: "$26.20",
                    paymentProcessingFee: "$5.24",
                    estimatedPayout: "$230.56",
                },
            },
            {
                listingId: "54b2d639-8140-39ac-d724-7532c4b64329",
                status: "ACTIVE",
                amount: "270",
                currencyCode: "USD",
                createdAt: "2023-10-15T14:25:36.000Z",
                updatedAt: "2023-10-15T14:25:36.000Z",
                ask: {
                    askExpiresAt: "2024-01-15T14:25:36.000Z",
                },
                fees: {
                    transactionFee: "$27.00",
                    paymentProcessingFee: "$5.40",
                    estimatedPayout: "$237.60",
                },
            },
            {
                listingId: "29c4e742-6230-37af-b614-2451d3a48116",
                status: "INACTIVE",
                amount: "260",
                currencyCode: "USD",
                createdAt: "2023-09-05T11:42:18.000Z",
                updatedAt: "2023-09-05T11:42:18.000Z",
                ask: {
                    askExpiresAt: "2023-12-05T11:42:18.000Z",
                },
                fees: {
                    transactionFee: "$26.00",
                    paymentProcessingFee: "$5.20",
                    estimatedPayout: "$228.80",
                },
            },
        ],
    },
};

export function RelistModal({ isOpen, onClose, product }) {
    const [activeTab, setActiveTab] = useState("stockx");
    const [createListingOpen, setCreateListingOpen] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const { bucketItems, addToBucket, removeFromBucket } = useListingBucket();

    // Use product data if available, otherwise use mock data
    const stockxData = mockStockXData;
    const goatData = mockGoatData;

    const handleCreateListingClick = (platform) => {
        setSelectedPlatform(platform);
        setCreateListingOpen(true);
    };

    const handleBucketAction = (platform) => {
        const data = platform === "StockX" ? stockxData : goatData;
        const listingId = data.listingsData.listings[0].listingId;

        // Check if item is already in bucket
        const isInBucket = bucketItems.some(
            (item) => item.listingId === listingId
        );

        if (isInBucket) {
            // Remove from bucket
            removeFromBucket(listingId);
            toast.success(`Item removed from Listing Bucket`);
        } else {
            // Add to bucket
            const itemToAdd = {
                id: Date.now().toString(), // Generate a unique ID
                platform,
                listingId: listingId,
                productDetails: data.productDetails,
                marketData: data.marketData,
                listingData: data.listingsData.listings[0],
            };
            addToBucket(itemToAdd);
            toast.success(`Item added to Listing Bucket`);
        }
    };

    const renderSingleItem = (data, platform) => {
        // Check if the current item is in the bucket
        const isInBucket = bucketItems.some(
            (item) => item.listingId === data.listingsData.listings[0].listingId
        );

        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-1/5">
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

                <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4">Market Data</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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
                                Average Sale:
                            </span>
                            <span className="font-medium">
                                {data.marketData.averageSale}
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

                {platform === "GOAT" && data.recentSales && (
                    <div className="pt-4 border-t">
                        <h4 className="font-medium mb-4">Recent Sales (3)</h4>
                        <div className="space-y-3">
                            {data.recentSales.map((sale, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg border border-gray-200"
                                >
                                    <div className="grid grid-cols-3 gap-x-4">
                                        <div>
                                            <span className="text-sm text-muted-foreground block">
                                                Date
                                            </span>
                                            <span className="font-medium">
                                                {new Date(
                                                    sale.purchased_at
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground block">
                                                Price
                                            </span>
                                            <span className="font-medium">
                                                $
                                                {(
                                                    parseInt(sale.price_cents) /
                                                    100
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground block">
                                                Size
                                            </span>
                                            <span className="font-medium">
                                                US {sale.size}
                                            </span>
                                            {sale.consigned && (
                                                <Badge
                                                    className="ml-2 text-xs"
                                                    variant="outline"
                                                >
                                                    Consigned
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4">
                        Your Listings ({data.listingsData.count})
                    </h4>

                    {data.listingsData.listings.map((listing, index) => (
                        <div
                            key={listing.listingId}
                            className={`p-4 rounded-lg border mb-4 ${
                                index === 0 ? "border-blue-200" : ""
                            }`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <Badge
                                    variant={
                                        listing.status === "ACTIVE"
                                            ? "success"
                                            : "destructive"
                                    }
                                    className="capitalize"
                                >
                                    {listing.status.toLowerCase()}
                                </Badge>
                                {index === 0 && (
                                    <span className="text-xs text-blue-600 font-medium">
                                        Most Recent
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Ask Price:
                                    </span>
                                    <span className="font-medium">
                                        ${listing.amount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Listed On:
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            listing.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Expires On:
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            listing.ask.askExpiresAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Est. Payout:
                                    </span>
                                    <span className="font-medium text-green-600">
                                        {listing.fees.estimatedPayout}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Total Fees:
                                    </span>
                                    <span className="font-medium text-red-600">
                                        {`$${(
                                            parseFloat(
                                                listing.fees.transactionFee.replace(
                                                    "$",
                                                    ""
                                                )
                                            ) +
                                            parseFloat(
                                                listing.fees.paymentProcessingFee.replace(
                                                    "$",
                                                    ""
                                                )
                                            )
                                        ).toFixed(2)}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-6 flex justify-end">
                    <div className="flex items-center gap-2">
                        <Button
                            className={`${
                                isInBucket
                                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            } text-white border-none shadow-md transition-all duration-300`}
                            onClick={() => handleBucketAction(platform)}
                        >
                            {isInBucket
                                ? "Remove from Bucket"
                                : "Add to Listing Bucket"}
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-none shadow-md transition-all duration-300"
                            onClick={() => handleCreateListingClick(platform)}
                        >
                            Create New Listing on {platform}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[850px] max-h-[85vh] flex flex-col">
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
                            <TabsTrigger value="goat">
                                Goat Listings
                            </TabsTrigger>
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

            <CreateListingModal
                isOpen={createListingOpen}
                onClose={() => setCreateListingOpen(false)}
                platform={selectedPlatform}
            />
        </>
    );
}
