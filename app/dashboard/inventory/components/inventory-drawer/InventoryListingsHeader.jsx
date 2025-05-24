"use client";

import { useToast } from "@/app/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function InventoryListingsHeader({
    styleId,
    name,
    isLoading,
    setIsLoading,
}) {
    const { toast } = useToast();

    const handleRefreshListings = () => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Listings refreshed",
                description: "All marketplace listings have been refreshed.",
            });
        }, 1500);
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-xl font-semibold">
                    {name} - Marketplace Listings
                </h2>
                <p className="text-sm text-muted-foreground">
                    Style ID: {styleId}
                </p>
            </div>
            <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleRefreshListings}
                disabled={isLoading}
            >
                <RefreshCw
                    size={16}
                    className={isLoading ? "animate-spin" : ""}
                />
                Refresh Listings
            </Button>
        </div>
    );
}
