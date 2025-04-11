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
import { Badge } from "@/components/ui/badge";
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
  if (!order) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto px-6">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle>Order #{order.orderNumber}</SheetTitle>
          </div>
          <SheetDescription>
            Placed on {formatDate(order.createdAt)}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge
              variant="outline"
              className={`${
                statusVariants[order.status.toLowerCase()] || "bg-muted text-muted-foreground"
              } capitalize border`}
            >
              {order.status}
            </Badge>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Customer</h3>
            <div className="text-sm bg-muted/50 p-4 rounded-md">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-muted-foreground">{order.customerEmail}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-muted/50 p-4 rounded-md space-y-2"
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{item.productName}</p>
                    <p className="font-medium">৳{item.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <p>Quantity: {item.quantity}</p>
                    <p>৳{item.price.toFixed(2)} each</p>
                  </div>
                  
                  {item.purchaseNotes && item.purchaseNotes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      {item.purchaseNotes.map((note, index) => (
                        <div key={note.noteId || index} className="text-sm mt-2">
                          <p className="font-medium">{note.noteTitle}:</p>
                          <p className="text-muted-foreground">{note.response}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Payment</h3>
            <div className="bg-muted/50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <p className="text-sm">Method</p>
                <p className="text-sm font-medium">
                  {order.payment?.paymentMethodName || "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Status</p>
                <p className="text-sm font-medium capitalize">
                  {order.payment?.status || "Not Paid"}
                </p>
              </div>
              {order.payment?.paymentDate && (
                <div className="flex justify-between">
                  <p className="text-sm">Date</p>
                  <p className="text-sm">
                    {formatDate(order.payment.paymentDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between">
              <p className="text-sm">Subtotal</p>
              <p className="text-sm">৳{order.subtotal.toFixed(2)}</p>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <p className="text-sm">Discount</p>
                <p className="text-sm">-৳{order.discount.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p>৳{order.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Order Timeline */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="text-sm font-medium">Order Timeline</h3>
              <div className="space-y-4">
                {order.statusHistory.map((history, index) => (
                  <div key={history._id || index} className="flex gap-4">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-primary"></div>
                      {index < order.statusHistory.length - 1 && (
                        <div className="absolute top-3 left-1.5 -ml-px h-full w-[1px] bg-border"></div>
                      )}
                    </div>
                    <div className="flex-1 text-sm pb-4 -mt-0.5">
                      <p className="font-medium capitalize">{history.status}</p>
                      <p className="text-muted-foreground text-xs">
                        {formatDate(history.timestamp)}
                      </p>
                      {history.note && (
                        <p className="text-muted-foreground mt-1">{history.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}