// "use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
// import { urlKeyToImage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import FallbackImage from "./custom-image";

export const inventoryColumns = (onViewItem) => [
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
        accessorKey: "",
        header: "Image",
        cell: ({ row }) => (
            <Avatar className="h-14 w-14 rounded">
                <FallbackImage
                    urlKey={row.original.urlKey}
                    alt={row.original.title}
                />
                <AvatarFallback className="bg-secondary text-xs">
                    {row.original.title?.substring(0, 2)?.toUpperCase() || "NA"}
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
        accessorKey: "title",
        header: "Name",
        cell: ({ row }) => (
            <div>
                <p className="font-medium">
                    {row.getValue("title") ? (
                        <Link
                            href={`https://stockx.com/${row.original.urlKey}`}
                            target="_blank"
                            className="hover:underline"
                        >
                            {row.getValue("title").length > 50
                                ? (() => {
                                      const name = row.getValue("title");
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
                                : row.getValue("title")}
                        </Link>
                    ) : (
                        "No Name"
                    )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    {row.original.goat?.name && (
                        <span className="block">
                            GOAT: {row.original.goat.name}
                        </span>
                    )}
                </p>
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
    {
        accessorKey: "createdAt",
        header: "Added Date",
        cell: ({ row }) => (
            <div>
                {row.original.createdAt
                    ? new Date(row.original.createdAt).toLocaleDateString(
                          "en-GB"
                      )
                    : "-"}
            </div>
        ),
    },
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
            <div className="font-medium">{row.getValue("brand")}</div>
        ),
    },
    {
        accessorKey: "stockx.styleId",
        header: "Stockx Style Id",
        cell: ({ row }) => <div>{row.original.stockx?.styleId || "-"}</div>,
    },
    {
        accessorKey: "goat.sku",
        header: "Goat Style Id",
        cell: ({ row }) => <div>{row.original.goat?.sku || "-"}</div>,
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
                    onClick={() => onViewItem(row.original)}
                >
                    <Eye size={16} />
                </Button>
            </div>
        ),
        enableSorting: false,
    },
];
