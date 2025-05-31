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
import { useState } from "react";
import { toast } from "sonner";
import { useToken } from "../../context/TokenContext";
import { CreateListingModal } from "./CreateListingModal";
import {
    useCreateListing,
    useStockXListings,
    useUpdateListing,
} from "./hooks/use-listings-data";

export function StockXListings({
    listings = [],
    isLoading = false,
    lastUpdated,
    filterByVariantId,
    variantId,
}) {
    const token = useToken();
    const { data: stockXListings, isLoading: isLoadingStockX } =
        useStockXListings(variantId, token);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingListing, setEditingListing] = useState(null);

    // Use the create and update listing mutations
    const createListingMutation = useCreateListing("stockx", token);
    const updateListingMutation = useUpdateListing("stockx", token);

    // Function to format date to readable format
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

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

    const handleCreateListing = () => {
        setEditMode(false);
        setEditingListing(null);
        setIsModalOpen(true);
    };

    const handleEditListing = (listing) => {
        setEditMode(true);
        setEditingListing(listing);
        setIsModalOpen(true);
    };

    const handleSubmitListing = async (formData) => {
        try {
            if (editMode) {
                // Update existing listing
                const result = await updateListingMutation.mutateAsync(
                    formData
                );
                toast.success("StockX listing updated successfully!");
                handleModalClose(); // Close modal only on success
            } else {
                // Create new listing
                const result = await createListingMutation.mutateAsync(
                    formData
                );
                toast.success("StockX listing created successfully!");
                handleModalClose(); // Close modal only on success
            }
        } catch (error) {
            // Error handling - modal stays open
            toast.error(
                editMode
                    ? `Failed to update listing: ${error.message}`
                    : `Failed to create listing: ${error.message}`
            );
            // Don't close modal on error
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditMode(false);
        setEditingListing(null);
    };

    const isLoadingData = isLoading || isLoadingStockX;
    const isSubmitting =
        createListingMutation.isPending || updateListingMutation.isPending;

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>StockX Listings</CardTitle>
                            <CardDescription>
                                {isLoadingData
                                    ? "Loading listings..."
                                    : `${
                                          stockXListings?.length || 0
                                      } listings found`}
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            disabled={isLoadingData}
                            onClick={handleCreateListing}
                        >
                            <Plus size={14} />
                            Create Listing in StockX
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoadingData ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : !stockXListings || stockXListings.length === 0 ? (
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
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Variant Name</TableHead>
                                        <TableHead>Variant Value</TableHead>
                                        <TableHead>Listing ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Updated At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stockXListings.map((listing) => (
                                        <TableRow key={listing.listingId}>
                                            <TableCell className="font-medium">
                                                ${listing.amount}
                                            </TableCell>
                                            <TableCell>
                                                {listing.variant.variantName}
                                            </TableCell>
                                            <TableCell>
                                                {listing.variant.variantValue}
                                            </TableCell>
                                            <TableCell>
                                                {listing.listingId}
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
                                                {formatDate(listing.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(listing.updatedAt)}
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
                                                        onClick={() =>
                                                            handleEditListing(
                                                                listing
                                                            )
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

            <CreateListingModal
                open={isModalOpen}
                onOpenChange={handleModalClose}
                platform="stockx"
                variantData={{
                    variantId: variantId,
                }}
                editMode={editMode}
                listingData={editingListing}
                onSubmit={handleSubmitListing}
                isSubmitting={isSubmitting}
            />
        </>
    );
}
