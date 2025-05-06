// app/profile/my-orders/components/columns.jsx
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const statusColors = {
    pending: "bg-yellow-500",
    processing: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    refunded: "bg-gray-500",
};

export const columns = (token, handleViewDetails, handleRelistClick) => [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <Avatar className="h-10 w-10 rounded">
                <AvatarImage
                    src={row.getValue("image")}
                    alt={row.original.name}
                />
                <AvatarFallback className="bg-secondary text-xs">
                    {row.original.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
            <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                    {row.getValue("name").length > 30
                        ? (() => {
                              const name = row.getValue("name");
                              // Find the last space before 30 characters
                              const lastSpaceIndex = name
                                  .substring(0, 30)
                                  .lastIndexOf(" ");
                              // If no space found, break at 30, otherwise break at the last space
                              const breakIndex =
                                  lastSpaceIndex > 0 ? lastSpaceIndex : 30;

                              return (
                                  <>
                                      {name.substring(0, breakIndex)}
                                      <br />
                                      {name.substring(
                                          breakIndex === 30
                                              ? 30
                                              : breakIndex + 1
                                      )}
                                  </>
                              );
                          })()
                        : row.getValue("name")}
                </p>
                <p className="text-xs text-muted-foreground">
                    {row.original.styleId}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "styleId",
        header: "StockX/Goat SKU",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "unitsSoldStockx",
        header: "Sold StockX ",
    },
    {
        accessorKey: "unitsSoldGoat",
        header: "Sold Goat ",
    },
    {
        accessorKey: "retailPrice",
        header: "Retail Price",
    },
    {
        accessorKey: "brandWholesale",
        header: "Wholesale",
    },
    {
        accessorKey: "cost",
        header: "Cost",
    },
    // {
    //     accessorKey: "lowestAsk",
    //     header: "Lowest Ask",
    //     cell: ({ row }) => {
    //         const isLowest = row.original.isLowestAsk;
    //         return (
    //             <div className={isLowest ? "text-green-600 font-medium" : ""}>
    //                 {row.getValue("lowestAsk")}
    //                 {isLowest && (
    //                     <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
    //                         Lowest
    //                     </Badge>
    //                 )}
    //             </div>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "highestBid",
    //     header: "Highest Bid",
    // },
    // {
    //     accessorKey: "spread",
    //     header: "Spread",
    //     cell: ({ row }) => (
    //         <div className="text-green-600">${row.original.spread}</div>
    //     ),
    // },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const status = row.getValue("status");
    //         return (
    //             <Badge
    //                 variant={
    //                     status === "active"
    //                         ? "success"
    //                         : status === "expired"
    //                         ? "destructive"
    //                         : "default"
    //                 }
    //             >
    //                 {status === "active"
    //                     ? "Active"
    //                     : status === "expired"
    //                     ? "Expired"
    //                     : status}
    //             </Badge>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "expiryDate",
    //     header: "Expiry Date",
    // },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex space-x-2">
    //                 <Button
    //                     onClick={() => handleViewDetails(row.original)}
    //                     variant="ghost"
    //                     size="icon"
    //                     className="h-8 w-8 p-0"
    //                 >
    //                     <Eye className="h-4 w-4" />
    //                 </Button>
    //                 <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
    //                     <PencilLine className="h-4 w-4" />
    //                 </Button>
    //                 <Button
    //                     variant="ghost"
    //                     size="icon"
    //                     className="h-8 w-8 p-0 text-destructive hover:text-destructive/80"
    //                 >
    //                     <Trash2 className="h-4 w-4" />
    //                 </Button>
    //             </div>
    //         );
    //     },
    // },
    {
        accessorKey: "",
        header: "Relist StockX",
        cell: ({ row }) => {
            return (
                <Button
                    onClick={() => handleRelistClick(row.original)}
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-none shadow-md transition-all duration-300"
                >
                    Relist Ask
                </Button>
            );
        },
    },
    {
        accessorKey: "",
        header: "Relist Goat",
        cell: ({ row }) => {
            return (
                <Button
                    onClick={() => handleRelistClick(row.original)}
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-none shadow-md transition-all duration-300"
                >
                    Relist Ask
                </Button>
            );
        },
    },
    {
        accessorKey: "remainingQty",
        header: "Remaining Qty",
    },
];
