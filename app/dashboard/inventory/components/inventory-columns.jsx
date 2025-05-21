// "use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
// import { urlKeyToImage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import FallbackImage from "./custom-image";

export const inventoryColumns = () => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="hidden"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="hidden"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <Avatar className="h-14 w-14 rounded">
                <FallbackImage
                    urlKey={row.getValue("urlKey")}
                    alt={row.getValue("name")}
                />
                <AvatarFallback className="bg-secondary text-xs">
                    {row.getValue("name")?.substring(0, 2)?.toUpperCase() ||
                        "NA"}
                </AvatarFallback>
            </Avatar>
        ),
        enableSorting: false,
    },
    // {
    //     accessorKey: "urlKey",
    //     header: "",
    //     cell: () => null,
    // },
    // {
    //     accessorKey: "id",
    //     header: "ID",
    //     cell: ({ row }) => (
    //         <p className="text-sm text-muted-foreground">
    //             {row.getValue("id")}
    //         </p>
    //     ),
    // },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div>
                <p className="font-medium">
                    {row.getValue("name") !== "No Name" ? (
                        <Link
                            href={`https://stockx.com/${row.getValue(
                                "urlKey"
                            )}`}
                            target="_blank"
                            className="hover:underline"
                        >
                            {row.getValue("name").length > 50
                                ? (() => {
                                      const name = row.getValue("name");
                                      // Find the last space before 50 characters
                                      const lastSpaceIndex = name
                                          .substring(0, 50)
                                          .lastIndexOf(" ");
                                      // If no space found, break at 50, otherwise break at the last space
                                      const breakIndex =
                                          lastSpaceIndex > 0
                                              ? lastSpaceIndex
                                              : 50;

                                      return (
                                          <>
                                              {name.substring(0, breakIndex)}
                                              <br />
                                              {name.substring(
                                                  breakIndex === 50
                                                      ? 50
                                                      : breakIndex + 1
                                              )}
                                          </>
                                      );
                                  })()
                                : row.getValue("name")}
                        </Link>
                    ) : (
                        "No Name"
                    )}
                </p>
                {/* <p className="text-xs text-muted-foreground mt-1">
                    {row.original.stockxSku === row.original.goatSku ? (
                        `StockX SKU: ${row.original.stockxSku}`
                    ) : (
                        <>
                            {`StockX SKU: ${row.original.stockxSku}`}
                            <br />
                            {`Goat SKU: ${row.original.goatSku}`}
                        </>
                    )}
                </p> */}
            </div>
        ),
    },
    // {
    //     accessorKey: "size",
    //     header: "Size",
    // },
    // {
    //     accessorKey: "quantity",
    //     header: "Qty",
    // },
    // {
    //     accessorKey: "dateAdded",
    //     header: "Inventory added date",
    // },
    // {
    //     accessorKey: "warehouseLocation",
    //     header: "Warehouse location",
    // },
    // {
    //     accessorKey: "brandWholesale",
    //     header: "Brand Wholesale",
    //     cell: ({ row }) => (
    //         <p className="text-sm">{row.getValue("brandWholesale")}</p>
    //     ),
    // },
    // {
    //     accessorKey: "retailPrice",
    //     header: "Retail Price",
    // },
    // {
    //     id: "actions",
    //     header: "",
    //     cell: ({ row }) => (
    //         <button className="text-muted-foreground hover:text-destructive transition-colors">
    //             <Trash2 size={16} />
    //         </button>
    //     ),
    //     enableSorting: false,
    // },
    {
        accessorKey: "brand",
        header: "Brand",
        cell: ({ row }) => (
            <div className="font-medium">{row.original.brandWholesale}</div>
        ),
    },
    {
        accessorKey: "stockxStyleId",
        header: "Stockx Style Id",
        cell: ({ row }) => <div>{row.original.stockxSku}</div>,
    },
    {
        accessorKey: "goatStyleId",
        header: "Goat Style Id",
        cell: ({ row }) => <div>{row.original.goatSku}</div>,
    },
    {
        accessorKey: "actions",
        header: <div className="text-center">Actions</div>,
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary"
                >
                    <Eye size={16} />
                </Button>
            </div>
        ),
        enableSorting: false,
    },
];
