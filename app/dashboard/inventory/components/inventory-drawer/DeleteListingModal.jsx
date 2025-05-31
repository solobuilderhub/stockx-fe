"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function DeleteListingModal({
    open,
    onOpenChange,
    platform,
    listing,
    onConfirm,
    isDeleting = false,
}) {
    const handleCancel = () => {
        onOpenChange(false);
    };

    const handleConfirm = () => {
        onConfirm(listing);
    };

    const platformName = platform?.toUpperCase() || "Platform";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Delete Listing
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete this listing from{" "}
                        <span className="font-semibold">{platformName}</span>?
                    </p>

                    {listing && (
                        <div className="bg-secondary/10 p-3 rounded-md">
                            <div className="text-sm space-y-1">
                                {platform === "stockx" ? (
                                    <>
                                        <div>
                                            <span className="font-medium">
                                                Amount:
                                            </span>{" "}
                                            ${listing.amount}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Listing ID:
                                            </span>{" "}
                                            {listing.listingId}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Status:
                                            </span>{" "}
                                            {listing.status}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span className="font-medium">
                                                Price:
                                            </span>{" "}
                                            $
                                            {Math.floor(
                                                listing.price_cents / 100
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Size:
                                            </span>{" "}
                                            {listing.size} {listing.size_unit}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Status:
                                            </span>{" "}
                                            {listing.status}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    <p className="text-xs text-red-600">
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isDeleting}
                        >
                            No
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Deleting...
                                </div>
                            ) : (
                                "Yes, Delete"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
