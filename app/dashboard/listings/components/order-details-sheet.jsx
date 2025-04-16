// app/profile/my-orders/components/order-details-sheet.jsx
"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { X } from "lucide-react";

// Using status variants that work with the theme
const statusVariants = {
  "pending": "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-500/50",
  "processing": "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-500/50",
  "completed": "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-500/50",
  "cancelled": "bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-500/50",
  "refunded": "bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300 border-gray-500/50",
};

export function OrderDetailsSheet({ order, open, onOpenChange }) {
  if (!order) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Listing Details</SheetTitle>
          <SheetDescription>
            View the details of your listing.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-6 h-[calc(100vh-10rem)]">
          <div className="flex items-center space-x-4 pb-4 border-b">
            <Avatar className="h-16 w-16 rounded">
              <AvatarImage src={order.image} alt={order.name} />
              <AvatarFallback>{order.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base">{order.name}</h3>
              <p className="text-sm text-muted-foreground">Style ID: {order.styleId}</p>
              <p className="text-sm">Size: {order.size}</p>
            </div>
          </div>

          <div className="py-4 border-b">
            <h4 className="text-sm font-medium mb-2">Listing Status</h4>
            <Badge 
              variant={order.status === "active" ? "success" : order.status === "expired" ? "destructive" : "default"}
            >
              {order.status === "active" ? "Active" : order.status === "expired" ? "Expired" : order.status}
            </Badge>
          </div>

          <div className="py-4 border-b">
            <h4 className="text-sm font-medium mb-2">Pricing</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Your Ask</p>
                <p className="font-medium">{order.askPrice}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Lowest Ask</p>
                <p className={`font-medium ${order.isLowestAsk ? "text-green-600" : ""}`}>
                  {order.lowestAsk}
                  {order.isLowestAsk && <span className="ml-2 text-xs text-green-600">(Yours)</span>}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Highest Bid</p>
                <p className="font-medium">{order.highestBid}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Spread</p>
                <p className="font-medium text-green-600">${order.spread}</p>
              </div>
            </div>
          </div>

          <div className="py-4 border-b">
            <h4 className="text-sm font-medium mb-2">Important Dates</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Date Added</p>
                <p className="font-medium">{order.dateAdded}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expiry Date</p>
                <p className="font-medium">{order.expiryDate}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-6">
            <Button className="flex-1" variant="default">
              Edit Listing
            </Button>
            <Button className="flex-1" variant="destructive">
              Delete Listing
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}