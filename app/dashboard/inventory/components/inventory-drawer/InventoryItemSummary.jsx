"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FallbackImage from "../custom-image";

export function InventoryItemSummary({ item }) {
    return (
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
                <Avatar className="h-32 w-40 rounded-md">
                    <FallbackImage urlKey={item.urlKey} alt={item.title} />
                    <AvatarFallback className="bg-secondary text-xl">
                        {item?.title?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                <p className="text-muted-foreground mb-2">
                    Style ID: {item.styleId}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                    {item.brand && (
                        <Badge variant="outline" className="bg-primary/10">
                            {item.brand}
                        </Badge>
                    )}
                    {item.productAttributes?.category && (
                        <Badge variant="outline" className="bg-secondary/20">
                            {item.productAttributes?.category}
                        </Badge>
                    )}
                    {item.productAttributes?.gender && (
                        <Badge variant="outline">
                            {item.productAttributes?.gender}
                        </Badge>
                    )}
                </div>

                {/* Product information grid */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Retail Price
                        </p>
                        <p className="font-medium text-lg">
                            {item.itemDetails?.retail_price
                                ? `$${item.itemDetails[0].retail_price}`
                                : "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Warehouse Location
                        </p>
                        <p className="font-medium text-lg">
                            {item.itemDetails[0].location || "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Date Added
                        </p>
                        <p className="font-medium text-lg">
                            {item.createdAt
                                ? new Date(item.createdAt).toLocaleDateString(
                                      "en-GB"
                                  )
                                : "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Quantity
                        </p>
                        <p className="font-medium text-lg">
                            {item.itemDetails[0].quantity || 0}
                        </p>
                    </div>
                </div>

                {/* Additional product attributes */}
                {/* <div className="grid grid-cols-2 gap-3 mt-4">
                    {item.productAttributes?.colorway && (
                        <div className="flex justify-between py-1 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">
                                Colorway
                            </span>
                            <span className="font-medium">
                                {item.productAttributes.colorway}
                            </span>
                        </div>
                    )}

                    {item.productAttributes?.releaseDate && (
                        <div className="flex justify-between py-1 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">
                                Release Date
                            </span>
                            <span className="font-medium">
                                {new Date(
                                    item.productAttributes.releaseDate
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    )}

                    {item.productAttributes?.season && (
                        <div className="flex justify-between py-1 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">
                                Season
                            </span>
                            <span className="font-medium">
                                {item.productAttributes.season}
                            </span>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
}
