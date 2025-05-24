"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DollarSign, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import { formatPrice, formatTimeAgo, getStatusClass } from "./listing-utils";
import { ListingOrderDetail } from "./ListingOrderDetail";

// Removed TypeScript interfaces

export function GoatListings({
    listings,
    lastUpdated,
    filterByVariantId,
    isLoading = false,
}) {
    const [selectedListing, setSelectedListing] = useState(null);

    // Filter listings by variant if provided
    const filteredListings = filterByVariantId
        ? listings.filter(
              (listing) => listing.variant.variantId === filterByVariantId
          )
        : listings;

    // Get a status badge component based on status string
    const getStatusBadge = (status) => {
        return (
            <Badge variant="outline" className={getStatusClass(status)}>
                {status}
            </Badge>
        );
    };

    // Format time to be displayed in a readable format
    const formatTime = (timeString) => {
        return formatTimeAgo(timeString);
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">GOAT Listings</CardTitle>
                    <CardDescription>Loading listings...</CardDescription>
                </CardHeader>
                <CardContent className="p-4 text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-6 bg-secondary/30 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-secondary/30 rounded w-1/2"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">GOAT Listings</CardTitle>
                <CardDescription>
                    Showing {filteredListings.length} active listings on GOAT
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Listed</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredListings.map((listing) => (
                            <TableRow key={listing.listingId}>
                                <TableCell className="font-medium">
                                    US {listing.variant.variantValue}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatPrice(listing.amount)}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(listing.status)}
                                </TableCell>
                                <TableCell>
                                    {formatTime(listing.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() =>
                                                        setSelectedListing(
                                                            listing
                                                        )
                                                    }
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="w-full max-w-3xl">
                                                {selectedListing && (
                                                    <ListingOrderDetail
                                                        order={
                                                            selectedListing.order
                                                        }
                                                        platform="goat"
                                                        onClose={() =>
                                                            setSelectedListing(
                                                                null
                                                            )
                                                        }
                                                    />
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 w-8 p-0"
                                        >
                                            <DollarSign className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 w-8 p-0"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="bg-muted/50 p-2">
                <div className="text-xs text-muted-foreground w-full text-center">
                    Last updated {formatTimeAgo(lastUpdated)}
                </div>
            </CardFooter>
        </Card>
    );
}
