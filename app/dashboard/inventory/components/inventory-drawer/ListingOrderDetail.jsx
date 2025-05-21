
import React from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Package, 
  Truck, 
  Calendar, 
  ExternalLink, 
  FileText,
  Clock,
  Tag
} from 'lucide-react';
import { getStatusClass } from './listing-utils';

// Helper to determine if order is StockX type
const isStockXOrder = (order) => {
  return order && typeof order === 'object' && 'listingId' in order;
};

export function ListingOrderDetail({ order, platform, onClose }) {
  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'PPp');
    } catch (e) {
      return 'Unknown date';
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    }
    
    if (!price) return '-';
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      typeof price === 'string' && price.includes('.')
        ? numPrice
        : numPrice / 100
    );
  };

  // Get order ID based on platform
  const getOrderId = () => {
    if (isStockXOrder(order)) {
      return order.orderNumber || order.listingId;
    }
    return order && (order.order_id || order.id);
  };

  // Get order status
  const getStatus = () => {
    if (isStockXOrder(order)) {
      return order.status;
    }
    return order && order.status;
  };

  // Get formatted price
  const getPrice = () => {
    if (isStockXOrder(order)) {
      return formatPrice(order.amount);
    }
    return order ? formatPrice(order.price_cents) : '-';
  };

  // Get product name
  const getProductName = () => {
    if (isStockXOrder(order)) {
      return order.product.productName;
    }
    return "Product details unavailable"; // GOAT order structure would need to be updated
  };

  // Get size
  const getSize = () => {
    if (isStockXOrder(order)) {
      return order.variant.variantValue;
    }
    if (order && order.size && order.size_unit) {
      return `${order.size} ${String(order.size_unit).replace('SIZE_UNIT_', '')}`;
    }
    return '';
  };

  // Get tracking info
  const getTrackingInfo = () => {
    if (isStockXOrder(order) && order.shipment) {
      return {
        number: order.shipment.trackingNumber,
        url: order.shipment.trackingUrl,
        carrier: order.shipment.carrierCode,
        shipByDate: order.shipment.shipByDate
      };
    } else if (!isStockXOrder(order) && order && order.tracking) {
      const tracking = order.tracking;
      return {
        number: tracking && tracking.tracking_number,
        url: tracking && tracking.tracking_url,
        carrier: tracking && tracking.carrier,
        shipByDate: tracking && tracking.ship_by_date
      };
    }
    return null;
  };

  // Get payout info
  const getPayoutInfo = () => {
    if (isStockXOrder(order) && order.payout) {
      return {
        total: formatPrice(order.payout.totalPayout),
        salePrice: formatPrice(order.payout.salePrice),
        adjustments: formatPrice(order.payout.totalAdjustments),
        currency: order.payout.currencyCode
      };
    } else if (!isStockXOrder(order) && order && order.payout) {
      const payout = order.payout;
      return {
        total: formatPrice(payout.amount_cents),
        currency: payout.currency
      };
    }
    return null;
  };

  const tracking = getTrackingInfo();
  const payout = getPayoutInfo();
  const status = getStatus();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Order Details</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge className="capitalize">{platform}</Badge>
              <span>Order ID: {getOrderId()}</span>
            </CardDescription>
          </div>
          
          <Badge variant="outline" className={getStatusClass(status)}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Product Details Section */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Product Information</h3>
          <div className="bg-secondary/10 p-4 rounded-md">
            <div className="space-y-1">
              <h4 className="font-semibold">{getProductName()}</h4>
              <div className="flex items-center gap-2 text-sm">
                <Tag size={14} className="text-muted-foreground" />
                <span>Size: {getSize()}</span>
              </div>
              {isStockXOrder(order) && (
                <div className="flex items-center gap-2 text-sm">
                  <Tag size={14} className="text-muted-foreground" />
                  <span>Style ID: {order.product.styleId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Financial Details Section */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">Financial Details</h3>
          <div className="bg-secondary/10 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Sale Price</p>
                <p className="font-semibold text-lg">{getPrice()}</p>
              </div>
              
              {payout && (
                <div>
                  <p className="text-sm text-muted-foreground">Payout Amount</p>
                  <p className="font-semibold text-lg">{payout.total}</p>
                </div>
              )}
              
              {isStockXOrder(order) && order.payout && (
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Fee Adjustments</p>
                  <p className="font-medium">{payout && payout.adjustments}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Shipping Information */}
        {tracking && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">Shipping Information</h3>
            <div className="bg-secondary/10 p-4 rounded-md space-y-3">
              {tracking.carrier && (
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-muted-foreground" />
                  <span>Carrier: {tracking.carrier}</span>
                </div>
              )}
              
              {tracking.number && (
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-muted-foreground" />
                  <span>Tracking: {tracking.number}</span>
                </div>
              )}
              
              {tracking.shipByDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>Ship By: {formatDate(tracking.shipByDate)}</span>
                </div>
              )}
              
              {tracking.url && (
                <Button variant="secondary" size="sm" className="gap-2 mt-2" asChild>
                  <a href={tracking.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    Track Package
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Timestamps */}
        <div className="border-t pt-4">
          <div className="flex flex-wrap justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Clock size={14} />
              <span>
                Created: {formatDate(
                  isStockXOrder(order)
                    ? order.createdAt
                    : order && order.created_at
                )}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>
                Updated: {formatDate(
                  isStockXOrder(order)
                    ? order.updatedAt
                    : order && order.updated_at
                )}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        
        {isStockXOrder(order) && order.shipment && order.shipment.shippingLabelUrl && (
          <Button variant="secondary" className="gap-2" asChild>
            <a href={order.shipment.shippingLabelUrl} target="_blank" rel="noopener noreferrer">
              <FileText size={16} />
              Shipping Label
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
