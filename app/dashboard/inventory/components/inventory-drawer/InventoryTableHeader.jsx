"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function InventoryTableHeader() {
    return (
        <TableHeader>
            <TableRow className="bg-secondary/20">
                <TableHead className="w-[60px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Stockx Style Id</TableHead>
                <TableHead>Goat Style Id</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
}
