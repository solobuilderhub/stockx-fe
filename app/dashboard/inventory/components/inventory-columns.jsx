"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from 'lucide-react';

export const inventoryColumns = () => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <Avatar className="h-10 w-10 rounded">
        <AvatarImage src={row.getValue("image")} alt={row.getValue("name")} />
        <AvatarFallback className="bg-secondary text-xs">
          {row.getValue("name").substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground mt-1">{row.original.styleId}</p>
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "dateAdded",
    header: "Inventory added date",
  },
  {
    accessorKey: "warehouseLocation",
    header: "Warehouse location",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <button className="text-muted-foreground hover:text-destructive transition-colors">
        <Trash2 size={16} />
      </button>
    ),
    enableSorting: false,
  },
]; 