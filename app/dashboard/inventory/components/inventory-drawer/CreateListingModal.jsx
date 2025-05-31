"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function CreateListingModal({
    open,
    onOpenChange,
    platform,
    variantData,
    onSubmit,
    editMode = false,
    listingData = null,
}) {
    const [formData, setFormData] = useState({});

    // Initialize form data based on platform and mode
    useEffect(() => {
        if (platform === "stockx") {
            if (editMode && listingData) {
                // Pre-fill form with existing listing data for editing
                setFormData({
                    amount: listingData.amount || "",
                    variantId:
                        listingData.variantId || variantData?.variantId || "",
                    currencyCode: listingData.currencyCode || "USD",
                    active: listingData.active || false,
                });
            } else {
                // Default form for creating new listing
                setFormData({
                    amount: "",
                    variantId: variantData?.variantId || "",
                    currencyCode: "USD",
                    active: false,
                });
            }
        } else if (platform === "goat") {
            if (editMode && listingData) {
                // Pre-fill form with existing listing data for editing
                setFormData({
                    catalogId:
                        listingData.catalogId || variantData?.catalogId || "",
                    priceCents:
                        listingData.price_cents || listingData.priceCents || "",
                    condition: listingData.condition || "CONDITION_NEW",
                    packagingCondition:
                        listingData.packaging_condition ||
                        listingData.packagingCondition ||
                        "PACKAGING_CONDITION_GOOD_CONDITION",
                    size: listingData.size || variantData?.size || "",
                    sizeUnit:
                        listingData.size_unit ||
                        listingData.sizeUnit ||
                        "SIZE_UNIT_US",
                    activate: listingData.activate || false,
                });
            } else {
                // Default form for creating new listing
                setFormData({
                    catalogId: variantData?.catalogId || "",
                    priceCents: "",
                    condition: "CONDITION_NEW",
                    packagingCondition: "PACKAGING_CONDITION_GOOD_CONDITION",
                    size: variantData?.size || "",
                    sizeUnit: "SIZE_UNIT_US",
                    activate: false,
                });
            }
        }
    }, [platform, variantData, editMode, listingData]);

    const handleSubmit = () => {
        const submitData = editMode
            ? { ...formData, id: listingData?.id || listingData?.listingId }
            : formData;
        onSubmit(submitData);
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    const renderStockXForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                    }
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="variantId">Variant ID</Label>
                <Input
                    id="variantId"
                    value={formData.variantId}
                    disabled
                    className="bg-secondary/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="currencyCode">Currency Code</Label>
                <Input
                    id="currencyCode"
                    value={formData.currencyCode}
                    disabled
                    className="bg-secondary/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="active">Active</Label>
                <select
                    id="active"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.active}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            active: e.target.value === "true",
                        })
                    }
                >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                </select>
            </div>
        </div>
    );

    const renderGoatForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="catalogId">Catalog ID</Label>
                <Input
                    id="catalogId"
                    value={formData.catalogId}
                    disabled
                    className="bg-secondary/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="priceCents">Price (Cents)</Label>
                <Input
                    id="priceCents"
                    type="number"
                    placeholder="6500"
                    value={formData.priceCents}
                    onChange={(e) =>
                        setFormData({ ...formData, priceCents: e.target.value })
                    }
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <select
                    id="condition"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.condition}
                    onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                    }
                >
                    <option value="CONDITION_NEW">New</option>
                    <option value="CONDITION_USED">Used</option>
                    <option value="CONDITION_NEW_WITH_DEFECTS">
                        New with defects
                    </option>
                </select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="packagingCondition">Packaging Condition</Label>
                <select
                    id="packagingCondition"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.packagingCondition}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            packagingCondition: e.target.value,
                        })
                    }
                >
                    <option value="PACKAGING_CONDITION_GOOD_CONDITION">
                        Good condition
                    </option>
                    <option value="PACKAGING_CONDITION_MISSING_LID">
                        Missing lid
                    </option>
                    <option value="PACKAGING_CONDITION_BADLY_DAMAGED">
                        Badly damaged
                    </option>
                    <option value="PACKAGING_CONDITION_NO_ORIGINAL_BOX">
                        No original box
                    </option>
                </select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                    id="size"
                    value={formData.size}
                    disabled
                    className="bg-secondary/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="sizeUnit">Size Unit</Label>
                <Input
                    id="sizeUnit"
                    value={formData.sizeUnit}
                    disabled
                    className="bg-secondary/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="activate">Activate</Label>
                <select
                    id="activate"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.activate}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            activate: e.target.value === "true",
                        })
                    }
                >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                </select>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {editMode ? "Edit" : "Create"} Listing on{" "}
                        {platform?.toUpperCase()}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {platform === "stockx" && renderStockXForm()}
                    {platform === "goat" && renderGoatForm()}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                platform === "stockx"
                                    ? !formData.amount
                                    : !formData.priceCents
                            }
                        >
                            {editMode ? "Update Listing" : "Submit Listing"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
