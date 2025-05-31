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
}) {
    const [formData, setFormData] = useState({});

    // Initialize form data based on platform
    useEffect(() => {
        if (platform === "stockx") {
            setFormData({
                amount: "",
                variantId: variantData?.variantId || "",
                currencyCode: "USD",
                active: false,
            });
        } else if (platform === "goat") {
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
    }, [platform, variantData]);

    const handleSubmit = () => {
        onSubmit(formData);
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
                    defaultValue={formData.size}
                    className="bg-secondary/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="sizeUnit">Size Unit</Label>
                <Input
                    id="sizeUnit"
                    defaultValue={formData.sizeUnit}
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
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Create Listing on {platform?.toUpperCase()}
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
                            Submit Listing
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
