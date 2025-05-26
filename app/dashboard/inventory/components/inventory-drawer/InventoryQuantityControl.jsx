"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function InventoryQuantityControl({
    initialQuantity = 1,
    variantId,
    onQuantityChange,
    itemId,
    variant,
}) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [isUpdating, setIsUpdating] = useState(false);

    // Function to handle increment
    const handleIncrement = (e) => {
        e.stopPropagation();
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        handleUpdate(newQuantity);
    };

    // Function to handle decrement
    const handleDecrement = (e) => {
        e.stopPropagation();
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            handleUpdate(newQuantity);
        }
    };

    // Function to handle manual input
    const handleInputChange = (e) => {
        e.stopPropagation();
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        } else if (e.target.value === "") {
            setQuantity(0);
        }
    };

    // Function to handle blur event (when input loses focus)
    const handleBlur = () => {
        handleUpdate(quantity);
    };

    // Function to update quantity via API
    const handleUpdate = (newQuantity) => {
        setIsUpdating(true);

        // Simulate API call with timeout
        setTimeout(() => {
            // Call the parent callback
            onQuantityChange(variantId, newQuantity);
            setIsUpdating(false);
        }, 300);
    };

    return (
        <div
            className="flex items-center h-8 w-32 rounded-md border border-input bg-background"
            onClick={(e) => e.stopPropagation()}
        >
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-full aspect-square rounded-none"
                onClick={handleDecrement}
                disabled={quantity <= 0 || isUpdating}
            >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
            </Button>
            <Input
                type="text"
                inputMode="numeric"
                min={0}
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="h-full border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isUpdating}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-full aspect-square rounded-none"
                onClick={handleIncrement}
                disabled={isUpdating}
            >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase</span>
            </Button>
        </div>
    );
}
