// app/profile/my-orders/components/columns.jsx
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Eye, CreditCard } from "lucide-react";

const statusColors = {
  "pending": "bg-yellow-500",
  "processing": "bg-blue-500",
  "completed": "bg-green-500",
  "cancelled": "bg-red-500",
  "refunded": "bg-gray-500",
};

export const columns = (token, onViewDetails) => [
  {
    accessorKey: "orderNumber",
    header: "Order #",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.orderNumber}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ row }) => (
      <div>{row.original.itemCount} {row.original.itemCount === 1 ? 'item' : 'items'}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => (
      <div className="font-medium">৳{row.original.totalAmount.toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      return (
        <Badge
          className={`${statusColors[status] || "bg-gray-500"} text-white capitalize`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment.status",
    header: "Payment",
    cell: ({ row }) => {
      const paymentStatus = row.original.payment?.status || "Not Paid";
      const paymentMethod = row.original.payment?.paymentMethodName || "N/A";
      
      return (
        <div>
          <div className="capitalize font-medium">{paymentStatus}</div>
          <div className="text-xs text-muted-foreground">{paymentMethod}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      
      return (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(order)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      );
    },
  },
];