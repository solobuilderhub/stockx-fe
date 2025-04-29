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
import { X } from "lucide-react";
import { useState } from "react";

const mockData = {
    count: 266,
    pageSize: 10,
    pageNumber: 1,
    hasNextPage: true,
    listings: [
        {
            listingId: "98e2e748-8000-45bf-a624-5531d6a68318",
            status: "ACTIVE",
            amount: "300",
            currencyCode: "AUD",
            inventoryType: "STANDARD",
            createdAt: "2021-11-09T12:44:31.000Z",
            updatedAt: "2021-11-09T12:44:31.000Z",
            batch: {
                batchId: "86378f62-ad0e-4a06-9c8e-642731bb9140",
                taskId: "7083634e-3bc5-4747-a4f3-768093074b5e",
            },
            ask: {
                askId: "string",
                askCreatedAt: "2021-11-09T12:44:31.000Z",
                askUpdatedAt: "2021-11-09T12:44:31.000Z",
                askExpiresAt: "2021-11-09T12:44:31.000Z",
            },
            authenticationDetails: {
                status: "string",
                failureNotes: "string",
            },
            order: {
                orderNumber: "string",
                orderCreatedAt: "2021-11-09T12:44:31.000Z",
                orderStatus: "CREATED",
            },
            product: {
                productId: "bf364c53-eb77-4522-955c-6a6ce952cc6f",
                productName: "Nike Air",
                styleId: "FV5029-006",
            },
            initiatedShipments: {
                inbound: {
                    displayId: "string",
                },
            },
            variant: {
                variantId: "bf364c53-eb77-4522-955c-6a6ce952cc6f",
                variantName: "color",
                variantValue: "black",
            },
        },
        // Duplicate the entry for more visual data
        {
            listingId: "98e2e748-8000-45bf-a624-5531d6a68319",
            status: "ACTIVE",
            amount: "280",
            currencyCode: "USD",
            inventoryType: "STANDARD",
            createdAt: "2021-11-08T10:44:31.000Z",
            updatedAt: "2021-11-08T10:44:31.000Z",
            product: {
                productId: "bf364c53-eb77-4522-955c-6a6ce952cc6f",
                productName: "Nike Air Max 90",
                styleId: "FV5029-008",
            },
            variant: {
                variantId: "bf364c53-eb77-4522-955c-6a6ce952cc6g",
                variantName: "color",
                variantValue: "white",
            },
        },
        {
            listingId: "98e2e748-8000-45bf-a624-5531d6a68320",
            status: "EXPIRED",
            amount: "320",
            currencyCode: "EUR",
            inventoryType: "STANDARD",
            createdAt: "2021-11-07T09:44:31.000Z",
            updatedAt: "2021-11-07T09:44:31.000Z",
            product: {
                productId: "bf364c53-eb77-4522-955c-6a6ce952cc6h",
                productName: "Nike Dunk Low",
                styleId: "FV5029-010",
            },
            variant: {
                variantId: "bf364c53-eb77-4522-955c-6a6ce952cc6i",
                variantName: "color",
                variantValue: "red",
            },
        },
    ],
};

const ListingItem = ({ listing, platformName }) => {
    return (
        <div className="border rounded-lg p-4 mb-4 hover:bg-accent/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold">
                        {listing.product.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {listing.product.styleId}
                    </p>
                </div>
                <Badge
                    variant={
                        listing.status === "ACTIVE" ? "success" : "destructive"
                    }
                    className="capitalize"
                >
                    {listing.status.toLowerCase()}
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                <div>
                    <span className="text-muted-foreground">Amount:</span>{" "}
                    <span className="font-medium">
                        {listing.amount} {listing.currencyCode}
                    </span>
                </div>
                <div>
                    <span className="text-muted-foreground">Type:</span>{" "}
                    <span className="font-medium">{listing.inventoryType}</span>
                </div>
                <div>
                    <span className="text-muted-foreground">Created:</span>{" "}
                    <span className="font-medium">
                        {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                </div>
                {listing.variant && (
                    <div>
                        <span className="text-muted-foreground">
                            {listing.variant.variantName}:
                        </span>{" "}
                        <span className="font-medium capitalize">
                            {listing.variant.variantValue}
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-end">
                <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-none shadow-md transition-all duration-300"
                >
                    List this
                </Button>
            </div>
        </div>
    );
};

export function RelistModal({ isOpen, onClose, product }) {
    const [activeTab, setActiveTab] = useState("stockx");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col ">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle>Relist Options</DialogTitle>
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button> */}
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
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Select a StockX listing to relist your
                                    product:
                                </p>
                                {mockData.listings.map((listing) => (
                                    <ListingItem
                                        key={listing.listingId}
                                        listing={listing}
                                        platformName="StockX"
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="goat" className="mt-4">
                        <ScrollArea className="max-h-[60vh] pr-4 overflow-y-auto">
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Select a Goat listing to relist your
                                    product:
                                </p>
                                {mockData.listings.map((listing) => (
                                    <ListingItem
                                        key={listing.listingId}
                                        listing={listing}
                                        platformName="Goat"
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
