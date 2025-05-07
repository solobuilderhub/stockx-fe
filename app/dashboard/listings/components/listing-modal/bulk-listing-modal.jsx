"use client";

import { useListingBucket } from "@/app/context/listing-bucket-context";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function BulkListingModal({ isOpen, onClose }) {
    const { bucketItems, clearBucket } = useListingBucket();
    const [listingData, setListingData] = useState([]);

    // Initialize or update listingData when bucketItems changes
    useEffect(() => {
        if (bucketItems.length > 0) {
            setListingData(
                bucketItems.map((item) => ({
                    id: item.id,
                    amount: item.listingData.amount || "",
                    active: "true",
                    ...item,
                }))
            );
        }
    }, [bucketItems]);

    const handleAmountChange = (id, value) => {
        // Only allow numeric values
        if (value === "" || /^\d+$/.test(value)) {
            setListingData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, amount: value } : item
                )
            );
        }
    };

    const handleActiveChange = (id, value) => {
        setListingData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, active: value } : item
            )
        );
    };

    const handleBulkList = () => {
        // Validate all amounts have values
        const invalidItems = listingData.filter((item) => !item.amount);
        if (invalidItems.length > 0) {
            toast.error("Please enter an amount for all items");
            return;
        }

        // Here you would send the data to your API
        console.log("Submitting bulk listing:", listingData);
        toast.success("Items have been listed successfully!");

        // Clear bucket after successful listing
        clearBucket();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[90vw] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        Bulk Listing ({bucketItems.length} items)
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto flex-grow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Retail Price</TableHead>
                                <TableHead>Last Sale</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Variant ID</TableHead>
                                <TableHead>Currency</TableHead>
                                <TableHead>Active</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bucketItems.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="text-center py-8"
                                    >
                                        No items in the listing bucket. Add
                                        items from your listings.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bucketItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="w-16 h-16 relative">
                                                <img
                                                    src={
                                                        item.productDetails
                                                            .image
                                                    }
                                                    alt={
                                                        item.productDetails.name
                                                    }
                                                    className="object-contain w-full h-full rounded-md"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate font-medium">
                                            {item.productDetails.name}
                                        </TableCell>
                                        <TableCell>
                                            {item.productDetails.retailPrice}
                                        </TableCell>
                                        <TableCell>
                                            {item.marketData.lastSale}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    item.listingData.status ===
                                                    "ACTIVE"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {item.listingData.status.toLowerCase()}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                value={
                                                    listingData.find(
                                                        (data) =>
                                                            data.id === item.id
                                                    )?.amount || ""
                                                }
                                                onChange={(e) =>
                                                    handleAmountChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-24"
                                                placeholder="0"
                                            />
                                        </TableCell>
                                        <TableCell className="max-w-[180px] truncate">
                                            <Input
                                                value={item.listingId}
                                                disabled
                                                className="w-full bg-muted"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value="USD"
                                                disabled
                                                className="w-20 bg-muted"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={
                                                    listingData.find(
                                                        (data) =>
                                                            data.id === item.id
                                                    )?.active || "true"
                                                }
                                                onValueChange={(value) =>
                                                    handleActiveChange(
                                                        item.id,
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-[100px]">
                                                    <SelectValue placeholder="Active" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">
                                                        True
                                                    </SelectItem>
                                                    <SelectItem value="false">
                                                        False
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBulkList}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        disabled={bucketItems.length === 0}
                    >
                        Bulk List Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
