// app/dashboard/components/order-stats.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OrderStats({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Calculate percentages for status breakdown
  const calculatePercentage = (count) => {
    return data.totalOrders > 0 ? Math.round((count / data.totalOrders) * 100) : 0;
  };
  
  const statusIcons = {
    pending: <Clock className="h-4 w-4 text-amber-500" />,
    processing: <RefreshCw className="h-4 w-4 text-blue-500" />,
    completed: <CheckCircle className="h-4 w-4 text-green-500" />,
    cancelled: <XCircle className="h-4 w-4 text-red-500" />,
    refunded: <RefreshCw className="h-4 w-4 text-purple-500" />
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Order Statistics</CardTitle>
        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{data.totalOrders}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(data.totalSales)}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Paid Orders</p>
            <p className="text-xl font-semibold">{data.paidOrders}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <p className="text-xl font-semibold">
              {data.totalOrders > 0 
                ? formatCurrency(data.totalSales / data.totalOrders) 
                : formatCurrency(0)}
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-3">Order Status Breakdown</h4>
          
          {Object.entries(data.statusCounts).map(([status, count]) => (
            <div key={status} className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  {statusIcons[status]}
                  <span className="ml-2 capitalize text-sm">{status}</span>
                </div>
                <span className="text-sm font-medium">{count} ({calculatePercentage(count)}%)</span>
              </div>
              <Progress value={calculatePercentage(count)} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}