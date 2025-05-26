"use client";

export function InventoryItemDetails({ item }) {
    return (
        <div className="grid grid-cols-5 gap-6">
            {/* Product Information */}
            <div className="space-y-3 col-span-2">
                <h3 className="font-semibold">Product Information</h3>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                            Colorway
                        </span>
                        <span
                            className="font-medium"
                            title={item.productAttributes?.colorway || "N/A"}
                        >
                            {item.productAttributes?.colorway
                                ? item.productAttributes.colorway.length > 25
                                    ? `${item.productAttributes.colorway.substring(
                                          0,
                                          25
                                      )}...`
                                    : item.productAttributes.colorway
                                : "N/A"}
                        </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                            Release Date
                        </span>
                        <span className="font-medium">
                            {new Date(
                                item.productAttributes?.releaseDate
                            ).toLocaleDateString("en-GB") || "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Marketplace Information */}
            <div className="space-y-3 col-span-3">
                <h3 className="font-semibold">Marketplace Information</h3>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                            StockX SKU
                        </span>
                        <span className="font-medium">
                            {item.stockx?.styleId || "N/A"}
                        </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                            StockX Product ID
                        </span>
                        <span className="font-medium">
                            {item.stockx?.productId || "N/A"}
                        </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                            GOAT SKU
                        </span>
                        <span className="font-medium">
                            {item.goat?.sku || "N/A"}
                        </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                            GOAT Catalog ID
                        </span>
                        <span className="font-medium">
                            {item.goat?.catalog_id || "N/A"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
