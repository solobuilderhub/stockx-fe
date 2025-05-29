"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";

export function StockXListings({
    listings = [],
    isLoading = false,
    lastUpdated,
    filterByVariantId,
}) {
    // Function to format date to readable format
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Filter listings by variant ID if provided
    const filteredListings = filterByVariantId
        ? listings.filter(
              (listing) => listing.variant.variantId === filterByVariantId
          )
        : listings;

    // Status badge color mapping
    const getStatusBadge = (status) => {
        const statusMap = {
            ACTIVE: {
                variant: "outline",
                className: "bg-green-100 text-green-800 border-green-300",
            },
            PENDING: {
                variant: "outline",
                className: "bg-yellow-100 text-yellow-800 border-yellow-300",
            },
            SOLD: {
                variant: "outline",
                className: "bg-blue-100 text-blue-800 border-blue-300",
            },
            CANCELED: {
                variant: "outline",
                className: "bg-red-100 text-red-800 border-red-300",
            },
        };

        return (
            statusMap[status] || {
                variant: "outline",
                className: "bg-gray-100 text-gray-800 border-gray-300",
            }
        );
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>StockX Listings</CardTitle>
                        <CardDescription>
                            {isLoading
                                ? "Loading listings..."
                                : `${filteredListings.length} listings found`}
                        </CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        disabled={isLoading}
                    >
                        <Plus size={14} />
                        Create Listing in StockX
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : filteredListings.length === 0 ? (
                    <div className="text-center py-10 border rounded-md">
                        <p className="text-muted-foreground">
                            No StockX listings found for this variant
                        </p>
                    </div>
                ) : (
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredListings.map((listing) => (
                                    <TableRow key={listing.listingId}>
                                        <TableCell className="font-medium">
                                            ${listing.amount}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    getStatusBadge(
                                                        listing.status
                                                    ).variant
                                                }
                                                className={
                                                    getStatusBadge(
                                                        listing.status
                                                    ).className
                                                }
                                            >
                                                {listing.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {listing.variant.variantValue}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(listing.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={
                                                        listing.status !==
                                                        "ACTIVE"
                                                    }
                                                >
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={
                                                        listing.status !==
                                                        "ACTIVE"
                                                    }
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                <div className="text-xs text-muted-foreground mt-2 text-right">
                    Last updated: {formatDate(lastUpdated)}
                </div>
            </CardContent>
        </Card>
    );
}
