"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";

export function InventoryTableRow({ item, onViewItem }) {
    const stockxStyleId = item.stockx?.sku || "-";
    const goatStyleId = item.goat?.sku || "-";

    return (
        <TableRow className="border-b hover:bg-secondary/10">
            <TableCell>
                <Avatar className="h-10 w-10 rounded">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback className="bg-secondary text-xs">
                        {item.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>
                <p className="font-medium">{item.name}</p>
            </TableCell>
            <TableCell>{item.brand || "Unknown"}</TableCell>
            <TableCell>{stockxStyleId}</TableCell>
            <TableCell>{goatStyleId}</TableCell>
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
