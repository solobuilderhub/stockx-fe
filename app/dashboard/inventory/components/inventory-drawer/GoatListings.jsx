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
import { useEffect, useState } from "react";
import { useToken } from "../../context/TokenContext";

export function GoatListings({
    listings = [],
    isLoading = false,
    lastUpdated,
    filterByVariantId,
    size,
    styleId,
}) {
    const [goatListings, setGoatListings] = useState([]);
    const token = useToken();

    // Function to format date to dd/mm/yyyy format
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, "0")}/${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;
    };

    // Function to format price (cents to dollars with no decimal places)
    const formatPrice = (priceCents) => {
        return `$${Math.floor(priceCents / 100)}`;
    };

    useEffect(() => {
        if (styleId && size) {
            const fetchGoatListings = async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/goat/listings?searchTerm=${styleId}&size=${size}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                    { cache: "force-cache" },
                    { next: { revalidate: 60 * 60 * 24 } }
                );
                const data = await response.json();
                setGoatListings(data?.data?.listings);
            };
            fetchGoatListings();
        }
    }, [styleId, size]);

    console.log("goatListings", goatListings);

    // Status badge color mapping
    const getStatusBadge = (status) => {
        const statusMap = {
            LISTING_STATUS_ACTIVE: {
                variant: "outline",
                className: "bg-green-100 text-green-800 border-green-300",
            },
            LISTING_STATUS_PENDING: {
                variant: "outline",
                className: "bg-yellow-100 text-yellow-800 border-yellow-300",
            },
            LISTING_STATUS_SOLD: {
                variant: "outline",
                className: "bg-blue-100 text-blue-800 border-blue-300",
            },
            LISTING_STATUS_CANCELED: {
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
                        <CardTitle>GOAT Listings</CardTitle>
                        <CardDescription>
                            {isLoading
                                ? "Loading listings..."
                                : `${goatListings.length} listings found`}
                        </CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        disabled={isLoading}
                    >
                        <Plus size={14} />
                        Create Listing in GOAT
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : goatListings.length === 0 ? (
                    <div className="text-center py-10 border rounded-md">
                        <p className="text-muted-foreground">
                            No GOAT listings found for this variant
                        </p>
                    </div>
                ) : (
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Size Unit</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Updated At</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {goatListings.map((listing) => (
                                    <TableRow key={listing.id}>
                                        <TableCell>{listing.size}</TableCell>
                                        <TableCell>
                                            {listing.size_unit}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(listing.created_at)}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(listing.updated_at)}
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
                                        <TableCell className="font-medium">
                                            {formatPrice(listing.price_cents)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={
                                                        listing.status !==
                                                        "LISTING_STATUS_ACTIVE"
                                                    }
                                                >
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={
                                                        listing.status !==
                                                        "LISTING_STATUS_ACTIVE"
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
