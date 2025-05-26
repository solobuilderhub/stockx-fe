"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import FallbackImage from "../custom-image";

export function InventoryTableRow({ item, onViewItem }) {
    const stockxStyleId = item.stockx?.styleId || "-";
    const goatStyleId = item.goat?.sku || "-";
    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-GB")
        : "-";

    return (
        <TableRow className="border-b hover:bg-secondary/10">
            <TableCell>
                <Avatar className="h-10 w-10 rounded">
                    <FallbackImage urlKey={item.urlKey} alt={item.title} />
                    <AvatarFallback className="bg-secondary text-xs">
                        {item.title?.substring(0, 2).toUpperCase() || "NA"}
                    </AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>
                <p className="font-medium">{item.title}</p>
                {item.goat?.name && (
                    <p className="text-xs text-muted-foreground">
                        GOAT: {item.goat.name}
                    </p>
                )}
            </TableCell>
            <TableCell>{item.brand || "Unknown"}</TableCell>
            <TableCell>{stockxStyleId}</TableCell>
            <TableCell>{goatStyleId}</TableCell>
            <TableCell>{formattedDate}</TableCell>
            <TableCell>
                <div className="flex items-center justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => onViewItem(item)}
                    >
                        <Eye size={16} />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
